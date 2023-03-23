# Finance App

Finance app is designed to help users manage their finances with ease. With our app, users can easily create custom categories to track their spending and income. Adding transactions to each category is simple and straightforward, so users can easily stay on top of their finances.In addition to adding transactions, our app also provides users with a searchable transaction history. Users can quickly find and view past transactions to gain insight into their spending patterns and identify areas where they can save money.With our finance app, users can take control of their finances and make informed decisions about their money. Whether they're looking to save for a big purchase or simply want to better manage their day-to-day expenses, our app is the perfect tool for anyone looking to improve their financial well-being.

To run a project, simply clone or download it and run this commands:

```bash
npm install
tsc --w
npm start
```

## Table of Contents

-   [Features](#features)
-   [Environment Variables](#environment-variables)
-   [Project Structure](#project-structure)
-   [API Documentation](#api-documentation)
-   [Error Handling](#error-handling)
-   [Validation](#validation)
-   [Authentication](#authentication)
-   [Linting](#linting)

## Features

-   **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
-   **Authentication and authorization**: using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
-   **Validation**: request data validation using [express-validator](https://express-validator.github.io/docs)
-   **API documentation**: with [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
-   **Dependency management**: with [npm](https://www.npmjs.com/)
-   **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
-   **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
-   **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=4000

# URL of the Mongo DB
MONGODB_CONNECT_URL=mongodb://127.0.0.1:27017/finance-app-wrong-url

# JWT
# JWT secret key
JWT_SECRET_TOKEN=thisisasamplesecret

#  configuration options for the email service
EMAIL=financeapptestmail@gmail.com
EMAIL_PASSWORD=tfxdxuihqdgfejxd
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--documentation\  # Swagger files
 |--helper\         # helper functions
 |--interfaces\     # all types and interfaces
 |--middlewares\    # Custom middlewares
 |--models\         # Mongoose models (data layer)
 |--repositories\   # comunicate with database
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:4000/documentation` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /auth/signUp` - register\
`POST /auth/signIn` - login\
`POST /auth/reset-password-check` - send reset password email\
`PUT /auth/reset-password` - reset password\

**Category routes**:\
`POST /category/create-category` - create a category\
`PUT /category/update-category` - update category\
`DELETE /category/delete-category` - delete category\

**Transaction routes**:\
`POST /transaction/create-transaction` - create a transaction\
`POST /transaction/find-transactions` - find/filter/sort transactions\

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`).

```javascript
export interface MyError extends Error {
	code?: number;
	status?: string;
}

export const throwError = (message: string, statusCode: number) => {
	const error: MyError = new Error(message);
	error['code'] = statusCode;

	throw error;
};
```

error handling middleware

```javascript
app.use((error: MyError, req: Request, res: Response, next: NextFunction) => {
	const code = error.code || 500;
	res.status(code).json({ error: error.message });
});
```

## Validation

Request data is validated using [express-validator](https://www.npmjs.com/package/express-validator). Check the [documentation](https://express-validator.github.io/docs) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory.

```javascript
import { Router } from 'express';
import controllers from '../controllers/auth.controller';
import validations from '../middlewares/catchAndHandleErrors';

const router = Router();

router.post('/signUp', ...validations.SignUp, controllers.handleSignUp);
```

## Authentication

To require authentication for certain routes, you can use the `checkAuthentication` middleware.

```javascript
import { Router } from 'express';
import validations from '../middlewares/catchAndHandleErrors';
import controllers from '../controllers/category.controller';
import checkAuthentication from '../middlewares/checkUserAuthorization';

const router = Router();

router.post(
	'/create-category',
	checkAuthentication,
	...validations.creatCategory,
	controllers.handleCreatCategory
);
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the login (`POST /auth/signIn`) endpoints. .

An access token is valid for 60 minutes.

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.
