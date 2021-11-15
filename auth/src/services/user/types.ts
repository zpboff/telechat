export type UserCreateModel = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export type User = {
    id: number;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    createDate: Date;
    updateDate: Date;
};