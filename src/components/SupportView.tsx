import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, HelpCircle, BookOpen, Clock, Calendar, Mail } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const SupportView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Greetings! I am Team Univers Bot. How can I assist you today with college admissions, library access, research labs, or project submissions?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'What are the digital library operating hours?',
    'How can I submit my project to Tech Univers?',
    'Who are the mentors for AI & Robotics?',
    'How do I request incubation grant funding?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Try server AI endpoint or intelligent contextual response
    setTimeout(async () => {
      let botResponse = getContextualBotResponse(query);
      
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const getContextualBotResponse = (q: string): string => {
    const lower = q.toLowerCase();
    if (lower.includes('library') || lower.includes('hour') || lower.includes('timing')) {
      return 'The Tech Univers Digital Library is accessible 24/7 online through our Library tab! Physical study halls and reference reading sections are open Mon–Sat from 7:00 AM to 11:00 PM.';
    }
    if (lower.includes('project') || lower.includes('submit')) {
      return 'You can list your prototype on Tech Univers by navigating to the "Project" tab and clicking the "Submit Project" button! Add your title, GitHub repository, and live demo link.';
    }
    if (lower.includes('grant') || lower.includes('fund') || lower.includes('incubation')) {
      return 'Tech Univers offers pre-seed micro-grants up to $5,000 for student hardware and software prototypes. Head over to the Home screen, click "INNOVATION", and submit your proposal under "Get Involved".';
    }
    if (lower.includes('team') || lower.includes('mentor') || lower.includes('omkar')) {
      return 'Team Univers is led by Omkar More (Founder & Team Lead) alongside Aarav Sharma, Ananya Iyer, and Vikramaditya Deshmukh. You can connect with them directly on the "Team Member" tab.';
    }
    if (lower.includes('hackathon') || lower.includes('hackunivers') || lower.includes('event')) {
      return 'HackUnivers 2026 is our flagship 36-hour national hackathon with $25,000 in prizes! Registration opens next month under the "COMMUNITY" pillar.';
    }
    return `Thank you for asking about "${q}". Team Univers support desk has logged your request. For personalized assistance, you can also write directly to support@techunivers.edu or check our Help? section.`;
  };

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 z-10 my-20 flex flex-col">
      {/* Banner */}
      <div className="glass-panel-custom p-6 md:p-8 mb-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#15BFE2] font-nav mb-1">
            24/7 STUDENT HELP DESK
          </div>
          <h1 className="text-4xl md:text-5xl font-alumni font-bold uppercase tracking-wide text-white">
            AI SUPPORT & ASSISTANT
          </h1>
          <p className="text-[#15BFE2]/80 font-alumni text-2xl">
            Ask any question about syllabus, campus facilities, research labs, or team contact.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#15BFE2]/10 border border-[#15BFE2]/40 px-4 py-2 rounded-xl text-[#15BFE2] font-nav text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#15BFE2] animate-ping"></span>
          <span>Bot Online</span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="glass-panel-custom flex-1 min-h-[450px] flex flex-col overflow-hidden border border-white/15">
        {/* Chat Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-10 h-10 rounded-xl bg-[#15BFE2]/20 border border-[#15BFE2]/50 flex items-center justify-center text-[#15BFE2] shrink-0">
                  <Bot size={22} />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-[#15BFE2] text-black rounded-tr-none font-alumni text-2xl font-semibold'
                    : 'bg-black/60 border border-white/15 text-white rounded-tl-none font-alumni text-2xl leading-relaxed'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`block text-xs font-nav mt-1 ${
                    msg.sender === 'user' ? 'text-black/60 text-right' : 'text-white/40'
                  }`}
                >
                  {msg.time}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <User size={20} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#15BFE2]/20 border border-[#15BFE2]/50 flex items-center justify-center text-[#15BFE2]">
                <Bot size={22} />
              </div>
              <div className="bg-black/60 border border-white/15 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#15BFE2] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#15BFE2] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#15BFE2] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="p-4 bg-black/40 border-t border-white/10">
          <div className="text-xs font-nav text-white/50 uppercase mb-2 flex items-center gap-1">
            <Sparkles size={14} className="text-[#15BFE2]" />
            <span>Suggested Questions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-xs font-nav bg-white/5 hover:bg-[#15BFE2]/20 border border-white/15 hover:border-[#15BFE2] text-white/80 hover:text-[#15BFE2] px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-black/60 border-t border-white/10 flex gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question about Team Univers, syllabus, or college labs..."
            className="flex-1 bg-black/80 border border-white/20 focus:border-[#15BFE2] rounded-xl px-4 py-3 text-white font-alumni text-xl outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-[#15BFE2] hover:bg-[#0fb0d1] disabled:opacity-50 text-black font-bold px-6 rounded-xl transition-all flex items-center justify-center cursor-pointer border-0"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </main>
  );
};
