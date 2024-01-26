import 'express-async-errors';
import express, { json } from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routes.js';

const app = express();

app.use(json());

app.get('/', (_req, res) => {
	res.status(200).send('It works!');
});

app.use('/', router);

app.use(errorHandler);

export default app;
