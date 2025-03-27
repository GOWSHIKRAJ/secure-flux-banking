
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  action?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label, action }) => {
  const handleClick = () => {
    if (action) {
      action();
    } else {
      toast.info(`Feature coming soon: ${label}`, {
        description: "This banking feature is under development and will be available soon.",
      });
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-banking-light hover:bg-banking-light/70 transition-all"
    >
      <Icon className="h-5 w-5 text-banking-accent mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default ActionButton;
