import { Sequelize } from 'sequelize';

import db from "./database"

import { config } from "dotenv"

config();

export const sequelize = new Sequelize(
    db.db,
    db.user,
    db.password,
    {
        dialect: 'postgres',
        port: parseInt(db.port)
    }
);