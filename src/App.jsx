import { useState, useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { buildTasteProfile, getAllChannels, computeTasteDNA, getMoodRecs } from './engine/engine';
import { fetchAllPosters } from './engine/posterService';
import { checkForNewMovies, getDynamicMovies } from './engine/movieUpdater';
import { MOVIES, LANGUAGES } from './data/movies';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import MoodSelector from './components/MoodSelector';
import TasteDNA from './components/TasteDNA';
import Search from './components/Search';

const LANGUAGE_LABELS = {
  english: '🌍 English',
  tamil: '🎬 Tamil',
  hindi: '🎬 Hindi',
  telugu: '🎬 Telugu',
  malayalam: '🎬 Malayalam',
  kannada: '🎬 Kannada'
};

// SVG Logo Component
function BingeLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#logoGrad)" />
      {/* Film strip holes */}
      <rect x="4" y="6" width="5" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
      <rect x="4" y="14" width="5" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
      <rect x="4" y="22" width="5" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
      <rect x="4" y="30" width="5" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
      <rect x="4" y="38" width="5" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
      <rect x="39" y="6" width="5" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
      <rect x="39" y="14" width="5" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
      <rect x="39" y="22" width="5" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
      <rect x="39" y="30" width="5" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
      <rect x="39" y="38" width="5" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
      {/* Lens circle */}
      <circle cx="24" cy="24" r="11" stroke="white" strokeWidth="2.5" fill="none" />
      <circle cx="24" cy="24" r="6" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="2" fill="white" />
      {/* Lens flare */}
      <circle cx="20" cy="19" r="2" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

export default function App() {
  const [ratings, setRatings] = useLocalStorage('binge-ratings', {});
  const [hasOnboarded, setHasOnboarded] = useLocalStorage('binge-onboarded', false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [currentMood, setCurrentMood] = useState(null);
  const [posters, setPosters] = useState({});
  const [posterProgress, setPosterProgress] = useState(null);
  const [dynamicMovies, setDynamicMovies] = useState([]);
  const [newMovieCount, setNewMovieCount] = useState(0);
  const [filterLanguage, setFilterLanguage] = useState('');

  // Merge all movie sources: curated + regional (already in MOVIES) + dynamic
  const allMovies = [...MOVIES, ...dynamicMovies.filter(dm => !MOVIES.some(m => m.id === dm.id))];

  // Count movies per language
  const languageCounts = useMemo(() => {
    const counts = {};
    LANGUAGES.forEach(l => { counts[l] = allMovies.filter(m => m.language === l).length; });
    return counts;
  }, [allMovies]);

  // Check for new movie updates on mount
  useEffect(() => {
    const existingIds = MOVIES.map(m => m.id);
    checkForNewMovies(existingIds).then(({ newMovies }) => {
      const dynamic = getDynamicMovies();
      setDynamicMovies(dynamic);
      if (newMovies.length > 0) {
        setNewMovieCount(newMovies.length);
        // Auto-dismiss notification after 5s
        setTimeout(() => setNewMovieCount(0), 5000);
      }
    });
  }, []);

  // Fetch poster images on mount
  useEffect(() => {
    const moviesToFetch = allMovies.filter(m => m.wikiTitle);
    setPosterProgress({ done: 0, total: moviesToFetch.length });
    fetchAllPosters(moviesToFetch, (done, total) => {
      setPosterProgress({ done, total });
    }).then(result => {
      setPosters(prev => ({ ...prev, ...result }));
      setPosterProgress(null);
    });
  }, [dynamicMovies.length]);

  const tasteProfile = Object.keys(ratings).length > 0 ? buildTasteProfile(ratings) : null;
  const tasteDNA = tasteProfile ? computeTasteDNA(tasteProfile) : null;
  const rawChannels = tasteProfile ? getAllChannels(tasteProfile) : [];
  const rawMoodRecs = currentMood && tasteProfile ? getMoodRecs(currentMood, tasteProfile, 15) : [];

  // Apply language filter to channels and mood recs
  const channels = useMemo(() => {
    if (!filterLanguage) return rawChannels;
    return rawChannels
      .map(ch => ({
        ...ch,
        movies: ch.movies.filter(({ movie }) => movie.language === filterLanguage)
      }))
      .filter(ch => ch.movies.length > 0);
  }, [rawChannels, filterLanguage]);

  const moodRecs = useMemo(() => {
    if (!filterLanguage) return rawMoodRecs;
    return rawMoodRecs.filter(({ movie }) => movie.language === filterLanguage);
  }, [rawMoodRecs, filterLanguage]);

  const handleRate = useCallback((movieId, rating) => {
    setRatings(prev => {
      if (rating === 0) {
        const next = { ...prev };
        delete next[movieId];
        return next;
      }
      return { ...prev, [movieId]: rating };
    });
  }, [setRatings]);

  const handleOnboardingComplete = useCallback((onboardingRatings) => {
    setRatings(onboardingRatings);
    setHasOnboarded(true);
  }, [setRatings, setHasOnboarded]);

  const handleResetProfile = useCallback(() => {
    setRatings({});
    setHasOnboarded(false);
    setCurrentView('home');
    setCurrentMood(null);
  }, [setRatings, setHasOnboarded]);

  if (!hasOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} posters={posters} />;
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-brand" onClick={() => { setCurrentView('home'); setCurrentMood(null); }}>
          <BingeLogo size={36} />
          <span className="nav-title">BINGE</span>
        </div>
        <div className="nav-links">
          <button className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => { setCurrentView('home'); setCurrentMood(null); }}>Home</button>
          <button className={`nav-link ${currentView === 'mood' ? 'active' : ''}`} onClick={() => setCurrentView('mood')}>Mood</button>
          <button className={`nav-link ${currentView === 'dna' ? 'active' : ''}`} onClick={() => setCurrentView('dna')}>Taste DNA</button>
          <button className={`nav-link ${currentView === 'search' ? 'active' : ''}`} onClick={() => setCurrentView('search')}>Search</button>
        </div>
        <button className="nav-reset" onClick={handleResetProfile} title="Reset your taste profile">Reset</button>
      </nav>

      {/* Global Language Filter */}
      <div className="global-language-bar">
        <button
          className={`language-btn ${filterLanguage === '' ? 'active' : ''}`}
          onClick={() => setFilterLanguage('')}
        >
          🌐 All
        </button>
        {LANGUAGES.map(lang => (
          <button
            key={lang}
            className={`language-btn ${filterLanguage === lang ? 'active' : ''}`}
            onClick={() => setFilterLanguage(filterLanguage === lang ? '' : lang)}
          >
            {LANGUAGE_LABELS[lang]}
            {languageCounts[lang] > 0 && <span className="lang-count">{languageCounts[lang]}</span>}
          </button>
        ))}
      </div>

      {/* Poster loading indicator */}
      {posterProgress && (
        <div className="poster-loading-bar">
          <div className="poster-loading-fill" style={{ width: `${(posterProgress.done / posterProgress.total) * 100}%` }} />
        </div>
      )}

      {/* New movies notification */}
      {newMovieCount > 0 && (
        <div className="new-movies-toast" onClick={() => setNewMovieCount(0)}>
          🎬 {newMovieCount} new movie{newMovieCount > 1 ? 's' : ''} discovered! Check the Search tab.
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        {currentView === 'home' && (
          <Home channels={channels} ratings={ratings} onRate={handleRate} onSelectMovie={setSelectedMovie} posters={posters} />
        )}
        {currentView === 'mood' && (
          <MoodSelector currentMood={currentMood} onSelectMood={setCurrentMood} moodRecs={moodRecs} ratings={ratings} onRate={handleRate} onSelectMovie={setSelectedMovie} posters={posters} />
        )}
        {currentView === 'dna' && (
          <TasteDNA tasteDNA={tasteDNA} ratings={ratings} totalRated={Object.keys(ratings).length} />
        )}
        {currentView === 'search' && (
          <Search ratings={ratings} onRate={handleRate} onSelectMovie={setSelectedMovie} posters={posters} allMovies={allMovies} filterLanguage={filterLanguage} />
        )}
      </main>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetail movie={selectedMovie} rating={ratings[selectedMovie.id]} onRate={handleRate} onClose={() => setSelectedMovie(null)} tasteProfile={tasteProfile} posters={posters} />
      )}
    </div>
  );
}
