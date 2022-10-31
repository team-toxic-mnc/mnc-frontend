import { Flex } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { ChampionImages } from '../types/domain/ChampionImages';

type MatchPlayerWithImages = {
    name: string;
    champion: {
        name: string;
        images: ChampionImages;
    };
};

export type MatchWithImages = {
    id: string;
    date: Date;
    team1: {
        players: MatchPlayerWithImages[];
    };
    team2: {
        players: MatchPlayerWithImages[];
    };
    winner: string;
    playerName?: string;
};

const columnHelper = createColumnHelper<MatchWithImages>();

const TeamIcon = React.memo(function TeamIcon({
    player,
    activePlayerName,
}: {
    player: MatchPlayerWithImages;
    activePlayerName?: string;
}) {
    return (
        <img
            alt='champion icon'
            src={player.champion.images.square}
            style={{
                width: 34,
                height: 34,
                padding: 2,
                backgroundColor:
                    player.name.toLowerCase() ===
                    activePlayerName?.toLowerCase()
                        ? 'purple'
                        : undefined,
                border:
                    player.name.toLowerCase() ===
                    activePlayerName?.toLowerCase()
                        ? '2px solid purple'
                        : undefined,
            }}
        />
    );
});

export const matchHistoryColumns: ColumnDef<MatchWithImages, any>[] = [
    columnHelper.accessor((row) => row.id, {
        id: 'id',
        cell: (info) => info.getValue(),
        header: () => <span>Game Number</span>,
    }),
    columnHelper.accessor((row) => row.date, {
        id: 'date',
        cell: (info) => {
            return <div>{info.row.original.date.toDateString()}</div>;
        },
        header: () => <span>Date</span>,
    }),
    columnHelper.accessor((row) => row.team1, {
        id: 'teams',
        cell: (info) => {
            return (
                <Flex minWidth='400' align='center' flex='row'>
                    <TeamIcon player={info.row.original.team1.players[0]} />
                    <TeamIcon player={info.row.original.team1.players[1]} />
                    <TeamIcon player={info.row.original.team1.players[2]} />
                    <TeamIcon player={info.row.original.team1.players[3]} />
                    <TeamIcon player={info.row.original.team1.players[4]} />
                    <div style={{ marginRight: 8, marginLeft: 8 }}>{'VS'}</div>
                    <TeamIcon player={info.row.original.team2.players[0]} />
                    <TeamIcon player={info.row.original.team2.players[1]} />
                    <TeamIcon player={info.row.original.team2.players[2]} />
                    <TeamIcon player={info.row.original.team2.players[3]} />
                    <TeamIcon player={info.row.original.team2.players[4]} />
                </Flex>
            );
        },
        header: () => <span>Matchup</span>,
    }),
    columnHelper.accessor((row) => row.winner, {
        id: 'winner',
        cell: (info) => info.getValue(),
        header: () => <span>Winner</span>,
    }),
];

function getPlayerSelectedChampion(
    playerName: string,
    match: MatchWithImages
): { imageUrl: string; championName: string } {
    // loop through team 1 and determine if player
    const temp = match.team1.players.find(
        (player) => player.name.toLowerCase() === playerName.toLowerCase()
    );

    if (temp) {
        return {
            championName: temp.champion.name,
            imageUrl: temp.champion.images.square,
        };
    }

    const temp2 = match.team2.players.find(
        (player) => player.name.toLowerCase() === playerName.toLowerCase()
    );

    if (temp2) {
        return {
            championName: temp2.champion.name,
            imageUrl: temp2.champion.images.square,
        };
    }

    return {
        championName: '',
        imageUrl: '',
    };
}

export const playerMatchHistoryColumns: ColumnDef<MatchWithImages, any>[] = [
    columnHelper.accessor((row) => row.id, {
        id: 'id',
        cell: (info) => info.getValue(),
        header: () => <span>Game #</span>,
    }),
    columnHelper.accessor((row) => row.date, {
        id: 'date',
        cell: (info) => {
            return <div>{info.row.original.date.toDateString()}</div>;
        },
        header: () => <span>Date</span>,
    }),
    columnHelper.accessor((row) => row.date, {
        id: 'selectedChamp',
        cell: (info) => {
            // get the player's selected champion
            const activePlayerName = info.row.original.playerName;
            const champion = getPlayerSelectedChampion(
                activePlayerName ?? '',
                info.row.original
            );
            return (
                <Flex justify='flex-start' align='center' width='100%'>
                    <img
                        alt={champion.championName}
                        src={champion.imageUrl}
                        style={{
                            width: 34,
                            height: 34,
                            padding: 2,
                            marginRight: 2,
                        }}
                    />
                    <h1>{champion.championName}</h1>
                </Flex>
            );
        },
        header: () => <span>Champion</span>,
    }),
    columnHelper.accessor((row) => row.winner, {
        id: 'winner',
        cell: (info) => info.getValue(),
        header: () => <span>RESULT</span>,
    }),
    columnHelper.accessor((row) => row.team1, {
        id: 'teams',
        cell: (info) => {
            const activePlayerName = info.row.original.playerName;
            return (
                <Flex align='center' direction='row'>
                    <TeamIcon
                        player={info.row.original.team1.players[0]}
                        activePlayerName={activePlayerName}
                    />
                    <TeamIcon
                        player={info.row.original.team1.players[1]}
                        activePlayerName={activePlayerName}
                    />
                    <TeamIcon
                        player={info.row.original.team1.players[2]}
                        activePlayerName={activePlayerName}
                    />
                    <TeamIcon
                        player={info.row.original.team1.players[3]}
                        activePlayerName={activePlayerName}
                    />
                    <TeamIcon
                        player={info.row.original.team1.players[4]}
                        activePlayerName={activePlayerName}
                    />
                    <div style={{ marginLeft: 8, marginRight: 8 }}>{'VS'}</div>
                    <TeamIcon
                        player={info.row.original.team2.players[0]}
                        activePlayerName={activePlayerName}
                    />
                    <TeamIcon
                        player={info.row.original.team2.players[1]}
                        activePlayerName={activePlayerName}
                    />
                    <TeamIcon
                        player={info.row.original.team2.players[2]}
                        activePlayerName={activePlayerName}
                    />
                    <TeamIcon
                        player={info.row.original.team2.players[3]}
                        activePlayerName={activePlayerName}
                    />
                    <TeamIcon
                        player={info.row.original.team2.players[4]}
                        activePlayerName={activePlayerName}
                    />
                </Flex>
            );
        },
        header: () => <span>Matchup</span>,
    }),
];
