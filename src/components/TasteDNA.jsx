import { useRef, useEffect } from 'react';

export default function TasteDNA({ tasteDNA, ratings, totalRated }) {
  if (!tasteDNA) {
    return (
      <div className="dna-page">
        <div className="empty-state">
          <p>Rate more movies to see your Taste DNA!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dna-page">
      <div className="dna-header">
        <h1 className="dna-title">Your Taste DNA</h1>
        <p className="dna-subtitle">{totalRated} movies rated &middot; Your cinematic fingerprint</p>
      </div>

      {/* Radar Chart */}
      <div className="dna-radar-section">
        <RadarChart data={tasteDNA.radarData} />
      </div>

      {/* Top Genres */}
      <div className="dna-section">
        <h2>Your Top Genres</h2>
        <div className="dna-bars">
          {tasteDNA.topGenres.map(({ name, value }) => (
            <div key={name} className="dna-bar-item">
              <div className="dna-bar-header">
                <span className="dna-bar-name">{name}</span>
                <span className="dna-bar-pct">{Math.round(value * 100)}%</span>
              </div>
              <div className="dna-bar-outer">
                <div className="dna-bar-inner" style={{ width: `${Math.min(100, value * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Moods */}
      <div className="dna-section">
        <h2>Your Mood Preferences</h2>
        <div className="dna-bars">
          {tasteDNA.topMoods.map(({ name, value }) => (
            <div key={name} className="dna-bar-item">
              <div className="dna-bar-header">
                <span className="dna-bar-name">{name}</span>
                <span className="dna-bar-pct">{Math.round(value * 100)}%</span>
              </div>
              <div className="dna-bar-outer mood-bar">
                <div className="dna-bar-inner mood-fill" style={{ width: `${Math.min(100, value * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Preferences */}
      <div className="dna-section">
        <h2>Your Viewing Style</h2>
        <div className="dna-style-grid">
          {tasteDNA.features.map(({ name, value }) => {
            const labels = {
              pacing: ['Slow & Meditative', 'Fast & Intense'],
              complexity: ['Simple & Clear', 'Complex & Layered'],
              popularity: ['Hidden Gems', 'Mainstream Hits'],
              visualStyle: ['Naturalistic', 'Highly Stylized'],
              emotionalIntensity: ['Light & Easy', 'Emotionally Heavy'],
              dialogueDriven: ['Visual Storytelling', 'Dialogue Rich'],
              artHouse: ['Commercial', 'Art House'],
              eraFeel: ['Classic Cinema', 'Contemporary']
            };
            const [low, high] = labels[name] || [name, name];
            const pct = Math.max(0, Math.min(1, value));
            return (
              <div key={name} className="style-item">
                <div className="style-labels">
                  <span className={pct < 0.5 ? 'active' : ''}>{low}</span>
                  <span className={pct >= 0.5 ? 'active' : ''}>{high}</span>
                </div>
                <div className="style-track">
                  <div className="style-marker" style={{ left: `${pct * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Simple SVG Radar Chart
function RadarChart({ data }) {
  const size = 300;
  const center = size / 2;
  const radius = size / 2 - 40;
  const n = data.length;

  if (n === 0) return null;

  const getPoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = radius * value;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const getLabelPoint = (index) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = radius + 25;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1.0];

  // Data polygon
  const dataPoints = data.map((d, i) => getPoint(i, d.value));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="radar-chart">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        {/* Grid rings */}
        {rings.map(r => {
          const ringPoints = data.map((_, i) => getPoint(i, r));
          const ringPath = ringPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
          return <path key={r} d={ringPath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
        })}

        {/* Axis lines */}
        {data.map((_, i) => {
          const p = getPoint(i, 1);
          return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
        })}

        {/* Data area */}
        <path d={dataPath} fill="rgba(139, 92, 246, 0.25)" stroke="#8b5cf6" strokeWidth="2" />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
        ))}

        {/* Labels */}
        {data.map((d, i) => {
          const p = getLabelPoint(i);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255,255,255,0.7)"
              fontSize="11"
              fontFamily="Inter, sans-serif"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
