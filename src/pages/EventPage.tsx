import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Bookmark, Clock, Share2, ChevronRight, ChevronDown,
  Scroll, Landmark, CircleDollarSign, BookOpen, Globe, Atom,
  Satellite, GraduationCap, FileText, MapPin, ArrowRight, Network,
} from 'lucide-react';
import { EVIDENCE_TYPES, CONFIDENCE_LEVELS, formatYear } from '../lib/constants';
import { getEventDetail, type RippleStage } from '../lib/eventDetails';
import { useBookmarks } from '../context/BookmarkContext';
import { useToast } from '../context/ToastContext';
import { useEvent, useEventEvidence, useCivilizations, type CivilizationRow } from '../lib/queries';
import { SkeletonArticle } from '../components/ui/Skeletons';

const EVIDENCE_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  archaeology: Landmark, inscriptions: Scroll, coins: CircleDollarSign,
  literary: BookOpen, foreign: Globe, carbon: Atom,
  satellite: Satellite, academic: GraduationCap, primary: FileText,
};

export function EventPage() {
  const { id } = useParams();
  const { data: event, loading } = useEvent(id);
  const { data: dbEvidence } = useEventEvidence(id);
  const { data: civilizations } = useCivilizations();
  const [activeSection, setActiveSection] = useState('overview');
  const [readingProgress, setReadingProgress] = useState(0);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { showToast } = useToast();

  const detail = event ? getEventDetail(event.id, event.title, event.summary) : null;

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (!detail) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    detail.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [detail]);

  if (loading) {
    return (
      <div className="container-content py-16">
        <SkeletonArticle />
      </div>
    );
  }

  if (!event || !detail) {
    return (
      <div className="container-content py-32 text-center">
        <h1 className="mb-4 font-heading text-h2 text-ink">Event not found</h1>
        <p className="mb-8 font-body text-ink-muted">This historical event may not yet be in our archives.</p>
        <Link to="/timeline" className="btn-primary">Return to Timeline</Link>
      </div>
    );
  }

  const civ = civilizations?.find((c: CivilizationRow) => c.id === event.civilization_id);
  const confidence = CONFIDENCE_LEVELS[event.confidence as keyof typeof CONFIDENCE_LEVELS] ?? CONFIDENCE_LEVELS.likely;
  const bookmarked = isBookmarked(event.id);
  const allSections = [
    ...detail.sections.map((s) => ({ id: s.id, title: s.title })),
    { id: 'ripple-effect', title: 'Ripple Effect' },
    { id: 'connected', title: 'Connected History' },
    { id: 'sources', title: 'Sources & Evidence' },
  ];

  const evidenceList = dbEvidence && dbEvidence.length > 0
    ? dbEvidence.map((ev) => ({
        type: ev.evidence_type,
        description: ev.description,
        source: ev.source_title,
        confidence: ev.confidence,
      }))
    : detail.evidence;

  return (
    <article className="relative">
      <div className="fixed left-0 right-0 top-[72px] z-50 h-px bg-transparent">
        <div className="h-full bg-bronze transition-all duration-150" style={{ width: `${readingProgress}%` }} />
      </div>

      <header className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(184,135,70,0.3), transparent 70%)' }} />
        </div>
        <div className="container-content relative z-10 py-16 lg:py-20">
          <Link to="/timeline" className="mb-8 inline-flex items-center gap-2 font-body text-sm text-ink-muted transition-colors hover:text-bronze">
            <ArrowLeft className="h-4 w-4" /> Back to Timeline
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="chip chip-bronze capitalize">{event.category}</span>
            <span className="font-numeric text-sm text-bronze">{formatYear(event.year)}</span>
            {civ && <span className="chip">{civ.name}</span>}
            {event.location && <span className="flex items-center gap-1 font-body text-xs text-ink-muted"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>}
            <span className="flex items-center gap-1 font-body text-xs text-ink-muted"><Clock className="h-3.5 w-3.5" /> {event.reading_time_min ?? detail.readingTimeMin} min read</span>
          </div>

          <h1 className="mb-6 max-w-3xl font-heading text-h1 font-medium leading-[1.1] text-ink text-balance">{event.title}</h1>
          <p className="mb-8 max-w-2xl font-body text-body-lg leading-relaxed text-ink-secondary">{event.summary}</p>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => { toggleBookmark({ id: event.id, title: event.title, category: event.category, year: event.year }); showToast(bookmarked ? 'Removed bookmark' : 'Bookmarked', 'bookmark'); }} className="btn-primary">
              <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-charcoal' : ''}`} />{bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button className="btn-secondary" onClick={() => showToast('Link copied to clipboard', 'info')}><Share2 className="h-4 w-4" />Share</button>
          </div>
        </div>
      </header>

      <div className="sticky top-[72px] z-40 border-b border-white/[0.06] bg-charcoal/80 backdrop-blur-xl">
        <div className="container-content">
          <nav className="flex gap-1 overflow-x-auto scrollbar-hide">
            {allSections.map((section) => (
              <button key={section.id} onClick={() => { setActiveSection(section.id); document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className={`relative whitespace-nowrap px-4 py-3.5 font-body text-sm transition-colors ${activeSection === section.id ? 'text-ink' : 'text-ink-muted hover:text-ink-secondary'}`}>
                {section.title}
                {activeSection === section.id && <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-bronze transition-all duration-300" />}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="container-content py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="reading-column">
              {detail.sections.map((section, sIdx) => (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-32">
                  <h2 className="mb-6 font-heading text-h3 font-medium text-ink">{section.title}</h2>
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className={`mb-6 font-body text-body-lg leading-[1.8] text-ink-secondary ${sIdx === 0 && pIdx === 0 ? 'drop-cap' : ''}`}>
                      {para}
                      {section.footnotes && pIdx === section.paragraphs.length - 1 && (
                        <sup className="ml-1 cursor-help text-bronze" title={section.footnotes.map((f) => `[${f.ref}] ${f.text}`).join('\n')}>
                          [{section.footnotes.map((f) => f.ref).join(', ')}]
                        </sup>
                      )}
                    </p>
                  ))}
                  {section.footnotes && (
                    <div className="mt-4 border-l-2 border-bronze/20 pl-4">
                      <p className="mb-1 font-body text-xs font-semibold uppercase tracking-wider text-ink-muted">Footnotes</p>
                      {section.footnotes.map((fn) => (
                        <p key={fn.ref} className="mb-1 font-body text-xs text-ink-muted">
                          <span className="text-bronze">[{fn.ref}]</span> {fn.text}
                        </p>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              <section id="ripple-effect" className="mb-12 scroll-mt-32">
                <h2 className="mb-6 font-heading text-h3 font-medium text-ink">Ripple Effect</h2>
                <p className="mb-8 font-body text-body-lg leading-[1.8] text-ink-secondary">Every significant event sends ripples through time. This visualization traces the chain of causation from historical context to modern relevance.</p>
                <RippleEffect stages={detail.rippleStages} />
              </section>

              <section id="connected" className="mb-12 scroll-mt-32">
                <h2 className="mb-6 flex items-center gap-2 font-heading text-h3 font-medium text-ink">
                  <Network className="h-5 w-5 text-bronze" /> Connected History
                </h2>
                <p className="mb-6 font-body text-body-lg leading-[1.8] text-ink-secondary">Every historical entity is connected to others. Explore the web of relationships around this event.</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {detail.connectedEntities.map((entity, i) => (
                    <div key={i} className="card-editorial group flex items-center gap-3 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-charcoal-200/40">
                        <span className="font-body text-xs font-medium text-bronze">{entity.type.slice(0, 2).toUpperCase()}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-body text-sm font-medium text-ink">{entity.name}</p>
                        <p className="truncate font-body text-xs text-ink-muted">{entity.relation}</p>
                      </div>
                      {entity.link && (
                        <Link to={entity.link} className="text-bronze opacity-0 transition-opacity group-hover:opacity-100">
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {detail.interestingFacts.length > 0 && (
                <section className="mb-12">
                  <h2 className="mb-6 font-heading text-h3 font-medium text-ink">Interesting Facts</h2>
                  <div className="space-y-3">
                    {detail.interestingFacts.map((fact, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-card border border-white/[0.06] bg-charcoal-100/40 p-4">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bronze/15 font-numeric text-xs font-medium text-bronze">{i + 1}</span>
                        <p className="font-body text-sm leading-relaxed text-ink-secondary">{fact}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section id="sources" className="scroll-mt-32">
                <h2 className="mb-6 font-heading text-h3 font-medium text-ink">Sources & Evidence</h2>
                <div className="space-y-3">
                  {evidenceList.map((ev, i) => {
                    const Icon = EVIDENCE_ICONS[ev.type] ?? FileText;
                    return (
                      <details key={i} className="card-editorial group p-4">
                        <summary className="flex cursor-pointer items-center gap-3">
                          <Icon className="h-5 w-5" style={{ color: EVIDENCE_TYPES[ev.type as keyof typeof EVIDENCE_TYPES]?.color ?? '#B88746' }} />
                          <span className="flex-1 font-body text-sm font-medium text-ink">{EVIDENCE_TYPES[ev.type as keyof typeof EVIDENCE_TYPES]?.label ?? ev.type}</span>
                          <span className="chip text-xs capitalize">{ev.confidence}</span>
                          <ChevronRight className="h-4 w-4 text-ink-muted transition-transform group-open:rotate-90" />
                        </summary>
                        <div className="mt-4 pl-8">
                          <p className="mb-2 font-body text-sm text-ink-secondary">{ev.description}</p>
                          <p className="font-body text-xs text-ink-muted">Source: {ev.source}</p>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="card-editorial p-5">
                <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-wider text-ink-secondary">Historical Confidence</h3>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: confidence.color }} />
                  <span className="font-heading text-lg font-medium text-ink">{confidence.label}</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-1.5 flex-1 rounded-full transition-colors" style={{ backgroundColor: i < confidence.segments ? confidence.color : 'rgba(255,255,255,0.08)' }} />
                  ))}
                </div>
                <p className="mt-3 font-body text-xs text-ink-muted">Based on the quality and quantity of available evidence.</p>
              </div>

              <div className="card-editorial p-5">
                <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-wider text-ink-secondary">Evidence Types</h3>
                <div className="space-y-2">
                  {evidenceList.map((ev, i) => {
                    const Icon = EVIDENCE_ICONS[ev.type] ?? FileText;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-charcoal-200/40">
                          <Icon className="h-4 w-4" style={{ color: EVIDENCE_TYPES[ev.type as keyof typeof EVIDENCE_TYPES]?.color ?? '#B88746' }} />
                        </div>
                        <span className="font-body text-sm text-ink-secondary">{EVIDENCE_TYPES[ev.type as keyof typeof EVIDENCE_TYPES]?.label ?? ev.type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card-editorial p-5">
                <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-wider text-ink-secondary">Metadata</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between"><dt className="font-body text-sm text-ink-muted">Year</dt><dd className="font-numeric text-sm text-ink">{formatYear(event.year)}</dd></div>
                  <div className="flex justify-between"><dt className="font-body text-sm text-ink-muted">Location</dt><dd className="font-body text-sm text-ink">{event.location ?? detail.location}</dd></div>
                  {civ && <div className="flex justify-between"><dt className="font-body text-sm text-ink-muted">Civilization</dt><dd className="font-body text-sm text-ink">{civ.name}</dd></div>}
                  <div className="flex justify-between"><dt className="font-body text-sm text-ink-muted">Category</dt><dd className="font-body text-sm capitalize text-ink">{event.category}</dd></div>
                  <div className="flex justify-between"><dt className="font-body text-sm text-ink-muted">Reading Time</dt><dd className="font-body text-sm text-ink">{event.reading_time_min ?? detail.readingTimeMin} min</dd></div>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

function RippleEffect({ stages }: { stages: RippleStage[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-0">
      {stages.map((stage, i) => (
        <div key={i} className="relative flex items-start gap-4">
          {i < stages.length - 1 && <div className="absolute left-5 top-12 h-full w-px bg-gradient-to-b from-bronze/40 to-transparent" />}
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bronze/30 bg-charcoal-100 transition-all duration-300 hover:scale-110 hover:border-bronze hover:shadow-[0_0_12px_rgba(184,135,70,0.3)]"
          >
            <span className="font-numeric text-xs font-medium text-bronze">{i + 1}</span>
          </button>
          <div className="flex-1 pb-8">
            <div className="flex items-center gap-2">
              <h4 className="font-heading text-lg font-medium text-ink">{stage.title}</h4>
              <ChevronDown className={`h-4 w-4 text-ink-muted transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
            </div>
            <p className="mt-1 font-body text-sm leading-relaxed text-ink-muted">{stage.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventPage;
