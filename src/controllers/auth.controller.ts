import { RequestHandler } from 'express';
import { createUser } from '../services/auth.service';
import { loginUser } from '../services/auth.service';

export const handleSignUp: RequestHandler = async (req, res, next) => {
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

export const handleSignIn: RequestHandler = async (req, res, next) => {
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
