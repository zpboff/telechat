import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import News from "../pages/News.vue";
import Logout from "../pages/Logout.vue";
import User from "../pages/User.vue";
import Settings from "../pages/Settings.vue";
import NotFound from "../pages/NotFound.vue";
import { withRedirectWhenAuth } from "@/HOC/withRedirectWhenAuth";
import { withAuthCheck } from "@/HOC/withAuthCheck";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: withAuthCheck(Home),
        strict: true
    },
    {
        path: "/register",
        name: "Register",
        component: withRedirectWhenAuth(Register)
    },
    {
        path: "/login",
        name: "Login",
        component: withRedirectWhenAuth(Login)
    },
    {
        path: "/news",
        name: "News",
        component: withAuthCheck(News)
    },
    {
        path: "/logout",
        name: "Logout",
        component: withAuthCheck(Logout)
    },
    {
        path: "/user/:login",
        name: "User",
        component: withAuthCheck(User)
    },
    {
        path: "/settings",
        name: "Settings",
        component: withAuthCheck(Settings)
    },
    {
        path: "/about",
        name: "About",
        component: () => withAuthCheck(import(/* webpackChunkName: "about" */ "../pages/About.vue"))
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
