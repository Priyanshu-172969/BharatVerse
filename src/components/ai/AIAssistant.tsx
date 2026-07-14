import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, X, Send, BookOpen, FileText, GitCompare, GraduationCap, Lightbulb, ChevronRight } from 'lucide-react';
import { useEvents, type EventRow } from '../../lib/queries';

const SUGGESTED_PROMPTS = [
  'Explain the Kalinga War',
  'Summarize the Gupta Golden Age',
  'Compare the Mauryan and Mughal empires',
  'Why did the Indus Valley Civilization decline?',
  'Explain like I am twelve: the caste system',
  'Show scholarly interpretations of Ashoka',
];

const QUICK_ACTIONS = [
  { label: 'Summarize', icon: FileText, prompt: 'Summarize this article' },
  { label: 'Explain simply', icon: Lightbulb, prompt: 'Explain this topic simply' },
  { label: 'Compare', icon: GitCompare, prompt: 'Compare civilizations' },
  { label: 'Study notes', icon: GraduationCap, prompt: 'Generate study notes' },
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
  followUps?: string[];
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const { data: events } = useEvents();
  const location = useLocation();

  const currentEvent = location.pathname.startsWith('/event/')
    ? (events ?? []).find((e: EventRow) => e.id === location.pathname.split('/')[2]) ?? null
    : null;

  const contextPrompt = currentEvent
    ? `You are viewing "${currentEvent.title}". Ask me about it!`
    : 'Ask me anything about Indian civilization.';

  const sendPrompt = (prompt: string) => {
    if (!prompt.trim()) return;
    const userMsg: Message = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response: Message = {
        role: 'assistant',
        content: `This is an excellent question about ${prompt.toLowerCase()}. In the full BharatVerse experience, I would provide a detailed, evidence-cited response drawing from archaeological findings, inscriptional records, and scholarly research. I would also surface related events, contradictory viewpoints, and a confidence assessment of the available evidence.`,
        citations: ['Archaeological Survey of India', 'Corpus of Ashokan Inscriptions', 'Thapar, "Early India" (2002)'],
        followUps: ['What were the long-term consequences?', 'How does this compare to similar events?', 'What evidence supports this account?'],
      };
      setTyping(false);
      setMessages((prev) => [...prev, response]);
    }, 1200);
  };

  // Reset context when page changes
  useEffect(() => {
    if (open) {
      setMessages([]);
    }
  }, [location.pathname, open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-bronze text-charcoal shadow-[0_8px_32px_-4px_rgba(184,135,70,0.5)] transition-all duration-300 ease-calm hover:scale-105 hover:bg-bronze-light lg:bottom-6"
        aria-label="BharatVerse AI Assistant"
      >
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-44 right-6 z-[120] flex h-[540px] w-[calc(100vw-3rem)] max-w-md flex-col overflow-hidden rounded-dialog border border-white/10 bg-charcoal-100/95 shadow-2xl backdrop-blur-xl animate-fade-up lg:bottom-24">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bronze/15">
                <Sparkles className="h-4 w-4 text-bronze" />
              </div>
              <div>
                <h3 className="font-heading text-base font-medium text-ink">BharatVerse AI</h3>
                <p className="font-body text-xs text-ink-muted">Your historical guide</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="icon-btn h-8 w-8"><X className="h-4 w-4" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5">
            {messages.length === 0 ? (
              <div>
                <p className="mb-4 font-body text-sm text-ink-secondary">{contextPrompt}</p>
                {currentEvent && (
                  <div className="mb-4 rounded-card border border-bronze/20 bg-bronze/[0.06] p-3">
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-bronze">Current Article</p>
                    <p className="font-body text-sm text-ink">{currentEvent.title}</p>
                  </div>
                )}
                {/* Quick actions */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {QUICK_ACTIONS.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button key={action.label} onClick={() => sendPrompt(action.prompt)} className="flex items-center gap-1.5 rounded-btn border border-white/[0.06] bg-charcoal-50/40 px-3 py-1.5 font-body text-xs text-ink-secondary transition-colors hover:border-bronze/30 hover:text-bronze">
                        <Icon className="h-3.5 w-3.5" /> {action.label}
                      </button>
                    );
                  })}
                </div>
                <div className="space-y-2">
                  <p className="px-1 font-body text-xs font-semibold uppercase tracking-wider text-ink-muted">Suggested Questions</p>
                  {SUGGESTED_PROMPTS.map((p) => (
                    <button key={p} onClick={() => sendPrompt(p)} className="flex w-full items-center gap-2 rounded-btn border border-white/[0.06] bg-charcoal-50/40 px-3 py-2.5 text-left transition-colors hover:border-bronze/30 hover:bg-charcoal-50/60">
                      <BookOpen className="h-3.5 w-3.5 shrink-0 text-bronze" />
                      <span className="font-body text-xs text-ink-secondary">{p}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] ${msg.role === 'user' ? '' : 'w-full'}`}>
                      <div className={`rounded-2xl px-4 py-2.5 font-body text-sm ${msg.role === 'user' ? 'bg-bronze text-charcoal' : 'border border-white/[0.06] bg-charcoal-50/60 text-ink-secondary'}`}>
                        {msg.content}
                      </div>
                      {msg.citations && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {msg.citations.map((c) => (
                            <span key={c} className="flex items-center gap-1 rounded-md border border-white/[0.06] bg-charcoal-50/40 px-2 py-1 font-body text-[10px] text-ink-muted">
                              <BookOpen className="h-2.5 w-2.5 text-bronze" /> {c}
                            </span>
                          ))}
                        </div>
                      )}
                      {msg.followUps && (
                        <div className="mt-2 space-y-1">
                          {msg.followUps.map((f) => (
                            <button key={f} onClick={() => sendPrompt(f)} className="flex w-full items-center gap-1.5 rounded-btn px-2 py-1.5 text-left font-body text-xs text-bronze transition-colors hover:bg-bronze/[0.06]">
                              <ChevronRight className="h-3 w-3" /> {f}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1.5 rounded-2xl border border-white/[0.06] bg-charcoal-50/60 px-4 py-3">
                      <span className="h-2 w-2 animate-pulse-soft rounded-full bg-bronze" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 animate-pulse-soft rounded-full bg-bronze" style={{ animationDelay: '200ms' }} />
                      <span className="h-2 w-2 animate-pulse-soft rounded-full bg-bronze" style={{ animationDelay: '400ms' }} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/[0.06] p-3">
            <div className="flex items-center gap-2 rounded-btn border border-white/[0.08] bg-charcoal-50/40 px-3 py-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendPrompt(input)}
                placeholder="Ask about history..."
                className="flex-1 bg-transparent font-body text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <button onClick={() => sendPrompt(input)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-bronze text-charcoal transition-colors hover:bg-bronze-light" aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIAssistant;
