<template>
    <div v-if="hasAvatar" class="user-icon">
        <img :src="this.avatar" class="avatar" />
    </div>
    <div class="user-initials" v-else>
        {{ initials }}
    </div>
</template>

<script>
import isEmpty from "lodash.isempty";

export default {
    name: "UserAvatarIcon",
    props: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        avatar: {
            type: String,
            default: ""
        }
    },
    computed: {
        hasAvatar() {
            return !isEmpty(this.avatar);
        },
        initials() {
            const [firstNameLiteral] = this.firstName;
            const [lastNameLiteral] = this.lastName;

            return `${firstNameLiteral}${lastNameLiteral}`.toUpperCase();
        }
    }
};
</script>