import { config } from "dotenv"

config();


let db = {
    db: process.env.PG_DB as string,
    user: process.env.PG_USER as string,
    password: process.env.PG_PASSWORD as string,
    port: process.env.PG_PORT as string
}

if (process.env.NODE_ENV === 'test') {
    db = {
        db: process.env.PG_TEST_DB as string,
        user: process.env.PG_TEST_USER as string,
        password: process.env.PG_TEST_PASSWORD as string,
        port: process.env.PG_TEST_PORT as string
    }
}

export default db;