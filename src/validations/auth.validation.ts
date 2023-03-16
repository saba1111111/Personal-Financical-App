import { body } from 'express-validator';

const emailAndPasswordValidation = [
	body('email')
		.exists()
		.withMessage('Email is required.')
		.isEmail()
		.withMessage('invalid email address!'),
	body('password')
		.isLength({ min: 5 })
		.withMessage(
			'The password must have a minimum length of 5 characters.'
		),
];

const signUpValidation = [
	body('userName', 'Username is required and must not be empty')
		.exists()
		.notEmpty(),
	...emailAndPasswordValidation,
];

const signInValidation = emailAndPasswordValidation;

export { signUpValidation, signInValidation };
