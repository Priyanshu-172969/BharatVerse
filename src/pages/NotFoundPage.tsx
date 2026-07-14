import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import { BharatVerseLogo } from '../components/brand/BharatVerseLogo';
import { useCivilizations, type CivilizationRow } from '../lib/queries';

export function NotFoundPage() {
  const { data: civilizations } = useCivilizations();

  return (
    <div className="relative flex min-h-[calc(100vh-72px)] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
        <BharatVerseLogo variant="emblem" className="h-[400px] w-[400px]" />
      </div>

      <div className="relative z-10 max-w-xl">
        <div className="mb-6 font-heading text-8xl font-medium text-bronze">404</div>
        <h1 className="mb-4 font-heading text-h2 font-medium text-ink">Lost in the Archives</h1>
        <p className="mb-10 font-body text-body-lg text-ink-secondary">
          The page you seek has not yet been inscribed in our records.
          Perhaps it awaits discovery elsewhere in the BharatVerse.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {(civilizations ?? []).slice(0, 5).map((c: CivilizationRow) => (
            <Link key={c.id} to={`/explore?tab=${c.id}`} className="chip hover:chip-bronze">
              {c.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">
            <Compass className="h-4 w-4" />
            Return Home
          </Link>
          <Link to="/timeline" className="btn-secondary">
            Open Timeline
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
