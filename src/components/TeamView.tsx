import React, { useState } from 'react';
import { TeamMember } from '../types';
import { Github, Linkedin, Mail, Award, Code2, Sparkles, Send, X, User } from 'lucide-react';

const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Omkar More',
    role: 'Founder & Team Lead',
    department: 'Computer Science & AI',
    year: 'Final Year Lead',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Lead architect behind Tech Univers. Passionate about WebGL shaders, distributed systems, and building AI tools for college students.',
    skills: ['React', 'TypeScript', 'WebGL', 'Node.js', 'PyTorch', 'System Architecture'],
    projects: ['Tech Univers Portal', 'AI Note Summarizer', 'GPU Cluster Manager'],
    email: 'omkar@techunivers.edu',
    github: 'https://github.com/omkarmore-hub',
    linkedin: 'https://linkedin.com',
    featuredPaper: 'Efficient WebGL Shader Compilation in Sandboxed Browsers'
  },
  {
    id: 'team-2',
    name: 'Aarav Sharma',
    role: 'AI & Research Co-Lead',
    department: 'Information Technology',
    year: '4th Year',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Researches LLM quantization and multimodal attention mechanisms. Core maintainer of the college AI assistant.',
    skills: ['Python', 'Transformers', 'vLLM', 'FastAPI', 'Docker', 'C++'],
    projects: ['Univers LLM Engine', 'Smart Library Indexer'],
    email: 'aarav@techunivers.edu',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-3',
    name: 'Ananya Iyer',
    role: 'Full Stack & UI Architect',
    department: 'Computer Science',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    bio: 'Crafts glassmorphism interfaces and fluid animations. Spearheads developer experience and open-source college projects.',
    skills: ['Tailwind CSS', 'Motion', 'React', 'GraphQL', 'Figma', 'Next.js'],
    projects: ['Glass UI Design System', 'Student Event Hub'],
    email: 'ananya@techunivers.edu',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-4',
    name: 'Vikramaditya Deshmukh',
    role: 'Robotics & Hardware Coordinator',
    department: 'Electronics & Robotics',
    year: '4th Year',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Designs quadrupeds and autonomous drone navigation algorithms. Leads the Tech Univers Innovation Hardware Lab.',
    skills: ['ROS2', 'Embedded C++', 'PCB Design', 'MATLAB', 'Computer Vision'],
    projects: ['Rover Delta V', 'Autonomous Drone Swarm'],
    email: 'vikram@techunivers.edu',
    github: 'https://github.com',
  }
];

export const TeamView: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactMessage('');
      setSelectedMember(null);
    }, 2500);
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 z-10 my-20">
      {/* Banner */}
      <div className="glass-panel-custom p-6 md:p-8 mb-8 text-center relative overflow-hidden">
        <div className="text-xs uppercase tracking-widest text-[#15BFE2] font-nav mb-2">
          MEET TEAM UNIVERS
        </div>
        <h1 className="text-4xl md:text-6xl font-alumni font-bold uppercase tracking-wide text-white">
          THE CREATORS & LEADERS
        </h1>
        <p className="text-xl md:text-3xl font-alumni text-white/80 max-w-2xl mx-auto mt-2">
          We are a student-led team of innovators, engineers, and researchers dedicated to powering college learning.
        </p>
      </div>

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockTeamMembers.map((member) => (
          <div
            key={member.id}
            className="glass-panel-custom p-6 flex flex-col justify-between hover:border-[#15BFE2]/60 transition-all duration-300 group hover:-translate-y-1"
          >
            <div>
              {/* Profile Image with Cyan Ring */}
              <div className="relative w-28 h-28 mx-auto mb-4 rounded-full p-1 bg-gradient-to-tr from-[#15BFE2] to-white/20">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="text-center mb-4">
                <h3 className="text-3xl font-alumni font-bold text-white group-hover:text-[#15BFE2] transition-colors">
                  {member.name}
                </h3>
                <div className="text-[#15BFE2] font-nav text-sm uppercase tracking-wider font-semibold">
                  {member.role}
                </div>
                <div className="text-white/60 font-alumni text-lg">
                  {member.department} &bull; {member.year}
                </div>
              </div>

              <p className="font-alumni text-lg text-white/80 text-center line-clamp-3 mb-4 leading-snug">
                {member.bio}
              </p>

              {/* Skill Badges */}
              <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                {member.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-nav bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Buttons */}
            <div className="pt-4 border-t border-white/10 flex justify-center items-center gap-4">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-[#15BFE2] transition-colors p-2"
                  title="GitHub Profile"
                >
                  <Github size={20} />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-[#15BFE2] transition-colors p-2"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
              )}
              <button
                onClick={() => setSelectedMember(member)}
                className="text-white/60 hover:text-[#15BFE2] transition-colors p-2 cursor-pointer bg-transparent border-0"
                title="Send Message"
              >
                <Mail size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Member Details / Contact Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="glass-panel-custom max-w-xl w-full p-6 border border-[#15BFE2]/40 shadow-2xl relative">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedMember.avatar}
                alt={selectedMember.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#15BFE2]"
              />
              <div>
                <h3 className="text-3xl font-alumni font-bold text-white">{selectedMember.name}</h3>
                <p className="text-[#15BFE2] font-nav text-sm">{selectedMember.role} &bull; {selectedMember.email}</p>
              </div>
            </div>

            {messageSent ? (
              <div className="bg-[#15BFE2]/20 border border-[#15BFE2] text-[#15BFE2] p-4 rounded-lg font-alumni text-xl text-center">
                Message sent to {selectedMember.name}! They will reach back via email.
              </div>
            ) : (
              <form onSubmit={handleSendContact} className="space-y-4">
                <label className="block font-nav text-sm text-white/80 uppercase">
                  Send Direct Message to {selectedMember.name.split(' ')[0]}
                </label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder={`Hi ${selectedMember.name.split(' ')[0]}, I would like to collaborate on...`}
                  className="w-full bg-black/60 border border-white/20 focus:border-[#15BFE2] rounded-lg p-3 text-white font-alumni text-xl outline-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={!contactMessage.trim()}
                  className="w-full bg-[#15BFE2] hover:bg-[#0fb0d1] text-black font-bold font-alumni text-2xl py-2.5 rounded-lg uppercase flex items-center justify-center gap-2 cursor-pointer border-0"
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
