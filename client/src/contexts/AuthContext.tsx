import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, RegisterData } from "@/types";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock user for development
  const mockUser: User = {
    id: 1,
    full_name: "John Doe",
    email: "john@example.com",
    phone_number: "+2348012345678",
    contact_address: "123 Main St, Lagos",
    role: "client",
    avatar: "/api/placeholder/32/32",
    is_active: true,
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  useEffect(() => {
    // Initialize auth state
    // In dev mode, use mock user
    const initAuth = async () => {
      try {
        // For now, use mock user in development
        if (import.meta.env.VITE_DEV_MODE === "true") {
          setUser(mockUser);
        } else {
          // In production, check for existing auth
          await refreshUser();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // In DEV mode, simulate login with mock user
      if (import.meta.env.VITE_DEV_MODE === "true") {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser(mockUser);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return;
      }

      // Real API login
      const response = await api.login({ username: email, password });
      
      // Store token if using JWT
      if (response.access) {
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
      }
      
      setUser(response.user);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<User> => {
    try {
      setLoading(true);
      
      // In DEV mode, simulate registration
      if (import.meta.env.VITE_DEV_MODE === "true") {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newUser: User = {
          id: Date.now(),
          ...data,
          is_active: data.role === 'client' ? true : false, // Servicemen need approval
          is_verified: data.role === 'client' ? true : false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        if (data.role === 'client') {
          setUser(newUser);
          toast({
            title: "Registration successful",
            description: "Welcome to ServiceMan!",
          });
        } else {
          toast({
            title: "Application submitted",
            description: "Your serviceman application has been submitted for review. You'll receive an email notification once approved.",
          });
        }
        
        return newUser;
      }

      // Real API registration
      const response = await api.register(data);
      
      if (data.role === 'client') {
        setUser(response);
        toast({
          title: "Registration successful",
          description: "Welcome to ServiceMan!",
        });
      } else {
        toast({
          title: "Application submitted",
          description: "Your serviceman application has been submitted for review.",
        });
      }
      
      return response;
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Clear any stored tokens
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const refreshUser = async () => {
    try {
      // This would typically refresh the user profile from the API
      // For now, we'll use mock data in dev mode
      if (import.meta.env.VITE_DEV_MODE === "true") {
        setUser(mockUser);
      }
    } catch (error) {
      console.error("User refresh error:", error);
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}