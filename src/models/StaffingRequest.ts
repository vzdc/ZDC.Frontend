export interface StaffingRequest {
    id: number;
    name: string;
    email: string;
    affiliation: string;
    description: string;
    date: Date;
    start: string;
    end: string
    status: StaffingRequestStatus;
    created: Date;
    updated: Date;
}

enum StaffingRequestStatus {
    Pending,
    Accepted,
    Denied
}