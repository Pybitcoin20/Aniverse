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
  { id: 't1', title: 'Fullmetal Alchemist: Brotherhood', rating: 9.1, popularity: 3200000, imageUrl: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg' },
  { id: 't2', title: 'Steins;Gate', rating: 9.07, popularity: 2500000, imageUrl: 'https://cdn.myanimelist.net/images/anime/7/30310.jpg' },
  { id: 't3', title: 'Bleach: TYBW', rating: 9.0, popularity: 800000, imageUrl: 'https://cdn.myanimelist.net/images/anime/1764/126627.jpg' },
  { id: 't4', title: 'Eromanga Sensei', rating: 5.4, popularity: 1200000, imageUrl: 'https://cdn.myanimelist.net/images/anime/12/84541.jpg' }
];
