// ============================================================
// CineMatch Movie Updater
// Self-updating movie database mechanism for discovering new films.
//
// HOW IT WORKS:
// This module contains a curated catalog of ~30 recent (2022-2024)
// movies that are not in the main database. On each app load (if
// more than 24 hours have passed), it "discovers" a batch of new
// movies from this catalog and stores them in localStorage. These
// dynamic movies are merged with the curated database at runtime
// without overwriting any existing entries.
//
// The module also provides a complete framework for integrating
// with TMDB (The Movie Database) API -- see the TMDB INTEGRATION
// section at the bottom of this file for instructions.
// ============================================================

// ---- Constants ----

const STORAGE_KEY = 'binge_dynamic_movies';
const LAST_UPDATED_KEY = 'binge_last_movie_update';
const DISCOVERED_INDEX_KEY = 'binge_discovered_index';
const UPDATE_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours
const BATCH_SIZE = 5; // Movies discovered per update cycle

// ---- TMDB Genre ID to CineMatch Genre Mapping ----

const TMDB_GENRE_MAP = {
  28: 'action',
  12: 'adventure',
  16: 'animation',
  35: 'comedy',
  80: 'crime',
  99: 'documentary',
  18: 'drama',
  10751: 'family',
  14: 'fantasy',
  36: 'drama',       // History -> drama (closest match)
  27: 'horror',
  10402: 'musical',
  9648: 'mystery',
  10749: 'romance',
  878: 'scifi',
  10770: 'drama',    // TV Movie -> drama
  53: 'thriller',
  10752: 'war',
  37: 'western'
};

// ---- Genre to Mood Inference ----
// Maps genre combinations to likely moods. When a movie has multiple
// genres, the moods from each genre are merged and deduplicated.

const GENRE_MOOD_MAP = {
  action:      ['exciting', 'tense'],
  comedy:      ['funny', 'uplifting'],
  drama:       ['thoughtful', 'melancholic'],
  horror:      ['dark', 'disturbing', 'tense'],
  scifi:       ['mysterious', 'thoughtful'],
  romance:     ['romantic', 'heartwarming'],
  thriller:    ['tense', 'dark', 'mysterious'],
  animation:   ['whimsical', 'uplifting'],
  documentary: ['thoughtful', 'inspiring'],
  fantasy:     ['whimsical', 'exciting'],
  mystery:     ['mysterious', 'tense'],
  crime:       ['dark', 'tense'],
  adventure:   ['exciting', 'uplifting'],
  family:      ['heartwarming', 'funny', 'uplifting'],
  war:         ['dark', 'tense', 'melancholic'],
  musical:     ['uplifting', 'romantic'],
  western:     ['tense', 'nostalgic'],
  noir:        ['dark', 'mysterious', 'melancholic']
};

/**
 * Infer moods from a list of genres using the GENRE_MOOD_MAP.
 * Returns a deduplicated array of mood strings.
 */
function inferMoods(genres) {
  const moodSet = new Set();
  for (const genre of genres) {
    const moods = GENRE_MOOD_MAP[genre];
    if (moods) {
      moods.forEach(m => moodSet.add(m));
    }
  }
  return [...moodSet];
}

// ---- Genre to Feature Vector Inference ----
// Each genre contributes partial feature values. When a movie has
// multiple genres, the features are averaged across all matching genres.

const GENRE_FEATURE_MAP = {
  action:      { pacing: 0.85, complexity: 0.35, popularity: 0.85, visualStyle: 0.7, emotionalIntensity: 0.75, dialogueDriven: 0.25, artHouse: 0.1, eraFeel: 0.8 },
  comedy:      { pacing: 0.7,  complexity: 0.3,  popularity: 0.8,  visualStyle: 0.3, emotionalIntensity: 0.4,  dialogueDriven: 0.8,  artHouse: 0.15, eraFeel: 0.7 },
  drama:       { pacing: 0.45, complexity: 0.65, popularity: 0.7,  visualStyle: 0.5, emotionalIntensity: 0.75, dialogueDriven: 0.7,  artHouse: 0.4,  eraFeel: 0.7 },
  horror:      { pacing: 0.6,  complexity: 0.4,  popularity: 0.7,  visualStyle: 0.65, emotionalIntensity: 0.85, dialogueDriven: 0.3,  artHouse: 0.25, eraFeel: 0.75 },
  scifi:       { pacing: 0.6,  complexity: 0.7,  popularity: 0.75, visualStyle: 0.8, emotionalIntensity: 0.6,  dialogueDriven: 0.45, artHouse: 0.35, eraFeel: 0.85 },
  romance:     { pacing: 0.45, complexity: 0.4,  popularity: 0.75, visualStyle: 0.5, emotionalIntensity: 0.7,  dialogueDriven: 0.8,  artHouse: 0.3,  eraFeel: 0.7 },
  thriller:    { pacing: 0.75, complexity: 0.6,  popularity: 0.8,  visualStyle: 0.55, emotionalIntensity: 0.8,  dialogueDriven: 0.5,  artHouse: 0.2,  eraFeel: 0.8 },
  animation:   { pacing: 0.65, complexity: 0.4,  popularity: 0.8,  visualStyle: 0.9, emotionalIntensity: 0.55, dialogueDriven: 0.5,  artHouse: 0.3,  eraFeel: 0.75 },
  documentary: { pacing: 0.35, complexity: 0.6,  popularity: 0.5,  visualStyle: 0.4, emotionalIntensity: 0.5,  dialogueDriven: 0.6,  artHouse: 0.6,  eraFeel: 0.8 },
  fantasy:     { pacing: 0.6,  complexity: 0.55, popularity: 0.8,  visualStyle: 0.85, emotionalIntensity: 0.6,  dialogueDriven: 0.4,  artHouse: 0.25, eraFeel: 0.65 },
  mystery:     { pacing: 0.5,  complexity: 0.75, popularity: 0.7,  visualStyle: 0.5, emotionalIntensity: 0.65, dialogueDriven: 0.65, artHouse: 0.35, eraFeel: 0.7 },
  crime:       { pacing: 0.65, complexity: 0.6,  popularity: 0.8,  visualStyle: 0.5, emotionalIntensity: 0.75, dialogueDriven: 0.6,  artHouse: 0.2,  eraFeel: 0.75 },
  adventure:   { pacing: 0.75, complexity: 0.4,  popularity: 0.85, visualStyle: 0.75, emotionalIntensity: 0.6,  dialogueDriven: 0.35, artHouse: 0.1,  eraFeel: 0.75 },
  family:      { pacing: 0.6,  complexity: 0.25, popularity: 0.85, visualStyle: 0.6, emotionalIntensity: 0.45, dialogueDriven: 0.5,  artHouse: 0.05, eraFeel: 0.7 },
  war:         { pacing: 0.55, complexity: 0.6,  popularity: 0.65, visualStyle: 0.6, emotionalIntensity: 0.9,  dialogueDriven: 0.45, artHouse: 0.35, eraFeel: 0.5 },
  musical:     { pacing: 0.65, complexity: 0.3,  popularity: 0.7,  visualStyle: 0.7, emotionalIntensity: 0.55, dialogueDriven: 0.45, artHouse: 0.25, eraFeel: 0.6 },
  western:     { pacing: 0.5,  complexity: 0.4,  popularity: 0.55, visualStyle: 0.6, emotionalIntensity: 0.65, dialogueDriven: 0.5,  artHouse: 0.3,  eraFeel: 0.3 },
  noir:        { pacing: 0.5,  complexity: 0.65, popularity: 0.5,  visualStyle: 0.7, emotionalIntensity: 0.7,  dialogueDriven: 0.7,  artHouse: 0.55, eraFeel: 0.25 }
};

