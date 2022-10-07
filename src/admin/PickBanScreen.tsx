import { Flex, Select } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import {
    MatchDisplay,
    MatchDisplayChampion,
    MatchDisplayPlayer,
} from '../components/MatchDisplay';
import { DataDragonService } from '../services/dataDragon/DataDragonService';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import {
    getChampionImage,
    getMatchWithImages,
} from '../utils/championImageHelpers';

const emptyArray: any[] = [];

export const PickBanScreen = React.memo(function PickBanScreen() {
    const playersResponse = ToxicDataService.usePlayers();
    const players = playersResponse.data ?? [];

    const championIdMapResponse = DataDragonService.useChampionIdMap();
    const championIdMap = championIdMapResponse.data ?? {};

    const [team1Player1, setTeam1Player1] = useState<string>();
    const [team1Player2, setTeam1Player2] = useState<string>();
    const [team1Player3, setTeam1Player3] = useState<string>();
    const [team1Player4, setTeam1Player4] = useState<string>();
    const [team1Player5, setTeam1Player5] = useState<string>();
    const [team2Player1, setTeam2Player1] = useState<string>();
    const [team2Player2, setTeam2Player2] = useState<string>();
    const [team2Player3, setTeam2Player3] = useState<string>();
    const [team2Player4, setTeam2Player4] = useState<string>();
    const [team2Player5, setTeam2Player5] = useState<string>();

    const [team1Champion1, setTeam1Champion1] = useState<string>();
    const [team1Champion2, setTeam1Champion2] = useState<string>();
    const [team1Champion3, setTeam1Champion3] = useState<string>();
    const [team1Champion4, setTeam1Champion4] = useState<string>();
    const [team1Champion5, setTeam1Champion5] = useState<string>();
    const [team2Champion1, setTeam2Champion1] = useState<string>();
    const [team2Champion2, setTeam2Champion2] = useState<string>();
    const [team2Champion3, setTeam2Champion3] = useState<string>();
    const [team2Champion4, setTeam2Champion4] = useState<string>();
    const [team2Champion5, setTeam2Champion5] = useState<string>();

    const [team1Ban1, setTeam1Ban1] = useState<string>();
    const [team1Ban2, setTeam1Ban2] = useState<string>();
    const [team1Ban3, setTeam1Ban3] = useState<string>();
    const [team1Ban4, setTeam1Ban4] = useState<string>();
    const [team1Ban5, setTeam1Ban5] = useState<string>();
    const [team2Ban1, setTeam2Ban1] = useState<string>();
    const [team2Ban2, setTeam2Ban2] = useState<string>();
    const [team2Ban3, setTeam2Ban3] = useState<string>();
    const [team2Ban4, setTeam2Ban4] = useState<string>();
    const [team2Ban5, setTeam2Ban5] = useState<string>();

    const team1: MatchDisplayPlayer[] = [
        {
            name: team1Player1 ?? '',
            champion: {
                name: team1Champion1 ?? '',
                images: getChampionImage(championIdMap[team1Champion1 ?? '']),
            },
        },
        {
            name: team1Player2 ?? '',
            champion: {
                name: team1Champion2 ?? '',
                images: getChampionImage(championIdMap[team1Champion2 ?? '']),
            },
        },
        {
            name: team1Player3 ?? '',
            champion: {
                name: team1Champion3 ?? '',
                images: getChampionImage(championIdMap[team1Champion3 ?? '']),
            },
        },
        {
            name: team1Player4 ?? '',
            champion: {
                name: team1Champion4 ?? '',
                images: getChampionImage(championIdMap[team1Champion4 ?? '']),
            },
        },
        {
            name: team1Player5 ?? '',
            champion: {
                name: team1Champion5 ?? '',
                images: getChampionImage(championIdMap[team1Champion5 ?? '']),
            },
        },
    ];

    const team2: MatchDisplayPlayer[] = [
        {
            name: team2Player1 ?? '',
            champion: {
                name: team2Champion1 ?? '',
                images: getChampionImage(championIdMap[team2Champion1 ?? '']),
            },
        },
        {
            name: team2Player2 ?? '',
            champion: {
                name: team2Champion2 ?? '',
                images: getChampionImage(championIdMap[team2Champion2 ?? '']),
            },
        },
        {
            name: team2Player3 ?? '',
            champion: {
                name: team2Champion3 ?? '',
                images: getChampionImage(championIdMap[team2Champion3 ?? '']),
            },
        },
        {
            name: team2Player4 ?? '',
            champion: {
                name: team2Champion4 ?? '',
                images: getChampionImage(championIdMap[team2Champion4 ?? '']),
            },
        },
        {
            name: team2Player5 ?? '',
            champion: {
                name: team2Champion5 ?? '',
                images: getChampionImage(championIdMap[team2Champion5 ?? '']),
            },
        },
    ];

    const team1Bans: MatchDisplayChampion[] = [
        {
            name: team1Ban1 ?? '',
            images: getChampionImage(championIdMap[team1Ban1 ?? '']),
        },
        {
            name: team1Ban2 ?? '',
            images: getChampionImage(championIdMap[team1Ban2 ?? '']),
        },
        {
            name: team1Ban3 ?? '',
            images: getChampionImage(championIdMap[team1Ban3 ?? '']),
        },
        {
            name: team1Ban4 ?? '',
            images: getChampionImage(championIdMap[team1Ban4 ?? '']),
        },
        {
            name: team1Ban5 ?? '',
            images: getChampionImage(championIdMap[team1Ban5 ?? '']),
        },
    ];

    const team2Bans: MatchDisplayChampion[] = [
        {
            name: team2Ban1 ?? '',
            images: getChampionImage(championIdMap[team2Ban1 ?? '']),
        },
        {
            name: team2Ban2 ?? '',
            images: getChampionImage(championIdMap[team2Ban2 ?? '']),
        },
        {
            name: team2Ban3 ?? '',
            images: getChampionImage(championIdMap[team2Ban3 ?? '']),
        },
        {
            name: team2Ban4 ?? '',
            images: getChampionImage(championIdMap[team2Ban4 ?? '']),
        },
        {
            name: team2Ban5 ?? '',
            images: getChampionImage(championIdMap[team2Ban5 ?? '']),
        },
    ];

    if (players.length === 0) {
        return null;
    }

    const playerOptions = players.map((player) => (
        <option value={player.name} label={player.name} />
    ));
    const championOptions = Object.keys(championIdMap).map((name) => (
        <option value={name} label={name} />
    ));

    return (
        <div
            style={{
                backgroundColor: 'magenta',
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                padding: 32,
            }}
        >
            <MatchDisplay
                team1Label={`TEAM 1`}
                team2Label={`TEAM 2`}
                team1={team1 ?? emptyArray}
                team2={team2 ?? emptyArray}
                team1Bans={team1Bans ?? emptyArray}
                team2Bans={team2Bans ?? emptyArray}
                casterMode={true}
            />
            <Flex direction={'column'} marginBottom={8}>
                <h1>TEAM 1 BANS: </h1>
                <Flex direction='row'>
                    <select
                        id={'t1b1select'}
                        onChange={(e) => {
                            setTeam1Ban1(
                                (document.getElementById('t1b1select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t1b2select'}
                        onChange={(e) => {
                            setTeam1Ban2(
                                (document.getElementById('t1b2select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t1b3select'}
                        onChange={(e) => {
                            setTeam1Ban3(
                                (document.getElementById('t1b3select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t1b4select'}
                        onChange={(e) => {
                            setTeam1Ban4(
                                (document.getElementById('t1b4select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t1b5select'}
                        onChange={(e) => {
                            setTeam1Ban5(
                                (document.getElementById('t1b5select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                </Flex>
                <h1>TEAM 1 PLAYERS: </h1>
                <Flex direction='row'>
                    <select
                        id={'t1c1select'}
                        onChange={(e) => {
                            setTeam1Champion1(
                                (document.getElementById('t1c1select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t1c2select'}
                        onChange={(e) => {
                            setTeam1Champion2(
                                (document.getElementById('t1c2select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t1c3select'}
                        onChange={(e) => {
                            setTeam1Champion3(
                                (document.getElementById('t1c3select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t1c4select'}
                        onChange={(e) => {
                            setTeam1Champion4(
                                (document.getElementById('t1c4select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t1c5select'}
                        onChange={(e) => {
                            setTeam1Champion5(
                                (document.getElementById('t1c5select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                </Flex>
                <Flex direction='row'>
                    <select
                        id={'t1p1select'}
                        onChange={(e) => {
                            setTeam1Player1(
                                (document.getElementById('t1p1select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {playerOptions}
                    </select>
                    <select
                        id={'t1p2select'}
                        onChange={(e) => {
                            setTeam1Player2(
                                (document.getElementById('t1p2select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {playerOptions}
                    </select>
                    <select
                        id={'t1p3select'}
                        onChange={(e) => {
                            setTeam1Player3(
                                (document.getElementById('t1p3select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {playerOptions}
                    </select>
                    <select
                        id={'t1p4select'}
                        onChange={(e) => {
                            setTeam1Player4(
                                (document.getElementById('t1p4select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {playerOptions}
                    </select>
                    <select
                        id={'t1p5select'}
                        onChange={(e) => {
                            setTeam1Player5(
                                (document.getElementById('t1p5select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {playerOptions}
                    </select>
                </Flex>
            </Flex>
            <Flex direction={'column'}>
                <h1>TEAM 2 BANS: </h1>
                <Flex direction='row'>
                    <select
                        id={'t2b1select'}
                        onChange={(e) => {
                            setTeam2Ban1(
                                (document.getElementById('t2b1select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t2b2select'}
                        onChange={(e) => {
                            setTeam2Ban2(
                                (document.getElementById('t2b2select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t2b3select'}
                        onChange={(e) => {
                            setTeam2Ban3(
                                (document.getElementById('t2b3select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t2b4select'}
                        onChange={(e) => {
                            setTeam2Ban4(
                                (document.getElementById('t2b4select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t2b5select'}
                        onChange={(e) => {
                            setTeam2Ban5(
                                (document.getElementById('t2b5select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                </Flex>
                <h1>TEAM 2 PLAYERS: </h1>
                <Flex direction='row'>
                    <select
                        id={'t2c1select'}
                        onChange={(e) => {
                            setTeam2Champion1(
                                (document.getElementById('t2c1select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t2c2select'}
                        onChange={(e) => {
                            setTeam2Champion2(
                                (document.getElementById('t2c2select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t2c3select'}
                        onChange={(e) => {
                            setTeam2Champion3(
                                (document.getElementById('t2c3select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t2c4select'}
                        onChange={(e) => {
                            setTeam2Champion4(
                                (document.getElementById('t2c4select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                    <select
                        id={'t2c5select'}
                        onChange={(e) => {
                            setTeam2Champion5(
                                (document.getElementById('t2c5select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {championOptions}
                    </select>
                </Flex>
                <Flex direction='row'>
                    <select
                        id={'t2p1select'}
                        onChange={(e) => {
                            setTeam2Player1(
                                (document.getElementById('t2p1select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {playerOptions}
                    </select>
                    <select
                        id={'t2p2select'}
                        onChange={(e) => {
                            setTeam2Player2(
                                (document.getElementById('t2p2select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {playerOptions}
                    </select>
                    <select
                        id={'t2p3select'}
                        onChange={(e) => {
                            setTeam2Player3(
                                (document.getElementById('t2p3select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {playerOptions}
                    </select>
                    <select
                        id={'t2p4select'}
                        onChange={(e) => {
                            setTeam2Player4(
                                (document.getElementById('t2p4select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {playerOptions}
                    </select>
                    <select
                        id={'t2p5select'}
                        onChange={(e) => {
                            setTeam2Player5(
                                (document.getElementById('t2p5select') as any)
                                    .value
                            );
                        }}
                        style={{ width: 175 }}
                    >
                        {playerOptions}
                    </select>
                </Flex>
            </Flex>
        </div>
    );
});
