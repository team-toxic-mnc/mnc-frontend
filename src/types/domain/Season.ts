export enum SeasonStatus {
    COMPLETE,
    ACTIVE,
    UNRELEASED,
    NONE,
}

export type Season = {
    name: string;
    status: SeasonStatus;
};

export const Seasons: { [key: string]: Season } = {
    ALL_SEASONS: { name: 'All Seasons', status: SeasonStatus.NONE },
    SEASON_ONE: { name: 'Season 1', status: SeasonStatus.UNRELEASED },
};

export const getSeasons = (): Array<Season> => {
    return Object.values(Seasons);
};

export const getActiveSeason = (): Season => {
    const activeSeason = Object.values(Seasons).find(
        (season) => season.status === SeasonStatus.ACTIVE
    );
    return activeSeason ? activeSeason : Seasons.ALL_SEASONS;
};
