import { throwError } from '../utils/customThrowErrorFunc';
import { findCategory } from '../repositories/category.repository';
import {
	addTransaction,
	findTransactions,
} from '../repositories/transaction.repository';
import {
	filterTransactions,
	sortTransactions,
} from '../helper/filterAndSortTransactions';

const createTransaction = async (
	transaction: Transaction.CreateTransaction
) => {
	const { amount, description, type, status, category, user } = transaction;

	const transactionData = { amount, description, type, category, user };
	if (!category) {
		const defaultCategory = await findCategory({ name: 'default', user });
		transactionData.category = defaultCategory?._id.toString();
	} else {
		const checkCategory = await findCategory({ _id: category });
		if (!checkCategory) throwError(`No such category.`, 409);
	}

	const newTransaction =
		type === 'expense' ? { ...transactionData, status } : transactionData;

	const createTransaction = await addTransaction(newTransaction);
	return createTransaction;
};

const FilterAndSortTransactions = async (
	filterAndSortLogic: Transaction.filterAndSortLogic
) => {
	const { categories, type, status, amount, date, sort, user } =
		filterAndSortLogic;

	const filterLogic = filterTransactions({
		categories,
		type,
		status,
		amount,
		date,
		user,
	});
	const sortLogic = sortTransactions({ sort });

	const transactions = await findTransactions({ filterLogic, sortLogic });
	return transactions || [];
};

export default { createTransaction, FilterAndSortTransactions };
