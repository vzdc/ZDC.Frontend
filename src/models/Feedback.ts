import { User } from "./User";

export interface Feedback {
    id: number;
    name: string;
    callsign: string;
    email: string;
    user: User;
    facility: string;
    service: ServiceLevel;
    description: string;
    status: FeedbackStatus;
    created: Date;
    updated: Date;
}

enum ServiceLevel {
    Unsatisfactory,
    Poor,
    Fair,
    Good,
    Excellent
}

enum FeedbackStatus {
    Pending,
    Contacted,
    Accepted,
    Denied
}