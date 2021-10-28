<template>
    <div class="header">
        <the-logo></the-logo>
        <div class="main-area"></div>
        <user-toolbar v-if="isAuthenticated"></user-toolbar>
        <div class="auth-links" v-else>
            <login-link></login-link>
            <register-link></register-link>
        </div>
    </div>
</template>

<script>
import LoginLink from "@/components/LoginLink";
import RegisterLink from "@/components/RegisterLink";
import TheLogo from "@/components/TheLogo";
import { mapGetters } from "vuex";
import UserToolbar from "@/components/UserToolbar";
import { authInfo } from "@/mixins/authInfo";

export default {
    name: "TheHeader",
    components: { UserToolbar, TheLogo, LoginLink, RegisterLink },
    mixins: [authInfo]
};
</script>