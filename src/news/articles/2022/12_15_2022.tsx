import { Flex } from '@chakra-ui/react';
import { CLASH_2022_BADGE } from '../../../data/accolades';

const paragraphStyle = { marginTop: 20 };
export default function ARTICLE_12_15_2022() {
    return (
        <>
            <p style={paragraphStyle}>
                Hey everyone! It took a while, but we are happy to finally share
                the <b>ARAM Clash 2022</b> participation accolade! The MNC Team
                was thrilled to see our matchmaking ranks used to create the
                teams used in the tournament.
            </p>
            <Flex padding='4'>
                <img
                    style={{
                        margin: 'auto',
                        width: 200,
                        height: 200,
                        borderRadius: 8,
                    }}
                    src={CLASH_2022_BADGE}
                    alt='Clasher'
                />
            </Flex>
            <p style={paragraphStyle}>
                Congratulations again to all who participated in ARAM Clash
                2022!
            </p>
        </>
    );
}
// blue 3ee5fe
// purple d300ff
