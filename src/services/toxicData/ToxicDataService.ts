import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Champion } from '../../types/domain/Champion';
import { Match } from '../../types/domain/Match';
import { MmrHistoryItem } from '../../types/domain/MmrHistoryItem';
import { Player } from '../../types/domain/Player';
import { MatchData } from '../../types/service/toxicData/MatchData';
import { MmrData } from '../../types/service/toxicData/MmrData';
import { MmrPerMatchData } from '../../types/service/toxicData/MmrPerMatchData';
import { StatsData } from '../../types/service/toxicData/StatsData';
import { TrueSkillData } from '../../types/service/toxicData/TrueSkillData';
import {
    getChampionPickBanMap,
    mapMatchHistory,
    mapMmrPerMatch,
    mapStats,
} from './dataMapper';

const placementEndpoint =
    'https://toxic-api-production.gggrunt16.workers.dev/placement';
const mmrPerMatchEndpoint =
    'https://toxic-api-production.gggrunt16.workers.dev/mmr_per_match';
const statsEndpoint =
    'https://toxic-api-production.gggrunt16.workers.dev/stats';
const matchHistoryEndpoint =
    'https://toxic-api-production.gggrunt16.workers.dev/matches';
const trueskillEndpoint =
    'https://toxic-api-production.gggrunt16.workers.dev/trueskill';

export const fetchPlayers = () =>
    axios
        .get<MmrData>(placementEndpoint, {
            headers: {
                Accept: 'application/json',
            },
        })
        .then((res) => res.data);

export const fetchStats = () =>
    axios
        .get<StatsData>(statsEndpoint, {
            headers: {
                Accept: 'application/json',
            },
        })
        .then((res) => res.data);

const fetchMmrPerMatch = () =>
    axios
        .get<MmrPerMatchData[]>(mmrPerMatchEndpoint, {
            headers: {
                Accept: 'application/json',
            },
        })
        .then((res) => res.data);

const fetchMatchHistory = () =>
    axios
        .get<MatchData>(matchHistoryEndpoint, {
            headers: {
                Accept: 'application/json',
            },
        })
        .then((res) => res.data);

const fetchTrueskill = () =>
    axios
        .get<TrueSkillData>(trueskillEndpoint, {
            headers: {
                Accept: 'application/json',
            },
        })
        .then((res) => res.data);

const usePlayerStats = () => {
    return useQuery<
        StatsData,
        Error,
        { players: Player[]; champions: { [id: string]: Champion } }
    >(['stats'], fetchStats, {
        select: (data) => {
            return mapStats(data);
        },
        staleTime: 20000,
    });
};

const usePlayersMmr = () => {
    return useQuery<MmrData, Error>(['simpleMmr'], fetchPlayers, {
        staleTime: 20000,
    });
};

const useMatchHistory = () => {
    return useQuery<MatchData, Error>(['matchHistory'], fetchMatchHistory, {
        staleTime: 2000,
    });
};

const useMmrPerMatch = () => {
    return useQuery<MmrPerMatchData[], Error>(
        ['mmrPerMatch'],
        fetchMmrPerMatch,
        {
            staleTime: 2000,
        }
    );
};

const usePlayersTrueSkill = () => {
    return useQuery<TrueSkillData, Error>(['trueskill'], fetchTrueskill, {
        select: (data) => {
            // we use all lower case ids, where this endpoint is giving us casing in the names
            const result: TrueSkillData = {};
            for (const entry of Object.entries(data)) {
                result[entry[0].toLowerCase()] = entry[1];
            }
            return result;
        },
        staleTime: 20000,
    });
};

type ServiceResponseBase = {
    isLoading: boolean;
    isError: boolean;
};

