import { User } from "./User";


export interface Announcement {
    id: number;
    sumitterId: number;
    sumbitter: User;
    title: string;
    text: string;
    created: Date;
    updated: Date;
}