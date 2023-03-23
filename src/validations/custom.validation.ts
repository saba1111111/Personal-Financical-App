import { CustomValidator } from 'express-validator';

const checkTransactionStatus: CustomValidator = (value: any, { req }) => {
	if (req.body.type === 'income') {
		if (value) throw new Error('income transactions dont have status');
		return true;
	}

	if (req.body.type === 'expense') {
		const validTypes = ['processing', 'completed'];
		if (validTypes.includes(value)) return true;
		return false;
	}

	return true;
};

const checkCategories: CustomValidator = (value: any) => {
	if (!Array.isArray(value)) {
		return false;
	}
	return value.length && value.every((item) => typeof item === 'string');
};

const checkTransactionsAmountFilters: CustomValidator = (value: any) => {
	if (typeof value !== 'object') return false;
	if (!value.minAmount && !value.maxAmount) return false;

	if ('minAmount' in value && typeof value.minAmount !== 'number') {
		throw new Error('lessThan field must be a number');
	}
	if ('maxAmount' in value && typeof value.maxAmount !== 'number') {
		throw new Error('greaterThan field must be a number');
	}

	return true;
};

const checkTransactionsDateFilters: CustomValidator = (value: any) => {
	if (typeof value !== 'object') return false;
	if (!value.minDate && !value.maxDate) return false;
	const dateRegex =
		/^(?!0000)[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/;
	if ('minDate' in value && !dateRegex.test(value.minDate)) {
		throw new Error(
			'minDate field must be a valid date type. (yyyy-mm-dd)'
		);
	}
	if ('maxDate' in value && !dateRegex.test(value.maxDate)) {
		throw new Error(
			'maxDate field must be a valid date type. (yyyy-mm-dd)'
		);
	}

	return true;
};

const checkTransactionsSortData: CustomValidator = (value: any) => {
	if (!value.amount && !value.date) {
		return false;
	}
	const validValues = ['desc', 'asc'];

	if ('amount' in value && !validValues.includes(value.amount)) {
		throw new Error('amount field must be a asc or desc.');
	}
	if ('date' in value && !validValues.includes(value.date)) {
		throw new Error('date field must be a asc or desc.');
	}

	return true;
};

export {
	checkTransactionStatus,
	checkCategories,
	checkTransactionsAmountFilters,
	checkTransactionsDateFilters,
	checkTransactionsSortData,
};
