import { useState } from 'react';
import { getOnboardingMovies } from '../data/movies';
import MovieCard from './MovieCard';

const RATING_LABELS = {
  5: 'Love it',
  4: 'Like it',
  3: 'Meh',
  2: 'Not for me',
  0: 'Skip'
};

export default function Onboarding({ onComplete, posters }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState({});
  const movies = getOnboardingMovies();
  const currentMovie = movies[currentIndex];
  const ratedCount = Object.values(ratings).filter(r => r > 0).length;
  const minRequired = 5;

  const handleRate = (rating) => {
    const newRatings = { ...ratings };
    if (rating === 0) {
      // Skip
    } else {
      newRatings[currentMovie.id] = rating;
    }
    setRatings(newRatings);
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const canFinish = ratedCount >= minRequired;

  return (
    <div className="onboarding">
      <div className="onboarding-bg" />
      <div className="onboarding-content">
        {/* Header */}
        <div className="onboarding-header">
          <h1 className="onboarding-title">BINGE</h1>
          <p className="onboarding-subtitle">
            Rate a few movies so we can learn your taste
          </p>
        </div>

        {/* Progress */}
        <div className="onboarding-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentIndex / movies.length) * 100}%` }} />
          </div>
          <div className="progress-text">
            {currentIndex + 1} / {movies.length}
            {ratedCount > 0 && <span className="rated-count"> &middot; {ratedCount} rated</span>}
          </div>
        </div>

        {/* Movie Card */}
        <div className="onboarding-movie">
          <div className="onboarding-card-wrapper">
            <MovieCard
              movie={currentMovie}
              size="large"
              rating={ratings[currentMovie.id]}
              posterUrl={posters?.[currentMovie.id]}
            />
          </div>

          <div className="onboarding-info">
            <h2 className="onboarding-movie-title">{currentMovie.title}</h2>
            <p className="onboarding-movie-meta">
              {currentMovie.year} &middot; {currentMovie.director} &middot; {currentMovie.runtime}min
            </p>
            <p className="onboarding-movie-overview">{currentMovie.overview}</p>
            <div className="onboarding-genres">
              {currentMovie.genres.map(g => (
                <span key={g} className="genre-tag">{g}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Rating Buttons */}
        <div className="onboarding-actions">
          {[5, 4, 3, 2].map(r => (
            <button
              key={r}
              className={`rate-btn rate-btn-${r} ${ratings[currentMovie.id] === r ? 'active' : ''}`}
              onClick={() => handleRate(r)}
            >
              <span className="rate-stars">
                {r === 5 && '\u2605\u2605\u2605\u2605\u2605'}
                {r === 4 && '\u2605\u2605\u2605\u2605'}
                {r === 3 && '\u2605\u2605\u2605'}
                {r === 2 && '\u2605\u2605'}
              </span>
              <span className="rate-label">{RATING_LABELS[r]}</span>
            </button>
          ))}
          <button className="rate-btn rate-btn-skip" onClick={() => handleRate(0)}>
            Haven't seen it
          </button>
        </div>

        {/* Navigation */}
        <div className="onboarding-nav">
          {currentIndex > 0 && (
            <button className="onboarding-back" onClick={() => setCurrentIndex(currentIndex - 1)}>Back</button>
          )}
          <div style={{ flex: 1 }} />
          {canFinish && (
            <button className="onboarding-finish" onClick={() => onComplete(ratings)}>
              Start Discovering ({ratedCount} rated)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
