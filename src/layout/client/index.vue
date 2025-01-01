<script setup lang="ts">
import TopSearch from "@/components/top-search/index.vue";
import { NButton, NImage, NPopover, NScrollbar, type GlobalThemeOverrides } from "naive-ui";
import config from "@/config";
import testAvatar from "@/assets/image/avatar.jpg";
import UserPopover from "./components/user-popover.vue";
import { ref } from "vue";

const isLogin = ref( true );

const searchTheme: GlobalThemeOverrides["Input"] = {
    color: "rgba(0, 0, 0, 0.04)",
    colorFocus: "rgba(0, 0, 0, 0.04)",
    heightMedium: "40px",
    boxShadowFocus: "0 0 0 4px rgba(0, 150, 250, 0.2)"
};
</script>

<template>
    <div class="client-layout">
        <header>
            <div class="logo">{{ config.LOGO_TEXT }}</div>
            <top-search :theme="searchTheme" placeholder="搜索作品" />
            <div class="right-content">
                <router-link to="/work/create" custom v-slot="{ navigate }">
                    <n-button class="submit-work" secondary round @click="navigate">投稿作品</n-button>
                </router-link>
                <div class="user-box">
                    <n-popover v-if="isLogin" trigger="click" width="200px" raw :show-arrow="false">
                        <template #trigger>
                            <n-image class="avatar" :src="testAvatar" preview-disabled title="username" />
                        </template>
                        <user-popover />
                    </n-popover>
                    <router-link v-else class="to-login" to="/login">登陆</router-link>
                </div>
            </div>
        </header>
        <main>
            <n-scrollbar>
                <router-view />
            </n-scrollbar>
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
        .avatar,
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