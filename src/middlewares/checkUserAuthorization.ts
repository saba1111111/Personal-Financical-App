import { RequestHandler } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import envVars from '../config';
import { MyError } from '../utils/customThrowErrorFunc';

export const checkAuthentication: RequestHandler = (req, res, next) => {
	const token = req.headers?.authorization?.split(' ')[1];

	try {
		jsonwebtoken.verify(
			token as string,
			envVars.JWT_SECRET_TOKEN as string
		);

		next();
	} catch {
		const error: MyError = new Error('Invalid Authorization token!');
		error.code = 401;

		next(error);
	}
};
