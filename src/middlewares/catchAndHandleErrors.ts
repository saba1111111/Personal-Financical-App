import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import validations from '../validations/auth.validation';

const catchErrors: RequestHandler = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = errors.array();
		return res.status(402).json({ error });
	}

	next();
};

const validationMidllewares = {
	SignUp: [validations.signUpValidation, catchErrors],
	SignIn: [validations.signInValidation, catchErrors],
	PasswordResetCheck: [validations.PasswordResetCheckValidation, catchErrors],
	PasswordReset: [validations.resetPasswordValidation, catchErrors],
};

export default validationMidllewares;
