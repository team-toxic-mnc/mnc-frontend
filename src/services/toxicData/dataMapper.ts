import { Champion } from '../../types/domain/Champion';
import { Match } from '../../types/domain/Match';
import { GlickoHistoryItem } from '../../types/domain/GlickoHistoryItem';
import { Player, PlayerRecord } from '../../types/domain/Player';
import { MatchData } from '../../types/service/toxicData/MatchData';
import { GlickoPerMatchData } from '../../types/service/toxicData/GlickoPerMatchData';
import { StatsData } from '../../types/service/toxicData/StatsData';

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

export function getChampionPickBanMap(matches: Match[]): {
    [id: string]: { pick: number; ban: number };
} {
    const pickBan: { [id: string]: { pick: number; ban: number } } = {};

    // count champion pick/ban over selected matches
    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];

        // loop through team 1 picks
        for (let k = 0; k < match.team1.players.length; k++) {
            if (pickBan[match.team1.players[k].champion.name] === undefined) {
                pickBan[match.team1.players[k].champion.name] = {
                    pick: 1,
                    ban: 0,
                };
            } else {
                pickBan[match.team1.players[k].champion.name] = {
                    ...pickBan[match.team1.players[k].champion.name],
                    pick:
                        pickBan[match.team1.players[k].champion.name].pick + 1,
                };
            }
        }

        // loop through team 2 picks
        for (let k = 0; k < match.team2.players.length; k++) {
            if (pickBan[match.team2.players[k].champion.name] === undefined) {
                pickBan[match.team2.players[k].champion.name] = {
                    pick: 1,
                    ban: 0,
                };
            } else {
                pickBan[match.team2.players[k].champion.name] = {
                    ...pickBan[match.team2.players[k].champion.name],
                    pick:
                        pickBan[match.team2.players[k].champion.name].pick + 1,
                };
            }
        }

        // loop through team 1 bans
        for (let k = 0; k < match.team1.bans.length; k++) {
            if (pickBan[match.team1.bans[k].name] === undefined) {
                pickBan[match.team1.bans[k].name] = {
                    pick: 0,
                    ban: 1,
                };
            } else {
                pickBan[match.team1.bans[k].name] = {
                    ...pickBan[match.team1.bans[k].name],
                    ban: pickBan[match.team1.bans[k].name].ban + 1,
                };
            }
        }

        // loop through team 2 bans
        for (let k = 0; k < match.team2.bans.length; k++) {
            if (pickBan[match.team2.bans[k].name] === undefined) {
                pickBan[match.team2.bans[k].name] = {
                    pick: 0,
                    ban: 1,
                };
            } else {
                pickBan[match.team2.bans[k].name] = {
                    ...pickBan[match.team2.bans[k].name],
                    ban: pickBan[match.team2.bans[k].name].ban + 1,
                };
            }
        }
    }

    // calculate pick/ban rate in percent unit
    for (const champName of Object.keys(pickBan)) {
        pickBan[champName] = {
            pick: Math.round((pickBan[champName].pick / matches.length) * 100),
            ban: Math.round((pickBan[champName].ban / matches.length) * 100),
        };
    }

    return pickBan;
}
