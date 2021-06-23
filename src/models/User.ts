import { Certification } from "./Certification";
import { Role } from "./Role";
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    initials: string;
    email: string;
    reverseNameCid: string;
    userRating: UserRating;
    ratingLong: string;
    certifications: Certification;
    roles: Role[];
    training: boolean;
    events: boolean;
    visitor: boolean;
    visitorFrom: string;
    status: UserStatus;
    joined: Date;
    created: Date;
    updated: Date;
}

export enum UserRating {
    Inactive,
    OBS,
    S1,
    S2,
    S3,
    C1,
    C2,
    C3,
    I1,
    I2,
    I3,
    SUP,
    ADM
}

export enum UserStatus {
    Active,
    Inactive,
    Loa,
    Removed
}