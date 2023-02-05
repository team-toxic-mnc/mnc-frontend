import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { Button, Flex } from '@chakra-ui/react';

import { Error } from '../components/Error';
import { ARTICLES } from './NewsData';
import ARTICLE_10_20_2022 from './articles/2022/10_20_2022';
import ARTICLE_11_18_2022 from './articles/2022/11_18_2022';
import ARTICLE_12_15_2022 from './articles/2022/12_15_2022';
import ARTICLE_02_04_2023 from './articles/2023/02_04_2023';

export async function loader(data: { params: any }) {
    return data.params.newsId;
}

function articleLookup(articleId: string) {
    switch (articleId) {
        case '1':
            return <ARTICLE_10_20_2022 />;
        case '2':
            return <ARTICLE_11_18_2022 />;
        case '3':
            return <ARTICLE_12_15_2022 />;
        case '4':
            return <ARTICLE_02_04_2023 />;
        default:
            return null;
    }
}

export const NewsDetail = React.memo(function NewsDetail() {
    const articleId = useLoaderData() as string;
    const navigate = useNavigate();

    // get the article
    const article = ARTICLES.find((article) => {
        return article.id === articleId;
    });

    if (article === undefined) {
        return <Error error={'Something went wrong! Try again later.'} />;
    }

    const navigateToNews = () => {
        navigate('/news');
    };

    return (
        <Flex flexDirection='column' alignItems='center' paddingBottom='16'>
            <Flex flexDirection='column' maxWidth='750'>
                <h1 style={{ fontSize: 12 }}>{article.date}</h1>
                <h1 style={{ fontSize: 30, fontWeight: 'bold' }}>
                    {article.title}
                </h1>
                <div style={{ marginTop: 16 }}>{articleLookup(article.id)}</div>
                <Button
                    variant='ghost'
                    flex={1}
                    padding={1}
                    size='lg'
                    alignSelf={'flex-end'}
                    marginTop='16'
                    marginRight='1'
                    flexDirection='row'
                    onClick={navigateToNews}
                >
                    <Flex alignItems='center'>
                        <FiArrowLeft />
                        <h1>Back to News</h1>
                    </Flex>
                </Button>
            </Flex>
        </Flex>
    );
});
