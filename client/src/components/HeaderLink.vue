<template>
    <router-link :to="link" class="nav-link">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    name: "HeaderLink",
    props: {
        link: {
            type: String,
            validator: function (value) {
                return value.startsWith('/')
            }
        }
    }
};
</script>

<style lang="scss">
</style>