import { UserRating, UserStatus } from "./User";
import { Hours } from "./Hours";

export interface Stats {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    initials: string;
    rating: UserRating;
    ratingLong: string;
    status: UserStatus;
    hours: Hours;
}