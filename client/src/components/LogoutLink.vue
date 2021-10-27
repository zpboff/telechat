<template>
    <header-link link="/logout" class-name="button button-primary">
        Выход
    </header-link>
</template>

<script>
import HeaderLink from "@/components/HeaderLink";

export default {
    name: "LogoutLink",
    components: { HeaderLink }
};
</script>