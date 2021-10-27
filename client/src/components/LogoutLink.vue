<template>
    <primary-button @click="logout">
        Выход
    </primary-button>
</template>

<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
    name: "LogoutLink",
    components: { PrimaryButton },
    methods: {
        async logout() {
            await this.$store.dispatch("auth/Logout");
            await this.$router.push("/");
        }
    }
};
</script>