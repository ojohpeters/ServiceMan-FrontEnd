import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calculator, Clock, DollarSign } from "lucide-react";

interface EstimateFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: {
    id: number;
    client: {
      name: string;
      avatar?: string;
    };
    category: string;
    description?: string;
    isEmergency: boolean;
    consultationFee: number;
  };
  onSubmit?: (estimate: { jobId: number; amount: number; breakdown: string; timeEstimate: string }) => void;
}

export default function EstimateForm({ open, onOpenChange, job, onSubmit }: EstimateFormProps) {
  const [formData, setFormData] = useState({
    materialCost: "",
    laborCost: "",
    timeEstimate: "",
    breakdown: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const materialCost = parseFloat(formData.materialCost) || 0;
  const laborCost = parseFloat(formData.laborCost) || 0;
  const totalCost = materialCost + laborCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (totalCost <= 0) {
      alert("Please enter valid cost estimates");
      return;
    }

    if (!formData.timeEstimate.trim()) {
      alert("Please provide a time estimate");
      return;
    }

    setIsSubmitting(true);

    const estimate = {
      jobId: job.id,
      amount: totalCost,
      breakdown: formData.breakdown || `Materials: ₦${materialCost.toLocaleString()}, Labor: ₦${laborCost.toLocaleString()}`,
      timeEstimate: formData.timeEstimate
    };

    console.log('Submitting estimate:', estimate);
    
    if (onSubmit) {
      onSubmit(estimate);
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      // Reset form
      setFormData({
        materialCost: "",
        laborCost: "",
        timeEstimate: "",
        breakdown: ""
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" data-testid="estimate-form-modal">
        <DialogHeader>
          <DialogTitle>Submit Cost Estimate</DialogTitle>
          <DialogDescription>
            Provide a detailed estimate for Job #{job.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={job.client.avatar} alt={job.client.name} />
                  <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{job.client.name}</h3>
                  <p className="text-sm text-muted-foreground">{job.category}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">Job #{job.id}</Badge>
                    {job.isEmergency && (
                      <Badge variant="destructive">Emergency</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Consultation Fee</div>
                  <div className="font-semibold">₦{job.consultationFee.toLocaleString()}</div>
                </div>
              </div>
              
              {job.description && (
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Description:</strong> {job.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cost Breakdown */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <Calculator className="h-4 w-4 mr-2" />
                Cost Breakdown
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="material-cost">Material Cost (₦)</Label>
                  <Input
                    id="material-cost"
                    name="materialCost"
                    type="number"
                    min="0"
                    step="100"
                    placeholder="0"
                    value={formData.materialCost}
                    onChange={handleInputChange}
                    data-testid="input-material-cost"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="labor-cost">Labor Cost (₦)</Label>
                  <Input
                    id="labor-cost"
                    name="laborCost"
                    type="number"
                    min="0"
                    step="100"
                    placeholder="0"
                    value={formData.laborCost}
                    onChange={handleInputChange}
                    data-testid="input-labor-cost"
                  />
                </div>
              </div>

              {/* Total Display */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total Estimate:</span>
                    <span className="text-2xl font-bold text-primary">
                      ₦{totalCost.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Time Estimate */}
            <div className="space-y-2">
              <Label htmlFor="time-estimate" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Estimated Completion Time
              </Label>
              <Input
                id="time-estimate"
                name="timeEstimate"
                type="text"
                placeholder="e.g., 2-3 days, 1 week, etc."
                value={formData.timeEstimate}
                onChange={handleInputChange}
                required
                data-testid="input-time-estimate"
              />
            </div>

            {/* Additional Details */}
            <div className="space-y-2">
              <Label htmlFor="breakdown">Detailed Breakdown (Optional)</Label>
              <Textarea
                id="breakdown"
                name="breakdown"
                placeholder="Provide additional details about the work, materials needed, timeline, etc."
                value={formData.breakdown}
                onChange={handleInputChange}
                rows={4}
                data-testid="input-breakdown"
              />
            </div>

            {/* Important Notes */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Important Notes:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• This estimate will be reviewed by admin before final pricing</li>
                  <li>• Admin may apply markup based on company policies</li>
                  <li>• Final cost will be communicated to the client for approval</li>
                  <li>• You'll be notified once client confirms payment</li>
                </ul>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                data-testid="button-cancel-estimate"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || totalCost <= 0}
                className="flex-1"
                data-testid="button-submit-estimate"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Submit Estimate
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}