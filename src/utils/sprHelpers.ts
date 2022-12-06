import { GlickoHistoryItem } from '../types/domain/GlickoHistoryItem';
import { Player } from '../types/domain/Player';

const MIN_GAMES_REQUIRED = 30;
const MAXIMUM_VALUE = 1800;

export function getSprValue(player: Player): number {
    return player.glicko ? Math.round(player.glicko) : 0;
}

export function getSprColor(spr: number) {
    return spr > 0
        ? `hsl(${
              120 * ((MAXIMUM_VALUE - spr) / MAXIMUM_VALUE) * 4 * -1 + 120
          }, 100%, 67%)`
        : 'transparent';
}

export function isPlayerRanked(player: Player): boolean {
    return (player.wins ?? 0) + (player.losses ?? 0) >= MIN_GAMES_REQUIRED;
}

/**
 * Takes in a collection of match history items and returns a map of
 * player name to an collection of their games (with the game id and the player's resulting spr for that game)
 */
export function mapSprHistoryCollectionToPlayerSprHistoryMap(
    data: GlickoHistoryItem[]
): { [key: string]: { gameId: number; spr: number }[] } {
    const playerSPR: { [key: string]: { gameId: number; spr: number }[] } = {};

    for (let i = 0; i < data.length; i++) {
        const match = data[i];
        for (const playerName of Object.keys(match.players)) {
            if (playerSPR[playerName] === undefined) {
                playerSPR[playerName] = [];
            }

            if (playerSPR[playerName].length > 0) {
                let mostRecent =
                    playerSPR[playerName][playerSPR[playerName].length - 1];
                if (mostRecent.spr === match.players[playerName]) continue;
            }

            playerSPR[playerName].push({
                gameId: i + 1,
                spr: match.players[playerName],
            });
        }
    }
    return playerSPR;
}

/**
 * Takes a collection of a player's spr history items, and returns the average spr change
 * from the most recent games, up to five games worth of spr changes
 */
export function getSprTrendingChange(data: { gameId: number; spr: number }[]) {
    // this will return an array of the last 5 items (or if less than 5 items, the entire collection)
    const recentMatches = data.slice(-6);
    const matchCount = recentMatches.length;
    if (matchCount <= 1) {
        return 0;
    }
    const totalChange =
        recentMatches[matchCount - 1].spr - recentMatches[0].spr;
    const trend = totalChange / (matchCount - 1);
    // return rounded to nearest decimal
    return parseFloat(trend.toFixed(1));
}
