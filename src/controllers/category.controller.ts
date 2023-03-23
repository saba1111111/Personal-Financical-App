import services from '../services/category.service';
import { RequestHandler } from 'express';
import { AuthenticatedRequest } from '../middlewares/checkUserAuthorization';

const handleCreatCategory: RequestHandler = async (req, res, next) => {
	const { name, description } = req.body;
	const user = (req as AuthenticatedRequest).user.userId;

	try {
		const newCategory = await services.createCategory({
			name,
			description,
			user,
		});

		res.status(201).json({
			message: 'Successfully created category!',
			data: newCategory,
		});
	} catch (error) {
		next(error);
	}
};

const handleUpdateNameAndDescription: RequestHandler = async (
	req,
	res,
	next
) => {
	const { name, description, categoryId } = req.body;
	const user = (req as AuthenticatedRequest).user.userId;

	try {
		const updateCategory = await services.UpdateNameAndDescription({
			categoryId,
			name,
			description,
			user,
		});

		res.status(200).json({
			message: 'Successfully update!',
			data: updateCategory,
		});
	} catch (error) {
		next(error);
	}
};

const handleDeleteCategory: RequestHandler = async (req, res, next) => {
	const { categoryId } = req.body;
	const user = (req as AuthenticatedRequest).user.userId;

	try {
		await services.deleteCategory({
			categoryId,
			user,
		});

		res.status(200).json({
			message: 'Successfully delete!',
		});
	} catch (error) {
		next(error);
	}
};

export default {
	handleCreatCategory,
	handleUpdateNameAndDescription,
	handleDeleteCategory,
};
