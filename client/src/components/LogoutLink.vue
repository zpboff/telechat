<template>
    <base-button @click="logout">
        Выход
    </base-button>
</template>

<script>
import BaseButton from "@/components/BaseButton";
export default {
    name: "LogoutLink",
    components: { BaseButton },
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