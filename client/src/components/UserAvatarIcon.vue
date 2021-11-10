<template>
    <div class="avatar-icon">
        {{initials}}
    </div>
</template>

<script>
export default {
    name: "UserAvatarIcon",
    props: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        }
    },
    computed: {
        initials() {
            const [firstNameLiteral] = this.firstName;
            const [lastNameLiteral] = this.lastName;

            return `${firstNameLiteral}${lastNameLiteral}`.toUpperCase();
        }
    }
};
</script>