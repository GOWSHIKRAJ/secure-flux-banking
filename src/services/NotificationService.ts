
import { toast } from "sonner";

interface AlertNotification {
  message: string;
  type: 'security' | 'transaction' | 'login';
  phoneNumber?: string;
}

export const sendSecurityAlert = async (notification: AlertNotification): Promise<boolean> => {
  const { message, type, phoneNumber } = notification;
  const defaultPhone = '+916379461979';
  const targetPhone = phoneNumber || defaultPhone;
  
  // In a real app, this would connect to a backend WhatsApp API service
  // For demo purposes, we'll simulate the WhatsApp sending
  
  console.log(`SECURITY ALERT - Type: ${type}`);
  console.log(`Message: ${message}`);
  console.log(`WhatsApp alert would be sent to: ${targetPhone}`);
  
  // Show a toast notification
  toast.success("Security alert triggered", {
    description: `A security notification has been sent to ${targetPhone} via WhatsApp`,
    duration: 5000,
  });
  
  // In a real implementation, this would use a WhatsApp Business API
  // Example: sendToWhatsApp(targetPhone, message);
  
  return true;
};

const sendToWhatsApp = (phoneNumber: string, message: string) => {
  // This function would use the WhatsApp Business API in a real implementation
  // Example integration with WhatsApp API would go here
  console.log(`Sending to WhatsApp: ${phoneNumber}, Message: ${message}`);
};
