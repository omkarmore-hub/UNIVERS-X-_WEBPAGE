import React from 'react';
import { MessageSquarePlus } from 'lucide-react';

interface FooterProps {
  onOpenFeedback: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFeedback }) => {
  return (
    <footer className="bg-black/90 backdrop-blur-md border-t border-white/10 py-4 px-6 text-center z-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
      <div className="flex items-center gap-2 text-white/60 font-alumni text-lg">
        <span className="w-2 h-2 rounded-full bg-[#15BFE2] animate-pulse"></span>
        <span>Team Univers Portal &copy; 2026. All rights reserved.</span>
      </div>

      <button
        onClick={onOpenFeedback}
        className="font-nav text-lg text-white/90 hover:text-[#15BFE2] transition-colors flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-lg border border-white/15 hover:border-[#15BFE2]/50 cursor-pointer"
        id="feedback-btn"
      >
        <MessageSquarePlus size={16} className="text-[#15BFE2]" />
        <span>Feedback</span>
      </button>
    </footer>
  );
};
