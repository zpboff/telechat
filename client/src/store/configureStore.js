import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";


export default (initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    );

    return store;
};
