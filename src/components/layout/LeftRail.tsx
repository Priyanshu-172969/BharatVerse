import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { NAV_SECTIONS } from '../../lib/constants';
import { ChevronLeft } from 'lucide-react';

export function LeftRail() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(() => localStorage.getItem('bv-rail-pinned') === 'true');
  const location = useLocation();

  const iconMap = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;

  useEffect(() => {
    localStorage.setItem('bv-rail-pinned', String(pinned));
  }, [pinned]);

  const expanded = pinned || hovered;

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed left-0 top-[72px] z-[90] hidden h-[calc(100vh-72px)] flex-col border-r border-white/[0.04] bg-charcoal/40 backdrop-blur-sm transition-all duration-300 ease-calm lg:flex ${
        expanded ? 'w-[250px]' : 'w-[72px]'
      }`}
    >
      {/* Pin toggle */}
      <div className={`flex h-10 items-center border-b border-white/[0.03] px-3 ${expanded ? 'justify-end' : 'justify-center'}`}>
        <button
          onClick={() => setPinned(!pinned)}
          className="icon-btn h-7 w-7"
          aria-label={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
          title={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
        >
          <ChevronLeft className={`h-4 w-4 text-ink-muted transition-transform duration-300 ${pinned ? '' : 'rotate-180'}`} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto p-3 scrollbar-hide">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <div
              className={`mb-1 px-3 font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted transition-opacity duration-200 ${
                expanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {section.label}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = iconMap[item.icon] ?? LucideIcons.Circle;
                const itemPath = item.to.split('?')[0];
                const itemQuery = item.to.split('?')[1] ?? '';
                const active = location.pathname === itemPath && (
                  itemQuery === '' || location.search === `?${itemQuery}` || location.search.includes(itemQuery)
                );
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`group relative flex items-center gap-3 rounded-btn px-3 py-2.5 transition-all duration-200 ${
                      active ? 'bg-white/[0.05]' : 'hover:bg-white/[0.025]'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-bronze shadow-[0_0_8px_rgba(184,135,70,0.5)] transition-all duration-300" />
                    )}
                    <Icon
                      className={`h-5 w-5 shrink-0 transition-all duration-200 ${
                        active
                          ? 'text-bronze scale-110'
                          : 'text-ink-muted group-hover:text-ink-secondary group-hover:scale-105'
                      }`}
                    />
                    <span
                      className={`whitespace-nowrap font-body text-sm transition-all duration-200 ${
                        active ? 'text-ink' : 'text-ink-secondary'
                      } ${expanded ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {item.label}
                    </span>
                    {!expanded && (
                      <span className="pointer-events-none absolute left-[60px] z-[200] whitespace-nowrap rounded-md border border-white/10 bg-charcoal-100/95 px-2.5 py-1.5 font-body text-xs text-ink opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:opacity-100 group-hover:delay-200">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default LeftRail;
