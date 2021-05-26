import { Metar } from "./Metar";

export interface Airport {
    id: number;
    icao: string;
    name: string;
    metar: Metar;
    created: Date;
    updated: Date;
}