import { Component, ComponentOptions } from "vue";
import { mapGetters } from "vuex";
import { h } from "@vue/runtime-core";
import { authInfo } from "@/mixins/authInfo";

const routesWithRedirect: string[] = [];

export const withRedirectWhenAuth = (component: Component): ComponentOptions => {
    return {
        render() {
            return h(component, this.$props);
        },
        mixins: [authInfo],
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