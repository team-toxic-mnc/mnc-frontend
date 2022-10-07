import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Player } from '../types/domain/Player';
import { MmrTag } from './MmrTag';

export const MmrCard = React.memo(function MmrCard({
    player,
}: {
    player: Player;
}) {
    return (
        <Flex
            flexDirection='column'
            flex='1'
            maxWidth='150'
            marginLeft='16'
            marginRight='16'
            alignItems='center'
        >
            <MmrTag player={player} props={{ size: 'xl' }}></MmrTag>
            <Text fontWeight='bold'>{'MMR'}</Text>
        </Flex>
    );
});
