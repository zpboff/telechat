import { pool } from "../db";
import { Result } from "../types";

export type User = {
    id: number;
    email: string;
    password: string;
    createDate: Date;
    updateDate: Date;
}

export async function getUser(email: string): Promise<Result<User>> {
    try {
        const { rows } = await pool.query("SELECT * FROM USERS WHERE Email=$1", [email]);
        const [user] = rows;
    
        return {
            entity: user
        };
    }
    catch(ex) {
        console.log(ex);
        
        return {
            errors: [ex]
        };
    }
}

export async function createUser(email: string, password: string): Promise<Result<boolean>> {
    try {
        const result = await pool.query("INSERT INTO users(email, password) VALUES($1, $2)", [email, password]);

        return {
            entity: true
        };
    }
    catch(ex) {
        console.log(ex);
        
        return {
            errors: [ex.message]
        }
    }
}