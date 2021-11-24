<template v-if="this.userInfo">
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
    RelationsState,
    UserDetailCard
} from "../modules/user";
import { defineComponent, PropType } from "vue";

export default defineComponent({
    name: "RelationActions",
    components: { PrimaryButton },
    props: {
        userInfo: {
            type: Object as PropType<UserDetailCard>
        }
    },
    computed: {
        canBlock(): boolean {
            return this.userInfo?.relationState !== RelationsState.Blocked;
        },
        canUnblock(): boolean {
            return this.userInfo?.relationState === RelationsState.Blocked;
        },
        canAccept(): boolean {
            return this.userInfo?.isSubscriber ?? false;
        },
        canRemoveFromFriends(): boolean {
            return this.userInfo?.relationState === RelationsState.Friend;
        },
        canSubscribe(): boolean {
            return this.userInfo?.relationState == null || this?.userInfo.relationState === RelationsState.Initial;
        },
        canCancelSubscribe(): boolean {
            return this.userInfo?.relationState === RelationsState.Subscribed && !this.userInfo?.isSubscriber;
        },
        userLogin(): string {
            return this.$route.params.login as string;
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
        },
    }
});
</script>

<style scoped>

</style>