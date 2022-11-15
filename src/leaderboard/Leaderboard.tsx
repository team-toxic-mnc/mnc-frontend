import { Flex, Heading } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper, Row } from '@tanstack/react-table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SortableTable } from '../components/SortableTable';
import { SprTag } from '../components/SprTag';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { Player } from '../types/domain/Player';
import { getSprValue } from '../utils/sprHelpers';

type PlayerTableData = {
    name: string;
    wins: number;
    winPercentage: string;
    losses: number;
    totalGames: number;
    spr: number;
    // mmrChange: number;
};

/**
 * Given a collection of players, map to a collection of players with processed stats
 * @param players A collection of playeres to process
 */
const processPlayers = (
    players: Player[] | undefined
    // sprMap: { [key: string]: { gameId: number; spr: number }[] }
): PlayerTableData[] => {
    return players
        ? players
              .filter(
                  (player) => (player.wins ?? 0) + (player.losses ?? 0) > 10
              )
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((player) => {
                  const wins = player.wins ?? 0;
                  const losses = player.losses ?? 0;
                  const totalGames = wins + losses;
                  // const spr = mmrMap[player.name] ?? [];
                  return {
                      ...player,
                      wins,
                      losses,
                      winPercentage:
                          Math.round((wins / totalGames) * 100) + '%',
                      totalGames: totalGames,
                      spr: totalGames >= 10 ? getSprValue(player) : 0,
                      // mmrChange:
                      //     totalGames > 10 ? getMmrTrendingChange(mmr) : -999,
                  };
              })
        : [];
};

const columnHelper = createColumnHelper<PlayerTableData>();

const columns: ColumnDef<PlayerTableData, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
    }),
    columnHelper.accessor((row) => row.wins, {
        id: 'wins',
        cell: (info) => info.getValue(),
        header: () => <span>Wins</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.winPercentage, {
        id: 'winPercentage',
        cell: (info) => info.getValue(),
        header: () => <span>Win %</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.totalGames, {
        id: 'totalGames',
        cell: (info) => info.getValue(),
        header: () => <span>Total Games</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.spr, {
        id: 'spr',
        cell: (info) => {
            return <SprTag props={{ size: 'md' }} player={info.row.original} />;
        },
        header: () => <span>SPR</span>,
        meta: {
            isNumeric: true,
        },
    }),
    // columnHelper.accessor((row) => row.mmrChange, {
    //     id: 'mmrChange',
    //     cell: (info) => {
    //         const value = info.getValue();
    //         return (
    //             <div
    //                 style={{
    //                     display: 'flex',
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     flexDirection: 'row',
    //                 }}
    //             >
    //                 {value === -999 ? (
    //                     <h1>-</h1>
    //                 ) : (
    //                     <>
    //                         {value}
    //                         {value === 0 ? (
    //                             <FiMinus size={'24'} color={'orange'} />
    //                         ) : value > 0 ? (
    //                             <FiChevronUp size={'24'} color={'green'} />
    //                         ) : (
    //                             <FiChevronDown size={'24'} color={'red'} />
    //                         )}
    //                     </>
    //                 )}
    //             </div>
    //         );
    //     },
    //     header: () => <span>SPR Trend</span>,
    //     meta: {
    //         isNumeric: true,
    //     },
    // }),
];

export const Leaderboard = React.memo(function Leaderboard() {
    const navigate = useNavigate();
    const usePlayersResponse = ToxicDataService.usePlayers(1);
    const data = usePlayersResponse.data;

    // const mmrPerMatchResponse = ToxicDataService.useMmrPerMatch();
    // const mmrPerMatch = mmrPerMatchResponse.data ?? [];
    // const mmrPerMatchMap =
    //     mapMmrHistoryCollectionToPlayerMmrHistoryMap(mmrPerMatch);

    const processedData = processPlayers(data);

    return (
        <Flex direction='column' justify='center' align='center'>
            <img
                src={
                    'https://cdn.discordapp.com/attachments/1032423770578755584/1032433210275135519/season_1_transparent.png'
                }
                alt='season 1 splash'
            />
            <Heading>Leaderboard</Heading>
            <SortableTable
                columns={columns}
                data={processedData}
                getRowProps={(row: Row<any>) => {
                    return {
                        onClick: () => {
                            navigate(`/playerOverview/${row.getValue('name')}`);
                            window.scrollTo(0, 0);
                        },
                    };
                }}
            />
        </Flex>
    );
});
