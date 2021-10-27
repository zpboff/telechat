<template>
    <base-layout>
        <div class="body">
            <div class="sidebar"></div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </base-layout>
</template>

<script>
import BaseLayout from "./BaseLayout";

export default {
    name: "LayoutWithSidebar",
    components: { BaseLayout }
};
</script>

<style scoped>

</style>