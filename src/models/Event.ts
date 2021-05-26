import { EventPosition } from "./EventPosition";
import { EventRegistration } from "./EventRegistration";

export interface Event {
    id: number;
    title: string;
    text: string;
    banner: string;
    host: string;
    start: Date;
    end: Date;
    open: boolean;
    registrations: EventRegistration[];
    positions: EventPosition[];
    created: Date;
    updated: Date;
}