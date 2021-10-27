<template>
    <div class="header">
        <the-logo></the-logo>
        <div class="main-area"></div>
        <div class="auth-links">
            <template v-if="isAuthenticated">
                <logout-link></logout-link>
            </template>
            <template v-else>
                <login-link></login-link>
                <register-link></register-link>
            </template>
        </div>
    </div>
</template>

<script>
import LoginLink from "@/components/LoginLink";
import RegisterLink from "@/components/RegisterLink";
import LogoutLink from "@/components/LogoutLink";
import TheLogo from "@/components/TheLogo";
import { mapGetters } from "vuex";

export default {
    name: "TheHeader",
    components: { TheLogo, LogoutLink, LoginLink, RegisterLink },
    computed: {
        ...mapGetters("auth", ["isAuthenticated"])
    }
};
</script>