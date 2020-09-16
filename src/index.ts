import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import db from './database';
import initAssociation from "./database/association";
import Api from './apis';

export const app = express();

initAssociation();
db.sequelize.sync().then(() => console.log("Database model connect completed successfully"));

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', Api);
