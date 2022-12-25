import Router from 'express';
import authController from './authController.js';
import {check} from 'express-validator';
import authMiddleware from './middlewaree/authMiddleware.js';
import roleMiddleware from './middlewaree/roleMiddleware.js';

import cors from 'cors';
import cookieParser from 'cookie-parser';
console.log(cors);

const router = new Router();

router.post('/registration', 
[
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
],
 authController.registration)
router.post('/login', authController.login)
router.get('/users', roleMiddleware(["ADMIN"]), authController.getUsers)

export default router