import { Store } from 'vuex';

declare module '@vue/runtime-core' {
    interface State {
        counter: number
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
