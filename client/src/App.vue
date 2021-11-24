<template>
    <base-layout v-if="isLoaded">
        <div class="container page">
            <base-loader></base-loader>
        </div>
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