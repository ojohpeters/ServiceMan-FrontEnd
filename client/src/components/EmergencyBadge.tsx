import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface EmergencyBadgeProps {
  className?: string;
}

export default function EmergencyBadge({ className = "" }: EmergencyBadgeProps) {
  return (
    <Badge 
      variant="destructive" 
      className={`animate-emergency-pulse ${className}`}
      data-testid="emergency-badge"
    >
      <AlertTriangle className="mr-1 h-3 w-3" />
      Emergency
    </Badge>
  );
}