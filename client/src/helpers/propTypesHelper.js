import UserStore from "../stores/userStore";

export function user(props, propName, componentName) {
    if (props[propName]) {
        let value = props[propName];
        if (typeof value === typeof UserStore) {
            return null;
        }
        return new Error(`Type of ${propName} isn't UserStore`)
    }

    return null;
}
