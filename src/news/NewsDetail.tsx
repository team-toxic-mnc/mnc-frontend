import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import { ARTICLES } from './NewsData';

import { Error } from '../components/Error';
import Article_10_20_2022 from './articles/10_20_2022';

export async function loader(data: { params: any }) {
    return data.params.newsId;
}

function articleLookup(articleId: string) {
    switch (articleId) {
        case '1':
            return <Article_10_20_2022 />;
        default:
            return null;
    }
}

export const NewsDetail = React.memo(function NewsDetail() {
    const articleId = useLoaderData() as string;

    // get the article
    const article = ARTICLES.find((article) => {
        return article.id === articleId;
    });

    if (article === undefined) {
        return <Error error={'Something went wrong! Try again later.'} />;
    }

    return (
        <Flex flexDirection='column' alignItems='center' paddingBottom='16'>
            <Flex flexDirection='column' maxWidth='750'>
                <h1 style={{ fontSize: 12 }}>{article.date}</h1>
                <h1 style={{ fontSize: 30, fontWeight: 'bold' }}>
                    {article.title}
                </h1>
                <div style={{ marginTop: 16 }}>{articleLookup(article.id)}</div>
            </Flex>
        </Flex>
    );
});
