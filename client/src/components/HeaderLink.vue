<template>
    <router-link :to="link" :class="className">
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
        },
        className: {
            type: String
        }
    }
};
</script>

<style lang="scss">
</style>