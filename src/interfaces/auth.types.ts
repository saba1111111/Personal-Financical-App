interface CreateUser {
	userName: string;
	email: string;
	password: string;
}

interface LoginUser {
	email: string;
	password: string;
}

export { CreateUser, LoginUser };
