import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Bell, Search, Settings, User, LogOut, Briefcase } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  user?: {
    name: string;
    role: 'client' | 'serviceman' | 'admin';
    avatar?: string;
  };
  notifications?: number;
  devMode?: boolean;
}

export default function Navbar({ user, notifications = 0, devMode = false }: NavbarProps) {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  //todo: remove mock functionality - categories will come from API
  const categories = [
    { id: 1, name: "Carpentry", count: 24 },
    { id: 2, name: "Electrical", count: 18 },
    { id: 3, name: "Plumbing", count: 31 },
    { id: 4, name: "Painting", count: 15 },
    { id: 5, name: "Cleaning", count: 42 },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search triggered:', searchQuery);
    // todo: implement actual search
  };

  const handleCategorySelect = (categoryId: number) => {
    console.log('Category selected:', categoryId);
    // todo: navigate to category page
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover-elevate rounded-md px-2 py-1">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ServiceMan</span>
          </Link>

          {/* Categories & Search */}
          <div className="flex items-center space-x-4">
            {/* Categories Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger data-testid="button-categories">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-1 p-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className="flex items-center justify-between rounded-md p-3 hover-elevate"
                          data-testid={`category-${category.name.toLowerCase()}`}
                        >
                          <span className="font-medium">{category.name}</span>
                          <Badge variant="secondary">{category.count}</Badge>
                        </button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search servicemen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
                data-testid="input-search"
              />
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* DEV Mode Toggle */}
            {devMode && (
              <Badge variant="destructive" className="animate-emergency-pulse">
                DEV MODE
              </Badge>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {user ? (
              // Authenticated User Menu
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                    >
                      {notifications > 99 ? '99+' : notifications}
                    </Badge>
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="button-user-menu">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/${user.role}/dashboard`} className="cursor-pointer" data-testid="link-dashboard">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer" data-testid="link-settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-destructive focus:text-destructive"
                      onClick={() => console.log('Logout triggered')}
                      data-testid="button-logout"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              // Guest Actions
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild data-testid="button-login">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild data-testid="button-hire-now">
                  <Link href="/hire">Hire Now</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}