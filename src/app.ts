import express, { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';

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

app.listen(3000);
