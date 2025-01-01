<script setup lang="ts">
import { NScrollbar } from "naive-ui";
import ArtworkItem from "@/components/artwork-item/index.vue";

defineOptions( {
    name: "Home"
} );
</script>

<template>
    <n-scrollbar>
        <main class="home">
            <section class="artwork-list">
                <artwork-item v-for="index in 34" :key="index"/>
            </section>
        </main>
    </n-scrollbar>
</template>

<style scoped lang="scss">
.home {
    margin: 0 auto;
    width: 1224px;
    padding: 0 72px;

    .artwork-list {
        margin: 36px 0;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        row-gap: 20px;
        justify-content: center;
        justify-items: center;
        align-items: center;
    }
}
</style>