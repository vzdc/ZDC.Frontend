/* eslint-disable no-mixed-spaces-and-tabs */
class Token {
    cid: number;
    firstName: string;
    lastName: string;
    rating: UserRating;
    isMember: boolean;
    userRole: UserRole;
    trainingRole: TrainingRole;

    constructor(cid: number, firstName: string, lastName: string, rating: UserRating, isMember: boolean, userrole: UserRole, trainingRole: TrainingRole) {
    	this.cid = cid;
    	this.firstName = firstName;
    	this.lastName = lastName;
    	this.rating = rating;
    	this.isMember = isMember;
    	this.userRole = userrole;
    	this.trainingRole = trainingRole;
    }
}


enum UserRating {
    OBS = 1,
    S1,
    S2,
    S3,
    C1,
    C3 = 7,
    I1,
    I3 = 10,
    SUP,
    ADM
}

enum UserRole {
    ATM,
    DATM,
    TA,
    ATA,
    WM,
    AWM,
    EC,
    AEC,
    FE,
    AFE,
    None
}

enum TrainingRole {
    INS,
    MTR,
    None
}

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
	return jwt != null;
}

export function isMember(): boolean {
	const jwt = parseJWT() as Token;
	return jwt.isMember;
}

export function isTrainingStaff(): boolean {
	const jwt = parseJWT() as Token;
	return jwt.trainingRole != TrainingRole.None;
}

export function isInstructor(): boolean {
	const jwt = parseJWT() as Token;
	return jwt.trainingRole == TrainingRole.INS;
}

export function isStaff(): boolean {
	const jwt = parseJWT() as Token;
	return jwt.userRole != UserRole.None;
}

export function isSeniorStaff(): boolean {
	const jwt = parseJWT() as Token;
	return jwt.userRole in [UserRole.ATM, UserRole.DATM, UserRole.TA, UserRole.WM];
}

export function getCid(): number {
	const jwt = parseJWT() as Token;
	return jwt.cid;
}

export function getFirstName(): string {
	const jwt = parseJWT() as Token;
	return jwt.firstName;
}

export function getLastName(): string {
	const jwt = parseJWT() as Token;
	return jwt.lastName;
}

export function getFullName(): string {
	const jwt = parseJWT() as Token;
	return `${jwt.firstName} ${jwt.lastName}`;
}

export function getReverseNameCid(): string {
	const jwt = parseJWT() as Token;
	return `${jwt.lastName}, ${jwt.firstName} - ${jwt.cid}`;
}

export function getUserRating(): UserRating {
	const jwt = parseJWT() as Token;
	return jwt.rating;
}

export function getUserRole(): UserRole {
	const jwt = parseJWT() as Token;
	return jwt.userRole;
}

export function getTrainingRole(): TrainingRole {
	const jwt = parseJWT() as Token;
	return jwt.trainingRole;
}