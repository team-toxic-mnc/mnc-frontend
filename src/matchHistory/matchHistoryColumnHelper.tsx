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
                <div
                    style={{
                        minWidth: 400,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
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
                </div>
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

export const playerMatchHistoryColumns: ColumnDef<MatchWithImages, any>[] = [
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
            const activePlayerName = info.row.original.playerName;
            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
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
                </div>
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
