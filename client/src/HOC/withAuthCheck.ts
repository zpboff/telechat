import { Component, ComponentOptions } from "vue";
import { h } from "@vue/runtime-core";
import { authInfo } from "@/mixins/authInfo";

export const withAuthCheck = (component: Component): ComponentOptions => {
    return {
        render() {
            return h(component);
        },
        mixins: [authInfo],
        async created() {
            await this.redirect();
        },
        watch: {
            async isAuthenticated() {
                await this.redirect();
            }
        },
        methods: {
            async redirect() {
                if (!this.isAuthenticated) {
                    await this.$router.push("/login?returnUrl=/news");
                }
            }
        }
    };
};