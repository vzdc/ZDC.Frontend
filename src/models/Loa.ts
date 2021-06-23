import { User } from "./User";

export interface Loa {
    id: number;
    userId: number;
    user: User;
    reason: string;
    start: Date;
    end: Date;
    status: LoaStatus;
    created: Date;
    updated: Date;
}

enum LoaStatus {
    Pending,
    Accepted,
    Started,
    Cancelled,
    Ended,
    Controlled
}