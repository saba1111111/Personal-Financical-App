const signUp = {
	tags: ['Auth'],
	description: 'Sign up on our website to get started!',
	summary: 'Sign up on our website to get started!',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						userName: {
							type: 'string',
							example: 'saba pachulia',
						},
						email: {
							type: 'string',
							example: 'sabapachulia123@gmail.com',
						},
						password: {
							type: 'string',
							example: 'safePassword',
						},
					},
				},
			},
		},
	},
	responses: {
		201: {
			description: 'Successfully created user!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						example: {
							email: 'sabapachulia123@gmail.com',
							userName: 'saba pachulia',
							id: 'dad3dadadfadada123',
						},
					},
				},
			},
		},
		409: {
			description: 'Already have User With This Email',
		},
		402: {
			description: 'invalid data, validation failed.',
		},
	},
};

const signIn = {
	tags: ['Auth'],
	description: 'Sign in on our website.',
	summary: 'Sign in on our website.',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						email: {
							type: 'string',
							example: 'sabapachulia11234ss5@gmail.com',
						},
						password: {
							type: 'string',
							example: 'dadadada',
						},
					},
				},
			},
		},
	},
	responses: {
		201: {
			description: 'User successfully logged in!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						example: {
							data: {
								token: 'dad3dadadfadada123dad3dadadfadada123',
								userId: 'dad3dadadfadada123',
							},
						},
					},
				},
			},
		},
		409: {
			description:
				'No such User With This Email: sabapachulia4111234ss5@gmail.com',
		},
		402: {
			description: 'invalid data, validation failed.',
		},
	},
};

const resetPasswordCheck = {
	tags: ['Auth'],
	description: 'Check user for reset password.',
	summary: 'Check user for reset password.',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						email: {
							type: 'string',
							example: 'sabapachulia11234ss5@gmail.com',
						},
					},
				},
			},
		},
	},
	responses: {
		200: {
			description:
				'The code has been successfully sent to your email and will expire in 5 minutes.',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						example: {
							message:
								'The code has been successfully sent to your email and will expire in 5 minutes.',
						},
					},
				},
			},
		},
		409: {
			description:
				'No such User With This Email: sabapachulia4111234ss5@gmail.com',
		},
		402: {
			description: 'invalid data, validation failed.',
		},
	},
};

const resetPassword = {
	tags: ['Auth'],
	description: 'reset password.',
	summary: 'reset password.',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						email: {
							type: 'string',
							example: 'sabapachulia123@gmail.com',
						},
						code: {
							type: 'string',
							example: '4403c75fs',
						},
						newPassword: {
							type: 'string',
							example: 'newPasswords',
						},
					},
				},
			},
		},
	},
	responses: {
		200: {
			description:
				'The code has been successfully sent to your email and will expire in 5 minutes.',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						example: {
							message: 'Password has been updated successfully.',
						},
					},
				},
			},
		},
		402: {
			description: 'invalid data, validation failed.',
		},
	},
};

const authRouteDoc = {
	'/auth/signUp': {
		post: signUp,
	},
	'/auth/signIn': {
		post: signIn,
	},
	'/auth/reset-password-check': {
		post: resetPasswordCheck,
	},
	'/auth/reset-password': {
		put: resetPassword,
	},
};

export default authRouteDoc;
