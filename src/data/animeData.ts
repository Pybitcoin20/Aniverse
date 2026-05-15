import { Question, AnimeCharacter, AnimeTitle } from '../types/anime';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'Shonen',
    difficulty: 'Easy',
    question: "What is Naruto's signature jutsu?",
    options: ['Chidori', 'Rasengan', 'Fire Ball Jutsu', 'Water Dragon Jutsu'],
    correctOption: 1,
    explanation: "Rasengan is Naruto's primary offensive jutsu, taught to him by Jiraiya."
  },
  {
    id: 'q2',
    category: 'Seinen',
    difficulty: 'Medium',
    question: "In 'Berserk', what is the name of Guts' massive sword?",
    options: ['Dragon Slayer', 'Zangetsu', 'Rebellion', 'Durandal'],
    correctOption: 0,
    explanation: "The Dragon Slayer was forged by Godot to be able to kill a dragon."
  },
  {
    id: 'q3',
    category: 'Classic',
    difficulty: 'Otaku Master',
    question: "Which of these was the first anime to ever win an Academy Award?",
    options: ['Princess Mononoke', 'Spirited Away', 'Akira', 'Ghost in the Shell'],
    correctOption: 1,
    explanation: "Spirited Away won the Best Animated Feature Oscar in 2003."
  },
  {
    id: 'q4',
    category: 'Isekai',
    difficulty: 'Easy',
    question: "In 'That Time I Got Reincarnated as a Slime', what is the protagonist's name?",
    options: ['Rimuru Tempest', 'Kazuma Satou', 'Subaru Natsuki', 'Saitama'],
    correctOption: 0,
    explanation: "Satoru Mikami is reincarnated as Rimuru Tempest."
  }
];

export const ANIME_CHARACTERS: AnimeCharacter[] = [
  { id: 'c1', name: 'Monkey D. Luffy', gender: 'Male', hairColor: 'Black', anime: 'One Piece', role: 'Protagonist' },
  { id: 'c2', name: 'Mikasa Ackerman', gender: 'Female', hairColor: 'Black', anime: 'Attack on Titan', role: 'Protagonist' },
  { id: 'c3', name: 'Madara Uchiha', gender: 'Male', hairColor: 'Black', anime: 'Naruto', role: 'Antagonist' },
  { id: 'c4', name: 'Rem', gender: 'Female', hairColor: 'Blue', anime: 'Re:Zero', role: 'Supporting' },
  { id: 'c5', name: 'Killua Zoldyck', gender: 'Male', hairColor: 'Silver', anime: 'Hunter x Hunter', role: 'Protagonist' }
];

export const ANIME_TITLES: AnimeTitle[] = [
  { 
    id: 't1', 
    title: 'Demon Slayer', 
    rating: 8.7, 
    popularity: 3200000, 
    imageUrl: 'https://images.unsplash.com/photo-1541560052-5e137f229371?q=80&w=2692&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1541560052-5e137f229371?q=80&w=2692&auto=format&fit=crop',
    synopsis: "In Taisho-era Japan, kindhearted Tanjiro Kamado finds his family slaughtered by a demon and his sister Nezuko turned into one. He joins the Demon Slayer Corps to find a cure and protect others.",
    genres: ['Action', 'Fantasy', 'Adventure'],
    year: 2019,
    status: 'Ongoing',
    episodes: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}: The Journey Begins`,
      duration: '24m',
      thumbnail: 'https://images.unsplash.com/photo-1541560052-5e137f229371?q=80&w=400'
    }))
  },
  { 
    id: 't2', 
    title: 'Solo Leveling', 
    rating: 8.9, 
    popularity: 2500000, 
    imageUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=2670&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=2670&auto=format&fit=crop',
    synopsis: "In a world where hunters must battle deadly monsters to protect mankind, Sung Jinwoo, a famously weak hunter, finds himself in a struggle for survival in a double dungeon.",
    genres: ['Action', 'RPG', 'Magic'],
    year: 2024,
    status: 'Ongoing',
    episodes: Array.from({ length: 8 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}: The System`,
      duration: '23m',
      thumbnail: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400'
    }))
  },
  { 
    id: 't3', 
    title: 'Cyberpunk Edgerunners', 
    rating: 8.6, 
    popularity: 1800000, 
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2670&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2670&auto=format&fit=crop',
    synopsis: "A street kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner.",
    genres: ['Sci-Fi', 'Dystopian', 'Tragedy'],
    year: 2022,
    status: 'Completed',
    episodes: Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}: Let You Down`,
      duration: '25m',
      thumbnail: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400'
    }))
  },
  { 
    id: 't4', 
    title: 'Jujutsu Kaisen', 
    rating: 8.8, 
    popularity: 4200000, 
    imageUrl: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2670&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2670&auto=format&fit=crop',
    synopsis: "A boy swallows a cursed talisman—the finger of a demon—and becomes cursed himself. He enters a shaman's school to be able to locate the demon's other body parts and thus exorcise himself.",
    genres: ['Action', 'Supernatural', 'School'],
    year: 2020,
    status: 'Ongoing',
    episodes: Array.from({ length: 24 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}: Ryomen Sukuna`,
      duration: '24m',
      thumbnail: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=400'
    }))
  },
  { 
    id: 't5', 
    title: 'Bleach: Thousand-Year Blood War', 
    rating: 9.1, 
    popularity: 1500000, 
    imageUrl: 'https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?q=80&w=2670&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?q=80&w=2670&auto=format&fit=crop',
    synopsis: "The peace is suddenly broken when warning sirens blare through the Soul Society. Residents are disappearing without a trace and nobody knows who is behind it.",
    genres: ['Action', 'Fantasy', 'Swordplay'],
    year: 2022,
    status: 'Ongoing',
    episodes: Array.from({ length: 13 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}: The Blood Warfare`,
      duration: '24m',
      thumbnail: 'https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?q=80&w=400'
    }))
  },
  { 
    id: 't6', 
    title: 'Arcane', 
    rating: 9.0, 
    popularity: 2800000, 
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2524&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2524&auto=format&fit=crop',
    synopsis: "Set in the universe of League of Legends, Arcane follows the origins of two iconic League champions and the power that will tear them apart.",
    genres: ['Action', 'Adventure', 'Dramatic'],
    year: 2021,
    status: 'Completed',
    episodes: Array.from({ length: 9 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}: Welcome to the Playground`,
      duration: '40m',
      thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400'
    }))
  }
];
