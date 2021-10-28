<template>
    <layout-with-sidebar>
        User - {{ this.login }}
    </layout-with-sidebar>
</template>

<script>
import LayoutWithSidebar from "@/components/LayoutWithSidebar";

export default {
    name: "User",
    components: { LayoutWithSidebar },
    data() {
        const { login } = this.$route.params;

        return {
            login
        };
    }
};
</script>