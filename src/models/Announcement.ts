import { User } from "./User";


export interface Announcement {
    id: number;
    submitterId: number;
    submitter: User;
    title: string;
    text: string;
    created: Date;
    updated: Date;
}