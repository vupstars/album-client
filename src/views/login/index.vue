<template>
    <bg-carousel :image-list="imageList" />
    <header class="search-nav">
        <router-link class="logo" to="/">{{ config.LOGO_TEXT }}</router-link>
        <top-search />
    </header>
    <main>
        <login v-if="cardStatus === 0" :email @change-status="changeStatus">
            <n-button class="bottom-btn" @click="cardStatus = 1" secondary round>去注册</n-button>
        </login>
        <register v-else @completed="initUsername" @change-status="changeStatus">
            <n-button class="bottom-btn" @click="cardStatus = 0" secondary round>去登录</n-button>
        </register>
    </main>
</template>

<script lang="ts" setup>
import BgCarousel from "./components/bg-carousel.vue";
import TopSearch from "./components/top-search.vue";
import { ref } from "vue";
import Login from "./login.vue";
import Register from "./register.vue";
import config from "@/config.ts";
import { NButton } from "naive-ui";

const imageList = [ "#0390fe", "#000" ];

// 0: login, 1: register
const cardStatus = ref<0 | 1>( 0 );

const email = ref( "" );

function changeStatus( status: 0 | 1 ) {
    cardStatus.value = status;
}

function initUsername( value: string ) {
    email.value = value;
    changeStatus( 0 );
}
</script>

<style lang="scss" scoped>
:deep(.n-button) {
    width: 100%;
}

.bottom-btn {
    margin-top: 12px;
}

.search-nav,
main {
    min-width: 320px;
}

.search-nav {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 68px;
    box-sizing: border-box;

    .logo {
        margin-right: 18px;
        font-size: 28px;
        font-weight: 700;
        color: #fff;
    }

    .n-config-provider {
        flex: 1;
    }
}

main {
    position: relative;
    min-height: 650px;
    height: calc(100% - 68px);
}

@media (max-width: 667px) {
    :deep(.top-search) {
        width: 100%;
    }
}
</style>