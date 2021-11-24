<template>
    <base-popover class="user-toolbar" switch-class="user-info" content-class="user-actions">
        <template v-slot:switch>
            <span>{{ firstName }}</span>
            <user-avatar-icon :avatar="avatar" :first-name="firstName" :last-name="lastName" />
            <div class="actions-handler">
                <chevron-down width="24" height="24"></chevron-down>
            </div>
        </template>
        <template v-slot:content>
            <header-link link="/settings" class="user-actions_link">
                Настройки
            </header-link>
            <header-link link="/logout" class="user-actions_link">
                Выход
            </header-link>
        </template>
    </base-popover>
</template>

<script>
import { mapState } from "vuex";
import UserAvatarIcon from "@/components/UserAvatarIcon";
import ChevronDown from "@/components/icons/ChevronDown";
import HeaderLink from "@/components/HeaderLink";
import BasePopover from "@/components/BasePopover";

export default {
    name: "UserToolbar",
    components: { BasePopover, HeaderLink, ChevronDown, UserAvatarIcon },
    computed: mapState({
        firstName(state) {
            return state.auth.firstName;
        },
        lastName(state) {
            return state.auth.lastName;
        },
        avatar(state) {
            return state.auth.avatar;
        }
    })
};
</script>

<style scoped>

</style>