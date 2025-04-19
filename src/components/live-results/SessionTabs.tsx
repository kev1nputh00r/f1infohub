
import React from 'react';
import { cn } from '@/lib/utils';

interface Session {
  title: string;
  time: string;
  completed: boolean;
}

interface SessionTabsProps {
  sessions: Record<string, Session>;
  activeSession: string;
  onSessionChange: (session: string) => void;
}

const SessionTabs = ({ sessions, activeSession, onSessionChange }: SessionTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {Object.entries(sessions).map(([key, session]) => (
        <button
          key={key}
          onClick={() => onSessionChange(key)}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeSession === key
              ? "bg-f1-red text-white"
              : "bg-f1-gray/20 text-gray-300 hover:bg-f1-gray/30"
          )}
        >
          {session.title}
          <span className="ml-2 text-xs opacity-70">{session.time}</span>
        </button>
      ))}
    </div>
  );
};

export default SessionTabs;

