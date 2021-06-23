import { User } from "./User";
import { Event } from "./Event";

export interface EventRegistration {
    id: number;
    userId: number;
    user: User;
    eventId: number;
    event: Event;
    start: Date;
    end: Date;
    created: Date;
    updated: Date;
}