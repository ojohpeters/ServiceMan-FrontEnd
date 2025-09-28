import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Hammer, 
  Zap, 
  Wrench, 
  Paintbrush, 
  Sparkles, 
  Scissors,
  Settings,
  Home,
  Car
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Category } from "@/types";

// Icon mapping for categories
const iconMap: Record<string, any> = {
  'Carpentry': Hammer,
  'Electrical': Zap,
  'Plumbing': Wrench,
  'Painting': Paintbrush,
  'Cleaning': Sparkles,
  'Landscaping': Scissors,
  'General': Settings,
  'Home Repair': Home,
  'Automotive': Car,
};

const colorMap: Record<string, string> = {
  'Carpentry': 'bg-orange-500',
  'Electrical': 'bg-yellow-500',
  'Plumbing': 'bg-blue-500',
  'Painting': 'bg-purple-500',
  'Cleaning': 'bg-green-500',
  'Landscaping': 'bg-emerald-500',
  'General': 'bg-gray-500',
  'Home Repair': 'bg-red-500',
  'Automotive': 'bg-indigo-500',
};

export default function FeaturedCategories() {
  const [, setLocation] = useLocation();
  
  // Fetch categories from API or use mock data in DEV mode
  const { data: apiCategories, isLoading } = useQuery({
    queryKey: ['/categories'],
    queryFn: () => api.getCategories(),
  });

  // Mock data for DEV mode
  const mockCategories: Category[] = [
    {
      id: 1,
      name: "Carpentry",
      description: "Custom furniture, repairs, installations",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Electrical",
      description: "Wiring, repairs, installations, safety",
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Plumbing",
      description: "Repairs, installations, maintenance",
      created_at: new Date().toISOString(),
    },
    {
      id: 4,
      name: "Painting",
      description: "Interior, exterior, decorative work",
      created_at: new Date().toISOString(),
    },
    {
      id: 5,
      name: "Cleaning",
      description: "Deep cleaning, maintenance, organizing",
      created_at: new Date().toISOString(),
    },
    {
      id: 6,
      name: "Landscaping",
      description: "Garden design, maintenance, tree care",
      created_at: new Date().toISOString(),
    }
  ];

  const categories = import.meta.env.VITE_DEV_MODE === "true" 
    ? mockCategories 
    : (apiCategories || []);

  const handleCategoryClick = (categoryId: number) => {
    setLocation(`/browse?category=${categoryId}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Service Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find skilled professionals across our most requested service categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            categories.slice(0, 6).map((category) => {
              const IconComponent = iconMap[category.name] || Settings;
              const colorClass = colorMap[category.name] || 'bg-gray-500';
              
              return (
                <Card 
                  key={category.id} 
                  className="hover-elevate cursor-pointer group"
                  onClick={() => handleCategoryClick(category.id)}
                  data-testid={`category-card-${category.name.toLowerCase()}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`${colorClass} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {category.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge variant="secondary">
                              View Professionals
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        <div className="text-center mt-8">
          <Link href="/categories">
            <button 
              className="text-primary hover:underline font-medium"
              data-testid="button-view-all-categories"
            >
              View all categories →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}