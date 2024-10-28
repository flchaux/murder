export interface CharacterFileParams {
    publicRole: string;
    name: string;
    picture: string;
    summary: string;
    secret: string;
    history: string;
    personalGoal: string;
    comment: string;
    links: { description: string, picture: string, name: string, anonymous: boolean; }[];
    message: string | undefined;
}