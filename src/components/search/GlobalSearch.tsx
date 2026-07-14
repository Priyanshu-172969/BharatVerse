import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Clock, TrendingUp, ArrowRight, X, Mic,
  Calendar, Globe, Crown, User, Swords, Sparkle, BookOpen, Scroll, Landmark, MapPin, FileText, Coins, Building2,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { formatYear } from '../../lib/constants';

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

type ResultType = 'event' | 'civilization' | 'personality' | 'dynasty';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  year?: number;
  period?: string;
  preview: string;
  type: ResultType;
}

const TYPE_ICONS: Record<ResultType, React.ComponentType<{ className?: string }>> = {
  event: Calendar,
  civilization: Globe,
  personality: User,
  dynasty: Crown,
};

const TYPE_LABELS: Record<ResultType, string> = {
  event: 'Events',
  civilization: 'Civilizations',
  personality: 'People',
  dynasty: 'Dynasties',
};

const TRENDING = ['Mauryan Empire', 'Ashoka', 'Gupta Golden Age', 'Indian Independence', 'Indus Valley', 'Buddhism'];

export function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('bv-recent-searches');
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setActiveIndex(0);
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query.trim();
    let cancelled = false;

    const timer = setTimeout(async () => {
      const [eventsRes, civRes, persRes, dynRes] = await Promise.all([
        supabase.from('events').select('id,title,year,category,summary,confidence').or(`title.ilike.%${q}%,summary.ilike.%${q}%`).limit(10),
        supabase.from('civilizations').select('id,name,period,description').or(`name.ilike.%${q}%,description.ilike.%${q}%`).limit(5),
        supabase.from('personalities').select('id,name,role,era,legacy').or(`name.ilike.%${q}%,legacy.ilike.%${q}%`).limit(10),
        supabase.from('dynasties').select('id,name,period,founder,capital').or(`name.ilike.%${q}%,founder.ilike.%${q}%`).limit(5),
      ]);

      if (cancelled) return;

      const all: SearchResult[] = [
        ...((eventsRes.data as any[]) ?? []).map((e) => ({ id: e.id, title: e.title, category: e.category, year: e.year, preview: e.summary, type: 'event' as const })),
        ...((civRes.data as any[]) ?? []).map((c) => ({ id: c.id, title: c.name, category: 'civilization', period: c.period, preview: c.description, type: 'civilization' as const })),
        ...((persRes.data as any[]) ?? []).map((p) => ({ id: p.id, title: p.name, category: p.role ?? 'Personality', period: p.era, preview: p.legacy ?? '', type: 'personality' as const })),
        ...((dynRes.data as any[]) ?? []).map((d) => ({ id: d.id, title: d.name, category: 'dynasty', period: d.period, preview: `Founder: ${d.founder ?? 'Unknown'}`, type: 'dynasty' as const })),
      ];

      setResults(all);
      setLoading(false);
    }, 300);

    return () => { cancelled = true; clearTimeout(timer); };
  }, [query]);

  const grouped = useMemo(() => {
    const acc: Record<string, SearchResult[]> = {};
    for (const r of results) (acc[r.type] ??= []).push(r);
    return acc;
  }, [results]);

  const saveRecent = (q: string) => {
    const updated = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('bv-recent-searches', JSON.stringify(updated));
  };

  const handleResultClick = (r: SearchResult) => {
    saveRecent(query || r.title);
    if (r.type === 'event') navigate(`/event/${r.id}`);
    else if (r.type === 'civilization') navigate(`/explore?tab=${r.id}`);
    else if (r.type === 'personality') navigate('/personalities');
    else if (r.type === 'dynasty') navigate('/dynasties');
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { if (results[activeIndex]) handleResultClick(results[activeIndex]); else if (results[0]) handleResultClick(results[0]); }
  };

  const startVoiceSearch = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    setIsListening(true);
    recognition.onresult = (event: any) => { setQuery(event.results[0][0].transcript); setIsListening(false); };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center pt-[12vh] px-4">
      <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-md animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-2xl animate-fade-up">
        <div className="rounded-dialog border border-white/10 bg-charcoal-100/95 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
            <Search className="h-5 w-5 text-bronze" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
              onKeyDown={handleKeyDown}
              placeholder="Search 5,000 years of history... (events, people, dynasties, civilizations)"
              className="flex-1 bg-transparent font-body text-lg text-ink placeholder:text-ink-muted focus:outline-none"
              aria-label="Search"
            />
            <button onClick={startVoiceSearch} className={`icon-btn h-8 w-8 ${isListening ? 'text-bronze animate-pulse-soft' : ''}`} aria-label="Voice search">
              <Mic className="h-4 w-4" />
            </button>
            <kbd className="hidden rounded-md border border-white/10 px-2 py-0.5 font-numeric text-xs text-ink-muted sm:block">ESC</kbd>
            <button onClick={onClose} className="icon-btn h-8 w-8 sm:hidden" aria-label="Close search"><X className="h-5 w-5" /></button>
          </div>

          <div className="max-h-[55vh] overflow-y-auto p-2">
            {!query ? (
              <div className="p-3">
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="mb-2 flex items-center gap-2 px-2 font-body text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      <Clock className="h-3.5 w-3.5" /> Recently Viewed
                    </div>
                    {recentSearches.map((s) => (
                      <button key={s} onClick={() => setQuery(s)} className="flex w-full items-center gap-3 rounded-btn px-3 py-2 text-left transition-colors hover:bg-white/[0.04]">
                        <Clock className="h-4 w-4 text-ink-muted" />
                        <span className="font-body text-sm text-ink-secondary">{s}</span>
                      </button>
                    ))}
                  </div>
                )}
                <div>
                  <div className="mb-2 flex items-center gap-2 px-2 font-body text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    <TrendingUp className="h-3.5 w-3.5" /> Trending Searches
                  </div>
                  <div className="flex flex-wrap gap-2 px-2">
                    {TRENDING.map((t) => (
                      <button key={t} onClick={() => setQuery(t)} className="chip hover:chip-bronze">{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            ) : loading ? (
              <div className="px-5 py-12 text-center">
                <p className="font-body text-sm text-ink-muted">Searching...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <p className="font-body text-sm text-ink-muted">No results found for "{query}". Try a different search.</p>
              </div>
            ) : (
              Object.entries(grouped).map(([type, items]) => (
                <div key={type} className="mb-2">
                  <div className="flex items-center justify-between px-3 py-1.5">
                    <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      {TYPE_LABELS[type as ResultType] ?? type}
                    </span>
                    <span className="font-numeric text-xs text-ink-muted">{items.length}</span>
                  </div>
                  {items.map((r) => {
                    const idx = results.indexOf(r);
                    const Icon = TYPE_ICONS[r.type] ?? Search;
                    return (
                      <button
                        key={r.id}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => handleResultClick(r)}
                        className={`flex w-full items-start gap-3 rounded-btn px-3 py-2.5 text-left transition-colors ${idx === activeIndex ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]'}`}
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-charcoal-200/50">
                          <Icon className="h-4 w-4 text-bronze" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-body text-sm font-medium text-ink">{r.title}</span>
                            {r.year !== undefined && <span className="shrink-0 font-numeric text-xs text-bronze">{formatYear(r.year)}</span>}
                            {r.period && <span className="shrink-0 font-numeric text-xs text-bronze">{r.period}</span>}
                          </div>
                          <p className="truncate font-body text-xs text-ink-muted">{r.preview}</p>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-2.5">
            <div className="flex items-center gap-4 font-body text-xs text-ink-muted">
              <span className="flex items-center gap-1"><kbd className="rounded border border-white/10 px-1.5 py-0.5 font-numeric">↑↓</kbd> navigate</span>
              <span className="flex items-center gap-1"><kbd className="rounded border border-white/10 px-1.5 py-0.5 font-numeric">↵</kbd> open</span>
            </div>
            <span className="font-body text-xs text-ink-muted">{results.length > 0 && `${results.length} results`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalSearch;
