<script setup lang="ts">
import { NPagination, NSpin } from "naive-ui";
import ArtworkItem from "@/components/artwork-item/index.vue";

withDefaults( defineProps<{
    artworkList: any[],
    total: number,
    pageSize?: number,
    loading?: boolean
}>(), {
    artworkList: () => [],
    total: 0,
    pageSize: 30,
    loading: false
} );

const curPage = defineModel<number>( "page", { required: true } );
</script>

<template>
    <section class="artwork-pagination">
        <n-spin :show="loading">
            <section class="artwork-list">
                <artwork-item v-for="item of artworkList" />
            </section>
        </n-spin>
        <n-pagination v-if="total > pageSize" v-model:page="curPage" :page-size="pageSize"
                      :item-count="total" />
    </section>
</template>

<style scoped lang="scss">
.artwork-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    row-gap: 20px;
    justify-content: center;
    justify-items: center;
    align-items: center;
    min-height: 200px;
}

.n-pagination {
    justify-content: center;

    :deep(.n-pagination-item--disabled) {
        opacity: 0;
        pointer-events: none;
    }

    :deep(.n-base-icon) {
        font-size: 28px;
    }

    :deep(.n-pagination-item) {
        margin: 0;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border: none !important;
        user-select: none;
        transition: box-shadow 0.2s, color 0.2s, background 0.2s, opacity 0.2s;
        font-weight: bold;
        color: #858585;
    }

    :deep(.n-pagination-item--clickable) {
        border-radius: 50%;

        &:hover {
            color: #808080;
            background: rgba(0, 0, 0, 0.04);
        }

        &.n-pagination-item--active {
            background-color: rgba(0, 0, 0, 0.88);
            color: #fff;
        }
    }
}
</style>