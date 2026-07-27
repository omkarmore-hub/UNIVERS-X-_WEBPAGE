import React, { useState, useMemo } from 'react';
import { LibraryResource } from '../types';
import { Search, BookOpen, Download, Filter, Star, Eye, FileText, Check, Bookmark, X } from 'lucide-react';

const mockLibraryResources: LibraryResource[] = [
  {
    id: 'res-1',
    title: 'Advanced Data Structures & Algorithms Notes',
    department: 'Computer Science',
    semester: 3,
    type: 'Notes',
    author: 'Prof. R. Vance & Team Univers CS',
    fileSize: '14.2 MB',
    downloadCount: 1420,
    rating: 4.9,
    tags: ['Trees', 'Graphs', 'Dynamic Programming', 'B-Trees', 'Segment Trees'],
    description: 'Comprehensive handwritten and digitized lecture notes covering Graph algorithms, Red-Black Trees, Greedy methods, and complexity analysis.',
    updatedDate: 'July 2026',
    contentPreview: `CHAPTER 1: ADVANCED GRAPH ALGORITHMS
1.1 Dijkstra's Shortest Path & Fibonacci Heaps
   - Time Complexity: O(E + V log V)
   - Edge relaxation mechanics and non-negative weight constraints.

1.2 Bellman-Ford & Negative Cycles
   - Arbitrage detection using logarithmic transformed weights.

CHAPTER 2: DYNAMIC PROGRAMMING MASTERY
2.1 Bitmask DP & Traveling Salesperson
2.2 Matrix Chain Multiplication & Optimal Substructure`
  },
  {
    id: 'res-2',
    title: 'Operating Systems Kernel Design Lab Manual',
    department: 'Computer Science',
    semester: 4,
    type: 'Lab Manual',
    author: 'Tech Univers Systems Dept.',
    fileSize: '8.7 MB',
    downloadCount: 980,
    rating: 4.8,
    tags: ['C++', 'Linux Kernel', 'Paging', 'Semaphores', 'Deadlock'],
    description: 'Practical lab experiments for building a minimal C++ kernel scheduler, virtual memory manager, and process synchronizer.',
    updatedDate: 'June 2026',
    contentPreview: `EXPERIMENT 1: PROCESS SCHEDULING SIMULATOR
Objective: Implement Round Robin with dynamic quantum and Priority Preemptive Scheduler.

Code Blueprint:
struct Process {
    int pid;
    int burst_time;
    int priority;
};`
  },
  {
    id: 'res-3',
    title: 'Digital Signal Processing & Wavelets Syllabus & PYQ',
    department: 'Electronics',
    semester: 5,
    type: 'Exam Paper',
    author: 'Controller of Examinations',
    fileSize: '4.5 MB',
    downloadCount: 730,
    rating: 4.7,
    tags: ['FFT', 'Z-Transform', 'FIR Filters', 'IIR Filters'],
    description: 'Previous 5-year question papers with step-by-step solution keys for DSP and Wavelet Transforms.',
    updatedDate: 'May 2026',
    contentPreview: `QUESTION 1 (20 Marks)
a) Derive the 8-point Decimation-in-Time (DIT) FFT algorithm and compute the total complex multiplications required versus direct DFT calculation.`
  },
  {
    id: 'res-4',
    title: 'Generative AI & LLM Systems Engineering Textbook',
    department: 'Information Tech',
    semester: 6,
    type: 'Textbook',
    author: 'Dr. A. Sharma (AI Research Chair)',
    fileSize: '32.1 MB',
    downloadCount: 2150,
    rating: 5.0,
    tags: ['Transformers', 'RAG', 'Quantization', 'PyTorch', 'vLLM'],
    description: 'Official course textbook for AI systems, distributed GPU training, FlashAttention-2 implementations, and RAG architecture.',
    updatedDate: 'July 2026',
    contentPreview: `MODULE 3: ATTENTION MECHANISMS
- Multi-Head Attention equations: Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) V
- FlashAttention memory hierarchy optimizations and tiled kernel computations.`
  },
  {
    id: 'res-5',
    title: 'Thermodynamics & Heat Transfer Formula Sheet',
    department: 'Mechanical',
    semester: 2,
    type: 'Notes',
    author: 'Mechanical Engineering Association',
    fileSize: '3.1 MB',
    downloadCount: 1120,
    rating: 4.6,
    tags: ['Entropy', 'Carnot Cycle', 'Conduction', 'Radiation'],
    description: 'Quick reference formula booklet for thermodynamics, fluid mechanics equations, and heat exchanger design.',
    updatedDate: 'April 2026',
    contentPreview: `1. FIRST LAW OF THERMODYNAMICS: Q = dU + W
2. CARNOT EFFICIENCY: eta = 1 - (T_low / T_high)
3. FOURIER'S LAW OF HEAT CONDUCTION: q = -k * A * (dT/dx)`
  },
  {
    id: 'res-6',
    title: 'Structural Analysis & Concrete Mechanics Reference',
    department: 'Civil',
    semester: 4,
    type: 'Research Reference',
    author: 'Structural Engineering Board',
    fileSize: '18.4 MB',
    downloadCount: 540,
    rating: 4.7,
    tags: ['FEA', 'Bending Moment', 'Seismic Design', 'Concrete'],
    description: 'Design codes, seismic load calculations, and finite element analysis reference manual for civil engineers.',
    updatedDate: 'June 2026',
    contentPreview: `SECTION 4: SEISMIC RESISTANT DESIGN
- Equivalent static lateral force procedure.
- Base shear equation: V_b = C_s * W`
  }
];

