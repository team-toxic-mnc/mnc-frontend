export type NewsCardData = {
    title: string;
    date: string;
    content: string;
    id: string;
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
    title: 'MONDAY NIGHT CUSTOMS SEASON 1',
    date: 'October 20, 2022',
    content:
        "The Monday Night Customs team is excited to announce several new and exciting changes coming with our first ever season! From new Season Power Rankings to Season Rewards, you won't want to miss this update!",
};

export const ARTICLES = [article_2, article_1];
