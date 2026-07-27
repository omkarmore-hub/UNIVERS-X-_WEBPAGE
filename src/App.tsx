import React, { useState } from 'react';
import { ActiveTab, PillarType } from './types';
import { ShaderBackground } from './components/ShaderBackground';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { PillarModal } from './components/PillarModal';
import { LibraryView } from './components/LibraryView';
import { TeamView } from './components/TeamView';
import { ProjectView } from './components/ProjectView';
import { SupportView } from './components/SupportView';
import { HelpView } from './components/HelpView';
import { FeedbackModal } from './components/FeedbackModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedPillar, setSelectedPillar] = useState<PillarType>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[#15BFE2] selection:text-black">
      {/* Animated WebGL Liquid Shader Background */}
      <ShaderBackground />

      {/* Top Navbar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col relative z-10 pt-16">
        {activeTab === 'home' && (
          <HomeView onSelectPillar={(pillar) => setSelectedPillar(pillar)} />
        )}
        {activeTab === 'library' && <LibraryView />}
        {activeTab === 'team' && <TeamView />}
        {activeTab === 'project' && <ProjectView />}
        {activeTab === 'support' && <SupportView />}
        {activeTab === 'help' && <HelpView />}
      </div>

      {/* Footer Bar */}
      <Footer onOpenFeedback={() => setFeedbackOpen(true)} />

      {/* Pillar Detail Modal (Innovation, Research, Future, Community) */}
      <PillarModal pillar={selectedPillar} onClose={() => setSelectedPillar(null)} />

      {/* Feedback Modal */}
      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
