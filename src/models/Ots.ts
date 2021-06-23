import { User } from "./User";

export interface Ots {
    id: number;
    userId: number;
    user: User;
    recommendedById: number;
    recommendedBy: User;
    instructorId: number;
    instructor: User;
    position: string;
    created: Date;
    updated: Date;
}