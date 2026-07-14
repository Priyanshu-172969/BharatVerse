import { useEffect, useState } from 'react';
import { Bookmark, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import { useEvents, useCivilizations, type EventRow, type CivilizationRow } from '../lib/queries';
import { formatYear } from '../lib/constants';

export function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const { data: events } = useEvents();
  const { data: civilizations } = useCivilizations();
  const [bookmarkedEvents, setBookmarkedEvents] = useState<EventRow[]>([]);

  useEffect(() => {
    if (!events) { setBookmarkedEvents([]); return; }
    setBookmarkedEvents(bookmarks.map((b) => events.find((e) => e.id === b.id)).filter((e): e is EventRow => e !== undefined));
  }, [bookmarks, events]);

  return (
    <div className="container-content py-16">
      <div className="mb-12 max-w-2xl">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-12 bg-bronze/40" />
          <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-bronze">Your Library</span>
        </div>
        <h1 className="mb-4 font-heading text-h1 font-medium leading-tight text-ink">Bookmarks</h1>
        <p className="font-body text-body-lg text-ink-secondary">
          {bookmarks.length > 0
            ? `${bookmarks.length} saved ${bookmarks.length === 1 ? 'item' : 'items'} in your collection.`
            : 'Save events, articles, and discoveries to revisit them here.'}
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="card-editorial flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-bronze/20 bg-charcoal-200/40">
            <Bookmark className="h-8 w-8 text-bronze" />
          </div>
          <h2 className="mb-3 font-heading text-2xl font-medium text-ink">No bookmarks yet</h2>
          <p className="mb-8 max-w-md font-body text-ink-muted">
            Start exploring and save the events, civilizations, and discoveries that capture your curiosity.
          </p>
          <div className="mb-8">
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-wider text-ink-muted">Suggested explorations</p>
            <div className="flex flex-wrap justify-center gap-2">
              {(civilizations ?? []).slice(0, 5).map((c: CivilizationRow) => (
                <Link key={c.id} to={`/explore?tab=${c.id}`} className="chip hover:chip-bronze">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/timeline" className="btn-primary">
            <Clock className="h-4 w-4" />
            Open Timeline
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarkedEvents.map((event) => (
            <div key={event.id} className="card-editorial group p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="chip chip-bronze capitalize text-xs">{event.category}</span>
                <span className="font-numeric text-xs text-bronze">{formatYear(event.year)}</span>
              </div>
              <Link to={`/event/${event.id}`}>
                <h3 className="mb-2 font-heading text-lg font-medium leading-tight text-ink">{event.title}</h3>
                <p className="line-clamp-2 font-body text-sm text-ink-muted">{event.summary}</p>
              </Link>
              <div className="mt-4 flex items-center justify-between border-t border-white/[0.04] pt-4">
                <Link to={`/event/${event.id}`} className="flex items-center gap-1 font-body text-xs text-bronze">
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  onClick={() => removeBookmark(event.id)}
                  className="font-body text-xs text-ink-muted transition-colors hover:text-terracotta"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;
