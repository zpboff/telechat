import Login from '@/pages/Login.vue'
import { withRedirectWhenAuth } from "@/components/HOC/withRedirectWhenAuth";

export default withRedirectWhenAuth(Login);