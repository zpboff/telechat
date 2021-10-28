<template>
    <div class="user-toolbar">
        <div class="user-info" @click="toggle">
            <span>{{ firstName }}</span>
            <user-avatar-icon :first-name="firstName" :last-name="lastName" />
            <div class="actions-handler" :class="{ 'actions-handler--active': isOpened }">
                <chevron-down width="24" height="24"></chevron-down>
            </div>
        </div>
        <div class="user-actions" v-if="isOpened">
            <header-link link="/logout" class="user-actions_link">
                Выход
            </header-link>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import UserAvatarIcon from "@/components/UserAvatarIcon";
import ChevronDown from "@/components/icons/ChevronDown";
import HeaderLink from "@/components/HeaderLink";

export default {
    name: "UserToolbar",
    components: { HeaderLink, ChevronDown, UserAvatarIcon },
    data() {
        return {
            isOpened: false
        };
    },
    created() {
        // document.addEventListener('click', event => {
        //
        // });
    },
    methods: {
        toggle() {
            this.isOpened = !this.isOpened;
        }
    },
    computed: mapState({
        firstName(state) {
            return state.auth.firstName;
        },
        lastName(state) {
            return state.auth.lastName;
        }
    })
};
</script>

<style scoped>

</style>