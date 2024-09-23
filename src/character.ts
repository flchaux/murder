export interface Character {
    id: string;
    name: string;
    themes: string[];
    links: {
        id: string;
        characterId: string;
    }[];
    publicRole: string;
    hiddenRole: string;
    description: string;
    mobileType: string;
    mobile: string;
    personalGoal: string;
    accessories: string;
}