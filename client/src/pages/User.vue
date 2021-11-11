<template>
    <not-found v-if="notFound"></not-found>
    <layout-with-sidebar v-else>
        <base-loader v-if="isLoaded"></base-loader>
        <div v-else>
            {{ this.userInfo }}
            <div>
                <primary-button @click="subscribe">Подписаться</primary-button>
            </div>
        </div>
    </layout-with-sidebar>
</template>

<script>
import LayoutWithSidebar from "@/components/LayoutWithSidebar";
import { client } from "@/client";
import BaseLoader from "@/components/BaseLoader";
import NotFound from "@/pages/NotFound";
import PrimaryButton from "@/components/PrimaryButton";

export default {
    name: "User",
    components: { PrimaryButton, NotFound, BaseLoader, LayoutWithSidebar },
    async created() {
        const { data } = await client.get(`/users/get/${this.userLogin}`);
        this.userInfo = data;
        this.isLoaded = false;
    },
    data() {
        return {
            isLoaded: true,
            userInfo: null
        };
    },
    methods: {
      async subscribe() {
          const { login } = this.$route.params;
          const { data } = await client.post(`/users/subscribe/${this.userLogin}`);
      }
    },
    computed: {
        userLogin() {
            return  this.$route.params.login;
        },
        notFound() {
            return !this.isLoaded && !this.userInfo;
        },
    }
};
</script>