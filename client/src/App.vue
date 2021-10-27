<template>
    <template v-if="isLoaded">
        <div>12321</div>
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

export default {
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