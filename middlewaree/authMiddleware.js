// const jwt = require('jsonwebtoken')
// const {secret} = require('../config')

import jwt from 'jsonwebtoken';
//import secret_key from '../config.js';

import 'dotenv/config'
const secret_key = process.env.secret_key

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        const decodedData = jwt.verify(token, secret_key)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
};