export const ToxicDataService = {
    usePlayers: (): { data: Player[] | undefined } & ServiceResponseBase => {
        // gets the player information without MMR AND champion information
        const statsResponse = usePlayerStats();

        // gets the player's MMR
        const mmrResponse = usePlayersMmr();

        // gets the player's trueskill
        const trueSkillResponse = usePlayersTrueSkill();

        const isLoading =
            statsResponse.isLoading ||
            mmrResponse.isLoading ||
            trueSkillResponse.isLoading;
        const isError =
            statsResponse.isError ||
            mmrResponse.isError ||
            trueSkillResponse.isError;

        // merge mmr response, stats response, and trueskill response here
        if (statsResponse.data && mmrResponse.data && trueSkillResponse.data) {
            const players = statsResponse.data.players;
            const data = players.map((player) => {
                return {
                    ...player,
                    mmr: mmrResponse.data.mmr[player.name],
                    trueskill: trueSkillResponse.data[player.name].rating,
                };
            });

            return {
                data,
                isLoading,
                isError,
            };
        } else {
            return {
                data: undefined,
                isLoading,
                isError,
            };
        }
    },
    usePlayer: (
        id: string
    ): { data: Player | undefined } & ServiceResponseBase => {
        // gets the player information without MMR AND champion information
        const statsResponse = usePlayerStats();

        // gets the player's MMR
        const mmrResponse = usePlayersMmr();

        // gets the player's trueskill
        const trueSkillResponse = usePlayersTrueSkill();

        const isLoading =
            statsResponse.isLoading ||
            mmrResponse.isLoading ||
            trueSkillResponse.isLoading;
        const isError =
            statsResponse.isError ||
            mmrResponse.isError ||
            trueSkillResponse.isError;

        // merge mmr response, stats response, and trueskill response here
        if (statsResponse.data && mmrResponse.data && trueSkillResponse.data) {
            const players = statsResponse.data.players;
            const playerData = players.find((player) => {
                return player.name === id;
            });

            const mmrData = Math.round(mmrResponse.data.mmr[id]);

            return {
                data: {
                    ...playerData,
                    name: id,
                    mmr: mmrData,
                    trueskill: playerData
                        ? trueSkillResponse.data[playerData.name].rating
                        : undefined,
                },
                isLoading,
                isError,
            };
        } else {
            return {
                data: undefined,
                isLoading,
                isError,
            };
        }
    },
    useChampions: (): {
        data: { [id: string]: Champion } | undefined;
    } & ServiceResponseBase => {
        // gets the player information without MMR AND champion information
        const statsResponse = usePlayerStats();

        // gets the match history used to compute ban and pick rate
        const matchHistoryResponse = useMatchHistory();

        const isLoading =
            statsResponse.isLoading || matchHistoryResponse.isLoading;
        const isError = statsResponse.isError || matchHistoryResponse.isError;

        if (statsResponse.data && matchHistoryResponse.data) {
            const data = statsResponse.data.champions;

            const matchData = matchHistoryResponse.data;
            const matches = matchData ? mapMatchHistory(matchData) : [];
            const championPickBanMap = getChampionPickBanMap(matches);

            // loop through data, and update the pick/ban rate
            for (const championName of Object.keys(data)) {
                data[championName] = {
                    ...data[championName],
                    banPercentage: championPickBanMap[championName]?.ban,
                    pickPercentage: championPickBanMap[championName]?.pick,
                };
            }

            return {
                data,
                isLoading,
                isError,
            };
        } else {
            return {
                data: undefined,
                isLoading,
                isError,
            };
        }
    },
    useChampion: (
        id: string
    ): { data: Champion | undefined } & ServiceResponseBase => {
        // gets the player information without MMR AND champion information
        const statsResponse = usePlayerStats();

        // gets the match history used to compute ban and pick rate
        const matchHistoryResponse = useMatchHistory();

        const isLoading =
            statsResponse.isLoading || matchHistoryResponse.isLoading;
        const isError = statsResponse.isError || matchHistoryResponse.isError;

        // merge mmr response and stats response here
        if (statsResponse.data && matchHistoryResponse.data) {
            const champion = statsResponse.data.champions[id];

            const matchData = matchHistoryResponse.data;
            const matches = matchData ? mapMatchHistory(matchData) : [];
            const championPickBanMap = getChampionPickBanMap(matches);

            const data = {
                ...champion,
                banPercentage: championPickBanMap[id]?.ban,
                pickPercentage: championPickBanMap[id]?.pick,
            };

            return {
                data,
                isLoading,
                isError,
            };
        } else {
            return {
                data: undefined,
                isLoading,
                isError,
            };
        }
    },
    useMatchHistory: (): {
        data: Match[] | undefined;
    } & ServiceResponseBase => {
        const matchHistoryResponse = useMatchHistory();

        if (matchHistoryResponse.data) {
            const matchData = matchHistoryResponse.data;
            return {
                data: mapMatchHistory(matchData),
                isLoading: matchHistoryResponse.isLoading,
                isError: matchHistoryResponse.isError,
            };
        } else {
            return {
                data: undefined,
                isLoading: matchHistoryResponse.isLoading,
                isError: matchHistoryResponse.isError,
            };
        }
    },
    useMmrPerMatch: (): {
        data: MmrHistoryItem[] | undefined;
    } & ServiceResponseBase => {
        const mmrPerMatchResponse = useMmrPerMatch();

        if (mmrPerMatchResponse.data) {
            const mmrData = mmrPerMatchResponse.data;
            return {
                data: mapMmrPerMatch(mmrData),
                isLoading: mmrPerMatchResponse.isLoading,
                isError: mmrPerMatchResponse.isError,
            };
        } else {
            return {
                data: undefined,
                isLoading: mmrPerMatchResponse.isLoading,
                isError: mmrPerMatchResponse.isError,
            };
        }
    },
};
