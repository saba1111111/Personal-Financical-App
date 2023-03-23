import { body } from 'express-validator';

const creatCategory = [
	body('name')
		.exists()
		.not()
		.equals('default')
		.withMessage('category name cannot be "default". ')
		.isString()
		.notEmpty()
		.withMessage('name is required and it must be a string.'),
	body('description', 'description is required and it must be a string.')
		.exists()
		.isString()
		.notEmpty(),
];

const updateNameAndDescription = [
	body('categoryId', 'categoryId is required.').exists().notEmpty(),
	body().custom((value, { req }) => {
		if (!req.body.name && !req.body.description) {
			throw new Error(
				'At least one of `name` or `description` is required.'
			);
		}
		return true;
	}),
	body('name')
		.if(body('name').exists())
		.notEmpty()
		.withMessage('Name cannot be empty.'),
	body('description')
		.if(body('description').exists())
		.notEmpty()
		.withMessage('Description cannot be empty.'),
];

const deleteCategory = [
	body('categoryId', 'categoryId is required.').exists().notEmpty(),
];

export default { creatCategory, updateNameAndDescription, deleteCategory };
