import { useState, useMemo } from 'react';
import { User, ArrowRight, Search, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePersonalities, type PersonalityRow } from '../lib/queries';
import { SkeletonGrid } from '../components/ui/Skeletons';

const PAGE_SIZE = 24;

export function PersonalitiesPage() {
  const { data: personalities, loading } = usePersonalities();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!personalities) return [];
    const withData = personalities.filter((p) => p.role !== null || p.legacy !== null);
    if (!search.trim()) return withData;
    const q = search.toLowerCase();
    return withData.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.role?.toLowerCase().includes(q) ||
      p.era?.toLowerCase().includes(q) ||
      p.legacy?.toLowerCase().includes(q) ||
      p.historical_period?.toLowerCase().includes(q),
    );
  }, [personalities, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (loading) {
    return (
      <div className="container-content py-16">
        <div className="mb-12">
          <div className="skeleton mb-4 h-8 w-48" />
          <div className="skeleton h-4 w-96 max-w-full" />
        </div>
        <SkeletonGrid count={9} />
      </div>
    );
  }

  return (
    <div className="container-content py-16">
      <div className="mb-12 max-w-2xl">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-12 bg-bronze/40" />
          <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-bronze">Historical Figures</span>
        </div>
        <h1 className="mb-4 font-heading text-h1 font-medium leading-tight text-ink">Personalities of Bharat</h1>
        <p className="font-body text-body-lg text-ink-secondary">
          The kings, scholars, saints, and strategists whose lives shaped the course of civilization.
        </p>
      </div>

      <div className="mb-8 flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-btn border border-white/[0.08] bg-charcoal-50/40 px-3 py-2">
          <Search className="h-4 w-4 text-ink-muted" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search by name, role, era, or legacy..."
            className="w-48 bg-transparent font-body text-sm text-ink placeholder:text-ink-muted focus:outline-none sm:w-80"
          />
        </div>
        <span className="font-numeric text-sm text-ink-muted">{filtered.length} figures</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((p: PersonalityRow, i: number) => (
          <div
            key={p.id}
            className="card-editorial group p-6 animate-fade-up"
            style={{ animationDelay: `${Math.min(i * 0.03, 0.6)}s` }}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-bronze/20 bg-charcoal-200/40">
                <User className="h-6 w-6 text-bronze" />
              </div>
              {p.verified && (
                <span className="flex items-center gap-1 rounded-full border border-indus/30 bg-indus/10 px-2 py-0.5">
                  <BadgeCheck className="h-3 w-3 text-indus" />
                  <span className="font-body text-[10px] font-medium text-indus">Verified</span>
                </span>
              )}
            </div>
            <h3 className="mb-1 font-heading text-xl font-medium text-ink">{p.name}</h3>
            <p className="mb-3 font-body text-sm text-bronze">{p.role ?? p.historical_period ?? 'Historical Figure'}</p>
            <p className="mb-4 font-body text-sm leading-relaxed text-ink-muted line-clamp-3">{p.legacy ?? p.short_description ?? p.famous_for}</p>
            <div className="flex items-center justify-between border-t border-white/[0.04] pt-4">
              <span className="font-numeric text-xs text-ink-muted">{p.era ?? p.historical_period}</span>
              {p.categories && p.categories.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {p.categories.slice(0, 2).map((cat) => (
                    <span key={cat} className="chip text-[10px]">{cat}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card-editorial p-12 text-center">
          <p className="font-body text-ink-muted">No personalities found matching "{search}".</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="font-numeric text-sm text-ink-muted">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PersonalitiesPage;
