import { User } from "./User";

export interface Dossier {
    id: number;
    submitterId: number;
    submitter: User;
    userId: number;
    user: User;
    text: string;
    confidential: boolean;
    created: Date;
}