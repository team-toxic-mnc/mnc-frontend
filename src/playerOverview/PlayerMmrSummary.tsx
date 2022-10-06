import { Flex } from '@chakra-ui/react';
import {
    Chart as ChartJS,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { FiChevronDown, FiChevronUp, FiMinus } from 'react-icons/fi';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import {
    getMmrTrendingPercentage,
    mapMmrHistoryCollectionToPlayerMmrHistoryMap,
} from '../utils/mmrHelpers';

ChartJS.register(
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Filler,
    Tooltip,
    Legend
);

function processPlayerMmr(
    data: { gameId: number; mmr: number }[]
): { x: number; y: number }[] {
    return data.map((value) => {
        return { x: value.gameId, y: value.mmr };
    });
}

export const PlayerMmrSummary = React.memo(function PlayerMmrSummary({
    playerId,
}: {
    playerId: string;
}) {
    const mmrPerMatchResponse = ToxicDataService.useMmrPerMatch();
    const mmrPerMatch = mmrPerMatchResponse.data ?? [];
    const mmrPerMatchMap =
        mapMmrHistoryCollectionToPlayerMmrHistoryMap(mmrPerMatch);

    // get the mmr history collection for the selected user
    const playerMmrPerMatch = mmrPerMatchMap[playerId] ?? [];

    // ignore the first 10 games since they are used for placement
    const playerMmrPerMatchSliced = playerMmrPerMatch.slice(9);

    // calculate the trending percentage to show above the graph
    const mmrChangePercentage = getMmrTrendingPercentage(
        playerMmrPerMatchSliced
    );

    const test = processPlayerMmr(playerMmrPerMatchSliced);

    const playerMmrPerMatchData = {
        datasets: [
            {
                data: test,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
            },
        ],
    };

    return (
        <Flex direction={'column'}>
            {playerMmrPerMatchSliced.length > 1 ? (
                <>
                    <Flex
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <h1 style={{ fontSize: 60 }}>
                            {`${mmrChangePercentage}%`}
                        </h1>
                        {mmrChangePercentage == 0 ? (
                            <FiMinus size={'60'} color={'orange'} />
                        ) : mmrChangePercentage > 0 ? (
                            <FiChevronUp size={'60'} color={'green'} />
                        ) : (
                            <FiChevronDown size={'60'} color={'red'} />
                        )}
                    </Flex>
                    <Line
                        data={playerMmrPerMatchData}
                        style={{ maxHeight: 300 }}
                        options={{
                            scales: {
                                x: {
                                    type: 'linear',
                                    min: playerMmrPerMatchSliced[0]?.gameId,
                                    max: playerMmrPerMatchSliced[
                                        playerMmrPerMatchSliced.length - 1
                                    ]?.gameId,
                                },
                                y: {
                                    suggestedMin: 1300,
                                    suggestedMax: 1800,
                                },
                            },
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                    />
                </>
            ) : (
                <Flex
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <h1 style={{ fontSize: 30 }}>{`Not enough data.`}</h1>
                    <h1 style={{ fontSize: 30 }}>
                        {`Player needs to complete more games.`}
                    </h1>
                </Flex>
            )}
        </Flex>
    );
});
