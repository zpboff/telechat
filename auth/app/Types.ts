export interface IErrorModel {}

export type SignupModel = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

export type SignupErrorModel = IErrorModel & {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
};

export type SigninModel = {
    email: string;
    password: string;
};

export type SigninErrorModel = IErrorModel & {
    email?: string;
    password?: string;
};

export type ValidationResult<T extends IErrorModel> = {
    errors: T;
    isValid: boolean;
};

export type UserPayload = {
    firstName: string;
    lastName: string;
    id: string;
    birthDate: Date;
    initials: string;
    isOnline: boolean;
};

export type Nullable<T> = T | null;