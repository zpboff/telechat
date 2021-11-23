<template>
    <not-found v-if="notFound"></not-found>
    <layout-with-sidebar v-else>
        <div class="container page">
            <base-loader v-if="this.isLoaded"></base-loader>
            <div v-else class="user-page">
                <div class="short-info">
                    <div class="avatar-container">
                        <img
                            class="avatar"
                            :src="this.userInfo.avatar"
                            alt="Аватар"
                            title="Аватар"
                        />
                    </div>
                    <line-separator>Контактные данные</line-separator>
                    <div class="contacts">
                        <div class="info-row">
                            <div class="info-row--label">Телефон:</div>
                            <a class="info-row--value" :href="`tel:${this.userInfo.contactPhone}`">
                                {{ userInfo.contactPhone }}
                            </a>
                        </div>
                        <div class="info-row">
                            <div class="info-row--label">Email:</div>
                            <a class="info-row--value" :href="`mailto:${this.userInfo.email}`">
                                {{ userInfo.contactEmail }}
                            </a>
                        </div>
                    </div>
                    <div v-if="this.userInfo.friendsCount">
                        <line-separator>Друзья</line-separator>
                        <div class="friends-list">
                            <router-link
                                class="user-preview-icon"
                                v-for="friend in this.userInfo.friends"
                                :key="friend.login"
                                :to="`/user/${friend.login}`"
                            >
                                <user-avatar-icon
                                    :avatar="friend.avatar"
                                    :first-name="friend.firstName"
                                    :last-name="friend.lastName"
                                ></user-avatar-icon>
                                <div class="note">{{ friend.firstName }}</div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="details">
                    <div class="details-head">
                        <div class="common-info">
                            <h3 class="user-name">
                                {{ userInfo.firstName }} {{ userInfo.lastName }}
                            </h3>
                            <a class="link location" href="#">
                                <map-pin class="pin"></map-pin>
                                <span class="location-name">Тула, Россия</span>
                            </a>
                        </div>
                        <div class="user-details--info">
                            <div class="info-row">
                                <div class="info-row--label">День рождения:</div>
                                <div class="info-row--value">
                                    {{ birthDay }}
                                </div>
                            </div>
                        </div>
                        <div class="relations">
                            <a class="relation-info" href="#">
                                <div class="relation-info-count">
                                    {{ userInfo.friendsCount }}
                                </div>
                                <div class="relation-info-type">
                                    {{ friendsCountText }}
                                </div>
                            </a>
                            <a class="relation-info" href="#">
                                <div class="relation-info-count">
                                    {{ userInfo.subscribersCount }}
                                </div>
                                <div class="relation-info-type">
                                    {{ subscribersCountText }}
                                </div>
                            </a>
                        </div>
                        <div class="user-actions" v-if="!isYourPage">
                            <primary-button>Написать</primary-button>
                            <relation-actions :userInfo="this.userInfo" />
                        </div>
                    </div>
                    <div class="main-area">
                        <div class="tabs-container">
                            <a
                                class="tab"
                                :class="{ 'tab--active': needShowPosts }"
                                href="#"
                                @click.prevent="showPosts"
                            >
                                Записи
                            </a>
                            <a
                                class="tab"
                                :class="{ 'tab--active': needShowInfo }"
                                href="#"
                                @click.prevent="showInfo"
                            >
                                Информация
                            </a>
                        </div>
                        <div class="tab-body container">
                            <div v-if="needShowPosts">Записи</div>
                            <div v-if="needShowInfo">Информация</div>
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
import { getUserInfo, UserDetailCard } from "@/modules/user/getUserInfo";
import RelationActions from "@/components/RelationActions.vue";
import MapPin from "@/components/icons/MapPin.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import LineSeparator from "@/components/LineSeparator.vue";
import UserAvatarIcon from "@/components/UserAvatarIcon.vue";
import { Nullable } from "@/types";
import { dateToString } from "@/modules/date";
import { pluralize } from "@/modules/pluralize";

type Data = {
    userInfo: Nullable<UserDetailCard>;
    isLoaded: boolean;
    currentTab: Tabs;
};

enum Tabs {
    Posts,
    Info
}

export default defineComponent({
    name: "User",
    components: {
        UserAvatarIcon,
        LineSeparator,
        PrimaryButton,
        MapPin,
        RelationActions,
        NotFound,
        BaseLoader,
        LayoutWithSidebar
    },
    async created() {
        this.userInfo = await getUserInfo(this.userLogin);
        this.isLoaded = false;
    },
    data() {
        const data: Data = {
            isLoaded: true,
            userInfo: null,
            currentTab: Tabs.Posts
        };

        return data;
    },
    methods: {
        showPosts() {
            this.currentTab = Tabs.Posts;
        },
        showInfo() {
            this.currentTab = Tabs.Info;
        }
    },
    computed: {
        isYourPage(): boolean {
            return this.userLogin === this.$store.state.auth.login;
        },
        userLogin(): string {
            return this.$route.params.login as string;
        },
        notFound(): boolean {
            return !this.isLoaded && !this.userInfo;
        },
        needShowPosts(): boolean {
            return this.currentTab == Tabs.Posts;
        },
        needShowInfo(): boolean {
            return this.currentTab == Tabs.Info;
        },
        birthDay(): string {
            if (!this.userInfo?.birthdayDate) {
                return "";
            }

            return dateToString(new Date(this.userInfo.birthdayDate));
        },
        friendsCountText(): string {
            return pluralize(this.userInfo?.friendsCount ?? 0, ["друг", "друга", "друзей"]);
        },
        subscribersCountText(): string {
            return pluralize(this.userInfo?.subscribersCount ?? 0, [
                "подписчик",
                "подписчика",
                "подписчиков"
            ]);
        }
    }
});
</script>
