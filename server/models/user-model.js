import pkg from 'mongoose';
const {Schema, model} = pkg;

const UserSchema = Schema({
    name:{type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    registration_time: {type: String },
    activation_time: {type: String },
    activationLink: {type: String}
})
export default model('User2', UserSchema) ;