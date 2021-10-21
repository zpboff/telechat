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
    },
    computed: function() {
        console.log(this.$route);
        return true;
    }
};
</script>

<style lang="scss">
</style>