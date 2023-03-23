import authRouteDoc from './auth.doc';
import categoryRouteDoc from './category.doc';
import transactionRouteDoc from './transaction.doc';
import envVars from '../config';

const swaggerDocumentation = {
	openapi: '3.0.3',
	info: {
		title: 'Swagger Finance App',
		version: '4.6.2',
		description:
			"Our finance app is designed to help users manage their finances with ease. With our app, users can easily create custom categories to track their spending and income. Adding transactions to each category is simple and straightforward, so users can easily stay on top of their finances.In addition to adding transactions, our app also provides users with a searchable transaction history. Users can quickly find and view past transactions to gain insight into their spending patterns and identify areas where they can save money.With our finance app, users can take control of their finances and make informed decisions about their money. Whether they're looking to save for a big purchase or simply want to better manage their day-to-day expenses, our app is the perfect tool for anyone looking to improve their financial well-being.",
	},
	servers: [
		{
			url: `http://localhost:${envVars.PORT}`,
			description: 'Local dev',
		},
	],
	tags: [
		{
			name: 'Auth',
			description: 'Authorization routes.',
		},
		{
			name: 'Category',
			description: 'Finance categories routes.',
		},
		{
			name: 'Transaction',
			description: 'Transactions routes.',
		},
	],
	paths: {
		...authRouteDoc,
		...categoryRouteDoc,
		...transactionRouteDoc,
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				in: 'header',
				name: 'Authorization',
				description: 'Bearer token to access these api endpoints',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
	},
	security: [
		{
			bearerAuth: [],
		},
	],
};

export default swaggerDocumentation;
