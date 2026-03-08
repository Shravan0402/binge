import { useState } from 'react';
import { getMovieGradient } from '../data/movies';

const LANG_FLAGS = {
  tamil: 'TA', hindi: 'HI', telugu: 'TE', malayalam: 'ML', kannada: 'KN'
};

export default function MovieCard({ movie, rating, matchPercent, onRate, onClick, size = 'normal', posterUrl, showLanguage }) {
  const gradient = getMovieGradient(movie);
  const [imgError, setImgError] = useState(false);
  const hasPoster = posterUrl && !imgError;
  const langTag = movie.language && movie.language !== 'english' ? LANG_FLAGS[movie.language] : null;

  const handleQuickRate = (e, r) => {
    e.stopPropagation();
    if (onRate) onRate(movie.id, rating === r ? 0 : r);
  };

  return (
    <div
      className={`movie-card ${size} ${rating ? 'rated' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Poster */}
      <div className="movie-poster" style={hasPoster ? {} : { background: gradient }}>
        {hasPoster && (
          <img
            src={posterUrl}
            alt={movie.title}
            className="poster-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <div className="poster-overlay" />
        <div className="poster-content">
          <span className="poster-year">{movie.year}</span>
          <h3 className="poster-title">{movie.title}</h3>
        </div>

        {/* Match Badge */}
        {matchPercent != null && matchPercent > 0 && (
          <div className={`match-badge ${matchPercent >= 85 ? 'high' : matchPercent >= 65 ? 'medium' : 'low'}`}>
            {matchPercent}% Match
          </div>
        )}

        {/* Language Badge */}
        {showLanguage && langTag && (
          <div className="language-badge">{langTag}</div>
        )}

        {/* Rating Badge */}
        {rating && (
          <div className="rating-badge">
            {'\u2605'.repeat(rating)}
          </div>
        )}

        {/* Quick Rate on Hover */}
        {onRate && (
          <div className="quick-rate">
            {[2, 3, 4, 5].map(r => (
              <button
                key={r}
                className={`quick-rate-btn ${rating === r ? 'active' : ''}`}
                onClick={(e) => handleQuickRate(e, r)}
                title={r === 5 ? 'Love' : r === 4 ? 'Like' : r === 3 ? 'Meh' : 'Nah'}
              >
                {r === 5 ? '\u2764' : r === 4 ? '\uD83D\uDC4D' : r === 3 ? '\uD83D\uDE10' : '\uD83D\uDC4E'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="movie-info">
        <h4 className="movie-title">{movie.title}</h4>
        <div className="movie-meta">
          <span className="movie-year">{movie.year}</span>
          <span className="movie-rating-star">{'\u2605'} {movie.rating}</span>
        </div>
        <div className="movie-genres-mini">
          {movie.genres.slice(0, 2).map(g => (
            <span key={g} className="genre-mini">{g}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
