import transactionModel from '../models/transaction.model';

interface filterAndSortLogic {
	filterLogic: Transaction.mongooseFilterLogic;
	sortLogic: Transaction.mongooseSortLogic;
}

const findTransactions = async ({
	filterLogic,
	sortLogic,
}: filterAndSortLogic) => {
	const transactions = await transactionModel
		.find(filterLogic)
		.sort(sortLogic.sort)
		.catch(() => {
			return null;
		});

	return transactions;
};

const addTransaction = async (Transaction: Transaction.CreateTransaction) => {
	const newTransaction = new transactionModel(Transaction);
	const createTransaction = await newTransaction.save();

	return createTransaction;
};

const updateTransactionCategory = (updateTransaction: {
	category: string;
	defaultCategory: string;
}) => {
	const { category, defaultCategory } = updateTransaction;

	const transactions = transactionModel.updateMany(
		{ category },
		{ category: defaultCategory }
	);

	return transactions;
};

export { findTransactions, addTransaction, updateTransactionCategory };
