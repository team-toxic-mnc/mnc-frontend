import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { MatchDisplay } from '../components/MatchDisplay';
import { DataDragonService } from '../services/dataDragon/DataDragonService';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { getMatchWithImages } from '../utils/championImageHelpers';

export async function loader(data: { params: any }) {
    return data.params.matchId;
}

export const MatchScreen = React.memo(function MatchScreen() {
    const matchId = useLoaderData() as string;

    const matchHistoryResponse = ToxicDataService.useMatchHistory();
    const matchHistory = matchHistoryResponse.data ?? [];

    const championIdMapResponse = DataDragonService.useChampionIdMap();
    const championIdMap = championIdMapResponse.data ?? {};

    const rawMatch = matchHistory.find((match) => match.id === matchId);

    if (matchHistoryResponse.isLoading) {
        return <Loading />;
    }

    if (rawMatch === undefined) {
        return <Error error={'Game not found!'} />;
    }

    const match = getMatchWithImages(rawMatch, championIdMap);

    return (
        <MatchDisplay
            title={`Game ${match.id}`}
            team1Label={`TEAM 1: ${
                match.winner === 'Team 1' ? ' VICTORY' : ' DEFEAT'
            }`}
            team2Label={`TEAM 2: ${
                match.winner === 'Team 2' ? ' VICTORY' : ' DEFEAT'
            }`}
            team1={match.team1.players}
            team2={match.team2.players}
            team1Bans={match.team1.bans}
            team2Bans={match.team2.bans}
        />
    );
});
