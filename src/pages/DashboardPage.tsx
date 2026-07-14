import { Link } from 'react-router-dom';
import { Clock, Bookmark, Sparkles, ArrowRight, History, TrendingUp } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import { useEvents, useCivilizations, useCollections, useStats, type EventRow, type CivilizationRow } from '../lib/queries';
import { formatYear } from '../lib/constants';
import { SkeletonCard } from '../components/ui/Skeletons';

export function DashboardPage() {
  const { bookmarks } = useBookmarks();
  const { data: events } = useEvents();
  const { data: civilizations } = useCivilizations();
  const { data: collections } = useCollections();
  const { data: stats } = useStats();

  const recentEvents = (events ?? []).slice(0, 4);
  const suggested = (events ?? []).slice(8, 12);

  const statsCards = [
    { label: 'Bookmarks', value: bookmarks.length, icon: Bookmark, color: 'text-bronze' },
    { label: 'Historical Events', value: stats?.events ?? 0, icon: History, color: 'text-river' },
    { label: 'Civilizations', value: stats?.civilizations ?? 0, icon: Clock, color: 'text-indus' },
    { label: 'Collections', value: collections?.length ?? 0, icon: Sparkles, color: 'text-saffron' },
  ];

  if (!events) {
    return (
      <div className="container-content py-16">
        <div className="mb-12">
          <div className="skeleton mb-4 h-8 w-48" />
          <div className="skeleton h-4 w-96 max-w-full" />
        </div>
        <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="container-content py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-12 bg-bronze/40" />
          <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-bronze">Your Journey</span>
        </div>
        <h1 className="mb-2 font-heading text-h1 font-medium leading-tight text-ink">Welcome back, Explorer</h1>
        <p className="font-body text-body-lg text-ink-secondary">
          Continue your journey through 5,000 years of Indian civilization.
        </p>
      </div>

      <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-editorial p-5">
              <Icon className={`mb-3 h-5 w-5 ${stat.color}`} />
              <div className="mb-1 font-numeric text-2xl font-medium text-ink">{stat.value}</div>
              <div className="font-body text-xs text-ink-muted">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-5 flex items-center gap-2 font-heading text-h3 font-medium text-ink">
            <History className="h-5 w-5 text-bronze" />
            Continue Reading
          </h2>
          <div className="space-y-3">
            {recentEvents.map((e: EventRow) => (
              <Link key={e.id} to={`/event/${e.id}`} className="card-editorial group flex items-center gap-4 p-4">
                <div className="h-12 w-12 shrink-0 rounded-lg border border-white/[0.06] bg-charcoal-200/40" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-heading text-base font-medium text-ink">{e.title}</h3>
                  <p className="font-numeric text-xs text-bronze">{formatYear(e.year)}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 flex items-center gap-2 font-heading text-h3 font-medium text-ink">
            <TrendingUp className="h-5 w-5 text-bronze" />
            Suggested for You
          </h2>
          <div className="space-y-3">
            {suggested.map((e: EventRow) => (
              <Link key={e.id} to={`/event/${e.id}`} className="card-editorial group flex items-center gap-4 p-4">
                <div className="h-12 w-12 shrink-0 rounded-lg border border-white/[0.06] bg-charcoal-200/40" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-heading text-base font-medium text-ink">{e.title}</h3>
                  <p className="font-numeric text-xs text-bronze">{formatYear(e.year)}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="mb-5 font-heading text-h3 font-medium text-ink">Favorite Periods</h2>
        <div className="flex flex-wrap gap-3">
          {(civilizations ?? []).slice(0, 6).map((c: CivilizationRow) => (
            <Link key={c.id} to={`/explore?tab=${c.id}`} className="chip hover:chip-bronze">
              {c.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
