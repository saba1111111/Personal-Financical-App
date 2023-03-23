import UserModel from '../models/user.model';

const findUser = async (userQuery: object) => {
	const user = await UserModel.findOne(userQuery).catch(() => {
		return null;
	});

	return user;
};

const addUser = async ({ userName, email, password }: Auth.CreateUser) => {
	const newUser = new UserModel({ userName, email, password });
	const createUser = await newUser.save();

	return createUser;
};

export { findUser, addUser };
