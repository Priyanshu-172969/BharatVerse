import { useState, useRef, useEffect, useCallback } from 'react';
import { Layers, Globe, Clock, Info, ZoomIn, ZoomOut, RotateCcw, Play, Pause, X, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const LAYERS = [
  { id: 'empires', label: 'Empire Expansion', color: '#B88746' },
  { id: 'political', label: 'Political Boundaries', color: '#D68A28' },
  { id: 'trade', label: 'Trade Routes', color: '#D68A28' },
  { id: 'rivers', label: 'River Systems', color: '#4C78A8' },
  { id: 'migration', label: 'Migration Routes', color: '#4C78A8' },
  { id: 'pilgrimage', label: 'Pilgrimage Routes', color: '#4F7A52' },
  { id: 'battles', label: 'Battle Locations', color: '#C65A3A' },
  { id: 'sites', label: 'Archaeological Sites', color: '#4F7A52' },
  { id: 'universities', label: 'Ancient Universities', color: '#4C78A8' },
  { id: 'temples', label: 'Temple Locations', color: '#B88746' },
  { id: 'capitals', label: 'Historical Capitals', color: '#B88746' },
  { id: 'ports', label: 'Ancient Ports', color: '#D68A28' },
];

const ERAS = [
  { year: -2500, label: '2500 BCE' },
  { year: -1500, label: '1500 BCE' },
  { year: -500, label: '500 BCE' },
  { year: 0, label: '0 CE' },
  { year: 500, label: '500 CE' },
  { year: 1000, label: '1000 CE' },
  { year: 1500, label: '1500 CE' },
  { year: 1947, label: '1947 CE' },
];

interface Marker {
  x: number; y: number; label: string; era: string; layer: string; description: string; eventId?: string;
}

const MARKERS: Marker[] = [
  { x: 380, y: 240, label: 'Pataliputra', era: 'Mauryan', layer: 'capitals', description: 'Capital of the Mauryan and Gupta empires, modern-day Patna.' },
  { x: 320, y: 180, label: 'Delhi', era: 'Mughal', layer: 'capitals', description: 'Capital of the Delhi Sultanate and Mughal Empire.' },
  { x: 420, y: 380, label: 'Thanjavur', era: 'Chola', layer: 'capitals', description: 'Capital of the Chola Empire, home to the Brihadeeswara Temple.' },
  { x: 360, y: 340, label: 'Vijayanagara', era: 'Vijayanagara', layer: 'capitals', description: 'The magnificent capital of the Vijayanagara Empire at Hampi.' },
  { x: 300, y: 200, label: 'Pune', era: 'Maratha', layer: 'capitals', description: 'Seat of the Peshwa administration during the Maratha Confederacy.' },
  { x: 420, y: 380, label: 'Brihadeeswara Temple', era: 'Chola', layer: 'temples', description: 'A UNESCO World Heritage masterpiece of Dravidian architecture, built by Rajaraja Chola I in 1010 CE.' },
  { x: 340, y: 300, label: 'Khajuraho', era: 'Chandela', layer: 'temples', description: 'Famous group of Hindu and Jain temples known for Nagara-style architecture.' },
  { x: 380, y: 260, label: 'Bodh Gaya', era: 'Mauryan', layer: 'temples', description: 'The site where Buddha attained enlightenment under the Bodhi tree.' },
  { x: 370, y: 230, label: 'Nalanda', era: 'Gupta', layer: 'universities', description: 'One of the world\'s earliest residential universities, hosting 10,000 students.' },
  { x: 310, y: 170, label: 'Takshashila', era: 'Pre-Mauryan', layer: 'universities', description: 'An ancient center of learning in the Gandhara region.' },
  { x: 400, y: 320, label: 'Kalinga War', era: 'Mauryan', layer: 'battles', description: 'The devastating war in 261 BCE that transformed Emperor Ashoka toward Buddhism.' },
  { x: 330, y: 190, label: 'Panipat', era: 'Mughal', layer: 'battles', description: 'Site of three pivotal battles that shaped Mughal and Afghan power in India.' },
  { x: 350, y: 350, label: 'Talikota', era: 'Vijayanagara', layer: 'battles', description: '1565 CE battle where Deccan sultanates defeated the Vijayanagara Empire.' },
  { x: 280, y: 200, label: 'Harappa', era: 'Indus Valley', layer: 'sites', description: 'A major urban center of the Indus Valley Civilization in Punjab.' },
  { x: 290, y: 230, label: 'Mohenjo-daro', era: 'Indus Valley', layer: 'sites', description: 'One of the largest Indus Valley cities, in modern-day Sindh, Pakistan.' },
  { x: 350, y: 280, label: 'Dholavira', era: 'Indus Valley', layer: 'sites', description: 'A Harappan city known for its sophisticated water conservation system.' },
  { x: 310, y: 350, label: 'Muziris', era: 'Chera', layer: 'ports', description: 'An ancient port on the Kerala coast, famous in Roman trade records.' },
  { x: 430, y: 400, label: 'Kaveripattinam', era: 'Chola', layer: 'ports', description: 'A flourishing Chola port city on the Coromandel coast.' },
];

const EMPIRE_BOUNDARIES: Record<string, { d: string; color: string; label: string }> = {
  '-2500': { d: 'M 280 200 Q 300 210 320 220 Q 340 230 350 250 Q 360 270 350 280 Q 340 290 320 280 Q 300 270 290 250 Q 280 230 280 200 Z', color: '#4F7A52', label: 'Indus Valley' },
  '-500': { d: 'M 320 180 Q 380 190 400 220 Q 420 260 400 300 Q 380 340 340 350 Q 300 340 290 300 Q 280 260 300 220 Q 310 200 320 180 Z', color: '#B88746', label: 'Mahajanapadas' },
  '-300': { d: 'M 280 140 Q 380 150 440 200 Q 480 260 460 320 Q 440 380 380 410 Q 320 400 280 360 Q 250 300 260 240 Q 270 180 280 140 Z', color: '#D68A28', label: 'Mauryan Empire' },
  '400': { d: 'M 300 160 Q 400 170 450 220 Q 480 280 460 340 Q 430 390 370 400 Q 310 390 280 340 Q 260 280 280 220 Q 290 180 300 160 Z', color: '#B88746', label: 'Gupta Empire' },
  '1000': { d: 'M 360 320 Q 420 330 450 370 Q 470 410 440 430 Q 400 440 360 420 Q 330 400 340 360 Q 350 330 360 320 Z', color: '#C65A3A', label: 'Chola Empire' },
  '1500': { d: 'M 280 140 Q 400 150 480 200 Q 520 280 500 360 Q 470 420 400 440 Q 320 430 280 390 Q 240 320 250 240 Q 260 180 280 140 Z', color: '#D68A28', label: 'Mughal Empire' },
};

function getClosestEra(year: number): string {
  const keys = Object.keys(EMPIRE_BOUNDARIES).map(Number).sort((a, b) => Math.abs(a - year) - Math.abs(b - year));
  return keys[0]?.toString() ?? '-500';
}

export function MapsPage() {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(['empires', 'rivers', 'capitals']));
  const [year, setYear] = useState(-300);
  const [showModern, setShowModern] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<Marker | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMobileLayers, setShowMobileLayers] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const playRafRef = useRef<number>();

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const eraLabel = ERAS.reduce((closest, era) => Math.abs(era.year - year) < Math.abs(closest.year - year) ? era : closest).label;
  const empireKey = getClosestEra(year);
  const empire = EMPIRE_BOUNDARIES[empireKey];

  const visibleMarkers = MARKERS.filter((m) => activeLayers.has(m.layer));

  // Play animation
  useEffect(() => {
    if (!isPlaying) return;
    let lastTime = 0;
    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;
      setYear((y) => {
        const next = y + dt * 0.05;
        if (next >= 1947) { setIsPlaying(false); return 1947; }
        return next;
      });
      playRafRef.current = requestAnimationFrame(animate);
    };
    playRafRef.current = requestAnimationFrame(animate);
    return () => { if (playRafRef.current) cancelAnimationFrame(playRafRef.current); };
  }, [isPlaying]);

  // Wheel zoom
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((z) => Math.max(0.5, Math.min(3, z + delta)));
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };
  const handleMouseUp = () => { isDragging.current = false; };

  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  const transform = `translate(${pan.x}, ${pan.y}) scale(${zoom})`;
  const transformOrigin = 'center';

  return (
    <div className="flex h-[calc(100vh-72px)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-charcoal/60 px-6 py-3 backdrop-blur-sm">
        <div>
          <h1 className="font-heading text-xl font-medium text-ink">Historical Maps</h1>
          <p className="font-body text-xs text-ink-muted">Explore the subcontinent across 5,000 years</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowMobileLayers(!showMobileLayers)} className="btn-ghost md:hidden"><Layers className="h-4 w-4" />Layers</button>
          <button onClick={() => setIsPlaying((p) => !p)} className="flex items-center gap-2 rounded-btn border border-bronze/30 bg-bronze/10 px-3 py-2 font-body text-xs text-bronze transition-all duration-200 hover:bg-bronze/20">
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => setShowModern(!showModern)} className={`flex items-center gap-2 rounded-btn border px-3 py-2 font-body text-xs transition-colors ${showModern ? 'border-bronze/40 bg-bronze/10 text-bronze' : 'border-white/[0.08] text-ink-muted'}`}>
            <Globe className="h-3.5 w-3.5" />Modern
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Layers panel */}
        <div className={`absolute z-50 w-60 shrink-0 overflow-y-auto border-r border-white/[0.06] bg-charcoal/95 p-4 backdrop-blur-xl transition-transform duration-300 md:relative md:translate-x-0 ${showMobileLayers ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2"><Layers className="h-4 w-4 text-bronze" /><span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-secondary">Map Layers</span></div>
            <button onClick={() => setShowMobileLayers(false)} className="icon-btn h-7 w-7 md:hidden"><X className="h-4 w-4" /></button>
          </div>
          <div className="space-y-1">
            {LAYERS.map((layer) => (
              <button key={layer.id} onClick={() => toggleLayer(layer.id)} className={`flex w-full items-center gap-2.5 rounded-btn px-2.5 py-2 text-left transition-colors ${activeLayers.has(layer.id) ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}`}>
                <span className="h-2.5 w-2.5 rounded-full transition-opacity" style={{ backgroundColor: layer.color, opacity: activeLayers.has(layer.id) ? 1 : 0.3 }} />
                <span className={`font-body text-xs ${activeLayers.has(layer.id) ? 'text-ink' : 'text-ink-muted'}`}>{layer.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 border-t border-white/[0.06] pt-4">
            <div className="mb-2 flex items-center gap-2"><Info className="h-3.5 w-3.5 text-bronze" /><span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-muted">Legend</span></div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-bronze" /><span className="font-body text-xs text-ink-muted">Capitals & Temples</span></div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-river" /><span className="font-body text-xs text-ink-muted">Rivers & Routes</span></div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-terracotta" /><span className="font-body text-xs text-ink-muted">Battles</span></div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indus" /><span className="font-body text-xs text-ink-muted">Sites & Universities</span></div>
            </div>
          </div>
        </div>

        {/* Map canvas */}
        <div className="relative flex-1 overflow-hidden bg-charcoal-50/20">
          {/* Zoom controls */}
          <div className="absolute left-4 top-4 z-30 flex flex-col gap-1">
            <button onClick={() => setZoom((z) => Math.min(3, z + 0.2))} className="icon-btn h-9 w-9 bg-charcoal-100/80 backdrop-blur-sm" aria-label="Zoom in"><ZoomIn className="h-4 w-4" /></button>
            <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))} className="icon-btn h-9 w-9 bg-charcoal-100/80 backdrop-blur-sm" aria-label="Zoom out"><ZoomOut className="h-4 w-4" /></button>
            <button onClick={resetView} className="icon-btn h-9 w-9 bg-charcoal-100/80 backdrop-blur-sm" aria-label="Reset view"><RotateCcw className="h-4 w-4" /></button>
          </div>

          <svg
            ref={svgRef}
            className="h-full w-full cursor-grab active:cursor-grabbing"
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid meet"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ transformOrigin }}
          >
            <defs>
              <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B88746" strokeWidth="0.3" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapgrid)" />

            <g transform={transform} style={{ transition: 'transform 0.3s ease-calm' }}>
              {/* Subcontinent outline */}
              <path
                d="M 280 120 Q 320 80 380 100 Q 440 90 480 130 Q 520 160 510 220 Q 530 280 500 340 Q 470 400 420 440 Q 380 480 340 460 Q 300 440 280 400 Q 250 360 260 300 Q 240 240 270 180 Q 275 140 280 120 Z"
                fill="rgba(184,135,70,0.04)"
                stroke={showModern ? '#4C78A8' : '#B88746'}
                strokeWidth="1.5"
                strokeDasharray={showModern ? '4 4' : 'none'}
                opacity="0.6"
                className="transition-all duration-500"
              />

              {/* Empire boundary overlay */}
              {activeLayers.has('empires') && empire && (
                <g className="transition-all duration-700 ease-calm">
                  <path d={empire.d} fill={`${empire.color}15`} stroke={empire.color} strokeWidth="1.5" strokeDasharray="6 3" opacity="0.7" />
                  <text x="340" y="200" fill={empire.color} fontSize="11" fontFamily="'Cormorant Garamond', serif" fontWeight="600" opacity="0.6" textAnchor="middle">{empire.label}</text>
                </g>
              )}

              {/* Political boundaries */}
              {activeLayers.has('political') && (
                <g stroke="#4F7A52" strokeWidth="1" fill="none" opacity="0.3">
                  <path d="M 280 120 Q 350 100 420 110 Q 480 120 510 130" />
                  <path d="M 290 130 Q 360 115 430 125" />
                </g>
              )}

              {/* River systems */}
              {activeLayers.has('rivers') && (
                <g stroke="#4C78A8" strokeWidth="2" fill="none" opacity="0.5">
                  <path d="M 350 140 Q 380 220 400 300 Q 410 380 420 440" />
                  <path d="M 300 150 Q 320 200 310 280 Q 305 340 320 400" />
                  <path d="M 480 130 Q 470 180 450 220" />
                  <path d="M 320 340 Q 360 350 400 360" />
                  <path d="M 380 360 Q 400 390 420 420" />
                  <path d="M 360 370 Q 390 400 410 430" />
                </g>
              )}

              {/* Trade routes */}
              {activeLayers.has('trade') && (
                <g stroke="#D68A28" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.6">
                  <path d="M 280 200 Q 380 180 480 220" />
                  <path d="M 350 300 Q 450 320 500 380" />
                  <path d="M 300 350 Q 350 380 400 400" />
                </g>
              )}

              {/* Pilgrimage routes */}
              {activeLayers.has('pilgrimage') && (
                <g stroke="#4F7A52" strokeWidth="1" fill="none" strokeDasharray="2 4" opacity="0.4">
                  <path d="M 320 200 Q 360 250 380 260" />
                  <path d="M 380 260 Q 400 300 420 380" />
                </g>
              )}

              {/* Migration routes */}
              {activeLayers.has('migration') && (
                <g stroke="#4C78A8" strokeWidth="1" fill="none" strokeDasharray="6 3" opacity="0.3">
                  <path d="M 280 120 Q 320 160 350 200" />
                  <path d="M 300 150 Q 340 200 380 240" />
                </g>
              )}

              {/* Markers */}
              {visibleMarkers.map((m, i) => {
                const isHovered = hoveredMarker === m;
                const isSelected = selectedMarker === m;
                const layerColor = LAYERS.find((l) => l.id === m.layer)?.color ?? '#B88746';
                return (
                  <g
                    key={`${m.label}-${i}`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredMarker(m)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    onClick={() => setSelectedMarker(m)}
                  >
                    <circle cx={m.x} cy={m.y} r={isHovered || isSelected ? 7 : 5} fill={layerColor} className="transition-all duration-200" style={{ filter: isHovered || isSelected ? `drop-shadow(0 0 6px ${layerColor})` : 'none' }} />
                    {(isHovered || isSelected) && <circle cx={m.x} cy={m.y} r="12" fill="none" stroke={layerColor} strokeWidth="1" opacity="0.4" className="animate-pulse-soft" />}
                    <text x={m.x + 10} y={m.y + 4} fill="#C4BEB3" fontSize="9" fontFamily="Inter, sans-serif" className="pointer-events-none">{m.label}</text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Era indicator */}
          <div className="absolute right-4 top-4 z-30 rounded-dialog border border-white/10 bg-charcoal-100/80 px-4 py-2 backdrop-blur-md">
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-bronze" /><span className="font-numeric text-sm text-ink">{eraLabel}</span></div>
          </div>

          {/* Hover tooltip */}
          {hoveredMarker && !selectedMarker && (
            <div className="pointer-events-none absolute z-40 max-w-xs rounded-dialog border border-white/10 bg-charcoal-100/95 px-4 py-3 shadow-xl backdrop-blur-md animate-fade-in" style={{ left: '50%', top: '10%', transform: 'translateX(-50%)' }}>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-bronze" /><p className="font-body text-sm font-medium text-ink">{hoveredMarker.label}</p></div>
              <p className="mt-1 font-body text-xs text-bronze">{hoveredMarker.era}</p>
            </div>
          )}

          {/* Selected marker popup */}
          {selectedMarker && (
            <div className="absolute right-4 top-16 z-40 w-72 animate-fade-up">
              <div className="card-editorial p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-bronze" /><div><p className="font-body text-sm font-medium text-ink">{selectedMarker.label}</p><p className="font-body text-xs text-bronze">{selectedMarker.era}</p></div></div>
                  <button onClick={() => setSelectedMarker(null)} className="icon-btn h-7 w-7" aria-label="Close popup"><X className="h-4 w-4" /></button>
                </div>
                <p className="mb-4 font-body text-xs leading-relaxed text-ink-secondary">{selectedMarker.description}</p>
                <Link to="/explore" className="btn-primary w-full text-xs">Learn more<ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Time slider */}
      <div className="border-t border-white/[0.06] bg-charcoal/60 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="font-numeric text-xs text-ink-muted">3300 BCE</span>
          <input type="range" min={-3300} max={1947} value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))} className="flex-1 accent-bronze" aria-label="Map year slider" />
          <span className="font-numeric text-xs text-ink-muted">1947 CE</span>
          <div className="ml-4 hidden items-center gap-2 md:flex">
            {ERAS.map((era) => (
              <button key={era.year} onClick={() => setYear(era.year)} className={`rounded-md px-2 py-1 font-numeric text-xs transition-colors ${Math.abs(era.year - year) < 100 ? 'bg-bronze/15 text-bronze' : 'text-ink-muted hover:bg-white/[0.04] hover:text-bronze'}`}>{era.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapsPage;
