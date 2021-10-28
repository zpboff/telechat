<template>
    <header-link :link="link" class="button button-primary">
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
            const targetRoute = "/register";

            return targetRoute === this.$route.path
                ? targetRoute
                : `${targetRoute}?returnUrl=${this.$route.path}`;
        }
    }
};
</script>

<style scoped>

</style>