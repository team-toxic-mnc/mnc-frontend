import { MmrHistoryItem } from '../types/domain/MmrHistoryItem';

export function getMmrColor(mmr: number) {
    return mmr > 0
        ? `hsl(${120 * ((1800 - mmr) / 1800) * 4 * -1 + 120}, 100%, 67%)`
        : 'transparent';
}

/**
 * Takes in a collection of match history items and returns a map of
 * player name to an collection of their games (with the game id and the player's resulting mmr for that game)
 */
export function mapMmrHistoryCollectionToPlayerMmrHistoryMap(
    data: MmrHistoryItem[]
): { [key: string]: { gameId: number; mmr: number }[] } {
    const playerMMR: { [key: string]: { gameId: number; mmr: number }[] } = {};

    for (let i = 0; i < data.length; i++) {
        const match = data[i];
        for (const playerName of Object.keys(match.players)) {
            if (playerMMR[playerName] === undefined) {
                playerMMR[playerName] = [];
            }

            if (playerMMR[playerName].length > 0) {
                let mostRecent =
                    playerMMR[playerName][playerMMR[playerName].length - 1];
                if (mostRecent.mmr === match.players[playerName]) continue;
            }

            playerMMR[playerName].push({
                gameId: i + 1,
                mmr: match.players[playerName],
            });
        }
    }
    return playerMMR;
}

/**
 * Takes a collection of a player's mmr history items, and returns the mmr change
 * based on the last 5 games completed
 */
export function getMmrTrendingChange(data: { gameId: number; mmr: number }[]) {
    // this will return an array of the last 5 items (or if less than 5 items, the entire collection)
    const last5Matches = data.slice(-5);

    let total = 0;

    if (last5Matches.length <= 1) {
        return 0;
    }

    for (let i = 1; i < last5Matches.length; i++) {
        total = last5Matches[i].mmr - last5Matches[i - 1].mmr;
    }

    return total;
}
