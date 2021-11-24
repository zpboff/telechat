<template>
    <div class="popover" v-click-outside="hide">
        <div
            class="popover--switch"
            @click="toggle"
            :class="{[switchClass]: switchClass, 'popover--switch__on': isOpened}"
        >
            <slot name="switch"></slot>
        </div>
        <div class="popover--content" :class="contentClass" v-if="isOpened">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "BasePopover",
    props: {
        switchClass: {
            type: String
        },
        contentClass: {
            type: String
        }
    },
    data() {
        return {
            isOpened: false
        };
    },
    methods: {
        toggle() {
            this.isOpened = !this.isOpened;
        },
        hide() {
            this.isOpened = false;
        }
    }
};
</script>

<style scoped>

</style>