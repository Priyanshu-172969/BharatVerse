import { useState, useMemo } from 'react';
import { Crown, MapPin, Calendar, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDynasties, type DynastyRow } from '../lib/queries';
import { SkeletonGrid } from '../components/ui/Skeletons';

export function DynastiesPage() {
  const { data: dynasties, loading } = useDynasties();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!dynasties) return [];
    if (!search.trim()) return dynasties;
    const q = search.toLowerCase();
    return dynasties.filter((d) =>
      d.name.toLowerCase().includes(q) ||
      d.founder?.toLowerCase().includes(q) ||
      d.capital?.toLowerCase().includes(q) ||
      d.period.toLowerCase().includes(q),
    );
  }, [dynasties, search]);

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
          <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-bronze">Ruling Houses</span>
        </div>
        <h1 className="mb-4 font-heading text-h1 font-medium leading-tight text-ink">Dynasties of Bharat</h1>
        <p className="font-body text-body-lg text-ink-secondary">
          The ruling houses that shaped the subcontinent, from the Mauryas to the Marathas.
        </p>
      </div>

      <div className="mb-8 flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-btn border border-white/[0.08] bg-charcoal-50/40 px-3 py-2">
          <Search className="h-4 w-4 text-ink-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dynasties, founders, capitals..."
            className="w-48 bg-transparent font-body text-sm text-ink placeholder:text-ink-muted focus:outline-none sm:w-72"
          />
        </div>
        <span className="font-numeric text-sm text-ink-muted">{filtered.length} dynasties</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d: DynastyRow, i: number) => (
          <Link
            key={d.id}
            to={`/explore?tab=${d.civilization_id ?? 'explore'}`}
            className="card-editorial group p-6 animate-fade-up"
            style={{ animationDelay: `${Math.min(i * 0.03, 0.6)}s` }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-charcoal-200/40">
              <Crown className="h-5 w-5 text-bronze" />
            </div>
            <h3 className="mb-2 font-heading text-xl font-medium text-ink">{d.name}</h3>
            <div className="mb-4 space-y-1.5">
              <div className="flex items-center gap-2 font-body text-sm text-ink-muted">
                <Calendar className="h-3.5 w-3.5" /> {d.period}
              </div>
              {d.capital && (
                <div className="flex items-center gap-2 font-body text-sm text-ink-muted">
                  <MapPin className="h-3.5 w-3.5" /> {d.capital}
                </div>
              )}
            </div>
            {d.founder && (
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-4">
                <span className="font-body text-xs text-ink-muted">Founder: {d.founder}</span>
                <ArrowRight className="h-4 w-4 text-bronze opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            )}
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card-editorial p-12 text-center">
          <p className="font-body text-ink-muted">No dynasties found matching "{search}".</p>
        </div>
      )}
    </div>
  );
}

export default DynastiesPage;
