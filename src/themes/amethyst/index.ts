import { Alert } from './components/alert';
import { Tag } from './components/tag';
import { Button } from './components/button';
import { extendTheme } from '@chakra-ui/react';
import { Table } from './components/table';

export const amethyst = extendTheme({
    colors: {
        primary: {
            50: '#ebe7f3',
            100: '#cdc4e2',
            200: '#ac9ecf',
            300: '#8c78bc',
            400: '#745bae',
            500: '#5d41a0',
            600: '#553c9a',
            700: '#493491',
            800: '#3f2e88',
            900: '#2f2477',
        },
        secondary: {
            50: '#e2f2f3',
            100: '#b6dfe1',
            200: '#88cbcd',
            300: '#5cb7b8',
            400: '#40a7a7',
            500: '#319795',
            600: '#2d8a88',
            700: '#2a7a77',
            800: '#286a66',
            900: '#224d49',
        },
        bodyFont: '#718096',
        background: '#A0AEC0',
    },
    components: {
        Button,
        Tag,
        Alert,
        Table,
    },
});
