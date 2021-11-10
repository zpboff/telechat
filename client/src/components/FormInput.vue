<template>
    <div class="form-control" v-bind:class="{'form-control--expanded': fieldExpanded}">
        <label class="label" :for="id">{{ label }}</label>
        <input @focus="expandField" @focusout="collapseField" class="input" :id="id"
               :type="type" :name="name" v-model="model" />
    </div>
</template>

<script>
import isEmpty from "lodash.isempty";

export default {
    name: "FormInput",
    props: {
        id: {
            type: String
        },
        label: {
            type: String
        },
        value: {
            type: String
        },
        name: {
            type: String
        },
        type: {
            type: String,
            validator(value) {
                return ["text", "email", "password"].includes(value);
            }
        }
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("setValue", value);
            }
        }
    },
    data() {
        return {
            fieldExpanded: !isEmpty(this.value)
        };
    },
    methods: {
        expandField() {
            this.fieldExpanded = true;
        },
        collapseField() {
            if (!this.value) {
                this.fieldExpanded = false;
            }
        }
    }
};
</script>