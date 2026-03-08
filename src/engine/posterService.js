// ============================================================
// Poster Service - Fetches movie poster images from Wikipedia
// Free, no API key required. Uses Wikipedia REST API.
// Caches results in localStorage for instant subsequent loads.
// Optimized for fast parallel loading with progressive rendering.
// ============================================================

const CACHE_KEY = 'binge-posters';
const CACHE_VERSION = 2;
const BATCH_SIZE = 10;  // Fetch 10 at a time for faster loading
const BATCH_DELAY = 50; // Minimal delay between batches (ms)

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
function upgradeThumbUrl(url, targetWidth = 400) {
  if (!url) return null;
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout per request

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;

    const data = await res.json();

    if (data.originalimage?.source) {
      const src = data.originalimage.source;
      if (src.includes('/thumb/')) {
        return upgradeThumbUrl(src, 400);
      }
      return src;
    }

    if (data.thumbnail?.source) {
      return upgradeThumbUrl(data.thumbnail.source, 400);
    }

    return null;
  } catch {
    clearTimeout(timeout);
    return null;
  }
}

// Preload an image into browser cache for instant rendering
function preloadImage(url) {
  return new Promise((resolve) => {
    if (!url) { resolve(); return; }
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = url;
  });
}

// Fetch posters for all movies with progressive loading
// Calls onProgress with partial results so UI can render as images arrive
export async function fetchAllPosters(movies, onProgress) {
  const cache = getCache();
  const results = {};
  const toFetch = [];

  // Step 1: Instantly return all cached posters
  for (const movie of movies) {
    if (!movie.wikiTitle) continue;
    const key = String(movie.id);
    if (cache[key] && cache[key] !== '_v') {
      results[key] = cache[key];
    } else {
      toFetch.push(movie);
    }
  }

  // Report cached results immediately
  if (Object.keys(results).length > 0 && onProgress) {
    onProgress(movies.length - toFetch.length, movies.length, results);
  }

  if (toFetch.length === 0) {
    return results;
  }

  // Step 2: Fetch uncached posters in larger parallel batches
  let completed = movies.length - toFetch.length;

  for (let i = 0; i < toFetch.length; i += BATCH_SIZE) {
    const batch = toFetch.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.allSettled(
      batch.map(async (movie) => {
        try {
          const posterUrl = await fetchSinglePoster(movie.wikiTitle);
          if (posterUrl) {
            results[String(movie.id)] = posterUrl;
            // Preload the image so it renders instantly when the component sees it
            preloadImage(posterUrl);
          }
        } catch {
          // Silently fail for individual movies
        }
        completed++;
      })
    );

    // Report progress with partial results after each batch
    if (onProgress) {
      onProgress(completed, movies.length, { ...results });
    }

    // Tiny delay between batches to avoid throttling
    if (i + BATCH_SIZE < toFetch.length) {
      await new Promise(r => setTimeout(r, BATCH_DELAY));
    }
  }

  // Save all results to cache
  saveCache({ ...cache, ...results });
  return results;
}

// Get a single cached poster URL
export function getCachedPoster(movieId) {
  const cache = getCache();
  return cache[String(movieId)] || null;
}
