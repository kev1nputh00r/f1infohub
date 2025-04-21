
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock } from "lucide-react";

type Session = {
  name: string;
  date?: string;
  time?: string;
  completed: boolean;
};

interface RaceWeekModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  raceName: string;
  circuit: string;
  country: string;
  sessions: Session[];
}

const RaceWeekModal: React.FC<RaceWeekModalProps> = ({
  open,
  onOpenChange,
  raceName,
  circuit,
  country,
  sessions = [],
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {raceName} – {circuit}, {country}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.name} className="bg-f1-gray/10 rounded p-3 flex flex-col gap-1">
                  <span className="font-semibold text-f1-red">{session.name}</span>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {session.date ?? "TBA"}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {session.time ?? "TBA"}
                    </span>
                  </div>
                  <span className={`block text-xs font-medium ${session.completed ? "text-green-400" : "text-f1-red"}`}>
                    {session.completed ? "Completed" : "Not Available Yet"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-f1-red font-semibold">
              Session details are not available for this race yet.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RaceWeekModal;
