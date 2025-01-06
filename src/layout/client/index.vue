<script setup lang="ts">
import TopSearch from "@/components/top-search/index.vue";
import { NButton } from "naive-ui";
import config from "@/config";
import UserPopover from "./components/user-popover.vue";
import { ref } from "vue";

const isLogin = ref( true );
const showPopover = ref( false );
</script>

<template>
    <div class="client-layout">
        <header>
            <router-link to="/" custom v-slot="{ navigate }">
                <div class="logo" @click="navigate">{{ config.LOGO_TEXT }}</div>
            </router-link>
            <top-search placeholder="搜索作品" />
            <div class="right-content">
                <router-link to="/work/create" custom v-slot="{ navigate }">
                    <n-button class="submit-work" secondary round @click="navigate">投稿作品</n-button>
                </router-link>
                <div class="user-box">
                    <user-popover v-if="isLogin" v-model:show="showPopover" />
                    <router-link v-else class="to-login" to="/login">登陆</router-link>
                </div>
            </div>
        </header>
        <main>
            <router-view />
        </main>
    </div>
</template>

<style scoped lang="scss">
.client-layout {
    height: 100%;
    min-width: 1200px;
    transform: translateX(0);
}

header {
    position: fixed;
    inset: 0 0 auto;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr minmax(0px, 528px) 1fr;
    gap: 24px;
    height: var(--client-header-height);
    padding: 0 24px;
    background-color: #fff;

    .logo {
        user-select: none;
        cursor: pointer;
        font-size: 28px;
        color: #0096fa;
    }
}

main {
    padding-top: var(--client-header-height);
    height: 100%;
    box-sizing: border-box;
}

.right-content {
    display: grid;
    align-items: center;
    justify-self: end;
    gap: 24px;
    grid-template-columns: repeat(2, auto);

    .submit-work {
        font-weight: bold;
    }

    .user-box {
        line-height: 0;

        .to-login {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
        }

        .to-login {
            display: block;
            background-color: rgba(0, 0, 0, 0.04);
            user-select: none;
            font-size: 14px;
            font-weight: 700;
            line-height: 40px;
            text-align: center;
            color: rgba(0, 0, 0, 0.6);
        }
    }
}
</style>