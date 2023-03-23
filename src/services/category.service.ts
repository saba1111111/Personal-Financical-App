import {
	findCategory,
	addCategory,
	removeCategory,
} from '../repositories/category.repository';
import { throwError } from '../utils/customThrowErrorFunc';
import { updateTransactionCategory } from '../repositories/transaction.repository';

const createCategory = async (category: Category.CreateCategory) => {
	const { name, description, user } = category;

	const checkCategory = await findCategory({ name, description, user });
	if (checkCategory) throwError(`This category already exist.`, 409);

	const createNewCategory = await addCategory({
		name,
		description,
		user,
	});

	return {
		name: createNewCategory.name,
		description: createNewCategory.description,
		id: createNewCategory._id.toString(),
	};
};

const UpdateNameAndDescription = async (Category: Category.UpdateCategory) => {
	const { name, description, user, categoryId } = Category;

	const category = await findCategory({ _id: categoryId });
	if (!category) return throwError(`No such category.`, 409);

	if (category.user.toString() !== user)
		return throwError(
			`User can only update categories that belong to him. .`,
			409
		);

	if (name) category.name = name;
	if (description) category.description = description;

	const updateCategory = await category.save();
	return {
		name: updateCategory.name,
		description: updateCategory.description,
		id: updateCategory._id.toString(),
	};
};

const deleteCategory = async (category: Category.DeleteCategory) => {
	const { categoryId, user } = category;

	const Category = await findCategory({ _id: categoryId });
	if (!Category) throwError(`No such category.`, 409);
	if (Category?.name === 'default')
		throwError(`Can not delete default category.`, 409);

	const defaultCategory = await findCategory({ name: 'default', user });
	if (!defaultCategory)
		return throwError(`Can not find defaultCategory.`, 409);

	await updateTransactionCategory({
		category: categoryId,
		defaultCategory: defaultCategory._id.toString(),
	});

	await removeCategory(categoryId);
};

export default { createCategory, UpdateNameAndDescription, deleteCategory };
