<template>
    <header-link :link="link" class-name="button button-primary">
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
            const targetRoute = "/login";

            return targetRoute === this.$route.path
                ? targetRoute
                : `${targetRoute}?returnUrl=${this.$route.path}`;
        }
    }
};
</script>

<style scoped>

</style>