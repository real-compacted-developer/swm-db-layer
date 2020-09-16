import express from 'express';
import db from './database';

export const app = express();

db.sequelize.sync().then(() => console.log("Database model connect completed successfully"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
