<template>
    <base-layout v-if="isLoaded">
        <base-loader></base-loader>
    </base-layout>
    <router-view v-else />
</template>

<style lang="scss">
@import "./assets/scss/style.scss";
</style>

<script>
import { getToken } from "@/store/modules/auth/tokenStorage";
import BaseLoader from "@/components/BaseLoader";
import BaseLayout from "@/components/BaseLayout";

export default {
    components: { BaseLayout, BaseLoader },
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