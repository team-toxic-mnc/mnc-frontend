export type NewsCardData = {
    title: string;
    date: string;
    content: string;
    id: string;
};

export const article_4: NewsCardData = {
    id: '4',
    title: 'End of Season 1 & Monday Night Classic',
    date: 'Februrary 4, 2023',
    content:
        'The end of season 1 is approaching, and a very small peek into the upcoming Monday Night Classic event!',
};

export const article_3: NewsCardData = {
    id: '3',
    title: 'ARAM Clash 2022 Accolade',
    date: 'December 15, 2022',
    content:
        'It took a while, but we are excited and happy to finalize the accolade for ARAM Clash 2022 participation!',
};

export const article_2: NewsCardData = {
    id: '2',
    title: 'MMR and SPR',
    date: 'November 21, 2022',
    content:
        "Beginning with Season 1, there are now two ELO systems that are used in Monday Night Customs. Here's a handy guide to understanding the differences between MMR and SPR and how they impact you.",
};

export const article_1: NewsCardData = {
    id: '1',
    title: 'Monday Night Customs Season 1',
    date: 'October 20, 2022',
    content:
        "The Monday Night Customs team is excited to announce several new and exciting changes coming with our first ever season! From new Season Power Rankings to Season Rewards, you won't want to miss this update!",
};

export const ARTICLES = [article_4, article_3, article_2, article_1];
