<script setup lang="ts">
import { NInput, NIcon } from "naive-ui";
import { Search } from '@vicons/ionicons5'
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

withDefaults( defineProps<{
    placeholder?: string
}>(), {
    placeholder: "搜索VupStars"
} );

const route = useRoute();
const router = useRouter();

const searchValue = ref<string>( "" );

watch( () => route.params.tag, tag => {
    if ( !tag ) return;
    searchValue.value = <string>tag;
}, { immediate: true } );


function toSearchResultPage() {
    router.push( {
        path: `/tag/${ searchValue.value }`
    } );
}
</script>

<template>
    <n-input v-model:value="searchValue" class="top-search" :placeholder @keyup.enter="toSearchResultPage">
        <template #prefix>
            <n-icon :component="Search" />
        </template>
    </n-input>
</template>

<style scoped lang="scss">
.top-search {
    width: 100%;
}
</style>