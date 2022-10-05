import React, { useEffect, useMemo, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Error } from '../components/Error';
import { SortableTable } from '../components/SortableTable';
import { StatsCard } from '../components/StatsCard';
import { Champion } from '../types/domain/Champion';
import { Player, PlayerRecord } from '../types/domain/Player';
import {
    getChampionImage,
    getMatchWithImages,
} from '../utils/championImageHelpers';

import { championClassWinRates, ChampionClass } from '../data/championClasses';
import { Line, Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartData,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import { getMmrColor } from '../utils/mmrColorHelpers';
import { SummonerCollage } from '../components/SummonerCollage';
import {
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { PlayerScreenChampion } from './types/PlayerScreenChampion';
import {
    championColumns,
    opponentColumns,
    teammateColumns,
} from './playerScreenColumnHelper';
import { DataDragonService } from '../services/dataDragon/DataDragonService';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import {
    MatchWithImages,
    playerMatchHistoryColumns,
} from '../matchHistory/matchHistoryColumnHelper';
import { Match } from '../types/domain/Match';
import { Loading } from '../components/Loading';
import { MmrHistoryItem } from '../types/domain/MmrHistoryItem';
import { MmrCard } from '../components/MmrCard';
import { FiChevronDown, FiChevronUp, FiMinus } from 'react-icons/fi';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Filler,
    Tooltip,
    Legend
);

export async function loader(data: { params: any }) {
    return data.params.playerId;
}

const processMmrChanges = (data: MmrHistoryItem[]) => {
    const playerMMR: { [key: string]: { gameId: number; mmr: number }[] } = {};

    for (let i = 0; i < data.length; i++) {
        const match = data[i];
        for (const playerName of Object.keys(match.players)) {
            if (playerMMR[playerName] === undefined) {
                playerMMR[playerName] = [];
            }

            if (playerMMR[playerName].length > 0) {
                let mostRecent =
                    playerMMR[playerName][playerMMR[playerName].length - 1];
                if (mostRecent.mmr === match.players[playerName]) continue;
            }

            playerMMR[playerName].push({
                gameId: i + 1,
                mmr: match.players[playerName],
            });
        }
    }
    return playerMMR;
};

/**
 * Given a player, create an array of champions that player has played with image url populated
 * @param data
 */
const processPlayerChampions = (
    data: Player,
    championIdMap: { [key: string]: string }
): PlayerScreenChampion[] => {
    return (
        data.champions ? Array.from(Object.values(data.champions)) : []
    ).map((champion: Champion) => {
        return {
            ...champion,
            imageUrl: championIdMap[champion.name]
                ? getChampionImage(championIdMap[champion.name]).square
                : '',
        };
    });
};

function isPlayerMatchWinner(player: Player, match: Match) {
    return match.winner === 'Team 1'
        ? match.team1.players.findIndex(
              (matchPlayer) =>
                  matchPlayer.name.toLowerCase() === player.name.toLowerCase()
          ) > -1
        : match.team2.players.findIndex(
              (matchPlayer) =>
                  matchPlayer.name.toLowerCase() === player.name.toLowerCase()
          ) > -1;
}

export const PlayerScreen = React.memo(function PlayerScreen() {
    const navigate = useNavigate();
    const playerId = useLoaderData() as string;
    const playerResponse = ToxicDataService.usePlayer(playerId ?? '');
    const player = playerResponse.data;

    const championIdMapResponse = DataDragonService.useChampionIdMap();
    const championIdMap = championIdMapResponse.data ?? {};

    const matchHistoryResponse = ToxicDataService.useMatchHistory();
    const matchHistory = matchHistoryResponse.data ?? [];

    const mmrPerMatchResponse = ToxicDataService.useMmrPerMatch();
    const mmrPerMatch = mmrPerMatchResponse.data ?? [];
    const mmrPerMatchMap = processMmrChanges(mmrPerMatch);
    const playerMmrPerMatch = mmrPerMatchMap[playerId] ?? [];
    const playerMmrPerMatchSliced = playerMmrPerMatch.slice(10).map((value) => {
        return { x: value.gameId, y: value.mmr };
    });
    const last5Matches = playerMmrPerMatchSliced.slice(-5);
    const mmrChangePercentage =
        last5Matches.length > 0
            ? Math.round(
                  ((last5Matches[last5Matches.length - 1].y -
                      last5Matches[0].y) /
                      last5Matches[0].y) *
                      10000
              ) / 100
            : 0;

    const playerMmrPerMatchData = {
        datasets: [
            {
                data: playerMmrPerMatchSliced,
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

    // only recompute the player classes when are looking at a new player
    const playerClasses = useMemo(
        () => championClassWinRates(Object.values(player?.champions ?? {})),
        [player?.name]
    );

    const chartLabels = Object.keys(ChampionClass).map((value) => {
        return value.toString();
    });

    const chartData: ChartData<'radar', (number | null)[], unknown> = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Wins',
                data: Object.values(playerClasses).map((value) => value.wins),
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Total Games',
                data: Object.values(playerClasses).map(
                    (value) => value.losses + value.wins
                ),
                fill: true,
                backgroundColor: 'rgba(99, 132, 255, 0.5)',
                borderColor: 'rgb(99, 132, 255, 0.5)',
                pointBackgroundColor: 'rgb(99, 132, 255)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(99, 132, 225)',
            },
        ],
    };

    if (playerResponse.isError) {
        return <Error error={'Something went wrong! Try again later.'} />;
    }

    if (playerResponse.isLoading) {
        return <Loading />;
    }

    if (player === undefined) {
        return <Error error={'Player not found!'} />;
    }

    const playerChampionData: Champion[] = processPlayerChampions(
        player,
        championIdMap
    );

    const playerMatchHistory: MatchWithImages[] = matchHistory
        .filter((match) => {
            return (
                match.team1.players.findIndex(
                    (matchPlayer) =>
                        matchPlayer.name.toLowerCase() ===
                        player.name.toLowerCase()
                ) > -1 ||
                match.team2.players.findIndex(
                    (matchPlayer) =>
                        matchPlayer.name.toLowerCase() ===
                        player.name.toLowerCase()
                ) > -1
            );
        })
        .map((match) => {
            return {
                ...getMatchWithImages(match, championIdMap),
                winner: isPlayerMatchWinner(player, match) ? 'WIN' : 'LOSS',
                playerName: player.name,
            };
        });

    const playerTeammateData: PlayerRecord[] = Object.values(
        player.teammates ?? []
    );
    const playerOpponentData: PlayerRecord[] = Object.values(
        player.opponents ?? []
    );

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    flex: 1,
                    marginBottom: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1
                    style={{
                        paddingLeft: 8,
                        fontSize: 32,
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        alignSelf: 'flex-start',
                    }}
                >
                    {player.name.toUpperCase()}
                </h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                        flex: 1,
                        flexWrap: 'wrap',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginLeft: 32,
                            marginRight: 32,
                            justifyContent: 'center',
                        }}
                    >
                        <div>
                            <SummonerCollage player={player} />
                        </div>
                        <div style={{ marginLeft: 16 }}>
                            <StatsCard stats={player} hideName={true} />
                        </div>
                        <MmrCard player={player} />
                        <div
                            style={{
                                display: 'flex',
                                flex: 1,
                                maxWidth: 320,
                                padding: 16,
                            }}
                        >
                            <Radar data={chartData as any} />
                        </div>
                    </div>
                </div>
            </div>
            <Tabs
                style={{
                    alignSelf: 'stretch',
                    flex: 1,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <TabList style={{ maxWidth: 1024 }}>
                    <Tab>Champion Overview</Tab>
                    <Tab>Match History</Tab>
                    <Tab>MMR Summary</Tab>
                    <Tab>Teammate Record</Tab>
                    <Tab>Opponent Record</Tab>
                </TabList>
                <TabPanels style={{ maxWidth: 1024 }}>
                    <TabPanel>
                        <SortableTable
                            columns={championColumns}
                            data={playerChampionData}
                            getRowProps={(row: any) => {
                                return {
                                    onClick: () => {
                                        navigate(
                                            '/championOverview/' +
                                                row.getValue('name')
                                        );
                                        window.scrollTo(0, 0);
                                    },
                                };
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <SortableTable
                            columns={playerMatchHistoryColumns}
                            data={playerMatchHistory}
                            getRowProps={(row: any) => {
                                return {
                                    onClick: () => {
                                        navigate(
                                            '/matchHistory/' + row.original.id
                                        );
                                        window.scrollTo(0, 0);
                                    },
                                };
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Flex direction={'column'}>
                            <Flex
                                direction={'row'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                {playerMmrPerMatchSliced.length > 0 ? (
                                    <>
                                        <h1 style={{ fontSize: 60 }}>
                                            {`${mmrChangePercentage}%`}
                                        </h1>
                                        {mmrChangePercentage == 0 ? (
                                            <FiMinus
                                                size={'60'}
                                                color={'orange'}
                                            />
                                        ) : mmrChangePercentage > 0 ? (
                                            <FiChevronUp
                                                size={'60'}
                                                color={'green'}
                                            />
                                        ) : (
                                            <FiChevronDown
                                                size={'60'}
                                                color={'red'}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <h1 style={{ fontSize: 30 }}>
                                        {`Not Placed! Player must complete 10 Games...`}
                                    </h1>
                                )}
                            </Flex>
                            {playerMmrPerMatchSliced.length > 0 ? (
                                <Line
                                    data={playerMmrPerMatchData}
                                    style={{ maxHeight: 300 }}
                                    options={{
                                        scales: {
                                            x: {
                                                type: 'linear',
                                                min: playerMmrPerMatchSliced[0]
                                                    ?.x,
                                                max: playerMmrPerMatchSliced[
                                                    playerMmrPerMatchSliced.length -
                                                        1
                                                ]?.x,
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
                            ) : null}
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <SortableTable
                            columns={teammateColumns}
                            data={playerTeammateData}
                            getRowProps={(row: any) => {
                                return {
                                    onClick: () => {
                                        navigate(
                                            '/playerOverview/' +
                                                row.getValue('name')
                                        );
                                        window.scrollTo(0, 0);
                                    },
                                };
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <SortableTable
                            columns={opponentColumns}
                            data={playerOpponentData}
                            getRowProps={(row: any) => {
                                return {
                                    onClick: () => {
                                        navigate(
                                            '/playerOverview/' +
                                                row.getValue('name')
                                        );
                                        window.scrollTo(0, 0);
                                    },
                                };
                            }}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
});
