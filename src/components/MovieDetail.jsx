import { useMemo, useState } from 'react';
import { getMovieGradient } from '../data/movies';
import { getSimilarToMovie, getMatchPercentage } from '../engine/engine';
import MovieCard from './MovieCard';

export default function MovieDetail({ movie, rating, onRate, onClose, tasteProfile, posters }) {
  const gradient = getMovieGradient(movie);
  const posterUrl = posters?.[movie.id];
  const [imgError, setImgError] = useState(false);
  const hasPoster = posterUrl && !imgError;

  const similarMovies = useMemo(() => {
    if (!tasteProfile) return [];
    return getSimilarToMovie(movie.id, tasteProfile, 6);
  }, [movie.id, tasteProfile]);

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
          {/* Watch Links */}
          <div className="detail-watch-links">
            <a href={movie.watchUrl} target="_blank" rel="noopener noreferrer" className="watch-btn watch-btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Where to Watch
            </a>
            <a href={`https://www.google.com/search?q=${encodeURIComponent(movie.title + ' ' + movie.year + ' watch online streaming')}`} target="_blank" rel="noopener noreferrer" className="watch-btn watch-btn-secondary">
              Search Streaming
            </a>
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
