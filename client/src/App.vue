<template>
    <base-layout>
        <router-view />
    </base-layout>
</template>

<style>
</style>
<script>
import BaseLayout from "@/components/BaseLayout";
export default {
    components: { BaseLayout },
    async created() {
        await this.$store.dispatch("auth/Refresh");
    }

}
</script>