import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import db from './database';
import Api from './apis';

export const app = express();

db.sequelize.sync();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', Api);
