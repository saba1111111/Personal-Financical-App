import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import envVars from '../config';
import { MyError } from '../utils/customThrowErrorFunc';

type jwtDataType = { userId: string };
export type AuthenticatedRequest = Request & {
	user: jwtDataType;
};

const checkAuthentication = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers?.authorization?.split(' ')[1];

	try {
		const jwtData = jsonwebtoken.verify(
			token as string,
			envVars.JWT_SECRET_TOKEN as string
		);
		(req as AuthenticatedRequest).user = jwtData as jwtDataType;

		next();
	} catch {
		const errorMessage = token
			? 'Invalid Authorization token!'
			: 'Missing authentication token.';
		const error: MyError = new Error(errorMessage);
		error.code = 401;

		next(error);
	}
};

export default checkAuthentication;
