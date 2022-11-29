import {
    Box,
    Flex,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    Tooltip,
} from '@chakra-ui/react';
import { Player } from '../types/domain/Player';
import { SprTag } from './SprTag';

export const SprCard = ({
    value,
    sprTrend,
}: {
    value?: number | Player;
    sprTrend: number;
}) => {
    return (
        <Flex direction='column' align='center'>
            <Box>
                <Stat>
                    <Flex direction='column' align='center'>
                        <SprTag props={{ size: 'xl' }} value={value} />
                        <StatLabel fontSize='20'>SPR</StatLabel>
                        <Tooltip label='Average SPR change from recent games, up to the last five'>
                            <StatHelpText fontSize='14'>
                                <StatArrow
                                    type={
                                        sprTrend >= 0 ? 'increase' : 'decrease'
                                    }
                                />
                                {sprTrend}
                            </StatHelpText>
                        </Tooltip>
                    </Flex>
                </Stat>
            </Box>
        </Flex>
    );
};
