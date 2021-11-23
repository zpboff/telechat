<template>
    <base-layout>
        <div class="container">
            <form @submit.prevent="submit" class="form form--small">
                <div class="form-header">
                    <img
                        src="../assets/logo.png"
                        width="35"
                        height="35"
                        alt="Telechat"
                        title="Telechat"
                         class="form-logo" />
                    <h2>Вход</h2>
                </div>
                <form-input
                    :value="email"
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    @setValue="setEmail"
                />
                <form-input
                    :value="password"
                    type="password"
                    id="password"
                    name="password"
                    label="Пароль"
                    @setValue="setPassword" />
                <div class="form-submitter">
                    <primary-button>Войти</primary-button>
                </div>
                <div v-if="hasError">
                    <div v-for="error in errors" v-bind:key="error">
                        {{ error }}
                    </div>
                </div>
                <div class="note">
                    Нет учетной записи?
                    <router-link to="/register">
                        Создать
                    </router-link>
                </div>
            </form>
        </div>
    </base-layout>
</template>

<script>
import isEmpty from "lodash.isempty";
import BaseLayout from "@/components/BaseLayout";
import PrimaryButton from "@/components/PrimaryButton";
import FormInput from "@/components/FormInput";

export default {
    name: "Login",
    components: { FormInput, PrimaryButton, BaseLayout },
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
        setEmail(email) {
            console.log("email", email);
            this.email = email;
        },
        setPassword(password) {
            console.log("password", password);
            this.password = password;
        },
        async submit() {
            const { email, password } = this;
            const errors = await this.$store.dispatch("auth/Login", { password, email });
            this.errors = errors;
        }
    }
};
</script>