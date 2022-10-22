import { Flex } from '@chakra-ui/react';

export default function ARTICLE_10_20_2022() {
    return (
        <>
            <p style={{ marginTop: 8 }}>
                The Monday Night Customs Team has heard your voices on
                progression in our custom games. Things like difficulty in
                increasing MMR despite winning games and stagnant rankings are
                just some of the feedback we’ve gotten.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                Introducing Seasons
            </h1>
            <p style={{ marginTop: 8 }}>
                As a result, we are excited to announce something new…
                <b>Monday Night Customs Season 1!</b>
            </p>
            <img
                style={{ margin: 'auto' }}
                src={
                    'https://cdn.discordapp.com/attachments/1032423770578755584/1032433210275135519/season_1_transparent.png'
                }
                alt='season 1 splash'
            />
            <p style={{ marginTop: 8 }}>
                This will be a <b>timed event that occurs over 3 months</b>,
                which will allow players to try to climb and do their best
                before the season “resets” and the next season begins!
            </p>
            <p style={{ marginTop: 8 }}>
                Moving forward, a new season will be introduced every 3 months,
                so players have the opportunity to prove themselves again and
                get ranked.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                Season Power Ranking
            </h1>
            <p style={{ marginTop: 8 }}>
                How are players going to be ranked in each season?
            </p>
            <p style={{ marginTop: 8 }}>
                As part of seasons, we are introducing the concept of “Season
                Power Ranking”, or “SPR” for short. SPR will be driven by a
                different algorithm than existing MMRs. Moving forward, a new
                “Leaderboard” on the MNC hub will be the go-to place to track
                your progression throughout the season and compare how well you
                are doing.
            </p>
            <p style={{ marginTop: 8 }}>
                SPR will only be finalized after you complete 30 qualifying
                games. SPRs that aren’t “qualified” by the end of the season
                won’t count! They’ll still appear on the leaderboard so players
                can know how much they are changing, but will be deprioritized
                and shown at the end of the list. With a season lasting 3
                months, there will be plenty of time to play for a “qualified”
                spot on the leaderboard.
            </p>
            <p style={{ marginTop: 8 }}>
                For all the players who enjoy the concept of MMR over all of
                your games, don’t worry, the lifetime MMRs will continue to be
                calculated and viewed on the player overview pages. MMR however
                does not have any effect on the placement you have on the
                leaderboard.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                Season Rewards
            </h1>
            <p style={{ marginTop: 8 }}>
                So why qualify for a season and get ranked? Well we are also
                excited to announce Season Rewards! The player profiles are
                getting a little bit of a cleanup, and with that we are excited
                to announce Player Badges. These will appear on your profile,
                and can be earned by accomplishing various tasks for a season.
                To start, all players who currently have an MMR assigned get a
                PROJECT: KRAKEN Badge to thank you for all the progress you have
                already made and the contributions you brought to this
                community!
            </p>
            <Flex padding='4'>
                <img
                    style={{
                        margin: 'auto',
                        width: 75,
                        height: 75,
                        borderRadius: 8,
                    }}
                    src={'https://i.redd.it/5l6oxzyzt0361.jpg'}
                    alt='kraken slayer'
                />
            </Flex>
            <p style={{ marginTop: 8 }}>
                And we are also excited to present 3 badges for season 1!
            </p>
            <Flex direction='row' justifyContent='center'>
                <Flex padding='4'>
                    <img
                        style={{
                            margin: 'auto',
                            width: 75,
                            height: 75,
                            borderRadius: 8,
                        }}
                        src={
                            'https://cdn-images.audioaddict.com/e/9/5/1/a/8/e951a8a9d049ef525dddbd92de34e462.png?size=120x120'
                        }
                        alt='vaporwave palm trees'
                    />
                </Flex>
                <Flex padding='4'>
                    <img
                        style={{
                            margin: 'auto',
                            width: 75,
                            height: 75,
                            borderRadius: 8,
                        }}
                        src={
                            'https://cdn-images.audioaddict.com/e/9/5/1/a/8/e951a8a9d049ef525dddbd92de34e462.png?size=120x120'
                        }
                        alt='vaporwave palm trees'
                    />
                </Flex>
                <Flex padding='4'>
                    <img
                        style={{
                            margin: 'auto',
                            width: 75,
                            height: 75,
                            borderRadius: 8,
                        }}
                        src={
                            'https://cdn-images.audioaddict.com/e/9/5/1/a/8/e951a8a9d049ef525dddbd92de34e462.png?size=120x120'
                        }
                        alt='vaporwave palm trees'
                    />
                </Flex>
            </Flex>
            <p style={{ marginTop: 8 }}>
                These 3 badges are just the beginning of what we have in store
                for season rewards.
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                Season 1 Starts Soon!
            </h1>
            <p style={{ marginTop: 8 }}>
                Monday Night Customs Season 1 starts on November 14th! Players
                who haven’t gotten an MMR yet before Season 1 have until then to
                complete placements to get the PROJECT: KRAKEN badge.
            </p>
            <p style={{ marginTop: 8 }}>
                Alright, that’s everything we have to announce for now, good
                luck everyone!
            </p>
        </>
    );
}
