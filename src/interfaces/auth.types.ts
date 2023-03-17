interface CreateUser {
	userName: string;
	email: string;
	password: string;
}

interface LoginUser {
	email: string;
	password: string;
}

interface ResetPasswordTypes {
	email: string;
	code: string;
	newPassword: string;
}

export { CreateUser, LoginUser, ResetPasswordTypes };
