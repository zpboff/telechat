<template>
    <template v-if="isLoaded">
        <base-loader></base-loader>
    </template>
    <template v-else>
        <router-view />
    </template>
</template>

<style lang="scss">
@import "./assets/scss/style.scss";
</style>

<script>
import { getToken } from "@/store/modules/auth/tokenStorage";
import BaseLoader from "@/components/BaseLoader";

export default {
    components: { BaseLoader },
    data() {
        return {
            isLoaded: true
        };
    },
    async created() {
        const token = getToken();

        if (token) {
            await this.$store.dispatch("auth/Refresh");
        }

        this.isLoaded = false;
    }
};
</script>