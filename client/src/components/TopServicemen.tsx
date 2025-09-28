import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, CheckCircle } from "lucide-react";
import StarRating from "./StarRating";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Serviceman } from "@/types";

export default function TopServicemen() {
  const [, setLocation] = useLocation();
  
  // Fetch top servicemen from API or use mock data in DEV mode
  const { data: apiServicemen, isLoading } = useQuery({
    queryKey: ['/servicemen/top'],
    queryFn: () => api.getServicemen({ limit: 4, ordering: '-average_rating' }),
  });

  // Mock data for DEV mode
  const mockServicemen: Serviceman[] = [
    {
      id: 1,
      email: "james.wilson@example.com",
      full_name: "James Wilson",
      phone_number: "+2348012345678",
      contact_address: "Lagos, Nigeria",
      role: "serviceman",
      is_active: true,
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      qualifications: "Certified Electrician",
      years_of_experience: 8,
      categories: [2],
      average_rating: 4.9,
      completed_jobs_count: 145,
      is_available: true,
      avatar: "/api/placeholder/64/64",
    },
    {
      id: 2,
      email: "sarah.johnson@example.com",
      full_name: "Sarah Johnson",
      phone_number: "+2348087654321",
      contact_address: "Abuja, Nigeria",
      role: "serviceman",
      is_active: true,
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      qualifications: "Master Plumber",
      years_of_experience: 6,
      categories: [3],
      average_rating: 4.8,
      completed_jobs_count: 112,
      is_available: true,
      avatar: "/api/placeholder/64/64",
    },
    {
      id: 3,
      email: "michael.chen@example.com",
      full_name: "Michael Chen",
      phone_number: "+2348098765432",
      contact_address: "Port Harcourt, Nigeria",
      role: "serviceman",
      is_active: true,
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      qualifications: "Master Carpenter",
      years_of_experience: 10,
      categories: [1],
      average_rating: 4.9,
      completed_jobs_count: 178,
      is_available: true,
      avatar: "/api/placeholder/64/64",
    },
    {
      id: 4,
      email: "fatima.ahmed@example.com",
      full_name: "Fatima Ahmed",
      phone_number: "+2348076543210",
      contact_address: "Kano, Nigeria",
      role: "serviceman",
      is_active: true,
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      qualifications: "Professional Cleaner",
      years_of_experience: 5,
      categories: [5],
      average_rating: 4.7,
      completed_jobs_count: 234,
      is_available: true,
      avatar: "/api/placeholder/64/64",
    }
  ];

  const servicemen = import.meta.env.VITE_DEV_MODE === "true" 
    ? mockServicemen 
    : (apiServicemen?.results || []);

  const handleHireClick = (servicemanId: number) => {
    setLocation(`/servicemen/${servicemanId}/hire`);
  };

  const handleViewProfile = (servicemanId: number) => {
    setLocation(`/servicemen/${servicemanId}/profile`);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Top-Rated Servicemen</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our highest-rated professionals who consistently deliver exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                  <div className="flex gap-1">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <Skeleton className="h-5 w-20" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            servicemen.slice(0, 4).map((serviceman) => (
              <Card 
                key={serviceman.id} 
                className="hover-elevate"
                data-testid={`serviceman-card-${serviceman.id}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={serviceman.avatar} alt={serviceman.full_name} />
                      <AvatarFallback>{serviceman.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-1">
                        <h3 className="font-semibold text-sm">{serviceman.full_name}</h3>
                        {serviceman.is_verified && (
                          <CheckCircle className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{serviceman.qualifications}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {serviceman.contact_address}
                  </div>

                  <StarRating rating={serviceman.average_rating} size="sm" />
                  
                  <div className="text-sm text-muted-foreground">
                    {serviceman.completed_jobs_count} jobs completed • {serviceman.years_of_experience} years exp.
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {serviceman.years_of_experience}+ years
                    </Badge>
                    {serviceman.is_available && (
                      <Badge variant="outline" className="text-xs text-green-600">
                        Available
                      </Badge>
                    )}
                  </div>

                  <div className="text-lg font-semibold">
                    Top Rated Professional
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleHireClick(serviceman.id)}
                      data-testid={`button-hire-${serviceman.id}`}
                    >
                      Hire Now
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewProfile(serviceman.id)}
                      data-testid={`button-profile-${serviceman.id}`}
                    >
                      Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild data-testid="button-browse-all">
            <Link href="/browse">Browse All Servicemen</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}