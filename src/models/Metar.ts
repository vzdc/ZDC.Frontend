export interface Metar {
    id: number;
    metarRaw: string;
    conditions: string;
    wind: string;
    temp: string;
    altimeter: string;
    created: Date;
}