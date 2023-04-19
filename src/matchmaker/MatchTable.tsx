import {
    Button,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { Player } from '../types/domain/Player';
import { INITIAL_MMR, getMmrValue } from '../utils/mmrHelpers';

const getTeamMmr = (team: readonly Player[]): number => {
    return Math.round(
        team.reduce((teamMmr, player) => {
            const playerMmr = getMmrValue(player);
            return playerMmr > 0 ? teamMmr + playerMmr : teamMmr + INITIAL_MMR;
        }, 0) / 5
    );
};

const PlayerCell = ({
    player,
    rightAlign,
}: {
    player: Player;
    rightAlign?: boolean;
}) => {
    return (
        <Td textAlign={rightAlign ? 'right' : 'left'}>
            {player.name} ({getMmrValue(player)})
        </Td>
    );
};

export const MatchTable = ({
    blueTeam,
    redTeam,
    clipboardButton = false,
}: {
    blueTeam: readonly Player[];
    redTeam: readonly Player[];
    clipboardButton?: boolean;
}) => {
    const toast = useToast();
    const writeTeamToString = (team: readonly Player[]) => {
        return team.map((player) => player.name).join('\n');
    };

    const copyMatchToClipboard = () => {
        const text = `Team 1:\n${writeTeamToString(
            blueTeam
        )}\n\nTeam 2:\n${writeTeamToString(redTeam)}`;
        navigator.clipboard.writeText(text);
    };

    return (
        <Flex direction='column' align='flex-start' alignSelf='stretch'>
            <Flex
                direction='column'
                alignSelf='stretch'
                align='stretch'
                flex='1'
            >
                <TableContainer
                    border='1px solid'
                    borderColor='gray.100'
                    borderRadius='md'
                    background={'white'}
                    color='gray.600'
                >
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th color='blue.500'>
                                    Team 1 ({getTeamMmr(blueTeam)})
                                </Th>
                                <Th color='red.600' textAlign='right'>
                                    Team 2 ({getTeamMmr(redTeam)})
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <PlayerCell player={blueTeam[0]} />
                                <PlayerCell player={redTeam[0]} rightAlign />
                            </Tr>
                            <Tr>
                                <PlayerCell player={blueTeam[1]} />
                                <PlayerCell player={redTeam[1]} rightAlign />
                            </Tr>
                            <Tr>
                                <PlayerCell player={blueTeam[2]} />
                                <PlayerCell player={redTeam[2]} rightAlign />
                            </Tr>
                            <Tr>
                                <PlayerCell player={blueTeam[3]} />
                                <PlayerCell player={redTeam[3]} rightAlign />
                            </Tr>
                            <Tr>
                                <PlayerCell player={blueTeam[4]} />
                                <PlayerCell player={redTeam[4]} rightAlign />
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
            {clipboardButton && (
                <Button
                    style={{ margin: 10 }}
                    onClick={() => {
                        copyMatchToClipboard();
                        toast({
                            title: 'Match copied to clipboard',
                            status: 'success',
                            duration: 3000,
                            isClosable: false,
                            variant: 'solid',
                        });
                    }}
                >
                    Copy to clipboard
                </Button>
            )}
        </Flex>
    );
};

export default MatchTable;
