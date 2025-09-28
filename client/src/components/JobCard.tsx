import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Clock, 
  DollarSign,
  Play,
  CheckCircle,
  AlertTriangle,
  User
} from "lucide-react";
import EmergencyBadge from "./EmergencyBadge";

interface JobCardProps {
  job: {
    id: number;
    client: {
      name: string;
      phone: string;
      avatar?: string;
    };
    category: string;
    requestedDate: string;
    status: 'notified' | 'estimate_submitted' | 'confirmed' | 'in_progress' | 'completed';
    isEmergency: boolean;
    description?: string;
    consultationFee: number;
    estimatedCost?: number;
    finalCost?: number;
    location: string;
  };
  onReportCost?: (jobId: number) => void;
  onStartJob?: (jobId: number) => void;
  onCompleteJob?: (jobId: number) => void;
  onContactClient?: (phone: string) => void;
}

export default function JobCard({ job, onReportCost, onStartJob, onCompleteJob, onContactClient }: JobCardProps) {
  const getStatusConfig = (status: 'notified' | 'estimate_submitted' | 'confirmed' | 'in_progress' | 'completed') => {
    const configs = {
      notified: { 
        color: "bg-blue-500", 
        text: "New Job", 
        description: "Visit client and provide estimate" 
      },
      estimate_submitted: { 
        color: "bg-yellow-500", 
        text: "Estimate Submitted", 
        description: "Waiting for admin to set final cost" 
      },
      confirmed: { 
        color: "bg-green-500", 
        text: "Payment Confirmed", 
        description: "Ready to start work" 
      },
      in_progress: { 
        color: "bg-orange-500", 
        text: "In Progress", 
        description: "Work is ongoing" 
      },
      completed: { 
        color: "bg-gray-500", 
        text: "Completed", 
        description: "Job finished successfully" 
      }
    };
    return configs[status] || configs.notified;
  };

  const statusConfig = getStatusConfig(job.status);

  const handleContactClient = () => {
    if (onContactClient) {
      onContactClient(job.client.phone);
      console.log('Contact client:', job.client.phone);
    }
  };

  const handleReportCost = () => {
    if (onReportCost) {
      onReportCost(job.id);
      console.log('Report cost for job:', job.id);
    }
  };

  const handleStartJob = () => {
    if (onStartJob) {
      onStartJob(job.id);
      console.log('Start job:', job.id);
    }
  };

  const handleCompleteJob = () => {
    if (onCompleteJob) {
      onCompleteJob(job.id);
      console.log('Complete job:', job.id);
    }
  };

  return (
    <Card className="hover-elevate" data-testid={`job-card-${job.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">Job #{job.id}</CardTitle>
              {job.isEmergency && <EmergencyBadge />}
            </div>
            <Badge variant="secondary" className={`${statusConfig.color} text-white`}>
              {statusConfig.text}
            </Badge>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>₦{job.consultationFee.toLocaleString()} consultation</div>
            {job.finalCost && (
              <div className="font-semibold text-foreground">
                ₦{job.finalCost.toLocaleString()} total
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Client Info */}
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <Avatar className="h-10 w-10">
            <AvatarImage src={job.client.avatar} alt={job.client.name} />
            <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium">{job.client.name}</h3>
            <p className="text-sm text-muted-foreground">{job.category}</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleContactClient}
            data-testid={`button-contact-${job.id}`}
          >
            <Phone className="h-3 w-3 mr-1" />
            Call
          </Button>
        </div>

        {/* Job Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Requested: {new Date(job.requestedDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>

          {job.description && (
            <div className="text-sm">
              <strong>Description:</strong> {job.description}
            </div>
          )}
        </div>

        {/* Status Description */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <Clock className="h-4 w-4 inline mr-1" />
            {statusConfig.description}
          </p>
        </div>

        {/* Cost Information */}
        {job.estimatedCost && (
          <div className="flex items-center justify-between text-sm">
            <span>Your Estimate:</span>
            <span className="font-medium">₦{job.estimatedCost.toLocaleString()}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {job.status === 'notified' && (
            <Button 
              onClick={handleReportCost}
              className="flex-1"
              data-testid={`button-report-cost-${job.id}`}
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Report Cost
            </Button>
          )}

          {job.status === 'confirmed' && (
            <Button 
              onClick={handleStartJob}
              className="flex-1"
              data-testid={`button-start-${job.id}`}
            >
              <Play className="h-4 w-4 mr-1" />
              Start Job
            </Button>
          )}

          {job.status === 'in_progress' && (
            <Button 
              onClick={handleCompleteJob}
              className="flex-1"
              data-testid={`button-complete-${job.id}`}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark Complete
            </Button>
          )}

          {(job.status === 'estimate_submitted' || job.status === 'completed') && (
            <Button 
              variant="outline" 
              className="flex-1"
              disabled
              data-testid={`button-waiting-${job.id}`}
            >
              {job.status === 'estimate_submitted' ? 'Waiting for Admin' : 'Job Completed'}
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={handleContactClient}
            data-testid={`button-contact-icon-${job.id}`}
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}