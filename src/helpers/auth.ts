/* eslint-disable no-mixed-spaces-and-tabs */
class Token {
    cid: number;
    firstName: string;
    lastName: string;
    rating: UserRating;
    isMember: boolean;
    roles: string[];

    constructor(cid: number, firstName: string, lastName: string, rating: UserRating, isMember: boolean, roles: string[]) {
    	this.cid = cid;
    	this.firstName = firstName;
    	this.lastName = lastName;
    	this.rating = rating;
    	this.isMember = isMember;
    	this.roles = roles;
    }
}


enum UserRating {
	Inactive,
    OBS,
    S1,
    S2,
    S3,
    C1,
	C2,
    C3,
    I1,
	I2,
    I3,
    SUP,
    ADM
}

const staffRoles: string[] = [
	"ATM",
	"DATM",
	"TA",
	"WM",
	"EC",
	"FE",
	"ATA",
	"AWM",
	"AEC",
	"AFE"
];

const fullStaffRoles: string[] = [
	"ATM",
	"DATM",
	"TA",
	"WM",
	"EC",
	"FE"
];

const trainingRoles: string[] = [
	"INS",
	"MTR"
];


export function getAuthURL(): string {
	return "https://auth.vatsim.net/oauth/authorize" +
        "?client_id=" + process.env.REACT_APP_VATSIM_CONNECT_CLIENT_ID +
        "&redirect_uri=" + process.env.REACT_APP_VATSIM_CONNECT_REDIRECT_URI +
        "&response_type=code&scope=full_name+vatsim_details+email" +
        "&required_scopes=full_name+vatsim_details+email";
}

export function parseJWT(): Token | null {
	const accessToken = localStorage.getItem("access");
	if (accessToken) {
		const token: Token = JSON.parse(atob(accessToken.split(".")[1]));
		return token;
	}
	return null;
}

export function isAuthenticated(): boolean {
	const jwt = parseJWT();
	if (jwt == null)
		return false;
	return jwt != null;
}

export function isMember(): boolean {
	const jwt = parseJWT() as Token;
	if (jwt == null)
		return false;
	return jwt.isMember;
}

export function isTrainingStaff(): boolean {
	const jwt = parseJWT() as Token;
	if (jwt == null || jwt.roles == null)
		return false;
	return trainingRoles.some(x => jwt.roles.indexOf(x) !== -1);
}

export function isInstructor(): boolean {
	const jwt = parseJWT() as Token;
	if (jwt == null || jwt.roles == null)
		return false;
	return jwt.roles.includes("INS");
}

export function isStaff(): boolean {
	const jwt = parseJWT() as Token;
	if (jwt == null || jwt.roles == null)
		return false;
	return staffRoles.some(x => jwt.roles.indexOf(x) !== -1);
}

export function isFullStaff(): boolean {
	const jwt = parseJWT() as Token;
	if (jwt == null || jwt.roles == null)
		return false;
	return fullStaffRoles.some(x => jwt.roles.indexOf(x) !== -1);
}

export function isSeniorStaff(): boolean {
	const jwt = parseJWT() as Token;
	if (jwt == null || jwt.roles == null)
		return false;
	return ["ATM", "DATM", "TA", "ATA", "WM"].some(x => jwt.roles.indexOf(x) !== -1);
}

export function canTraining(): boolean {
	const jwt = parseJWT() as Token;
	if (jwt == null || jwt.roles == null)
		return false;
	return ["ATM", "DATM", "TA", "ATA", "WM", "INS"].some(x => jwt.roles.indexOf(x) !== -1);
}

export function canFacilities(): boolean {
	const jwt = parseJWT() as Token;
	if (jwt == null || jwt.roles == null)
		return false;
	return ["ATM", "DATM", "TA", "ATA", "WM", "FE", "AFE"].some(x => jwt.roles.indexOf(x) !== -1);
}

export function canEvents(): boolean {
	const jwt = parseJWT() as Token;
	if (jwt == null || jwt.roles == null)
		return false;
	return ["ATM", "DATM", "TA", "ATA", "WM", "EC", "AEC"].some(x => jwt.roles.indexOf(x) !== -1);
}

export function getCid(): number {
	const jwt = parseJWT() as Token;
	if (jwt == null)
		return Number.MIN_SAFE_INTEGER;
	return jwt.cid;
}

export function getFirstName(): string {
	const jwt = parseJWT() as Token;
	if (jwt == null)
		return "";
	return jwt.firstName;
}

export function getLastName(): string {
	const jwt = parseJWT() as Token;
	if (jwt == null)
		return "";
	return jwt.lastName;
}

export function getFullName(): string {
	const jwt = parseJWT() as Token;
	if (jwt == null)
		return "";
	return `${jwt.firstName} ${jwt.lastName}`;
}

export function getReverseNameCid(): string {
	const jwt = parseJWT() as Token;
	if (jwt == null)
		return "";
	return `${jwt.lastName}, ${jwt.firstName} - ${jwt.cid}`;
}

export function getUserRating(): UserRating {
	const jwt = parseJWT() as Token;
	if (jwt == null)
		return UserRating.Inactive;
	return jwt.rating;
}

export function getRoles(): string[] {
	const jwt = parseJWT() as Token;
	if (jwt == null || jwt.roles == null)
		return [];
	return jwt.roles;
}
