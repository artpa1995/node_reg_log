// DTO data transfer object
export default class UserDto {
    email;
    id;
    isActivated;
    name;
    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.name = model.name;


    }
}