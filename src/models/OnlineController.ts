import { User } from "./User";

export interface OnlineController {
    id: number;
    position: string;
    frequency: string;
    user: User;
    online: string;
    created: Date;
}