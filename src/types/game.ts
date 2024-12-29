interface Team {
  id: string;
  name: string;
  players: string[];
  score: number;
}

interface GameSettings {
  winningScore: number;
  timePerRound: number;
  wordsPerRound: number;
}

interface GameState {
  teams: Team[];
  currentTeamIndex: number;
  isPlaying: boolean;
  currentWords: string[];
  timeRemaining: number;
} 