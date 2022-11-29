import { Text, Tooltip } from '@chakra-ui/react';
import { Tag, TagLeftIcon } from '@chakra-ui/tag';
import { GiWingedSword } from 'react-icons/gi';
import { Player } from '../types/domain/Player';
import { getSprColor, getSprValue } from '../utils/sprHelpers';

export const SprTag = ({
    value,
    props,
}: {
    value?: number | Player;
    props?: { size?: string };
}) => {
    let spr = 0;
    if (value) {
        if (typeof value === 'number') {
            spr = value;
        } else if (typeof value === 'object') {
            spr = getSprValue(value);
        }
    }

    return (
        <Tooltip label='Season Power Ranking (SPR) is a grade for player performance within a season'>
            <Tag
                textAlign='center'
                bg={getSprColor(spr)}
                color={'gray.600'}
                size={props?.size}
                minW='100%'
            >
                <TagLeftIcon as={GiWingedSword}></TagLeftIcon>
                <Text minW='30px'>{spr > 0 ? spr : '—'}</Text>
            </Tag>
        </Tooltip>
    );
};
