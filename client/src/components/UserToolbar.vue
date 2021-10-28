<template>
    <div class="user-toolbar" @click="toggle">
        <span>{{ firstName }}</span>
        <user-avatar-icon :first-name="firstName" :last-name="lastName" />
        <div class="actions-handler" :class="{'actions-handler--active': isOpened}">
            <chevron-down width="24" height="24"></chevron-down>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import UserAvatarIcon from "@/components/UserAvatarIcon";
import ChevronDown from "@/components/icons/ChevronDown";

export default {
    name: "UserToolbar",
    components: { ChevronDown, UserAvatarIcon },
    data() {
        return {
            isOpened: false
        };
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