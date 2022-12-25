import UserModel from '../models/user-model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import MailServiceController from './mail-sevice.js'
import tokenService from './token-sevice.js'
import UserDto from '../../dtos/user-dtos.js';
import Erorrs from '../errors/api_errors.js';

//import uuid from 'uuid'; es meku xndinera talis qani vor hnacela
import * as uuid from 'uuid';

class UserServiceController {

    async registration(name, email, password){
        const condidate = await UserModel.findOne({email});

        if(condidate){
            throw Erorrs.BadRequest(`this ${email} mail is exist`)
           // throw new Error(`this ${email} mail is exist`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink =  uuid.v4();
        let time = new Date();
        let elapsed = time.getTime()
        const user = await UserModel.create({
            name,
            email,
            password:hashPassword,
            registration_time:elapsed,
           // activation_time:'0',
            activationLink
        });
        await MailServiceController.sendActivationMail(
            email,
            `${process.env.API_URL}/api2/activate/${activationLink}`);
            console.log( `${process.env.API_URL}/api2/activate/${activationLink}`);
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...UserDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async activate(activationLink){
        console.log(activationLink);
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw Erorrs.BadRequest("wrong activate link")
           // throw new Error("wrong activate link");
        }
        let time = new Date();
        let elapsed = time.getTime()
        user.activation_time = elapsed;
        user.isActivated = true;
        await user.save();
    }
    async login (email, password){
        const user = await UserModel.findOne({email});
        if(!user){
            throw Erorrs.BadRequest("user not found")
        }
        const isPassEquals  = bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw Erorrs.BadRequest(`Введен неверный пароль`)
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...UserDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw Erorrs.UnauthorizedError()
        }

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDB) {
            throw Erorrs.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...UserDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
        // return token;
    }

    async getAllUsers (){
        const users = await UserModel.find();
        return users;
    }
}

export default new UserServiceController()