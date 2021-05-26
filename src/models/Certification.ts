export interface Certification {
    id: number;
    ground: CertificationType;
    tower: CertificationType;
    minorApproach: CertificationType;
    chesapeake: CertificationType;
    shenandoah: CertificationType;
    mountVernon: CertificationType;
    center: CertificationType;
    created: Date;
    updated: Date;
}

enum CertificationType {
    None,
    Solo,
    Minor,
    Certified
}