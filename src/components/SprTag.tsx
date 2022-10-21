import { Tag, TagLeftIcon } from '@chakra-ui/tag';
import { Player } from '../types/domain/Player';
import { getMmrColor, getMmrValue } from '../utils/mmrHelpers';
import { GiWingedSword } from 'react-icons/gi';
import { Tooltip } from '@chakra-ui/react';

export const SprTag = ({
    player,
    props,
}: {
    player: Player;
    props?: { size?: string };
}) => {
    const rank = getMmrValue(player);
    let displayRank = '' + rank;
    if (rank === 0) {
        displayRank = '—';
    }
    return (
        <Tooltip label='Season Power Ranking (SPR): a grade for player performance within a season'>
            <Tag
                textAlign='center'
                bg={getMmrColor(rank)}
                color={'gray.600'}
                size={props?.size}
            >
                <TagLeftIcon as={GiWingedSword}></TagLeftIcon>
                {displayRank}
            </Tag>
        </Tooltip>
    );
};
