import { Component, ComponentOptions } from "vue";
import { mapGetters } from "vuex";
import { h } from "@vue/runtime-core";

const routesWithRedirect: string[] = [];

export const withRedirectWhenAuth = (component: Component): ComponentOptions => {
    return {
        render() {
            return h(component, this.$props);
        },
        computed: {
            ...mapGetters("auth", ["isAuthenticated"])
        },
        async created() {
            routesWithRedirect.push(this.$route.path);
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
                    const { returnUrl } = this.$route.query;

                    const possibleToRedirect = routesWithRedirect.includes(returnUrl);

                    if (returnUrl && possibleToRedirect) {
                        await this.$router.push(returnUrl);
                        return;
                    }

                    await this.$router.push('/');
                }
            }
        }
    };
};