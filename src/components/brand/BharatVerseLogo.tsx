import { type SVGProps } from 'react';

type LogoVariant = 'horizontal' | 'emblem';

interface BharatVerseLogoProps extends Omit<SVGProps<SVGSVGElement>, 'fill'> {
  variant?: LogoVariant;
  className?: string;
}

/**
 * BharatVerse brand emblem — a Flower of Life sacred geometry pattern
 * inscribed in a decorative ring, rendered in Indian Bronze.
 * Two variants: horizontal lockup (nav) and emblem-only (favicon/watermark).
 */
export function BharatVerseLogo({
  variant = 'horizontal',
  className,
  ...props
}: BharatVerseLogoProps) {
  const bronze = '#B88746';
  const saffron = '#D68A28';
  const ink = '#F4F1EA';

  const Emblem = ({ size }: { size: number }) => (
    <g>
      {/* Outer decorative ring */}
      <circle cx={size / 2} cy={size / 2} r={size * 0.46} fill="none" stroke={bronze} strokeWidth={size * 0.012} opacity={0.85} />
      <circle cx={size / 2} cy={size / 2} r={size * 0.42} fill="none" stroke={bronze} strokeWidth={size * 0.004} opacity={0.5} />
      {/* Flower of Life — 7 interlocking circles */}
      <g fill="none" stroke={bronze} strokeWidth={size * 0.006} opacity={0.9}>
        <circle cx={size / 2} cy={size / 2} r={size * 0.14} />
        <circle cx={size / 2} cy={size * 0.36} r={size * 0.14} />
        <circle cx={size * 0.621} cy={size * 0.43} r={size * 0.14} />
        <circle cx={size * 0.621} cy={size * 0.57} r={size * 0.14} />
        <circle cx={size / 2} cy={size * 0.64} r={size * 0.14} />
        <circle cx={size * 0.379} cy={size * 0.57} r={size * 0.14} />
        <circle cx={size * 0.379} cy={size * 0.43} r={size * 0.14} />
      </g>
      {/* Center bindu */}
      <circle cx={size / 2} cy={size / 2} r={size * 0.035} fill={saffron} />
      {/* Cardinal tick marks */}
      <g stroke={bronze} strokeWidth={size * 0.004} opacity={0.6}>
        <line x1={size / 2} y1={size * 0.06} x2={size / 2} y2={size * 0.1} />
        <line x1={size / 2} y1={size * 0.9} x2={size / 2} y2={size * 0.94} />
        <line x1={size * 0.06} y1={size / 2} x2={size * 0.1} y2={size / 2} />
        <line x1={size * 0.9} y1={size / 2} x2={size * 0.94} y2={size / 2} />
      </g>
    </g>
  );

  if (variant === 'emblem') {
    return (
      <svg viewBox="0 0 100 100" className={className} role="img" aria-label="BharatVerse" {...props}>
        <rect width="100" height="100" rx="22" fill="#111315" />
        <g transform="translate(10, 10) scale(0.8)">
          <Emblem size={100} />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 380 96" className={className} role="img" aria-label="BharatVerse" {...props}>
      {/* Emblem on left */}
      <g transform="translate(6, 6) scale(0.875)">
        <Emblem size={84} />
      </g>
      {/* Wordmark */}
      <text
        x="96"
        y="42"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="30"
        fontWeight="600"
        letterSpacing="0.04em"
        fill={ink}
      >
        BHARAT
        <tspan fill={bronze}>VERSE</tspan>
      </text>
      <text
        x="96"
        y="64"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="10"
        fontWeight="500"
        letterSpacing="0.22em"
        fill="#8E887E"
      >
        EXPLORE THE TIMELESS CIVILIZATION OF BHARAT
      </text>
    </svg>
  );
}

export default BharatVerseLogo;
