<template>
    <base-layout>
        <div class="container">
            <base-loader></base-loader>
        </div>
    </base-layout>
</template>

<script>
import BaseLayout from "@/components/BaseLayout.vue";
import BaseLoader from "@/components/BaseLoader.vue";

export default {
    name: "Logout",
    components: { BaseLoader, BaseLayout },
    async created() {
        await this.$store.dispatch("auth/Logout");
        await this.$router.push("/");
    }
};
</script>