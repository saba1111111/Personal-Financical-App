import { body } from 'express-validator';

export const emailValidation = body('email')
	.exists()
	.withMessage('Email is required.')
	.isEmail()
	.withMessage('invalid email address!');

export const passwordValidation = body('password')
	.isLength({ min: 5 })
	.withMessage('The password must have a minimum length of 5 characters.');
