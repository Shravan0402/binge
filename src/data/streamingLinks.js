// ============================================================
// Streaming Links — Direct platform search URLs for every movie
// ============================================================

export const PLATFORMS = {
  netflix:    { name: 'Netflix',      color: '#E50914', icon: 'N' },
  prime:      { name: 'Prime Video',  color: '#00A8E1', icon: 'P' },
  apple:      { name: 'Apple TV+',    color: '#555555', icon: '' },
  hulu:       { name: 'Hulu',         color: '#1CE783', icon: 'H' },
  jiohotstar: { name: 'JioHotstar',   color: '#0F79AF', icon: 'J' },
};

function makeUrl(title, platform) {
  const encoded = encodeURIComponent(title);
  const urls = {
    netflix:    `https://www.netflix.com/search?q=${encoded}`,
    prime:      `https://www.amazon.com/s?k=${encoded}&i=instant-video`,
    apple:      `https://tv.apple.com/search?term=${encoded}`,
    hulu:       `https://www.hulu.com/search?q=${encoded}`,
    jiohotstar: `https://www.hotstar.com/in/search?q=${encoded}`,
  };
  return urls[platform];
}

// Movie ID -> platforms where the movie is likely available
const MOVIE_PLATFORMS = {
  // English (1-100)
  1: ['netflix','prime','apple'],           2: ['netflix','prime','apple'],
  3: ['netflix','prime','apple'],           4: ['netflix','prime','apple'],
  5: ['netflix','prime','apple'],           6: ['netflix','prime','apple','hulu'],
  7: ['netflix','prime','apple'],           8: ['netflix','prime','apple'],
  9: ['netflix','prime','apple'],           10: ['netflix','prime','apple','hulu'],
  11: ['netflix','prime','apple'],          12: ['netflix','prime','apple','hulu'],
  13: ['prime','apple'],                    14: ['netflix','prime','apple'],
  15: ['netflix','prime','apple'],          16: ['netflix','prime','apple'],
  17: ['netflix','prime','apple'],          18: ['netflix','prime','apple'],
  19: ['netflix','prime','apple','hulu'],   20: ['netflix','prime','apple','hulu'],
  21: ['netflix','prime','apple'],          22: ['netflix','prime','apple'],
  23: ['netflix','prime','apple'],          24: ['netflix','prime','apple','hulu'],
  25: ['netflix','prime','apple'],          26: ['netflix','prime','apple'],
  27: ['netflix','prime','apple'],          28: ['netflix','prime','apple'],
  29: ['netflix','prime','apple'],          30: ['netflix','prime','apple'],
  31: ['netflix','prime','apple'],          32: ['netflix','prime','apple','hulu'],
  33: ['netflix','prime','apple'],          34: ['netflix','prime','apple'],
  35: ['netflix','prime','apple'],          36: ['netflix','prime','apple'],
  37: ['prime','apple'],                    38: ['prime','apple'],
  39: ['prime','apple'],                    40: ['netflix','prime','apple','hulu'],
  41: ['netflix','prime','apple'],          42: ['netflix','prime','apple'],
  43: ['netflix','prime','apple'],          44: ['netflix','prime','apple','hulu'],
  45: ['prime','apple'],                    46: ['prime','apple'],
  47: ['prime','apple'],                    48: ['prime','apple'],
  49: ['prime','apple'],                    50: ['prime','apple'],
  51: ['netflix','prime','apple','hulu'],   52: ['netflix','prime','apple','hulu'],
  53: ['netflix','prime','apple','hulu'],   54: ['netflix','prime','apple','hulu'],
  55: ['netflix','prime','apple','hulu'],   56: ['netflix','prime','apple','hulu'],
  57: ['netflix','prime','apple','hulu'],   58: ['netflix','prime','apple'],
  59: ['netflix','prime','apple'],          60: ['netflix','prime','apple'],
  61: ['prime','apple'],                    62: ['prime','apple'],
  63: ['prime','apple'],                    64: ['prime','apple'],
  65: ['prime','apple'],                    66: ['prime','apple'],
  67: ['prime','apple'],                    68: ['prime','apple'],
  69: ['prime','apple'],                    70: ['prime','apple'],
  71: ['netflix','prime','apple'],          72: ['netflix','prime','apple'],
  73: ['netflix','prime','apple'],          74: ['netflix','prime','apple','hulu'],
  75: ['netflix','prime','apple'],          76: ['netflix','prime','apple'],
  77: ['netflix','prime','apple'],          78: ['netflix','prime','apple'],
  79: ['netflix','prime','apple','hulu'],   80: ['netflix','prime','apple','hulu'],
  81: ['prime','apple'],                    82: ['netflix','prime','apple'],
  83: ['prime','apple'],                    84: ['prime','apple'],
  85: ['netflix','prime','apple'],          86: ['netflix','prime','apple'],
  87: ['prime','apple'],                    88: ['prime','apple'],
  89: ['prime','apple'],                    90: ['prime','apple'],
  91: ['netflix','prime','apple'],          92: ['netflix','prime','apple'],
  93: ['netflix','prime','apple','hulu'],   94: ['netflix','prime','apple'],
  95: ['netflix','prime','apple'],          96: ['netflix','prime','apple','hulu'],
  97: ['netflix','prime','apple'],          98: ['netflix','prime','apple'],
  99: ['netflix','prime','apple'],          100: ['prime','apple'],
  // Tamil
  101: ['jiohotstar','prime','netflix'],    102: ['jiohotstar','prime'],
  103: ['jiohotstar','prime','netflix'],    104: ['jiohotstar','prime','netflix'],
  105: ['jiohotstar','prime'],              106: ['jiohotstar','prime','netflix'],
  107: ['jiohotstar','prime'],              108: ['jiohotstar','prime'],
  // Hindi
  111: ['jiohotstar','prime'],              112: ['jiohotstar','prime'],
  113: ['jiohotstar','prime','netflix'],    114: ['jiohotstar','prime','netflix'],
  115: ['jiohotstar','prime','netflix'],    116: ['jiohotstar','prime'],
  117: ['jiohotstar','prime'],              118: ['jiohotstar','prime'],
  119: ['jiohotstar','prime','netflix'],    120: ['jiohotstar','prime'],
  // Telugu
  131: ['jiohotstar','prime','netflix'],    132: ['jiohotstar','prime','netflix'],
  133: ['jiohotstar','prime'],              134: ['jiohotstar','prime'],
  135: ['jiohotstar','prime'],              136: ['jiohotstar','prime'],
  137: ['jiohotstar','prime'],              138: ['jiohotstar','prime','netflix'],
  // Malayalam
  151: ['jiohotstar','prime'],              152: ['jiohotstar','prime','netflix'],
  153: ['jiohotstar','prime'],              154: ['jiohotstar','prime'],
  155: ['jiohotstar','prime'],              156: ['jiohotstar','prime'],
  157: ['jiohotstar','prime'],              158: ['jiohotstar','prime','netflix'],
  // Kannada
  171: ['jiohotstar','prime','netflix'],    172: ['jiohotstar','prime','netflix'],
  173: ['jiohotstar','prime'],              174: ['jiohotstar','prime'],
  175: ['jiohotstar','prime'],              176: ['jiohotstar','prime'],
};

/**
 * Get streaming links for a movie
 * @param {number} movieId
 * @param {string} movieTitle
 * @returns {Array<{ key: string, name: string, url: string, color: string, icon: string }>}
 */
export function getStreamingLinks(movieId, movieTitle) {
  const platforms = MOVIE_PLATFORMS[movieId];
  if (!platforms || !movieTitle) return [];
  return platforms.map(key => {
    const meta = PLATFORMS[key];
    return {
      key,
      name: meta.name,
      url: makeUrl(movieTitle, key),
      color: meta.color,
      icon: meta.icon,
    };
  });
}
