<template>
    <header-link :link="link" class-name="button button-primary">
        Регистрация
    </header-link>
</template>

<script>
import HeaderLink from "@/components/HeaderLink";

export default {
    name: "RegisterLink",
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