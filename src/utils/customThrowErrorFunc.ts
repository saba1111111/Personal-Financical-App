export interface MyError extends Error {
	code?: number;
	status?: string;
}

export const throwError = (message: string, statusCode: number) => {
	const error: MyError = new Error(message);
	error['code'] = statusCode;

	throw error;
};
