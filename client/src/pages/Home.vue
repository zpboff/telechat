<template>
    <h2>Главная</h2>
    <div v-if="testData">
        {{ testData }}
    </div>
    <base-button @click="test">Test</base-button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BaseButton from "@/components/BaseButton.vue";
import { client } from "@/client"; // @ is an alias to /src

@Options({
    components: {
        BaseButton
    },
    data() {
        return {
            testData: null
        };
    },
    methods: {
        async test() {
            const { data } = await client("/test");
            this.testData = data;
        }
    }
})
export default class Home extends Vue {
}
</script>
