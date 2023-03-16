import { Router } from 'express';
import { handleSignUp, handleSignIn } from '../controllers/auth.controller';
import {
	checkSignUpValidation,
	checkSignInValidation,
} from '../middlewares/catchAndHandleErrors';

const router = Router();

router.post('/signUp', ...checkSignUpValidation, handleSignUp);
router.post('/signIn', ...checkSignInValidation, handleSignIn);

export default router;
