// Regional Indian Language Movies — Tamil, Hindi, Telugu, Malayalam, Kannada
// Features: pacing(0=slow,1=fast), complexity(0=simple,1=complex), popularity(0=niche,1=mainstream),
// visualStyle(0=naturalistic,1=stylized), emotionalIntensity(0=light,1=intense),
// dialogueDriven(0=visual,1=dialogue), artHouse(0=commercial,1=arthouse), eraFeel(0=classic,1=contemporary)

export const LANGUAGES = [
  'english', 'tamil', 'hindi', 'telugu', 'malayalam', 'kannada'
];

export const REGIONAL_MOVIES = [

  // ==========================================
  // === TAMIL (10) ===
  // ==========================================
  {
    id: 101, title: "Vikram", year: 2022, director: "Lokesh Kanagaraj",
    cast: ["Kamal Haasan", "Vijay Sethupathi", "Fahadh Faasil"],
    genres: ["action", "thriller"], moods: ["exciting", "tense", "dark"],
    themes: ["revenge", "underworld", "loyalty", "deception"],
    rating: 7.4, runtime: 174,
    overview: "A retired special ops agent is drawn back into action when a series of brutal killings linked to a drug syndicate threatens his city, leading to a deadly three-way confrontation.",
    language: "tamil",
    features: { pacing: 0.85, complexity: 0.7, popularity: 0.9, visualStyle: 0.7, emotionalIntensity: 0.8, dialogueDriven: 0.4, artHouse: 0.1, eraFeel: 0.95 }
  },
  {
    id: 102, title: "Jai Bhim", year: 2021, director: "T.J. Gnanavel",
    cast: ["Suriya", "Lijomol Jose", "Manikandan"],
    genres: ["drama", "crime"], moods: ["dark", "inspiring", "tense", "thoughtful"],
    themes: ["justice", "caste discrimination", "human rights", "courage"],
    rating: 8.7, runtime: 164,
    overview: "Based on a true incident, a high court advocate takes on a case of a tribal man who was falsely accused and disappeared in police custody, fighting systemic injustice.",
    language: "tamil",
    features: { pacing: 0.6, complexity: 0.6, popularity: 0.85, visualStyle: 0.35, emotionalIntensity: 0.9, dialogueDriven: 0.75, artHouse: 0.3, eraFeel: 0.9 }
  },
  {
    id: 103, title: "Roja", year: 1992, director: "Mani Ratnam",
    cast: ["Arvind Swami", "Madhoo", "Pankaj Kapur"],
    genres: ["romance", "drama", "thriller"], moods: ["romantic", "tense", "inspiring", "heartwarming"],
    themes: ["patriotism", "love", "terrorism", "sacrifice"],
    rating: 7.7, runtime: 137,
    overview: "A newly married woman fights relentlessly for the release of her husband, a cryptologist kidnapped by militants in Kashmir, in a story that intertwines love with patriotism.",
    language: "tamil",
    features: { pacing: 0.55, complexity: 0.45, popularity: 0.8, visualStyle: 0.6, emotionalIntensity: 0.8, dialogueDriven: 0.55, artHouse: 0.25, eraFeel: 0.3 }
  },
  {
    id: 104, title: "Vada Chennai", year: 2018, director: "Vetrimaaran",
    cast: ["Dhanush", "Aishwarya Rajesh", "Andrea Jeremiah"],
    genres: ["crime", "drama"], moods: ["dark", "tense", "exciting", "thoughtful"],
    themes: ["gang warfare", "survival", "politics", "loyalty"],
    rating: 8.2, runtime: 164,
    overview: "A carrom player from North Chennai becomes unwillingly entangled in gang politics spanning decades, as shifting allegiances and violence shape his life.",
    language: "tamil",
    features: { pacing: 0.65, complexity: 0.8, popularity: 0.75, visualStyle: 0.5, emotionalIntensity: 0.85, dialogueDriven: 0.6, artHouse: 0.4, eraFeel: 0.85 }
  },
  {
    id: 105, title: "Soorarai Pottru", year: 2020, director: "Sudha Kongara",
    cast: ["Suriya", "Aparna Balamurali", "Paresh Rawal"],
    genres: ["drama"], moods: ["inspiring", "uplifting", "exciting", "heartwarming"],
    themes: ["entrepreneurship", "ambition", "class struggle", "perseverance"],
    rating: 8.3, runtime: 153,
    overview: "Inspired by the life of Air Deccan founder G.R. Gopinath, a man from a humble background battles powerful forces to launch a low-cost airline for common people.",
    language: "tamil",
    features: { pacing: 0.7, complexity: 0.5, popularity: 0.85, visualStyle: 0.5, emotionalIntensity: 0.8, dialogueDriven: 0.55, artHouse: 0.15, eraFeel: 0.85 }
  },
  {
    id: 106, title: "Pariyerum Perumal", year: 2018, director: "Mari Selvaraj",
    cast: ["Kathir", "Anandhi", "Yogi Babu"],
    genres: ["drama"], moods: ["dark", "thoughtful", "melancholic", "inspiring"],
    themes: ["caste discrimination", "education", "love", "resilience"],
    rating: 8.4, runtime: 156,
    overview: "A Dalit law student faces relentless casteism at every turn while pursuing his education and falling in love with an upper-caste classmate, exposing deep social fault lines.",
    language: "tamil",
    features: { pacing: 0.45, complexity: 0.55, popularity: 0.6, visualStyle: 0.35, emotionalIntensity: 0.9, dialogueDriven: 0.65, artHouse: 0.6, eraFeel: 0.9 }
  },
  {
    id: 107, title: "Kaithi", year: 2019, director: "Lokesh Kanagaraj",
    cast: ["Karthi", "Narain", "George Maryan"],
    genres: ["action", "thriller"], moods: ["tense", "exciting", "dark"],
    themes: ["redemption", "fatherhood", "drug trafficking", "survival"],
    rating: 8.3, runtime: 145,
    overview: "An ex-convict on his way to meet his daughter for the first time is forced to help a police officer transport a truck of seized drugs through a night of relentless danger.",
    language: "tamil",
    features: { pacing: 0.9, complexity: 0.5, popularity: 0.8, visualStyle: 0.55, emotionalIntensity: 0.85, dialogueDriven: 0.3, artHouse: 0.1, eraFeel: 0.9 }
  },
  {
    id: 108, title: "Super Deluxe", year: 2019, director: "Thiagarajan Kumararaja",
    cast: ["Vijay Sethupathi", "Fahadh Faasil", "Samantha Ruth Prabhu"],
    genres: ["drama", "comedy"], moods: ["dark", "funny", "thoughtful", "mysterious"],
    themes: ["identity", "morality", "fate", "sexuality"],
    rating: 8.0, runtime: 176,
    overview: "Four interconnected stories unfold over one day involving a transgender woman, an unfaithful wife, a group of teenage boys, and a father returning to his family, exploring identity and fate.",
    language: "tamil",
    features: { pacing: 0.55, complexity: 0.85, popularity: 0.65, visualStyle: 0.65, emotionalIntensity: 0.75, dialogueDriven: 0.65, artHouse: 0.7, eraFeel: 0.9 }
  },
  {
    id: 109, title: "Asuran", year: 2019, director: "Vetrimaaran",
    cast: ["Dhanush", "Manju Warrier", "Prakash Raj"],
    genres: ["action", "drama"], moods: ["dark", "tense", "inspiring", "melancholic"],
    themes: ["caste violence", "land rights", "fatherhood", "resistance"],
    rating: 8.1, runtime: 141,
    overview: "A father on the run with his son must confront his violent past to protect his family from powerful upper-caste landlords seeking revenge over a land dispute.",
    language: "tamil",
    features: { pacing: 0.65, complexity: 0.55, popularity: 0.75, visualStyle: 0.45, emotionalIntensity: 0.9, dialogueDriven: 0.5, artHouse: 0.35, eraFeel: 0.85 }
  },
  {
    id: 110, title: "Anbe Sivam", year: 2003, director: "Sundar C.",
    cast: ["Kamal Haasan", "Madhavan", "Kiran Rathod"],
    genres: ["comedy", "drama"], moods: ["funny", "heartwarming", "thoughtful", "uplifting"],
    themes: ["compassion", "humanity", "communism", "friendship"],
    rating: 8.5, runtime: 160,
    overview: "Two contrasting travelers stranded together on a journey discover life lessons about love, compassion, and the meaning of true humanity through their misadventures.",
    language: "tamil",
    features: { pacing: 0.5, complexity: 0.55, popularity: 0.6, visualStyle: 0.35, emotionalIntensity: 0.65, dialogueDriven: 0.8, artHouse: 0.35, eraFeel: 0.45 }
  },

  // ==========================================
  // === HINDI (10) ===
  // ==========================================
  {
    id: 111, title: "Gangs of Wasseypur", year: 2012, director: "Anurag Kashyap",
    cast: ["Manoj Bajpayee", "Nawazuddin Siddiqui", "Richa Chadha"],
    genres: ["crime", "drama"], moods: ["dark", "exciting", "tense", "funny"],
    themes: ["revenge", "power", "family legacy", "coal mafia"],
    rating: 8.2, runtime: 321,
    overview: "A multigenerational saga of crime and revenge set in the coal mafia of Dhanbad, tracing three families locked in a cycle of violence spanning over seven decades.",
    language: "hindi",
    features: { pacing: 0.7, complexity: 0.85, popularity: 0.8, visualStyle: 0.5, emotionalIntensity: 0.85, dialogueDriven: 0.7, artHouse: 0.35, eraFeel: 0.8 }
  },
  {
    id: 112, title: "Dil Chahta Hai", year: 2001, director: "Farhan Akhtar",
    cast: ["Aamir Khan", "Saif Ali Khan", "Akshaye Khanna"],
    genres: ["comedy", "drama", "romance"], moods: ["funny", "heartwarming", "nostalgic", "uplifting"],
    themes: ["friendship", "growing up", "love", "self-discovery"],
    rating: 8.1, runtime: 183,
    overview: "Three inseparable college friends navigate the complexities of love, heartbreak, and evolving relationships as they transition from carefree youth to adulthood.",
    language: "hindi",
    features: { pacing: 0.55, complexity: 0.4, popularity: 0.9, visualStyle: 0.55, emotionalIntensity: 0.55, dialogueDriven: 0.7, artHouse: 0.15, eraFeel: 0.6 }
  },
  {
    id: 113, title: "Lagaan", year: 2001, director: "Ashutosh Gowariker",
    cast: ["Aamir Khan", "Gracy Singh", "Rachel Shelley"],
    genres: ["drama", "adventure"], moods: ["inspiring", "exciting", "uplifting", "tense"],
    themes: ["colonialism", "defiance", "unity", "cricket"],
    rating: 8.1, runtime: 224,
    overview: "Villagers in colonial India stake their future on a cricket match against British officers to avoid an oppressive tax, uniting across divides to achieve the seemingly impossible.",
    language: "hindi",
    features: { pacing: 0.5, complexity: 0.4, popularity: 0.92, visualStyle: 0.55, emotionalIntensity: 0.75, dialogueDriven: 0.55, artHouse: 0.15, eraFeel: 0.35 }
  },
  {
    id: 114, title: "Andhadhun", year: 2018, director: "Sriram Raghavan",
    cast: ["Ayushmann Khurrana", "Tabu", "Radhika Apte"],
    genres: ["thriller", "mystery", "comedy"], moods: ["tense", "funny", "mysterious", "dark"],
    themes: ["deception", "greed", "morality", "survival"],
    rating: 8.2, runtime: 139,
    overview: "A piano player who pretends to be blind unwittingly becomes entangled in a murder, leading to an increasingly absurd and dangerous series of twists.",
    language: "hindi",
    features: { pacing: 0.75, complexity: 0.8, popularity: 0.8, visualStyle: 0.5, emotionalIntensity: 0.7, dialogueDriven: 0.6, artHouse: 0.25, eraFeel: 0.9 }
  },
  {
    id: 115, title: "Tumbbad", year: 2018, director: "Rahi Anil Barve",
    cast: ["Sohum Shah", "Jyoti Malshe", "Anita Date-Kelkar"],
    genres: ["horror", "fantasy"], moods: ["dark", "mysterious", "tense", "disturbing"],
    themes: ["greed", "mythology", "curse", "obsession"],
    rating: 8.2, runtime: 104,
    overview: "Spanning generations, a man discovers a mythological secret in a cursed village and risks everything to exploit its riches, driven by an insatiable greed.",
    language: "hindi",
    features: { pacing: 0.55, complexity: 0.7, popularity: 0.65, visualStyle: 0.85, emotionalIntensity: 0.8, dialogueDriven: 0.35, artHouse: 0.55, eraFeel: 0.7 }
  },
  {
    id: 116, title: "3 Idiots", year: 2009, director: "Rajkumar Hirani",
    cast: ["Aamir Khan", "R. Madhavan", "Sharman Joshi"],
    genres: ["comedy", "drama"], moods: ["funny", "heartwarming", "inspiring", "uplifting"],
    themes: ["education", "friendship", "following passion", "societal pressure"],
    rating: 8.4, runtime: 170,
    overview: "Two friends embark on a quest to find a long-lost college buddy while reminiscing about their days at an engineering institution and the unorthodox genius who changed their lives.",
    language: "hindi",
    features: { pacing: 0.6, complexity: 0.45, popularity: 0.97, visualStyle: 0.4, emotionalIntensity: 0.65, dialogueDriven: 0.75, artHouse: 0.05, eraFeel: 0.75 }
  },
  {
    id: 117, title: "Rang De Basanti", year: 2006, director: "Rakeysh Omprakash Mehra",
    cast: ["Aamir Khan", "Siddharth", "Soha Ali Khan"],
    genres: ["drama", "thriller"], moods: ["inspiring", "tense", "thoughtful", "melancholic"],
    themes: ["patriotism", "youth activism", "corruption", "sacrifice"],
    rating: 8.1, runtime: 167,
    overview: "A group of carefree Delhi university students are transformed when they participate in a documentary about Indian freedom fighters, sparking a fiery awakening against modern corruption.",
    language: "hindi",
    features: { pacing: 0.6, complexity: 0.6, popularity: 0.85, visualStyle: 0.55, emotionalIntensity: 0.85, dialogueDriven: 0.65, artHouse: 0.2, eraFeel: 0.75 }
  },
  {
    id: 118, title: "Barfi!", year: 2012, director: "Anurag Basu",
    cast: ["Ranbir Kapoor", "Priyanka Chopra", "Ileana D'Cruz"],
    genres: ["comedy", "romance", "drama"], moods: ["heartwarming", "funny", "romantic", "whimsical"],
    themes: ["love", "disability", "acceptance", "innocence"],
    rating: 8.1, runtime: 151,
    overview: "A deaf-mute man full of infectious joy navigates love and life in Darjeeling, forging a heartwarming bond with a young autistic woman.",
    language: "hindi",
    features: { pacing: 0.5, complexity: 0.45, popularity: 0.8, visualStyle: 0.65, emotionalIntensity: 0.7, dialogueDriven: 0.2, artHouse: 0.3, eraFeel: 0.7 }
  },
  {
    id: 119, title: "Article 15", year: 2019, director: "Anubhav Sinha",
    cast: ["Ayushmann Khurrana", "Nassar", "Manoj Pahwa"],
    genres: ["crime", "drama", "thriller"], moods: ["dark", "tense", "thoughtful", "inspiring"],
    themes: ["caste discrimination", "justice", "corruption", "social inequality"],
    rating: 7.2, runtime: 130,
    overview: "A young IPS officer posted in rural India investigates the disappearance of three girls and confronts a deeply entrenched system of caste-based violence and apathy.",
    language: "hindi",
    features: { pacing: 0.55, complexity: 0.6, popularity: 0.7, visualStyle: 0.4, emotionalIntensity: 0.8, dialogueDriven: 0.7, artHouse: 0.3, eraFeel: 0.9 }
  },
  {
    id: 120, title: "Swades", year: 2004, director: "Ashutosh Gowariker",
    cast: ["Shah Rukh Khan", "Gayatri Joshi", "Kishori Ballal"],
    genres: ["drama"], moods: ["inspiring", "heartwarming", "thoughtful", "nostalgic"],
    themes: ["homecoming", "rural development", "identity", "social responsibility"],
    rating: 8.2, runtime: 195,
    overview: "A NASA scientist returns to the Indian village of his childhood and is moved to confront the realities of rural India, leading to a profound personal transformation.",
    language: "hindi",
    features: { pacing: 0.4, complexity: 0.45, popularity: 0.75, visualStyle: 0.5, emotionalIntensity: 0.7, dialogueDriven: 0.6, artHouse: 0.3, eraFeel: 0.55 }
  },

  // ==========================================
  // === TELUGU (10) ===
  // ==========================================
  {
    id: 121, title: "Baahubali: The Beginning", year: 2015, director: "S.S. Rajamouli",
    cast: ["Prabhas", "Rana Daggubati", "Anushka Shetty"],
    genres: ["action", "fantasy", "adventure"], moods: ["exciting", "inspiring", "uplifting"],
    themes: ["destiny", "kingdom", "betrayal", "heroism"],
    rating: 8.0, runtime: 159,
    overview: "A young man raised in a remote tribal village discovers his royal heritage and embarks on an epic quest to reclaim a kingdom from a tyrannical usurper.",
    language: "telugu",
    features: { pacing: 0.75, complexity: 0.5, popularity: 0.95, visualStyle: 0.9, emotionalIntensity: 0.75, dialogueDriven: 0.35, artHouse: 0.05, eraFeel: 0.85 }
  },
  {
    id: 122, title: "RRR", year: 2022, director: "S.S. Rajamouli",
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Ajay Devgn"],
    genres: ["action", "drama"], moods: ["exciting", "inspiring", "uplifting", "tense"],
    themes: ["friendship", "colonialism", "freedom", "sacrifice"],
    rating: 7.8, runtime: 187,
    overview: "A fictional tale of two legendary Indian freedom fighters who forge an unlikely bond before discovering they are on opposite sides of the British colonial regime.",
    language: "telugu",
    features: { pacing: 0.85, complexity: 0.45, popularity: 0.95, visualStyle: 0.9, emotionalIntensity: 0.8, dialogueDriven: 0.35, artHouse: 0.05, eraFeel: 0.9 }
  },
  {
    id: 123, title: "Eega", year: 2012, director: "S.S. Rajamouli",
    cast: ["Nani", "Samantha Ruth Prabhu", "Sudeep"],
    genres: ["fantasy", "comedy", "thriller"], moods: ["funny", "exciting", "whimsical", "romantic"],
    themes: ["revenge", "reincarnation", "love", "persistence"],
    rating: 7.6, runtime: 131,
    overview: "A man murdered by a ruthless industrialist is reincarnated as a housefly and relentlessly plots revenge against his killer to protect the woman he loves.",
    language: "telugu",
    features: { pacing: 0.75, complexity: 0.4, popularity: 0.75, visualStyle: 0.8, emotionalIntensity: 0.6, dialogueDriven: 0.35, artHouse: 0.15, eraFeel: 0.75 }
  },
  {
    id: 124, title: "Arjun Reddy", year: 2017, director: "Sandeep Reddy Vanga",
    cast: ["Vijay Deverakonda", "Shalini Pandey", "Rahul Ramakrishna"],
    genres: ["drama", "romance"], moods: ["dark", "romantic", "melancholic", "tense"],
    themes: ["obsessive love", "self-destruction", "addiction", "heartbreak"],
    rating: 7.9, runtime: 187,
    overview: "A brilliant but short-tempered surgeon spirals into self-destruction through alcohol and substance abuse after being separated from the love of his life.",
    language: "telugu",
    features: { pacing: 0.55, complexity: 0.45, popularity: 0.85, visualStyle: 0.5, emotionalIntensity: 0.95, dialogueDriven: 0.6, artHouse: 0.25, eraFeel: 0.9 }
  },
  {
    id: 125, title: "C/o Kancharapalem", year: 2018, director: "Venkatesh Maha",
    cast: ["Subba Rao Vepada", "Radha Bessy", "Kesava Karri"],
    genres: ["drama", "romance"], moods: ["heartwarming", "thoughtful", "nostalgic", "melancholic"],
    themes: ["love", "caste", "class", "small-town life"],
    rating: 8.2, runtime: 152,
    overview: "Four love stories across different age groups in the Kancharapalem neighborhood of Visakhapatnam explore how caste, religion, and societal norms shape human connections.",
    language: "telugu",
    features: { pacing: 0.35, complexity: 0.55, popularity: 0.45, visualStyle: 0.3, emotionalIntensity: 0.7, dialogueDriven: 0.6, artHouse: 0.75, eraFeel: 0.85 }
  },
  {
    id: 126, title: "Jersey", year: 2019, director: "Gowtam Tinnanuri",
    cast: ["Nani", "Shraddha Srinath", "Sathyaraj"],
    genres: ["drama"], moods: ["inspiring", "melancholic", "heartwarming", "uplifting"],
    themes: ["second chances", "fatherhood", "cricket", "perseverance"],
    rating: 8.0, runtime: 157,
    overview: "A failed cricketer in his mid-thirties makes a determined comeback to the sport to fulfill his son's wish for a jersey, confronting personal and professional setbacks.",
    language: "telugu",
    features: { pacing: 0.5, complexity: 0.35, popularity: 0.75, visualStyle: 0.4, emotionalIntensity: 0.85, dialogueDriven: 0.55, artHouse: 0.2, eraFeel: 0.85 }
  },
  {
    id: 127, title: "Ala Vaikunthapurramuloo", year: 2020, director: "Trivikram Srinivas",
    cast: ["Allu Arjun", "Pooja Hegde", "Tabu"],
    genres: ["action", "comedy", "drama"], moods: ["funny", "exciting", "heartwarming", "uplifting"],
    themes: ["identity", "family", "switched at birth", "self-worth"],
    rating: 7.2, runtime: 163,
    overview: "A young man raised by an unloving father discovers he was swapped at birth with the son of a wealthy businessman and sets out to reclaim his true identity.",
    language: "telugu",
    features: { pacing: 0.7, complexity: 0.4, popularity: 0.9, visualStyle: 0.6, emotionalIntensity: 0.55, dialogueDriven: 0.55, artHouse: 0.05, eraFeel: 0.9 }
  },
  {
    id: 128, title: "Mahanati", year: 2018, director: "Nag Ashwin",
    cast: ["Keerthy Suresh", "Dulquer Salmaan", "Samantha Ruth Prabhu"],
    genres: ["drama"], moods: ["melancholic", "inspiring", "nostalgic", "romantic"],
    themes: ["fame", "tragedy", "legacy", "love"],
    rating: 7.8, runtime: 177,
    overview: "A biographical drama chronicling the life of legendary actress Savitri, tracing her meteoric rise in Telugu cinema and her heartbreaking decline.",
    language: "telugu",
    features: { pacing: 0.45, complexity: 0.55, popularity: 0.75, visualStyle: 0.65, emotionalIntensity: 0.8, dialogueDriven: 0.6, artHouse: 0.3, eraFeel: 0.65 }
  },
  {
    id: 129, title: "HIT: The First Case", year: 2020, director: "Sailesh Kolanu",
    cast: ["Vishwak Sen", "Ruhani Sharma", "Murali Sharma"],
    genres: ["thriller", "crime"], moods: ["tense", "dark", "mysterious"],
    themes: ["missing persons", "trauma", "investigation", "obsession"],
    rating: 7.4, runtime: 132,
    overview: "A police officer struggling with PTSD takes on the case of a missing woman, uncovering a disturbing pattern of disappearances that tests his fractured mind.",
    language: "telugu",
    features: { pacing: 0.7, complexity: 0.6, popularity: 0.65, visualStyle: 0.45, emotionalIntensity: 0.75, dialogueDriven: 0.55, artHouse: 0.15, eraFeel: 0.9 }
  },
  {
    id: 130, title: "Pushpa: The Rise", year: 2021, director: "Sukumar",
    cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"],
    genres: ["action", "thriller", "drama"], moods: ["exciting", "tense", "dark"],
    themes: ["smuggling", "ambition", "class struggle", "power"],
    rating: 7.6, runtime: 179,
    overview: "A laborer rises through the ranks of the red sandalwood smuggling syndicate in the forests of Andhra Pradesh, defying those who underestimate him at every turn.",
    language: "telugu",
    features: { pacing: 0.7, complexity: 0.5, popularity: 0.92, visualStyle: 0.6, emotionalIntensity: 0.7, dialogueDriven: 0.45, artHouse: 0.1, eraFeel: 0.9 }
  },

  // ==========================================
  // === MALAYALAM (10) ===
  // ==========================================
  {
    id: 131, title: "Drishyam", year: 2013, director: "Jeethu Joseph",
    cast: ["Mohanlal", "Meena", "Asha Sarath"],
    genres: ["thriller", "crime"], moods: ["tense", "mysterious", "thoughtful", "dark"],
    themes: ["family protection", "deception", "moral ambiguity", "class"],
    rating: 8.3, runtime: 160,
    overview: "A self-educated cable TV operator meticulously covers up a crime committed by his family, outsmarting a determined police investigation at every step.",
    language: "malayalam",
    features: { pacing: 0.6, complexity: 0.75, popularity: 0.85, visualStyle: 0.3, emotionalIntensity: 0.8, dialogueDriven: 0.7, artHouse: 0.2, eraFeel: 0.8 }
  },
  {
    id: 132, title: "Kumbalangi Nights", year: 2019, director: "Madhu C. Narayanan",
    cast: ["Shane Nigam", "Soubin Shahir", "Fahadh Faasil"],
    genres: ["drama", "comedy", "romance"], moods: ["heartwarming", "funny", "thoughtful", "romantic"],
    themes: ["dysfunctional family", "masculinity", "love", "redemption"],
    rating: 8.2, runtime: 135,
    overview: "Four estranged brothers in a coastal Kerala village gradually reconcile while confronting their own flaws, as a menacing brother-in-law casts a shadow over their lives.",
    language: "malayalam",
    features: { pacing: 0.45, complexity: 0.55, popularity: 0.7, visualStyle: 0.5, emotionalIntensity: 0.65, dialogueDriven: 0.65, artHouse: 0.45, eraFeel: 0.9 }
  },
  {
    id: 133, title: "Premam", year: 2015, director: "Alphonse Puthren",
    cast: ["Nivin Pauly", "Sai Pallavi", "Madonna Sebastian"],
    genres: ["romance", "comedy", "drama"], moods: ["romantic", "funny", "nostalgic", "heartwarming"],
    themes: ["first love", "growing up", "heartbreak", "destiny"],
    rating: 7.7, runtime: 163,
    overview: "A young man experiences three distinct phases of love from schooldays through adulthood, each leaving a lasting mark on his journey to finding true connection.",
    language: "malayalam",
    features: { pacing: 0.55, complexity: 0.35, popularity: 0.85, visualStyle: 0.55, emotionalIntensity: 0.6, dialogueDriven: 0.55, artHouse: 0.2, eraFeel: 0.85 }
  },
  {
    id: 134, title: "Jallikattu", year: 2019, director: "Lijo Jose Pellissery",
    cast: ["Antony Varghese", "Chemban Vinod Jose", "Sabumon Abdusamad"],
    genres: ["thriller", "drama"], moods: ["tense", "dark", "disturbing", "exciting"],
    themes: ["primal instinct", "mob mentality", "human nature", "chaos"],
    rating: 7.3, runtime: 91,
    overview: "When a buffalo escapes from a slaughterhouse in a remote Kerala hill village, the ensuing chaotic hunt spirals into a primal descent that exposes the savagery lurking within civilization.",
    language: "malayalam",
    features: { pacing: 0.85, complexity: 0.6, popularity: 0.45, visualStyle: 0.8, emotionalIntensity: 0.9, dialogueDriven: 0.15, artHouse: 0.85, eraFeel: 0.9 }
  },
  {
    id: 135, title: "The Great Indian Kitchen", year: 2021, director: "Jeo Baby",
    cast: ["Nimisha Sajayan", "Suraj Venjaramoodu"],
    genres: ["drama"], moods: ["thoughtful", "dark", "melancholic", "inspiring"],
    themes: ["patriarchy", "domestic labor", "gender roles", "liberation"],
    rating: 7.8, runtime: 100,
    overview: "A newlywed woman slowly suffocates under the relentless domestic expectations of her traditional Kerala household, building to a quiet but powerful act of rebellion.",
    language: "malayalam",
    features: { pacing: 0.3, complexity: 0.45, popularity: 0.6, visualStyle: 0.35, emotionalIntensity: 0.85, dialogueDriven: 0.3, artHouse: 0.75, eraFeel: 0.9 }
  },
  {
    id: 136, title: "Bangalore Days", year: 2014, director: "Anjali Menon",
    cast: ["Dulquer Salmaan", "Fahadh Faasil", "Nazriya Nazim"],
    genres: ["comedy", "drama", "romance"], moods: ["heartwarming", "funny", "romantic", "uplifting"],
    themes: ["cousins", "city life", "dreams", "relationships"],
    rating: 7.9, runtime: 175,
    overview: "Three cousins move to Bangalore chasing their dreams, navigating love, marriage, career struggles, and the unbreakable bond of family in the bustling city.",
    language: "malayalam",
    features: { pacing: 0.5, complexity: 0.4, popularity: 0.85, visualStyle: 0.5, emotionalIntensity: 0.55, dialogueDriven: 0.65, artHouse: 0.15, eraFeel: 0.85 }
  },
  {
    id: 137, title: "Minnal Murali", year: 2021, director: "Basil Joseph",
    cast: ["Tovino Thomas", "Guru Somasundaram", "Femina George"],
    genres: ["action", "comedy", "fantasy"], moods: ["exciting", "funny", "whimsical", "heartwarming"],
    themes: ["superhero origin", "small-town life", "good vs evil", "responsibility"],
    rating: 7.5, runtime: 158,
    overview: "A tailor in a small Kerala village gains superpowers after being struck by lightning, but so does a troubled loner, setting the stage for an inevitable clash.",
    language: "malayalam",
    features: { pacing: 0.65, complexity: 0.4, popularity: 0.75, visualStyle: 0.65, emotionalIntensity: 0.6, dialogueDriven: 0.5, artHouse: 0.15, eraFeel: 0.9 }
  },
  {
    id: 138, title: "Virus", year: 2019, director: "Aashiq Abu",
    cast: ["Parvathy Thiruvothu", "Revathi", "Kunchacko Boban"],
    genres: ["thriller", "drama"], moods: ["tense", "inspiring", "thoughtful", "dark"],
    themes: ["pandemic", "healthcare workers", "community", "sacrifice"],
    rating: 7.8, runtime: 152,
    overview: "Based on the true 2018 Nipah virus outbreak in Kerala, an ensemble of doctors, nurses, and officials race against time to contain a deadly epidemic before it spirals out of control.",
    language: "malayalam",
    features: { pacing: 0.7, complexity: 0.6, popularity: 0.6, visualStyle: 0.4, emotionalIntensity: 0.8, dialogueDriven: 0.6, artHouse: 0.3, eraFeel: 0.9 }
  },
  {
    id: 139, title: "Ustad Hotel", year: 2012, director: "Anwar Rasheed",
    cast: ["Dulquer Salmaan", "Thilakan", "Siddique"],
    genres: ["drama", "comedy"], moods: ["heartwarming", "funny", "uplifting", "nostalgic"],
    themes: ["family", "cooking", "generational conflict", "finding purpose"],
    rating: 8.1, runtime: 145,
    overview: "A young culinary arts graduate defies his father's wishes and finds meaning working at his grandfather's small restaurant in Kozhikode, rediscovering family bonds through food.",
    language: "malayalam",
    features: { pacing: 0.45, complexity: 0.35, popularity: 0.75, visualStyle: 0.4, emotionalIntensity: 0.6, dialogueDriven: 0.65, artHouse: 0.2, eraFeel: 0.75 }
  },
  {
    id: 140, title: "Maheshinte Prathikaaram", year: 2016, director: "Dileesh Pothan",
    cast: ["Fahadh Faasil", "Aparna Balamurali", "Soubin Shahir"],
    genres: ["comedy", "drama"], moods: ["funny", "heartwarming", "thoughtful", "whimsical"],
    themes: ["pride", "small-town life", "revenge", "letting go"],
    rating: 7.9, runtime: 135,
    overview: "A photographer in a small Kerala town vows not to wear slippers until he avenges a public humiliation, but life keeps getting in the way of his stubborn promise.",
    language: "malayalam",
    features: { pacing: 0.4, complexity: 0.4, popularity: 0.65, visualStyle: 0.35, emotionalIntensity: 0.45, dialogueDriven: 0.7, artHouse: 0.45, eraFeel: 0.85 }
  },

  // ==========================================
  // === KANNADA (10) ===
  // ==========================================
  {
    id: 141, title: "KGF: Chapter 1", year: 2018, director: "Prashanth Neel",
    cast: ["Yash", "Srinidhi Shetty", "Ramachandra Raju"],
    genres: ["action", "drama"], moods: ["exciting", "dark", "tense", "inspiring"],
    themes: ["rags to riches", "gold mining", "power", "mother's love"],
    rating: 7.9, runtime: 156,
    overview: "A young man from the slums of Mumbai rises to become the most feared name in the brutal gold mines of Kolar, fulfilling a promise made to his dying mother.",
    language: "kannada",
    features: { pacing: 0.85, complexity: 0.5, popularity: 0.92, visualStyle: 0.8, emotionalIntensity: 0.8, dialogueDriven: 0.4, artHouse: 0.05, eraFeel: 0.85 }
  },
  {
    id: 142, title: "Lucia", year: 2013, director: "Pawan Kumar",
    cast: ["Sathish Ninasam", "Sruthi Hariharan", "Achyuth Kumar"],
    genres: ["thriller", "mystery", "drama"], moods: ["mysterious", "dark", "thoughtful", "melancholic"],
    themes: ["dreams vs reality", "fame", "identity", "pills"],
    rating: 7.8, runtime: 134,
    overview: "An usher at a single-screen cinema takes a mysterious pill called Lucia that blurs the line between his waking life and vivid dreams of being a famous film star.",
    language: "kannada",
    features: { pacing: 0.5, complexity: 0.8, popularity: 0.45, visualStyle: 0.6, emotionalIntensity: 0.7, dialogueDriven: 0.55, artHouse: 0.65, eraFeel: 0.85 }
  },
  {
    id: 143, title: "Thithi", year: 2015, director: "Raam Reddy",
    cast: ["Thammegowda S.", "Channegowda", "Abhishek H.N."],
    genres: ["comedy", "drama"], moods: ["funny", "thoughtful", "whimsical", "nostalgic"],
    themes: ["death", "rural life", "generational conflict", "land"],
    rating: 7.5, runtime: 123,
    overview: "The death of a cantankerous 101-year-old patriarch in a Karnataka village sets off a chain of events involving his son, grandson, and great-grandson, each with their own agendas.",
    language: "kannada",
    features: { pacing: 0.3, complexity: 0.5, popularity: 0.3, visualStyle: 0.3, emotionalIntensity: 0.4, dialogueDriven: 0.55, artHouse: 0.85, eraFeel: 0.8 }
  },
  {
    id: 144, title: "U Turn", year: 2016, director: "Pawan Kumar",
    cast: ["Shraddha Srinath", "Roger Narayan", "Radhika Chetan"],
    genres: ["thriller", "mystery"], moods: ["tense", "mysterious", "dark"],
    themes: ["karma", "traffic violations", "investigation", "supernatural"],
    rating: 7.5, runtime: 128,
    overview: "An investigative journalist probing illegal U-turns on a Bangalore flyover stumbles upon a series of mysterious deaths connected to the very violations she is reporting on.",
    language: "kannada",
    features: { pacing: 0.65, complexity: 0.65, popularity: 0.55, visualStyle: 0.45, emotionalIntensity: 0.7, dialogueDriven: 0.6, artHouse: 0.3, eraFeel: 0.85 }
  },
  {
    id: 145, title: "Ondu Motteya Kathe", year: 2017, director: "Raj B. Shetty",
    cast: ["Raj B. Shetty", "Amrutha Iyengar", "Prakash Thuminad"],
    genres: ["comedy", "romance"], moods: ["funny", "heartwarming", "romantic", "whimsical"],
    themes: ["baldness", "self-acceptance", "love", "insecurity"],
    rating: 7.8, runtime: 126,
    overview: "A balding young man in Bangalore navigates the anxieties of finding love while dealing with his crippling insecurity about his receding hairline, in a charming comedy of everyday life.",
    language: "kannada",
    features: { pacing: 0.45, complexity: 0.3, popularity: 0.4, visualStyle: 0.3, emotionalIntensity: 0.45, dialogueDriven: 0.7, artHouse: 0.4, eraFeel: 0.85 }
  },
  {
    id: 146, title: "Garuda Gamana Vrishabha Vahana", year: 2021, director: "Raj B. Shetty",
    cast: ["Raj B. Shetty", "Rishab Shetty", "Gopalakrishna Deshpande"],
    genres: ["crime", "thriller", "drama"], moods: ["dark", "tense", "exciting", "thoughtful"],
    themes: ["friendship", "betrayal", "mythology parallels", "crime"],
    rating: 8.2, runtime: 131,
    overview: "The intense bond between two childhood friends in the Mangalore underworld mirrors the mythological rivalry of Vishnu and Shiva, as loyalty gives way to inevitable conflict.",
    language: "kannada",
    features: { pacing: 0.65, complexity: 0.7, popularity: 0.5, visualStyle: 0.6, emotionalIntensity: 0.85, dialogueDriven: 0.55, artHouse: 0.45, eraFeel: 0.9 }
  },
  {
    id: 147, title: "Kantara", year: 2022, director: "Rishab Shetty",
    cast: ["Rishab Shetty", "Sapthami Gowda", "Kishore"],
    genres: ["action", "thriller", "drama"], moods: ["exciting", "tense", "mysterious", "inspiring"],
    themes: ["man vs nature", "tradition", "land dispute", "folk deity"],
    rating: 7.9, runtime: 148,
    overview: "In the forests of Karnataka, a fiery village rebel clashes with a forest officer over land rights, as an ancient pact between a king and a folk deity resurfaces with primal force.",
    language: "kannada",
    features: { pacing: 0.75, complexity: 0.55, popularity: 0.9, visualStyle: 0.75, emotionalIntensity: 0.9, dialogueDriven: 0.4, artHouse: 0.2, eraFeel: 0.9 }
  },
  {
    id: 148, title: "777 Charlie", year: 2022, director: "Kiranraj K.",
    cast: ["Rakshit Shetty", "Charlie", "Sangeetha Sringeri"],
    genres: ["drama", "comedy"], moods: ["heartwarming", "funny", "melancholic", "inspiring"],
    themes: ["man and dog", "loneliness", "healing", "companionship"],
    rating: 8.2, runtime: 166,
    overview: "A lonely, bitter factory worker's life is transformed by an irrepressibly joyful stray dog named Charlie, who leads him on an unexpected road trip and journey of emotional healing.",
    language: "kannada",
    features: { pacing: 0.5, complexity: 0.3, popularity: 0.75, visualStyle: 0.45, emotionalIntensity: 0.85, dialogueDriven: 0.4, artHouse: 0.2, eraFeel: 0.9 }
  },
  {
    id: 149, title: "Rangitaranga", year: 2015, director: "Anup Bhandari",
    cast: ["Nirup Bhandari", "Radhika Chetan", "Avantika Shetty"],
    genres: ["thriller", "mystery"], moods: ["mysterious", "tense", "dark", "exciting"],
    themes: ["folklore", "past secrets", "village mystery", "obsession"],
    rating: 7.6, runtime: 147,
    overview: "A novelist researching folklore in a remote Karnataka village becomes entangled in an unsettling mystery involving a missing woman, strange rituals, and a dark secret buried in the past.",
    language: "kannada",
    features: { pacing: 0.6, complexity: 0.7, popularity: 0.5, visualStyle: 0.6, emotionalIntensity: 0.7, dialogueDriven: 0.5, artHouse: 0.35, eraFeel: 0.85 }
  },
  {
    id: 150, title: "Dia", year: 2020, director: "K.S. Ashoka",
    cast: ["Pruthvi Ambaar", "Dheekshith Shetty", "Kushee Ravi"],
    genres: ["romance", "drama"], moods: ["romantic", "heartwarming", "melancholic", "thoughtful"],
    themes: ["unrequited love", "letting go", "friendship", "self-worth"],
    rating: 7.4, runtime: 140,
    overview: "An introverted young woman silently loves a charming college mate from afar, but when life reunites them years later, she must confront the difference between love and longing.",
    language: "kannada",
    features: { pacing: 0.35, complexity: 0.35, popularity: 0.4, visualStyle: 0.45, emotionalIntensity: 0.7, dialogueDriven: 0.5, artHouse: 0.35, eraFeel: 0.9 }
  }
];

