import { RequestHandler } from 'express';
import {
	createUser,
	RessetPassword,
	loginUser,
	PasswordResetEmailCheck,
} from '../services/auth.service';

const handleSignUp: RequestHandler = async (req, res, next) => {
	const { userName, email, password } = req.body;

	try {
		const newUser = await createUser({ userName, email, password });

		res.status(201).json({
			message: 'Successfully created user!',
			data: newUser,
		});
	} catch (error) {
		next(error);
	}
};

const handleSignIn: RequestHandler = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const signInUser = await loginUser({ email, password });

		res.status(200).json({
			message: 'User successfully logged in!',
			data: signInUser,
		});
	} catch (error) {
		next(error);
	}
};

const handlePasswordResetCheck: RequestHandler = async (req, res, next) => {
	const { email } = req.body;

	try {
		await PasswordResetEmailCheck(email);

		res.status(200).json({
			message:
				'The code has been successfully sent to your email and will expire in 5 minutes.',
		});
	} catch (error) {
		next(error);
	}
};

const handlePasswordReset: RequestHandler = async (req, res, next) => {
	const { email, code, newPassword } = req.body;

	try {
		await RessetPassword({ email, code, newPassword });

		res.status(200).json({
			message: 'Password has been updated successfully.',
		});
	} catch (error) {
		next(error);
	}
};

export default {
	handleSignUp,
	handleSignIn,
	handlePasswordResetCheck,
	handlePasswordReset,
};
