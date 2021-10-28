<template>
    <not-found v-if="notFound"></not-found>
    <layout-with-sidebar v-else>
        <base-loader v-if="isLoaded"></base-loader>
        <div v-else>
            {{ this.userInfo }}
        </div>
    </layout-with-sidebar>
</template>

<script>
import LayoutWithSidebar from "@/components/LayoutWithSidebar";
import { client } from "@/client";
import BaseLoader from "@/components/BaseLoader";
import NotFound from "@/pages/NotFound";

export default {
    name: "User",
    components: { NotFound, BaseLoader, LayoutWithSidebar },
    async created() {
        const { login } = this.$route.params;
        const { data } = await client.get(`/users/get/${login}`);
        this.userInfo = data;
        this.isLoaded = false;
    },
    data() {
        return {
            isLoaded: true,
            userInfo: null
        };
    },
    computed: {
        notFound() {
            return !this.isLoaded && !this.userInfo;
        }
    }
};
</script>