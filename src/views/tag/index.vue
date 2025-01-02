<script setup lang="ts">
import { NScrollbar, NSpin, NPagination } from "naive-ui";
import ArtworkItem from "@/components/artwork-item/index.vue";
import TopSearch from "./components/top-search.vue";
import { useRoute } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";

defineOptions( {
    name: "Home"
} );

const route = useRoute();

const curState = ref( 0 );
const curPage = ref( 1 );
const curTag = computed( () => route.params.tag );

watch( () => [curTag.value, curState.value, curPage.value], () => {
    searchData();
} );

const artworkList = ref( [] );
const loading = ref( false );

async function searchData() {
    loading.value = true;
    await new Promise( resolve => setTimeout( resolve, 3000 ) );
    const randomLength = Math.floor( Math.random() * 30 ) + 5;
    artworkList.value = Array.from( { length: randomLength }, ( _, index ) => index );
    console.log( `搜索了: [${ ["按新", "按旧"][curState.value] }][${ curTag.value }]` );
    loading.value = false;
}

onMounted( () => {
    searchData();
} );
</script>

<template>
    <n-scrollbar>
        <main class="home">
            <aside class="tag-info">
                <h3 class="title">{{ curTag }}</h3>
                <article class="artwork-total">
                    <span class="num">{{ artworkList.length }}</span>
                    <span class="label">作品</span>
                </article>
            </aside>
            <top-search v-model="curState" />
            <n-spin :show="loading">
                <section class="artwork-list">
                    <artwork-item v-for="item of artworkList"/>
                </section>
            </n-spin>
            <n-pagination v-model:page="curPage" :page-size="10" :item-count="artworkList.length" />
        </main>
    </n-scrollbar>
</template>

<style scoped lang="scss">
.home {
    margin: 0 auto;
    width: 1224px;
    padding: 30px 72px;

    .tag-info {
        width: 664px;

        .title {
            color: #1F1F1F;
            font-weight: 700;
            font-size: 20px;
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .artwork-total {
            display: flex;
            align-items: center;
            column-gap: 4px;
            font-size: 16px;
            line-height: 24px;

            .num {
                color: #1F1F1F;
                font-weight: 700;
            }

            .label {
                color: #858585;
            }
        }
    }

    .top-search {
        margin-top: 16px;
    }

    .artwork-list {
        margin: 36px 0;
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
            border: none!important;
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
}
</style>