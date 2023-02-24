import { Flex } from '@chakra-ui/react';
import React from 'react';
import {
    CLASH_2022_BADGE,
    CLASH_2022_PARTICIPANTS,
    GAME_100_BADGE,
    SEASON_0_BADGE,
    SEASON_1_1_BADGE,
    SEASON_1_5_BADGE,
    SEASON_1_BADGE,
    SEASON_1_QUALIFERS,
    SEASON_1_TOP_1,
    SEASON_1_TOP_5,
} from '../data/accolades';
import { Player } from '../types/domain/Player';
import { AccoladeBadge } from './AccoladeBadge';

export const AccoladesCollection = React.memo(function AccoladesCollection({
    player,
}: {
    player: Player;
}) {
    {
        return (
            <Flex>
                {(player.losses ?? 0) + (player.wins ?? 0) >= 10 ? (
                    <AccoladeBadge
                        title='PROJECT: KRAKEN'
                        description='Monday Night Customs Founding Member'
                        imageUri={SEASON_0_BADGE}
                    />
                ) : null}
                {(player.losses ?? 0) + (player.wins ?? 0) >= 100 ? (
                    <AccoladeBadge
                        title='100 GAMES'
                        description='Play 100 games of Monday Night Customs'
                        imageUri={GAME_100_BADGE}
                    />
                ) : null}
                {CLASH_2022_PARTICIPANTS.indexOf(player.name) > -1 ? (
                    <AccoladeBadge
                        title='CLASH 2022'
                        description='Played in ARAM Clash 2022'
                        imageUri={CLASH_2022_BADGE}
                    />
                ) : null}
                {SEASON_1_QUALIFERS.indexOf(player.name) > -1 ? (
                    <AccoladeBadge
                        title='SEASON 1 QUALIFER'
                        description='Qualified for MNC Season 1'
                        imageUri={SEASON_1_BADGE}
                    />
                ) : null}
                {SEASON_1_TOP_5.indexOf(player.name) > -1 ? (
                    <AccoladeBadge
                        title='SEASON 1 TOP 5'
                        description='Played top 5 in MNC Season 1'
                        imageUri={SEASON_1_5_BADGE}
                    />
                ) : null}
                {SEASON_1_TOP_1.indexOf(player.name) > -1 ? (
                    <AccoladeBadge
                        title='SEASON 1 MASTER'
                        description='Placed #1 in MNC Season 1'
                        imageUri={SEASON_1_1_BADGE}
                    />
                ) : null}
            </Flex>
        );
    }
});
