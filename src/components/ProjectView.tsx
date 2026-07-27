import React, { useState } from 'react';
import { Project } from '../types';
import { Star, Github, ExternalLink, PlusCircle, CheckCircle2, Sparkles, X, Code2 } from 'lucide-react';

const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Univers AI Study Assistant',
    subtitle: 'Local-first multimodal rag system for college curriculum',
    category: 'AI & ML',
    author: 'Team Univers AI Lab',
    teamMembers: ['Omkar More', 'Aarav Sharma'],
    stars: 342,
    status: 'Completed',
    summary: 'A fast browser-based study assistant that ingests PDFs, generates flashcards, and answers complex engineering queries using lightweight fine-tuned models.',
    techStack: ['React', 'TypeScript', 'PyTorch', 'vLLM', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
    githubUrl: 'https://github.com/omkarmore-hub/AI-UNIVERS-',
    demoUrl: 'https://omkarmore-hub.github.io/AI-UNIVERS-/',
    highlights: ['99% Retrieval Accuracy on CS textbooks', 'Zero Server Latency', 'Multi-language translation']
  },
  {
    id: 'proj-2',
    title: 'Autonomous Campus Quadruped Robot',
    subtitle: '4-legged robot for campus security and delivery',
    category: 'Robotics',
    author: 'Robotics Club Lead',
    teamMembers: ['Vikramaditya D.', 'Siddharth P.'],
    stars: 189,
    status: 'In Progress',
    summary: 'Custom 3D-printed quadruped with torque-controlled BLDC actuators and real-time obstacle avoidance ROS2 stack.',
    techStack: ['ROS2', 'C++', 'OpenCV', 'LiDAR', 'Raspberry Pi 5'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600',
    githubUrl: 'https://github.com',
    highlights: ['Custom inverse kinematics engine', 'Payload capacity up to 5kg', 'LiDAR SLAM mapping']
  },
  {
    id: 'proj-3',
    title: 'Decentralized Academic Credential Ledger',
    subtitle: 'Verifiable degree certificates on Polygon blockchain',
    category: 'Web3',
    author: 'Information Tech Guild',
    teamMembers: ['Ananya Iyer', 'Rahul K.'],
    stars: 124,
    status: 'Completed',
    summary: 'Tamper-proof digital diploma verification system enabling instant employer certificate validation without third-party fees.',
    techStack: ['Solidity', 'Ethers.js', 'Polygon', 'React', 'IPFS'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600',
    githubUrl: 'https://github.com',
    highlights: ['Zero-knowledge proof verification', 'Gas-optimized smart contracts', 'Instant PDF QR code scanner']
  },
  {
    id: 'proj-4',
    title: 'Smart Energy Grid & IoT Monitoring Node',
    subtitle: 'Real-time solar panel monitoring across campus buildings',
    category: 'IoT',
    author: 'Electronics Dept. Research',
    teamMembers: ['Meera N.', 'Karan S.'],
    stars: 95,
    status: 'Prototype',
    summary: 'LoRaWAN sensor network collecting telemetry from solar roofing to optimize campus power distribution.',
    techStack: ['ESP32', 'LoRaWAN', 'MQTT', 'Grafana', 'Python'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    githubUrl: 'https://github.com',
    highlights: ['Sub-GHz long range mesh', '15-minute predictive yield models', 'Ultra low power deep sleep']
  }
];

export const ProjectView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [projectList, setProjectList] = useState<Project[]>(mockProjects);
  const [starsMap, setStarsMap] = useState<Record<string, number>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activeProjectDetail, setActiveProjectDetail] = useState<Project | null>(null);

  // New Project Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'AI & ML' | 'Robotics' | 'Web3' | 'IoT' | 'Full Stack' | 'Cybersecurity'>('AI & ML');
  const [newSummary, setNewSummary] = useState('');
  const [newGithub, setNewGithub] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const categories = ['All', 'AI & ML', 'Robotics', 'Web3', 'IoT', 'Full Stack', 'Cybersecurity'];

  const filteredProjects = selectedCategory === 'All'
    ? projectList
    : projectList.filter((p) => p.category === selectedCategory);

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarsMap((prev) => {
      const currentAdded = prev[id] || 0;
      return { ...prev, [id]: currentAdded === 1 ? 0 : 1 };
    });
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      subtitle: 'Student submitted project',
      category: newCategory,
      author: 'You (Student)',
      teamMembers: ['You'],
      stars: 1,
      status: 'Prototype',
      summary: newSummary,
      techStack: ['TypeScript', 'React'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600',
      githubUrl: newGithub || 'https://github.com',
      highlights: ['Newly listed on Tech Univers']
    };

    setProjectList([newProj, ...projectList]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowSubmitModal(false);
      setNewTitle('');
      setNewSummary('');
      setNewGithub('');
    }, 2000);
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 z-10 my-20">
      {/* Banner */}
      <div className="glass-panel-custom p-6 md:p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#15BFE2] font-nav mb-1">
            TECH UNIVERS SHOWCASE
          </div>
          <h1 className="text-4xl md:text-5xl font-alumni font-bold uppercase tracking-wide text-white">
            STUDENT & RESEARCH PROJECTS
          </h1>
          <p className="text-[#15BFE2]/80 font-alumni text-2xl">
            Explore cutting-edge prototypes, open-source repositories, and capstone creations.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="bg-[#15BFE2] hover:bg-[#0fb0d1] text-black font-alumni font-bold text-2xl py-3 px-6 rounded-xl uppercase transition-all flex items-center gap-2 cursor-pointer border-0 shadow-[0_0_20px_rgba(21,191,226,0.3)]"
        >
          <PlusCircle size={22} />
          <span>Submit Project</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8 font-nav">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#15BFE2] text-black font-bold shadow-[0_0_15px_rgba(21,191,226,0.3)]'
                : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj) => {
          const addedStars = starsMap[proj.id] || 0;
          const displayStars = proj.stars + addedStars;

          return (
            <div
              key={proj.id}
              onClick={() => setActiveProjectDetail(proj)}
              className="glass-panel-custom overflow-hidden flex flex-col justify-between hover:border-[#15BFE2]/60 transition-all group cursor-pointer"
            >
              <div>
                {/* Image Cover */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-nav text-xs text-[#15BFE2] font-semibold uppercase">
                    {proj.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-nav text-xs text-white/80">
                    {proj.status}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-3xl font-alumni font-bold text-white group-hover:text-[#15BFE2] transition-colors leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-white/60 font-nav text-xs">{proj.subtitle}</p>

                  <p className="font-alumni text-xl text-white/80 line-clamp-3 leading-relaxed">
                    {proj.summary}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-nav bg-white/5 border border-white/10 text-white/70 px-2.5 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-white/10 mt-4 flex justify-between items-center font-nav text-sm">
                <button
                  onClick={(e) => toggleStar(proj.id, e)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                    addedStars
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Star size={16} className={addedStars ? 'fill-yellow-400 text-yellow-400' : ''} />
                  <span>{displayStars}</span>
                </button>

                <div className="flex gap-3">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white"
                    title="View Code on GitHub"
                  >
                    <Github size={18} />
                  </a>
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-[#15BFE2]/20 hover:bg-[#15BFE2]/30 border border-[#15BFE2]/40 text-[#15BFE2]"
                      title="Open Live Preview"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Project Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="glass-panel-custom max-w-lg w-full p-6 border border-[#15BFE2]/40 shadow-2xl relative">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-alumni font-bold text-white mb-2">Submit Your Project</h2>
            <p className="text-white/60 font-nav text-sm mb-6">List your prototype on Tech Univers directory.</p>

            {submittedSuccess ? (
              <div className="bg-[#15BFE2]/20 border border-[#15BFE2] text-[#15BFE2] p-4 rounded-lg font-alumni text-xl flex items-center gap-3">
                <CheckCircle2 size={24} />
                <span>Project submitted successfully! It is now live on the catalog.</span>
              </div>
            ) : (
              <form onSubmit={handleAddProject} className="space-y-4">
                <div>
                  <label className="block font-nav text-xs text-white/70 uppercase mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. AI Autonomous Quadcopter"
                    className="w-full bg-black/60 border border-white/20 focus:border-[#15BFE2] rounded-lg p-2.5 text-white font-alumni text-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block font-nav text-xs text-white/70 uppercase mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-black/80 border border-white/20 text-white p-2.5 rounded-lg font-nav text-sm outline-none"
                  >
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-nav text-xs text-white/70 uppercase mb-1">Summary / Features</label>
                  <textarea
                    rows={3}
                    required
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Brief description of hardware/software tech stack..."
                    className="w-full bg-black/60 border border-white/20 focus:border-[#15BFE2] rounded-lg p-2.5 text-white font-alumni text-xl outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-nav text-xs text-white/70 uppercase mb-1">GitHub Link (Optional)</label>
                  <input
                    type="url"
                    value={newGithub}
                    onChange={(e) => setNewGithub(e.target.value)}
                    placeholder="https://github.com/your-username/your-repo"
                    className="w-full bg-black/60 border border-white/20 focus:border-[#15BFE2] rounded-lg p-2.5 text-white font-alumni text-xl outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#15BFE2] hover:bg-[#0fb0d1] text-black font-bold font-alumni text-2xl py-3 rounded-lg uppercase flex items-center justify-center gap-2 cursor-pointer border-0 mt-4"
                >
                  <Code2 size={20} />
                  <span>Publish to Directory</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Active Project Detail Modal */}
      {activeProjectDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="glass-panel-custom max-w-2xl w-full p-6 border border-[#15BFE2]/40 shadow-2xl relative">
            <button
              onClick={() => setActiveProjectDetail(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-[#15BFE2] font-nav text-xs uppercase mb-2">
              <span>{activeProjectDetail.category}</span>
              <span>&bull;</span>
              <span>{activeProjectDetail.status}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-alumni font-bold text-white mb-2">{activeProjectDetail.title}</h2>
            <p className="text-white/70 font-alumni text-2xl mb-4">{activeProjectDetail.summary}</p>

            <div className="space-y-3 mb-6 bg-black/40 p-4 rounded-xl border border-white/10">
              <h4 className="font-nav text-sm text-[#15BFE2] uppercase">Key Technical Highlights</h4>
              <ul className="space-y-1">
                {activeProjectDetail.highlights.map((h, i) => (
                  <li key={i} className="font-alumni text-xl text-white/90 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#15BFE2]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-4 font-nav">
              <span className="text-white/50 text-xs">Authors: {activeProjectDetail.teamMembers.join(', ')}</span>
              <div className="flex gap-3">
                <a
                  href={activeProjectDetail.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm flex items-center gap-2"
                >
                  <Github size={16} />
                  <span>Repository</span>
                </a>
                {activeProjectDetail.demoUrl && (
                  <a
                    href={activeProjectDetail.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-[#15BFE2] hover:bg-[#0fb0d1] text-black font-semibold text-sm flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    <span>Live App</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
