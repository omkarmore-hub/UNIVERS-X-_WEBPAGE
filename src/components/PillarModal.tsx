import React, { useState } from 'react';
import { PillarType } from '../types';
import { X, Lightbulb, Microchip, Compass, Users, ArrowRight, CheckCircle2, Sparkles, Send, Download } from 'lucide-react';

interface PillarModalProps {
  pillar: PillarType;
  onClose: () => void;
}

export const PillarModal: React.FC<PillarModalProps> = ({ pillar, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'initiatives' | 'action'>('overview');
  const [ideaText, setIdeaText] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  if (!pillar) return null;

  const getPillarData = () => {
    switch (pillar) {
      case 'INNOVATION':
        return {
          title: 'INNOVATION HUB',
          subtitle: 'Empowering Student Founders, Patents, and Incubation Labs at Tech Univers',
          icon: Lightbulb,
          stats: [
            { label: 'Active Patents', value: '18+' },
            { label: 'Student Startups', value: '24' },
            { label: 'Incubation Grant', value: '$120K' },
            { label: 'Prototyping Labs', value: '6' },
          ],
          initiatives: [
            { title: 'Tech Univers Spark Grant', desc: 'Pre-seed micro grants up to $5,000 for verified student hardware and software prototypes.' },
            { title: 'Patent Assistance Cell', desc: 'Free legal and drafting support for engineering students filing provisional patents.' },
            { title: 'Rapid Prototyping Workshop', desc: '24/7 access to 3D printers, laser cutters, NVIDIA GPU clusters, and PCB printing units.' },
          ],
          actionLabel: 'Submit Innovation Idea',
          actionPlaceholder: 'Describe your breakthrough college project or startup idea...',
        };
      case 'RESEARCH':
        return {
          title: 'RESEARCH PORTAL',
          subtitle: 'Pioneering Frontiers in AI, Quantum Computing, Microelectronics, and Bio-Tech',
          icon: Microchip,
          stats: [
            { label: 'IEEE Papers', value: '140+' },
            { label: 'Research Labs', value: '12' },
            { label: 'HPC Clusters', value: '4 PFLOPS' },
            { label: 'Sponsor Grants', value: '$2.4M' },
          ],
          initiatives: [
            { title: 'Generative AI & LLM Alignment Lab', desc: 'Investigating efficient fine-tuning, multi-modal alignment, and edge LLMs.' },
            { title: 'Autonomous Robotics Division', desc: 'Developing quadrupeds, swarms, and underwater autonomous vehicles.' },
            { title: 'Sustainable Energy & Micro-grids', desc: 'Designing smart grid algorithms and next-generation battery monitoring nodes.' },
          ],
          actionLabel: 'Request Research Collaboration',
          actionPlaceholder: 'Propose a joint research topic or request compute access...',
        };
      case 'FUTURE':
        return {
          title: 'FUTURE & CAREERS',
          subtitle: 'Preparing Students for Tech Trends 2026+, Global Placements, and Higher Studies',
          icon: Compass,
          stats: [
            { label: 'Placement Rate', value: '96.4%' },
            { label: 'Top Tier Recruiters', value: '120+' },
            { label: 'Avg Package', value: '$18.5 LPA' },
            { label: 'Alumni Network', value: '15,000+' },
          ],
          initiatives: [
            { title: '2026+ Skill Benchmark', desc: 'Curriculum integrated with AI systems engineering, Rust, Distributed Systems, and DevOps.' },
            { title: 'Global Alumni Mentorship', desc: '1-on-1 direct guidance from alumni at Google, Microsoft, Meta, DeepMind, and SpaceX.' },
            { title: 'Mock Technical Interview Simulator', desc: 'AI-assisted coding interview, DSA whiteboard practice, and resume builder.' },
          ],
          actionLabel: 'Connect with Placement Cell',
          actionPlaceholder: 'Ask about career roadmaps, placement drives, or resume reviews...',
        };
      case 'COMMUNITY':
        return {
          title: 'COMMUNITY HUB',
          subtitle: 'Vibrant Student Clubs, TechFests, Open Source Collectives, and Peer Forums',
          icon: Users,
          stats: [
            { label: 'Active Clubs', value: '32' },
            { label: 'Annual TechFest', value: '12k+ Attending' },
            { label: 'Open Source PRs', value: '1,200+' },
            { label: 'Study Groups', value: '85' },
          ],
          initiatives: [
            { title: 'HackUnivers 2026', desc: 'Annual 36-hour flagship hackathon with $25,000 in prize pools and sponsor tracks.' },
            { title: 'Developer Circles & Guilds', desc: 'Weekly peer-led coding sessions, CTFs, game dev jams, and UI/UX reviews.' },
            { title: 'Student Welfare & Support', desc: 'Inclusive peer support groups, study room reservations, and campus events.' },
          ],
          actionLabel: 'Join a Club or Propose Event',
          actionPlaceholder: 'Tell us which club you want to join or propose a campus event...',
        };
      default:
        return null;
    }
  };

  const data = getPillarData();
  if (!data) return null;

  const IconComponent = data.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim()) return;
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIdeaText('');
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="glass-panel-custom max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#15BFE2]/30 shadow-[0_0_50px_rgba(21,191,226,0.2)]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-start bg-black/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#15BFE2]/20 border border-[#15BFE2]/50 flex items-center justify-center text-[#15BFE2]">
              <IconComponent size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-alumni font-bold uppercase tracking-wider text-[#15BFE2]">
                {data.title}
              </h2>
              <p className="text-[#15BFE2]/80 font-alumni text-lg">{data.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/10 bg-black/20 font-nav px-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-6 text-lg transition-colors border-b-2 bg-transparent cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#15BFE2] text-[#15BFE2] font-semibold'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab('initiatives')}
            className={`py-3 px-6 text-lg transition-colors border-b-2 bg-transparent cursor-pointer ${
              activeTab === 'initiatives'
                ? 'border-[#15BFE2] text-[#15BFE2] font-semibold'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Key Programs
          </button>
          <button
            onClick={() => setActiveTab('action')}
            className={`py-3 px-6 text-lg transition-colors border-b-2 bg-transparent cursor-pointer ${
              activeTab === 'action'
                ? 'border-[#15BFE2] text-[#15BFE2] font-semibold'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Get Involved
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {data.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                    <div className="text-3xl font-alumni font-bold text-[#15BFE2]">{stat.value}</div>
                    <div className="text-sm font-nav text-white/70 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-black/30 p-5 rounded-xl border border-white/10 space-y-3">
                <h3 className="text-2xl font-alumni text-white flex items-center gap-2">
                  <Sparkles size={20} className="text-[#15BFE2]" />
                  <span>College Strategic Alignment</span>
                </h3>
                <p className="font-alumni text-xl text-white/80 leading-relaxed">
                  Team Univers supports all engineering, science, and design departments by providing direct pathways from classroom concepts to real-world applications.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'initiatives' && (
            <div className="space-y-4">
              {data.initiatives.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 hover:bg-white/10 p-5 rounded-xl border border-white/10 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-2 text-xl font-alumni text-[#15BFE2] font-bold">
                    <CheckCircle2 size={18} className="text-[#15BFE2]" />
                    <span>{item.title}</span>
                  </div>
                  <p className="font-alumni text-lg text-white/80 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'action' && (
            <div className="space-y-4">
              <div className="bg-black/40 p-5 rounded-xl border border-[#15BFE2]/30 space-y-4">
                <h3 className="text-2xl font-alumni text-white font-bold">{data.actionLabel}</h3>
                {submittedMessage ? (
                  <div className="bg-[#15BFE2]/20 border border-[#15BFE2] text-[#15BFE2] p-4 rounded-lg flex items-center gap-3 font-alumni text-xl">
                    <CheckCircle2 size={24} />
                    <span>Thank you! Team Univers has received your proposal and will contact you via your student portal.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                      rows={4}
                      value={ideaText}
                      onChange={(e) => setIdeaText(e.target.value)}
                      placeholder={data.actionPlaceholder}
                      className="w-full bg-black/60 border border-white/20 focus:border-[#15BFE2] rounded-lg p-3 text-white font-alumni text-xl outline-none transition-colors resize-none"
                    ></textarea>
                    <button
                      type="submit"
                      disabled={!ideaText.trim()}
                      className="w-full bg-[#15BFE2] hover:bg-[#0fb0d1] disabled:opacity-50 text-white font-alumni font-bold text-2xl py-3 rounded-lg uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
                    >
                      <Send size={20} />
                      <span>Submit Proposal</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40 flex justify-between items-center text-sm font-nav">
          <span className="text-white/50">Tech Univers Portal &bull; {pillar}</span>
          <button
            onClick={onClose}
            className="text-[#15BFE2] hover:underline bg-transparent border-0 cursor-pointer text-lg"
          >
            Close Window &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
