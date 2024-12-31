<script setup lang="ts">
import { NInput, NConfigProvider, NIcon, type GlobalThemeOverrides } from "naive-ui";
import { Search } from '@vicons/ionicons5'
import { ref } from "vue";
import { useRouter } from "vue-router";

const themeOverrides: GlobalThemeOverrides = {
    Input: {
        heightMedium: "36px",
        borderRadius: "4px",
        caretColor: "#000",
        border: "none"
    }
};

const router = useRouter();
const searchValue = ref<string>( "" );

function toSearchResultPage() {
    router.push( {
        path: `/tag/${ searchValue.value }`
    } );
}
</script>

<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-input v-model:value="searchValue" class="top-search" placeholder="搜索VupStars"
                 @keyup.enter="toSearchResultPage">
            <template #prefix>
                <n-icon :component="Search" />
            </template>
        </n-input>
    </n-config-provider>
</template>

<style scoped lang="scss">
.top-search {
    width: 500px;

    :deep(.n-input__state-border) {
        display: none;
    }
}
</style>