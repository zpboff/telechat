<template>
    <base-layout>
        <div class="container page">
            <base-loader></base-loader>
        </div>
    </base-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { mapGetters } from "vuex";
import BaseLoader from "@/components/BaseLoader.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import { authInfo } from "@/mixins/authInfo";

@Options({
    components: {
        BaseLoader,
        BaseLayout,
        PrimaryButton
    },
    mixins: [authInfo],
    async created() {
        if (this.isAuthenticated) {
            await this.$router.push("/news");
            return;
        }
        await this.$router.push("/login");
    }
})
export default class Home extends Vue {
}
</script>
