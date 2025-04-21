
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface YouTubeHighlightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId?: string | null;
  raceName: string;
}

const YouTubeHighlightModal: React.FC<YouTubeHighlightModalProps> = ({
  open,
  onOpenChange,
  videoId,
  raceName,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl min-h-[380px] flex flex-col items-center">
      <DialogHeader>
        <DialogTitle>
          {raceName} Highlights
        </DialogTitle>
      </DialogHeader>
      {videoId ? (
        <div className="w-full h-72 md:h-96">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`${raceName} Highlights`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-lg h-full"
          />
        </div>
      ) : (
        <div className="w-full h-72 flex items-center justify-center text-f1-red font-bold text-lg">
          Highlight unavailable for this race.
        </div>
      )}
    </DialogContent>
  </Dialog>
);

export default YouTubeHighlightModal;

