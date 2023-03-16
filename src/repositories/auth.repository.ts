import { CreateUser } from '../interfaces/auth.types';
import UserModel from '../models/user.model';

const findUser = async (userQuery: object) => {
	const user = await UserModel.findOne(userQuery);
	return user;
};

const addUser = async ({ userName, email, password }: CreateUser) => {
	const newUser = new UserModel({ userName, email, password });
	const createUser = await newUser.save();

	return createUser;
};

export { findUser, addUser };
