export interface File {
    id: number;
    title: string;
    description: string;
    category: FileCategory;
    url: string;
    created: Date;
    updated: Date;
}

export enum FileCategory {
    VRC,
    vSTARS,
    vERAM,
    vATIS,
    SOPs,
    LOAs,
    Training,
    Staff
}