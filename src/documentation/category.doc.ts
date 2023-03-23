const createCategory = {
	tags: ['Category'],
	description: 'create category.',
	summary: 'create category.',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
							example: 'education',
						},
						description: {
							type: 'string',
							example:
								'here will be all the transactions about education.',
						},
					},
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Successfully created category!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						example: {
							data: {
								name: 'education',
								description:
									'here will be all the transactions about education.',
							},
						},
					},
				},
			},
		},
		402: {
			description: 'invalid data, validation failed.',
		},
		409: {
			description: 'This category already exist.',
		},
	},
};

const updateCategory = {
	tags: ['Category'],
	description: 'update category.',
	summary: 'update category.',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
							example: 'education',
						},
						description: {
							type: 'string',
							example:
								'here will be all the transactions about education.',
						},
						categoryId: {
							type: 'string',
							example: '641b8216889d99ef0e628bab',
						},
					},
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Successfully update!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						example: {
							data: {
								name: 'education',
								description:
									'here will be all the transactions about education.',
								id: 'dadadad131addad',
							},
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

const deleteCategory = {
	tags: ['Category'],
	description: 'delete category.',
	summary: 'delete category.',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						categoryId: {
							type: 'string',
							example: '641b8216889d99ef0e628bab',
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
							message: 'Successfully delete!',
						},
					},
				},
			},
		},
		402: {
			description: 'invalid data, validation failed.',
		},
		409: {
			description: 'No such category.',
		},
	},
};

const categoryRouteDoc = {
	'/category/create-category': {
		post: createCategory,
	},
	'/category/update-category': {
		put: updateCategory,
	},
	'/category/delete-category': {
		delete: deleteCategory,
	},
};

export default categoryRouteDoc;
