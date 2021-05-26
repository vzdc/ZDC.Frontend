export interface Warning {
    id: number;
    reason: WarningReason;
    status: WarningStatus;
    month: number;
    year: number;
    created: Date;
    updated: Date;
}

enum WarningReason {
    Activity,
    Grp
}

enum WarningStatus {
    Warned,
    GotFirstHalf,
    Resolved,
    NeedsRemoval
}