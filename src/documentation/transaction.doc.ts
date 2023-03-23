const createTransaction = {
	tags: ['Transaction'],
	description: 'create transaction.',
	summary: 'create transaction.',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						category: {
							type: 'string',
							example: '641946a84642c0e50701028e',
						},
						amount: {
							type: 'number',
							example: 111,
						},
						type: {
							type: 'string',
							example: 'income',
						},
						description: {
							type: 'string',
							example: 'salary from my second job.',
						},
					},
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Successfully delete!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						example: {
							description: 'salary from my second job.',
							amount: 111,
							type: 'income',
							category: '641946a84642c0e50701028e',
							user: '641aaf880242e9f3b0037c41',
							_id: '641c8ce04853e9f6fb1a55ed',
						},
					},
				},
			},
		},
		402: {
			description: 'invalid data, validation failed.',
		},
	},
};

const findTransactions = {
	tags: ['Transaction'],
	description:
		'filter or/and sort transaction.You can find,filter and sort transactions very easy.',
	summary: 'filter or/and sort transaction.',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						categories: {
							type: 'array',
							example: [
								'64189d6a32a34d6b408f0e80',
								'641946a84642c0e50701028e',
							],
						},
						amount: {
							type: 'object',
							example: { maxAmount: 5400, minAmount: 1 },
						},
						type: {
							type: 'string',
							example: 'expense',
						},
						status: {
							type: 'string',
							example: 'processing',
						},
						date: {
							type: 'object',
							example: {
								maxDate: '2023-11-11',
								minDate: '2023-03-11',
							},
						},
						sort: {
							type: 'object',
							example: { amount: 'desc', date: 'asc' },
						},
					},
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Successfully delete!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						example: {
							data: [
								{
									_id: '641b6bba63de261578a17700',
									description: 'desss',
									amount: 1220,
									type: 'expense',
									status: 'processing',
									category: '641946a84642c0e50701028e',
									user: '641aaf880242e9f3b0037c41',
								},
							],
						},
					},
				},
			},
		},
		402: {
			description: 'invalid data, validation failed.',
		},
	},
};

const transactionRouteDoc = {
	'/transaction/create-transaction': {
		post: createTransaction,
	},
	'/transaction/find-transactions': {
		get: findTransactions,
	},
};

export default transactionRouteDoc;
