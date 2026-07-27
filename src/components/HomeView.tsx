import React from 'react';
import { PillarType } from '../types';
import { Lightbulb, Microchip, Compass, Users } from 'lucide-react';

interface HomeViewProps {
  onSelectPillar: (pillar: PillarType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectPillar }) => {
  return (
    <main className="flex-1 flex justify-center items-center p-4 md:p-8 z-10 my-auto">
      <div className="glass-panel-custom p-8 md:p-12 max-w-4xl w-full text-center relative overflow-hidden shadow-2xl">
        {/* Subtle Ambient Accent Light inside panel */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#15BFE2]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#15BFE2]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="Into mb-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[#15BFE2] font-nav mb-2">
            Welcome to Tech Univers
          </div>
          <h1 className="text-4xl md:text-6xl font-alumni font-normal uppercase tracking-wider mb-4 text-white leading-tight">
            Welcome to Tech Univers
          </h1>
          <p className="text-xl md:text-3xl font-alumni leading-relaxed text-white/90 max-w-2xl mx-auto font-light">
            Hi... We are Team Univers. We are here to help you with any information about college.
          </p>
        </div>

        {/* 4 Action Pills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <button
            onClick={() => onSelectPillar('INNOVATION')}
            className="group bg-[#15BFE2] hover:bg-[#0fb0d1] text-white py-5 px-6 rounded-md font-alumni font-bold text-2xl uppercase transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(21,191,226,0.4)] flex flex-col items-center justify-center gap-2 border-0 cursor-pointer"
            id="innovation-btn"
          >
            <Lightbulb className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <span>INNOVATION</span>
          </button>

          <button
            onClick={() => onSelectPillar('RESEARCH')}
            className="group bg-[#15BFE2] hover:bg-[#0fb0d1] text-white py-5 px-6 rounded-md font-alumni font-bold text-2xl uppercase transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(21,191,226,0.4)] flex flex-col items-center justify-center gap-2 border-0 cursor-pointer"
            id="research-btn"
          >
            <Microchip className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <span>RESEARCH</span>
          </button>

          <button
            onClick={() => onSelectPillar('FUTURE')}
            className="group bg-[#15BFE2] hover:bg-[#0fb0d1] text-white py-5 px-6 rounded-md font-alumni font-bold text-2xl uppercase transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(21,191,226,0.4)] flex flex-col items-center justify-center gap-2 border-0 cursor-pointer"
            id="future-btn"
          >
            <Compass className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <span>FUTURE</span>
          </button>

          <button
            onClick={() => onSelectPillar('COMMUNITY')}
            className="group bg-[#15BFE2] hover:bg-[#0fb0d1] text-white py-5 px-6 rounded-md font-alumni font-bold text-2xl uppercase transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(21,191,226,0.4)] flex flex-col items-center justify-center gap-2 border-0 cursor-pointer"
            id="community-btn"
          >
            <Users className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <span>COMMUNITY</span>
          </button>
        </div>

        {/* Subtle helper pill */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 text-white/60 font-nav text-sm">
          <span>💡 Incubation & Startup Lab</span>
          <span>🔬 IEEE & ACM Research Papers</span>
          <span>🚀 Placements & AI Trends 2026+</span>
        </div>
      </div>
    </main>
  );
};
