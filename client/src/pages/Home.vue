<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PrimaryButton from "@/components/PrimaryButton.vue";
import LayoutWithSidebar from "@/components/LayoutWithSidebar.vue";
import { mapGetters } from "vuex";

@Options({
    components: {
        LayoutWithSidebar,
        PrimaryButton
    },
    computed: {
        ...mapGetters("auth", ["isAuthenticated"])
    },
    async created() {
        if (this.isAuthenticated) {
            await this.$router.push("/news");
            return;
        }
        await this.$router.push("/login");
    }
})
export default class Home extends Vue {
}
</script>
