import { Champion } from '../../types/domain/Champion';
import { Match } from '../../types/domain/Match';
import { GlickoHistoryItem } from '../../types/domain/GlickoHistoryItem';
import { Player, PlayerRecord } from '../../types/domain/Player';
import { MatchData } from '../../types/service/toxicData/MatchData';
import { GlickoPerMatchData } from '../../types/service/toxicData/GlickoPerMatchData';
import { StatsData } from '../../types/service/toxicData/StatsData';
import { ChampionClassMap } from '../../data/championClasses';

export function mapStats(data: StatsData): {
    players: Player[];
    champions: { [id: string]: Champion };
} {
    const championMap: { [key: string]: Champion } = {};
    const players: Player[] = Object.entries(data).map((kvPair) => {
        let wins = 0;
        let losses = 0;
        const champions: { [key: string]: Champion } = {};
        const opponents: { [key: string]: PlayerRecord } = {};
        const teammates: { [key: string]: PlayerRecord } = {};
        // loop through all of the champions this player has and collect the wins and loses
        for (const [championName, champion] of Object.entries(
            kvPair[1].champion
        )) {
            wins += champion.win;
            losses += champion.loss;

            champions[championName] = {
                name: championName,
                losses: champion.loss,
                wins: champion.win,
                totalGames: champion.loss + champion.win,
                winPercentage: Math.round(champion.win_rate * 100),
            };

            // also update our champion map
            if (championMap[championName] === undefined) {
                const totalGames = champion.loss + champion.win;
                // champion does not exist in our map, so we can add it
                championMap[championName] = {
                    name: championName,
                    losses: champion.loss,
                    wins: champion.win,
                    totalGames: totalGames,
                    winPercentage: Math.round(
                        (champion.win / totalGames) * 100
                    ),
                };
            } else {
                const wins = championMap[championName].wins + champion.win;
                const losses = championMap[championName].losses + champion.loss;
                championMap[championName] = {
                    name: championName,
                    losses,
                    wins,
                    winPercentage: Math.round((wins / (wins + losses)) * 100),
                    totalGames:
                        championMap[championName].totalGames +
                        champion.loss +
                        champion.win,
                };
            }
        }

        // loop through all of the teammates this player has and collect the wins and losses
        for (const [playerName, player] of Object.entries(kvPair[1].teammate)) {
            teammates[playerName] = {
                name: playerName,
                wins: player.win,
                losses: player.loss,
                totalGames: player.games,
                winPercentage: Math.round(player.win_rate * 100),
            };
        }

        // loop through all of the opponents this player has and collect the wins and losses
        for (const [playerName, player] of Object.entries(kvPair[1].opponent)) {
            opponents[playerName] = {
                name: playerName,
                wins: player.win,
                losses: player.loss,
                totalGames: player.games,
                winPercentage: Math.round(player.win_rate * 100),
            };
        }

        return {
            name: kvPair[0],
            wins,
            losses,
            champions,
            teammates,
            opponents,
        };
    });

    return { players, champions: championMap };
}

export function mapMatchHistory(data: MatchData): Match[] {
    const history: Match[] = [];
    for (const rawData of data.data) {
        const dateParts = rawData.Date.split('/');
        history.push({
            id: rawData['Game ID'].toString(),
            date: new Date(
                Number.parseInt(dateParts[2]),
                Number.parseInt(dateParts[0]) - 1,
                Number.parseInt(dateParts[1])
            ),
            team1: {
                players: [
                    {
                        name: rawData['Team 1 Player 1 Name'],
                        champion: {
                            name: rawData['Team 1 Player 1 Champion'],
                        },
                    },
                    {
                        name: rawData['Team 1 Player 2 Name'],
                        champion: {
                            name: rawData['Team 1 Player 2 Champion'],
                        },
                    },
                    {
                        name: rawData['Team 1 Player 3 Name'],
                        champion: {
                            name: rawData['Team 1 Player 3 Champion'],
                        },
                    },
                    {
                        name: rawData['Team 1 Player 4 Name'],
                        champion: {
                            name: rawData['Team 1 Player 4 Champion'],
                        },
                    },
                    {
                        name: rawData['Team 1 Player 5 Name'],
                        champion: {
                            name: rawData['Team 1 Player 5 Champion'],
                        },
                    },
                ],
                bans: [
                    {
                        name: rawData['Team 1 Ban 1'],
                    },
                    {
                        name: rawData['Team 1 Ban 2'],
                    },
                    {
                        name: rawData['Team 1 Ban 3'],
                    },
                    {
                        name: rawData['Team 1 Ban 4'],
                    },
                    {
                        name: rawData['Team 1 Ban 5'],
                    },
                ],
            },
            team2: {
                players: [
                    {
                        name: rawData['Team 2 Player 1 Name'],
                        champion: {
                            name: rawData['Team 2 Player 1 Champion'],
                        },
                    },
                    {
                        name: rawData['Team 2 Player 2 Name'],
                        champion: {
                            name: rawData['Team 2 Player 2 Champion'],
                        },
                    },
                    {
                        name: rawData['Team 2 Player 3 Name'],
                        champion: {
                            name: rawData['Team 2 Player 3 Champion'],
                        },
                    },
                    {
                        name: rawData['Team 2 Player 4 Name'],
                        champion: {
                            name: rawData['Team 2 Player 4 Champion'],
                        },
                    },
                    {
                        name: rawData['Team 2 Player 5 Name'],
                        champion: {
                            name: rawData['Team 2 Player 5 Champion'],
                        },
                    },
                ],
                bans: [
                    {
                        name: rawData['Team 2 Ban 1'],
                    },
                    {
                        name: rawData['Team 2 Ban 2'],
                    },
                    {
                        name: rawData['Team 2 Ban 3'],
                    },
                    {
                        name: rawData['Team 2 Ban 4'],
                    },
                    {
                        name: rawData['Team 2 Ban 5'],
                    },
                ],
            },
            winner: rawData.Winner as 'Team 1' | 'Team 2',
        });
    }

    // return the history as a sorted list using id as the sort
    const sortedHistory = history.sort(
        (a, b) => Number.parseInt(b.id) - Number.parseInt(a.id)
    );
    return sortedHistory;
}

