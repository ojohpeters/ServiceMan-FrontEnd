import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

interface ApplicationCardProps {
  application: {
    id: number;
    applicant: {
      name: string;
      email: string;
      phone: string;
      address: string;
      avatar?: string;
    };
    qualifications: string;
    yearsOfExperience: number;
    categories: string[];
    appliedDate: string;
    status: 'pending' | 'approved' | 'rejected';
  };
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onViewDetails?: (id: number) => void;
}

export default function ApplicationCard({ 
  application, 
  onApprove, 
  onReject, 
  onViewDetails 
}: ApplicationCardProps) {
  const getStatusConfig = (status: 'pending' | 'approved' | 'rejected') => {
    const configs = {
      pending: { color: "bg-yellow-500", text: "Pending Review" },
      approved: { color: "bg-green-500", text: "Approved" },
      rejected: { color: "bg-red-500", text: "Rejected" }
    };
    return configs[status] || configs.pending;
  };

  const statusConfig = getStatusConfig(application.status);

  const handleApprove = () => {
    if (onApprove) {
      onApprove(application.id);
      console.log('Approve application:', application.id);
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject(application.id);
      console.log('Reject application:', application.id);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(application.id);
      console.log('View application details:', application.id);
    }
  };

  return (
    <Card className="hover-elevate" data-testid={`application-card-${application.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={application.applicant.avatar} alt={application.applicant.name} />
              <AvatarFallback>{application.applicant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{application.applicant.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Application #{application.id}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className={`${statusConfig.color} text-white`}>
            {statusConfig.text}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Mail className="h-4 w-4 mr-2" />
            <span>{application.applicant.email}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Phone className="h-4 w-4 mr-2" />
            <span>{application.applicant.phone}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{application.applicant.address}</span>
          </div>
        </div>

        {/* Experience */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{application.yearsOfExperience} years experience</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Service Categories:</h4>
          <div className="flex flex-wrap gap-1">
            {application.categories.map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Qualifications */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Qualifications:</h4>
          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            {application.qualifications}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {application.status === 'pending' ? (
            <>
              <Button
                size="sm"
                onClick={handleApprove}
                className="flex-1"
                data-testid={`button-approve-${application.id}`}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleReject}
                className="flex-1"
                data-testid={`button-reject-${application.id}`}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={handleViewDetails}
              className="flex-1"
              data-testid={`button-view-details-${application.id}`}
            >
              <User className="h-4 w-4 mr-1" />
              View Details
            </Button>
          )}
        </div>

        {/* Status Message */}
        {application.status !== 'pending' && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <Clock className="h-4 w-4 inline mr-1" />
              {application.status === 'approved' 
                ? "Applicant has been notified and can proceed to physical verification"
                : "Application has been rejected and applicant has been notified"
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}