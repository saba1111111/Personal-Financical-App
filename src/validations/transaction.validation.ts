import { body } from 'express-validator';
import {
	checkTransactionStatus,
	checkCategories,
	checkTransactionsAmountFilters,
	checkTransactionsDateFilters,
	checkTransactionsSortData,
} from './custom.validation';

const createTransaction = [
	body('description', 'description is required and it must be a string.')
		.exists()
		.isString()
		.notEmpty(),
	body('amount', 'amount is required and it must be a number.')
		.exists()
		.isNumeric(),
	body('type', 'type is required and it must be a income or expense.')
		.exists()
		.isIn(['income', 'expense']),
	body(
		'status',
		'status is required and it must be a processing or completed.'
	).custom(checkTransactionStatus),
	body('category')
		.if(body('category').exists())
		.notEmpty()
		.withMessage('category cannot be empty.'),
];

const filterAndSortTransactions = [
	body('categories', 'categories must be a string of arrays.')
		.if(body('categories').exists())
		.isArray()
		.custom(checkCategories),
	body('type', 'type must be a "income" or "expense".')
		.if(body('type').exists())
		.isIn(['income', 'expense']),
	body('status', 'status must be a "processing" or "completed".')
		.if(body('status').exists())
		.custom(checkTransactionStatus)
		.isIn(['processing', 'completed']),
	body(
		'amount',
		'Amount field must be an object with  maxAmount and/or minAmount fields'
	)
		.if(body('amount').exists())
		.custom(checkTransactionsAmountFilters),
	body(
		'date',
		'date field must be an object with maxDate and/or minDate fields.'
	)
		.if(body('date').exists())
		.custom(checkTransactionsDateFilters),
	body('sort', 'sort must be a object with  amount and/or date fields.')
		.if(body('sort').exists())
		.isObject()
		.custom(checkTransactionsSortData),
];

export default { createTransaction, filterAndSortTransactions };
