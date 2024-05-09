import {Router} from 'express';
import {validate} from 'express-validation';
import { signUpuserSchema,logInuserSchema, updateProfileSchema } from './user.validation';
import {editProfile, getProfile, login,signUp} from './user.controller';
import isAuth from "../middleware/isAuth";
import gatewayAuthMiddleware from '../middleware/gatewayAuth';
import sourceAuthenticationMiddleware from '../middleware/source-authentication';



const router = Router();

router.get('/profile',gatewayAuthMiddleware,getProfile);
router.patch('/profile',validate(updateProfileSchema),gatewayAuthMiddleware,editProfile);
router.get('/verify-token',isAuth,getProfile);

router.use(sourceAuthenticationMiddleware);
router.post('/signup',validate(signUpuserSchema) ,signUp);
router.post('/login', validate(logInuserSchema),login);

export default router;