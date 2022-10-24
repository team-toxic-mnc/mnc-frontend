import { Box, Flex, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { SEASON_0_BADGE } from '../data/rewards';
import { Player } from '../types/domain/Player';

export const AccoladesCollection = React.memo(function AccoladesCollection({
    player,
}: {
    player: Player;
}) {
    {
        return (
            <Flex>
                {(player.losses ?? 0) + (player.wins ?? 0) > 10 ? (
                    <Tooltip
                        label={
                            <>
                                <p
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    PROJECT: KRAKEN
                                </p>
                                <p>Monday Night Customs Founding Member</p>
                            </>
                        }
                    >
                        <Box marginRight='4'>
                            <img
                                width='70'
                                height='70'
                                src={SEASON_0_BADGE}
                                style={{ borderRadius: 8 }}
                            />
                        </Box>
                    </Tooltip>
                ) : null}
                {(player.losses ?? 0) + (player.wins ?? 0) >= 100 ? (
                    <Tooltip
                        label={
                            <>
                                <p
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    100 Game Club
                                </p>
                                <p>Play 100 games of Monday Night Customs</p>
                            </>
                        }
                    >
                        <Box marginRight='4'>
                            <img
                                width='70'
                                height='70'
                                src={
                                    'https://cdn.discordapp.com/attachments/1032887984179118131/1033906035104161882/100_badge.png'
                                }
                                style={{ borderRadius: 8 }}
                            />
                        </Box>
                    </Tooltip>
                ) : null}
            </Flex>
        );
    }
});
