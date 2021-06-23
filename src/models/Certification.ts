export interface Certification {
    id: number;
    ground: Local;
    tower: Local;
    minorApproach: Tracon;
    chesapeake: Tracon;
    shenandoah: Tracon;
    mountVernon: Tracon;
    center: Center;
}

export enum Center {
    None,
    Solo,
    Certified
}

export enum Tracon {
    None,
    Solo,
    Certified
}


export enum Local {
    None,
    Solo,
    Minor,
    Certified
}