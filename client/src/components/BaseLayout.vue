<template>
    <the-header></the-header>
    <slot></slot>
</template>

<script>
import TheHeader from "./TheHeader";
export default {
    name: "BaseLayout",
    components: { TheHeader }
};
</script>

<style scoped>

</style>