import 'babel-polyfill';
import express from 'express';
import routes from './routes';
//import database from './config/database';

const app = express();
app.use(express.json());

//database.connect();
routes(app);

export default app;
