import ConnectionStrings from "../constants/conStrings";
let socket = require("socket.io-client")(ConnectionStrings.ChatApiUrl);

const initialState = {
    socket,
    errors: {}
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default chatReducer;
