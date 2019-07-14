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

    @action login() {
        console.log("TODO Login");
    }
}

export default UserStore;
