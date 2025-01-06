<script setup lang="ts">
import { NScrollbar, NSpin, NPagination } from "naive-ui";
import ArtworkPagination from "@/components/artwork-pagination/index.vue";
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

watch( () => [ curTag.value, curState.value, curPage.value ], () => {
    searchData();
} );

const artworkList = ref( [] );
const loading = ref( false );

async function searchData() {
    loading.value = true;
    await new Promise( resolve => setTimeout( resolve, 3000 ) );
    const randomLength = Math.floor( Math.random() * 30 ) + 5;
    artworkList.value = Array.from( { length: randomLength }, ( _, index ) => index );
    console.log( `搜索了: [${ [ "按新", "按旧" ][curState.value] }][${ curTag.value }]` );
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
                <h3 class="title overflow-ellipsis">#{{ curTag }}</h3>
                <article class="artwork-total">
                    <span class="num">{{ artworkList.length }}</span>
                    <span class="label">作品</span>
                </article>
            </aside>
            <top-search v-model="curState" />
            <artwork-pagination v-model:page="curPage" :loading :artwork-list="artworkList" :total="artworkList.length" />
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

    .artwork-pagination {
        margin: 36px 0;
    }
}
</style>