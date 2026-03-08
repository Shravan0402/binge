# BINGE - Your Personal Movie Universe

A deeply personalized movie recommendation engine that learns your taste in real-time — no accounts, no servers, just pure algorithmic magic running entirely in your very own browser.

## Live Demo

[**binge-movie-universe.netlify.app**](https://binge-movie-universe.netlify.app)

---

## What Makes BINGE Different

Most recommendation engines rely on collaborative filtering ("users like you also watched..."). BINGE takes a fundamentally different approach:

- **40-Dimensional Feature Vectors** — Every movie is mapped across 18 genre dimensions, 14 mood dimensions, and 8 continuous features (pacing, complexity, emotional intensity, visual style, dialogue-driven, humor, art-house, era-feel)
- **Real-Time Taste Profiling** — Your taste profile updates instantly as you rate movies, using weighted vector averaging with rating-based multipliers
- **Cosine Similarity Matching** — Recommendations are ranked by angular similarity between your taste vector and every movie's feature vector
- **Multi-Channel Discovery** — Five distinct recommendation channels ensure you discover films across different dimensions of your taste
- **Zero Backend** — Everything runs client-side. Your data stays in `localStorage`. No tracking, no servers, no sign-ups

---

## Features

### Intelligent Recommendation Channels
| Channel | Algorithm |
|---|---|
| **Perfect For You** | Top cosine-similarity matches against your aggregate taste profile |
| **Because You Loved X** | Per-movie similarity search from your highest-rated films |
| **Hidden Gems** | High-similarity films with rating < 7.5 that you haven't discovered |
| **Expand Your Taste** | Intentionally surfaces films outside your comfort zone |
| **Director's Cut** | Finds other works by directors of movies you've loved |

### Mood-Based Discovery
Select your current mood (Chill, Intense, Feel-Good, Mind-Bending, Dark, Nostalgic, Romantic, Adventurous) and get recommendations tuned to that emotional wavelength.

### Taste DNA Visualization
An interactive radar chart that visualizes your movie taste across 8 personality dimensions — see yourself as a unique cinematic fingerprint.

### Multi-Language Support
Explore cinema across **6 languages**:
- English (100+ films)
- Tamil, Hindi, Telugu, Malayalam, Kannada (38+ regional Indian films)

Cross-language genre filtering: pick a genre like "thriller" and see the best thrillers across ALL languages, then filter by your preferred language.

### Auto-Updating Database
A built-in movie discovery engine that periodically reveals new titles from a curated catalog, with an extensible TMDB API integration framework for pulling trending and popular films.

### Real Movie Posters
Posters fetched from Wikipedia's REST API — no API keys needed, completely free and legal.

### Watch Links
Every movie detail page includes direct links to JustWatch and Google Search for finding where to stream.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 |
| **Build Tool** | Vite 6 |
| **Styling** | Custom CSS (no frameworks) |
| **Fonts** | Bebas Neue (display) + Space Grotesk (body) |
| **State** | React hooks + localStorage |
| **Recommendations** | Custom cosine similarity engine |
| **Posters** | Wikipedia REST API |
| **Deployment** | Netlify |

---

## Project Structure

```
src/
  App.jsx                  # Main app shell, routing, state management
  main.jsx                 # Entry point
  styles.css               # All styles (glassmorphism, gradients, responsive)
  data/
    movies.js              # 100 curated English films + merger logic
    regionalMovies.js      # 38 Indian regional language films
  engine/
    engine.js              # Core recommendation algorithm
    posterService.js        # Wikipedia poster fetching + caching
    movieUpdater.js         # Dynamic movie discovery engine
  components/
    Onboarding.jsx         # First-time user flow (rate 5+ movies)
    Home.jsx               # Main dashboard with 5 recommendation channels
    MovieCard.jsx          # Reusable movie card with quick-rate overlay
    MovieDetail.jsx        # Full movie detail modal with DNA bars
    MoodSelector.jsx       # Mood-based recommendation view
    TasteDNA.jsx           # Radar chart taste visualization
    Search.jsx             # Explore page with genre + language filters
```

---

## The Algorithm

### Feature Vector Construction
Each movie is represented as a 40-dimensional vector:

```
[action, comedy, drama, horror, scifi, romance, thriller, animation,
 fantasy, crime, adventure, war, mystery, documentary, musical, western,
 noir, experimental,                              // 18 genre dims
 tense, uplifting, dark, funny, romantic, thrilling, nostalgic,
 thoughtProvoking, suspenseful, heartwarming, melancholic, exciting,
 eerie, inspiring,                                 // 14 mood dims
 pacing, complexity, emotionalIntensity, visualStyle,
 dialogueDriven, humor, artHouse, eraFeel]         // 8 features
```

### Taste Profile Building
When you rate a movie, its vector is added to your taste profile with a weight:
- **5 stars (Love)**: weight = 2.0
- **4 stars (Like)**: weight = 1.0
- **3 stars (Meh)**: weight = 0.0 (neutral)
- **2 stars (Dislike)**: weight = -1.5

The final taste vector is the weighted average of all rated movie vectors.

### Cosine Similarity
```
similarity = (A . B) / (|A| * |B|)
```
This measures the angle between your taste vector and each movie's vector, producing a 0-100% match score.

### Match Percentage Mapping
Raw similarity scores are mapped to human-readable percentages:
- `>= 0.85` similarity → 95% match
- `>= 0.70` similarity → 85% match
- `>= 0.50` similarity → 75% match
- `>= 0.30` similarity → 65% match
- Below 0.30 → proportional scaling

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/binge.git
cd binge
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm run preview
```

---

## Regional Movies Database

BINGE includes a hand-curated collection of critically acclaimed Indian cinema:

| Language | Count | Notable Films |
|---|---|---|
| Tamil | 8 | Vikram, Jai Bhim, Kaithi, Super Deluxe |
| Hindi | 10 | Tumbbad, Andhadhun, Gangs of Wasseypur, 12th Fail |
| Telugu | 8 | Baahubali, RRR, Arjun Reddy, Mahanati |
| Malayalam | 8 | Drishyam, Kumbalangi Nights, Manjummel Boys, 2018 |
| Kannada | 6 | KGF, Kantara, Lucia, Ulidavaru Kandante |

Each regional film has the same 40-dimensional feature vector as English films, enabling truly cross-language taste matching.

---

## Dynamic Movie Updates

The `movieUpdater.js` module implements an auto-discovery system:

1. **Built-in Catalog**: ~30 additional discoverable movies released 2022-2024
2. **Batch Discovery**: 5 new movies surface every 24 hours from the catalog
3. **TMDB Integration**: Framework ready for fetching trending/popular movies via TMDB API
4. **Persistent Storage**: Discovered movies are saved to localStorage and persist across sessions

To enable TMDB integration, set `TMDB_API_KEY` in the module (free API key from themoviedb.org).

---

## Design Philosophy

- **Glassmorphism UI**: Frosted glass panels with subtle gradients
- **Dark Theme**: Easy on the eyes for movie browsing sessions
- **Responsive**: Works on desktop, tablet, and mobile
- **Instant Feedback**: Ratings and recommendations update in real-time
- **No Loading States**: Everything is precomputed client-side
- **Privacy First**: Zero data leaves your browser

---

## License

MIT

---

Built with React + Vite. Powered by cosine similarity and a love for cinema.
