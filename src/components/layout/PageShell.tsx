import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import LeftRail from './LeftRail';
import BottomNav from './BottomNav';
import GlobalSearch from '../search/GlobalSearch';

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      <TopNav onOpenSearch={() => setSearchOpen(true)} />
      <LeftRail />
      <main className="relative z-10 pt-[72px] pb-20 lg:pb-0 lg:pl-[72px]">
        {children}
      </main>
      <BottomNav onOpenSearch={() => setSearchOpen(true)} />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default PageShell;
