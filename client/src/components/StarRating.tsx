import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  size = "md", 
  interactive = false,
  onRatingChange 
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
      console.log('Rating changed to:', starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1" data-testid="star-rating">
      {Array.from({ length: maxRating }, (_, i) => {
        const starRating = i + 1;
        const isFilled = starRating <= rating;
        const isPartial = starRating - 0.5 <= rating && starRating > rating;
        
        return (
          <button
            key={i}
            className={`relative ${interactive ? 'hover:scale-110 transition-transform' : ''}`}
            onClick={() => handleStarClick(starRating)}
            disabled={!interactive}
            data-testid={`star-${starRating}`}
          >
            <Star 
              className={`${sizeClasses[size]} ${
                isFilled 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : isPartial
                    ? 'fill-yellow-400/50 text-yellow-400'
                    : 'fill-none text-gray-300'
              }`}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}