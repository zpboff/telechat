import AuthStore from "./authStore";

export default class RootStore {
    constructor() {
        this.user = new AuthStore(this);
    }
}
