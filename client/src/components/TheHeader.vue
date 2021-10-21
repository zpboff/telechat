<template>
    <div class="header">
        <div class="logo"></div>
        <div class="main-area"></div>
        <div class="auth-links">
            <sign-in-link></sign-in-link>
            <sign-up-link></sign-up-link>
        </div>
    </div>
</template>

<script>
import SignInLink from "@/components/SignInLink";
import SignUpLink from "@/components/SignUpLink";

export default {
    name: "TheHeader",
    components: { SignInLink, SignUpLink }
};
</script>

<style scoped>
.header {
    height: 50px;
    background-color: #42b983;
    display: flex;
}
.main-area {
    flex-grow: 1;
}
</style>