import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, ZoomIn, ZoomOut, RotateCcw, Calendar, Filter, X,
  Bookmark, Clock, ArrowRight, ChevronDown, Play, Pause, SkipForward, SkipBack,
} from 'lucide-react';
import { CATEGORIES, formatYear } from '../lib/constants';
import { useBookmarks } from '../context/BookmarkContext';
import { useToast } from '../context/ToastContext';
import { useEvents, useCivilizations, useDynasties, type EventRow, type CivilizationRow, type DynastyRow } from '../lib/queries';
import { SkeletonTimeline } from '../components/ui/Skeletons';

const YEAR_MIN = -3500;
const YEAR_MAX = 2000;
const YEAR_RANGE = YEAR_MAX - YEAR_MIN;

const CATEGORY_COLORS: Record<string, string> = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.color]));
const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

const FILTER_CATEGORIES = CATEGORIES.map((c) => c.id);
const FILTER_LABELS: Record<string, string> = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

// Unused — kept for reference
void formatYear;

const JUMP_OPTIONS = [
  { label: 'Year', type: 'year' },
  { label: 'Century', type: 'century' },
  { label: 'Dynasty', type: 'dynasty' },
  { label: 'Empire', type: 'empire' },
  { label: 'Era', type: 'era' },
];

const ERA_PRESETS = [
  { label: 'Indus Valley', year: -2500 },
  { label: 'Vedic Period', year: -1000 },
  { label: "Buddha's Era", year: -500 },
  { label: 'Mauryan Empire', year: -300 },
  { label: 'Gupta Golden Age', year: 400 },
  { label: 'Chola Empire', year: 1000 },
  { label: 'Delhi Sultanate', year: 1200 },
  { label: 'Mughal Empire', year: 1600 },
  { label: 'Freedom Struggle', year: 1900 },
];

function getShape(category: string): 'circle' | 'square' | 'diamond' | 'hexagon' | 'triangle' | 'rounded' {
  switch (category) {
    case 'political': return 'square';
    case 'military': return 'diamond';
    case 'religion': return 'triangle';
    case 'science': return 'hexagon';
    case 'literature': return 'rounded';
    case 'architecture': return 'triangle';
    default: return 'circle';
  }
}

function ShapeMarker({ shape, color, size = 14 }: { shape: string; color: string; size?: number }) {
  const props = { fill: color, stroke: color, strokeWidth: 1.5 };
  switch (shape) {
    case 'square': return <rect x={-size/2} y={-size/2} width={size} height={size} rx={2} {...props} />;
    case 'diamond': return <polygon points={`0,${-size/2} ${size/2},0 0,${size/2} ${-size/2},0`} {...props} />;
    case 'hexagon': {
      const pts = Array.from({ length: 6 }, (_, i) => { const a = (i * 60 * Math.PI) / 180; return `${(size/2) * Math.cos(a)},${(size/2) * Math.sin(a)}`; }).join(' ');
      return <polygon points={pts} {...props} />;
    }
    case 'triangle': return <polygon points={`0,${-size/2} ${size/2},${size/2} ${-size/2},${size/2}`} {...props} />;
    case 'rounded': return <rect x={-size/2} y={-size/2} width={size} height={size} rx={size/3} {...props} />;
    default: return <circle r={size/2} {...props} />;
  }
}

