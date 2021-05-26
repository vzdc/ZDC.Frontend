import { User } from "./User";


export interface Announcement {
    id: number;
    user: User;
    title: string;
    text: string;
    created: Date;
    updated: Date;
}