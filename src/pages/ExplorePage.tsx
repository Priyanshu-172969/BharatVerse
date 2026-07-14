import { Link, useSearchParams } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import { CATEGORIES, formatYear } from '../lib/constants';
import { useCivilizations, useEvents, type EventRow, type CivilizationRow } from '../lib/queries';
import { SkeletonGrid } from '../components/ui/Skeletons';

export function ExplorePage() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const { data: civilizations, loading: civLoading } = useCivilizations();
  const { data: events, loading: eventsLoading } = useEvents();

  if (tab && civilizations) {
    const civ = civilizations.find((c) => c.id === tab);
    if (civ) {
      const civEvents = events?.filter((e) => e.civilization_id === civ.id) ?? [];
      return (
        <div className="container-content py-16">
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-12 bg-bronze/40" />
              <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-bronze">{civ.period}</span>
            </div>
            <h1 className="mb-4 font-heading text-h1 font-medium leading-tight text-ink">{civ.name}</h1>
            <p className="font-body text-body-lg text-ink-secondary">{civ.description}</p>
          </div>

          <div className="mb-8 flex items-center gap-4">
            <span className="font-numeric text-sm text-bronze">{civ.article_count} articles</span>
            <span className="font-numeric text-sm text-ink-muted">{civEvents.length} featured events</span>
          </div>

          {civEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {civEvents.map((e, i) => (
                <Link key={e.id} to={`/event/${e.id}`} className="card-editorial group p-5 animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="chip chip-bronze capitalize text-xs">{e.category}</span>
                    <span className="font-numeric text-xs text-bronze">{formatYear(e.year)}</span>
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-medium leading-tight text-ink">{e.title}</h3>
                  <p className="line-clamp-2 font-body text-sm text-ink-muted">{e.summary}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card-editorial p-12 text-center">
              <p className="font-body text-ink-muted">Featured events for this civilization are being curated.</p>
            </div>
          )}
        </div>
      );
    }

    const cat = CATEGORIES.find((c) => c.id === tab);
    if (cat) {
      const catEvents = events?.filter((e) => e.category === cat.id) ?? [];
      return (
        <div className="container-content py-16">
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-12 bg-bronze/40" />
              <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-bronze">{cat.label}</span>
            </div>
            <h1 className="mb-4 font-heading text-h1 font-medium leading-tight text-ink">{cat.label}</h1>
            <p className="font-body text-body-lg text-ink-secondary">Explore events related to {cat.label.toLowerCase()} across the subcontinent's history.</p>
          </div>

          {catEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {catEvents.map((e, i) => (
                <Link key={e.id} to={`/event/${e.id}`} className="card-editorial group p-5 animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="chip chip-bronze capitalize text-xs">{e.category}</span>
                    <span className="font-numeric text-xs text-bronze">{formatYear(e.year)}</span>
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-medium leading-tight text-ink">{e.title}</h3>
                  <p className="line-clamp-2 font-body text-sm text-ink-muted">{e.summary}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card-editorial p-12 text-center">
              <p className="font-body text-ink-muted">Events for this category are being curated.</p>
            </div>
          )}
        </div>
      );
    }
  }

  if (civLoading || eventsLoading) {
    return (
      <div className="container-content py-16">
        <div className="mb-12">
          <div className="skeleton mb-4 h-8 w-48" />
          <div className="skeleton h-4 w-96 max-w-full" />
        </div>
        <SkeletonGrid count={6} />
      </div>
    );
  }

  return (
    <div className="container-content py-16">
      <div className="mb-12 max-w-2xl">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-12 bg-bronze/40" />
          <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-bronze">Explore</span>
        </div>
        <h1 className="mb-4 font-heading text-h1 font-medium leading-tight text-ink">Explore BharatVerse</h1>
        <p className="font-body text-body-lg text-ink-secondary">
          Navigate 5,000 years of Indian civilization by category, civilization, or theme.
        </p>
      </div>

      <h2 className="mb-6 font-heading text-h3 font-medium text-ink">Categories</h2>
      <div className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((cat, i) => (
          <Link key={cat.id} to={`/explore?tab=${cat.id}`} className="card-editorial group p-4 animate-fade-up" style={{ animationDelay: `${i * 0.03}s` }}>
            <Compass className="mb-3 h-5 w-5 text-bronze" />
            <h3 className="font-body text-sm font-medium text-ink">{cat.label}</h3>
          </Link>
        ))}
      </div>

      <h2 className="mb-6 font-heading text-h3 font-medium text-ink">Civilizations</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(civilizations ?? []).map((c: CivilizationRow, i: number) => (
          <Link key={c.id} to={`/explore?tab=${c.id}`} className="card-editorial group p-6 animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <h3 className="mb-2 font-heading text-xl font-medium text-ink">{c.name}</h3>
            <p className="mb-3 font-numeric text-sm text-bronze">{c.period}</p>
            <p className="line-clamp-2 font-body text-sm text-ink-muted">{c.description}</p>
            <div className="mt-4 flex items-center gap-1 font-body text-xs text-bronze opacity-0 transition-opacity group-hover:opacity-100">
              Explore <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