// ==========================================
// Wikipedia article titles for poster fetching
// ==========================================
const REGIONAL_WIKI_TITLES = {
  // Tamil
  101: "Vikram (2022 film)",
  102: "Jai Bhim (film)",
  103: "Roja (film)",
  104: "Vada Chennai",
  105: "Soorarai Pottru",
  106: "Pariyerum Perumal",
  107: "Kaithi (film)",
  108: "Super Deluxe (film)",
  109: "Asuran (film)",
  110: "Anbe Sivam",
  // Hindi
  111: "Gangs of Wasseypur",
  112: "Dil Chahta Hai",
  113: "Lagaan",
  114: "Andhadhun",
  115: "Tumbbad",
  116: "3 Idiots",
  117: "Rang De Basanti",
  118: "Barfi!",
  119: "Article 15 (film)",
  120: "Swades",
  // Telugu
  121: "Baahubali: The Beginning",
  122: "RRR (film)",
  123: "Eega",
  124: "Arjun Reddy",
  125: "Care of Kancharapalem",
  126: "Jersey (2019 film)",
  127: "Ala Vaikunthapurramuloo",
  128: "Mahanati",
  129: "HIT: The First Case",
  130: "Pushpa: The Rise",
  // Malayalam
  131: "Drishyam (2013 film)",
  132: "Kumbalangi Nights",
  133: "Premam",
  134: "Jallikattu (film)",
  135: "The Great Indian Kitchen",
  136: "Bangalore Days",
  137: "Minnal Murali",
  138: "Virus (2019 film)",
  139: "Ustad Hotel",
  140: "Maheshinte Prathikaaram",
  // Kannada
  141: "KGF: Chapter 1",
  142: "Lucia (2013 film)",
  143: "Thithi (film)",
  144: "U Turn (2016 film)",
  145: "Ondu Motteya Kathe",
  146: "Garuda Gamana Vrishabha Vahana",
  147: "Kantara (film)",
  148: "777 Charlie",
  149: "Rangitaranga",
  150: "Dia (2020 film)",
};

// Apply wikiTitle and JustWatch slug to all regional movies
REGIONAL_MOVIES.forEach(movie => {
  // Wikipedia title
  if (REGIONAL_WIKI_TITLES[movie.id]) {
    movie.wikiTitle = REGIONAL_WIKI_TITLES[movie.id];
  } else {
    movie.wikiTitle = `${movie.title} (film)`;
  }

  // JustWatch slug (auto-generated from title)
  movie.slug = movie.title
    .toLowerCase()
    .replace(/[:'.,!?]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // JustWatch watch URL (India region)
  movie.watchUrl = `https://www.justwatch.com/in/movie/${movie.slug}`;
});
