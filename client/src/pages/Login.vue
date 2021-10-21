<template>
    <h2>Вход</h2>
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
            <button type="submit">Войти</button>
        </div>
    </form>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    async created() {
        if (this.isAuthenticated) {
            await this.$router.push("/");
        }
    },
    methods: {
        async submit() {
            const { email, password } = this;
            await this.$store.dispatch("Login", { password, email });
        }
    }
};
</script>