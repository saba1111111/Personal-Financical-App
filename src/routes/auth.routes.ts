import { Router } from 'express';
import controllers from '../controllers/auth.controller';
import validations from '../middlewares/catchAndHandleErrors';

const router = Router();

router.post('/signUp', ...validations.SignUp, controllers.handleSignUp);
router.post('/signIn', ...validations.SignIn, controllers.handleSignIn);
router.post(
	'/reset-password-check',
	...validations.PasswordResetCheck,
	controllers.handlePasswordResetCheck
);
router.put(
	'/reset-password',
	...validations.PasswordReset,
	controllers.handlePasswordReset
);

export default router;
