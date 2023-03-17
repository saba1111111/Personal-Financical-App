import { body } from 'express-validator';
import { emailValidation, passwordValidation } from '.';

const signUpValidation = [
	body('userName', 'Username is required and must not be empty')
		.exists()
		.notEmpty(),
	emailValidation,
	passwordValidation,
];

const signInValidation = [emailValidation, passwordValidation];

const PasswordResetCheckValidation = emailValidation;

const resetPasswordValidation = [
	emailValidation,
	body('code', 'Code is required and must not be empty').exists().notEmpty(),
	body('newPassword')
		.isLength({ min: 5 })
		.withMessage(
			'The password must have a minimum length of 5 characters.'
		),
];

export default {
	signUpValidation,
	signInValidation,
	resetPasswordValidation,
	PasswordResetCheckValidation,
};
