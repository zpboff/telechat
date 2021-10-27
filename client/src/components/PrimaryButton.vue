<template>
    <base-button :type="type" :classes="classObject">
        <slot></slot>
    </base-button>
</template>

<script>
import BaseButton from "./BaseButton";
export default {
    name: "PrimaryButton",
    components: { BaseButton },
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
    computed: {
      classObject() {
          return {
              ...this.classes,
              "button-primary": true
          }
      }
    },
    methods: {
        onClick(event) {
            this.$emit('click', event)
        }
    }
};
</script>

<style scoped>

</style>