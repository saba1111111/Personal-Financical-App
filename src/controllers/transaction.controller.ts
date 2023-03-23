import { RequestHandler } from 'express';
import { AuthenticatedRequest } from '../middlewares/checkUserAuthorization';
import services from '../services/transaqtion.service';

const handleCreatTransaction: RequestHandler = async (req, res, next) => {
	const { amount, description, type, status, category } = req.body;
	const user = (req as AuthenticatedRequest).user.userId;

	try {
		const newTransaction = await services.createTransaction({
			amount,
			description,
			type,
			status,
			category,
			user,
		});

		res.status(201).json({
			message: 'Successfully created transaction!',
			data: newTransaction,
		});
	} catch (error) {
		next(error);
	}
};

const handleFilterAndSortTransactions: RequestHandler = async (
	req,
	res,
	next
) => {
	const { categories, type, status, amount, date, sort } = req.body;
	const user = (req as AuthenticatedRequest).user.userId;

	try {
		const transactions = await services.FilterAndSortTransactions({
			categories,
			type,
			status,
			amount,
			date,
			user,
			sort,
		});

		res.status(200).json({
			message: 'Send transactions successfully.',
			data: transactions,
		});
	} catch (error) {
		next(error);
	}
};

export default { handleCreatTransaction, handleFilterAndSortTransactions };
