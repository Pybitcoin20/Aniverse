export type Difficulty = 'Easy' | 'Medium' | 'Otaku Master';

export interface Question {
  id: string;
  category: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
}

export interface AnimeCharacter {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  hairColor: string;
  anime: string;
  role: 'Protagonist' | 'Antagonist' | 'Supporting';
}

export interface Episode {
  number: number;
  title: string;
  duration: string;
  thumbnail: string;
}

export interface AnimeTitle {
  id: string;
  title: string;
  rating: number;
  popularity: number;
  imageUrl: string;
  bannerUrl?: string;
  synopsis: string;
  genres: string[];
  year: number;
  status: 'Ongoing' | 'Completed';
  episodes?: Episode[];
}

export interface UserStats {
  level: number;
  xp: number;
  title: string;
  badges: string[];
  streak: number;
  lastPlayed: string;
  watchlist: string[]; // anime IDs
}

export interface LeaderboardEntry {
  username: string;
  xp: number;
  level: number;
  title: string;
}
