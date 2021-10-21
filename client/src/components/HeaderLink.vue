<template>
    <router-link :to="link">
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

<style lang="scss" scoped>
$link-padding: 10px;
a {
    background-color: $base-color;
    display: inline-block;
    height: calc(100% - 2 * #{$link-padding});
    padding: $link-padding;
    font-size: 20px;
    text-decoration: none;
}
a:visited {
    background-color: $base-color;
}
a:hover, a.current {
    background-color: darken($base-color, 10);
}
a, a:visited, a:hover, a:active {
    color: inherit;
}
</style>