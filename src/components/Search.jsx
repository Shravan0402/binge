import { useState, useMemo } from 'react';
import { MOVIES } from '../data/movies';
import MovieCard from './MovieCard';

export default function Search({ ratings, onRate, onSelectMovie, posters, allMovies, filterLanguage }) {
  const [query, setQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('');

  // Use allMovies (curated + regional + dynamic) if available, else fallback
  const moviePool = allMovies || MOVIES;

  const results = useMemo(() => {
    let pool = moviePool;

    // Apply global language filter
    if (filterLanguage) {
      pool = pool.filter(m => m.language === filterLanguage);
    }

    // Search query
    if (query.length > 0) {
      const q = query.toLowerCase().trim();
      return pool.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some(c => c.toLowerCase().includes(q)) ||
        m.genres.some(g => g.includes(q)) ||
        m.themes.some(t => t.includes(q)) ||
        (m.language && m.language.includes(q))
      ).slice(0, 50);
    }

    // Genre filter
    if (filterGenre) {
      return pool.filter(m => m.genres.includes(filterGenre)).sort((a, b) => b.rating - a.rating);
    }

    // Default: sort by rating
    return pool.slice().sort((a, b) => b.rating - a.rating);
  }, [query, filterGenre, filterLanguage, moviePool]);

  const genres = ['action', 'comedy', 'drama', 'horror', 'scifi', 'romance', 'thriller', 'animation', 'fantasy', 'crime', 'adventure', 'war', 'mystery'];

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">EXPLORE</h1>
        <div className="search-input-wrapper">
          <span className="search-icon">&#x1F50D;</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search movies, directors, actors..."
            value={query}
            onChange={e => { setQuery(e.target.value); setFilterGenre(''); }}
            autoFocus
          />
          {query && <button className="search-clear" onClick={() => setQuery('')}>&times;</button>}
        </div>
      </div>

      {/* Genre Filter */}
      {!query && (
        <div className="search-filters">
          <button className={`filter-btn ${filterGenre === '' ? 'active' : ''}`} onClick={() => setFilterGenre('')}>All</button>
          {genres.map(g => (
            <button key={g} className={`filter-btn ${filterGenre === g ? 'active' : ''}`} onClick={() => setFilterGenre(g)}>{g}</button>
          ))}
        </div>
      )}

      {/* Active filters summary */}
      {filterGenre && !query && (
        <div className="active-filters-summary">
          <span className="active-filter-tag">Genre: {filterGenre} <button onClick={() => setFilterGenre('')}>&times;</button></span>
          <button className="clear-all-filters" onClick={() => setFilterGenre('')}>Clear</button>
        </div>
      )}

      <div className="search-results">
        <p className="search-count">{results.length} movies{filterLanguage ? ` in ${filterLanguage}` : ''}</p>
        <div className="search-grid">
          {results.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              rating={ratings[movie.id]}
              onRate={onRate}
              onClick={() => onSelectMovie(movie)}
              posterUrl={posters?.[movie.id]}
              showLanguage={!filterLanguage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