export function TimelinePage() {
  const [zoom, setZoom] = useState(1);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [jumpYear, setJumpYear] = useState('');
  const [jumpType, setJumpType] = useState('year');
  const [showJumpMenu, setShowJumpMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const dragScrollStart = useRef(0);
  const velocity = useRef(0);
  const rafRef = useRef<number>();
  const playRafRef = useRef<number>();
  const { data: dbEvents, loading } = useEvents();
  const { data: civilizations } = useCivilizations();
  const { data: dynasties } = useDynasties();
  const TIMELINE_EVENTS = (dbEvents ?? []) as any[];
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { showToast } = useToast();

  const canvasWidth = 6000 * zoom;

  const filteredEvents = useMemo(() => {
    let events = TIMELINE_EVENTS as any[];
    if (activeFilters.size > 0) {
      events = events.filter((e) => activeFilters.has(e.category));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      events = events.filter((e) => e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q));
    }
    return events;
  }, [activeFilters, searchQuery]);

  const eventPositions = useMemo(() => filteredEvents.map((e) => ({ ...e, x: ((e.year - YEAR_MIN) / YEAR_RANGE) * canvasWidth })), [filteredEvents, canvasWidth]);

  const clusters = useMemo(() => {
    if (zoom > 0.5) return eventPositions.map((e) => ({ ...e, cluster: [e] }));
    const threshold = 80;
    const sorted = [...eventPositions].sort((a, b) => a.x - b.x);
    const result: any[] = [];
    let currentCluster: any[] = [];
    let lastX = -Infinity;
    for (const e of sorted) {
      if (e.x - lastX > threshold && currentCluster.length > 0) {
        result.push({ ...currentCluster[0], cluster: currentCluster });
        currentCluster = [];
      }
      currentCluster.push(e);
      lastX = e.x;
    }
    if (currentCluster.length > 0) result.push({ ...currentCluster[0], cluster: currentCluster });
    return result;
  }, [eventPositions, zoom]);

  const toggleFilter = (cat: string) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(cat)) next.delete(cat); else next.add(cat); return next; });
  };

  const scrollToYear = useCallback((year: number) => {
    if (!canvasRef.current) return;
    const x = ((year - YEAR_MIN) / YEAR_RANGE) * canvasWidth;
    canvasRef.current.scrollTo({ left: x - canvasRef.current.clientWidth / 2, behavior: 'smooth' });
  }, [canvasWidth]);

  const jumpToYear = () => {
    const year = parseInt(jumpYear, 10);
    if (isNaN(year)) return;
    scrollToYear(year);
    setShowJumpMenu(false);
  };

  const resetView = () => {
    setZoom(1);
    setActiveFilters(new Set());
    setSearchQuery('');
    canvasRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (canvasRef.current) setScrollLeft(canvasRef.current.scrollLeft);
  };

  // Play animation
  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return;
    let lastTime = 0;
    const speed = 8;
    const animate = (time: number) => {
      if (!canvasRef.current) return;
      if (lastTime === 0) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;
      const maxScroll = canvasWidth - canvasRef.current.clientWidth;
      const newLeft = Math.min(canvasRef.current.scrollLeft + speed * (dt / 16), maxScroll);
      canvasRef.current.scrollLeft = newLeft;
      if (newLeft >= maxScroll) {
        setIsPlaying(false);
        return;
      }
      playRafRef.current = requestAnimationFrame(animate);
    };
    playRafRef.current = requestAnimationFrame(animate);
    return () => { if (playRafRef.current) cancelAnimationFrame(playRafRef.current); };
  }, [isPlaying, canvasWidth]);

  // Wheel zoom
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.15 : 0.15;
        setZoom((z) => Math.max(0.2, Math.min(5, z + delta)));
      }
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === 'ArrowLeft' && canvasRef.current) canvasRef.current.scrollBy({ left: -100, behavior: 'smooth' });
      else if (e.key === 'ArrowRight' && canvasRef.current) canvasRef.current.scrollBy({ left: 100, behavior: 'smooth' });
      else if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(5, z + 0.2));
      else if (e.key === '-') setZoom((z) => Math.max(0.2, z - 0.2));
      else if (e.key === ' ') { e.preventDefault(); setIsPlaying((p) => !p); }
      else if (e.key === 'Home' && canvasRef.current) canvasRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      else if (e.key === 'End' && canvasRef.current) canvasRef.current.scrollTo({ left: canvasWidth, behavior: 'smooth' });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [canvasWidth]);

  // Drag with inertia
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    isDragging.current = true;
    dragStart.current = e.clientX;
    dragScrollStart.current = canvasRef.current.scrollLeft;
    velocity.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !canvasRef.current) return;
    const delta = e.clientX - dragStart.current;
    canvasRef.current.scrollLeft = dragScrollStart.current - delta;
    velocity.current = -delta * 0.5;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const decay = () => {
      if (!canvasRef.current) return;
      if (Math.abs(velocity.current) < 0.5) return;
      canvasRef.current.scrollLeft += velocity.current;
      velocity.current *= 0.95;
      rafRef.current = requestAnimationFrame(decay);
    };
    decay();
  };

  const currentYear = Math.round(YEAR_MIN + (scrollLeft / canvasWidth) * YEAR_RANGE);
  const hovered = hoveredEvent ? TIMELINE_EVENTS.find((e: any) => e.id === hoveredEvent) : null;
  const selected = selectedEvent ? TIMELINE_EVENTS.find((e: any) => e.id === selectedEvent) : null;

  const centuries = useMemo(() => {
    const marks = [];
    for (let y = -3500; y <= 2000; y += 500) marks.push({ year: y, x: ((y - YEAR_MIN) / YEAR_RANGE) * canvasWidth });
    return marks;
  }, [canvasWidth]);

  // Slider scrubbing
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value, 10);
    scrollToYear(year);
  };

  return (
    <div className="flex h-[calc(100vh-72px)] flex-col">
      {/* Top controls */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.06] bg-charcoal/60 px-6 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2 rounded-btn border border-white/[0.08] bg-charcoal-50/40 px-3 py-2">
          <Search className="h-4 w-4 text-ink-muted" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search timeline..."
            className="w-32 bg-transparent font-body text-sm text-ink placeholder:text-ink-muted focus:outline-none sm:w-48"
          />
        </div>

        {/* Play/Pause controls */}
        <div className="flex items-center gap-1 rounded-btn border border-white/[0.08] bg-charcoal-50/40 px-2 py-1.5">
          <button onClick={() => { scrollToYear(YEAR_MIN + 100); }} className="icon-btn h-7 w-7" aria-label="Jump to start">
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-bronze/15 text-bronze transition-all duration-200 hover:bg-bronze/25 hover:scale-105"
            aria-label={isPlaying ? 'Pause' : 'Play timeline'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
          </button>
          <button onClick={() => scrollToYear(YEAR_MAX - 100)} className="icon-btn h-7 w-7" aria-label="Jump to end">
            <SkipForward className="h-4 w-4" />
          </button>
        </div>

        {/* Jump menu */}
        <div className="relative">
          <button onClick={() => setShowJumpMenu(!showJumpMenu)} className="flex items-center gap-2 rounded-btn border border-white/[0.08] bg-charcoal-50/40 px-3 py-2 font-body text-sm text-ink-secondary transition-colors hover:border-bronze/30">
            <Calendar className="h-4 w-4 text-ink-muted" />
            Jump to
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {showJumpMenu && (
            <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-dialog border border-white/10 bg-charcoal-100/95 p-3 shadow-2xl backdrop-blur-xl animate-fade-up">
              <div className="mb-2 flex gap-1">
                {JUMP_OPTIONS.map((opt) => (
                  <button key={opt.type} onClick={() => setJumpType(opt.type)} className={`rounded-md px-2 py-1 font-body text-xs transition-colors ${jumpType === opt.type ? 'bg-bronze/15 text-bronze' : 'text-ink-muted hover:text-ink'}`}>{opt.label}</button>
                ))}
              </div>
              {jumpType === 'year' && (
                <div className="flex gap-2">
                  <input value={jumpYear} onChange={(e) => setJumpYear(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && jumpToYear()} placeholder="e.g. 300 or -500" className="input-premium text-sm" />
                  <button onClick={jumpToYear} className="btn-primary text-xs">Go</button>
                </div>
              )}
              {jumpType === 'century' && (
                <div className="flex flex-wrap gap-1">
                  {[-500, -300, 0, 500, 1000, 1500].map((c) => (
                    <button key={c} onClick={() => { scrollToYear(c); setShowJumpMenu(false); }} className="chip hover:chip-bronze">{formatYear(c)}</button>
                  ))}
                </div>
              )}
              {jumpType === 'dynasty' && (
                <div className="flex max-h-40 flex-wrap gap-1 overflow-y-auto">
                  {(dynasties ?? []).map((d: DynastyRow) => (
                    <button key={d.id} onClick={() => { const y = parseInt(d.period.match(/-?\d+/)?.[0] ?? '0'); scrollToYear(y); setShowJumpMenu(false); }} className="chip hover:chip-bronze">{d.name.replace(' Dynasty', '').replace(' Empire', '')}</button>
                  ))}
                </div>
              )}
              {jumpType === 'empire' && (
                <div className="flex flex-wrap gap-1">
                  {(civilizations ?? []).slice(0, 6).map((c: CivilizationRow) => (
                    <button key={c.id} onClick={() => { const y = parseInt(c.period.match(/-?\d+/)?.[0] ?? '0'); scrollToYear(y); setShowJumpMenu(false); }} className="chip hover:chip-bronze">{c.name.split(' ')[0]}</button>
                  ))}
                </div>
              )}
              {jumpType === 'era' && (
                <div className="flex flex-wrap gap-1">
                  {ERA_PRESETS.map((era) => (
                    <button key={era.label} onClick={() => { scrollToYear(era.year); setShowJumpMenu(false); }} className="chip hover:chip-bronze">{era.label}</button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 rounded-btn border border-white/[0.08] bg-charcoal-50/40 px-2 py-1.5">
          <button onClick={() => setZoom((z) => Math.max(0.2, z - 0.2))} className="icon-btn h-7 w-7" aria-label="Zoom out"><ZoomOut className="h-4 w-4" /></button>
          <span className="w-12 text-center font-numeric text-xs text-ink-muted">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(5, z + 0.2))} className="icon-btn h-7 w-7" aria-label="Zoom in"><ZoomIn className="h-4 w-4" /></button>
        </div>

        <button onClick={resetView} className="btn-ghost"><RotateCcw className="h-4 w-4" />Reset</button>

        <div className="ml-auto flex items-center gap-2">
          <span className="font-numeric text-sm text-bronze">{formatYear(currentYear)}</span>
        </div>
      </div>

      {/* Main timeline area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Left filters panel */}
        <div className="hidden w-56 shrink-0 overflow-y-auto border-r border-white/[0.06] bg-charcoal/40 p-4 md:block">
          <div className="mb-4 flex items-center gap-2"><Filter className="h-4 w-4 text-bronze" /><span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-secondary">Filters</span></div>
          <div className="space-y-1">
            {FILTER_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => toggleFilter(cat)} className={`flex w-full items-center gap-2.5 rounded-btn px-2.5 py-2 text-left transition-colors ${activeFilters.has(cat) ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}`}>
                <span className="h-2.5 w-2.5 rounded-full transition-opacity" style={{ backgroundColor: CATEGORY_COLORS[cat] ?? '#B88746', opacity: activeFilters.has(cat) ? 1 : 0.3 }} />
                <span className={`font-body text-xs ${activeFilters.has(cat) ? 'text-ink' : 'text-ink-muted'}`}>{FILTER_LABELS[cat]}</span>
              </button>
            ))}
          </div>
          {activeFilters.size > 0 && <button onClick={() => setActiveFilters(new Set())} className="mt-3 flex items-center gap-1 font-body text-xs text-bronze hover:text-bronze-light"><X className="h-3 w-3" /> Clear all</button>}
        </div>

        {/* Timeline canvas */}
        <div className="relative flex-1 overflow-hidden">
          <div
            ref={canvasRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="h-full cursor-grab overflow-x-auto overflow-y-hidden scrollbar-hide active:cursor-grabbing"
            style={{ scrollBehavior: 'auto' }}
          >
            <div className="relative h-full" style={{ width: `${canvasWidth}px` }}>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.08]" />
              {centuries.map((m) => (
                <div key={m.year} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${m.x}px` }}>
                  <div className="h-3 w-px bg-white/15" />
                  <span className="absolute top-4 -translate-x-1/2 whitespace-nowrap font-numeric text-[10px] text-ink-muted">{formatYear(m.year)}</span>
                </div>
              ))}
              {clusters.map((cluster: any) => {
                const e = cluster.cluster[0];
                const color = CATEGORY_COLORS[e.category] ?? '#B88746';
                const shape = getShape(e.category);
                const isHovered = hoveredEvent === e.id;
                const isSelected = selectedEvent === e.id;
                const y = e.year % 2 === 0 ? -80 : 80;
                return (
                  <div key={e.id} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer" style={{ left: `${cluster.x}px`, transform: `translate(-50%, ${y}px)` }} onMouseEnter={() => setHoveredEvent(e.id)} onMouseLeave={() => setHoveredEvent(null)} onClick={() => { if (cluster.cluster.length > 1) setZoom((z) => Math.min(5, z * 2)); else { setSelectedEvent(e.id); scrollToYear(e.year); } }}>
                    {cluster.cluster.length > 1 ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-bronze/40 bg-charcoal-100/80 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-bronze">
                        <span className="font-numeric text-xs font-medium text-bronze">{cluster.cluster.length}</span>
                      </div>
                    ) : (
                      <div className={`transition-all duration-200 ${isHovered || isSelected ? 'scale-125' : 'hover:scale-110'}`} style={{ filter: isHovered || isSelected ? `drop-shadow(0 0 8px ${color})` : 'none' }}>
                        <svg width="32" height="32" viewBox="-16 -16 32 32"><ShapeMarker shape={shape} color={color} size={isHovered || isSelected ? 18 : 14} /></svg>
                      </div>
                    )}
                    <div className="absolute left-1/2 w-px bg-white/10" style={{ height: `${Math.abs(y)}px`, top: y < 0 ? '100%' : 'auto', bottom: y > 0 ? '100%' : 'auto' }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hover preview */}
          {hovered && (
            <div className="pointer-events-none absolute top-6 right-6 w-72 animate-fade-in">
              <div className="card-editorial p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="chip chip-bronze capitalize">{CATEGORY_LABELS[hovered.category] ?? hovered.category}</span>
                  <span className="font-numeric text-xs text-bronze">{formatYear(hovered.year)}</span>
                </div>
                <h4 className="mb-2 font-heading text-lg font-medium leading-tight text-ink">{hovered.title}</h4>
                <p className="mb-3 font-body text-xs leading-relaxed text-ink-secondary">{hovered.summary}</p>
                <div className="flex items-center gap-3 font-body text-xs text-ink-muted">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 6 min read</span>
                  <span className="capitalize">{hovered.confidence}</span>
                </div>
              </div>
            </div>
          )}

          {/* Selected event preview panel */}
          {selected && (
            <div className="absolute right-0 top-0 h-full w-80 border-l border-white/[0.06] bg-charcoal-100/90 backdrop-blur-xl animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-secondary">Event Preview</span>
                <button onClick={() => setSelectedEvent(null)} className="icon-btn h-7 w-7" aria-label="Close preview"><X className="h-4 w-4" /></button>
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="chip chip-bronze capitalize">{CATEGORY_LABELS[selected.category] ?? selected.category}</span>
                  <span className="font-numeric text-sm text-bronze">{formatYear(selected.year)}</span>
                </div>
                <h3 className="mb-3 font-heading text-2xl font-medium leading-tight text-ink">{selected.title}</h3>
                <p className="mb-4 font-body text-sm leading-relaxed text-ink-secondary">{selected.summary}</p>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex items-center gap-1 font-body text-xs text-ink-muted"><Clock className="h-3.5 w-3.5" /> 6 min read</span>
                  <span className="font-body text-xs capitalize text-ink-muted">{selected.confidence}</span>
                </div>
                <div className="flex gap-2">
                  <Link to={`/event/${selected.id}`} className="btn-primary flex-1 text-xs">Open<ArrowRight className="h-3.5 w-3.5" /></Link>
                  <button onClick={() => { toggleBookmark({ id: selected.id, title: selected.title, category: selected.category, year: selected.year }); showToast(isBookmarked(selected.id) ? 'Removed bookmark' : 'Bookmarked', 'bookmark'); }} className="btn-secondary" aria-label="Bookmark">
                    <Bookmark className={`h-4 w-4 ${isBookmarked(selected.id) ? 'fill-bronze text-bronze' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Time slider */}
      <div className="border-t border-white/[0.06] bg-charcoal/60 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="font-numeric text-xs text-ink-muted">3300 BCE</span>
          <input
            type="range"
            min={YEAR_MIN}
            max={YEAR_MAX}
            value={currentYear}
            onChange={handleSliderChange}
            className="flex-1 accent-bronze"
            aria-label="Timeline year slider"
          />
          <span className="font-numeric text-xs text-ink-muted">1947 CE</span>
        </div>
      </div>

      {/* Mini overview */}
      <div className="border-t border-white/[0.06] bg-charcoal/60 px-6 py-3 backdrop-blur-sm">
        <div className="relative h-8 rounded-lg bg-charcoal-50/40">
          <div className="absolute top-0 h-full rounded-lg bg-bronze/20 transition-all duration-150" style={{ left: `${(scrollLeft / canvasWidth) * 100}%`, width: `${(canvasRef.current?.clientWidth ?? 800) / canvasWidth * 100}%` }} />
          {eventPositions.slice(0, 30).map((e) => (
            <div key={e.id} className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={{ left: `${(e.x / canvasWidth) * 100}%`, backgroundColor: CATEGORY_COLORS[e.category] ?? '#B88746' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimelinePage;
