<template>
    <not-found v-if="notFound"></not-found>
    <layout-with-sidebar v-else>
        <div class="container page">
            <base-loader v-if="isLoaded"></base-loader>
            <div v-else class="user-page">
                <div class="short-info">
                    <div class="avatar-container">
                        <img class="avatar" src="../assets/images/avatar.jpg" alt="Аватар" title="Аватар">
                    </div>
                    <line-separator>Контактные данные</line-separator>
                    <div class="contacts">
                        <div class="info-row">
                            <div class="info-row--label">
                                Телефон:
                            </div>
                            <a class="info-row--value" href="tel:+79998887766">
                                +79998887766
                            </a>
                        </div>
                        <div class="info-row">
                            <div class="info-row--label">
                                Email:
                            </div>
                            <a class="info-row--value" href="mailto:mail@mail.mail">
                                mail@mail.mail
                            </a>
                        </div>
                    </div>
                    <line-separator>Друзья</line-separator>
                    <div class="friends-list">
                        Список друзей
                    </div>
                </div>
                <div class="details">
                    <div class="details-head">
                        <div class="common-info">
                            <h3 class="user-name">{{ userInfo.firstName }} {{ userInfo.lastName }}</h3>
                            <a class="link location" href="#">
                                <map-pin class="pin"></map-pin>
                                <span class="location-name">Тула, Россия</span>
                            </a>
                        </div>
                        <div class="relations">
                            <a class="relation-info" href="#">
                                <div class="relation-info-count">
                                    67
                                </div>
                                <div class="relation-info-type">
                                    друзей
                                </div>
                            </a>
                            <a class="relation-info" href="#">
                                <div class="relation-info-count">
                                    174
                                </div>
                                <div class="relation-info-type">
                                    подписчика
                                </div>
                            </a>
                        </div>
                        <div class="user-actions">
                            <primary-button>Написать</primary-button>
                            <relation-actions :user-info="userInfo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout-with-sidebar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LayoutWithSidebar from "@/components/LayoutWithSidebar.vue";
import BaseLoader from "@/components/BaseLoader.vue";
import NotFound from "@/pages/NotFound.vue";
import { getUserInfo, UserViewModel } from "@/modules/user/getUserInfo";
import RelationActions from "@/components/RelationActions.vue";
import MapPin from "@/components/icons/MapPin.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import LineSeparator from "@/components/LineSeparator.vue";

type ComponentBindings = {
    userInfo: UserViewModel;
    isLoaded: boolean;
    userLogin: string;
}

export default defineComponent<unknown, ComponentBindings>({
    name: "User",
    components: { LineSeparator, PrimaryButton, MapPin, RelationActions, NotFound, BaseLoader, LayoutWithSidebar },
    async created() {
        const user = await getUserInfo(this.userLogin);
        this.userInfo = user;
        this.isLoaded = false;
    },
    data() {
        return {
            isLoaded: true,
            userInfo: null
        };
    },
    computed: {
        userLogin(): string {
            return this.$route.params.login as string;
        },
        notFound(): boolean {
            return !this.isLoaded && !this.userInfo;
        }

    }
});
</script>