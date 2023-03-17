import { config } from 'dotenv';
import * as Yup from 'yup';

config();

const envVars = process.env;

const envVarsSchema = Yup.object({
	MONGODB_CONNECT_URL: Yup.string().required(
		'MONGODB_CONNECT_URL is required in .env file!'
	),
	JWT_SECRET_TOKEN: Yup.string().required(
		'JWT_SECRET_TOKEN is required in .env file!'
	),
	EMAIL: Yup.string().required('EMAIL is required in .env file!'),
	EMAIL_PASSWORD: Yup.string().required(
		'EMAIL_PASSWORD is required in .env file!'
	),
});

envVarsSchema.validate(process.env).catch((error) => {
	throw new Error(`Config validation error: ${error.message}`);
});

export default envVars;
