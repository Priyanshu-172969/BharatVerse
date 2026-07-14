import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles, ChevronLeft, ChevronRight, Calendar, Quote, BadgeCheck } from 'lucide-react';
import { BharatVerseLogo } from '../brand/BharatVerseLogo';
import { HISTORICAL_QUOTES, ANIMATED_STATS, formatYear } from '../../lib/constants';
import { useCountUp, useInView } from '../../lib/hooks';
import { ParticleField } from '../effects/ParticleField';
import { useEvents, type EventRow } from '../../lib/queries';

function StatCounter({ stat, start }: { stat: typeof ANIMATED_STATS[number]; start: boolean }) {
  const value = useCountUp(stat.value, 2000, start);
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-numeric text-2xl font-medium text-bronze">
        {value.toLocaleString()}{stat.suffix}
      </span>
      <span className="font-body text-xs text-ink-muted">{stat.label}</span>
    </div>
  );
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [statsRef, statsInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [touchStart, setTouchStart] = useState(0);
  const { data: events } = useEvents();
  const carouselRef = useRef<HTMLDivElement>(null);

  const featuredHighlights = (events ?? []).slice(0, 5);
  const todayEvent = useMemo(() => {
    if (!events || events.length === 0) return null;
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    const monthDay = month * 31 + day;
    return events[monthDay % events.length];
  }, [events]);

  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + featuredHighlights.length) % Math.max(featuredHighlights.length, 1)), [featuredHighlights.length]);
  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % Math.max(featuredHighlights.length, 1)), [featuredHighlights.length]);

  useEffect(() => {
    if (featuredHighlights.length === 0) return;
    const interval = setInterval(() => setActiveIndex((i) => (i + 1) % featuredHighlights.length), 6000);
    return () => clearInterval(interval);
  }, [featuredHighlights.length]);

  useEffect(() => {
    const interval = setInterval(() => setQuoteIndex((i) => (i + 1) % HISTORICAL_QUOTES.length), 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) goNext(); else goPrev(); }
  };

  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
      {/* Background layers with parallax */}
      <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06] animate-drift-light"
          style={{ background: 'radial-gradient(circle, rgba(184,135,70,0.4) 0%, transparent 60%)' }}
        />
        <svg
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
          viewBox="0 0 600 600" fill="none" stroke="#B88746" strokeWidth="0.5"
          style={{ animation: 'spin 120s linear infinite' }}
        >
          <circle cx="300" cy="300" r="280" />
          <circle cx="300" cy="300" r="220" />
          <circle cx="300" cy="300" r="160" />
          <circle cx="300" cy="300" r="100" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return <line key={i} x1={300} y1={300} x2={300 + 280 * Math.cos(angle)} y2={300 + 280 * Math.sin(angle)} />;
          })}
          <g opacity="0.5">
            <circle cx="300" cy="300" r="50" />
            <circle cx="300" cy="250" r="50" />
            <circle cx="343" cy="275" r="50" />
            <circle cx="343" cy="325" r="50" />
            <circle cx="300" cy="350" r="50" />
            <circle cx="257" cy="325" r="50" />
            <circle cx="257" cy="275" r="50" />
          </g>
        </svg>
        <div
          className="absolute left-1/3 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, rgba(79,122,82,0.3), transparent 70%)', transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#B88746" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <ParticleField className="absolute inset-0 h-full w-full" count={30} />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]">
        <BharatVerseLogo variant="emblem" className="h-[420px] w-[420px]" />
      </div>

      {/* Content */}
      <div className="container-content relative z-10 grid min-h-[calc(100vh-72px)] grid-cols-1 items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
        {/* Left: Headline + CTAs */}
        <div className="lg:col-span-7">
          <h1 className="mb-5 font-heading text-h1 font-medium leading-[1.05] text-ink text-balance animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Explore 5,000 Years<br />of <span className="text-bronze">Indian Civilization</span>
          </h1>

          <p className="mb-7 max-w-xl font-body text-body-lg leading-relaxed text-ink-secondary text-pretty animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Discover evidence-driven history through interactive timelines, maps, archaeology, inscriptions, literature, and AI-powered historical exploration.
          </p>

          {/* Rotating historical quote */}
          <div className="mb-7 flex max-w-xl items-start gap-3 rounded-card border border-white/[0.06] bg-charcoal-100/40 p-4 animate-fade-up" style={{ animationDelay: '0.35s' }}>
            <Quote className="h-5 w-5 shrink-0 text-bronze/60" />
            <div className="relative min-h-[60px] flex-1">
              {HISTORICAL_QUOTES.map((q, i) => (
                <div key={i} className={`absolute inset-0 transition-all duration-700 ease-calm ${i === quoteIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                  <p className="font-heading text-sm italic leading-relaxed text-ink-secondary">"{q.text}"</p>
                  <p className="mt-1 font-body text-xs text-ink-muted">— {q.source}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-7 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/explore" className="btn-primary group">Start Exploring<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></Link>
            <Link to="/timeline" className="btn-secondary group"><Clock className="h-4 w-4" />Open Timeline</Link>
          </div>

          {/* Animated stats */}
          <div ref={statsRef} className="flex flex-wrap gap-8 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            {ANIMATED_STATS.map((stat) => <StatCounter key={stat.label} stat={stat} start={statsInView} />)}
          </div>
        </div>

        {/* Right: Discovery panel + Today in History */}
        <div className="lg:col-span-5">
          {/* Today in History card */}
          {todayEvent && (
            <Link
              to={`/event/${todayEvent.id}`}
              className="mb-4 flex items-center gap-3 rounded-card border border-bronze/20 bg-bronze/[0.06] p-3 transition-all duration-200 hover:border-bronze/40 hover:bg-bronze/[0.1] animate-fade-up"
              style={{ animationDelay: '0.55s' }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bronze/15">
                <Calendar className="h-5 w-5 text-bronze" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-bronze">Today in History</p>
                <p className="truncate font-body text-sm text-ink">{todayEvent.title}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-bronze" />
            </Link>
          )}

          {/* Featured discovery card */}
          <div
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="card-editorial relative overflow-hidden animate-fade-up"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="relative h-32 overflow-hidden border-b border-white/[0.06]">
              <div className="absolute inset-0 transition-all duration-700 ease-calm" style={{ background: `linear-gradient(135deg, ${getDiscoveryGradient(activeIndex)})` }} />
              <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 400 128" fill="none">
                <circle cx="200" cy="64" r="50" stroke="#F4F1EA" strokeWidth="0.5" opacity="0.3" />
                <circle cx="200" cy="64" r="35" stroke="#F4F1EA" strokeWidth="0.5" opacity="0.2" />
                <circle cx="200" cy="64" r="20" stroke="#F4F1EA" strokeWidth="0.5" opacity="0.15" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-100 via-charcoal-100/30 to-transparent" />
              <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-bronze" />
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-secondary">Featured Discoveries</span>
                </div>
                <span className="font-numeric text-xs text-ink-muted">{activeIndex + 1} / {featuredHighlights.length}</span>
              </div>
            </div>

            <div className="p-5">
              <div className="relative min-h-[180px]">
                {featuredHighlights.map((event: EventRow, i: number) => (
                  <div key={event.id} className={`absolute inset-0 transition-all duration-700 ease-calm ${i === activeIndex ? 'opacity-100 translate-y-0' : i < activeIndex ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <Link to={`/event/${event.id}`} className="block">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="chip chip-bronze capitalize">{event.category}</span>
                        <span className="font-numeric text-sm text-bronze">{event.year < 0 ? `${Math.abs(event.year)} BCE` : `${event.year} CE`}</span>
                        {event.confidence === 'verified' && (
                          <span className="flex items-center gap-1 rounded-full border border-indus/30 bg-indus/10 px-2 py-0.5">
                            <BadgeCheck className="h-3 w-3 text-indus" />
                            <span className="font-body text-[10px] font-medium text-indus">Verified</span>
                          </span>
                        )}
                      </div>
                      <h3 className="mb-2 font-heading text-xl font-medium leading-tight text-ink">{event.title}</h3>
                      <p className="mb-3 line-clamp-2 font-body text-sm leading-relaxed text-ink-secondary">{event.summary}</p>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 font-body text-xs text-ink-muted"><Clock className="h-3 w-3" /> 6 min read</span>
                        <span className="font-body text-xs capitalize text-ink-muted">{event.confidence}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Navigation controls */}
              <div className="mt-4 flex items-center justify-between border-t border-white/[0.04] pt-4">
                <div className="flex gap-1.5">
                  {featuredHighlights.map((_, i) => (
                    <button key={i} onClick={() => setActiveIndex(i)} className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-bronze' : 'w-2 bg-white/15'}`} aria-label={`Go to slide ${i + 1}`} />
                  ))}
                </div>
                <div className="flex gap-1">
                  <button onClick={goPrev} className="icon-btn h-7 w-7" aria-label="Previous discovery"><ChevronLeft className="h-4 w-4" /></button>
                  <button onClick={goNext} className="icon-btn h-7 w-7" aria-label="Next discovery"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Mini timeline preview */}
          <div className="mt-4 flex items-center gap-2 px-2">
            <span className="font-numeric text-xs text-ink-muted">3300 BCE</span>
            <div className="relative h-1 flex-1 rounded-full bg-white/[0.06]">
              <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-bronze/40" />
              <div className="absolute left-1/3 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-bronze bg-charcoal" />
            </div>
            <span className="font-numeric text-xs text-ink-muted">1947 CE</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-soft">
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-xs text-ink-muted">Scroll to explore</span>
          <div className="h-8 w-px bg-gradient-to-b from-bronze/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function getDiscoveryGradient(index: number): string {
  const gradients = ['#3A2E22, #1A1E22', '#2E353D, #1A1E22', '#3A424B, #242A30', '#3A2E22, #2E353D', '#2E353D, #3A424B'];
  return gradients[index % gradients.length];
}

export default HeroSection;
