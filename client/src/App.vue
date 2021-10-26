<template>
    <router-view />
</template>

<style lang="scss">
    @import "./assets/scss/style.scss";
</style>
<script>
import { getToken } from "@/store/modules/auth/tokenStorage";

export default {
    async created() {
        const token = getToken();

        if(token) {
            await this.$store.dispatch("auth/Refresh");
        }
    }

}
</script>