<template>
    <base-layout>
        <div class="container">
            <form @submit.prevent="submit" class="form form--small">
                <div class="form-header">
                    <img src="../assets/logo.png" width="35" height="35" alt="Telechat" title="Telechat"
                         class="form-logo" />
                    <h2>Регистрация</h2>
                </div>
                <div class="form-control" v-bind:class="{'form-control--expanded': emailFieldExpanded}">
                    <label class="label" for="email">Email</label>
                    <input @focus="expandEmailField()" @focusout="collapseEmailField()" class="input" id="email"
                           type="email" v-model="email" name="email" />
                </div>
                <div class="form-control" v-bind:class="{'form-control--expanded': passwordFieldExpanded}">
                    <label class="label" for="password">Пароль</label>
                    <input @focus="expandPasswordField()" @focusout="collapsePasswordField()" class="input"
                           id="password"
                           type="password" v-model="password" name="password" />
                </div>
                <div class="form-control" v-bind:class="{'form-control--expanded': firstNameFieldExpanded}">
                    <label class="label" for="firstName">Имя</label>
                    <input @focus="expandFirstNameField()" @focusout="collapseFirstNameField()" class="input"
                           id="firstName"
                           type="text" v-model="firstName" name="firstName" />
                </div>
                <div class="form-control" v-bind:class="{'form-control--expanded': lastNameFieldExpanded}">
                    <label class="label" for="lastName">Фамилия</label>
                    <input @focus="expandLastNameField()" @focusout="collapseLastNameField()" class="input"
                           id="lastName"
                           type="text" v-model="lastName" name="lastName" />
                </div>
                <div class="form-submitter">
                    <primary-button>Зарегистрироваться</primary-button>
                </div>
                <div v-if="hasError">
                    <div v-for="error in errors" v-bind:key="error">
                        {{ error }}
                    </div>
                </div>
                <div class="form-note">
                    Есть учетная запись?
                    <router-link to="/login">
                        Войти
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

export default {
    name: "Register",
    components: { PrimaryButton, BaseLayout },
    data() {
        return {
            email: "",
            emailFieldExpanded: false,
            password: "",
            passwordFieldExpanded: false,
            firstName: "",
            firstNameFieldExpanded: false,
            lastName: "",
            lastNameFieldExpanded: false,
            errors: []
        };
    },
    computed: {
        hasError() {
            return !isEmpty(this.errors);
        }
    },
    methods: {
        expandEmailField() {
            this.emailFieldExpanded = true;
        },
        collapseEmailField() {
            if (!this.email) {
                this.emailFieldExpanded = false;
            }
        },
        expandPasswordField() {
            this.passwordFieldExpanded = true;
        },
        collapsePasswordField() {
            if (!this.password) {
                this.passwordFieldExpanded = false;
            }
        },
        expandFirstNameField() {
            this.firstNameFieldExpanded = true;
        },
        collapseFirstNameField() {
            if (!this.firstName) {
                this.firstNameFieldExpanded = false;
            }
        },
        expandLastNameField() {
            this.lastNameFieldExpanded = true;
        },
        collapseLastNameField() {
            if (!this.lastName) {
                this.lastNameFieldExpanded = false;
            }
        },
        async submit() {
            const { email, password, firstName, lastName } = this;
            const errors = await this.$store.dispatch("auth/Register", { password, email, firstName, lastName });
            this.errors = errors;
        }
    }
};
</script>