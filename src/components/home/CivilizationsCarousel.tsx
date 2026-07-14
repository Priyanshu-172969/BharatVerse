import { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useCivilizations, type CivilizationRow } from '../../lib/queries';

export function CivilizationsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const { data: civilizations, loading } = useCivilizations();

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 380;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) scroll(diff > 0 ? 'right' : 'left');
  };

  return (
    <section className="py-22">
      <div className="container-content mb-10 flex items-end justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-12 bg-bronze/40" />
            <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-bronze">
              Featured Civilizations
            </span>
          </div>
          <h2 className="font-heading text-h2 font-medium leading-tight text-ink">
            Curated Collections of Civilization
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="icon-btn h-9 w-9 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="icon-btn h-9 w-9 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex snap-x-mandatory gap-5 overflow-x-auto px-6 pb-6 scrollbar-hide lg:px-10"
      >
        {(civilizations ?? []).map((civ: CivilizationRow, i: number) => (
          <Link
            key={civ.id}
            to={`/explore?tab=${civ.id}`}
            className="group relative w-[340px] shrink-0 snap-start overflow-hidden rounded-card border border-white/[0.06] bg-charcoal-100/60 transition-all duration-200 ease-calm hover:-translate-y-1.5 hover:border-bronze/30 hover:shadow-[0_12px_40px_-12px_rgba(184,135,70,0.2)]"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* Image / texture area */}
            <div className="relative h-44 overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-500 ease-calm group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${getGradient(civ.id)})`,
                }}
              />
              {/* Subtle pattern overlay */}
              <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 340 176" fill="none">
                <path d="M 0 120 Q 85 100 170 110 T 340 90" stroke="#F4F1EA" strokeWidth="0.5" opacity="0.4" />
                <path d="M 0 140 Q 85 120 170 130 T 340 110" stroke="#F4F1EA" strokeWidth="0.5" opacity="0.3" />
                <path d="M 0 160 Q 85 140 170 150 T 340 130" stroke="#F4F1EA" strokeWidth="0.5" opacity="0.2" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-100 via-charcoal-100/40 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                <span className="font-numeric text-xs text-bronze-light">{civ.period}</span>
                <span className="flex items-center gap-1 font-body text-xs text-ink-muted">
                  <Clock className="h-3 w-3" /> {civ.article_count} articles
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="mb-2 font-heading text-xl font-medium leading-tight text-ink">
                {civ.name}
              </h3>
              <p className="mb-4 line-clamp-2 font-body text-sm leading-relaxed text-ink-muted">
                {civ.description}
              </p>
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-3">
                <span className="font-body text-xs text-ink-muted">Explore collection</span>
                <span className="flex items-center gap-1 font-body text-xs text-bronze opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Bronze accent line on hover */}
            <span className="absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 bg-bronze/50 transition-transform duration-300 ease-calm group-hover:scale-x-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function getGradient(id: string): string {
  const gradients: Record<string, string> = {
    indus: '#2E353D, #1A1E22',
    vedic: '#3A424B, #242A30',
    mahajanapadas: '#2E353D, #1A1E22',
    mauryan: '#3A2E22, #1A1E22',
    gupta: '#2E353D, #242A30',
    chola: '#3A2E22, #2E353D',
    vijayanagara: '#2E353D, #3A424B',
    maratha: '#3A2E22, #1A1E22',
    freedom: '#2E353D, #3A424B',
    universities: '#242A30, #1A1E22',
  };
  return gradients[id] ?? '#2E353D, #1A1E22';
}

export default CivilizationsCarousel;
