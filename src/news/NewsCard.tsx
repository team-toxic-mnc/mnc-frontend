import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

export const NewsCard = React.memo(function NewsCard({
    onClick,
    title,
    date,
    content,
}: {
    title: string;
    date: string;
    content: string;
    onClick: () => void;
}) {
    return (
        <button
            style={{
                borderWidth: 1,
                borderRadius: 16,
                borderColor: 'rgb(0,0,0,0.1)',
                marginRight: 8,
                marginLeft: 8,
                padding: 16,
                width: '100%',
                maxWidth: 750,
            }}
            onClick={onClick}
        >
            <Flex flexDirection='column' alignItems={'flex-start'}>
                <h1 style={{ fontSize: 12 }}>{date}</h1>
                <h1 style={{ fontSize: 30 }}>{title}</h1>
                <div style={{ marginTop: 16, textAlign: 'left' }}>
                    <p>{content}</p>
                    <Button
                        variant='ghost'
                        flex={1}
                        padding={0}
                        size='md'
                        alignSelf={'flex-end'}
                    >
                        READ MORE
                    </Button>
                </div>
            </Flex>
        </button>
    );
});