export function mapGlickoPerMatch(
    data: GlickoPerMatchData[]
): GlickoHistoryItem[] {
    return data.map((value, index) => {
        const players: { [key: string]: number } = {};

        for (const [k, v] of Object.entries(value.mmr)) {
            players[k] = Math.round(v);
        }

        return {
            id: index.toString(),
            players: players,
        };
    });
}

// matches is expected to be listed from newest to oldest
export function getChampionPickBanMap(latestMatchList: Match[]): {
    [id: string]: { pick: number; ban: number }[];
} {
    // the
    const matches = latestMatchList.reverse();
    const pickBan: {
        [id: string]: { pick: number; ban: number }[];
    } = {};

    // initialize all champion pick bans to 0%
    for (const championName of Object.keys(ChampionClassMap)) {
        pickBan[championName] = [];
    }

    // count champion pick/ban over selected matches
    for (let matchNo = 1; matchNo <= matches.length; matchNo++) {
        const match = matches[matchNo - 1];

        // loop through team 1 picks
        for (let k = 0; k < match.team1.players.length; k++) {
            const latestPickBanData =
                matchNo > 1
                    ? pickBan[match.team1.players[k].champion.name][matchNo - 2]
                    : { pick: 0, ban: 0 };
            pickBan[match.team1.players[k].champion.name].push({
                pick:
                    (((latestPickBanData.pick / 100) * (matchNo - 1) + 1) /
                        matchNo) *
                    100,
                ban:
                    (((latestPickBanData.ban / 100) * (matchNo - 1)) /
                        matchNo) *
                    100,
            });
        }

        // loop through team 2 picks
        for (let k = 0; k < match.team2.players.length; k++) {
            const latestPickBanData =
                matchNo > 1
                    ? pickBan[match.team2.players[k].champion.name][matchNo - 2]
                    : { pick: 0, ban: 0 };
            pickBan[match.team2.players[k].champion.name].push({
                pick:
                    (((latestPickBanData.pick / 100) * (matchNo - 1) + 1) /
                        matchNo) *
                    100,
                ban:
                    (((latestPickBanData.ban / 100) * (matchNo - 1)) /
                        matchNo) *
                    100,
            });
        }

        // loop through team 1 bans
        for (let k = 0; k < match.team1.bans.length; k++) {
            const championData = pickBan[match.team1.bans[k].name];
            // missed bans appear as empty space, and will be undefined
            if (championData !== undefined) {
                const latestPickBanData =
                    matchNo > 1
                        ? championData[matchNo - 2]
                        : { pick: 0, ban: 0 };
                championData.push({
                    pick:
                        (((latestPickBanData.pick / 100) * (matchNo - 1)) /
                            matchNo) *
                        100,
                    ban:
                        (((latestPickBanData.ban / 100) * (matchNo - 1) + 1) /
                            matchNo) *
                        100,
                });
            }
        }

        // loop through team 2 bans
        for (let k = 0; k < match.team2.bans.length; k++) {
            const championData = pickBan[match.team2.bans[k].name];
            // missed bans appear as empty space, and will be undefined
            if (championData !== undefined) {
                const latestPickBanData =
                    matchNo > 1
                        ? championData[matchNo - 2]
                        : { pick: 0, ban: 0 };
                championData.push({
                    pick:
                        (((latestPickBanData.pick / 100) * (matchNo - 1)) /
                            matchNo) *
                        100,
                    ban:
                        (((latestPickBanData.ban / 100) * (matchNo - 1) + 1) /
                            matchNo) *
                        100,
                });
            }
        }

        // now that we have finished going over the teams, update all other champions that weren't selected
        for (const championName of Object.keys(pickBan)) {
            if (pickBan[championName].length !== matchNo) {
                if (pickBan[championName].length === 0) {
                    pickBan[championName].push({ pick: 0, ban: 0 });
                } else {
                    pickBan[championName].push({
                        pick:
                            (((pickBan[championName][matchNo - 2].pick / 100) *
                                (matchNo - 1)) /
                                matchNo) *
                            100,
                        ban:
                            (((pickBan[championName][matchNo - 2].ban / 100) *
                                (matchNo - 1)) /
                                matchNo) *
                            100,
                    });
                }
            }
        }
    }

    return pickBan;
}
