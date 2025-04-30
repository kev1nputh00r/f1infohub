
import React from "react";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notifications";
import { MessageCircle, BellRing } from "lucide-react";

export const NotificationDemo: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      <Button
        onClick={() => 
          notify.success({
            title: "Success!",
            description: "Your action was completed successfully.",
          })
        }
        variant="outline"
        className="bg-green-50 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
      >
        <BellRing className="mr-2 h-4 w-4" />
        Success
      </Button>

      <Button
        onClick={() => 
          notify.error({
            title: "Error!",
            description: "There was a problem with your action.",
          })
        }
        variant="outline"
        className="bg-red-50 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
      >
        <BellRing className="mr-2 h-4 w-4" />
        Error
      </Button>

      <Button
        onClick={() => 
          notify.warning({
            title: "Warning!",
            description: "Be careful with this action.",
          })
        }
        variant="outline"
        className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
      >
        <BellRing className="mr-2 h-4 w-4" />
        Warning
      </Button>

      <Button
        onClick={() => 
          notify.info({
            title: "Information",
            description: "Here's some useful information for you.",
          })
        }
        variant="outline"
        className="bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        Info
      </Button>
    </div>
  );
};
