import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, AlertTriangle, CreditCard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmergencyBadge from "./EmergencyBadge";

interface RequestServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceman: {
    id: number;
    name: string;
    category: string;
    avatar?: string;
    hourlyRate: number;
  };
  onSubmit?: (data: any) => void;
}

export default function RequestServiceModal({ 
  open, 
  onOpenChange, 
  serviceman,
  onSubmit 
}: RequestServiceModalProps) {
  const [isEmergency, setIsEmergency] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Consultation fee calculation based on emergency status
  const consultationFee = isEmergency ? 5000 : 2000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const requestData = {
      serviceman_id: serviceman.id,
      requested_date: selectedDate,
      is_emergency: isEmergency,
      description: description,
      consultation_fee: consultationFee
    };

    console.log('Service request submitted:', requestData);
    
    if (onSubmit) {
      onSubmit(requestData);
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      // todo: handle actual API response and redirect to payment
    }, 2000);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" data-testid="request-service-modal">
        <DialogHeader>
          <DialogTitle>Request Service</DialogTitle>
          <DialogDescription>
            Schedule a consultation with {serviceman.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Serviceman Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={serviceman.avatar} alt={serviceman.name} />
                  <AvatarFallback>{serviceman.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{serviceman.name}</h3>
                  <p className="text-sm text-muted-foreground">{serviceman.category}</p>
                  <p className="text-sm font-medium">₦{serviceman.hourlyRate.toLocaleString()}/hour</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Emergency Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <Label htmlFor="emergency" className="font-medium">Emergency Service</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Requires immediate attention (within 24 hours)
                </p>
              </div>
              <Switch
                id="emergency"
                checked={isEmergency}
                onCheckedChange={setIsEmergency}
                data-testid="switch-emergency"
              />
            </div>

            {isEmergency && (
              <div className="flex justify-center">
                <EmergencyBadge />
              </div>
            )}

            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="requested-date">Preferred Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="requested-date"
                  type="date"
                  min={getTomorrowDate()}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10"
                  required
                  data-testid="input-requested-date"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {isEmergency ? "Emergency services aim for same-day response" : "Standard booking for next available slot"}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Service Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Describe the work you need done..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                data-testid="input-description"
              />
            </div>

            {/* Consultation Fee */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="font-medium">Consultation Fee</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₦{consultationFee.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {isEmergency ? "Emergency rate" : "Standard rate"}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This covers initial consultation and assessment. Actual service costs will be quoted separately.
                </p>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              data-testid="button-submit-request"
            >
              {isLoading ? "Processing..." : `Pay ₦${consultationFee.toLocaleString()} & Request Service`}
            </Button>
          </form>

          <div className="text-xs text-center text-muted-foreground">
            By submitting, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}