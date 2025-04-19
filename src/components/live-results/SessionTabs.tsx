
import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <div className="mt-6">
      <Tabs 
        value={activeSession}
        onValueChange={onSessionChange}
        className="w-full"
      >
        <TabsList className="h-auto flex flex-wrap gap-2 bg-transparent w-full">
          {Object.entries(sessions).map(([key, session]) => (
            <TabsTrigger
              key={key}
              value={key}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-f1-red data-[state=active]:text-white",
                "data-[state=inactive]:bg-f1-gray/20 data-[state=inactive]:text-gray-300 data-[state=inactive]:hover:bg-f1-gray/30"
              )}
            >
              {session.title}
              <span className="ml-2 text-xs opacity-70">{session.time}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SessionTabs;
