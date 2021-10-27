<script>
export default {
    name: "Logout",
    async created() {
        await this.$store.dispatch("auth/Logout");
        await this.$router.push("/");
    }
};
</script>