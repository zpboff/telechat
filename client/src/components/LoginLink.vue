<template>
    <header-link :link="link" class-name="button">
       Вход
    </header-link>
</template>

<script>
import HeaderLink from "@/components/HeaderLink";

export default {
    name: "LoginLink",
    components: { HeaderLink },
    computed: {
        link() {
            return `/login?returnUrl=${this.$route.path}`
        }
    }
};
</script>

<style scoped>

</style>