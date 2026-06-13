import { useEffect, useRef } from "react";

/**
 * Dynamic structural blueprint background.
 * Renders an orthographic SVG grid that fractures and reassembles,
 * with networked data nodes, technical callouts, and parallax on scroll.
 */
export function BlueprintBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const nearRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (farRef.current) farRef.current.setAttribute("transform", `translate(0 ${y * -0.05})`);
        if (midRef.current) midRef.current.setAttribute("transform", `translate(0 ${y * -0.12})`);
        if (nearRef.current) nearRef.current.setAttribute("transform", `translate(0 ${y * -0.22})`);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="blueprint-bg pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 1600 2400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1b1c1a" strokeWidth="0.4" opacity="0.18" />
          </pattern>
          <pattern id="bp-grid-fine" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1b1c1a" strokeWidth="0.2" opacity="0.08" />
          </pattern>
          <linearGradient id="bp-fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#F7F6F3" stopOpacity="0" />
            <stop offset="1" stopColor="#F7F6F3" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* FAR LAYER — full grid wash */}
        <g ref={farRef}>
          <rect width="1600" height="2400" fill="url(#bp-grid-fine)" />
          <rect width="1600" height="2400" fill="url(#bp-grid)" />
        </g>

        {/* MID LAYER — fracturing panels (reassembling volumes) */}
        <g ref={midRef} stroke="#1b1c1a" fill="none" strokeWidth="0.6" opacity="0.55">
          {/* Isometric volume A */}
          <g className="bp-volume bp-volA">
            <polygon points="180,420 360,360 360,560 180,620" fill="#1b1c1a" fillOpacity="0.025" />
            <polygon points="360,360 540,420 540,620 360,560" fill="#1b1c1a" fillOpacity="0.04" />
            <polygon points="180,420 360,360 540,420 360,480" fill="#1b1c1a" fillOpacity="0.015" />
            <line x1="360" y1="480" x2="360" y2="680" strokeDasharray="2 4" />
          </g>

          {/* Isometric volume B */}
          <g className="bp-volume bp-volB">
            <polygon points="1080,260 1260,200 1260,440 1080,500" fill="#1b1c1a" fillOpacity="0.03" />
            <polygon points="1260,200 1420,260 1420,500 1260,440" fill="#1b1c1a" fillOpacity="0.05" />
            <polygon points="1080,260 1260,200 1420,260 1240,320" fill="#1b1c1a" fillOpacity="0.018" />
          </g>

          {/* Faceted plate */}
          <g className="bp-volume bp-volC">
            <polygon points="220,1100 520,1040 700,1120 580,1300 280,1320" fill="#1b1c1a" fillOpacity="0.025" />
            <line x1="520" y1="1040" x2="580" y2="1300" />
            <line x1="220" y1="1100" x2="700" y2="1120" />
          </g>

          {/* Long structural beam */}
          <g className="bp-volume bp-volD">
            <polygon points="900,1500 1500,1420 1500,1500 900,1580" fill="#1b1c1a" fillOpacity="0.035" />
            <line x1="900" y1="1500" x2="1500" y2="1420" />
            <line x1="900" y1="1580" x2="1500" y2="1500" />
          </g>

          {/* Fracture seams */}
          <g className="bp-fracture" strokeDasharray="3 6">
            <line x1="0" y1="780" x2="1600" y2="740" />
            <line x1="0" y1="1380" x2="1600" y2="1420" />
            <line x1="640" y1="0" x2="700" y2="2400" />
          </g>
        </g>

        {/* NEAR LAYER — network nodes, callouts, evolving glyphs */}
        <g ref={nearRef} fontFamily="ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace">
          {/* Network of connected data nodes */}
          <g className="bp-network" stroke="#1b1c1a" strokeWidth="0.5" opacity="0.55">
            <line x1="240" y1="780" x2="420" y2="860" />
            <line x1="420" y1="860" x2="600" y2="800" />
            <line x1="600" y1="800" x2="780" y2="900" />
            <line x1="780" y1="900" x2="980" y2="820" />
            <line x1="980" y1="820" x2="1180" y2="900" />
            <line x1="1180" y1="900" x2="1360" y2="820" />
            <line x1="420" y1="860" x2="600" y2="980" />
            <line x1="600" y1="980" x2="780" y2="900" />
            <line x1="600" y1="980" x2="780" y2="1100" />
            <line x1="780" y1="1100" x2="980" y2="1020" />
            <line x1="980" y1="1020" x2="980" y2="820" />
            <line x1="980" y1="1020" x2="1180" y2="1100" />

            <line x1="200" y1="1660" x2="380" y2="1740" />
            <line x1="380" y1="1740" x2="560" y2="1680" />
            <line x1="560" y1="1680" x2="760" y2="1780" />
            <line x1="760" y1="1780" x2="940" y2="1700" />
            <line x1="380" y1="1740" x2="560" y2="1860" />
            <line x1="560" y1="1860" x2="760" y2="1780" />
          </g>
          <g className="bp-nodes" fill="#1b1c1a">
            {[
              [240,780],[420,860],[600,800],[780,900],[980,820],[1180,900],[1360,820],
              [600,980],[780,1100],[980,1020],[1180,1100],
              [200,1660],[380,1740],[560,1680],[760,1780],[940,1700],[560,1860],
            ].map(([cx,cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.4" className="bp-node" style={{ animationDelay: `${(i % 8) * 0.4}s` }} />
            ))}
          </g>

          {/* Callout anchor dots (text removed) */}
          <g fill="#1b1c1a" opacity="0.55">
            <g className="bp-callout">
              <line x1="540" y1="430" x2="660" y2="430" stroke="#1b1c1a" strokeWidth="0.5" />
              <circle cx="540" cy="430" r="2" />
            </g>
            <g className="bp-callout" style={{ animationDelay: "1.2s" }}>
              <line x1="1080" y1="500" x2="980" y2="560" stroke="#1b1c1a" strokeWidth="0.5" />
              <circle cx="1080" cy="500" r="2" />
            </g>
            <g className="bp-callout" style={{ animationDelay: "2.4s" }}>
              <line x1="540" y1="1170" x2="640" y2="1170" stroke="#1b1c1a" strokeWidth="0.5" />
              <circle cx="540" cy="1170" r="2" />
            </g>
            <g className="bp-callout" style={{ animationDelay: "3.6s" }}>
              <line x1="1180" y1="1500" x2="1080" y2="1560" stroke="#1b1c1a" strokeWidth="0.5" />
              <circle cx="1180" cy="1500" r="2" />
            </g>
          </g>
        </g>

        {/* Bottom fade into surface for seamless transition */}
        <rect x="0" y="2080" width="1600" height="320" fill="url(#bp-fade)" />
      </svg>
    </div>
  );
}