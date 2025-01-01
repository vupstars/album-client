<script setup lang="ts">
import { type GlobalThemeOverrides, NConfigProvider } from "naive-ui";
import config from "@/config";

withDefaults( defineProps<{
    title: string;
}>(), {
    title: "标题"
} );

const themeOverrides: GlobalThemeOverrides = {
    Input: {
        heightMedium: "40px",
        borderRadius: "4px",
        caretColor: "#000",
        border: "none",
        color: "rgba(0, 0, 0, 0.04)",
        colorFocus: "rgba(0, 0, 0, 0.04)",
        borderFocus: "1px solid rgba(0, 150, 250, 0.32)",
        borderHover: "1px solid rgba(0, 150, 250, 0.32)",
        boxShadowFocus: "0 0 0 2px rgba(0, 150, 250, 0.2)"
    },
    Button: {
        heightMedium: "40px",
        fontSizeMedium: "16px"
    },
    Form: {
        feedbackHeightMedium: "6px"
    }
};
</script>

<template>
    <div class="main-box">
        <header class="box-header">
            <h3 class="box-logo">{{ config.LOGO_TEXT }}</h3>
            <p class="box-title">{{ title }}</p>
        </header>
        <n-config-provider :theme-overrides="themeOverrides" inline-theme-disabled abstract>
            <slot />
        </n-config-provider>
        <footer class="box-footer">
            <p>This site is protected by XXX</p>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.main-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;
    width: 400px;
    border-radius: 24px;
    background-color: #fff;
    box-sizing: border-box;

    .box-header {
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        text-align: center;

        .box-logo {
            font-size: 42px;
            color: #0096fa;
        }

        .box-title {
            font-size: 20px;
            line-height: 28px;
            font-weight: 700;
        }
    }

    .box-footer {
        margin-top: 40px;
        padding-top: 16px;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        text-align: center;
        font-size: 12px;
        line-height: 20px;
        color: #999;
    }
}

@media (max-width: 440px) {
    .main-box {
        width: calc(100% - 40px);
    }
}
</style>