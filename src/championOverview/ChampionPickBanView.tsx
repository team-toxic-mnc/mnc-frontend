import { Flex, Tooltip as UiTooltip } from '@chakra-ui/react';
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { Champion } from '../types/domain/Champion';
import { Player } from '../types/domain/Player';
import { getMmrValue } from '../utils/mmrHelpers';

ChartJS.register(
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Filler,
    Tooltip,
    Legend
);

function processChampion(data: { pick: number; ban: number }[]): {
    pickRate: { x: number; y: number }[];
    banRate: { x: number; y: number }[];
} {
    const pickRate = data.map((value, index) => {
        return { x: index, y: Math.round(value.pick) };
    });

    const banRate = data.map((value, index) => {
        return { x: index, y: Math.round(value.ban) };
    });

    return {
        pickRate,
        banRate,
    };
}

export const ChampionPickBanView = React.memo(function ChampionPickBanView({
    champion,
}: {
    champion: Champion;
}) {
    if (champion.pickBanHistory === undefined) {
        return null;
    }

    const { pickRate, banRate } = processChampion(champion.pickBanHistory);

    const playerMmrPerMatchData = {
        datasets: [
            {
                label: 'Pick Rate',
                data: pickRate,
                fill: true,
                backgroundColor: 'rgba(99, 132, 255, 0.5)',
                borderColor: 'rgb(99, 132, 255, 0.5)',
                pointBackgroundColor: 'rgb(99, 132, 255)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(99, 132, 225)',
            },
            {
                label: 'Ban Rate',
                data: banRate,
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
        <Line
            data={playerMmrPerMatchData}
            style={{ maxHeight: 300 }}
            options={{
                scales: {
                    x: {
                        type: 'linear',
                        min: 1,
                        max: champion.pickBanHistory.length,
                    },
                    y: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                    },
                },
            }}
        />
    );
});
