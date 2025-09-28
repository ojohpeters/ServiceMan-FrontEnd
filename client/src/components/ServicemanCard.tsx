import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, CheckCircle, Clock, ThumbsUp } from "lucide-react";
import StarRating from "./StarRating";

interface ServicemanCardProps {
  serviceman: {
    id: number;
    name: string;
    category: string;
    location: string;
    rating: number;
    reviewCount: number;
    completedJobs: number;
    hourlyRate: number;
    isVerified: boolean;
    isOnline?: boolean;
    avatar?: string;
    specialties: string[];
    responseTime?: string;
  };
  onHire?: (id: number) => void;
  onViewProfile?: (id: number) => void;
}

export default function ServicemanCard({ serviceman, onHire, onViewProfile }: ServicemanCardProps) {
  const handleHireClick = () => {
    if (onHire) {
      onHire(serviceman.id);
      console.log('Hire clicked for serviceman:', serviceman.id);
    }
  };

  const handleProfileClick = () => {
    if (onViewProfile) {
      onViewProfile(serviceman.id);
      console.log('View profile clicked for serviceman:', serviceman.id);
    }
  };

  return (
    <Card className="hover-elevate" data-testid={`serviceman-card-${serviceman.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={serviceman.avatar} alt={serviceman.name} />
              <AvatarFallback>{serviceman.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {serviceman.isOnline && (
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold truncate">{serviceman.name}</h3>
              {serviceman.isVerified && (
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{serviceman.category}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{serviceman.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <StarRating rating={serviceman.rating} size="sm" />
          <Badge variant={serviceman.isOnline ? "default" : "secondary"}>
            {serviceman.isOnline ? "Online" : "Offline"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-1">
            <ThumbsUp className="h-3 w-3 text-muted-foreground" />
            <span>{serviceman.reviewCount} reviews</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span>{serviceman.completedJobs} jobs</span>
          </div>
        </div>

        {serviceman.responseTime && (
          <div className="text-sm text-muted-foreground">
            Typically responds in {serviceman.responseTime}
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {serviceman.specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {serviceman.specialties.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{serviceman.specialties.length - 3} more
            </Badge>
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold">
              ₦{serviceman.hourlyRate.toLocaleString()}/hour
            </span>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={handleHireClick}
              data-testid={`button-hire-${serviceman.id}`}
            >
              Hire Now
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleProfileClick}
              data-testid={`button-profile-${serviceman.id}`}
            >
              Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}