import React, { useState } from 'react';
import { FeedbackData } from '../types';
import { X, Star, Send, CheckCircle2, MessageSquarePlus } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState<FeedbackData['category']>('General');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setName('');
      setEmail('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="glass-panel-custom max-w-lg w-full p-6 border border-[#15BFE2]/40 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-2 text-[#15BFE2]">
          <MessageSquarePlus size={28} />
          <h2 className="text-3xl font-alumni font-bold text-white">Share Your Feedback</h2>
        </div>
        <p className="text-white/60 font-nav text-sm mb-6">
          Help Team Univers improve the college portal, library, and AI tools.
        </p>

        {submitted ? (
          <div className="bg-[#15BFE2]/20 border border-[#15BFE2] text-[#15BFE2] p-6 rounded-xl font-alumni text-2xl text-center space-y-2">
            <CheckCircle2 size={36} className="mx-auto" />
            <p>Thank you for your feedback! Team Univers appreciates your input.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating */}
            <div>
              <label className="block font-nav text-xs text-white/70 uppercase mb-2">Overall Experience</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer bg-transparent border-0"
                  >
                    <Star
                      size={28}
                      className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label className="block font-nav text-xs text-white/70 uppercase mb-1">Feedback Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-black/80 border border-white/20 text-white p-2.5 rounded-lg font-nav text-sm outline-none focus:border-[#15BFE2]"
              >
                <option value="General">General Feedback</option>
                <option value="Feature Suggestion">Feature Suggestion</option>
                <option value="Bug Report">Bug Report</option>
                <option value="College Query">College Query</option>
              </select>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-nav text-xs text-white/70 uppercase mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-black/60 border border-white/20 focus:border-[#15BFE2] rounded-lg p-2.5 text-white font-alumni text-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-nav text-xs text-white/70 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@college.edu"
                  className="w-full bg-black/60 border border-white/20 focus:border-[#15BFE2] rounded-lg p-2.5 text-white font-alumni text-xl outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block font-nav text-xs text-white/70 uppercase mb-1">Your Comments</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What did you like or what can we improve on Tech Univers?"
                className="w-full bg-black/60 border border-white/20 focus:border-[#15BFE2] rounded-lg p-2.5 text-white font-alumni text-xl outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={!message.trim()}
              className="w-full bg-[#15BFE2] hover:bg-[#0fb0d1] text-black font-bold font-alumni text-2xl py-3 rounded-lg uppercase flex items-center justify-center gap-2 cursor-pointer border-0 mt-2"
            >
              <Send size={18} />
              <span>Submit Feedback</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
