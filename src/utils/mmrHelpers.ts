import { Player } from '../types/domain/Player';

const TRUESKILL_MMR_CONVERSION_FACTOR = 100;
const INITIAL_TRUESKILL = 25;
export const INITIAL_MMR = INITIAL_TRUESKILL * TRUESKILL_MMR_CONVERSION_FACTOR;

export function getMmrValue(player: Player): number {
    return player.trueskill
        ? Math.round(player.trueskill * TRUESKILL_MMR_CONVERSION_FACTOR)
        : 0;
}
