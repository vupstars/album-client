<script setup lang="ts">
import testAvatar from "@/assets/image/avatar.jpg";
import { NImage, NScrollbar, NButton } from "naive-ui";
import ArtworkPagination from "@/components/artwork-pagination/index.vue";
import EditDialog from "./components/edit-dialog.vue";
import { onMounted, ref, watch } from "vue";

const curPage = ref( 1 );

watch( () => [ curPage.value ], () => {
    searchData();
} );

const artworkList = ref( [] );
const loading = ref( false );

async function searchData() {
    loading.value = true;
    await new Promise( resolve => setTimeout( resolve, 3000 ) );
    const randomLength = Math.floor( Math.random() * 30 ) + 5;
    artworkList.value = Array.from( { length: randomLength }, ( _, index ) => index );
    loading.value = false;
}

const editDialogState = ref( false );

function editUser() {
    editDialogState.value = true;
}

onMounted( () => {
    searchData();
} );
</script>

<template>
    <n-scrollbar>
        <main class="user-home">
            <header>
                <section>
                    <n-image class="avatar" :src="testAvatar" preview-disabled :img-props="{ draggable: false }" />
                    <div class="user-info">
                        <div class="name overflow-ellipsis">username</div>
                        <p class="email overflow-ellipsis">114514@lolicon.com</p>
                        <p class="desc">一条咸鱼</p>
                    </div>
                </section>
                <aside>
                    <n-button class="edit-user" secondary round @click="editUser">编辑个人资料</n-button>
                </aside>
            </header>
            <section>
                <h3 class="list-header">
                    <span>上传列表</span>
                </h3>
                <artwork-pagination v-model:page="curPage" :artwork-list="artworkList" :loading :total="artworkList.length" />
            </section>
        </main>
        <edit-dialog v-model:show="editDialogState"></edit-dialog>
    </n-scrollbar>
</template>

<style scoped lang="scss">
.user-home {
    margin: 0 auto;
    width: 1224px;

    header {
        display: flex;
        justify-content: space-between;
        margin: 40px 0;
        padding-top: 40px;

        > section {
            display: flex;
            column-gap: 24px;
        }

        .avatar {
            position: relative;
            top: -40px;
            width: 96px;
            height: 96px;
            border: 2px solid #fff;
            border-radius: 50%;
        }

        .edit-user {
            font-weight: 700;
        }
    }
}

.user-info {
    max-width: 400px;

    .name {
        margin-bottom: 24px;
        font-size: 20px;
        line-height: 28px;
        font-weight: 700;
        color: #1f1f1f;
    }

    .email {
        font-size: 14px;
        color: rgb(133, 133, 133);
    }

    .desc {
        font-size: 14px;
        color: #474747;
    }
}

.list-header {
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 28px;
    font-weight: 7000;
    color: #474747;
}
</style>