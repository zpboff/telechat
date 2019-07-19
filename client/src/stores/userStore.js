import {
    observable,
    configure,
    action,
    computed
} from "mobx";

configure({ enforceActions: "always" });

class UserStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable token = "";
    @observable socketId = "";
    @observable firstName = "";
    @observable lastName = "";
    @observable initials = "";
    @observable avatar = "";
    @observable birthDate = new Date();

    @computed get isAuthenticated() {
        return !!this.token;
    }

    @action signin(user) {
        this.token = user.token;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.initials = user.initials;
        this.avatar = user.avatar;
        sessionStorage.token = user.token;
    }
}

export default UserStore;
