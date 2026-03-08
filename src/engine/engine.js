import { MOVIES, GENRES, MOODS } from '../data/movies';

// ============================================================
// CineMatch Recommendation Engine
// Multi-dimensional taste profiling with cosine similarity,
// diversity injection, exploration/exploitation balance,
// and contextual mood-based filtering.
// ============================================================

const FEATURE_KEYS = ['pacing', 'complexity', 'popularity', 'visualStyle', 'emotionalIntensity', 'dialogueDriven', 'artHouse', 'eraFeel'];

// Convert a movie into a numerical feature vector
function movieToVector(movie) {
  const vec = [];
  // Genre dimensions (one-hot)
  for (const g of GENRES) {
    vec.push(movie.genres.includes(g) ? 1 : 0);
  }
  // Mood dimensions (one-hot)
  for (const m of MOODS) {
    vec.push(movie.moods.includes(m) ? 1 : 0);
  }
  // Continuous features
  for (const key of FEATURE_KEYS) {
    vec.push(movie.features[key] || 0);
  }
  return vec;
}

// Cosine similarity between two vectors
function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// Weighted vector addition
function addVectors(a, b, weightB = 1) {
  return a.map((val, i) => val + (b[i] || 0) * weightB);
}

// Scale a vector
function scaleVector(v, scalar) {
  return v.map(val => val * scalar);
}

// Normalize a vector to unit length
function normalizeVector(v) {
  const mag = Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
  if (mag === 0) return v;
  return v.map(val => val / mag);
}

// Zero vector
function zeroVector() {
  return new Array(GENRES.length + MOODS.length + FEATURE_KEYS.length).fill(0);
}

// ============================================================
// Taste Profile
// ============================================================
export function buildTasteProfile(ratings) {
  // ratings: { movieId: rating } where rating is: 5=love, 4=like, 3=meh, 2=dislike, 1=hate
  const ratingWeights = { 5: 1.0, 4: 0.5, 3: 0.0, 2: -0.5, 1: -1.0 };

  let tasteVector = zeroVector();
  let totalWeight = 0;
  const lovedMovies = []; // movies rated 5
  const likedMovies = []; // movies rated 4+

  for (const [movieId, rating] of Object.entries(ratings)) {
    const movie = MOVIES.find(m => m.id === parseInt(movieId));
    if (!movie) continue;

    const weight = ratingWeights[rating] ?? 0;
    if (weight === 0) continue;

    const vec = movieToVector(movie);
    tasteVector = addVectors(tasteVector, vec, weight);
    totalWeight += Math.abs(weight);

    if (rating >= 5) lovedMovies.push(movie);
    if (rating >= 4) likedMovies.push(movie);
  }

  if (totalWeight > 0) {
    tasteVector = scaleVector(tasteVector, 1 / totalWeight);
  }

  return {
    vector: tasteVector,
    lovedMovies,
    likedMovies,
    ratedMovieIds: Object.keys(ratings).map(Number),
    ratings
  };
}

// ============================================================
// Compute Taste DNA (for radar chart visualization)
// ============================================================
export function computeTasteDNA(tasteProfile) {
  if (!tasteProfile || !tasteProfile.vector) return null;

  const vec = tasteProfile.vector;
  const genreStart = 0;
  const moodStart = GENRES.length;
  const featureStart = GENRES.length + MOODS.length;

  // Extract top genres
  const genreScores = GENRES.map((g, i) => ({
    name: g,
    value: Math.max(0, vec[genreStart + i])
  })).sort((a, b) => b.value - a.value);

  // Extract top moods
  const moodScores = MOODS.map((m, i) => ({
    name: m,
    value: Math.max(0, vec[moodStart + i])
  })).sort((a, b) => b.value - a.value);

  // Extract feature preferences
  const featureScores = FEATURE_KEYS.map((f, i) => ({
    name: f,
    value: vec[featureStart + i]
  }));

  // Build radar chart data (top genres + key features)
  const radarData = [
    ...genreScores.slice(0, 6).map(g => ({
      label: g.name.charAt(0).toUpperCase() + g.name.slice(1),
      value: Math.min(1, Math.max(0, g.value))
    })),
    ...featureScores.filter(f => ['pacing', 'complexity', 'emotionalIntensity', 'visualStyle'].includes(f.name)).map(f => ({
      label: f.name === 'emotionalIntensity' ? 'Intensity' : f.name === 'visualStyle' ? 'Visual' : f.name.charAt(0).toUpperCase() + f.name.slice(1),
      value: Math.min(1, Math.max(0, f.value))
    }))
  ];

  return {
    topGenres: genreScores.slice(0, 5),
    topMoods: moodScores.slice(0, 5),
    features: featureScores,
    radarData
  };
}

