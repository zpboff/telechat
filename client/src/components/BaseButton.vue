<template>
    <button :type="type" v-on:click="onClick" class="button" v-bind:class="classes">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "BaseButton",
    props: {
        type: {
            type: String,
            validator(value) {
                return ['button', 'submit', 'reset'].includes(value)
            }
        },
        classes: {
            type: Object
        }
    },
    methods: {
        onClick(event) {
            this.$emit('click', event)
        }
    }
};
</script>