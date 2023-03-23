import express, { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import envVars from './config';
import authRoute from './routes/auth.routes';
import { MyError } from './utils/customThrowErrorFunc';
import categoryRoute from './routes/category.routes';
import transactionRoute from './routes/transaction.routes';
import swaggerDoc from 'swagger-ui-express';
import swaggerDocumentation from './documentation';

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
app.use('/category', categoryRoute);
app.use('/transaction', transactionRoute);

app.use(
	'/documentation',
	swaggerDoc.serve,
	swaggerDoc.setup(swaggerDocumentation)
);

/* eslint-disable @typescript-eslint/no-unused-vars */
app.use((error: MyError, req: Request, res: Response, next: NextFunction) => {
	const code = error.code || 500;
	res.status(code).json({ error: error.message });
});

mongoose
	.connect(envVars.MONGODB_CONNECT_URL as string)
	.then(() => {
		app.listen(envVars.PORT);
	})
	.catch((error) => console.log(error));
