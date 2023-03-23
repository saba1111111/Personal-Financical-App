import { body } from 'express-validator';

const email = body('email')
	.exists()
	.withMessage('Email is required.')
	.isEmail()
	.withMessage('invalid email address!');

const password = body('password')
	.isLength({ min: 5 })
	.withMessage('The password must have a minimum length of 5 characters.');

const signUp = [
	body('userName', 'Username is required and must not be empty')
		.exists()
		.notEmpty(),
	email,
	password,
];

const signIn = [email, password];

const resetPassword = [
	email,
	body('code', 'Code is required and must not be empty').exists().notEmpty(),
	body('newPassword')
		.isLength({ min: 5 })
		.withMessage(
			'The password must have a minimum length of 5 characters.'
		),
];

export default {
	signUp,
	signIn,
	resetPassword,
	email,
};
