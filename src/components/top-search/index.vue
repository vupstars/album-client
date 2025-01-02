<script setup lang="ts">
import { NInput, NConfigProvider, NIcon, type GlobalThemeOverrides } from "naive-ui";
import { Search } from '@vicons/ionicons5'
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = withDefaults( defineProps<{
    theme?: GlobalThemeOverrides["Input"],
    placeholder?: string
}>(), {
    theme: () => ({}),
    placeholder: "搜索VupStars"
} );

const themeOverrides = computed<GlobalThemeOverrides>( () => {
    return {
        Input: {
            heightMedium: "36px",
            borderRadius: "4px",
            caretColor: "#000",
            border: "none",
            borderFocus: "none",
            borderHover: "none",
            boxShadowFocus: "none",
            ...props.theme
        }
    };
} );

const route = useRoute();
const router = useRouter();

const searchValue = ref<string>( "" );

watch( () => route.params.tag, tag => {
    if ( !tag ) return;
    searchValue.value = tag;
}, { immediate: true } );


function toSearchResultPage() {
    router.push( {
        path: `/tag/${ searchValue.value }`
    } );
}
</script>

<template>
    <n-config-provider :theme-overrides="themeOverrides" abstract>
        <n-input v-model:value="searchValue" class="top-search" :placeholder @keyup.enter="toSearchResultPage">
            <template #prefix>
                <n-icon :component="Search" />
            </template>
        </n-input>
    </n-config-provider>
</template>

<style scoped lang="scss">
.top-search {
    width: 100%;
}
</style>