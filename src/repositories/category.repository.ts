import CategoryModel from '../models/category.model';

const findCategory = async (userQuery: object) => {
	const category = await CategoryModel.findOne(userQuery).catch(() => {
		return null;
	});

	return category;
};

const addCategory = async (category: Category.CreateCategory) => {
	const { name, description, user } = category;

	const newCategory = new CategoryModel({ name, description, user });
	const createCategory = await newCategory.save();

	return createCategory;
};

const removeCategory = async (categoryId: string) => {
	const category = await CategoryModel.deleteOne({ _id: categoryId });

	return category;
};

export { findCategory, addCategory, removeCategory };
