import { Player } from '../types/domain/Player';

const MIN_GAMES_REQUIRED = 10;
const MAXIMUM_VALUE = 50;

export function getSprValue(player: Player): number {
    return player.trueskill &&
        (player.wins ?? 0) + (player.losses ?? 0) >= MIN_GAMES_REQUIRED
        ? Math.round(player.trueskill)
        : 0;
}

export function getSprColor(mmr: number) {
    return mmr > 0
        ? `hsl(${120 * ((50 - mmr) / MAXIMUM_VALUE) * -1 + 120}, 100%, 67%)`
        : 'transparent';
}
