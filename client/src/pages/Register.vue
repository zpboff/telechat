<template>
    <h2>Регистрация</h2>
    <form @submit.prevent="submit">
        <div>
            <label for="email">Email</label>
            <input id="email" type="email" v-model="email" name="email" />
        </div>
        <div>
            <label for="password">Пароль</label>
            <input id="password" type="password" v-model="password" name="password" />
        </div>
        <div>
            <button type="submit">Зарегистироваться</button>
        </div>
    </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Register",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated'])
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
            if(this.isAuthenticated) {
                await this.$router.push("/");
            }
        },
        async submit() {
            const { email, password } = this;
            console.log(this.$store)
            await this.$store.dispatch("auth/Register", { password, email });
        }
    }
};
</script>