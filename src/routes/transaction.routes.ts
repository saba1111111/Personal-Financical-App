import { Router } from 'express';
import validations from '../middlewares/catchAndHandleErrors';
import checkAuthentication from '../middlewares/checkUserAuthorization';
import controllers from '../controllers/transaction.controller';

const router = Router();

router.post(
	'/create-transaction',
	checkAuthentication,
	...validations.createTransaction,
	controllers.handleCreatTransaction
);

router.post(
	'/find-transactions',
	checkAuthentication,
	...validations.filterAndSortTransactions,
	controllers.handleFilterAndSortTransactions
);

export default router;