/**
 * Infer approximate feature values from a list of genres.
 * Averages the feature contributions of each genre, then rounds
 * to two decimal places for cleanliness.
 */
function inferFeatures(genres) {
  const keys = ['pacing', 'complexity', 'popularity', 'visualStyle', 'emotionalIntensity', 'dialogueDriven', 'artHouse', 'eraFeel'];
  const sums = {};
  let count = 0;

  keys.forEach(k => { sums[k] = 0; });

  for (const genre of genres) {
    const feat = GENRE_FEATURE_MAP[genre];
    if (feat) {
      keys.forEach(k => { sums[k] += feat[k]; });
      count++;
    }
  }

  if (count === 0) {
    // Fallback to neutral mid-range values
    const result = {};
    keys.forEach(k => { result[k] = 0.5; });
    return result;
  }

  const result = {};
  keys.forEach(k => {
    result[k] = Math.round((sums[k] / count) * 100) / 100;
  });
  return result;
}

// ---- Discoverable Movies Catalog ----
// These ~30 recent films span English and Indian regional languages.
// They are revealed in batches over time to simulate periodic discovery.
// IDs start at 201 to avoid collision with the main curated database (1-100).

const DISCOVERABLE_MOVIES = [
  // ---- English (2023-2024) ----
  {
    id: 201,
    title: "Oppenheimer",
    year: 2023,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
    genres: ["drama", "thriller"],
    moods: ["dark", "tense", "thoughtful"],
    themes: ["science", "morality", "power", "guilt", "war"],
    rating: 8.5,
    runtime: 180,
    overview: "The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, and the devastating moral consequences that followed.",
    language: "english",
    features: { pacing: 0.55, complexity: 0.85, popularity: 0.95, visualStyle: 0.8, emotionalIntensity: 0.9, dialogueDriven: 0.75, artHouse: 0.35, eraFeel: 0.9 }
  },
  {
    id: 202,
    title: "Killers of the Flower Moon",
    year: 2023,
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Robert De Niro", "Lily Gladstone"],
    genres: ["crime", "drama", "thriller"],
    moods: ["dark", "tense", "melancholic", "thoughtful"],
    themes: ["greed", "betrayal", "injustice", "colonialism", "love"],
    rating: 7.8,
    runtime: 206,
    overview: "Members of the Osage Nation are murdered one by one in 1920s Oklahoma after oil is discovered on their land, sparking a major FBI investigation.",
    language: "english",
    features: { pacing: 0.35, complexity: 0.8, popularity: 0.85, visualStyle: 0.7, emotionalIntensity: 0.85, dialogueDriven: 0.7, artHouse: 0.4, eraFeel: 0.5 }
  },
  {
    id: 203,
    title: "Past Lives",
    year: 2023,
    director: "Celine Song",
    cast: ["Greta Lee", "Teo Yoo", "John Magaro"],
    genres: ["drama", "romance"],
    moods: ["melancholic", "romantic", "thoughtful", "nostalgic"],
    themes: ["fate", "identity", "immigration", "love", "memory"],
    rating: 7.8,
    runtime: 106,
    overview: "Two childhood friends from South Korea are separated after one family emigrates to Canada. Twenty years later, they reunite in New York for one fateful week.",
    language: "english",
    features: { pacing: 0.3, complexity: 0.6, popularity: 0.7, visualStyle: 0.5, emotionalIntensity: 0.8, dialogueDriven: 0.85, artHouse: 0.65, eraFeel: 0.95 }
  },
  {
    id: 204,
    title: "Poor Things",
    year: 2023,
    director: "Yorgos Lanthimos",
    cast: ["Emma Stone", "Mark Ruffalo", "Willem Dafoe"],
    genres: ["comedy", "drama", "fantasy"],
    moods: ["whimsical", "funny", "thoughtful"],
    themes: ["freedom", "identity", "feminism", "discovery", "society"],
    rating: 8.0,
    runtime: 141,
    overview: "A young woman brought back to life by a brilliant scientist embarks on a journey of self-discovery across continents, defying the prejudices of her time.",
    language: "english",
    features: { pacing: 0.55, complexity: 0.7, popularity: 0.8, visualStyle: 0.95, emotionalIntensity: 0.6, dialogueDriven: 0.6, artHouse: 0.7, eraFeel: 0.85 }
  },
  {
    id: 205,
    title: "The Holdovers",
    year: 2023,
    director: "Alexander Payne",
    cast: ["Paul Giamatti", "Da'Vine Joy Randolph", "Dominic Sessa"],
    genres: ["comedy", "drama"],
    moods: ["heartwarming", "funny", "melancholic", "nostalgic"],
    themes: ["loneliness", "connection", "class", "grief", "mentorship"],
    rating: 7.9,
    runtime: 133,
    overview: "During Christmas break at a New England boarding school in 1970, a cranky teacher is forced to stay on campus with a troubled student and the school cook.",
    language: "english",
    features: { pacing: 0.35, complexity: 0.45, popularity: 0.75, visualStyle: 0.4, emotionalIntensity: 0.65, dialogueDriven: 0.85, artHouse: 0.45, eraFeel: 0.35 }
  },
  {
    id: 206,
    title: "Dune: Part Two",
    year: 2024,
    director: "Denis Villeneuve",
    cast: ["Timothee Chalamet", "Zendaya", "Austin Butler"],
    genres: ["scifi", "adventure", "drama"],
    moods: ["exciting", "tense", "mysterious", "dark"],
    themes: ["power", "destiny", "religion", "colonialism", "revenge"],
    rating: 8.5,
    runtime: 166,
    overview: "Paul Atreides unites with the Fremen to wage war against House Harkonnen, while confronting a terrible prophecy about his own future.",
    language: "english",
    features: { pacing: 0.65, complexity: 0.8, popularity: 0.95, visualStyle: 0.95, emotionalIntensity: 0.85, dialogueDriven: 0.5, artHouse: 0.35, eraFeel: 0.95 }
  },
  {
    id: 207,
    title: "Inside Out 2",
    year: 2024,
    director: "Kelsey Mann",
    cast: ["Amy Poehler", "Maya Hawke", "Ayo Edebiri"],
    genres: ["animation", "comedy", "family"],
    moods: ["funny", "heartwarming", "uplifting", "whimsical"],
    themes: ["growing up", "anxiety", "identity", "emotions", "friendship"],
    rating: 7.6,
    runtime: 100,
    overview: "As Riley enters her teenage years, new emotions like Anxiety, Envy, and Embarrassment arrive in Headquarters, disrupting the established order.",
    language: "english",
    features: { pacing: 0.7, complexity: 0.45, popularity: 0.95, visualStyle: 0.9, emotionalIntensity: 0.6, dialogueDriven: 0.55, artHouse: 0.1, eraFeel: 0.95 }
  },
  {
    id: 208,
    title: "Conclave",
    year: 2024,
    director: "Edward Berger",
    cast: ["Ralph Fiennes", "Stanley Tucci", "John Lithgow"],
    genres: ["thriller", "drama", "mystery"],
    moods: ["tense", "mysterious", "thoughtful"],
    themes: ["faith", "power", "secrets", "morality", "politics"],
    rating: 7.7,
    runtime: 120,
    overview: "After the sudden death of the Pope, Cardinal Lawrence is tasked with overseeing the secretive conclave to elect a new leader of the Catholic Church.",
    language: "english",
    features: { pacing: 0.55, complexity: 0.7, popularity: 0.8, visualStyle: 0.6, emotionalIntensity: 0.7, dialogueDriven: 0.85, artHouse: 0.4, eraFeel: 0.9 }
  },
  {
    id: 209,
    title: "The Zone of Interest",
    year: 2023,
    director: "Jonathan Glazer",
    cast: ["Christian Friedel", "Sandra Huller"],
    genres: ["drama", "war"],
    moods: ["dark", "disturbing", "tense", "thoughtful"],
    themes: ["evil", "complicity", "normalcy", "horror", "history"],
    rating: 7.4,
    runtime: 105,
    overview: "The commandant of Auschwitz and his wife strive to build a dream life for their family in a house next to the camp, oblivious to the horrors beyond the garden wall.",
    language: "english",
    features: { pacing: 0.25, complexity: 0.75, popularity: 0.65, visualStyle: 0.7, emotionalIntensity: 0.9, dialogueDriven: 0.4, artHouse: 0.85, eraFeel: 0.9 }
  },
  {
    id: 210,
    title: "Anatomy of a Fall",
    year: 2023,
    director: "Justine Triet",
    cast: ["Sandra Huller", "Swann Arlaud", "Milo Machado Graner"],
    genres: ["drama", "thriller", "mystery"],
    moods: ["tense", "mysterious", "thoughtful"],
    themes: ["truth", "marriage", "justice", "perception", "family"],
    rating: 7.7,
    runtime: 152,
    overview: "A woman is suspected of murdering her husband after he is found dead at the bottom of their chalet. Their blind son becomes a key witness.",
    language: "english",
    features: { pacing: 0.4, complexity: 0.8, popularity: 0.7, visualStyle: 0.4, emotionalIntensity: 0.75, dialogueDriven: 0.9, artHouse: 0.6, eraFeel: 0.95 }
  },
  {
    id: 211,
    title: "The Banshees of Inisherin",
    year: 2022,
    director: "Martin McDonagh",
    cast: ["Colin Farrell", "Brendan Gleeson", "Kerry Condon"],
    genres: ["drama", "comedy"],
    moods: ["melancholic", "funny", "dark", "thoughtful"],
    themes: ["friendship", "isolation", "legacy", "stubbornness", "despair"],
    rating: 7.7,
    runtime: 114,
    overview: "On a remote Irish island, a man is left confused and devastated when his lifelong friend abruptly ends their relationship.",
    language: "english",
    features: { pacing: 0.3, complexity: 0.55, popularity: 0.75, visualStyle: 0.6, emotionalIntensity: 0.7, dialogueDriven: 0.85, artHouse: 0.55, eraFeel: 0.45 }
  },

  // ---- Tamil ----
  {
    id: 212,
    title: "Ponniyin Selvan: I",
    year: 2022,
    director: "Mani Ratnam",
    cast: ["Vikram", "Aishwarya Rai Bachchan", "Jayam Ravi"],
    genres: ["drama", "action", "adventure"],
    moods: ["exciting", "inspiring", "tense"],
    themes: ["dynasty", "loyalty", "betrayal", "power", "history"],
    rating: 7.3,
    runtime: 167,
    overview: "Set in the Chola dynasty, a young warrior is tasked with a crucial mission that draws him into the deadly succession battle for the kingdom's throne.",
    language: "tamil",
    features: { pacing: 0.6, complexity: 0.65, popularity: 0.85, visualStyle: 0.85, emotionalIntensity: 0.7, dialogueDriven: 0.5, artHouse: 0.25, eraFeel: 0.3 }
  },
  {
    id: 213,
    title: "Leo",
    year: 2023,
    director: "Lokesh Kanagaraj",
    cast: ["Vijay", "Trisha Krishnan", "Sanjay Dutt"],
    genres: ["action", "thriller", "crime"],
    moods: ["exciting", "tense", "dark"],
    themes: ["identity", "past", "violence", "family", "redemption"],
    rating: 6.5,
    runtime: 164,
    overview: "A mild-mannered cafe owner in Kashmir is forced to confront his dark and violent past when a gang of ruthless criminals targets him.",
    language: "tamil",
    features: { pacing: 0.8, complexity: 0.5, popularity: 0.9, visualStyle: 0.65, emotionalIntensity: 0.75, dialogueDriven: 0.35, artHouse: 0.1, eraFeel: 0.95 }
  },
  {
    id: 214,
    title: "Aranmanai 4",
    year: 2024,
    director: "Sundar C.",
    cast: ["Tamannaah Bhatia", "Raashii Khanna", "Sundar C."],
    genres: ["horror", "comedy"],
    moods: ["funny", "dark", "exciting"],
    themes: ["supernatural", "family", "humor", "ghosts"],
    rating: 5.8,
    runtime: 155,
    overview: "A family returns to their ancestral palace and must face a vengeful spirit, blending frights with slapstick comedy in this horror-comedy franchise entry.",
    language: "tamil",
    features: { pacing: 0.7, complexity: 0.25, popularity: 0.75, visualStyle: 0.55, emotionalIntensity: 0.5, dialogueDriven: 0.5, artHouse: 0.05, eraFeel: 0.9 }
  },

  // ---- Hindi ----
  {
    id: 215,
    title: "Jawan",
    year: 2023,
    director: "Atlee",
    cast: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi"],
    genres: ["action", "thriller", "drama"],
    moods: ["exciting", "inspiring", "tense"],
    themes: ["justice", "corruption", "sacrifice", "family", "revolution"],
    rating: 7.1,
    runtime: 169,
    overview: "A man driven by a personal vendetta against a corrupt politician uses his position as a jail warden to orchestrate a series of elaborate public heists.",
    language: "hindi",
    features: { pacing: 0.8, complexity: 0.5, popularity: 0.95, visualStyle: 0.7, emotionalIntensity: 0.75, dialogueDriven: 0.4, artHouse: 0.05, eraFeel: 0.95 }
  },
  {
    id: 216,
    title: "Animal",
    year: 2023,
    director: "Sandeep Reddy Vanga",
    cast: ["Ranbir Kapoor", "Anil Kapoor", "Bobby Deol"],
    genres: ["action", "crime", "drama"],
    moods: ["dark", "tense", "exciting"],
    themes: ["obsession", "family", "masculinity", "power", "violence"],
    rating: 6.5,
    runtime: 201,
    overview: "A man's deep-rooted obsession with his father drives him to dark extremes as he battles family enemies and confronts his own violent nature.",
    language: "hindi",
    features: { pacing: 0.7, complexity: 0.5, popularity: 0.9, visualStyle: 0.75, emotionalIntensity: 0.9, dialogueDriven: 0.45, artHouse: 0.15, eraFeel: 0.95 }
  },
  {
    id: 217,
    title: "12th Fail",
    year: 2023,
    director: "Vidhu Vinod Chopra",
    cast: ["Vikrant Massey", "Medha Shankar"],
    genres: ["drama"],
    moods: ["inspiring", "heartwarming", "melancholic", "uplifting"],
    themes: ["perseverance", "education", "poverty", "integrity", "love"],
    rating: 8.8,
    runtime: 147,
    overview: "Based on a true story, a young man from a poor village overcomes repeated failures and systemic corruption to achieve his dream of becoming an IPS officer.",
    language: "hindi",
    features: { pacing: 0.45, complexity: 0.4, popularity: 0.8, visualStyle: 0.35, emotionalIntensity: 0.8, dialogueDriven: 0.65, artHouse: 0.3, eraFeel: 0.9 }
  },
  {
    id: 218,
    title: "Sam Bahadur",
    year: 2023,
    director: "Meghna Gulzar",
    cast: ["Vicky Kaushal", "Sanya Malhotra", "Fatima Sana Shaikh"],
    genres: ["drama", "war"],
    moods: ["inspiring", "tense", "thoughtful"],
    themes: ["patriotism", "leadership", "duty", "war", "legacy"],
    rating: 7.1,
    runtime: 150,
    overview: "The biographical tale of Field Marshal Sam Manekshaw, one of India's greatest military leaders, spanning decades of service and pivotal wartime decisions.",
    language: "hindi",
    features: { pacing: 0.5, complexity: 0.55, popularity: 0.75, visualStyle: 0.55, emotionalIntensity: 0.7, dialogueDriven: 0.6, artHouse: 0.2, eraFeel: 0.5 }
  },

  // ---- Telugu ----
  {
    id: 219,
    title: "Salaar: Part 1 - Ceasefire",
    year: 2023,
    director: "Prashanth Neel",
    cast: ["Prabhas", "Prithviraj Sukumaran", "Shruti Haasan"],
    genres: ["action", "thriller"],
    moods: ["exciting", "dark", "tense"],
    themes: ["friendship", "power", "loyalty", "violence", "rebellion"],
    rating: 6.5,
    runtime: 175,
    overview: "A man is drawn back to the violent world he tried to leave behind when his childhood friend, now ruling a lawless city, calls upon him for one final battle.",
    language: "telugu",
    features: { pacing: 0.75, complexity: 0.45, popularity: 0.9, visualStyle: 0.75, emotionalIntensity: 0.8, dialogueDriven: 0.3, artHouse: 0.1, eraFeel: 0.95 }
  },
  {
    id: 220,
    title: "Hi Nanna",
    year: 2023,
    director: "Shouryuv",
    cast: ["Nani", "Mrunal Thakur", "Kiara Khanna"],
    genres: ["drama", "romance", "family"],
    moods: ["heartwarming", "romantic", "melancholic"],
    themes: ["parenthood", "love", "loss", "family", "sacrifice"],
    rating: 7.5,
    runtime: 145,
    overview: "A single father must confront painful memories of the past when his young daughter insists on knowing the truth about her mother.",
    language: "telugu",
    features: { pacing: 0.4, complexity: 0.4, popularity: 0.8, visualStyle: 0.5, emotionalIntensity: 0.8, dialogueDriven: 0.7, artHouse: 0.15, eraFeel: 0.9 }
  },
  {
    id: 221,
    title: "Dasara",
    year: 2023,
    director: "Srikanth Odela",
    cast: ["Nani", "Keerthy Suresh", "Dheekshith Shetty"],
    genres: ["action", "drama", "crime"],
    moods: ["dark", "tense", "exciting"],
    themes: ["poverty", "addiction", "power", "love", "rebellion"],
    rating: 6.7,
    runtime: 160,
    overview: "In a coal-mining village, a young man spirals into a world of liquor and violence, caught between warring factions and his own self-destructive tendencies.",
    language: "telugu",
    features: { pacing: 0.65, complexity: 0.45, popularity: 0.8, visualStyle: 0.6, emotionalIntensity: 0.8, dialogueDriven: 0.4, artHouse: 0.2, eraFeel: 0.9 }
  },

  // ---- Malayalam ----
  {
    id: 222,
    title: "2018",
    year: 2023,
    director: "Jude Anthany Joseph",
    cast: ["Tovino Thomas", "Kunchacko Boban", "Asif Ali"],
    genres: ["drama", "thriller"],
    moods: ["tense", "inspiring", "dark", "heartwarming"],
    themes: ["survival", "community", "disaster", "heroism", "humanity"],
    rating: 8.2,
    runtime: 155,
    overview: "Based on the devastating Kerala floods of 2018, the film weaves together multiple stories of ordinary people who become heroes in the face of catastrophic disaster.",
    language: "malayalam",
    features: { pacing: 0.6, complexity: 0.5, popularity: 0.85, visualStyle: 0.6, emotionalIntensity: 0.9, dialogueDriven: 0.5, artHouse: 0.25, eraFeel: 0.95 }
  },
  {
    id: 223,
    title: "Bramayugam",
    year: 2024,
    director: "Rahul Sadasivan",
    cast: ["Mammootty", "Arjun Ashokan", "Sidharth Bharathan"],
    genres: ["horror", "drama", "mystery"],
    moods: ["dark", "disturbing", "mysterious", "tense"],
    themes: ["power", "captivity", "folklore", "evil", "survival"],
    rating: 7.6,
    runtime: 135,
    overview: "A folk singer seeking refuge in a remote mansion discovers that the mysterious lord of the house wields a terrifying and ancient power from which there is no escape.",
    language: "malayalam",
    features: { pacing: 0.4, complexity: 0.65, popularity: 0.7, visualStyle: 0.75, emotionalIntensity: 0.85, dialogueDriven: 0.55, artHouse: 0.6, eraFeel: 0.4 }
  },
  {
    id: 224,
    title: "Aadujeevitham",
    year: 2024,
    director: "Blessy",
    cast: ["Prithviraj Sukumaran", "Amala Paul", "Jimmy Jean-Louis"],
    genres: ["drama"],
    moods: ["dark", "melancholic", "inspiring", "tense"],
    themes: ["survival", "slavery", "hope", "faith", "endurance"],
    rating: 7.5,
    runtime: 168,
    overview: "Based on a bestselling novel, an Indian migrant worker is trapped as a slave in the Saudi Arabian desert, tending goats while dreaming of escape and home.",
    language: "malayalam",
    features: { pacing: 0.3, complexity: 0.5, popularity: 0.75, visualStyle: 0.7, emotionalIntensity: 0.95, dialogueDriven: 0.3, artHouse: 0.55, eraFeel: 0.9 }
  },

  // ---- Kannada ----
  {
    id: 225,
    title: "Toby",
    year: 2023,
    director: "Basil Alchalabi",
    cast: ["Raj B. Shetty", "Samyukta Hornad", "Chaithra J. Achar"],
    genres: ["drama", "romance"],
    moods: ["melancholic", "romantic", "thoughtful"],
    themes: ["love", "heartbreak", "self-discovery", "redemption"],
    rating: 7.3,
    runtime: 139,
    overview: "A man struggling with the aftermath of a painful breakup embarks on a journey of self-reflection as he revisits the memories of his past relationships.",
    language: "kannada",
    features: { pacing: 0.35, complexity: 0.5, popularity: 0.6, visualStyle: 0.5, emotionalIntensity: 0.75, dialogueDriven: 0.7, artHouse: 0.45, eraFeel: 0.9 }
  },
  {
    id: 226,
    title: "Martin",
    year: 2024,
    director: "A. P. Arjun",
    cast: ["Dhruva Sarja", "Vaibhavi Shandilya", "Nikitin Dheer"],
    genres: ["action", "thriller"],
    moods: ["exciting", "tense", "dark"],
    themes: ["patriotism", "espionage", "duty", "sacrifice"],
    rating: 5.5,
    runtime: 157,
    overview: "A fearless military intelligence officer goes on a high-stakes covert mission across borders, fighting enemies both foreign and within.",
    language: "kannada",
    features: { pacing: 0.85, complexity: 0.35, popularity: 0.7, visualStyle: 0.65, emotionalIntensity: 0.65, dialogueDriven: 0.25, artHouse: 0.05, eraFeel: 0.95 }
  },
  {
    id: 227,
    title: "Sapta Sagaradaache Ello - Side A",
    year: 2023,
    director: "Hemanth M. Rao",
    cast: ["Rakshit Shetty", "Rukmini Vasanth"],
    genres: ["drama", "romance", "crime"],
    moods: ["melancholic", "romantic", "dark", "thoughtful"],
    themes: ["love", "sacrifice", "crime", "consequence", "loyalty"],
    rating: 8.1,
    runtime: 150,
    overview: "A young man in love commits a crime that lands him in prison, and the story traces how his choices ripple through the lives of those he cares about.",
    language: "kannada",
    features: { pacing: 0.4, complexity: 0.6, popularity: 0.65, visualStyle: 0.5, emotionalIntensity: 0.85, dialogueDriven: 0.6, artHouse: 0.4, eraFeel: 0.9 }
  },

  // ---- More English (2023-2024) ----
  {
    id: 228,
    title: "Barbie",
    year: 2023,
    director: "Greta Gerwig",
    cast: ["Margot Robbie", "Ryan Gosling", "America Ferrera"],
    genres: ["comedy", "fantasy", "adventure"],
    moods: ["funny", "uplifting", "whimsical", "heartwarming"],
    themes: ["identity", "feminism", "purpose", "self-discovery", "society"],
    rating: 7.0,
    runtime: 114,
    overview: "Barbie and Ken leave the perfection of Barbieland for the real world, where they discover the joys and complexities of being human.",
    language: "english",
    features: { pacing: 0.65, complexity: 0.45, popularity: 0.95, visualStyle: 0.9, emotionalIntensity: 0.5, dialogueDriven: 0.65, artHouse: 0.25, eraFeel: 0.95 }
  },
  {
    id: 229,
    title: "The Boy and the Heron",
    year: 2023,
    director: "Hayao Miyazaki",
    cast: ["Soma Santoki", "Masaki Suda", "Takuya Kimura"],
    genres: ["animation", "fantasy", "adventure"],
    moods: ["whimsical", "mysterious", "melancholic", "uplifting"],
    themes: ["grief", "imagination", "family", "growing up", "nature"],
    rating: 7.5,
    runtime: 124,
    overview: "A young boy grieving his mother's death discovers a fantastical world inhabited by the living and the dead, guided by a mysterious grey heron.",
    language: "english",
    features: { pacing: 0.4, complexity: 0.65, popularity: 0.75, visualStyle: 0.95, emotionalIntensity: 0.7, dialogueDriven: 0.35, artHouse: 0.65, eraFeel: 0.85 }
  },
  {
    id: 230,
    title: "All of Us Strangers",
    year: 2023,
    director: "Andrew Haigh",
    cast: ["Andrew Scott", "Paul Mescal", "Jamie Bell", "Claire Foy"],
    genres: ["drama", "romance", "fantasy"],
    moods: ["melancholic", "romantic", "heartwarming", "mysterious"],
    themes: ["grief", "loneliness", "love", "memory", "identity"],
    rating: 7.6,
    runtime: 105,
    overview: "A lonely screenwriter forms an unexpected bond with a mysterious neighbor while simultaneously reconnecting with figures from his childhood past.",
    language: "english",
    features: { pacing: 0.3, complexity: 0.6, popularity: 0.65, visualStyle: 0.6, emotionalIntensity: 0.9, dialogueDriven: 0.75, artHouse: 0.7, eraFeel: 0.95 }
  }
];


