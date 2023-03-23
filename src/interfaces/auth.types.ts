/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Auth {
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
}
