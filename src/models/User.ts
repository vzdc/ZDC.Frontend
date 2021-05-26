import { Certification } from "./Certification";
import { Dossier } from "./Dossier";
import { Feedback } from "./Feedback";
import { Hours } from "./Hours";
import { Loa } from "./Loa";
import { Warning } from "./Warning";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    initials: string;
    email: string;
    reverseNameCid: string;
    userRating: UserRating;
    certifications: Certification;
    loas: Loa[];
    warnings: Warning[];
    dossierEntries: Dossier[];
    feedback: Feedback[];
    hours: Hours[];
    role: UserRole;
    trainingRole: TrainingRole;
    training: boolean;
    events: boolean;
    visitor: boolean;
    visitorFrom: string;
    status: UserStatus;
    joined: Date;
    created: Date;
    updated: Date;
}

enum UserRating {
    OBS = 1,
    S1,
    S2,
    S3,
    C1,
    C3 = 7,
    I1,
    I3 = 10,
    SUP,
    ADM
}

enum UserRole {
    ATM,
    DATM,
    TA,
    ATA,
    WM,
    AWM,
    EC,
    AEC,
    FE,
    AFE,
    None
}

enum TrainingRole {
    INS,
    MTR,
    None
}

enum UserStatus {
    Active,
    Inactive,
    Loa,
    Removed
}