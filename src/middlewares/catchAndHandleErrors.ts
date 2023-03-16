import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import {
	signUpValidation,
	signInValidation,
} from '../validations/auth.validation';

export const catchErrors: RequestHandler = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = errors.array();
		return res.status(402).json({ error });
	}

	next();
};

export const checkSignUpValidation = [signUpValidation, catchErrors];
export const checkSignInValidation = [signInValidation, catchErrors];