export const LibraryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedSem, setSelectedSem] = useState<number | 'All'>('All');
  const [selectedResource, setSelectedResource] = useState<LibraryResource | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const departments = ['All', 'Computer Science', 'Information Tech', 'Electronics', 'Mechanical', 'Civil', 'General Science'];
  const types = ['All', 'Notes', 'Lab Manual', 'Exam Paper', 'Textbook', 'Research Reference', 'Syllabus'];

  const filteredResources = useMemo(() => {
    return mockLibraryResources.filter((res) => {
      const matchesSearch =
        res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDept = selectedDept === 'All' || res.department === selectedDept;
      const matchesType = selectedType === 'All' || res.type === selectedType;
      const matchesSem = selectedSem === 'All' || res.semester === selectedSem;

      return matchesSearch && matchesDept && matchesType && matchesSem;
    });
  }, [searchTerm, selectedDept, selectedType, selectedSem]);

  const handleDownload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadedIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setDownloadedIds((prev) => ({ ...prev, [id]: false }));
    }, 3000);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 z-10 my-20">
      {/* Header Banner */}
      <div className="glass-panel-custom p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#15BFE2] font-nav mb-1">
              Tech Univers Digital Repository
            </div>
            <h1 className="text-4xl md:text-5xl font-alumni font-bold uppercase tracking-wide text-white">
              COLLEGE KNOWLEDGE LIBRARY
            </h1>
            <p className="text-[#15BFE2]/80 font-alumni text-2xl">
              Access verified lecture notes, lab manuals, syllabus keys, and research publications.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-black/40 px-4 py-3 rounded-xl border border-white/10 font-alumni text-xl">
            <BookOpen className="text-[#15BFE2]" size={24} />
            <span>Over <strong className="text-[#15BFE2]">2,400+</strong> Resources Verified</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes, topics (e.g., 'Trees', 'Kernel', 'FFT', 'LLM')..."
              className="w-full bg-black/60 border border-white/20 focus:border-[#15BFE2] rounded-xl pl-12 pr-4 py-3 text-white font-alumni text-xl outline-none transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center font-nav">
          <div className="flex items-center gap-2 text-white/70 text-sm uppercase">
            <Filter size={16} className="text-[#15BFE2]" />
            <span>Filters:</span>
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-black/60 border border-white/20 text-white px-3 py-1.5 rounded-lg font-nav text-sm outline-none focus:border-[#15BFE2] cursor-pointer"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept} className="bg-black text-white">
                Dept: {dept}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-black/60 border border-white/20 text-white px-3 py-1.5 rounded-lg font-nav text-sm outline-none focus:border-[#15BFE2] cursor-pointer"
          >
            {types.map((t) => (
              <option key={t} value={t} className="bg-black text-white">
                Type: {t}
              </option>
            ))}
          </select>

          {/* Semester Filter */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <span className="text-white/50 text-xs mr-1">Sem:</span>
            <button
              onClick={() => setSelectedSem('All')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                selectedSem === 'All' ? 'bg-[#15BFE2] text-black font-bold' : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              All
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSem(s)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  selectedSem === s ? 'bg-[#15BFE2] text-black font-bold' : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                S{s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const isDownloaded = downloadedIds[res.id];
          const isBookmarked = bookmarkedIds[res.id];

          return (
            <div
              key={res.id}
              onClick={() => setSelectedResource(res)}
              className="glass-panel-custom p-6 flex flex-col justify-between hover:border-[#15BFE2]/60 transition-all cursor-pointer group relative"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded bg-[#15BFE2]/10 border border-[#15BFE2]/30 text-[#15BFE2] font-nav text-xs uppercase font-semibold">
                    {res.type} &bull; Sem {res.semester}
                  </span>
                  <button
                    onClick={(e) => toggleBookmark(res.id, e)}
                    className="text-white/40 hover:text-[#15BFE2] p-1"
                    title={isBookmarked ? 'Bookmarked' : 'Bookmark resource'}
                  >
                    <Bookmark size={18} className={isBookmarked ? 'fill-[#15BFE2] text-[#15BFE2]' : ''} />
                  </button>
                </div>

                <h3 className="text-2xl font-alumni font-bold text-white group-hover:text-[#15BFE2] transition-colors leading-tight mb-2">
                  {res.title}
                </h3>

                <p className="font-alumni text-lg text-white/70 line-clamp-2 mb-4 leading-relaxed">
                  {res.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {res.tags.map((tag) => (
                    <span key={tag} className="text-xs font-nav bg-white/5 text-white/60 px-2 py-0.5 rounded border border-white/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm font-nav">
                <div className="text-white/50 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} className="fill-yellow-400" />
                    {res.rating}
                  </span>
                  <span>{res.fileSize}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedResource(res)}
                    className="p-2 rounded bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-white/10"
                    title="Preview Content"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={(e) => handleDownload(res.id, e)}
                    className="px-3 py-1.5 rounded bg-[#15BFE2] hover:bg-[#0fb0d1] text-black font-semibold transition-colors flex items-center gap-1 text-xs uppercase"
                  >
                    {isDownloaded ? <Check size={14} /> : <Download size={14} />}
                    <span>{isDownloaded ? 'Saved' : 'Get PDF'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="glass-panel-custom p-12 text-center text-white/60 font-alumni text-2xl my-8">
          No resources found matching your search or filters. Try clearing your search term.
        </div>
      )}

      {/* Resource Preview Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="glass-panel-custom max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-[#15BFE2]/40 shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-start bg-black/40">
              <div>
                <div className="text-xs uppercase text-[#15BFE2] font-nav mb-1">
                  {selectedResource.department} &bull; Semester {selectedResource.semester}
                </div>
                <h2 className="text-3xl font-alumni font-bold text-white">{selectedResource.title}</h2>
                <p className="text-white/60 font-nav text-sm mt-1">Author: {selectedResource.author} &bull; Updated: {selectedResource.updatedDate}</p>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="text-white/60 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="bg-black/50 p-4 rounded-xl border border-white/10">
                <h4 className="text-sm font-nav uppercase text-[#15BFE2] mb-1">Summary</h4>
                <p className="font-alumni text-xl text-white/90">{selectedResource.description}</p>
              </div>

              {selectedResource.contentPreview && (
                <div className="bg-black/70 p-5 rounded-xl border border-white/15 font-mono text-sm text-green-400 space-y-2 whitespace-pre-wrap leading-relaxed">
                  <div className="text-xs text-white/50 font-nav uppercase border-b border-white/10 pb-2 mb-2 flex items-center justify-between">
                    <span>Verified Document Excerpt</span>
                    <span>Format: PDF / Digital Note</span>
                  </div>
                  {selectedResource.contentPreview}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/40 flex justify-between items-center font-nav">
              <span className="text-white/60 text-sm">File Size: {selectedResource.fileSize}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedResource(null)}
                  className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-sm"
                >
                  Close
                </button>
                <button
                  onClick={(e) => handleDownload(selectedResource.id, e)}
                  className="px-5 py-2 rounded bg-[#15BFE2] hover:bg-[#0fb0d1] text-black font-semibold text-sm uppercase flex items-center gap-2"
                >
                  <Download size={16} />
                  <span>Download Complete File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
