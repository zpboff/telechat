import { Store } from 'vuex'
import rootStore from "@/store";

type RootState = typeof rootStore.state;

declare module '@vue/runtime-core' {
    type State = RootState;

    interface ComponentCustomProperties {
        $store: Store<State>
    }
}