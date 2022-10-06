import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const Tag: ComponentStyleConfig = {
    variants: {
        subtle: {
            container: {
                bg: 'secondary.500',
                color: 'white',
            },
        },
    },
    defaultProps: {
        variant: 'bold',
    },
};
