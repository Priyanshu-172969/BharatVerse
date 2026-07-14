import { Link, useLocation } from 'react-router-dom';
import { Compass, Search, Clock, Bookmark, User } from 'lucide-react';

interface BottomNavProps {
  onOpenSearch?: () => void;
}

const TABS = [
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/timeline', label: 'Timeline', icon: Clock },
  { to: '/bookmarks', label: 'Saved', icon: Bookmark },
  { to: '/dashboard', label: 'Profile', icon: User },
];

export function BottomNav({ onOpenSearch }: BottomNavProps) {
  const location = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[100] flex h-16 items-center justify-around border-t border-white/[0.06] bg-charcoal/90 backdrop-blur-xl lg:hidden">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const active = location.pathname === tab.to;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className="flex flex-1 flex-col items-center gap-1 py-2 transition-all duration-200 active:scale-95"
          >
            <Icon
              className={`h-5 w-5 transition-all duration-200 ${active ? 'text-bronze scale-110' : 'text-ink-muted'}`}
            />
            <span
              className={`font-body text-[10px] transition-colors duration-200 ${active ? 'text-bronze' : 'text-ink-muted'}`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
      <button
        onClick={onOpenSearch}
        className="flex flex-1 flex-col items-center gap-1 py-2 transition-all duration-200 active:scale-95"
        aria-label="Search"
      >
        <Search className="h-5 w-5 text-ink-muted transition-colors" />
        <span className="font-body text-[10px] text-ink-muted">Search</span>
      </button>
    </nav>
  );
}

export default BottomNav;
