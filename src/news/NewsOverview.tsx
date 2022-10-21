import { Flex, Heading } from '@chakra-ui/react';
import { NewsCards } from './NewsCards';

export default function NewsOverview() {
    return (
        <Flex flexDirection='column' alignItems='center' paddingBottom='16'>
            <Heading>NEWS</Heading>
            <NewsCards />
        </Flex>
    );
}
