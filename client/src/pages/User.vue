<template>
    <not-found v-if="notFound"></not-found>
    <layout-with-sidebar v-else>
        <base-loader v-if="isLoaded"></base-loader>
        <div v-else>
            {{ this.userInfo }}
            <div v-if="canAccept">
                <primary-button @click="subscribe">Принять запрос</primary-button>
            </div>
            <div v-if="canSubscribe">
                <primary-button @click="subscribe">Подписаться</primary-button>
            </div>
            <div v-if="canCancelSubscribe">
                <primary-button @click="subscribe">Отписаться</primary-button>
            </div>
            <div v-if="canBlock">
                <primary-button @click="subscribe">Заблокировать</primary-button>
            </div>
            <div v-if="canUnblock">
                <primary-button @click="subscribe">Разблокировать</primary-button>
            </div>
        </div>
    </layout-with-sidebar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LayoutWithSidebar from "@/components/LayoutWithSidebar.vue";
import BaseLoader from "@/components/BaseLoader.vue";
import NotFound from "@/pages/NotFound.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { getUserInfo, UsersRelationsState, UserViewModel } from "@/modules/user/getUserInfo";
import { subscribe } from "@/modules/user/relations";

type ComponentBindings = {
    userInfo: UserViewModel;
    isLoaded: boolean;
    userLogin: string;
}

export default defineComponent<unknown, ComponentBindings>({
    name: "User",
    components: { PrimaryButton, NotFound, BaseLoader, LayoutWithSidebar },
    async created() {
        const user = await getUserInfo(this.userLogin);
        this.userInfo = user;
        this.isLoaded = false;
    },
    data() {
        return {
            isLoaded: true,
            userInfo: null
        };
    },
    methods: {
        async subscribe() {
            await subscribe(this.userLogin);
        }
    },
    computed: {
        userLogin(): string {
            return this.$route.params.login as string;
        },
        notFound(): boolean {
            return !this.isLoaded && !this.userInfo;
        },
        canSubscribe(): boolean {
            return this.userInfo?.relationState == null || this?.userInfo.relationState === UsersRelationsState.Canceled;
        },
        canCancelSubscribe(): boolean {
            return this.userInfo?.relationState === UsersRelationsState.Subscribed && !this.userInfo?.isSubscriber;
        },
        canBlock(): boolean {
            return this.userInfo?.relationState !== UsersRelationsState.Blocked;
        },
        canUnblock(): boolean {
            return this.userInfo?.relationState === UsersRelationsState.Blocked;
        },
        canAccept(): boolean {
            return this.userInfo?.isSubscriber;
        }
    }
});
</script>