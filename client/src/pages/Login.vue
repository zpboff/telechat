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
        <div v-if="hasError">
          <div v-for="error in errors" v-bind:key="error">
            {{error}}
          </div>
        </div>
    </form>
</template>

<script>

import isEmpty from "lodash.isempty";

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            errors: []
        };
    },
    computed: {
      hasError() {
        return !isEmpty(this.errors);
      }
    },
    methods: {
        async submit() {
            const { email, password } = this;
            const errors = await this.$store.dispatch("auth/Login", { password, email });
            this.errors = errors;
        }
    }
};
</script>