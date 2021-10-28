<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24" stroke-width="2"
         stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
</template>

<script>
export default {
    name: "ChevronDown",
    props: {
        width: {
            type: Number
        },
        height: {
            type: Number
        }
    }
};
</script>

<style scoped>

</style>