import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Briefcase, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [, setLocation] = useLocation();
  const { register, loading } = useAuth();
  
  const [clientData, setClientData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    contact_address: "",
    password: "",
    confirmPassword: ""
  });

  const [servicemanData, setServicemanData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    contact_address: "",
    password: "",
    confirmPassword: "",
    qualifications: "",
    years_of_experience: ""
  });

  // Fetch categories from API
  const { data: categories = [] } = useQuery({
    queryKey: ['/categories'],
    queryFn: () => api.getCategories(),
  });

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientData(prev => ({ ...prev, [name]: value }));
  };

  const handleServicemanChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setServicemanData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (clientData.password !== clientData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { confirmPassword, ...registerData } = clientData;
      await register({
        role: 'client',
        ...registerData,
      });
      // Redirect to dashboard after successful registration
      setLocation('/dashboard');
    } catch (error) {
      // Error is handled in the AuthContext
    }
  };

  const handleServicemanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (servicemanData.password !== servicemanData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (selectedCategories.length === 0) {
      alert("Please select at least one service category");
      return;
    }

    try {
      const { confirmPassword, ...registerData } = servicemanData;
      await register({
        role: 'serviceman',
        ...registerData,
        years_of_experience: Number(registerData.years_of_experience),
        categories: selectedCategories,
      });
      // Redirect to a pending approval page or login
      setLocation('/login');
    } catch (error) {
      // Error is handled in the AuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">ServiceMan</span>
          </div>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Join thousands of satisfied clients and professionals
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="client" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="client" data-testid="tab-client-register">I need services</TabsTrigger>
              <TabsTrigger value="serviceman" data-testid="tab-serviceman-register">I offer services</TabsTrigger>
            </TabsList>

            <TabsContent value="client" className="space-y-4">
              <form onSubmit={handleClientSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-name">Full Name</Label>
                    <Input
                      id="client-name"
                      name="full_name"
                      type="text"
                      placeholder="Enter your full name"
                      value={clientData.full_name}
                      onChange={handleClientChange}
                      required
                      data-testid="input-client-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input
                      id="client-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={clientData.email}
                      onChange={handleClientChange}
                      required
                      data-testid="input-client-email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-phone">Phone Number</Label>
                    <Input
                      id="client-phone"
                      name="phone_number"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={clientData.phone_number}
                      onChange={handleClientChange}
                      required
                      data-testid="input-client-phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client-address">Address</Label>
                    <Input
                      id="client-address"
                      name="contact_address"
                      type="text"
                      placeholder="Your address"
                      value={clientData.contact_address}
                      onChange={handleClientChange}
                      required
                      data-testid="input-client-address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="client-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={clientData.password}
                        onChange={handleClientChange}
                        required
                        data-testid="input-client-password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client-confirm-password">Confirm Password</Label>
                    <Input
                      id="client-confirm-password"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={clientData.confirmPassword}
                      onChange={handleClientChange}
                      required
                      data-testid="input-client-confirm-password"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required data-testid="checkbox-terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                  data-testid="button-client-register"
                >
                  {loading ? "Creating account..." : "Create Client Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="serviceman" className="space-y-4">
              <form onSubmit={handleServicemanSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceman-name">Full Name</Label>
                    <Input
                      id="serviceman-name"
                      name="full_name"
                      type="text"
                      placeholder="Enter your full name"
                      value={servicemanData.full_name}
                      onChange={handleServicemanChange}
                      required
                      data-testid="input-serviceman-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceman-email">Email</Label>
                    <Input
                      id="serviceman-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={servicemanData.email}
                      onChange={handleServicemanChange}
                      required
                      data-testid="input-serviceman-email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceman-phone">Phone Number</Label>
                    <Input
                      id="serviceman-phone"
                      name="phone_number"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={servicemanData.phone_number}
                      onChange={handleServicemanChange}
                      required
                      data-testid="input-serviceman-phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceman-experience">Years of Experience</Label>
                    <Input
                      id="serviceman-experience"
                      name="years_of_experience"
                      type="number"
                      placeholder="5"
                      min="0"
                      value={servicemanData.years_of_experience}
                      onChange={handleServicemanChange}
                      required
                      data-testid="input-serviceman-experience"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceman-address">Address</Label>
                  <Input
                    id="serviceman-address"
                    name="contact_address"
                    type="text"
                    placeholder="Your address"
                    value={servicemanData.contact_address}
                    onChange={handleServicemanChange}
                    required
                    data-testid="input-serviceman-address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceman-qualifications">Qualifications & Certifications</Label>
                  <Textarea
                    id="serviceman-qualifications"
                    name="qualifications"
                    placeholder="Describe your qualifications, certifications, and expertise..."
                    value={servicemanData.qualifications}
                    onChange={handleServicemanChange}
                    required
                    data-testid="input-serviceman-qualifications"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Service Categories (select all that apply)</Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                        className="cursor-pointer hover-elevate"
                        onClick={() => handleCategoryToggle(category.id)}
                        data-testid={`category-${category.name.toLowerCase()}`}
                      >
                        {category.name}
                        {selectedCategories.includes(category.id) && (
                          <X className="ml-1 h-3 w-3" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceman-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="serviceman-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={servicemanData.password}
                        onChange={handleServicemanChange}
                        required
                        data-testid="input-serviceman-password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceman-confirm-password">Confirm Password</Label>
                    <Input
                      id="serviceman-confirm-password"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={servicemanData.confirmPassword}
                      onChange={handleServicemanChange}
                      required
                      data-testid="input-serviceman-confirm-password"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="serviceman-terms" required data-testid="checkbox-serviceman-terms" />
                  <Label htmlFor="serviceman-terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Your application will be reviewed by our team. 
                    You'll receive an email notification once approved, and then you'll need to 
                    complete physical verification before you can start accepting jobs.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                  data-testid="button-serviceman-register"
                >
                  {loading ? "Submitting application..." : "Submit Application"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline" data-testid="link-login">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}