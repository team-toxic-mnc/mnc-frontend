export enum Season {
    ALL_SEASONS = 'All Seasons',
    SEASON_ONE = 'Season 1',
}

export const getSeasonKeys = (): Array<Season> => {
    return Object.values(Season).filter((k) =>
        isNaN(Number(k))
    ) as Array<Season>;
};
