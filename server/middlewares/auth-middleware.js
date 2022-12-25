import Erorrs from "../errors/api_errors.js";

export default function (err, req, res, next){
    try {

        const authorizationHeader = req.headers.authorization;

        if(!authorizationHeader){
            return next(Erorrs.UnauthorizedError)
        }
        const accessToken

    }catch (e) {
      return next(Erorrs.UnauthorizedError)
    }
}