<template>
    <a @click="logout" class="nav-link">Logout</a>
</template>

<script>
export default {
    name: "LogoutLink",
    methods: {
        async logout() {
            await this.$store.dispatch("auth/Logout");
            await this.$router.push("/");
        }
    }
};
</script>

<style scoped>

</style>