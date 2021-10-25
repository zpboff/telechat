import { Component, ComponentOptions } from "vue";
import { mapGetters } from "vuex";
import { h } from "@vue/runtime-core";

export const withRedirectWhenAuth = (component: Component): ComponentOptions => {
    return {
        render() {
            return h(component);
        },
        computed: {
            ...mapGetters("auth", ["isAuthenticated"])
        },
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
                if (this.isAuthenticated) {
                    await this.$router.push("/");
                }
            }
        }
    };
};