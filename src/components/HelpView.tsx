import React, { useState } from 'react';
import { FAQItem } from '../types';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Layers, Users, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

const mockFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is Tech Univers & Team Univers?',
    answer: 'Tech Univers is an all-in-one digital college portal developed by Team Univers. It brings together academic notes, student project repositories, research publications, startup incubation support, and AI assistance into a single unified interface.'
  },
  {
    id: 'faq-2',
    category: 'Library',
    question: 'How do I download lecture notes and previous question papers?',
    answer: 'Navigate to the "Library" tab at the top. Use the department dropdown and semester filter pills to locate your course. You can preview document excerpts before clicking "Get PDF" to save the file.'
  },
  {
    id: 'faq-3',
    category: 'Projects',
    question: 'Can I showcase my personal or capstone project on Tech Univers?',
    answer: 'Yes! Go to the "Project" tab, click "Submit Project", fill in your title, category, summary, and GitHub link. Once submitted, your project will immediately appear on the showcase feed.'
  },
  {
    id: 'faq-4',
    category: 'Admissions',
    question: 'How can I apply for startup funding or patent support?',
    answer: 'On the Home view, click the "INNOVATION" pill. Under "Get Involved", submit your prototype idea or patent proposal. The Tech Univers Incubation Cell reviews proposals weekly.'
  },
  {
    id: 'faq-5',
    category: 'Exams',
    question: 'Where can I find mid-term and semester exam schedules?',
    answer: 'Exam timetables and syllabus keys are available under "Library" filtered by Type: "Exam Paper" or "Syllabus". You can also ask the AI Support assistant for real-time schedule updates.'
  }
];

export const HelpView: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Library', 'Projects', 'Admissions', 'Exams'];

  const filteredFaqs = selectedCategory === 'All'
    ? mockFAQs
    : mockFAQs.filter(f => f.category === selectedCategory);

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 z-10 my-20">
      {/* Banner */}
      <div className="glass-panel-custom p-6 md:p-8 mb-8 text-center relative overflow-hidden">
        <div className="text-xs uppercase tracking-widest text-[#15BFE2] font-nav mb-2">
          KNOWLEDGE CENTER
        </div>
        <h1 className="text-4xl md:text-6xl font-alumni font-bold uppercase tracking-wide text-white">
          HELP & FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-xl md:text-3xl font-alumni text-white/80 max-w-2xl mx-auto mt-2">
          Find answers to common questions about Team Univers, digital resources, and campus services.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6 font-nav justify-center">
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

      {/* Accordion List */}
      <div className="space-y-4 mb-12">
        {filteredFaqs.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className="glass-panel-custom overflow-hidden border border-white/15 transition-all"
            >
              <button
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 bg-transparent border-0 cursor-pointer text-white"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-nav uppercase px-2.5 py-1 rounded bg-[#15BFE2]/10 border border-[#15BFE2]/30 text-[#15BFE2]">
                    {faq.category}
                  </span>
                  <h3 className="text-2xl font-alumni font-bold text-white">{faq.question}</h3>
                </div>
                <div className="text-[#15BFE2]">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {isOpen && (
                <div className="p-5 pt-0 border-t border-white/10 font-alumni text-2xl text-white/80 leading-relaxed bg-black/30">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Contact Desk */}
      <div className="glass-panel-custom p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border border-[#15BFE2]/30">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-[#15BFE2]/20 border border-[#15BFE2]/40 flex items-center justify-center text-[#15BFE2]">
            <Mail size={24} />
          </div>
          <div>
            <div className="text-xs font-nav text-white/50 uppercase">Email Support</div>
            <div className="text-xl font-alumni font-bold text-white">support@techunivers.edu</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-[#15BFE2]/20 border border-[#15BFE2]/40 flex items-center justify-center text-[#15BFE2]">
            <Phone size={24} />
          </div>
          <div>
            <div className="text-xs font-nav text-white/50 uppercase">Campus Helpline</div>
            <div className="text-xl font-alumni font-bold text-white">+1 (800) 555-UNIVERS</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-[#15BFE2]/20 border border-[#15BFE2]/40 flex items-center justify-center text-[#15BFE2]">
            <MapPin size={24} />
          </div>
          <div>
            <div className="text-xs font-nav text-white/50 uppercase">Innovation Hub</div>
            <div className="text-xl font-alumni font-bold text-white">Tech Univers Block B, Lab 402</div>
          </div>
        </div>
      </div>
    </main>
  );
};
