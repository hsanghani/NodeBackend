export interface UserType {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    location:object
    lat: number;
    long: number;
    token: string;
    // isAdmin: boolean;
    // resetPasswordToken: string;
    // resetPasswordExpires: Date;
}

export interface UserReturnType {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    location:object,
    status: number;
    token: string;
    // isAdmin: boolean;
    // token: string;
}

export interface UserErrorReturnType {
    message: string;
    status: number;
}