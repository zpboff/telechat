<template>
    <div class="header">
        <the-logo></the-logo>
        <div class="main-area"></div>
        <div class="auth-links">
            <template v-if="isAuthenticated">
                <logout-link></logout-link>
            </template>
            <template v-else>
                <sign-in-link></sign-in-link>
                <sign-up-link></sign-up-link>
            </template>
        </div>
    </div>
</template>

<script>
import SignInLink from "@/components/SignInLink";
import SignUpLink from "@/components/SignUpLink";
import LogoutLink from "@/components/LogoutLink";
import TheLogo from "@/components/TheLogo";

export default {
    name: "TheHeader",
    components: { TheLogo, LogoutLink, SignInLink, SignUpLink },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    }
};
</script>

<style scoped>


.main-area {
    flex-grow: 1;
}
</style>