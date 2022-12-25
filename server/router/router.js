import Router from 'express';
import UserController from '../controllers/UserController.js';
import { body } from 'express-validator';

const router = new Router();

router.post('/login2', UserController.login);
router.post('/registration2',
body('email').isEmail(),
body('password').isLength({min:3, max:32}),
UserController.registration);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', UserController.getUsers);

export default router;