import { createStore } from "vuex";

export default createStore({
    state: {
        counter: 0
    },
    getters: {
        counter: (state) => state.counter
    },
    mutations: {
        inc(state) {
            state.counter += 1;
        }
    }
});
