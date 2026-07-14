import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FolderOpen, Clock, ChevronLeft } from 'lucide-react';
import { useCollections, useEvents, type CollectionRow, type EventRow } from '../lib/queries';
import { formatYear } from '../lib/constants';
import { SkeletonGrid } from '../components/ui/Skeletons';

const COLLECTION_GRADIENTS = [
  'from-bronze/20 to-charcoal-200',
  'from-river/20 to-charcoal-200',
  'from-indus/20 to-charcoal-200',
  'from-terracotta/20 to-charcoal-200',
  'from-saffron/20 to-charcoal-200',
  'from-bronze/15 to-river/15',
  'from-indus/15 to-terracotta/15',
  'from-saffron/15 to-bronze/15',
];

export function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const { data: collections, loading: colLoading } = useCollections();
  const { data: events, loading: eventsLoading } = useEvents();

  if (colLoading || eventsLoading) {
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

  if (selectedCollection) {
    const collection = collections?.find((c: CollectionRow) => c.id === selectedCollection);
    if (!collection) return null;
    const collectionEvents = (collection.event_ids ?? [])
      .map((id) => events?.find((e: EventRow) => e.id === id))
      .filter((e): e is EventRow => e !== undefined);

    return (
      <div className="container-content py-16">
        <button onClick={() => setSelectedCollection(null)} className="mb-8 inline-flex items-center gap-2 font-body text-sm text-ink-muted transition-colors hover:text-bronze">
          <ChevronLeft className="h-4 w-4" /> All Collections
        </button>

        <div className="mb-12 max-w-2xl">
          <div className="mb-4 h-32 w-full rounded-card bg-gradient-to-br from-bronze/20 to-charcoal-200" />
          <h1 className="mb-4 font-heading text-h1 font-medium leading-tight text-ink">{collection.title}</h1>
          <p className="font-body text-body-lg text-ink-secondary">{collection.description}</p>
        </div>

        <div className="mb-8 flex items-center gap-4">
          <span className="font-numeric text-sm text-bronze">{collectionEvents.length} events</span>
          <div className="relative h-1 flex-1 max-w-xs rounded-full bg-white/[0.06]">
            <div className="absolute inset-y-0 left-0 w-1/4 rounded-full bg-bronze/40" />
          </div>
          <span className="font-body text-xs text-ink-muted">Journey progress</span>
        </div>

        <div className="space-y-4">
          {collectionEvents.map((event: EventRow, i: number) => (
            <Link key={event.id} to={`/event/${event.id}`} className="card-editorial group flex items-center gap-6 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bronze/20 bg-charcoal-200/40">
                <span className="font-numeric text-sm font-medium text-bronze">{i + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="chip chip-bronze capitalize text-xs">{event.category}</span>
                  <span className="font-numeric text-xs text-bronze">{formatYear(event.year)}</span>
                </div>
                <h3 className="font-heading text-lg font-medium text-ink">{event.title}</h3>
                <p className="line-clamp-1 font-body text-sm text-ink-muted">{event.summary}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-content py-16">
      <div className="mb-12 max-w-2xl">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-12 bg-bronze/40" />
          <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-bronze">Curated Journeys</span>
        </div>
        <h1 className="mb-4 font-heading text-h1 font-medium leading-tight text-ink">Collections</h1>
        <p className="font-body text-body-lg text-ink-secondary">Curated historical journeys that guide you through connected events, themes, and eras. Each collection is a pathway through time.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {(collections ?? []).map((col: CollectionRow, i: number) => {
          const eventCount = col.event_ids?.length ?? 0;
          const gradient = COLLECTION_GRADIENTS[i % COLLECTION_GRADIENTS.length];
          return (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(col.id)}
              className="card-editorial group relative overflow-hidden text-left animate-fade-up"
              style={{ animationDelay: `${Math.min(i * 0.05, 0.6)}s` }}
            >
              <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${gradient}`}>
                <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 400 160" fill="none">
                  <circle cx="200" cy="80" r="60" stroke="#F4F1EA" strokeWidth="0.5" opacity="0.3" />
                  <circle cx="200" cy="80" r="40" stroke="#F4F1EA" strokeWidth="0.5" opacity="0.2" />
                  <circle cx="200" cy="80" r="20" stroke="#F4F1EA" strokeWidth="0.5" opacity="0.15" />
                </svg>
                <div className="absolute left-5 top-5">
                  <FolderOpen className="h-6 w-6 text-bronze" />
                </div>
                <div className="absolute bottom-5 right-5 flex items-center gap-1 font-body text-xs text-ink-muted">
                  <Clock className="h-3 w-3" /> {eventCount} events
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-2 font-heading text-xl font-medium text-ink">{col.title}</h3>
                <p className="mb-4 line-clamp-2 font-body text-sm leading-relaxed text-ink-muted">{col.description}</p>
                <div className="flex items-center gap-1 font-body text-xs text-bronze opacity-0 transition-opacity group-hover:opacity-100">
                  Begin Journey <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {(collections?.length ?? 0) === 0 && (
        <div className="card-editorial p-12 text-center">
          <p className="font-body text-ink-muted">Collections are being curated. Check back soon.</p>
        </div>
      )}
    </div>
  );
}

export default CollectionsPage;
