import AuthStore from "../stores/authStore";

export function userType(props, propName, componentName) {
    if (props[propName]) {
        let value = props[propName];
        if (typeof value === typeof AuthStore) {
            return null;
        }
        return new Error(`Type of ${propName} isn't UserStore`)
    }

    return null;
}
