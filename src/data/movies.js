import { REGIONAL_MOVIES, REGIONAL_WIKI_TITLES } from './regionalMovies';

export const GENRES = [
  'action', 'comedy', 'drama', 'horror', 'scifi', 'romance',
  'thriller', 'animation', 'documentary', 'fantasy', 'mystery',
  'crime', 'adventure', 'family', 'war', 'musical', 'western', 'noir'
];

export const LANGUAGES = [
  'english', 'tamil', 'hindi', 'telugu', 'malayalam', 'kannada'
];

export const MOODS = [
  'uplifting', 'dark', 'tense', 'funny', 'thoughtful', 'heartwarming',
  'disturbing', 'whimsical', 'melancholic', 'exciting', 'romantic',
  'mysterious', 'nostalgic', 'inspiring'
];

export const GENRE_COLORS = {
  action:      ['#e74c3c', '#c0392b'],
  comedy:      ['#f39c12', '#e67e22'],
  drama:       ['#3b82f6', '#1e40af'],
  horror:      ['#1a1a2e', '#e74c3c'],
  scifi:       ['#06b6d4', '#0e7490'],
  romance:     ['#ec4899', '#be185d'],
  thriller:    ['#475569', '#1e293b'],
  animation:   ['#8b5cf6', '#ec4899'],
  documentary: ['#10b981', '#059669'],
  fantasy:     ['#a855f7', '#7c3aed'],
  mystery:     ['#6366f1', '#312e81'],
  crime:       ['#64748b', '#334155'],
  adventure:   ['#14b8a6', '#0d9488'],
  family:      ['#60a5fa', '#34d399'],
  war:         ['#78716c', '#44403c'],
  musical:     ['#f472b6', '#f59e0b'],
  western:     ['#d97706', '#92400e'],
  noir:        ['#27272a', '#18181b']
};

// Features: pacing(0=slow,1=fast), complexity(0=simple,1=complex), popularity(0=niche,1=mainstream),
// visualStyle(0=naturalistic,1=stylized), emotionalIntensity(0=light,1=intense),
// dialogueDriven(0=visual,1=dialogue), artHouse(0=commercial,1=arthouse), eraFeel(0=classic,1=contemporary)

