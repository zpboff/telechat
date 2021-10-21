<template>
    <div class="hello">
        <button v-on:click="inc()">{{value}}</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "HelloWorld",
    computed: {
      value() {
          return this.$store.getters.counter;
      }
    },
    methods: {
        inc() {
            this.$store.commit("inc");
        }
    }
});
</script>

<style scoped lang="scss">
</style>
