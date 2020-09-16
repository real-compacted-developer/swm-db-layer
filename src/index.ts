import express from 'express';
import db from './database';
import initAssociation from "./database/association";

export const app = express();

initAssociation();
db.sequelize.sync().then(() => console.log("Database model connect completed successfully"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
