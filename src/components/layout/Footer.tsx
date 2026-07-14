import { Link } from 'react-router-dom';
import { BharatVerseLogo } from '../brand/BharatVerseLogo';
import { Github, Twitter, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../../context/ToastContext';

const FOOTER_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Timeline', to: '/timeline' },
      { label: 'Historical Maps', to: '/maps' },
      { label: 'Dynasties', to: '/dynasties' },
      { label: 'Personalities', to: '/personalities' },
      { label: 'Collections', to: '/collections' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Editorial Policy', to: '/explore' },
      { label: 'Evidence Standards', to: '/explore' },
      { label: 'Contributors', to: '/explore' },
      { label: 'Version History', to: '/explore' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Open Data', to: '/explore' },
      { label: 'Roadmap', to: '/explore' },
      { label: 'API Documentation', to: '/explore' },
      { label: 'Privacy Policy', to: '/explore' },
      { label: 'Terms of Use', to: '/explore' },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Subscribed to updates', 'bookmark');
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-charcoal/60 backdrop-blur-sm">
      <div className="container-content py-16">
        {/* Top: Logo + Newsletter */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <BharatVerseLogo variant="horizontal" className="h-12 w-auto" />
            <p className="mt-5 font-body text-sm leading-relaxed text-ink-muted">
              A premium digital institution dedicated to documenting and exploring over 5,000 years of Indian civilization through evidence-driven scholarship.
            </p>
          </div>
          <div className="w-full max-w-sm">
            <p className="mb-3 font-body text-sm font-medium text-ink">Stay informed about new discoveries</p>
            {subscribed ? (
              <p className="font-body text-sm text-bronze">Thank you for subscribing! You'll receive updates on new content.</p>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  placeholder="Your email"
                  className="input-premium text-sm"
                  aria-label="Email for newsletter"
                />
                <button
                  onClick={handleSubscribe}
                  className="btn-primary shrink-0 text-xs"
                >
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Middle: Link columns */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-3">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-wider text-bronze">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="font-body text-sm text-ink-muted transition-colors duration-200 hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Social + Copyright */}
        <div className="flex flex-col items-start justify-between gap-6 border-t border-white/[0.06] pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <a href="#" className="icon-btn h-9 w-9" aria-label="GitHub"><Github className="h-4 w-4" /></a>
            <a href="#" className="icon-btn h-9 w-9" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="icon-btn h-9 w-9" aria-label="Email"><Mail className="h-4 w-4" /></a>
          </div>
          <p className="font-body text-xs text-ink-muted">
            © {new Date().getFullYear()} BharatVerse. Dedicated to the timeless civilization of Bharat.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
