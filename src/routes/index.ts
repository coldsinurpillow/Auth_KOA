import Router from 'koa-router';
import authController from '../controllers/AuthController';
import someController from '../controllers/SomeController';

import {checkAuthorization} from '../middlewares/redirect.middleware';

const router = new Router();

router.get('/', checkAuthorization, someController.MainPage);

router.get('/registration', authController.registrationPage);
router.post('/registration', authController.registration);
router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/protected', checkAuthorization, someController.protectedPage);

export default router;