export default class Erorrs extends Error {

    status;
    errors;

    constructor(status, message, errors= []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(){
        return new Erorrs(401, "PNA")
    }

    static BadRequest (message, errors = []){
        return new Erorrs(400, message, errors)
    }
}