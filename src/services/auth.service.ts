import { throwError } from '../utils/customThrowErrorFunc';
import { addUser, findUser } from '../repositories/auth.repository';
import { hash, compare } from 'bcryptjs';
import envVars from '../config';
import jsonwebtoken from 'jsonwebtoken';
import { CreateUser, LoginUser } from '../interfaces/auth.types';

export const createUser = async ({ userName, email, password }: CreateUser) => {
	const user = await findUser({ email });
	if (user) throwError(`Already have User With This Email: ${email}`, 409);

	const hashPssword = await hash(password, 12);
	const createNewUser = await addUser({
		userName,
		email,
		password: hashPssword,
	});

	return createNewUser;
};

export const loginUser = async ({ email, password }: LoginUser) => {
	const user = await findUser({ email });
	if (!user) return throwError(`No such User With This Email: ${email}`, 409);

	const PasswordsMatchedStatus = await compare(password, user.password);
	if (!PasswordsMatchedStatus) throwError(`Wrong password.`, 401);

	const JWT_SECRET_TOKEN = envVars.JWT_SECRET_TOKEN as string;
	const jwtToken = jsonwebtoken.sign(
		{ email, id: user._id.toString() },
		JWT_SECRET_TOKEN,
		{ expiresIn: '1h' }
	);

	return { token: jwtToken, userId: user._id.toString() };
};
