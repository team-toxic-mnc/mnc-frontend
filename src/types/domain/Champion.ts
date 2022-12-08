export type Champion = {
    name: string;
    wins: number;
    losses: number;
    winPercentage: number;
    totalGames: number;
    banPercentage?: number;
    pickPercentage?: number;
    pickBanHistory?: { pick: number; ban: number }[];
};
