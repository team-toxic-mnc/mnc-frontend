import React from 'react';
import { Player } from '../types/domain/Player';
import { getMmrColor, getMmrValue } from '../utils/mmrHelpers';

export const MmrCard = React.memo(function MmrCard({
    player,
}: {
    player: Player;
}) {
    const mmr = getMmrValue(player);
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
                {mmr > 0 ? mmr : 'N/A'}
            </h1>
            <h1>{'MMR'}</h1>
        </div>
    );
});
