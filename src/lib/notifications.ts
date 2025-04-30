
import { toast } from "@/hooks/use-toast";
import type { ToastActionElement } from "@/components/ui/toast";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: ToastActionElement;
}

// Default durations in milliseconds
const DEFAULT_DURATIONS = {
  success: 3000,
  error: 5000,
  warning: 4000,
  info: 3000,
};

export const notify = {
  success: (options: NotificationOptions) => {
    return toast({
      title: options.title || "Success",
      description: options.description,
      duration: options.duration || DEFAULT_DURATIONS.success,
      action: options.action,
      variant: "default",
      className: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-400",
    });
  },
  
  error: (options: NotificationOptions) => {
    return toast({
      title: options.title || "Error",
      description: options.description,
      duration: options.duration || DEFAULT_DURATIONS.error,
      action: options.action,
      variant: "destructive",
    });
  },
  
  warning: (options: NotificationOptions) => {
    return toast({
      title: options.title || "Warning",
      description: options.description,
      duration: options.duration || DEFAULT_DURATIONS.warning,
      action: options.action,
      variant: "default",
      className: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-900/30 dark:text-yellow-400",
    });
  },
  
  info: (options: NotificationOptions) => {
    return toast({
      title: options.title || "Information",
      description: options.description,
      duration: options.duration || DEFAULT_DURATIONS.info,
      action: options.action,
      variant: "default",
      className: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-900/30 dark:text-blue-400",
    });
  },
  
  custom: (options: NotificationOptions & { className?: string }) => {
    return toast({
      title: options.title,
      description: options.description,
      duration: options.duration || 3000,
      action: options.action,
      className: options.className,
    });
  }
};
