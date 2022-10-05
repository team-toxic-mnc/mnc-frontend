import React from 'react';
import { Player } from '../types/domain/Player';
import { getMmrColor } from '../utils/mmrColorHelpers';

export const MmrCard = React.memo(function MmrCard({
    player,
}: {
    player: Player;
}) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                maxWidth: 150,
                marginLeft: 32,
                padding: 16,
                marginRight: 32,
                alignItems: 'center',
            }}
        >
            <h1
                style={
                    player.mmr
                        ? {
                              fontSize: 60,
                              backgroundColor: getMmrColor(player.mmr),
                              borderRadius: 10,
                              paddingLeft: 4,
                              paddingRight: 4,
                          }
                        : {
                              fontSize: 30,
                          }
                }
            >
                {player.mmr && (player.wins ?? 0) + (player.losses ?? 0) >= 10
                    ? Math.round(player.mmr)
                    : 'Not Placed'}
            </h1>
            <h1>{'MMR'}</h1>
        </div>
    );
});
