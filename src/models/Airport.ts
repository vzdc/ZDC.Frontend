export interface Airport {
    id: number;
    icao: string;
    name: string;
    metarRaw: string;
    conditions: string;
    wind: string;
    temp: string;
    altimeter: string;
    created: Date;
    updated: Date;
}