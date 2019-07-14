import UserStore from "./userStore";

export default class RootStore {
    constructor() {
        this.user = new UserStore(this);
    }
}
