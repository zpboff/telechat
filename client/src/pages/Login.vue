<template>
    <base-layout>
        <div class="container">
            <form @submit.prevent="submit" class="form form--small">
                <h2>Вход</h2>
                <img src="../assets/logo.png" width="60" height="60" alt="Telechat" title="Telechat"
                     class="form-logo" />
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
                <div class="form-submitter">
                    <primary-button>Войти</primary-button>
                </div>
                <div v-if="hasError">
                    <div v-for="error in errors" v-bind:key="error">
                        {{ error }}
                    </div>
                </div>
                <div class="form-note">
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

export default {
    name: "Login",
    components: { PrimaryButton, BaseLayout },
    data() {
        return {
            email: "",
            emailFieldExpanded: false,
            password: "",
            passwordFieldExpanded: false,
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
        async submit() {
            const { email, password } = this;
            const errors = await this.$store.dispatch("auth/Login", { password, email });
            this.errors = errors;
        }
    }
};
</script>