import express, { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import envVars from './config';
import authRoute from './routes/auth.routes';
import { MyError } from './utils/customThrowErrorFunc';

const app = express();
app.use(json());

app.use((req: Request, res: Response, next: NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);
	next();
});

app.use('/auth', authRoute);

/* eslint-disable @typescript-eslint/no-unused-vars */
app.use((error: MyError, req: Request, res: Response, next: NextFunction) => {
	const code = error.code || 500;
	res.status(code).json({ error: error.message });
});

mongoose
	.connect(envVars.MONGODB_CONNECT_URL as string)
	.then(() => {
		app.listen(4000);
	})
	.catch((error) => console.log(error));
