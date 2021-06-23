export interface EventPosition {
    id: number;
    position: string;
    type: EventPosotionType;
}

enum EventPosotionType {
    Local,
    Tracon,
    Center
}