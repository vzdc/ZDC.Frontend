import { EventPosition } from "./EventPosition";

export interface Event {
    id: number;
    title: string;
    text: string;
    banner: string;
    host: string;
    start: Date;
    end: Date;
    open: boolean;
    positions: EventPosition[];
    created: Date;
    updated: Date;
}