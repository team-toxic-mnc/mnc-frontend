import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Player } from '../types/domain/Player';
import { getMmrColor, getMmrValue } from '../utils/mmrHelpers';

export const MmrCard = React.memo(function MmrCard({
    player,
}: {
    player: Player;
}) {
    const mmr = getMmrValue(player);
    const mmrColor = mmr ? getMmrColor(mmr) : 'bodyFont';
    return (
        <Flex
            flexDirection='column'
            flex='1'
            maxWidth='150'
            marginLeft='16'
            marginRight='16'
            alignItems='center'
        >
            <Heading
                fontSize='60'
                color={mmrColor}
                paddingTop='0'
                paddingBottom='0'
                marginTop='0'
            >
                {mmr > 0 ? mmr : 'N/A'}
            </Heading>
            <Text fontWeight='bold'>{'MMR'}</Text>
        </Flex>
    );
});
