import { User } from "./User";

export interface Dossier {
    id: number;
    submitter: User;
    text: string;
    confidential: boolean;
    created: Date;
    updated: Date;
}