import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  CheckCircle, 
  AlertCircle,
  Clock
} from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentData: {
    type: 'consultation' | 'final';
    amount: number;
    description: string;
    requestId: number;
    serviceman?: {
      name: string;
      category: string;
    };
  };
  devMode?: boolean;
  onPaymentComplete?: (success: boolean) => void;
}

export default function PaymentModal({ 
  open, 
  onOpenChange, 
  paymentData, 
  devMode = false,
  onPaymentComplete 
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const paymentMethods = [
    {
      id: 'card' as const,
      name: 'Card Payment',
      icon: CreditCard,
      description: 'Visa, MasterCard, Verve'
    },
    {
      id: 'transfer' as const,
      name: 'Bank Transfer',
      icon: Building,
      description: 'Direct bank transfer'
    },
    {
      id: 'ussd' as const,
      name: 'USSD',
      icon: Smartphone,
      description: 'Pay with phone banking'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    console.log('Processing payment:', {
      ...paymentData,
      method: selectedMethod,
      devMode
    });

    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate for demo
      setPaymentStatus(success ? 'success' : 'failed');
      setIsProcessing(false);
      
      if (success && onPaymentComplete) {
        setTimeout(() => {
          onPaymentComplete(true);
          onOpenChange(false);
        }, 2000);
      }
    }, 3000);
  };

  const handleSimulatePayment = async (simulateResult: 'success' | 'failed') => {
    setIsProcessing(true);
    
    console.log('DEV: Simulating payment result:', simulateResult);
    // todo: call actual mock payment API in dev mode
    
    setTimeout(() => {
      setPaymentStatus(simulateResult);
      setIsProcessing(false);
      
      if (simulateResult === 'success' && onPaymentComplete) {
        setTimeout(() => {
          onPaymentComplete(true);
          onOpenChange(false);
        }, 2000);
      }
    }, 1500);
  };

  const renderPaymentStatus = () => {
    if (paymentStatus === 'success') {
      return (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Payment Successful!</h3>
            <p className="text-green-600">
              Your {paymentData.type} payment has been processed successfully.
            </p>
            {paymentData.type === 'consultation' && (
              <p className="text-sm text-green-600 mt-2">
                You'll receive updates as your request is processed.
              </p>
            )}
          </CardContent>
        </Card>
      );
    }

    if (paymentStatus === 'failed') {
      return (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Payment Failed</h3>
            <p className="text-red-600 mb-4">
              We couldn't process your payment. Please try again.
            </p>
            <Button 
              onClick={() => setPaymentStatus('pending')}
              variant="destructive"
              data-testid="button-retry-payment"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  const statusContent = renderPaymentStatus();
  if (statusContent) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md" data-testid="payment-status-modal">
          {statusContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" data-testid="payment-modal">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            {paymentData.type === 'consultation' ? 'Pay consultation fee to proceed' : 'Pay final bill to confirm service'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>{paymentData.description}</span>
                <span className="font-semibold">₦{paymentData.amount.toLocaleString()}</span>
              </div>
              
              {paymentData.serviceman && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Serviceman:</span>
                  <span>{paymentData.serviceman.name}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Request ID:</span>
                <span>#{paymentData.requestId}</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span>₦{paymentData.amount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DEV Mode Controls */}
          {devMode && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">DEV MODE</Badge>
                  <span className="font-medium">Simulate Payment</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSimulatePayment('success')}
                    disabled={isProcessing}
                    className="flex-1"
                    data-testid="button-simulate-success"
                  >
                    Simulate Success
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleSimulatePayment('failed')}
                    disabled={isProcessing}
                    className="flex-1"
                    data-testid="button-simulate-failure"
                  >
                    Simulate Failure
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Methods */}
          <div className="space-y-3">
            <h3 className="font-medium">Select Payment Method</h3>
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-colors ${
                    selectedMethod === method.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover-elevate'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                  data-testid={`payment-method-${method.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-muted-foreground">{method.description}</div>
                      </div>
                      {selectedMethod === method.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Processing State */}
          {isProcessing && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2 animate-spin" />
                <p className="text-blue-600 font-medium">Processing Payment...</p>
                <p className="text-sm text-blue-500">Please do not close this window</p>
              </CardContent>
            </Card>
          )}

          {/* Payment Button */}
          {!devMode && (
            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full"
              data-testid="button-pay-now"
            >
              {isProcessing ? 'Processing...' : `Pay ₦${paymentData.amount.toLocaleString()} Now`}
            </Button>
          )}

          <div className="text-xs text-center text-muted-foreground">
            Secure payment powered by Paystack. Your payment information is encrypted and secure.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}