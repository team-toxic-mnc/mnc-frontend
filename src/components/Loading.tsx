import React from 'react';

const TOP_NAV_BAR_HEIGHT = 80;

export const Loading = React.memo(function Loading() {
    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: TOP_NAV_BAR_HEIGHT,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
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
                </div>
            </div>
        </div>
    );
});
