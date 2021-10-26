import { withAuthCheck } from "@/components/HOC/withAuthCheck";
import News from "@/pages/News.vue";

export default withAuthCheck(News);