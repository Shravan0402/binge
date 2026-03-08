import { MOODS } from '../data/movies';
import MovieCard from './MovieCard';
import { getMatchPercentage } from '../engine/engine';

const MOOD_CONFIG = {
  uplifting:    { emoji: '\u2600\uFE0F', color: '#fbbf24', desc: 'Feel-good vibes' },
  dark:         { emoji: '\uD83C\uDF11', color: '#6366f1', desc: 'Into the shadows' },
  tense:        { emoji: '\uD83D\uDE30', color: '#ef4444', desc: 'Edge of your seat' },
  funny:        { emoji: '\uD83D\uDE02', color: '#f59e0b', desc: 'LOL guaranteed' },
  thoughtful:   { emoji: '\uD83E\uDD14', color: '#8b5cf6', desc: 'Mind-expanding' },
  heartwarming: { emoji: '\uD83E\uDD79', color: '#ec4899', desc: 'Warm fuzzy feelings' },
  disturbing:   { emoji: '\uD83D\uDE28', color: '#991b1b', desc: 'Unsettling & bold' },
  whimsical:    { emoji: '\u2728', color: '#a78bfa', desc: 'Playful & magical' },
  melancholic:  { emoji: '\uD83C\uDF27\uFE0F', color: '#6b7280', desc: 'Beautiful sadness' },
  exciting:     { emoji: '\uD83D\uDD25', color: '#f97316', desc: 'Adrenaline rush' },
  romantic:     { emoji: '\uD83D\uDC96', color: '#f472b6', desc: 'Love is in the air' },
  mysterious:   { emoji: '\uD83D\uDD0D', color: '#7c3aed', desc: 'What lies beneath' },
  nostalgic:    { emoji: '\uD83D\uDCFC', color: '#d97706', desc: 'Trip down memory lane' },
  inspiring:    { emoji: '\uD83C\uDF1F', color: '#10b981', desc: 'Light the fire within' }
};

export default function MoodSelector({ currentMood, onSelectMood, moodRecs, ratings, onRate, onSelectMovie, posters }) {
  return (
    <div className="mood-page">
      <div className="mood-header">
        <h1 className="mood-page-title">WHAT'S YOUR MOOD?</h1>
        <p className="mood-page-subtitle">Pick a vibe and we'll find the perfect movies</p>
      </div>

      <div className="mood-grid">
        {MOODS.map(mood => {
          const config = MOOD_CONFIG[mood];
          const isActive = currentMood === mood;
          return (
            <button
              key={mood}
              className={`mood-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectMood(isActive ? null : mood)}
              style={{ '--mood-color': config.color, borderColor: isActive ? config.color : 'transparent' }}
            >
              <span className="mood-emoji">{config.emoji}</span>
              <span className="mood-name">{mood}</span>
              <span className="mood-desc">{config.desc}</span>
            </button>
          );
        })}
      </div>

      {currentMood && moodRecs.length > 0 && (
        <div className="mood-results">
          <h2 className="mood-results-title">
            {MOOD_CONFIG[currentMood]?.emoji} {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} picks for you
          </h2>
          <div className="mood-results-grid">
            {moodRecs.map(({ movie, tasteSimilarity }) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                rating={ratings[movie.id]}
                matchPercent={getMatchPercentage(tasteSimilarity)}
                onRate={onRate}
                onClick={() => onSelectMovie(movie)}
                posterUrl={posters?.[movie.id]}
              />
            ))}
          </div>
        </div>
      )}

      {currentMood && moodRecs.length === 0 && (
        <div className="empty-state"><p>No unrated movies match this mood. Try rating more movies!</p></div>
      )}
    </div>
  );
}
