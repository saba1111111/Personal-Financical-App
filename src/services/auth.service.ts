import { throwError } from '../utils/customThrowErrorFunc';
import { addUser, findUser } from '../repositories/auth.repository';
import { hash, compare } from 'bcryptjs';
import envVars from '../config';
import jsonwebtoken from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { sendEmail } from '../helper/sendEmail';
import { addCategory } from '../repositories/category.repository';

const createUser = async (user: Auth.CreateUser) => {
	const { userName, email, password } = user;

	const checkUser = await findUser({ email });
	if (checkUser)
		throwError(`Already have User With This Email: ${email}`, 409);

	const hashPssword = await hash(password, 12);
	const createNewUser = await addUser({
		userName,
		email,
		password: hashPssword,
	});

	await addCategory({
		name: 'default',
		description: 'Here are all the Uncategorized transactions.',
		user: createNewUser._id.toString(),
	});

	return {
		email: createNewUser.email,
		userName: createNewUser.userName,
		id: createNewUser._id.toString(),
	};
};

const loginUser = async (loginUser: Auth.LoginUser) => {
	const { email, password } = loginUser;

	const user = await findUser({ email });
	if (!user) return throwError(`No such User With This Email: ${email}`, 409);

	const PasswordsMatchedStatus = await compare(password, user.password);
	if (!PasswordsMatchedStatus) throwError(`Wrong password.`, 401);

	const JWT_SECRET_TOKEN = envVars.JWT_SECRET_TOKEN as string;
	const jwtToken = jsonwebtoken.sign(
		{ userId: user._id.toString() },
		JWT_SECRET_TOKEN,
		{ expiresIn: '1h' }
	);

	return { token: jwtToken, userId: user._id.toString() };
};

const PasswordResetCheck = async (email: string) => {
	const user = await findUser({ email });
	if (!user) return throwError(`No such User With This Email: ${email}`, 409);

	const code = randomBytes(4).toString('hex');
	user.resetCode = code;
	user.resetCodeExpiration = Date.now() + 300000;
	await user.save();

	const subject = 'Hello from Finance app, Reset pasword. :)';
	const text = `Code - ${code}`;

	await sendEmail({ email, subject, text }).catch((error) => {
		return throwError(error.message, 500);
	});
};

const RessetPassword = async (props: Auth.ResetPasswordTypes) => {
	const { code, email, newPassword } = props;

	const user = await findUser({
		email,
		resetCode: code,
		resetCodeExpiration: { $gt: Date.now() },
	});
	if (!user)
		return throwError(
			`Invalid data. Password not updated. Please try again.`,
			409
		);

	const hashNewPassowrd = await hash(newPassword, 12);
	user.password = hashNewPassowrd;
	user.resetCode = undefined;
	user.resetCodeExpiration = undefined;

	await user.save();
};

export default { createUser, loginUser, PasswordResetCheck, RessetPassword };
