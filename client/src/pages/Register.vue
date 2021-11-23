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
                        class="form-logo"
                    />
                    <h2>Регистрация</h2>
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
                    @setValue="setPassword"
                />
                <form-input
                    :value="firstName"
                    type="text"
                    id="firstName"
                    name="firstName"
                    label="Имя"
                    @setValue="setFirstName"
                />
                <form-input
                    :value="lastName"
                    type="text"
                    id="lastName"
                    name="lastName"
                    label="Фамилия"
                    @setValue="setLastName"
                />
                <div class="form-submitter">
                    <primary-button>Зарегистрироваться</primary-button>
                </div>
                <div v-if="hasError">
                    <div v-for="error in errors" v-bind:key="error">
                        {{ error }}
                    </div>
                </div>
                <div class="note">
                    Есть учетная запись?
                    <router-link to="/login"> Войти </router-link>
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
    name: "Register",
    components: { FormInput, PrimaryButton, BaseLayout },
    data() {
        return {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            errors: []
        };
    },
    computed: {
        hasError() {
            return !isEmpty(this.errors);
        },
        userCreateModel() {
            return {
                password: this.password,
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName
            };
        }
    },
    methods: {
        setEmail(email) {
            this.email = email;
        },
        setPassword(password) {
            this.password = password;
        },
        setFirstName(firstName) {
            this.firstName = firstName;
        },
        setLastName(lastName) {
            this.lastName = lastName;
        },
        async submit() {
            const errors = await this.$store.dispatch("auth/Register", this.userCreateModel);
            this.errors = errors;
        }
    }
};
</script>
