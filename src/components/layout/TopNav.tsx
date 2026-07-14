import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bookmark, Bell, User } from 'lucide-react';
import { BharatVerseLogo } from '../brand/BharatVerseLogo';
import { useBookmarks } from '../../context/BookmarkContext';

interface TopNavProps {
  onOpenSearch: () => void;
}

export function TopNav({ onOpenSearch }: TopNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const { bookmarks } = useBookmarks();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] h-[72px] transition-all duration-300 ease-calm ${
        scrolled
          ? 'border-b border-white/[0.06] bg-charcoal/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="flex h-full items-center justify-between px-5 lg:px-10">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center transition-opacity duration-200 hover:opacity-90"
          aria-label="BharatVerse home"
        >
          <BharatVerseLogo variant="horizontal" className="h-12 w-auto" />
        </Link>

        {/* Center: Search */}
        <div className="hidden flex-1 justify-center px-10 md:flex">
          <button
            onClick={onOpenSearch}
            className="group flex w-full max-w-md items-center gap-3 rounded-search border border-white/[0.08] bg-charcoal-50/40 px-4 py-2.5 text-left transition-all duration-200 hover:border-bronze/30 hover:bg-charcoal-50/60"
          >
            <Search className="h-4 w-4 text-ink-muted transition-colors group-hover:text-bronze" />
            <span className="flex-1 font-body text-sm text-ink-muted">Search history, events, people...</span>
            <kbd className="rounded-md border border-white/10 px-1.5 py-0.5 font-numeric text-xs text-ink-muted">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSearch}
            className="icon-btn md:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link to="/bookmarks" className="icon-btn relative" aria-label="Bookmarks">
            <Bookmark className="h-5 w-5" />
            {bookmarks.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-bronze px-1 font-numeric text-[10px] font-semibold text-charcoal">
                {bookmarks.length}
              </span>
            )}
          </Link>
          <button className="icon-btn relative hidden sm:inline-flex" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-terracotta ring-2 ring-charcoal" />
          </button>
          <Link
            to="/dashboard"
            className={`icon-btn rounded-full ring-1 ring-transparent transition-all duration-200 hover:ring-bronze/40 ${
              location.pathname === '/dashboard' ? 'bg-white/[0.06] text-ink ring-bronze/30' : ''
            }`}
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
