<script setup lang="ts">
import { NConfigProvider, NMessageProvider, type GlobalThemeOverrides } from "naive-ui";

const themeGlobal: GlobalThemeOverrides = {
    Form: {
        labelFontSizeLeftMedium: "14px",
        labelFontWeight: 700,
        labelTextColor: "#1F1F1F"
    },
    Input: {
        heightMedium: "40px",
        borderRadius: "4px",
        color: "rgba(0, 0, 0, 0.04)",
        colorFocus: "rgba(0, 0, 0, 0.04)",
        caretColor: "#000",
        border: "none",
        borderFocus: "none",
        borderHover: "none",
        borderError: "none",
        borderFocusError: "none",
        borderHoverError: "none",
        boxShadowFocus: "0 0 0 4px rgba(0, 150, 250, 0.2)",
        boxShadowFocusError: "0 0 0 4px rgba(255, 43, 0, 0.32)"
    },
    Spin: {
        color: "#0096fa"
    }
};
</script>

<template>
    <n-config-provider :theme-overrides="themeGlobal" abstract>
        <n-message-provider>
            <router-view />
        </n-message-provider>
    </n-config-provider>
</template>

<style lang="scss" scoped>
</style>
