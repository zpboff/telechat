export type User = {
    username: string;
    email: string;
    passwordHash: string; 
}

export type LoginResponse = {
    username: string;
    password: string;
}

export type RegistrationResponse = {
    username: string;
    email: string;
    password: string;
}