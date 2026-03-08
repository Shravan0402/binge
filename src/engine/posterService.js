// ============================================================
// Poster Service - Fetches movie poster images from Wikipedia
// Free, no API key required. Uses Wikipedia REST API.
// Caches results in localStorage for instant subsequent loads.
// ============================================================

const CACHE_KEY = 'binge-posters';
const CACHE_VERSION = 2;

function getCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed._v !== CACHE_VERSION) return {};
    return parsed;
  } catch {
    return {};
  }
}

function saveCache(cache) {
  try {
    cache._v = CACHE_VERSION;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Failed to cache posters:', e);
  }
}

// Upgrade Wikipedia thumbnail URL to a larger size
function upgradeThumbUrl(url, targetWidth = 500) {
  if (!url) return null;
  // Wikipedia thumb URLs: .../thumb/.../NNNpx-Filename.ext
  // Change the NNNpx part to our target width
  const match = url.match(/\/(\d+)px-[^/]+$/);
  if (match) {
    return url.replace(/\/\d+px-/, `/${targetWidth}px-`);
  }
  return url;
}

// Fetch poster for a single movie from Wikipedia REST API
async function fetchSinglePoster(wikiTitle) {
  const encoded = encodeURIComponent(wikiTitle.replace(/ /g, '_'));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;

  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();

  // Prefer originalimage for best quality, fall back to thumbnail
  if (data.originalimage?.source) {
    // If it's a thumbnail URL, upgrade it; otherwise use as-is
    const src = data.originalimage.source;
    // Limit to reasonable size for movie poster
    if (src.includes('/thumb/')) {
      return upgradeThumbUrl(src, 500);
    }
    return src;
  }

  if (data.thumbnail?.source) {
    return upgradeThumbUrl(data.thumbnail.source, 500);
  }

  return null;
}

// Fetch posters for all movies, with caching
export async function fetchAllPosters(movies, onProgress) {
  const cache = getCache();
  const results = { ...cache };
  const toFetch = [];

  for (const movie of movies) {
    if (!movie.wikiTitle) continue;
    const key = String(movie.id);
    if (results[key] && results[key] !== '_v') {
      continue; // Already cached
    }
    toFetch.push(movie);
  }

  if (toFetch.length === 0) {
    return results;
  }

  // Fetch in batches of 5 to avoid overwhelming the API
  const batchSize = 5;
  let completed = 0;

  for (let i = 0; i < toFetch.length; i += batchSize) {
    const batch = toFetch.slice(i, i + batchSize);
    const promises = batch.map(async (movie) => {
      try {
        const posterUrl = await fetchSinglePoster(movie.wikiTitle);
        if (posterUrl) {
          results[String(movie.id)] = posterUrl;
        }
      } catch {
        // Silently fail for individual movies
      }
      completed++;
      if (onProgress) {
        onProgress(completed, toFetch.length);
      }
    });

    await Promise.allSettled(promises);
    // Small delay between batches
    if (i + batchSize < toFetch.length) {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  saveCache(results);
  return results;
}

// Get a single cached poster URL
export function getCachedPoster(movieId) {
  const cache = getCache();
  return cache[String(movieId)] || null;
}
