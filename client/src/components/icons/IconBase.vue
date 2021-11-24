<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :viewBox="viewBox"
        :aria-labelledby="iconName"
        stroke-width="2"
        :stroke="iconColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <title
            :id="iconName"
            lang="en"
        >{{ iconName }} icon</title>
        <slot />
    </svg>
</template>

<script>
export default {
    name: "IconBase",
    props: {
        width: {
            type: [String, Number],
            default: 24
        },
        height: {
            type: [String, Number],
            default: 24
        },
        iconName: {
            type: String,
            default: 'box'
        },
        iconColor: {
            type: String,
            default: "currentColor"
        }
    },
    computed: {
        viewBox() {
            return `0 0 ${this.width} ${this.height}`
        }
    }
};
</script>

<style scoped>

</style>