import { User } from "./User";

export interface TrainingTicket {
    id: number;
    student: User;
    trainer: User;
    position: TrainingTicketPosition;
    facility: TrainingTicketFacility;
    type: TrainingTicketType;
    start: Date;
    end: Date;
    duration: string;
    studentComments: string;
    trainerComments: string;
    noShow: boolean;
    otsRecommendation: boolean;
    created: Date;
    updated: Date;
}

enum TrainingTicketPosition {
    MinorGround,
    MinorLocal,
    MajorGround,
    MajorLocal,
    MinorApproach,
    MajorApproach,
    Center
}

enum TrainingTicketFacility {
    KIAD,
    KBWI,
    KDCA,
    KORF,
    DC
}

enum TrainingTicketType {
    Classroom,
    Sweatbox,
    Network,
    Monitoring,
    SweatboxOTSPass,
    NetworkOTSPass,
    SweatboxOTSFail,
    NetworkOTSFail,
    OTS,
    NA
}