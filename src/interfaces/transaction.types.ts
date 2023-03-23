/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Transaction {
	interface CreateTransaction {
		amount: number;
		description: string;
		type: 'income' | 'expense';
		status?: 'processing' | 'completed';
		category?: string;
		user: string;
	}

	interface filterLogic {
		categories?: string[];
		type?: 'income' | 'expense';
		status?: 'processing' | 'completed';
		amount?: { minAmount?: number; maxAmount?: number };
		date?: { maxDate?: string; minDate?: string };
		user: string;
	}

	interface sortLogic {
		sort?: { amount?: 'desc' | 'asc'; date?: 'desc' | 'asc' };
	}

	type filterAndSortLogic = filterLogic & sortLogic;

	interface mongooseFilterLogic {
		category?: { $in: string[] };
		type?: 'income' | 'expense';
		status?: 'processing' | 'completed';
		$and?: object[];
		user: string;
	}

	interface mongooseSortLogic {
		sort?: { amount?: 'desc' | 'asc'; createdAt?: 'desc' | 'asc' };
	}
}
