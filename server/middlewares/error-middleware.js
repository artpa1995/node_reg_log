import Erorrs from "../errors/api_errors.js";

export default function (err, req, res, next){
    console.log(err);
    if(err instanceof Erorrs){
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }
    return res.status(500).json({message : "anhayt error"})
}