// ============================================================
// Core Functions
// ============================================================

/**
 * Check for new movies to discover.
 *
 * Call this on app load. If at least UPDATE_INTERVAL_MS has elapsed
 * since the last check (or if this is the first ever check), a new
 * batch of BATCH_SIZE movies is drawn from the DISCOVERABLE_MOVIES
 * catalog and added to the localStorage cache.
 *
 * @param {number[]} existingIds - IDs already present in the curated database.
 *   These will never be overwritten or duplicated.
 * @returns {{ newMovies: Movie[], lastUpdated: number }}
 *   newMovies  - the movies discovered in THIS session (may be empty)
 *   lastUpdated - timestamp of the most recent successful update
 */
export async function checkForNewMovies(existingIds = []) {
  const now = Date.now();
  const lastUpdated = getLastUpdated();
  const timeSinceUpdate = now - lastUpdated;

  // If not enough time has passed, return empty
  if (lastUpdated > 0 && timeSinceUpdate < UPDATE_INTERVAL_MS) {
    return { newMovies: [], lastUpdated };
  }

  // Determine which movies from the catalog have NOT yet been discovered
  const alreadyDiscovered = getDynamicMovies();
  const alreadyDiscoveredIds = new Set(alreadyDiscovered.map(m => m.id));
  const existingIdSet = new Set(existingIds);

  const undiscovered = DISCOVERABLE_MOVIES.filter(
    m => !alreadyDiscoveredIds.has(m.id) && !existingIdSet.has(m.id)
  );

  if (undiscovered.length === 0) {
    // All movies in the catalog have been discovered
    setLastUpdated(now);
    return { newMovies: [], lastUpdated: now };
  }

  // Pick the next batch (in catalog order for determinism)
  const batch = undiscovered.slice(0, BATCH_SIZE);

  // Merge into cache
  const updatedCache = [...alreadyDiscovered, ...batch];
  saveDynamicMovies(updatedCache);
  setLastUpdated(now);

  return { newMovies: batch, lastUpdated: now };
}

