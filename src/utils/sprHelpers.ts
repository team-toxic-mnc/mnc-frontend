import { Player } from '../types/domain/Player';

const MIN_GAMES_REQUIRED = 30;
const MAXIMUM_VALUE = 1800;

export function getSprValue(player: Player): number {
    return player.trueskill && player.glicko
        ? Math.round(player.trueskill) + Math.round(player.glicko)
        : 0;
}

export function getSprColor(spr: number) {
    return spr > 0
        ? `hsl(${120 * ((50 - spr) / MAXIMUM_VALUE) * -1 + 120}, 100%, 67%)`
        : 'transparent';
}

export function isPlayerRanked(player: Player): boolean {
    return (player.wins ?? 0) + (player.losses ?? 0) >= MIN_GAMES_REQUIRED;
}
