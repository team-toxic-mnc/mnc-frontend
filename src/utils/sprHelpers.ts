import { Player } from '../types/domain/Player';

const MIN_GAMES_REQUIRED = 10;
const MAXIMUM_VALUE = 1800;

export function getSprValue(player: Player): number {
    return player.trueskill &&
        player.mmr &&
        (player.wins ?? 0) + (player.losses ?? 0) >= MIN_GAMES_REQUIRED
        ? Math.round(player.trueskill) + Math.round(player.mmr)
        : 0;
}

export function getSprColor(mmr: number) {
    return mmr > 0
        ? `hsl(${120 * ((50 - mmr) / MAXIMUM_VALUE) * -1 + 120}, 100%, 67%)`
        : 'transparent';
}
