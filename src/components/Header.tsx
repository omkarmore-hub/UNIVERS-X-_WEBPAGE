import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'library', label: 'Library' },
    { id: 'team', label: 'Team Member' },
    { id: 'project', label: 'Project' },
    { id: 'support', label: 'Support' },
    { id: 'help', label: 'Help?' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md px-6 py-4 flex justify-between items-center z-50 border-b border-white/10 shadow-lg">
      <button
        onClick={() => setActiveTab('home')}
        className="text-[#15BFE2] font-logo text-xl md:text-2xl font-bold tracking-wider glitch-text flex items-center gap-2 hover:opacity-90 transition-opacity text-left bg-transparent border-0 cursor-pointer"
        id="logoname"
      >
        <span>Tech Univers</span>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 lg:gap-8 items-center" id="desktop-navigation">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-link-item text-lg tracking-widest transition-colors duration-300 bg-transparent border-0 cursor-pointer ${
                isActive ? 'text-[#15BFE2] active font-semibold' : 'text-white/90 hover:text-[#15BFE2]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white hover:text-[#15BFE2] p-2 rounded-lg bg-white/5 border border-white/10"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-[#15BFE2]/30 p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`font-nav text-xl text-left py-2 border-b border-white/5 flex justify-between items-center bg-transparent ${
                activeTab === item.id ? 'text-[#15BFE2] font-bold pl-2 border-l-2 border-[#15BFE2]' : 'text-white/80'
              }`}
            >
              <span>{item.label}</span>
              {activeTab === item.id && <Sparkles size={16} className="text-[#15BFE2]" />}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
