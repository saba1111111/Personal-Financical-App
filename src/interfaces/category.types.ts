/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Category {
	interface CreateCategory {
		name: string;
		description: string;
		user: string;
	}

	interface UpdateCategory {
		name?: string;
		description?: string;
		user: string;
		categoryId: string;
	}

	interface DeleteCategory {
		categoryId: string;
		user: string;
	}
}
