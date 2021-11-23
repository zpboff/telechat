<template>
    <div v-if="canAccept">
        <primary-button @click="accept">Принять запрос</primary-button>
        <primary-button @click="cancel">Отклонить запрос</primary-button>
    </div>
    <div v-if="canSubscribe">
        <primary-button @click="subscribe">Подписаться</primary-button>
    </div>
    <div v-if="canCancelSubscribe">
        <primary-button @click="cancel">Отписаться</primary-button>
    </div>
    <div v-if="canBlock">
        <primary-button @click="block">Заблокировать</primary-button>
    </div>
    <div v-if="canUnblock">
        <primary-button @click="cancel">Разблокировать</primary-button>
    </div>
    <div v-if="canUnblock">
        <primary-button @click="cancel">Разблокировать</primary-button>
    </div>
    <div v-if="canRemoveFromFriends">
        <primary-button @click="cancel">Удалить из друзей</primary-button>
    </div>
</template>

<script lang="ts">
import PrimaryButton from "@/components/PrimaryButton.vue";
import {
    accept,
    block,
    cancel,
    removeFromFriends,
    subscribe,
    UsersRelationsState,
    UserViewModel
} from "../modules/user";
import { defineComponent } from "vue";

type ComponentBindings = {
    isLoaded: boolean;
    userLogin: string;
};

type Props = {
    userInfo: UserViewModel;
};

export default defineComponent<Props, ComponentBindings>({
    name: "RelationActions",
    components: { PrimaryButton },
    computed: {
        canBlock(): boolean {
            return this.userInfo?.relationState !== UsersRelationsState.Blocked;
        },
        canUnblock(): boolean {
            return this.userInfo?.relationState === UsersRelationsState.Blocked;
        },
        canAccept(): boolean {
            return this.userInfo?.isSubscriber;
        },
        canRemoveFromFriends(): boolean {
            return this.userInfo?.relationState === UsersRelationsState.Friend;
        },
        canSubscribe(): boolean {
            return this.userInfo?.relationState == null || this?.userInfo.relationState === UsersRelationsState.Initial;
        },
        canCancelSubscribe(): boolean {
            return this.userInfo?.relationState === UsersRelationsState.Subscribed && !this.userInfo?.isSubscriber;
        },
    },
    methods: {
        async subscribe() {
            await subscribe(this.userLogin);
        },
        async accept() {
            await accept(this.userLogin);
        },
        async block() {
            await block(this.userLogin);
        },
        async cancel() {
            await cancel(this.userLogin);
        },
        async removeFromFriends() {
            await removeFromFriends(this.userLogin);
        }
    },
});
</script>

<style scoped>

</style>