// ============================================================
// Main Recommendation Engine
// ============================================================
export function getRecommendations(tasteProfile, options = {}) {
  const {
    limit = 20,
    excludeIds = [],
    boostDiversity = true,
    explorationRate = 0.15
  } = options;

  const allExcluded = new Set([...tasteProfile.ratedMovieIds, ...excludeIds]);
  const candidates = MOVIES.filter(m => !allExcluded.has(m.id));

  if (candidates.length === 0) return [];

  // Score each candidate
  const scored = candidates.map(movie => {
    const movieVec = movieToVector(movie);

    // 1. Taste similarity (main signal)
    const tasteSim = cosineSimilarity(tasteProfile.vector, movieVec);

    // 2. Specific movie similarity (find movies similar to ones you loved)
    let specificBonus = 0;
    if (tasteProfile.lovedMovies.length > 0) {
      const specificScores = tasteProfile.lovedMovies.map(loved =>
        cosineSimilarity(movieToVector(loved), movieVec)
      );
      specificBonus = Math.max(...specificScores) * 0.3;
    }

    // 3. Quality weight
    const qualityWeight = (movie.rating / 10) * 0.15;

    // 4. Exploration bonus (reward movies outside comfort zone)
    const exploration = (1 - Math.max(0, tasteSim)) * explorationRate * Math.random();

    const baseScore = tasteSim * 0.55 + specificBonus + qualityWeight + exploration;

    return {
      movie,
      score: baseScore,
      tasteSimilarity: tasteSim,
      specificBonus,
      exploration: exploration > 0.05
    };
  });

  // Sort by score
  scored.sort((a, b) => b.score - a.score);

  // Apply diversity injection if enabled
  if (boostDiversity && scored.length > limit) {
    return diversifyResults(scored, limit);
  }

  return scored.slice(0, limit);
}

// Ensure genre diversity in results
function diversifyResults(scored, limit) {
  const result = [];
  const genreCounts = {};
  const maxPerGenre = Math.ceil(limit / 4);

  for (const item of scored) {
    if (result.length >= limit) break;

    const primaryGenre = item.movie.genres[0];
    const count = genreCounts[primaryGenre] || 0;

    if (count < maxPerGenre) {
      result.push(item);
      genreCounts[primaryGenre] = count + 1;
    }
  }

  // Fill remaining slots if diversity filter was too aggressive
  if (result.length < limit) {
    const resultIds = new Set(result.map(r => r.movie.id));
    for (const item of scored) {
      if (result.length >= limit) break;
      if (!resultIds.has(item.movie.id)) {
        result.push(item);
      }
    }
  }

  return result;
}

// ============================================================
// Channel-specific Recommendations
// ============================================================

