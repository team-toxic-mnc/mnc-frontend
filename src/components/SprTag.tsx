import { Text, Tooltip } from '@chakra-ui/react';
import { Tag, TagLeftIcon } from '@chakra-ui/tag';
import { GiWingedSword } from 'react-icons/gi';
import { Player } from '../types/domain/Player';
import {
    getSprColor,
    getSprValue,
    MIN_GAMES_REQUIRED,
} from '../utils/sprHelpers';

export const SprTag = ({
    value,
    props,
}: {
    value?: number | Player;
    props?: { size?: string };
}) => {
    let spr = 0;
    let isQualified = true;
    if (value) {
        if (typeof value === 'number') {
            spr = value;
        } else if (typeof value === 'object') {
            isQualified =
                (value.wins ?? 0) + (value.losses ?? 0) >= MIN_GAMES_REQUIRED;
            spr = getSprValue(value);
        }
    }

    return (
        <Tooltip label='Season Power Ranking (SPR) is a grade for player performance within a season'>
            <Tag
                textAlign='center'
                bg={isQualified ? getSprColor(spr) : undefined}
                color={'gray.600'}
                size={props?.size}
                minW='100%'
            >
                <TagLeftIcon as={GiWingedSword}></TagLeftIcon>
                <Text minW='30px'>
                    {spr > 0 ? spr : '—'}
                    {isQualified ? undefined : '*'}
                </Text>
            </Tag>
        </Tooltip>
    );
};