export const MOVIES = [
  // === ACTION ===
  {
    id: 1, title: "The Dark Knight", year: 2008, director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    genres: ["action", "crime", "drama"], moods: ["dark", "tense", "exciting", "thoughtful"],
    themes: ["justice", "chaos", "morality", "sacrifice"],
    rating: 9.0, runtime: 152,
    overview: "Batman faces the Joker, a criminal mastermind who plunges Gotham City into anarchy and forces the Dark Knight to confront everything he believes.",
    features: { pacing: 0.8, complexity: 0.8, popularity: 0.97, visualStyle: 0.6, emotionalIntensity: 0.9, dialogueDriven: 0.6, artHouse: 0.15, eraFeel: 0.8 }
  },
  {
    id: 2, title: "Mad Max: Fury Road", year: 2015, director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    genres: ["action", "adventure", "scifi"], moods: ["exciting", "tense", "dark"],
    themes: ["survival", "freedom", "redemption", "feminism"],
    rating: 8.1, runtime: 120,
    overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler and joins forces with a drifter in a high-octane chase across the desert.",
    features: { pacing: 0.95, complexity: 0.4, popularity: 0.85, visualStyle: 0.9, emotionalIntensity: 0.85, dialogueDriven: 0.1, artHouse: 0.3, eraFeel: 0.9 }
  },
  {
    id: 3, title: "John Wick", year: 2014, director: "Chad Stahelski",
    cast: ["Keanu Reeves", "Michael Nyqvist", "Willem Dafoe"],
    genres: ["action", "thriller", "crime"], moods: ["exciting", "dark", "tense"],
    themes: ["revenge", "grief", "underworld", "determination"],
    rating: 7.4, runtime: 101,
    overview: "A retired hitman is forced back into the criminal underworld he left behind when someone steals his car and kills the puppy given to him by his late wife.",
    features: { pacing: 0.85, complexity: 0.3, popularity: 0.88, visualStyle: 0.75, emotionalIntensity: 0.7, dialogueDriven: 0.2, artHouse: 0.1, eraFeel: 0.95 }
  },
  {
    id: 4, title: "Die Hard", year: 1988, director: "John McTiernan",
    cast: ["Bruce Willis", "Alan Rickman", "Bonnie Bedelia"],
    genres: ["action", "thriller"], moods: ["exciting", "tense", "funny"],
    themes: ["heroism", "resourcefulness", "marriage"],
    rating: 8.2, runtime: 132,
    overview: "An NYPD officer tries to save his wife and several others taken hostage by terrorists during a Christmas party at the Nakatomi Plaza.",
    features: { pacing: 0.85, complexity: 0.35, popularity: 0.9, visualStyle: 0.3, emotionalIntensity: 0.7, dialogueDriven: 0.5, artHouse: 0.05, eraFeel: 0.4 }
  },
  {
    id: 5, title: "Kill Bill: Volume 1", year: 2003, director: "Quentin Tarantino",
    cast: ["Uma Thurman", "Lucy Liu", "Vivica A. Fox"],
    genres: ["action", "crime", "thriller"], moods: ["exciting", "dark", "tense"],
    themes: ["revenge", "betrayal", "determination", "martial arts"],
    rating: 8.2, runtime: 111,
    overview: "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of killers who betrayed her.",
    features: { pacing: 0.85, complexity: 0.5, popularity: 0.85, visualStyle: 0.9, emotionalIntensity: 0.8, dialogueDriven: 0.4, artHouse: 0.4, eraFeel: 0.7 }
  },
  {
    id: 6, title: "The Matrix", year: 1999, director: "Lana & Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    genres: ["action", "scifi"], moods: ["exciting", "mysterious", "dark", "thoughtful"],
    themes: ["reality", "freedom", "identity", "technology"],
    rating: 8.7, runtime: 136,
    overview: "A computer hacker learns the shocking truth about his reality and his role in the war against its controllers.",
    features: { pacing: 0.75, complexity: 0.75, popularity: 0.95, visualStyle: 0.85, emotionalIntensity: 0.7, dialogueDriven: 0.5, artHouse: 0.25, eraFeel: 0.6 }
  },
  {
    id: 7, title: "Gladiator", year: 2000, director: "Ridley Scott",
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    genres: ["action", "drama", "adventure"], moods: ["exciting", "inspiring", "dark", "melancholic"],
    themes: ["revenge", "honor", "corruption", "family"],
    rating: 8.5, runtime: 155,
    overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    features: { pacing: 0.65, complexity: 0.5, popularity: 0.92, visualStyle: 0.7, emotionalIntensity: 0.85, dialogueDriven: 0.5, artHouse: 0.15, eraFeel: 0.5 }
  },
  {
    id: 8, title: "Top Gun: Maverick", year: 2022, director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    genres: ["action", "drama"], moods: ["exciting", "inspiring", "nostalgic", "uplifting"],
    themes: ["legacy", "mentorship", "courage", "aging"],
    rating: 8.3, runtime: 130,
    overview: "After thirty years of service, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
    features: { pacing: 0.8, complexity: 0.3, popularity: 0.93, visualStyle: 0.7, emotionalIntensity: 0.75, dialogueDriven: 0.35, artHouse: 0.05, eraFeel: 0.9 }
  },
  {
    id: 9, title: "Casino Royale", year: 2006, director: "Martin Campbell",
    cast: ["Daniel Craig", "Eva Green", "Mads Mikkelsen"],
    genres: ["action", "thriller", "adventure"], moods: ["exciting", "tense", "romantic"],
    themes: ["trust", "betrayal", "duty", "love"],
    rating: 8.0, runtime: 144,
    overview: "Armed with a license to kill, Secret Agent James Bond embarks on his first mission as 007 and must defeat a private banker financing terrorists.",
    features: { pacing: 0.7, complexity: 0.55, popularity: 0.88, visualStyle: 0.6, emotionalIntensity: 0.7, dialogueDriven: 0.5, artHouse: 0.1, eraFeel: 0.8 }
  },
  {
    id: 10, title: "The Raid", year: 2011, director: "Gareth Evans",
    cast: ["Iko Uwais", "Joe Taslim", "Yayan Ruhian"],
    genres: ["action", "thriller", "crime"], moods: ["exciting", "tense", "dark"],
    themes: ["survival", "corruption", "brotherhood"],
    rating: 7.6, runtime: 101,
    overview: "A SWAT team becomes trapped in a tenement run by a ruthless mobster and must fight their way through every floor of the building.",
    features: { pacing: 0.95, complexity: 0.2, popularity: 0.55, visualStyle: 0.6, emotionalIntensity: 0.85, dialogueDriven: 0.1, artHouse: 0.15, eraFeel: 0.85 }
  },

  // === COMEDY ===
  {
    id: 11, title: "The Grand Budapest Hotel", year: 2014, director: "Wes Anderson",
    cast: ["Ralph Fiennes", "Tony Revolori", "F. Murray Abraham"],
    genres: ["comedy", "adventure", "crime"], moods: ["funny", "whimsical", "nostalgic", "melancholic"],
    themes: ["friendship", "nostalgia", "loyalty", "elegance"],
    rating: 8.1, runtime: 99,
    overview: "A writer encounters the owner of an aging high-class hotel, who tells of his early years serving as a lobby boy and a legendary concierge.",
    features: { pacing: 0.7, complexity: 0.65, popularity: 0.78, visualStyle: 0.95, emotionalIntensity: 0.5, dialogueDriven: 0.7, artHouse: 0.7, eraFeel: 0.75 }
  },
  {
    id: 12, title: "Superbad", year: 2007, director: "Greg Mottola",
    cast: ["Jonah Hill", "Michael Cera", "Christopher Mintz-Plasse"],
    genres: ["comedy"], moods: ["funny", "heartwarming", "nostalgic"],
    themes: ["friendship", "coming-of-age", "awkwardness"],
    rating: 7.6, runtime: 113,
    overview: "Two co-dependent high school seniors set out to score alcohol for a party in the hopes of finally connecting with the girls of their dreams.",
    features: { pacing: 0.7, complexity: 0.2, popularity: 0.82, visualStyle: 0.2, emotionalIntensity: 0.4, dialogueDriven: 0.85, artHouse: 0.05, eraFeel: 0.8 }
  },
  {
    id: 13, title: "The Big Lebowski", year: 1998, director: "Joel & Ethan Coen",
    cast: ["Jeff Bridges", "John Goodman", "Julianne Moore"],
    genres: ["comedy", "crime", "mystery"], moods: ["funny", "whimsical", "mysterious"],
    themes: ["identity", "absurdity", "nihilism", "friendship"],
    rating: 8.1, runtime: 117,
    overview: "Jeff 'The Dude' Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and gets entangled in a kidnapping scheme.",
    features: { pacing: 0.5, complexity: 0.6, popularity: 0.82, visualStyle: 0.5, emotionalIntensity: 0.3, dialogueDriven: 0.85, artHouse: 0.45, eraFeel: 0.55 }
  },
  {
    id: 14, title: "Groundhog Day", year: 1993, director: "Harold Ramis",
    cast: ["Bill Murray", "Andie MacDowell", "Chris Elliott"],
    genres: ["comedy", "fantasy", "romance"], moods: ["funny", "heartwarming", "thoughtful", "uplifting"],
    themes: ["self-improvement", "love", "meaning", "repetition"],
    rating: 8.0, runtime: 101,
    overview: "A cynical weatherman finds himself inexplicably living the same day over and over again, and begins to re-examine his life and priorities.",
    features: { pacing: 0.6, complexity: 0.5, popularity: 0.85, visualStyle: 0.2, emotionalIntensity: 0.5, dialogueDriven: 0.7, artHouse: 0.2, eraFeel: 0.4 }
  },
  {
    id: 15, title: "In Bruges", year: 2008, director: "Martin McDonagh",
    cast: ["Colin Farrell", "Brendan Gleeson", "Ralph Fiennes"],
    genres: ["comedy", "crime", "drama"], moods: ["funny", "dark", "melancholic", "thoughtful"],
    themes: ["guilt", "redemption", "friendship", "morality"],
    rating: 7.9, runtime: 107,
    overview: "Two hitmen are ordered to lay low in Bruges after a job gone wrong, where the beauty of the medieval city and their own guilt weigh on them.",
    features: { pacing: 0.45, complexity: 0.55, popularity: 0.6, visualStyle: 0.5, emotionalIntensity: 0.65, dialogueDriven: 0.85, artHouse: 0.45, eraFeel: 0.75 }
  },
  {
    id: 16, title: "Hot Fuzz", year: 2007, director: "Edgar Wright",
    cast: ["Simon Pegg", "Nick Frost", "Jim Broadbent"],
    genres: ["comedy", "action", "mystery"], moods: ["funny", "exciting", "whimsical"],
    themes: ["justice", "community", "friendship", "duty"],
    rating: 7.8, runtime: 121,
    overview: "A skilled London police officer is transferred to a sleepy village where a string of mysterious deaths draws him into an unexpected conspiracy.",
    features: { pacing: 0.75, complexity: 0.5, popularity: 0.72, visualStyle: 0.6, emotionalIntensity: 0.4, dialogueDriven: 0.65, artHouse: 0.2, eraFeel: 0.75 }
  },
  {
    id: 17, title: "Mean Girls", year: 2004, director: "Mark Waters",
    cast: ["Lindsay Lohan", "Rachel McAdams", "Tina Fey"],
    genres: ["comedy"], moods: ["funny", "whimsical", "nostalgic"],
    themes: ["popularity", "identity", "friendship", "high school"],
    rating: 7.1, runtime: 97,
    overview: "Raised in African bush country by her zoologist parents, a teenager moves to the suburbs and must navigate the cutthroat social hierarchy of high school.",
    features: { pacing: 0.7, complexity: 0.25, popularity: 0.88, visualStyle: 0.2, emotionalIntensity: 0.35, dialogueDriven: 0.8, artHouse: 0.05, eraFeel: 0.7 }
  },
  {
    id: 18, title: "Shaun of the Dead", year: 2004, director: "Edgar Wright",
    cast: ["Simon Pegg", "Nick Frost", "Kate Ashfield"],
    genres: ["comedy", "horror"], moods: ["funny", "exciting", "heartwarming"],
    themes: ["friendship", "growing up", "survival", "love"],
    rating: 7.9, runtime: 99,
    overview: "A man whose life has no direction decides to turn it around by winning back his ex, reconciling with his mum, and dealing with a zombie apocalypse.",
    features: { pacing: 0.7, complexity: 0.3, popularity: 0.72, visualStyle: 0.45, emotionalIntensity: 0.5, dialogueDriven: 0.7, artHouse: 0.2, eraFeel: 0.7 }
  },
  {
    id: 19, title: "Ferris Bueller's Day Off", year: 1986, director: "John Hughes",
    cast: ["Matthew Broderick", "Alan Ruck", "Mia Sara"],
    genres: ["comedy"], moods: ["funny", "uplifting", "whimsical", "nostalgic"],
    themes: ["youth", "freedom", "friendship", "rebellion"],
    rating: 7.8, runtime: 103,
    overview: "A high school wise guy is determined to have a day off from school, despite what the principal thinks of that.",
    features: { pacing: 0.7, complexity: 0.2, popularity: 0.85, visualStyle: 0.3, emotionalIntensity: 0.3, dialogueDriven: 0.7, artHouse: 0.1, eraFeel: 0.3 }
  },
  {
    id: 20, title: "Knives Out", year: 2019, director: "Rian Johnson",
    cast: ["Daniel Craig", "Ana de Armas", "Chris Evans"],
    genres: ["comedy", "mystery", "crime"], moods: ["funny", "mysterious", "exciting", "whimsical"],
    themes: ["family", "deception", "class", "immigration"],
    rating: 7.9, runtime: 130,
    overview: "A detective investigates the death of a patriarch of an eccentric, combative family, where everyone is a suspect.",
    features: { pacing: 0.65, complexity: 0.7, popularity: 0.82, visualStyle: 0.5, emotionalIntensity: 0.5, dialogueDriven: 0.8, artHouse: 0.2, eraFeel: 0.9 }
  },

  // === DRAMA ===
  {
    id: 21, title: "The Shawshank Redemption", year: 1994, director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    genres: ["drama"], moods: ["inspiring", "heartwarming", "melancholic", "uplifting"],
    themes: ["hope", "friendship", "freedom", "perseverance"],
    rating: 9.3, runtime: 142,
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    features: { pacing: 0.4, complexity: 0.5, popularity: 0.97, visualStyle: 0.3, emotionalIntensity: 0.8, dialogueDriven: 0.65, artHouse: 0.15, eraFeel: 0.45 }
  },
  {
    id: 22, title: "There Will Be Blood", year: 2007, director: "Paul Thomas Anderson",
    cast: ["Daniel Day-Lewis", "Paul Dano", "Ciar\u00e1n Hinds"],
    genres: ["drama"], moods: ["dark", "tense", "mysterious", "disturbing"],
    themes: ["greed", "ambition", "religion", "isolation"],
    rating: 8.2, runtime: 158,
    overview: "A story of family, religion, hatred, oil and madness, focusing on a misanthropic prospector who strikes it rich and descends into paranoia.",
    features: { pacing: 0.3, complexity: 0.75, popularity: 0.65, visualStyle: 0.7, emotionalIntensity: 0.9, dialogueDriven: 0.6, artHouse: 0.7, eraFeel: 0.65 }
  },
  {
    id: 23, title: "Moonlight", year: 2016, director: "Barry Jenkins",
    cast: ["Trevante Rhodes", "Andr\u00e9 Holland", "Mahershala Ali"],
    genres: ["drama"], moods: ["melancholic", "thoughtful", "heartwarming", "dark"],
    themes: ["identity", "masculinity", "love", "poverty"],
    rating: 7.4, runtime: 111,
    overview: "A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and adulthood.",
    features: { pacing: 0.25, complexity: 0.65, popularity: 0.6, visualStyle: 0.75, emotionalIntensity: 0.85, dialogueDriven: 0.5, artHouse: 0.8, eraFeel: 0.9 }
  },
  {
    id: 24, title: "Parasite", year: 2019, director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    genres: ["drama", "thriller", "comedy"], moods: ["tense", "dark", "funny", "disturbing"],
    themes: ["class", "inequality", "deception", "family"],
    rating: 8.5, runtime: 132,
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    features: { pacing: 0.65, complexity: 0.8, popularity: 0.82, visualStyle: 0.7, emotionalIntensity: 0.85, dialogueDriven: 0.6, artHouse: 0.55, eraFeel: 0.9 }
  },
  {
    id: 25, title: "The Godfather", year: 1972, director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    genres: ["drama", "crime"], moods: ["dark", "tense", "thoughtful", "melancholic"],
    themes: ["family", "power", "loyalty", "corruption"],
    rating: 9.2, runtime: 175,
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.",
    features: { pacing: 0.35, complexity: 0.75, popularity: 0.95, visualStyle: 0.65, emotionalIntensity: 0.8, dialogueDriven: 0.75, artHouse: 0.35, eraFeel: 0.15 }
  },
  {
    id: 26, title: "12 Angry Men", year: 1957, director: "Sidney Lumet",
    cast: ["Henry Fonda", "Lee J. Cobb", "Martin Balsam"],
    genres: ["drama", "crime"], moods: ["tense", "thoughtful", "inspiring"],
    themes: ["justice", "prejudice", "democracy", "courage"],
    rating: 9.0, runtime: 96,
    overview: "The jury in a New York City murder trial is frustrated by a single holdout juror who insists on reconsidering the evidence.",
    features: { pacing: 0.55, complexity: 0.6, popularity: 0.75, visualStyle: 0.2, emotionalIntensity: 0.7, dialogueDriven: 0.98, artHouse: 0.35, eraFeel: 0.05 }
  },
  {
    id: 27, title: "Good Will Hunting", year: 1997, director: "Gus Van Sant",
    cast: ["Matt Damon", "Robin Williams", "Ben Affleck"],
    genres: ["drama", "romance"], moods: ["heartwarming", "inspiring", "melancholic", "thoughtful"],
    themes: ["genius", "trauma", "love", "self-discovery"],
    rating: 8.3, runtime: 126,
    overview: "A janitor at M.I.T. has a gift for mathematics but needs help from a psychologist to find direction in his life.",
    features: { pacing: 0.45, complexity: 0.5, popularity: 0.88, visualStyle: 0.25, emotionalIntensity: 0.8, dialogueDriven: 0.85, artHouse: 0.25, eraFeel: 0.5 }
  },
  {
    id: 28, title: "Whiplash", year: 2014, director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist"],
    genres: ["drama", "musical"], moods: ["tense", "inspiring", "dark", "exciting"],
    themes: ["ambition", "perfection", "abuse", "dedication"],
    rating: 8.5, runtime: 106,
    overview: "A promising young drummer enrolls at a cutthroat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.",
    features: { pacing: 0.8, complexity: 0.5, popularity: 0.78, visualStyle: 0.55, emotionalIntensity: 0.95, dialogueDriven: 0.6, artHouse: 0.4, eraFeel: 0.85 }
  },
  {
    id: 29, title: "Manchester by the Sea", year: 2016, director: "Kenneth Lonergan",
    cast: ["Casey Affleck", "Michelle Williams", "Lucas Hedges"],
    genres: ["drama"], moods: ["melancholic", "heartwarming", "thoughtful"],
    themes: ["grief", "family", "responsibility", "guilt"],
    rating: 7.8, runtime: 137,
    overview: "A man is asked to care for his teenage nephew after the boy's father dies, forcing him to confront a devastating tragedy from his past.",
    features: { pacing: 0.25, complexity: 0.45, popularity: 0.6, visualStyle: 0.3, emotionalIntensity: 0.9, dialogueDriven: 0.7, artHouse: 0.6, eraFeel: 0.85 }
  },
  {
    id: 30, title: "The Pursuit of Happyness", year: 2006, director: "Gabriele Muccino",
    cast: ["Will Smith", "Jaden Smith", "Thandiwe Newton"],
    genres: ["drama"], moods: ["inspiring", "heartwarming", "melancholic", "uplifting"],
    themes: ["perseverance", "fatherhood", "poverty", "determination"],
    rating: 8.0, runtime: 117,
    overview: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
    features: { pacing: 0.5, complexity: 0.25, popularity: 0.88, visualStyle: 0.2, emotionalIntensity: 0.8, dialogueDriven: 0.6, artHouse: 0.1, eraFeel: 0.75 }
  },
  {
    id: 31, title: "Forrest Gump", year: 1994, director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    genres: ["drama", "romance", "comedy"], moods: ["heartwarming", "nostalgic", "inspiring", "funny"],
    themes: ["destiny", "love", "innocence", "history"],
    rating: 8.8, runtime: 142,
    overview: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of a kind-hearted man from Alabama.",
    features: { pacing: 0.55, complexity: 0.4, popularity: 0.97, visualStyle: 0.4, emotionalIntensity: 0.7, dialogueDriven: 0.65, artHouse: 0.1, eraFeel: 0.4 }
  },
  {
    id: 32, title: "Fight Club", year: 1999, director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    genres: ["drama", "thriller"], moods: ["dark", "tense", "disturbing", "thoughtful"],
    themes: ["identity", "consumerism", "masculinity", "anarchy"],
    rating: 8.8, runtime: 139,
    overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    features: { pacing: 0.7, complexity: 0.8, popularity: 0.92, visualStyle: 0.75, emotionalIntensity: 0.8, dialogueDriven: 0.7, artHouse: 0.4, eraFeel: 0.6 }
  },
  {
    id: 33, title: "The Green Mile", year: 1999, director: "Frank Darabont",
    cast: ["Tom Hanks", "Michael Clarke Duncan", "David Morse"],
    genres: ["drama", "fantasy", "crime"], moods: ["heartwarming", "melancholic", "inspiring", "dark"],
    themes: ["compassion", "injustice", "miracles", "death"],
    rating: 8.6, runtime: 189,
    overview: "A death row corrections officer discovers that one of his inmates possesses a mysterious gift that defies explanation.",
    features: { pacing: 0.35, complexity: 0.45, popularity: 0.88, visualStyle: 0.3, emotionalIntensity: 0.9, dialogueDriven: 0.6, artHouse: 0.15, eraFeel: 0.45 }
  },
  {
    id: 34, title: "Schindler's List", year: 1993, director: "Steven Spielberg",
    cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
    genres: ["drama", "war"], moods: ["dark", "melancholic", "inspiring", "disturbing"],
    themes: ["holocaust", "humanity", "heroism", "evil"],
    rating: 9.0, runtime: 195,
    overview: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce.",
    features: { pacing: 0.4, complexity: 0.55, popularity: 0.88, visualStyle: 0.65, emotionalIntensity: 0.98, dialogueDriven: 0.55, artHouse: 0.35, eraFeel: 0.35 }
  },
  {
    id: 35, title: "American Beauty", year: 1999, director: "Sam Mendes",
    cast: ["Kevin Spacey", "Annette Bening", "Thora Birch"],
    genres: ["drama"], moods: ["dark", "thoughtful", "funny", "melancholic"],
    themes: ["suburban malaise", "beauty", "freedom", "desire"],
    rating: 8.3, runtime: 122,
    overview: "A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend.",
    features: { pacing: 0.45, complexity: 0.65, popularity: 0.8, visualStyle: 0.6, emotionalIntensity: 0.7, dialogueDriven: 0.75, artHouse: 0.5, eraFeel: 0.55 }
  },

  // === HORROR ===
  {
    id: 36, title: "Get Out", year: 2017, director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"],
    genres: ["horror", "thriller", "mystery"], moods: ["tense", "disturbing", "mysterious", "dark"],
    themes: ["racism", "exploitation", "identity", "control"],
    rating: 7.7, runtime: 104,
    overview: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him reaches a boiling point.",
    features: { pacing: 0.6, complexity: 0.7, popularity: 0.82, visualStyle: 0.55, emotionalIntensity: 0.8, dialogueDriven: 0.6, artHouse: 0.4, eraFeel: 0.9 }
  },
  {
    id: 37, title: "Hereditary", year: 2018, director: "Ari Aster",
    cast: ["Toni Collette", "Milly Shapiro", "Gabriel Byrne"],
    genres: ["horror", "drama", "mystery"], moods: ["disturbing", "dark", "tense", "melancholic"],
    themes: ["grief", "family", "fate", "trauma"],
    rating: 7.3, runtime: 127,
    overview: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.",
    features: { pacing: 0.35, complexity: 0.7, popularity: 0.65, visualStyle: 0.75, emotionalIntensity: 0.95, dialogueDriven: 0.5, artHouse: 0.65, eraFeel: 0.9 }
  },
  {
    id: 38, title: "The Shining", year: 1980, director: "Stanley Kubrick",
    cast: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
    genres: ["horror", "drama"], moods: ["disturbing", "tense", "dark", "mysterious"],
    themes: ["isolation", "madness", "family", "evil"],
    rating: 8.4, runtime: 146,
    overview: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.",
    features: { pacing: 0.3, complexity: 0.7, popularity: 0.9, visualStyle: 0.85, emotionalIntensity: 0.9, dialogueDriven: 0.45, artHouse: 0.55, eraFeel: 0.25 }
  },
  {
    id: 39, title: "Alien", year: 1979, director: "Ridley Scott",
    cast: ["Sigourney Weaver", "Tom Skerritt", "John Hurt"],
    genres: ["horror", "scifi"], moods: ["tense", "dark", "disturbing", "mysterious"],
    themes: ["survival", "isolation", "corporate greed", "fear"],
    rating: 8.5, runtime: 117,
    overview: "The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.",
    features: { pacing: 0.45, complexity: 0.45, popularity: 0.88, visualStyle: 0.8, emotionalIntensity: 0.85, dialogueDriven: 0.4, artHouse: 0.35, eraFeel: 0.2 }
  },
  {
    id: 40, title: "A Quiet Place", year: 2018, director: "John Krasinski",
    cast: ["Emily Blunt", "John Krasinski", "Millicent Simmonds"],
    genres: ["horror", "drama", "scifi"], moods: ["tense", "dark", "heartwarming"],
    themes: ["family", "survival", "silence", "sacrifice"],
    rating: 7.5, runtime: 90,
    overview: "In a post-apocalyptic world, a family must live in silence while hiding from monsters with ultra-sensitive hearing.",
    features: { pacing: 0.6, complexity: 0.35, popularity: 0.8, visualStyle: 0.55, emotionalIntensity: 0.85, dialogueDriven: 0.1, artHouse: 0.25, eraFeel: 0.9 }
  },
  {
    id: 41, title: "Midsommar", year: 2019, director: "Ari Aster",
    cast: ["Florence Pugh", "Jack Reynor", "Vilhelm Blomgren"],
    genres: ["horror", "drama", "mystery"], moods: ["disturbing", "mysterious", "dark", "whimsical"],
    themes: ["grief", "relationships", "cult", "ritual"],
    rating: 7.1, runtime: 148,
    overview: "A couple travels to Northern Europe to visit a rural hometown's fabled mid-summer festival, but what begins as an idyllic retreat darkens.",
    features: { pacing: 0.25, complexity: 0.7, popularity: 0.6, visualStyle: 0.9, emotionalIntensity: 0.85, dialogueDriven: 0.45, artHouse: 0.75, eraFeel: 0.9 }
  },
  {
    id: 42, title: "The Silence of the Lambs", year: 1991, director: "Jonathan Demme",
    cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
    genres: ["horror", "thriller", "crime"], moods: ["tense", "dark", "mysterious", "disturbing"],
    themes: ["evil", "intelligence", "manipulation", "courage"],
    rating: 8.6, runtime: 118,
    overview: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to catch another serial killer.",
    features: { pacing: 0.55, complexity: 0.65, popularity: 0.9, visualStyle: 0.45, emotionalIntensity: 0.85, dialogueDriven: 0.8, artHouse: 0.25, eraFeel: 0.4 }
  },
  {
    id: 43, title: "28 Days Later", year: 2002, director: "Danny Boyle",
    cast: ["Cillian Murphy", "Naomie Harris", "Brendan Gleeson"],
    genres: ["horror", "scifi", "drama"], moods: ["dark", "tense", "disturbing", "melancholic"],
    themes: ["survival", "humanity", "society", "rage"],
    rating: 7.5, runtime: 113,
    overview: "A man awakens from a coma to find London deserted and ravaged by a deadly virus that turns its victims into bloodthirsty predators.",
    features: { pacing: 0.7, complexity: 0.45, popularity: 0.72, visualStyle: 0.65, emotionalIntensity: 0.8, dialogueDriven: 0.4, artHouse: 0.35, eraFeel: 0.7 }
  },

  // === SCI-FI ===
  {
    id: 44, title: "Blade Runner 2049", year: 2017, director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    genres: ["scifi", "drama", "mystery"], moods: ["melancholic", "mysterious", "thoughtful", "dark"],
    themes: ["identity", "humanity", "memory", "purpose"],
    rating: 8.0, runtime: 164,
    overview: "A young blade runner's discovery of a long-buried secret leads him on a quest to track down former blade runner Rick Deckard.",
    features: { pacing: 0.25, complexity: 0.75, popularity: 0.7, visualStyle: 0.95, emotionalIntensity: 0.7, dialogueDriven: 0.5, artHouse: 0.65, eraFeel: 0.85 }
  },
  {
    id: 45, title: "Interstellar", year: 2014, director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    genres: ["scifi", "drama", "adventure"], moods: ["inspiring", "melancholic", "exciting", "thoughtful"],
    themes: ["love", "time", "exploration", "sacrifice"],
    rating: 8.7, runtime: 169,
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth becomes uninhabitable.",
    features: { pacing: 0.5, complexity: 0.85, popularity: 0.92, visualStyle: 0.85, emotionalIntensity: 0.9, dialogueDriven: 0.55, artHouse: 0.35, eraFeel: 0.85 }
  },
  {
    id: 46, title: "Arrival", year: 2016, director: "Denis Villeneuve",
    cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"],
    genres: ["scifi", "drama", "mystery"], moods: ["thoughtful", "melancholic", "mysterious", "inspiring"],
    themes: ["communication", "time", "loss", "language"],
    rating: 7.9, runtime: 116,
    overview: "A linguist is recruited by the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
    features: { pacing: 0.3, complexity: 0.8, popularity: 0.72, visualStyle: 0.7, emotionalIntensity: 0.8, dialogueDriven: 0.6, artHouse: 0.55, eraFeel: 0.85 }
  },
  {
    id: 47, title: "Ex Machina", year: 2014, director: "Alex Garland",
    cast: ["Domhnall Gleeson", "Alicia Vikander", "Oscar Isaac"],
    genres: ["scifi", "thriller", "drama"], moods: ["tense", "mysterious", "thoughtful", "disturbing"],
    themes: ["consciousness", "manipulation", "technology", "gender"],
    rating: 7.7, runtime: 108,
    overview: "A young programmer is selected to participate in a groundbreaking experiment in synthetic intelligence by evaluating a highly advanced humanoid A.I.",
    features: { pacing: 0.4, complexity: 0.75, popularity: 0.68, visualStyle: 0.7, emotionalIntensity: 0.7, dialogueDriven: 0.75, artHouse: 0.55, eraFeel: 0.9 }
  },
  {
    id: 48, title: "2001: A Space Odyssey", year: 1968, director: "Stanley Kubrick",
    cast: ["Keir Dullea", "Gary Lockwood", "William Sylvester"],
    genres: ["scifi", "mystery"], moods: ["mysterious", "thoughtful", "dark"],
    themes: ["evolution", "technology", "humanity", "infinity"],
    rating: 8.3, runtime: 149,
    overview: "After uncovering a mysterious artifact buried beneath the lunar surface, a spacecraft is sent to Jupiter with an advanced computer.",
    features: { pacing: 0.15, complexity: 0.9, popularity: 0.75, visualStyle: 0.95, emotionalIntensity: 0.5, dialogueDriven: 0.2, artHouse: 0.85, eraFeel: 0.1 }
  },
  {
    id: 49, title: "The Martian", year: 2015, director: "Ridley Scott",
    cast: ["Matt Damon", "Jessica Chastain", "Kristen Wiig"],
    genres: ["scifi", "adventure", "drama"], moods: ["inspiring", "funny", "exciting", "uplifting"],
    themes: ["survival", "ingenuity", "teamwork", "resilience"],
    rating: 8.0, runtime: 144,
    overview: "An astronaut becomes stranded on Mars after his team assumes him dead, and must rely on his ingenuity to survive.",
    features: { pacing: 0.6, complexity: 0.45, popularity: 0.88, visualStyle: 0.55, emotionalIntensity: 0.6, dialogueDriven: 0.55, artHouse: 0.1, eraFeel: 0.85 }
  },
  {
    id: 50, title: "Inception", year: 2010, director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    genres: ["scifi", "action", "thriller"], moods: ["exciting", "mysterious", "tense", "thoughtful"],
    themes: ["dreams", "reality", "guilt", "letting go"],
    rating: 8.8, runtime: 148,
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    features: { pacing: 0.75, complexity: 0.9, popularity: 0.95, visualStyle: 0.8, emotionalIntensity: 0.75, dialogueDriven: 0.6, artHouse: 0.25, eraFeel: 0.85 }
  },
  {
    id: 51, title: "Edge of Tomorrow", year: 2014, director: "Doug Liman",
    cast: ["Tom Cruise", "Emily Blunt", "Bill Paxton"],
    genres: ["scifi", "action"], moods: ["exciting", "funny", "tense"],
    themes: ["time loop", "courage", "growth", "sacrifice"],
    rating: 7.9, runtime: 113,
    overview: "A soldier fighting aliens gets caught in a time loop, reliving the same day of combat over and over, becoming a better warrior with each cycle.",
    features: { pacing: 0.85, complexity: 0.55, popularity: 0.75, visualStyle: 0.6, emotionalIntensity: 0.6, dialogueDriven: 0.4, artHouse: 0.1, eraFeel: 0.85 }
  },
  {
    id: 52, title: "District 9", year: 2009, director: "Neill Blomkamp",
    cast: ["Sharlto Copley", "David James", "Jason Cope"],
    genres: ["scifi", "action", "thriller"], moods: ["dark", "tense", "thoughtful", "exciting"],
    themes: ["apartheid", "xenophobia", "humanity", "transformation"],
    rating: 7.9, runtime: 112,
    overview: "Violence erupts after an idealistic government agent is contracted to relocate a colony of aliens living in slum-like conditions.",
    features: { pacing: 0.7, complexity: 0.55, popularity: 0.68, visualStyle: 0.65, emotionalIntensity: 0.75, dialogueDriven: 0.45, artHouse: 0.35, eraFeel: 0.8 }
  },
  {
    id: 53, title: "Dune", year: 2021, director: "Denis Villeneuve",
    cast: ["Timoth\u00e9e Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
    genres: ["scifi", "adventure", "drama"], moods: ["exciting", "mysterious", "dark", "inspiring"],
    themes: ["destiny", "power", "ecology", "colonialism"],
    rating: 8.0, runtime: 155,
    overview: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    features: { pacing: 0.45, complexity: 0.7, popularity: 0.85, visualStyle: 0.9, emotionalIntensity: 0.7, dialogueDriven: 0.5, artHouse: 0.4, eraFeel: 0.9 }
  },

  // === ROMANCE ===
  {
    id: 54, title: "Before Sunrise", year: 1995, director: "Richard Linklater",
    cast: ["Ethan Hawke", "Julie Delpy"],
    genres: ["romance", "drama"], moods: ["romantic", "thoughtful", "heartwarming", "nostalgic"],
    themes: ["connection", "time", "philosophy", "youth"],
    rating: 8.1, runtime: 101,
    overview: "A young man and woman meet on a train in Europe, and end up spending one romantic evening together in Vienna.",
    features: { pacing: 0.3, complexity: 0.45, popularity: 0.55, visualStyle: 0.3, emotionalIntensity: 0.65, dialogueDriven: 0.95, artHouse: 0.65, eraFeel: 0.45 }
  },
  {
    id: 55, title: "Eternal Sunshine of the Spotless Mind", year: 2004, director: "Michel Gondry",
    cast: ["Jim Carrey", "Kate Winslet", "Tom Wilkinson"],
    genres: ["romance", "drama", "scifi"], moods: ["melancholic", "romantic", "thoughtful", "whimsical"],
    themes: ["memory", "love", "loss", "identity"],
    rating: 8.3, runtime: 108,
    overview: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    features: { pacing: 0.5, complexity: 0.8, popularity: 0.78, visualStyle: 0.75, emotionalIntensity: 0.85, dialogueDriven: 0.65, artHouse: 0.6, eraFeel: 0.7 }
  },
  {
    id: 56, title: "La La Land", year: 2016, director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend"],
    genres: ["romance", "drama", "musical"], moods: ["romantic", "melancholic", "uplifting", "nostalgic"],
    themes: ["dreams", "love", "sacrifice", "ambition"],
    rating: 8.0, runtime: 128,
    overview: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    features: { pacing: 0.5, complexity: 0.45, popularity: 0.85, visualStyle: 0.85, emotionalIntensity: 0.75, dialogueDriven: 0.5, artHouse: 0.4, eraFeel: 0.85 }
  },
  {
    id: 57, title: "Pride and Prejudice", year: 2005, director: "Joe Wright",
    cast: ["Keira Knightley", "Matthew Macfadyen", "Brenda Blethyn"],
    genres: ["romance", "drama"], moods: ["romantic", "whimsical", "heartwarming", "nostalgic"],
    themes: ["class", "pride", "love", "family"],
    rating: 7.8, runtime: 129,
    overview: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy in Jane Austen's beloved story of love and social standing.",
    features: { pacing: 0.4, complexity: 0.4, popularity: 0.78, visualStyle: 0.65, emotionalIntensity: 0.6, dialogueDriven: 0.8, artHouse: 0.3, eraFeel: 0.65 }
  },
  {
    id: 58, title: "Call Me by Your Name", year: 2017, director: "Luca Guadagnino",
    cast: ["Timoth\u00e9e Chalamet", "Armie Hammer", "Michael Stuhlbarg"],
    genres: ["romance", "drama"], moods: ["romantic", "melancholic", "heartwarming", "nostalgic"],
    themes: ["first love", "desire", "summer", "identity"],
    rating: 7.9, runtime: 132,
    overview: "In 1980s Italy, a romance blossoms between a seventeen-year-old student and the older man hired as his father's research assistant.",
    features: { pacing: 0.2, complexity: 0.45, popularity: 0.65, visualStyle: 0.7, emotionalIntensity: 0.8, dialogueDriven: 0.6, artHouse: 0.65, eraFeel: 0.8 }
  },
  {
    id: 59, title: "When Harry Met Sally", year: 1989, director: "Rob Reiner",
    cast: ["Billy Crystal", "Meg Ryan", "Carrie Fisher"],
    genres: ["romance", "comedy"], moods: ["funny", "romantic", "heartwarming", "nostalgic"],
    themes: ["friendship", "love", "timing", "gender"],
    rating: 7.7, runtime: 95,
    overview: "Harry and Sally have known each other for years, and are very good friends, but they fear sex would ruin the friendship.",
    features: { pacing: 0.55, complexity: 0.3, popularity: 0.82, visualStyle: 0.2, emotionalIntensity: 0.5, dialogueDriven: 0.9, artHouse: 0.15, eraFeel: 0.35 }
  },
  {
    id: 60, title: "About Time", year: 2013, director: "Richard Curtis",
    cast: ["Domhnall Gleeson", "Rachel McAdams", "Bill Nighy"],
    genres: ["romance", "comedy", "fantasy"], moods: ["heartwarming", "romantic", "funny", "uplifting"],
    themes: ["time", "family", "love", "appreciation"],
    rating: 7.8, runtime: 123,
    overview: "A young man with the ability to time travel tries to change his past in order to improve his future, learning what truly matters along the way.",
    features: { pacing: 0.5, complexity: 0.4, popularity: 0.72, visualStyle: 0.35, emotionalIntensity: 0.7, dialogueDriven: 0.65, artHouse: 0.15, eraFeel: 0.8 }
  },
  {
    id: 61, title: "500 Days of Summer", year: 2009, director: "Marc Webb",
    cast: ["Joseph Gordon-Levitt", "Zooey Deschanel", "Geoffrey Arend"],
    genres: ["romance", "comedy", "drama"], moods: ["melancholic", "funny", "romantic", "whimsical"],
    themes: ["expectations", "reality", "heartbreak", "growth"],
    rating: 7.7, runtime: 95,
    overview: "After being dumped by the girl he believes to be his soulmate, a greeting card writer reflects on their relationship to try to figure out where things went wrong.",
    features: { pacing: 0.6, complexity: 0.5, popularity: 0.75, visualStyle: 0.55, emotionalIntensity: 0.65, dialogueDriven: 0.7, artHouse: 0.35, eraFeel: 0.8 }
  },

  // === THRILLER ===
  {
    id: 62, title: "Se7en", year: 1995, director: "David Fincher",
    cast: ["Brad Pitt", "Morgan Freeman", "Gwyneth Paltrow"],
    genres: ["thriller", "crime", "mystery"], moods: ["dark", "tense", "disturbing", "mysterious"],
    themes: ["sin", "evil", "justice", "obsession"],
    rating: 8.6, runtime: 127,
    overview: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    features: { pacing: 0.55, complexity: 0.65, popularity: 0.88, visualStyle: 0.7, emotionalIntensity: 0.9, dialogueDriven: 0.6, artHouse: 0.3, eraFeel: 0.5 }
  },
  {
    id: 63, title: "Zodiac", year: 2007, director: "David Fincher",
    cast: ["Jake Gyllenhaal", "Robert Downey Jr.", "Mark Ruffalo"],
    genres: ["thriller", "crime", "mystery"], moods: ["tense", "mysterious", "dark", "thoughtful"],
    themes: ["obsession", "truth", "fear", "investigation"],
    rating: 7.7, runtime: 157,
    overview: "In the late 1960s/early 1970s, a cartoonist becomes an amateur detective obsessed with tracking down the elusive Zodiac killer.",
    features: { pacing: 0.35, complexity: 0.7, popularity: 0.68, visualStyle: 0.5, emotionalIntensity: 0.65, dialogueDriven: 0.7, artHouse: 0.4, eraFeel: 0.7 }
  },
  {
    id: 64, title: "No Country for Old Men", year: 2007, director: "Joel & Ethan Coen",
    cast: ["Javier Bardem", "Josh Brolin", "Tommy Lee Jones"],
    genres: ["thriller", "crime", "drama"], moods: ["tense", "dark", "thoughtful", "disturbing"],
    themes: ["fate", "violence", "morality", "aging"],
    rating: 8.2, runtime: 122,
    overview: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
    features: { pacing: 0.45, complexity: 0.7, popularity: 0.78, visualStyle: 0.6, emotionalIntensity: 0.8, dialogueDriven: 0.55, artHouse: 0.5, eraFeel: 0.7 }
  },
  {
    id: 65, title: "Sicario", year: 2015, director: "Denis Villeneuve",
    cast: ["Emily Blunt", "Benicio del Toro", "Josh Brolin"],
    genres: ["thriller", "action", "crime"], moods: ["tense", "dark", "disturbing"],
    themes: ["morality", "corruption", "war on drugs", "disillusionment"],
    rating: 7.6, runtime: 121,
    overview: "An idealistic FBI agent is enlisted by a government task force to aid in the escalating war against drugs at the border area between the U.S. and Mexico.",
    features: { pacing: 0.55, complexity: 0.6, popularity: 0.7, visualStyle: 0.7, emotionalIntensity: 0.85, dialogueDriven: 0.45, artHouse: 0.35, eraFeel: 0.85 }
  },
  {
    id: 66, title: "Gone Girl", year: 2014, director: "David Fincher",
    cast: ["Ben Affleck", "Rosamund Pike", "Neil Patrick Harris"],
    genres: ["thriller", "drama", "mystery"], moods: ["tense", "dark", "disturbing", "mysterious"],
    themes: ["marriage", "media", "deception", "identity"],
    rating: 8.1, runtime: 149,
    overview: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him.",
    features: { pacing: 0.55, complexity: 0.75, popularity: 0.82, visualStyle: 0.55, emotionalIntensity: 0.8, dialogueDriven: 0.7, artHouse: 0.3, eraFeel: 0.85 }
  },
  {
    id: 67, title: "Prisoners", year: 2013, director: "Denis Villeneuve",
    cast: ["Hugh Jackman", "Jake Gyllenhaal", "Viola Davis"],
    genres: ["thriller", "crime", "drama", "mystery"], moods: ["tense", "dark", "disturbing", "melancholic"],
    themes: ["desperation", "justice", "faith", "morality"],
    rating: 8.1, runtime: 153,
    overview: "When his daughter and her friend go missing, a father takes matters into his own hands while the police pursue multiple leads.",
    features: { pacing: 0.45, complexity: 0.7, popularity: 0.72, visualStyle: 0.55, emotionalIntensity: 0.95, dialogueDriven: 0.6, artHouse: 0.35, eraFeel: 0.85 }
  },
  {
    id: 68, title: "Nightcrawler", year: 2014, director: "Dan Gilroy",
    cast: ["Jake Gyllenhaal", "Rene Russo", "Riz Ahmed"],
    genres: ["thriller", "crime", "drama"], moods: ["dark", "tense", "disturbing"],
    themes: ["ambition", "media", "morality", "sociopathy"],
    rating: 7.9, runtime: 117,
    overview: "A driven young man stumbles upon the nocturnal world of freelance crime journalism in Los Angeles, blurring the line between observer and participant.",
    features: { pacing: 0.6, complexity: 0.55, popularity: 0.65, visualStyle: 0.6, emotionalIntensity: 0.75, dialogueDriven: 0.65, artHouse: 0.4, eraFeel: 0.85 }
  },
  {
    id: 69, title: "Shutter Island", year: 2010, director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Mark Ruffalo", "Ben Kingsley"],
    genres: ["thriller", "mystery", "drama"], moods: ["mysterious", "tense", "dark", "disturbing"],
    themes: ["madness", "trauma", "truth", "identity"],
    rating: 8.2, runtime: 138,
    overview: "A U.S. Marshal investigates the disappearance of a patient from a hospital for the criminally insane, but nothing is as it seems.",
    features: { pacing: 0.5, complexity: 0.8, popularity: 0.85, visualStyle: 0.7, emotionalIntensity: 0.8, dialogueDriven: 0.6, artHouse: 0.3, eraFeel: 0.7 }
  },
  {
    id: 70, title: "The Prestige", year: 2006, director: "Christopher Nolan",
    cast: ["Christian Bale", "Hugh Jackman", "Scarlett Johansson"],
    genres: ["thriller", "mystery", "drama"], moods: ["mysterious", "tense", "dark", "exciting"],
    themes: ["obsession", "sacrifice", "rivalry", "deception"],
    rating: 8.5, runtime: 130,
    overview: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything to outdo each other.",
    features: { pacing: 0.65, complexity: 0.85, popularity: 0.82, visualStyle: 0.6, emotionalIntensity: 0.75, dialogueDriven: 0.65, artHouse: 0.25, eraFeel: 0.7 }
  },
  {
    id: 71, title: "Memento", year: 2000, director: "Christopher Nolan",
    cast: ["Guy Pearce", "Carrie-Anne Moss", "Joe Pantoliano"],
    genres: ["thriller", "mystery"], moods: ["mysterious", "tense", "dark", "thoughtful"],
    themes: ["memory", "truth", "revenge", "identity"],
    rating: 8.4, runtime: 113,
    overview: "A man with short-term memory loss attempts to track down his wife's murderer using an elaborate system of notes and tattoos.",
    features: { pacing: 0.6, complexity: 0.9, popularity: 0.75, visualStyle: 0.55, emotionalIntensity: 0.7, dialogueDriven: 0.6, artHouse: 0.45, eraFeel: 0.65 }
  },

  // === ANIMATION ===
  {
    id: 72, title: "Spirited Away", year: 2001, director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    genres: ["animation", "fantasy", "adventure"], moods: ["whimsical", "mysterious", "heartwarming", "inspiring"],
    themes: ["courage", "greed", "identity", "nature"],
    rating: 8.6, runtime: 125,
    overview: "During her family's move, a young girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
    features: { pacing: 0.45, complexity: 0.55, popularity: 0.82, visualStyle: 0.95, emotionalIntensity: 0.65, dialogueDriven: 0.4, artHouse: 0.55, eraFeel: 0.6 }
  },
  {
    id: 73, title: "Spider-Man: Into the Spider-Verse", year: 2018, director: "Bob Persichetti, Peter Ramsey",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
    genres: ["animation", "action", "adventure"], moods: ["exciting", "funny", "inspiring", "uplifting"],
    themes: ["identity", "heroism", "family", "belonging"],
    rating: 8.4, runtime: 117,
    overview: "Teen Miles Morales becomes the Spider-Man of his reality, crossing his path with counterparts from other dimensions.",
    features: { pacing: 0.8, complexity: 0.5, popularity: 0.85, visualStyle: 0.98, emotionalIntensity: 0.65, dialogueDriven: 0.5, artHouse: 0.3, eraFeel: 0.95 }
  },
  {
    id: 74, title: "WALL-E", year: 2008, director: "Andrew Stanton",
    cast: ["Ben Burtt", "Elissa Knight", "Jeff Garlin"],
    genres: ["animation", "scifi", "romance"], moods: ["heartwarming", "whimsical", "melancholic", "inspiring"],
    themes: ["love", "environment", "loneliness", "humanity"],
    rating: 8.4, runtime: 98,
    overview: "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
    features: { pacing: 0.5, complexity: 0.4, popularity: 0.85, visualStyle: 0.8, emotionalIntensity: 0.7, dialogueDriven: 0.1, artHouse: 0.35, eraFeel: 0.75 }
  },
  {
    id: 75, title: "Ratatouille", year: 2007, director: "Brad Bird",
    cast: ["Patton Oswalt", "Ian Holm", "Lou Romano"],
    genres: ["animation", "comedy", "family"], moods: ["heartwarming", "funny", "inspiring", "whimsical"],
    themes: ["passion", "creativity", "belonging", "perseverance"],
    rating: 8.1, runtime: 111,
    overview: "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant.",
    features: { pacing: 0.6, complexity: 0.35, popularity: 0.85, visualStyle: 0.75, emotionalIntensity: 0.55, dialogueDriven: 0.5, artHouse: 0.2, eraFeel: 0.7 }
  },
  {
    id: 76, title: "Coco", year: 2017, director: "Lee Unkrich",
    cast: ["Anthony Gonzalez", "Gael Garc\u00eda Bernal", "Benjamin Bratt"],
    genres: ["animation", "fantasy", "family", "musical"], moods: ["heartwarming", "uplifting", "melancholic", "inspiring"],
    themes: ["family", "memory", "death", "music"],
    rating: 8.4, runtime: 105,
    overview: "A boy who dreams of becoming a musician is transported to the Land of the Dead, where he seeks the help of his great-great-grandfather.",
    features: { pacing: 0.6, complexity: 0.4, popularity: 0.88, visualStyle: 0.85, emotionalIntensity: 0.8, dialogueDriven: 0.45, artHouse: 0.15, eraFeel: 0.85 }
  },
  {
    id: 77, title: "Princess Mononoke", year: 1997, director: "Hayao Miyazaki",
    cast: ["Y\u014dji Matsuda", "Yuriko Ishida", "Y\u016bko Tanaka"],
    genres: ["animation", "fantasy", "adventure"], moods: ["exciting", "dark", "thoughtful", "inspiring"],
    themes: ["nature", "industrialization", "war", "balance"],
    rating: 8.4, runtime: 134,
    overview: "On a journey to find a cure for a curse, a young prince finds himself in the middle of a war between the gods of a forest and the humans who consume its resources.",
    features: { pacing: 0.55, complexity: 0.65, popularity: 0.7, visualStyle: 0.9, emotionalIntensity: 0.75, dialogueDriven: 0.4, artHouse: 0.55, eraFeel: 0.45 }
  },
  {
    id: 78, title: "Fantastic Mr. Fox", year: 2009, director: "Wes Anderson",
    cast: ["George Clooney", "Meryl Streep", "Bill Murray"],
    genres: ["animation", "comedy", "adventure"], moods: ["funny", "whimsical", "heartwarming"],
    themes: ["identity", "family", "rebellion", "nature"],
    rating: 7.9, runtime: 87,
    overview: "An urbane fox cannot resist returning to his farm raiding ways, and then must help his community survive the farmers' retaliation.",
    features: { pacing: 0.65, complexity: 0.4, popularity: 0.65, visualStyle: 0.9, emotionalIntensity: 0.4, dialogueDriven: 0.65, artHouse: 0.6, eraFeel: 0.75 }
  },
  {
    id: 79, title: "Akira", year: 1988, director: "Katsuhiro Otomo",
    cast: ["Mitsuo Iwata", "Nozomu Sasaki", "Mami Koyama"],
    genres: ["animation", "scifi", "action"], moods: ["exciting", "dark", "disturbing", "mysterious"],
    themes: ["power", "corruption", "youth", "destruction"],
    rating: 8.0, runtime: 124,
    overview: "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath.",
    features: { pacing: 0.75, complexity: 0.7, popularity: 0.6, visualStyle: 0.9, emotionalIntensity: 0.8, dialogueDriven: 0.35, artHouse: 0.55, eraFeel: 0.3 }
  },

  // === CRIME ===
  {
    id: 80, title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    genres: ["crime", "drama", "comedy"], moods: ["funny", "dark", "exciting", "tense"],
    themes: ["violence", "redemption", "fate", "pop culture"],
    rating: 8.9, runtime: 154,
    overview: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    features: { pacing: 0.65, complexity: 0.75, popularity: 0.95, visualStyle: 0.65, emotionalIntensity: 0.7, dialogueDriven: 0.9, artHouse: 0.4, eraFeel: 0.5 }
  },
  {
    id: 81, title: "The Departed", year: 2006, director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"],
    genres: ["crime", "drama", "thriller"], moods: ["tense", "dark", "exciting"],
    themes: ["identity", "loyalty", "betrayal", "corruption"],
    rating: 8.5, runtime: 151,
    overview: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    features: { pacing: 0.7, complexity: 0.7, popularity: 0.88, visualStyle: 0.45, emotionalIntensity: 0.85, dialogueDriven: 0.7, artHouse: 0.2, eraFeel: 0.75 }
  },
  {
    id: 82, title: "City of God", year: 2002, director: "Fernando Meirelles",
    cast: ["Alexandre Rodrigues", "Leandro Firmino", "Matheus Nachtergaele"],
    genres: ["crime", "drama"], moods: ["dark", "exciting", "tense", "melancholic"],
    themes: ["poverty", "violence", "fate", "survival"],
    rating: 8.6, runtime: 130,
    overview: "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a drug dealer.",
    features: { pacing: 0.8, complexity: 0.65, popularity: 0.68, visualStyle: 0.75, emotionalIntensity: 0.85, dialogueDriven: 0.55, artHouse: 0.45, eraFeel: 0.7 }
  },
  {
    id: 83, title: "Goodfellas", year: 1990, director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    genres: ["crime", "drama"], moods: ["exciting", "dark", "funny", "tense"],
    themes: ["ambition", "betrayal", "loyalty", "greed"],
    rating: 8.7, runtime: 146,
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his mob partners.",
    features: { pacing: 0.75, complexity: 0.55, popularity: 0.9, visualStyle: 0.55, emotionalIntensity: 0.8, dialogueDriven: 0.75, artHouse: 0.2, eraFeel: 0.4 }
  },
  {
    id: 84, title: "Fargo", year: 1996, director: "Joel & Ethan Coen",
    cast: ["Frances McDormand", "William H. Macy", "Steve Buscemi"],
    genres: ["crime", "comedy", "thriller"], moods: ["dark", "funny", "tense", "whimsical"],
    themes: ["greed", "incompetence", "determination", "ordinary evil"],
    rating: 8.1, runtime: 98,
    overview: "A car salesman hires two criminals to kidnap his wife for ransom, but a pregnant police chief investigates the resulting murders.",
    features: { pacing: 0.5, complexity: 0.5, popularity: 0.78, visualStyle: 0.45, emotionalIntensity: 0.6, dialogueDriven: 0.7, artHouse: 0.4, eraFeel: 0.5 }
  },
  {
    id: 85, title: "Training Day", year: 2001, director: "Antoine Fuqua",
    cast: ["Denzel Washington", "Ethan Hawke", "Scott Glenn"],
    genres: ["crime", "thriller", "drama"], moods: ["tense", "dark", "exciting"],
    themes: ["corruption", "morality", "power", "initiation"],
    rating: 7.7, runtime: 122,
    overview: "A rookie cop spends his first day on the job with a corrupt narcotics detective who initiates him into the dark side of law enforcement.",
    features: { pacing: 0.7, complexity: 0.5, popularity: 0.82, visualStyle: 0.4, emotionalIntensity: 0.8, dialogueDriven: 0.7, artHouse: 0.15, eraFeel: 0.65 }
  },

  // === FANTASY / ADVENTURE ===
  {
    id: 86, title: "Pan's Labyrinth", year: 2006, director: "Guillermo del Toro",
    cast: ["Ivana Baquero", "Sergi L\u00f3pez", "Maribel Verd\u00fa"],
    genres: ["fantasy", "drama", "war"], moods: ["dark", "whimsical", "melancholic", "mysterious"],
    themes: ["innocence", "fascism", "imagination", "sacrifice"],
    rating: 8.2, runtime: 118,
    overview: "In the Falangist Spain of 1944, a girl fascinated with fairy-tales is sent along with her mother to live with her new stepfather, a brutal army officer.",
    features: { pacing: 0.45, complexity: 0.65, popularity: 0.72, visualStyle: 0.9, emotionalIntensity: 0.85, dialogueDriven: 0.4, artHouse: 0.6, eraFeel: 0.7 }
  },
  {
    id: 87, title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
    genres: ["fantasy", "adventure", "action"], moods: ["exciting", "inspiring", "dark", "nostalgic"],
    themes: ["friendship", "courage", "good vs evil", "sacrifice"],
    rating: 8.8, runtime: 178,
    overview: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth.",
    features: { pacing: 0.55, complexity: 0.6, popularity: 0.95, visualStyle: 0.85, emotionalIntensity: 0.8, dialogueDriven: 0.5, artHouse: 0.15, eraFeel: 0.6 }
  },
  {
    id: 88, title: "The Princess Bride", year: 1987, director: "Rob Reiner",
    cast: ["Cary Elwes", "Robin Wright", "Mandy Patinkin"],
    genres: ["fantasy", "adventure", "comedy", "romance"], moods: ["funny", "romantic", "whimsical", "exciting"],
    themes: ["true love", "adventure", "humor", "friendship"],
    rating: 8.0, runtime: 98,
    overview: "While home sick in bed, a young boy is read a story by his grandfather about a farmboy-turned-pirate who encounters numerous obstacles to be reunited with his true love.",
    features: { pacing: 0.65, complexity: 0.25, popularity: 0.82, visualStyle: 0.35, emotionalIntensity: 0.4, dialogueDriven: 0.7, artHouse: 0.1, eraFeel: 0.25 }
  },
  {
    id: 89, title: "Pirates of the Caribbean: The Curse of the Black Pearl", year: 2003, director: "Gore Verbinski",
    cast: ["Johnny Depp", "Geoffrey Rush", "Orlando Bloom"],
    genres: ["adventure", "fantasy", "action"], moods: ["exciting", "funny", "whimsical"],
    themes: ["freedom", "piracy", "honor", "adventure"],
    rating: 8.1, runtime: 143,
    overview: "Blacksmith Will Turner teams up with eccentric pirate Captain Jack Sparrow to save his love from Jack's former pirate allies.",
    features: { pacing: 0.75, complexity: 0.35, popularity: 0.93, visualStyle: 0.6, emotionalIntensity: 0.5, dialogueDriven: 0.55, artHouse: 0.05, eraFeel: 0.7 }
  },
  {
    id: 90, title: "Jurassic Park", year: 1993, director: "Steven Spielberg",
    cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
    genres: ["adventure", "scifi", "thriller"], moods: ["exciting", "tense", "whimsical"],
    themes: ["nature", "technology", "hubris", "survival"],
    rating: 8.2, runtime: 127,
    overview: "A pragmatic paleontologist touring an almost complete theme park of cloned dinosaurs is asked to endorse the park, but all hell breaks loose.",
    features: { pacing: 0.7, complexity: 0.4, popularity: 0.95, visualStyle: 0.7, emotionalIntensity: 0.65, dialogueDriven: 0.45, artHouse: 0.05, eraFeel: 0.4 }
  },

  // === WAR ===
  {
    id: 91, title: "Saving Private Ryan", year: 1998, director: "Steven Spielberg",
    cast: ["Tom Hanks", "Matt Damon", "Tom Sizemore"],
    genres: ["war", "drama"], moods: ["dark", "inspiring", "melancholic", "tense"],
    themes: ["sacrifice", "duty", "brotherhood", "war"],
    rating: 8.6, runtime: 169,
    overview: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    features: { pacing: 0.65, complexity: 0.45, popularity: 0.92, visualStyle: 0.7, emotionalIntensity: 0.95, dialogueDriven: 0.45, artHouse: 0.15, eraFeel: 0.55 }
  },
  {
    id: 92, title: "Dunkirk", year: 2017, director: "Christopher Nolan",
    cast: ["Fionn Whitehead", "Tom Hardy", "Mark Rylance"],
    genres: ["war", "drama", "action"], moods: ["tense", "dark", "inspiring"],
    themes: ["survival", "heroism", "time", "sacrifice"],
    rating: 7.8, runtime: 106,
    overview: "Allied soldiers from Belgium, the British Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II.",
    features: { pacing: 0.75, complexity: 0.6, popularity: 0.78, visualStyle: 0.75, emotionalIntensity: 0.85, dialogueDriven: 0.15, artHouse: 0.4, eraFeel: 0.85 }
  },
  {
    id: 93, title: "Apocalypse Now", year: 1979, director: "Francis Ford Coppola",
    cast: ["Martin Sheen", "Marlon Brando", "Robert Duvall"],
    genres: ["war", "drama"], moods: ["dark", "disturbing", "mysterious", "thoughtful"],
    themes: ["madness", "war", "morality", "colonialism"],
    rating: 8.4, runtime: 147,
    overview: "A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces colonel who has set himself up as a god among a local tribe.",
    features: { pacing: 0.35, complexity: 0.8, popularity: 0.82, visualStyle: 0.85, emotionalIntensity: 0.9, dialogueDriven: 0.55, artHouse: 0.6, eraFeel: 0.2 }
  },
  {
    id: 94, title: "1917", year: 2019, director: "Sam Mendes",
    cast: ["George MacKay", "Dean-Charles Chapman", "Mark Strong"],
    genres: ["war", "drama"], moods: ["tense", "dark", "inspiring", "melancholic"],
    themes: ["duty", "survival", "brotherhood", "time"],
    rating: 8.3, runtime: 119,
    overview: "Two young British soldiers during World War I are given a seemingly impossible mission to deliver a message that will save 1,600 men from a deadly trap.",
    features: { pacing: 0.7, complexity: 0.4, popularity: 0.8, visualStyle: 0.85, emotionalIntensity: 0.85, dialogueDriven: 0.3, artHouse: 0.35, eraFeel: 0.9 }
  },
  {
    id: 95, title: "Full Metal Jacket", year: 1987, director: "Stanley Kubrick",
    cast: ["Matthew Modine", "R. Lee Ermey", "Vincent D'Onofrio"],
    genres: ["war", "drama"], moods: ["dark", "disturbing", "tense", "thoughtful"],
    themes: ["dehumanization", "war", "masculinity", "duality"],
    rating: 8.3, runtime: 116,
    overview: "A pragmatic U.S. Marine observes the dehumanizing effects the Vietnam War has on his fellow recruits from their brutal training to the horrors of combat.",
    features: { pacing: 0.55, complexity: 0.6, popularity: 0.78, visualStyle: 0.6, emotionalIntensity: 0.85, dialogueDriven: 0.6, artHouse: 0.45, eraFeel: 0.25 }
  },

  // === INDIE / ART HOUSE / MISC ===
  {
    id: 96, title: "Lost in Translation", year: 2003, director: "Sofia Coppola",
    cast: ["Bill Murray", "Scarlett Johansson", "Giovanni Ribisi"],
    genres: ["drama", "romance", "comedy"], moods: ["melancholic", "thoughtful", "romantic", "whimsical"],
    themes: ["loneliness", "connection", "displacement", "meaning"],
    rating: 7.7, runtime: 102,
    overview: "A fading movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.",
    features: { pacing: 0.2, complexity: 0.45, popularity: 0.7, visualStyle: 0.6, emotionalIntensity: 0.55, dialogueDriven: 0.6, artHouse: 0.7, eraFeel: 0.7 }
  },
  {
    id: 97, title: "Her", year: 2013, director: "Spike Jonze",
    cast: ["Joaquin Phoenix", "Scarlett Johansson", "Amy Adams"],
    genres: ["drama", "romance", "scifi"], moods: ["melancholic", "romantic", "thoughtful", "heartwarming"],
    themes: ["love", "loneliness", "technology", "humanity"],
    rating: 8.0, runtime: 126,
    overview: "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    features: { pacing: 0.3, complexity: 0.6, popularity: 0.72, visualStyle: 0.75, emotionalIntensity: 0.75, dialogueDriven: 0.75, artHouse: 0.6, eraFeel: 0.9 }
  },
  {
    id: 98, title: "Drive", year: 2011, director: "Nicolas Winding Refn",
    cast: ["Ryan Gosling", "Carey Mulligan", "Bryan Cranston"],
    genres: ["drama", "crime", "thriller"], moods: ["dark", "tense", "melancholic", "romantic"],
    themes: ["violence", "heroism", "isolation", "love"],
    rating: 7.8, runtime: 100,
    overview: "A mysterious Hollywood stuntman and mechanic moonlights as a getaway driver and finds himself in trouble when he helps his neighbor.",
    features: { pacing: 0.4, complexity: 0.4, popularity: 0.7, visualStyle: 0.8, emotionalIntensity: 0.75, dialogueDriven: 0.2, artHouse: 0.6, eraFeel: 0.85 }
  },
  {
    id: 99, title: "Mulholland Drive", year: 2001, director: "David Lynch",
    cast: ["Naomi Watts", "Laura Harring", "Justin Theroux"],
    genres: ["drama", "mystery", "thriller"], moods: ["mysterious", "dark", "disturbing", "whimsical"],
    themes: ["identity", "Hollywood", "dreams", "obsession"],
    rating: 7.9, runtime: 147,
    overview: "After a car wreck on Mulholland Drive, an amnesiac woman and an aspiring actress uncover a dark conspiracy in the heart of Hollywood.",
    features: { pacing: 0.3, complexity: 0.95, popularity: 0.55, visualStyle: 0.85, emotionalIntensity: 0.75, dialogueDriven: 0.55, artHouse: 0.9, eraFeel: 0.65 }
  },
  {
    id: 100, title: "The Truman Show", year: 1998, director: "Peter Weir",
    cast: ["Jim Carrey", "Laura Linney", "Ed Harris"],
    genres: ["drama", "comedy", "scifi"], moods: ["thoughtful", "heartwarming", "funny", "inspiring"],
    themes: ["freedom", "reality", "media", "authenticity"],
    rating: 8.2, runtime: 103,
    overview: "An insurance salesman discovers his whole life is actually a reality TV show and begins to question everything he knows.",
    features: { pacing: 0.55, complexity: 0.55, popularity: 0.85, visualStyle: 0.5, emotionalIntensity: 0.65, dialogueDriven: 0.6, artHouse: 0.35, eraFeel: 0.5 }
  }
];

// ============================================================
// Wikipedia article titles for poster image fetching
// Only entries that need disambiguation are listed here.
// Movies not listed will use: "Title_(film)" as default.
// ============================================================
const WIKI_TITLES = {
  2: "Mad Max: Fury Road",
  4: "Die Hard",
  5: "Kill Bill: Volume 1",
  6: "The Matrix",
  7: "Gladiator (2000 film)",
  8: "Top Gun: Maverick",
  9: "Casino Royale (2006 film)",
  10: "The Raid (2011 film)",
  11: "The Grand Budapest Hotel",
  13: "The Big Lebowski",
  15: "In Bruges",
  16: "Hot Fuzz",
  17: "Mean Girls",
  18: "Shaun of the Dead",
  20: "Knives Out",
  21: "The Shawshank Redemption",
  22: "There Will Be Blood",
  23: "Moonlight (2016 film)",
  24: "Parasite (2019 film)",
  25: "The Godfather",
  26: "12 Angry Men (1957 film)",
  27: "Good Will Hunting",
  28: "Whiplash (2014 film)",
  29: "Manchester by the Sea (film)",
  30: "The Pursuit of Happyness",
  31: "Forrest Gump",
  32: "Fight Club",
  33: "The Green Mile (film)",
  34: "Schindler's List",
  35: "American Beauty (film)",
  36: "Get Out",
  37: "Hereditary (film)",
  38: "The Shining (film)",
  39: "Alien (film)",
  40: "A Quiet Place",
  41: "Midsommar",
  42: "The Silence of the Lambs (film)",
  43: "28 Days Later",
  44: "Blade Runner 2049",
  45: "Interstellar (film)",
  46: "Arrival (film)",
  47: "Ex Machina (film)",
  48: "2001: A Space Odyssey (film)",
  49: "The Martian (film)",
  50: "Inception",
  51: "Edge of Tomorrow",
  52: "District 9",
  53: "Dune (2021 film)",
  54: "Before Sunrise",
  55: "Eternal Sunshine of the Spotless Mind",
  56: "La La Land",
  57: "Pride & Prejudice (2005 film)",
  58: "Call Me by Your Name (film)",
  59: "When Harry Met Sally...",
  60: "About Time (2013 film)",
  61: "(500) Days of Summer",
  62: "Se7en",
  63: "Zodiac (film)",
  64: "No Country for Old Men",
  65: "Sicario (2015 film)",
  66: "Gone Girl (film)",
  67: "Prisoners (2013 film)",
  68: "Nightcrawler (film)",
  69: "Shutter Island",
  70: "The Prestige (film)",
  71: "Memento (film)",
  72: "Spirited Away",
  73: "Spider-Man: Into the Spider-Verse",
  74: "WALL-E",
  75: "Ratatouille (film)",
  76: "Coco (2017 film)",
  77: "Princess Mononoke",
  78: "Fantastic Mr. Fox (film)",
  79: "Akira (1988 film)",
  80: "Pulp Fiction",
  81: "The Departed",
  82: "City of God (2002 film)",
  83: "Goodfellas",
  84: "Fargo (1996 film)",
  85: "Training Day",
  86: "Pan's Labyrinth",
  87: "The Lord of the Rings: The Fellowship of the Ring",
  88: "The Princess Bride (film)",
  89: "Pirates of the Caribbean: The Curse of the Black Pearl",
  90: "Jurassic Park (film)",
  91: "Saving Private Ryan",
  92: "Dunkirk (2017 film)",
  93: "Apocalypse Now",
  94: "1917 (2019 film)",
  95: "Full Metal Jacket",
  96: "Lost in Translation (film)",
  97: "Her (film)",
  98: "Drive (2011 film)",
  99: "Mulholland Drive (film)",
  100: "The Truman Show",
};

// Add language: "english" to all existing movies
MOVIES.forEach(movie => {
  if (!movie.language) movie.language = 'english';
});

// Merge regional movies into main array
MOVIES.push(...REGIONAL_MOVIES);

// Merge all wiki titles
const ALL_WIKI_TITLES = { ...WIKI_TITLES, ...REGIONAL_WIKI_TITLES };

// Apply wikiTitle, slug, watchUrl to ALL movies
MOVIES.forEach(movie => {
  // Wikipedia title
  if (ALL_WIKI_TITLES[movie.id]) {
    movie.wikiTitle = ALL_WIKI_TITLES[movie.id];
  } else if (!movie.wikiTitle) {
    movie.wikiTitle = `${movie.title} (film)`;
  }

  // JustWatch slug (auto-generated from title)
  if (!movie.slug) {
    movie.slug = movie.title
      .toLowerCase()
      .replace(/[:'.,!?]/g, '')
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // JustWatch watch URL
  if (!movie.watchUrl) {
    movie.watchUrl = `https://www.justwatch.com/us/movie/${movie.slug}`;
  }
});

// Helper: Get genre color gradient for poster placeholder
export function getMovieGradient(movie) {
  const primaryGenre = movie.genres[0];
  const colors = GENRE_COLORS[primaryGenre] || ['#4a5568', '#2d3748'];
  const secondaryGenre = movie.genres[1];
  const secondaryColors = secondaryGenre ? (GENRE_COLORS[secondaryGenre] || colors) : colors;
  return `linear-gradient(135deg, ${colors[0]} 0%, ${secondaryColors[1]} 100%)`;
}

// Helper: Get popular movies for onboarding (well-known, diverse)
export function getOnboardingMovies() {
  const ids = [1, 6, 21, 25, 31, 38, 42, 45, 50, 56, 72, 80, 87, 90, 100, 24, 55, 14, 73, 28];
  return ids.map(id => MOVIES.find(m => m.id === id)).filter(Boolean);
}

// Helper: Get movies by language
export function getMoviesByLanguage(language) {
  return MOVIES.filter(m => m.language === language);
}

// Helper: Get movies by genre across all languages
export function getMoviesByGenreAcrossLanguages(genre, language = null) {
  let filtered = MOVIES.filter(m => m.genres.includes(genre));
  if (language) filtered = filtered.filter(m => m.language === language);
  return filtered;
}
