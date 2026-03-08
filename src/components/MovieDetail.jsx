import { useMemo, useState } from 'react';
import { getMovieGradient } from '../data/movies';
import { getSimilarToMovie, getMatchPercentage } from '../engine/engine';
import { getStreamingLinks, PLATFORMS } from '../data/streamingLinks';
import MovieCard from './MovieCard';

// Platform SVG icons (compact inline)
const PLATFORM_ICONS = {
  netflix: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M5.398 0v24l6.6-8.4V0H5.398zm7.204 0v24l6.6-8.4V0h-6.6z" opacity="0.9"/>
    </svg>
  ),
  prime: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M2 18l1.7-1.4c3.4 2.5 7.9 4 12.8 4 3.7 0 7.1-.9 9.5-2.4l1 1.5C24.2 21.6 20 23 15.5 23c-5.4 0-10.3-1.8-13.5-5zM22 16.5l2-1c-1.5-1.5-5-3-8.5-3-4.5 0-8.3 2-10.5 5l1.5 1c1.8-2.5 5-4.2 9-4.2 2.7 0 5 .8 6.5 2.2z"/>
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  hulu: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M2 4h4v6.5c.8-1 2-1.5 3.5-1.5 2.5 0 4.5 2 4.5 4.5V20h-4v-6c0-1.1-.9-2-2-2s-2 .9-2 2v6H2V4zm16 5c-2.5 0-4.5 2-4.5 4.5V20h4v-6c0-1.1.9-2 2-2s2 .9 2 2v6h4v-6.5c0-2.5-2-4.5-4.5-4.5h-3z"/>
    </svg>
  ),
  jiohotstar: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
};

export default function MovieDetail({ movie, rating, onRate, onClose, tasteProfile, posters }) {
  const gradient = getMovieGradient(movie);
  const posterUrl = posters?.[movie.id];
  const [imgError, setImgError] = useState(false);
  const hasPoster = posterUrl && !imgError;

  const similarMovies = useMemo(() => {
    if (!tasteProfile) return [];
    return getSimilarToMovie(movie.id, tasteProfile, 6);
  }, [movie.id, tasteProfile]);

  const streamingLinks = useMemo(() => {
    return getStreamingLinks(movie.id, movie.title);
  }, [movie.id, movie.title]);

  const handleRate = (r) => {
    onRate(movie.id, rating === r ? 0 : r);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        {/* Hero Banner */}
        <div className="detail-hero" style={hasPoster ? {} : { background: gradient }}>
          {hasPoster && (
            <img src={posterUrl} alt="" className="detail-hero-img" onError={() => setImgError(true)} />
          )}
          <div className="detail-hero-overlay" />
          <div className="detail-hero-content">
            <h1 className="detail-title">{movie.title}</h1>
            <div className="detail-meta">
              <span>{movie.year}</span>
              <span className="detail-dot">&middot;</span>
              <span>{movie.runtime} min</span>
              <span className="detail-dot">&middot;</span>
              <span>{'\u2605'} {movie.rating}/10</span>
            </div>
            <p className="detail-director">Directed by {movie.director}</p>
            {movie.language && movie.language !== 'english' && (
              <span className="detail-language-badge">{movie.language.charAt(0).toUpperCase() + movie.language.slice(1)}</span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="detail-body">
          {/* Streaming Platform Links */}
          <div className="detail-section">
            <h3>Where to Watch</h3>
            <div className="streaming-platforms">
              {streamingLinks.map(link => (
                <a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-link"
                  style={{ '--platform-color': link.color }}
                >
                  <span className="platform-icon">{PLATFORM_ICONS[link.key]}</span>
                  <span className="platform-name">{link.name}</span>
                </a>
              ))}
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(movie.title + ' ' + movie.year + ' watch online streaming')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-link platform-link-search"
              >
                <span className="platform-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </span>
                <span className="platform-name">Search More</span>
              </a>
            </div>
          </div>

          {/* Overview */}
          <p className="detail-overview">{movie.overview}</p>

          {/* Cast */}
          <div className="detail-section">
            <h3>Cast</h3>
            <div className="detail-cast">
              {movie.cast.map(name => (
                <span key={name} className="cast-tag">{name}</span>
              ))}
            </div>
          </div>

          {/* Genres & Moods */}
          <div className="detail-row">
            <div className="detail-section">
              <h3>Genres</h3>
              <div className="detail-tags">
                {movie.genres.map(g => (
                  <span key={g} className="genre-tag">{g}</span>
                ))}
              </div>
            </div>
            <div className="detail-section">
              <h3>Moods</h3>
              <div className="detail-tags">
                {movie.moods.map(m => (
                  <span key={m} className="mood-tag">{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Themes */}
          <div className="detail-section">
            <h3>Themes</h3>
            <div className="detail-tags">
              {movie.themes.map(t => (
                <span key={t} className="theme-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Movie DNA */}
          <div className="detail-section">
            <h3>Movie DNA</h3>
            <div className="movie-dna-bars">
              {Object.entries(movie.features).map(([key, value]) => (
                <div key={key} className="dna-bar-row">
                  <span className="dna-bar-label">
                    {key === 'emotionalIntensity' ? 'Intensity' :
                     key === 'visualStyle' ? 'Visual Style' :
                     key === 'dialogueDriven' ? 'Dialogue' :
                     key === 'artHouse' ? 'Art House' :
                     key === 'eraFeel' ? 'Modern Feel' :
                     key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <div className="dna-bar-track">
                    <div className="dna-bar-fill" style={{ width: `${value * 100}%` }} />
                  </div>
                  <span className="dna-bar-value">{Math.round(value * 100)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rate */}
          <div className="detail-section detail-rate">
            <h3>Your Rating</h3>
            <div className="detail-rating-buttons">
              {[
                { r: 5, label: 'Love it', emoji: '\u2764\uFE0F' },
                { r: 4, label: 'Like it', emoji: '\uD83D\uDC4D' },
                { r: 3, label: 'Meh', emoji: '\uD83D\uDE10' },
                { r: 2, label: 'Not for me', emoji: '\uD83D\uDC4E' }
              ].map(({ r, label, emoji }) => (
                <button
                  key={r}
                  className={`detail-rate-btn ${rating === r ? 'active' : ''}`}
                  onClick={() => handleRate(r)}
                >
                  <span className="rate-emoji">{emoji}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <div className="detail-section">
              <h3>Similar Movies</h3>
              <div className="detail-similar">
                {similarMovies.map(({ movie: sim, tasteSimilarity }) => (
                  <MovieCard
                    key={sim.id}
                    movie={sim}
                    matchPercent={getMatchPercentage(tasteSimilarity)}
                    size="small"
                    posterUrl={posters?.[sim.id]}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
