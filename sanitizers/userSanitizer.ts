import { regexEmail } from "../schema/userSchema";
import { UserType } from "../types/userTypes";
import HttpException from '../utils/httpException';

export async function sanitizeUser(users: UserType):Promise<UserType> {
    let sanitizedUser = <UserType>{};

    sanitizedUser.email = sanitizeEmail(users.email);
    sanitizedUser.firstName = sanitizeFirstname(users.firstName);
    sanitizedUser.lastName = sanitizeLastname(users.lastName);
    sanitizedUser.username = sanitizeUsername(users.username);
    sanitizedUser.password = await snaitizePassword(users.password)
    sanitizedUser.token = sanitizeToken(users.token)
    sanitizedUser.lat = sanitizeLat(users.lat)
    sanitizedUser.long = sanitizeLong(users.long)
    // sanitizedUser.isAdmin = sanitizeIsAdmin(users.isAdmin);

    return sanitizedUser;
}
export async function sanitizeUpdateUser(users: UserType):Promise<UserType> {
    let sanitizedUser = <UserType>{};

    
    if(!users.lat){
        throw new HttpException('lat is a null', 400);
    }

    if(!users.long){
        throw new HttpException('long is a null', 400);
    }

    sanitizedUser.lat = sanitizeLat(users.lat)
    sanitizedUser.long = sanitizeLong(users.long)

    console.log(sanitizedUser,"{}{}");
    return sanitizedUser;
}

export async function sanitizeLoginUser(email: string, password: string): Promise<UserType> {
    let sanitizedUser = <UserType>{};

    sanitizedUser.email = sanitizeEmail(email);
    sanitizedUser.password = await snaitizePassword(password);

    return sanitizedUser;
}



function sanitizeFirstname(firstName: string): string {
    // Types
    if (firstName === undefined) {
        throw new HttpException('firstName is undefined', 400)
    }
    if (typeof firstName !== 'string') {
        throw new HttpException('firstName is not a string', 400);
    }

    // Attributes
    firstName = firstName.trim();
    return firstName
}

function sanitizeLastname(lastName: string): string {
    // Types
    if (lastName === undefined) {
        throw new HttpException('lastName is undefined', 400)
    }
    if (typeof lastName !== 'string') {
        throw new HttpException('lastName is not a string', 400);
    }

    // Attributes
    lastName = lastName.trim();
    return lastName
}

function sanitizeUsername(username: string): string {
    // Types
    if (username === undefined) {
        throw new HttpException('Username is undefined', 400)
    }
    if (typeof username !== 'string') {
        throw new HttpException('Username is not a string', 400);
    }

    // Attributes
    username = username.trim();
    return username
}
function sanitizeToken(token: string): string {
    // Types
    if (token === undefined) {
        throw new HttpException('Token is undefined', 400)
    }
    if (typeof token !== 'string') {
        throw new HttpException('Token is not a string', 400);
    }
    return token
}
function sanitizeLat(lat: number): number {
    // Types
    if (lat === undefined) {
        throw new HttpException('Lat is undefined', 400)
    }
    if (typeof lat !== 'number') {
        throw new HttpException('Lat is not a number', 400);
    }
    return lat
}
function sanitizeLong(long: number): number {
    // Types
    if (long === undefined) {
        throw new HttpException('Long is undefined', 400)
    }
    if (typeof long !== 'number') {
        throw new HttpException('Long is not a number', 400);
    }
    return long
}

// function sanitizeIsAdmin(isAdmin: boolean): boolean {
//     // Types
//     if (!isAdmin) isAdmin = false;

//     return isAdmin;
// }

function sanitizeEmail(email: string): string {
    // Types
    if (email === undefined) {
        throw new HttpException('Email is undefined', 400)
    }
    if (typeof email !== 'string') {
        throw new HttpException('Email is not a string', 400)
    }

    // Attributes
    email = email.trim();
    if (email.length < 6) {
        throw new HttpException('Email must be at least 6 characters', 400)

    }
    if (email.length > 50) {
        throw new HttpException('Email must be less then 50 characters', 400)
    }
    if (!email.match(regexEmail)) {
        throw new HttpException('Please add a valid email', 400)
    }
    return email
}

async function snaitizePassword(password: string): Promise<string> {
    // Types
    if(password === undefined) {
        throw new HttpException('Password is undefined', 400)
    }
    if(typeof password !== 'string') {
        throw new HttpException('Password is not a string', 400)
    }

    // Attributes
    password = password.trim();
    if (password.length < 6) {
        throw new HttpException('Password must be at least 6 characters', 400)
    }
    if (password.length > 50) {
        throw new HttpException('Password must be less then 50 characters', 400)
    }
    return password
}