import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { PlayerCard } from './slideshow/PlayerCard';

export const PlayerCardScreen = React.memo(function PlayerCardScreen() {
    const playerId = useLoaderData() as string;
    const playerResponse = ToxicDataService.usePlayer(playerId ?? '');
    const player = playerResponse.data;

    if (player === undefined) {
        return null;
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                backgroundColor: 'magenta',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 64,
            }}
        >
            <PlayerCard player={player} />
        </div>
    );
});
