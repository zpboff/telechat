<template>
    <base-loader></base-loader>
</template>

<script>
import BaseLoader from "@/components/BaseLoader";
export default {
    name: "Logout",
    components: { BaseLoader },
    async created() {
        await this.$store.dispatch("auth/Logout");
        await this.$router.push("/");
    }
};
</script>