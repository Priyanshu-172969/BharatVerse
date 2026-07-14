import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, User, BadgeCheck } from 'lucide-react';
import { CATEGORIES } from '../../lib/constants';
import { useInView } from '../../lib/hooks';
import { useEvents, useFeaturedPersonalities, type EventRow, type PersonalityRow } from '../../lib/queries';

// ─── Domain SVG Icons ────────────────────────────────────────────────────────
// Minimal outline icons, 2px stroke, rounded caps/joins, centered in 40×40 viewBox

function IconPolitical({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <rect x="6" y="22" width="28" height="13" rx="1.5" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <rect x="10" y="16" width="20" height="7" rx="1" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <rect x="15" y="10" width="10" height="7" rx="1" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <line x1="20" y1="6" x2="20" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="6" y1="35" x2="34" y2="35" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <rect x="17" y="27" width="6" height="8" rx="1" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function IconMilitary({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <path d="M20 6L22.5 12H28L23.5 15.5L25.5 22L20 18L14.5 22L16.5 15.5L12 12H17.5L20 6Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M12 26L6 34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 26L34 34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 28L26 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 30C10 30 12 28 20 28C28 28 30 30 30 30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconReligion({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <circle cx="20" cy="20" r="12" stroke={color} strokeWidth="2"/>
      <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="2"/>
      <line x1="20" y1="8" x2="20" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="24" x2="20" y2="32" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="8" y1="20" x2="16" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="24" y1="20" x2="32" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="11.51" y1="11.51" x2="17.17" y2="17.17" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="22.83" y1="22.83" x2="28.49" y2="28.49" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="28.49" y1="11.51" x2="22.83" y2="17.17" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="17.17" y1="22.83" x2="11.51" y2="28.49" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function IconLiterature({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <path d="M10 32C10 32 9 8 18 8C22 8 23 11 20 14C17 17 16 20 20 22C24 24 30 20 30 26C30 30 27 32 22 32" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 32L30 32" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="16" x2="20" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="20" x2="18" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="24" x2="22" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconEconomy({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <line x1="20" y1="6" x2="20" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="8" y1="18" x2="32" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 18L20 10L32 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="11" cy="26" rx="5" ry="5" stroke={color} strokeWidth="2"/>
      <ellipse cx="29" cy="26" rx="5" ry="5" stroke={color} strokeWidth="2"/>
      <line x1="11" y1="31" x2="29" y2="31" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function IconGeography({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <circle cx="20" cy="20" r="13" stroke={color} strokeWidth="2"/>
      <ellipse cx="20" cy="20" rx="6" ry="13" stroke={color} strokeWidth="1.5"/>
      <line x1="7" y1="20" x2="33" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 13.5Q14 16 20 13.5Q26 11 31 13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 26.5Q14 24 20 26.5Q26 29 31 26.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconSociety({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <circle cx="20" cy="12" r="4.5" stroke={color} strokeWidth="2"/>
      <circle cx="10" cy="15" r="3.5" stroke={color} strokeWidth="1.8"/>
      <circle cx="30" cy="15" r="3.5" stroke={color} strokeWidth="1.8"/>
      <path d="M12 32C12 26.5 15.5 23 20 23C24.5 23 28 26.5 28 32" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 32C5 28 7.5 26 10 26" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M35 32C35 28 32.5 26 30 26" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function IconScience({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="2"/>
      <ellipse cx="20" cy="20" rx="13" ry="5.5" stroke={color} strokeWidth="2"/>
      <ellipse cx="20" cy="20" rx="13" ry="5.5" transform="rotate(60 20 20)" stroke={color} strokeWidth="2"/>
      <ellipse cx="20" cy="20" rx="13" ry="5.5" transform="rotate(120 20 20)" stroke={color} strokeWidth="2"/>
    </svg>
  );
}

function IconLaw({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <line x1="20" y1="7" x2="20" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="10" y1="12" x2="30" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="34" x2="26" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="10" y1="12" x2="6" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="30" y1="12" x2="34" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 22C6 22 8 26 10 22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M34 22C34 22 32 26 30 22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function IconArchaeology({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <ellipse cx="20" cy="16" rx="11" ry="8" stroke={color} strokeWidth="2"/>
      <path d="M9 16C9 16 9 28 20 28C31 28 31 16 31 16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="28" x2="14" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="28" x2="26" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="11" y1="34" x2="29" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="8" x2="20" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
    </svg>
  );
}

function IconNumismatics({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <circle cx="20" cy="20" r="13" stroke={color} strokeWidth="2"/>
      <circle cx="20" cy="20" r="9" stroke={color} strokeWidth="1.5"/>
      <circle cx="18" cy="18" r="3.5" stroke={color} strokeWidth="1.5"/>
      <path d="M21 14.5C23 13.5 25.5 14.5 26.5 17C27.5 19.5 26 22 24 23" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconInscriptions({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <rect x="8" y="6" width="24" height="28" rx="2" stroke={color} strokeWidth="2"/>
      <path d="M8 12H32" stroke={color} strokeWidth="1.5"/>
      <line x1="13" y1="17" x2="27" y2="17" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="21" x2="27" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="25" x2="22" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="29" x2="24" y2="29" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 6V4L28 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconGenetics({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <path d="M14 6C14 6 14 12 20 16C26 20 26 26 26 34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 6C26 6 26 12 20 16C14 20 14 26 14 34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="11" x2="26" y2="11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="29" x2="27" y2="29" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="20" x2="28" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconMaritime({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <path d="M20 6V28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 8L34 18H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 28H32L28 35H12L8 28Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 32Q10 30 14 32Q18 34 22 32Q26 30 30 32Q34 34 34 34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconArchitecture({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <line x1="6" y1="34" x2="34" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="6" y1="28" x2="34" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 28V34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 28V34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 28V34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 28V34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 28V20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 28V20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 20H30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 20L20 8L32 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconArt({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
      <circle cx="20" cy="20" r="13" stroke={color} strokeWidth="2"/>
      <circle cx="14" cy="15" r="2.5" stroke={color} strokeWidth="1.5"/>
      <circle cx="22" cy="13" r="2.5" stroke={color} strokeWidth="1.5"/>
      <circle cx="27" cy="19" r="2.5" stroke={color} strokeWidth="1.5"/>
      <path d="M7 24C7 24 10 26 14 24C18 22 20 27 24 26C28 25 32 22 33 24" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M27 33C29 33 31 31 31 29" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const DOMAIN_ICONS: Record<string, React.ComponentType<{ color: string }>> = {
  political:     IconPolitical,
  military:      IconMilitary,
  religion:      IconReligion,
  literature:    IconLiterature,
  economy:       IconEconomy,
  geography:     IconGeography,
  society:       IconSociety,
  science:       IconScience,
  law:           IconLaw,
  archaeology:   IconArchaeology,
  numismatics:   IconNumismatics,
  inscriptions:  IconInscriptions,
  genetics:      IconGenetics,
  maritime:      IconMaritime,
  architecture:  IconArchitecture,
  art:           IconArt,
};

export function ExplorationGrid() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const { data: events } = useEvents();
  const { data: personalities } = useFeaturedPersonalities(20);

  return (
    <section className="container-content py-22">
      <div className="mb-12 max-w-2xl">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-12 bg-bronze/40" />
          <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-bronze">Begin Your Journey</span>
        </div>
        <h2 className="mb-4 font-heading text-h2 font-medium leading-tight text-ink">Begin Your Journey Through History</h2>
        <p className="font-body text-body-lg text-ink-secondary">Sixteen domains of Indian civilization, each a gateway to evidence-driven scholarship and immersive exploration.</p>
      </div>

      <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CATEGORIES.map((cat, i) => {
          const DomainIcon = DOMAIN_ICONS[cat.id];
          const catEvents = (events ?? []).filter((e: EventRow) => e.category === cat.id);
          const featuredEvent = catEvents[0] ?? null;
          const featuredPerson = (personalities ?? []).find((p: PersonalityRow) => p.categories?.some((c) => c.toLowerCase().includes(cat.id.slice(0, 4)))) ?? null;
          const articleCount = catEvents.length;
          const readingTime = featuredEvent?.reading_time_min ?? 6;
          const isVerified = featuredEvent?.confidence === 'verified';

          return (
            <Link
              key={cat.id}
              to={`/explore?tab=${cat.id}`}
              className="card-editorial group relative block overflow-hidden transition-all duration-200 ease-calm hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_12px_40px_-12px_rgba(184,135,70,0.25)] animate-fade-up"
              style={{ animationDelay: `${i * 0.04}s`, animationPlayState: inView ? 'running' : 'paused' }}
            >
              {/* Illustration area */}
              <div className="relative h-28 overflow-hidden border-b border-white/[0.04]">
                {/* Gradient background */}
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-calm group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${cat.color}18, ${cat.color}06)` }}
                />
                {/* Centered domain icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {DomainIcon ? (
                    <div
                      className="transition-all duration-300 ease-calm group-hover:scale-110"
                      style={{ opacity: 0.75 }}
                    >
                      <DomainIcon color={cat.color} />
                    </div>
                  ) : null}
                </div>
                {/* Verified badge */}
                {isVerified && (
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-indus/30 bg-indus/10 px-2 py-0.5">
                    <BadgeCheck className="h-3 w-3 text-indus" />
                    <span className="font-body text-[10px] font-medium text-indus">Verified</span>
                  </div>
                )}
                <ArrowUpRight className="absolute bottom-4 right-4 h-4 w-4 text-ink-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </div>

              <div className="p-5">
                <h3 className="mb-1 font-heading text-xl font-medium text-ink">{cat.label}</h3>
                {featuredEvent && (
                  <p className="mb-3 font-body text-xs leading-relaxed text-ink-muted">
                    Featured: <span className="text-ink-secondary">{featuredEvent.title}</span>
                  </p>
                )}
                {featuredPerson && (
                  <div className="mb-3 flex items-center gap-1.5 font-body text-xs text-ink-muted">
                    <User className="h-3 w-3" /> {featuredPerson.name}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-white/[0.04] pt-3">
                  <span className="font-numeric text-xs text-bronze/80">{articleCount} articles</span>
                  <span className="flex items-center gap-1 font-body text-xs text-ink-muted">
                    <Clock className="h-3 w-3" /> {readingTime} min read
                  </span>
                </div>
              </div>

              {/* Bronze accent line on hover */}
              <span className="absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 bg-bronze/50 transition-transform duration-300 ease-calm group-hover:scale-x-100" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default ExplorationGrid;
