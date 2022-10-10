import { Flex } from '@chakra-ui/react';
import React from 'react';

const TOP_NAV_BAR_HEIGHT = 80;

export const Loading = React.memo(function Loading() {
    return (
        <Flex minHeight='100vh' justify='center' align='center'>
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: TOP_NAV_BAR_HEIGHT,
                }}
            >
                <Flex
                    width='100%'
                    height='100%'
                    justify='center'
                    align='center'
                >
                    {'LOADING ...'}
                    {/* <img
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Amumu_7.jpg'
                    /> */}
                </Flex>
            </div>
        </Flex>
    );
});
