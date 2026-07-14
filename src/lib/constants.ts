export const COLORS = {
  charcoal: '#111315',
  charcoal50: '#1A1E22',
  charcoal100: '#242A30',
  charcoal200: '#2E353D',
  bronze: '#B88746',
  bronzeLight: '#D4A05A',
  saffron: '#D68A28',
  indus: '#4F7A52',
  river: '#4C78A8',
  terracotta: '#C65A3A',
  ink: '#F4F1EA',
  inkSecondary: '#C4BEB3',
  inkMuted: '#8E887E',
} as const;

export const EVIDENCE_TYPES = {
  archaeology: { label: 'Archaeology', color: '#4F7A52', icon: 'landmark' },
  inscriptions: { label: 'Inscriptions', color: '#B88746', icon: 'scroll' },
  coins: { label: 'Coins', color: '#D68A28', icon: 'circle-dollar-sign' },
  literary: { label: 'Literary Sources', color: '#4C78A8', icon: 'book-open' },
  foreign: { label: 'Foreign Accounts', color: '#4F7A52', icon: 'globe' },
  carbon: { label: 'Carbon Dating', color: '#4C78A8', icon: 'atom' },
  satellite: { label: 'Satellite Analysis', color: '#4C78A8', icon: 'satellite' },
  academic: { label: 'Academic Research', color: '#B88746', icon: 'graduation-cap' },
  primary: { label: 'Primary Documents', color: '#C65A3A', icon: 'file-text' },
} as const;

export const CONFIDENCE_LEVELS = {
  verified: { label: 'Verified', segments: 5, color: '#4F7A52' },
  strong: { label: 'Strong Consensus', segments: 4, color: '#4F7A52' },
  likely: { label: 'Likely', segments: 3, color: '#B88746' },
  debated: { label: 'Debated', segments: 2, color: '#C65A3A' },
  legendary: { label: 'Legendary', segments: 1, color: '#7F7A72' },
} as const;

export const NODE_SHAPES = {
  event: 'circle',
  empire: 'square',
  battle: 'diamond',
  science: 'hexagon',
  temple: 'triangle',
  literature: 'rounded',
  cultural: 'outline-circle',
} as const;

export const CATEGORIES = [
  { id: 'political', label: 'Political', icon: 'landmark', color: '#B88746' },
  { id: 'military', label: 'Military', icon: 'swords', color: '#C65A3A' },
  { id: 'religion', label: 'Religion & Philosophy', icon: 'om', color: '#4F7A52' },
  { id: 'literature', label: 'Literature & Culture', icon: 'book-open', color: '#4C78A8' },
  { id: 'economy', label: 'Economy & Trade', icon: 'coins', color: '#D68A28' },
  { id: 'geography', label: 'Geography', icon: 'mountain', color: '#4C78A8' },
  { id: 'society', label: 'Society', icon: 'users', color: '#4F7A52' },
  { id: 'science', label: 'Science & Technology', icon: 'flask-conical', color: '#4C78A8' },
  { id: 'law', label: 'Law & Administration', icon: 'scale', color: '#B88746' },
  { id: 'archaeology', label: 'Archaeology', icon: 'pickaxe', color: '#4F7A52' },
  { id: 'numismatics', label: 'Numismatics', icon: 'circle-dollar-sign', color: '#D68A28' },
  { id: 'inscriptions', label: 'Inscriptions', icon: 'scroll', color: '#B88746' },
  { id: 'genetics', label: 'Genetics & Anthropology', icon: 'dna', color: '#4F7A52' },
  { id: 'maritime', label: 'Maritime History', icon: 'ship', color: '#4C78A8' },
  { id: 'architecture', label: 'Architecture', icon: 'building-2', color: '#B88746' },
  { id: 'art', label: 'Art & Sculpture', icon: 'palette', color: '#C65A3A' },
] as const;

export const HISTORICAL_QUOTES = [
  { text: 'All men are my children. I desire for them what I desire for my own children — welfare and happiness in this world and the next.', source: 'Emperor Ashoka, Rock Edict V', year: -257 },
  { text: 'In the happiness of his subjects lies the king\'s happiness, in their welfare his welfare.', source: 'Chanakya, Arthashastra', year: -300 },
  { text: 'Non-violence is the greatest force at the disposal of mankind. It is mightier than the mightiest weapon of destruction devised by the ingenuity of man.', source: 'Mahatma Gandhi', year: 1930 },
  { text: 'The Earth rotates on its axis, causing the apparent daily motion of the stars.', source: 'Aryabhata, Aryabhatiya', year: 499 },
  { text: 'A nation\'s culture resides in the hearts and in the soul of its people.', source: 'Mahatma Gandhi', year: 1942 },
  { text: 'Victory attained by violence is tantamount to a defeat, for it is momentary.', source: 'Emperor Ashoka, Rock Edict XIII', year: -261 },
] as const;

export const ANIMATED_STATS = [
  { value: 5000, suffix: '+', label: 'Years Covered' },
  { value: 18, suffix: '', label: 'Historical Domains' },
  { value: 25000, suffix: '+', label: 'Historical Events' },
  { value: 7500, suffix: '+', label: 'Primary Sources' },
] as const;

export const NAV_SECTIONS = [
  {
    label: 'Discover',
    items: [
      { to: '/explore', label: 'Explore', icon: 'Compass' },
      { to: '/timeline', label: 'Timeline', icon: 'Clock' },
      { to: '/maps', label: 'Maps', icon: 'Map' },
    ],
  },
  {
    label: 'History',
    items: [
      { to: '/dynasties', label: 'Dynasties', icon: 'Crown' },
      { to: '/explore?tab=mauryan', label: 'Mauryan Era', icon: 'Landmark' },
      { to: '/explore?tab=gupta', label: 'Gupta Era', icon: 'Sparkles' },
      { to: '/explore?tab=chola', label: 'Chola Era', icon: 'Ship' },
      { to: '/explore?tab=freedom', label: 'Freedom Movement', icon: 'Flag' },
    ],
  },
  {
    label: 'Knowledge',
    items: [
      { to: '/explore?tab=science', label: 'Science', icon: 'FlaskConical' },
      { to: '/explore?tab=literature', label: 'Literature', icon: 'BookOpen' },
      { to: '/explore?tab=archaeology', label: 'Archaeology', icon: 'Landmark' },
      { to: '/personalities', label: 'Personalities', icon: 'Users' },
      { to: '/collections', label: 'Collections', icon: 'FolderOpen' },
    ],
  },
  {
    label: 'Personal',
    items: [
      { to: '/bookmarks', label: 'Bookmarks', icon: 'Bookmark' },
      { to: '/dashboard', label: 'Dashboard', icon: 'Settings' },
    ],
  },
] as const;

export function formatYear(year: number): string {
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
}
