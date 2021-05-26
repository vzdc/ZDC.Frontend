import { User } from "./User";

export interface ControllerLog {
    id: number;
    position: string;
    frequency: string;
    user: User;
    login: Date;
    logout: Date;
    duration: number;
    created: Date;
    updated: Date;
}