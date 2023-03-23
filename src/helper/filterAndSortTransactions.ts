import mongoose from 'mongoose';

const filterTransactions = (filterDatas: Transaction.filterAndSortLogic) => {
	const { categories, type, status, amount, date, user } = filterDatas;
	const filterLogic: Transaction.mongooseFilterLogic = { user };

	if (categories) {
		const validCategories = categories.filter((category) =>
			mongoose.Types.ObjectId.isValid(category)
		);
		if (validCategories.length)
			filterLogic.category = { $in: validCategories };
	}

	if (type) filterLogic.type = type;
	if (status) filterLogic.status = status;

	if (amount) {
		filterLogic.$and = [];
		if (amount.maxAmount)
			filterLogic.$and.push({ amount: { $lte: amount.maxAmount } });
		if (amount.minAmount)
			filterLogic.$and.push({ amount: { $gte: amount.minAmount } });
	}

	if (date) {
		if (!filterLogic.$and) filterLogic.$and = [];
		if (date.maxDate)
			filterLogic.$and.push({
				createdAt: { $lte: new Date(date.maxDate) },
			});
		if (date.minDate)
			filterLogic.$and.push({
				createdAt: { $gte: new Date(date.minDate) },
			});
	}

	return filterLogic;
};

const sortTransactions = (sortData: Transaction.sortLogic) => {
	const { sort } = sortData;

	const sortLogic: Transaction.mongooseSortLogic = {};

	if (sort) {
		sortLogic.sort = {};
		if (sort.amount) sortLogic.sort.amount = sort.amount;
		if (sort.date) sortLogic.sort.createdAt = sort.date;
	}

	return sortLogic;
};

export { filterTransactions, sortTransactions };
