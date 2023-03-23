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
router.put(
	'/update-category',
	checkAuthentication,
	...validations.updateCategory,
	controllers.handleUpdateNameAndDescription
);
router.delete(
	'/delete-category',
	checkAuthentication,
	...validations.deleteCategory,
	controllers.handleDeleteCategory
);

export default router;