// "Because You Loved [Movie]" - movies similar to a specific rated movie
export function getSimilarToMovie(movieId, tasteProfile, limit = 8) {
  const sourceMovie = MOVIES.find(m => m.id === movieId);
  if (!sourceMovie) return [];

  const sourceVec = movieToVector(sourceMovie);
  const excluded = new Set(tasteProfile.ratedMovieIds);

  const scored = MOVIES
    .filter(m => m.id !== movieId && !excluded.has(m.id))
    .map(movie => {
      const sim = cosineSimilarity(sourceVec, movieToVector(movie));
      // Also factor in taste alignment
      const tasteAlign = cosineSimilarity(tasteProfile.vector, movieToVector(movie));
      return {
        movie,
        score: sim * 0.7 + tasteAlign * 0.3,
        tasteSimilarity: tasteAlign
      };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

// "Hidden Gems" - high taste match but low popularity
export function getHiddenGems(tasteProfile, limit = 10) {
  const excluded = new Set(tasteProfile.ratedMovieIds);

  const scored = MOVIES
    .filter(m => !excluded.has(m.id) && m.features.popularity < 0.75)
    .map(movie => {
      const tasteSim = cosineSimilarity(tasteProfile.vector, movieToVector(movie));
      const gemScore = tasteSim * (1 - movie.features.popularity) * (movie.rating / 10);
      return {
        movie,
        score: gemScore,
        tasteSimilarity: tasteSim,
        isGem: true
      };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

// "Expand Your Taste" - high quality movies just outside comfort zone
export function getDiscoveryRecs(tasteProfile, limit = 10) {
  const excluded = new Set(tasteProfile.ratedMovieIds);

  const scored = MOVIES
    .filter(m => !excluded.has(m.id))
    .map(movie => {
      const tasteSim = cosineSimilarity(tasteProfile.vector, movieToVector(movie));
      // Sweet spot: moderate similarity (0.3-0.6) with high quality
      const discoverability = 1 - Math.abs(tasteSim - 0.45) * 2;
      const qualityBoost = movie.rating / 10;
      return {
        movie,
        score: discoverability * 0.6 + qualityBoost * 0.4,
        tasteSimilarity: tasteSim,
        exploration: true
      };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

// "Mood: X" - recommendations filtered by mood
export function getMoodRecs(mood, tasteProfile, limit = 12) {
  const excluded = new Set(tasteProfile.ratedMovieIds);

  const scored = MOVIES
    .filter(m => !excluded.has(m.id) && m.moods.includes(mood))
    .map(movie => {
      const tasteSim = cosineSimilarity(tasteProfile.vector, movieToVector(movie));
      // Boost movies where the mood is strong (appears first in moods list)
      const moodStrength = 1 - (movie.moods.indexOf(mood) / movie.moods.length) * 0.3;
      return {
        movie,
        score: tasteSim * 0.65 + (movie.rating / 10) * 0.2 + moodStrength * 0.15,
        tasteSimilarity: tasteSim
      };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

// "Because You Loved" - build chains from all loved movies
export function getBecauseYouLoved(tasteProfile, limit = 3) {
  const chains = [];
  const usedMovies = new Set(tasteProfile.ratedMovieIds);

  const sourceMovies = tasteProfile.lovedMovies.length > 0
    ? tasteProfile.lovedMovies
    : tasteProfile.likedMovies;

  // Pick up to `limit` source movies
  const sources = sourceMovies.slice(0, limit);

  for (const source of sources) {
    const sourceVec = movieToVector(source);

    const similar = MOVIES
      .filter(m => !usedMovies.has(m.id))
      .map(movie => ({
        movie,
        score: cosineSimilarity(sourceVec, movieToVector(movie)),
        tasteSimilarity: cosineSimilarity(tasteProfile.vector, movieToVector(movie))
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    // Mark these movies as used so chains don't overlap
    similar.forEach(s => usedMovies.add(s.movie.id));

    chains.push({
      sourceMovie: source,
      recommendations: similar
    });
  }

  return chains;
}

// "Director's Cut" - movies from directors similar to ones you enjoyed
export function getDirectorRecs(tasteProfile, limit = 8) {
  const excluded = new Set(tasteProfile.ratedMovieIds);
  const likedDirectors = new Set(
    [...tasteProfile.lovedMovies, ...tasteProfile.likedMovies].map(m => m.director)
  );

  if (likedDirectors.size === 0) return [];

  const directorMovies = MOVIES
    .filter(m => !excluded.has(m.id) && likedDirectors.has(m.director))
    .map(movie => ({
      movie,
      score: cosineSimilarity(tasteProfile.vector, movieToVector(movie)) + 0.2,
      tasteSimilarity: cosineSimilarity(tasteProfile.vector, movieToVector(movie))
    }))
    .sort((a, b) => b.score - a.score);

  return directorMovies.slice(0, limit);
}

// Search movies by query
export function searchMovies(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return MOVIES
    .filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q) ||
      m.cast.some(c => c.toLowerCase().includes(q)) ||
      m.genres.some(g => g.includes(q)) ||
      m.themes.some(t => t.includes(q))
    )
    .slice(0, 20);
}

// Get all recommendation channels for the home page
export function getAllChannels(tasteProfile) {
  const channels = [];

  // 1. Perfect For You (main recommendations)
  const mainRecs = getRecommendations(tasteProfile, { limit: 15 });
  if (mainRecs.length > 0) {
    channels.push({
      id: 'perfect',
      title: 'Perfect For You',
      subtitle: 'Handpicked based on your unique taste',
      icon: '\u2728',
      movies: mainRecs
    });
  }

  // 2. Because You Loved chains
  const chains = getBecauseYouLoved(tasteProfile, 2);
  for (const chain of chains) {
    channels.push({
      id: `because-${chain.sourceMovie.id}`,
      title: `Because You Loved "${chain.sourceMovie.title}"`,
      subtitle: `Movies with a similar vibe`,
      icon: '\u2764\uFE0F',
      movies: chain.recommendations
    });
  }

  // 3. Hidden Gems
  const gems = getHiddenGems(tasteProfile);
  if (gems.length > 0) {
    channels.push({
      id: 'gems',
      title: 'Hidden Gems',
      subtitle: "Under-the-radar films you'll love",
      icon: '\uD83D\uDC8E',
      movies: gems
    });
  }

  // 4. Expand Your Taste
  const discovery = getDiscoveryRecs(tasteProfile);
  if (discovery.length > 0) {
    channels.push({
      id: 'discover',
      title: 'Expand Your Taste',
      subtitle: 'Venture into new territory',
      icon: '\uD83C\uDF0D',
      movies: discovery
    });
  }

  // 5. Director's Cut
  const directorRecs = getDirectorRecs(tasteProfile);
  if (directorRecs.length > 4) {
    channels.push({
      id: 'directors',
      title: "Director's Cut",
      subtitle: 'More from filmmakers you enjoy',
      icon: '\uD83C\uDFAC',
      movies: directorRecs
    });
  }

  return channels;
}

// Get match percentage for display
export function getMatchPercentage(tasteSimilarity) {
  return Math.round(Math.max(0, Math.min(100, (tasteSimilarity + 0.3) * 77)));
}
