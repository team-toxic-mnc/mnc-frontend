export type TrueSkillEntry = {
    rating: number;
    sigma: number;
};

export type TrueSkillData = {
    [id: string]: TrueSkillEntry;
};
