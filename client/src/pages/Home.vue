<template>
    <h2>Главная</h2>
    <div v-if="data">
        {{data}}
    </div>
    <button type="button" v-on:click="test()">Test</button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue";
import { client } from "@/client"; // @ is an alias to /src

@Options({
    components: {
        HelloWorld
    },
    data() {
        return {
            data: null
        }
    },
    methods: {
        async test() {
            const { data } = await client('/test');
            this.data = data;
        }
    }
})
export default class Home extends Vue {}
</script>
