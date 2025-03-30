
import { toast } from "sonner";

interface AlertNotification {
  message: string;
  type: 'security' | 'transaction' | 'login';
  phoneNumber?: string;
}

export const sendSecurityAlert = async (notification: AlertNotification): Promise<boolean> => {
  const { message, type, phoneNumber } = notification;
  
  // In a real app, this would connect to a backend SMS service
  // For demo purposes, we'll simulate the SMS sending
  
  console.log(`SECURITY ALERT - Type: ${type}`);
  console.log(`Message: ${message}`);
  console.log(`SMS would be sent to: ${phoneNumber || '+916379461979'}`);
  
  // Show a toast notification
  toast.success("Security alert triggered", {
    description: `A security alert has been sent to ${phoneNumber || '+916379461979'}`,
    duration: 5000,
  });
  
  return true;
};