/**
 * Retrieve all dynamically discovered movies from the localStorage cache.
 * These are movies that have been "discovered" over previous update cycles.
 *
 * @returns {Movie[]} Array of movie objects in the standard CineMatch format.
 */
export function getDynamicMovies() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

/**
 * Clear the entire dynamic movie cache from localStorage.
 * Useful for resetting the discovery progress (e.g., from a settings page).
 */
export function clearDynamicMovies() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LAST_UPDATED_KEY);
  localStorage.removeItem(DISCOVERED_INDEX_KEY);
}


// ============================================================
// Internal Helpers
// ============================================================

function getLastUpdated() {
  try {
    const val = localStorage.getItem(LAST_UPDATED_KEY);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

function setLastUpdated(timestamp) {
  try {
    localStorage.setItem(LAST_UPDATED_KEY, String(timestamp));
  } catch {
    // localStorage may be full or disabled; fail silently
  }
}

function saveDynamicMovies(movies) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch {
    // localStorage may be full or disabled; fail silently
  }
}


// ============================================================
// TMDB API Integration Framework
// ============================================================
// The functions below provide a complete framework for fetching
// real movie data from TMDB. To enable live updates:
//
// 1. Sign up for a free account at https://www.themoviedb.org/
// 2. Go to Settings > API > Request an API Key (free for personal use)
// 3. Copy your "API Read Access Token" (v4 auth, starts with "eyJ...")
// 4. Replace the empty string below with your token:
//
//    const TMDB_ACCESS_TOKEN = 'eyJ...your_token_here...';
//
// 5. Call fetchTMDBTrending() or fetchTMDBPopular() from checkForNewMovies
//    instead of (or in addition to) the local catalog approach.
//
// The mapping functions (convertTMDBMovie, etc.) will transform
// TMDB's response format into CineMatch's internal format automatically.
// ============================================================

const TMDB_ACCESS_TOKEN = ''; // <-- Paste your TMDB v4 token here
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Fetch trending movies from TMDB (weekly).
 * Requires a valid TMDB_ACCESS_TOKEN.
 *
 * @returns {Movie[]} Array of movies converted to CineMatch format.
 */
export async function fetchTMDBTrending() {
  if (!TMDB_ACCESS_TOKEN) {
    console.warn('[CineMatch] TMDB_ACCESS_TOKEN not configured. Skipping live fetch.');
    return [];
  }

  try {
    const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week`, {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('[CineMatch] TMDB trending fetch failed:', response.status);
      return [];
    }

    const data = await response.json();
    const movies = (data.results || []).map(convertTMDBMovie).filter(Boolean);
    return movies;
  } catch (err) {
    console.error('[CineMatch] TMDB trending fetch error:', err);
    return [];
  }
}

/**
 * Fetch popular movies from TMDB.
 * Requires a valid TMDB_ACCESS_TOKEN.
 *
 * @returns {Movie[]} Array of movies converted to CineMatch format.
 */
export async function fetchTMDBPopular() {
  if (!TMDB_ACCESS_TOKEN) {
    console.warn('[CineMatch] TMDB_ACCESS_TOKEN not configured. Skipping live fetch.');
    return [];
  }

  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/popular`, {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('[CineMatch] TMDB popular fetch failed:', response.status);
      return [];
    }

    const data = await response.json();
    const movies = (data.results || []).map(convertTMDBMovie).filter(Boolean);
    return movies;
  } catch (err) {
    console.error('[CineMatch] TMDB popular fetch error:', err);
    return [];
  }
}

/**
 * Fetch movie details from TMDB by movie ID (includes credits for cast/director).
 * Requires a valid TMDB_ACCESS_TOKEN.
 *
 * @param {number} tmdbId - The TMDB movie ID.
 * @returns {Object|null} Full movie details, or null on failure.
 */
export async function fetchTMDBMovieDetails(tmdbId) {
  if (!TMDB_ACCESS_TOKEN) return null;

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${tmdbId}?append_to_response=credits`,
      {
        headers: {
          'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Convert a TMDB movie object (from /trending or /popular) into
 * the CineMatch internal format. This handles genre mapping, mood
 * inference, feature inference, and language detection.
 *
 * @param {Object} tmdbMovie - Raw movie object from TMDB API.
 * @returns {Movie|null} Converted movie, or null if data is insufficient.
 */
function convertTMDBMovie(tmdbMovie) {
  if (!tmdbMovie || !tmdbMovie.id || !tmdbMovie.title) return null;

  // Map TMDB genre IDs to our genre names
  const genres = (tmdbMovie.genre_ids || [])
    .map(id => TMDB_GENRE_MAP[id])
    .filter(Boolean);

  // Deduplicate genres (History and TV Movie both map to drama)
  const uniqueGenres = [...new Set(genres)];

  if (uniqueGenres.length === 0) {
    uniqueGenres.push('drama'); // Fallback
  }

  // Detect language from TMDB's original_language field
  const language = mapTMDBLanguage(tmdbMovie.original_language);

  // Extract year from release date
  const year = tmdbMovie.release_date
    ? parseInt(tmdbMovie.release_date.substring(0, 4), 10)
    : new Date().getFullYear();

  // Infer moods and features from genres
  const moods = inferMoods(uniqueGenres);
  const features = inferFeatures(uniqueGenres);

  // Scale TMDB vote_average (0-10) to our rating
  const rating = tmdbMovie.vote_average
    ? Math.round(tmdbMovie.vote_average * 10) / 10
    : 5.0;

  return {
    id: tmdbMovie.id + 100000, // Offset to avoid ID collisions
    title: tmdbMovie.title,
    year,
    director: "Unknown", // TMDB list endpoints do not include credits; use fetchTMDBMovieDetails for this
    cast: [],            // Same as above
    genres: uniqueGenres,
    moods,
    themes: inferThemesFromGenres(uniqueGenres),
    rating,
    runtime: tmdbMovie.runtime || 120, // Default; not always present in list endpoints
    overview: tmdbMovie.overview || '',
    language,
    features
  };
}

/**
 * Map TMDB's ISO 639-1 language code to CineMatch's language labels.
 *
 * @param {string} langCode - Two-letter ISO language code (e.g., "en", "ta").
 * @returns {string} CineMatch language label.
 */
function mapTMDBLanguage(langCode) {
  const map = {
    en: 'english',
    ta: 'tamil',
    hi: 'hindi',
    te: 'telugu',
    ml: 'malayalam',
    kn: 'kannada'
  };
  return map[langCode] || 'english';
}

/**
 * Infer basic themes from genres. This is a rough heuristic;
 * for the local catalog, themes are hand-curated instead.
 *
 * @param {string[]} genres
 * @returns {string[]}
 */
function inferThemesFromGenres(genres) {
  const themeMap = {
    action:      ['heroism', 'conflict'],
    comedy:      ['humor', 'relationships'],
    drama:       ['human condition', 'relationships'],
    horror:      ['fear', 'survival'],
    scifi:       ['technology', 'future'],
    romance:     ['love', 'relationships'],
    thriller:    ['danger', 'deception'],
    animation:   ['imagination', 'coming of age'],
    documentary: ['truth', 'society'],
    fantasy:     ['magic', 'adventure'],
    mystery:     ['secrets', 'investigation'],
    crime:       ['justice', 'morality'],
    adventure:   ['exploration', 'courage'],
    family:      ['togetherness', 'growing up'],
    war:         ['sacrifice', 'duty'],
    musical:     ['expression', 'passion'],
    western:     ['frontier', 'justice'],
    noir:        ['corruption', 'fate']
  };

  const themeSet = new Set();
  for (const genre of genres) {
    const themes = themeMap[genre];
    if (themes) {
      themes.forEach(t => themeSet.add(t));
    }
  }
  return [...themeSet];
}


// ============================================================
// Exports Summary
// ============================================================
// Primary API:
//   checkForNewMovies(existingIds)  -> { newMovies, lastUpdated }
//   getDynamicMovies()              -> Movie[]
//   clearDynamicMovies()            -> void
//
// TMDB API (requires token):
//   fetchTMDBTrending()             -> Movie[]
//   fetchTMDBPopular()              -> Movie[]
//   fetchTMDBMovieDetails(id)       -> Object | null
//
// Utility (also exported for reuse):
//   inferMoods(genres)              -> string[]
//   inferFeatures(genres)           -> Object
// ============================================================

export { inferMoods, inferFeatures, TMDB_GENRE_MAP, DISCOVERABLE_MOVIES };
