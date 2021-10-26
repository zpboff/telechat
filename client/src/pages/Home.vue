<template>
    <layout-with-sidebar>
        <h2>Главная</h2>
        <div v-if="testData">
            {{ testData }}
        </div>
        <primary-button @click="test">Test</primary-button>
    </layout-with-sidebar>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { client } from "@/client";
import PrimaryButton from "@/components/PrimaryButton.vue";
import LayoutWithSidebar from "@/components/LayoutWithSidebar.vue"; // @ is an alias to /src

@Options({
    components: {
        LayoutWithSidebar,
        PrimaryButton
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
