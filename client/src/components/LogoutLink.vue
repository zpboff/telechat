<template>
    <a @click="logout" class="nav-link">
        <span class="nav-link_text">
            Выход
        </span>
    </a>
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