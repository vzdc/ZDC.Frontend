export interface BugReport {

    id: number;
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