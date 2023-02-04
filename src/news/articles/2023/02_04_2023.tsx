import { Flex } from '@chakra-ui/react';

const paragraphStyle = { marginTop: 20 };
export default function ARTICLE_02_04_2023() {
    return (
        <>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                End of Season 1: Feb 20th
            </h1>
            <p style={paragraphStyle}>
                Hey everyone! Just a few quick updates from the MNC Team! The
                games have been going well, and players are completing their
                qualifying games. The finalized end of season 1 date is{' '}
                <b>Feb 20th, 2023</b>. So make sure you get those last few games
                you games you need to get your season 1 accolades!
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                The Monday Night Classic
            </h1>
            <p style={paragraphStyle}>
                Something to look forward to after the end of Season 1 (other
                than Season 2) is our first ever <b>Monday Night Classic</b>.
                This is a 5v5 tournament draft custom on <b>Summoner's Rift</b>!
            </p>
            <Flex style={{ marginTop: 20, justifyContent: 'center' }}>
                <iframe
                    width='560'
                    height='315'
                    src='https://www.youtube.com/embed/x_EFHSMLy3c'
                    title='YouTube video player'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen={true}
                ></iframe>
            </Flex>
            <p style={paragraphStyle}>
                We are still working out the details (signup, teams, etc), and
                more info around this should be coming very soon! The Monday
                Night Classic event will take place sometime in{' '}
                <b>March 2023</b>.
            </p>
            <p style={paragraphStyle}>
                That's all we have to share for now! Good luck on the abyss (and
                rift)!
            </p>
        </>
    );
}
// blue 3ee5fe
// purple d300ff
