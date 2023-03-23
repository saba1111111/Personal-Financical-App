import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import authValidations from '../validations/auth.validation';
import categoryValidations from '../validations/category.validation';
import transactionValidation from '../validations/transaction.validation';

const catchErrors: RequestHandler = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = errors.array();
		return res.status(402).json({ error });
	}

	next();
};

const validationMidllewares = {
	SignUp: [authValidations.signUp, catchErrors],
	SignIn: [authValidations.signIn, catchErrors],
	PasswordResetCheck: [authValidations.email, catchErrors],
	PasswordReset: [authValidations.resetPassword, catchErrors],
	creatCategory: [categoryValidations.creatCategory, catchErrors],
	updateCategory: [categoryValidations.updateNameAndDescription, catchErrors],
	deleteCategory: [categoryValidations.deleteCategory, catchErrors],
	createTransaction: [transactionValidation.createTransaction, catchErrors],
	filterAndSortTransactions: [
		transactionValidation.filterAndSortTransactions,
		catchErrors,
	],
};

export default validationMidllewares;
