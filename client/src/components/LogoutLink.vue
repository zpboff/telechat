<template>
    <a @click="logout">Logout</a>
</template>

<script>
export default {
    name: "LogoutLink",
    methods: {
        async logout() {
            await this.$store.dispatch("logout");
            await this.$router.push("/");
        }
    }
};
</script>

<style scoped>

</style>