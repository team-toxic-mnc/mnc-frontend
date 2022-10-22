import { Flex, Heading } from '@chakra-ui/react';
import { NewsCards } from '../news/NewsCards';

const IS_SEASON_1 = true;

const backgroundVideo = IS_SEASON_1
    ? 'https://cdn.discordapp.com/attachments/972956581220192346/1032190900295716974/Neon_-_21368_VP9.webm'
    : 'https://blitz-cdn-videos.blitz.gg/ui/video/Homepage-Slide-One.webm';
// 'https://screensavers.riotgames.com/v2/latest/content/original/AnimatedArt/animated-freljord.webm';

export default function Home() {
    return (
        <Flex
            style={{
                minHeight: '100vh',
                backgroundColor: '#282c34',
                margin: -16,
                position: 'relative',
            }}
            flexDirection='column'
        >
            <Flex flex='1' minHeight='100vh' alignSelf='stretch'>
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    <video
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        playsInline={true}
                        preload='none'
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    >
                        <source type='video/webm' src={backgroundVideo} />
                    </video>
                    <div
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {IS_SEASON_1 ? (
                            <img
                                src={
                                    'https://cdn.discordapp.com/attachments/1032423770578755584/1032433210275135519/season_1_transparent.png'
                                }
                                alt='season 1 splash'
                            />
                        ) : (
                            <h1
                                style={{
                                    color: 'white',
                                    fontSize: 48,
                                    marginRight: 64,
                                    marginLeft: 64,
                                    fontWeight: 'bold',
                                    fontStyle: 'italic',
                                }}
                            >
                                WELCOME TO MONDAY NIGHT CUSTOMS!
                            </h1>
                        )}
                    </div>
                </div>
            </Flex>
            <Flex
                backgroundColor='white'
                flexDirection='column'
                alignItems='center'
                paddingBottom='16'
            >
                <Heading>LATEST UPDATES</Heading>
                <NewsCards />
            </Flex>
        </Flex>
    );
}
