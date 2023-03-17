import { throwError } from '../utils/customThrowErrorFunc';
import { addUser, findUser } from '../repositories/auth.repository';
import { hash, compare } from 'bcryptjs';
import envVars from '../config';
import jsonwebtoken from 'jsonwebtoken';
import {
	CreateUser,
	LoginUser,
	ResetPasswordTypes,
} from '../interfaces/auth.types';
import { randomBytes } from 'crypto';
import { sendEmail } from '../utils/sendEmail';

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

export const PasswordResetEmailCheck = async (email: string) => {
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

export const RessetPassword = async (props: ResetPasswordTypes) => {
	const { code, email, newPassword } = props;

	const user = await findUser({
		email,
		resetCode: code,
		resetCodeExpiration: { $gt: Date.now() },
	});
	if (!user)
		return throwError(
			`Password update unsuccessful. Please try again.`,
			409
		);

	const hashNewPassowrd = await hash(newPassword, 12);
	user.password = hashNewPassowrd;
	user.resetCode = undefined;
	user.resetCodeExpiration = undefined;

	await user.save();
};
