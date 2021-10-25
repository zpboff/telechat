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

export default {
    name: "Register",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        async submit() {
            const { email, password } = this;
            await this.$store.dispatch("auth/Register", { password, email });
        }
    }
};
</script>