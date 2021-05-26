export interface Loa {
    id: number;
    reason: string;
    moreinfo: string;
    start: Date;
    end: Date;
    status: LoaStatus;
    created: Date;
    updated: Date;
}

enum LoaStatus {
    Pending,
    MoreInfo,
    Accepted,
    Started,
    Canceled,
    Ended,
    Controlled
}