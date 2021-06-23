export interface BugReport {

    id: number;
    name: string;
    cid: number;
    datetime: Date;
    desciption: string;
    status: BugReportType;    
    created: Date;
    updated: Date;
}

enum BugReportType {
    Pending,
    UnderInvestigation,
    InProgress,
    Resolved
}