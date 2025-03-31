
import { toast } from "sonner";

export interface AlertNotification {
  message: string;
  type: 'security' | 'transaction' | 'login';
  phoneNumber?: string;
}

export const sendSecurityAlert = async (notification: AlertNotification): Promise<boolean> => {
  const { message, type, phoneNumber } = notification;
  const defaultPhone = '+916379461979';
  const targetPhone = phoneNumber || defaultPhone;
  
  // In a real app, this would connect to a backend WhatsApp API service
  // For demo purposes, we're simulating the WhatsApp sending
  
  console.log(`SECURITY ALERT - Type: ${type}`);
  console.log(`Message: ${message}`);
  console.log(`SIMULATION: WhatsApp alert would be sent to: ${targetPhone}`);
  
  // Show different types of toast notifications based on the alert type
  switch (type) {
    case 'security':
      toast.error("Security Alert", {
        description: message,
        duration: 5000,
      });
      break;
    case 'transaction':
      toast.success("Transaction Alert", {
        description: message,
        duration: 5000,
      });
      break;
    case 'login':
      toast.info("Login Alert", {
        description: message,
        duration: 5000,
      });
      break;
    default:
      toast("Notification", {
        description: message,
        duration: 5000,
      });
  }
  
  // Simulate sending the WhatsApp message
  await simulateWhatsAppSending(targetPhone, getFormattedMessage(type, message));
  
  return true;
};

// Simulate sending a WhatsApp message with proper timing
const simulateWhatsAppSending = async (phoneNumber: string, message: string): Promise<void> => {
  // Add delay to simulate network request (remove in production)
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`SIMULATION: WhatsApp message sent to ${phoneNumber}`);
  console.log(`Message content: ${message}`);
  
  // In a real implementation, this would call a server endpoint or use a WhatsApp Business API
};

// Format the message based on type for better readability in WhatsApp
const getFormattedMessage = (type: AlertNotification['type'], message: string): string => {
  const timestamp = new Date().toLocaleString();
  
  switch (type) {
    case 'security':
      return `🔒 *SECURITY ALERT*\n\n${message}\n\nTimestamp: ${timestamp}`;
    case 'transaction':
      return `💰 *TRANSACTION ALERT*\n\n${message}\n\nTimestamp: ${timestamp}`;
    case 'login':
      return `🔑 *LOGIN ALERT*\n\n${message}\n\nTimestamp: ${timestamp}`;
    default:
      return `📱 *NOTIFICATION*\n\n${message}\n\nTimestamp: ${timestamp}`;
  }
};
