<script setup lang="ts">
import { NImage, NIcon, useMessage } from "naive-ui";
import { Pencil } from "@vicons/ionicons5";
import { onBeforeUnmount, ref } from "vue";

const message = useMessage();
const uploadEl = ref<HTMLInputElement | null>( null );

const src = defineModel<string>( "src", { required: true } );

function openUpload() {
    uploadEl.value?.click();
}

function handleUpload( event: Event ) {
    // @ts-ignore
    const file: File = event.target?.files?.[0];
    if ( !file ) return;

    if ( file.size >= 2 * 1024 * 1024 ) {
        message.warning( "不能上传超过 2MB 的图片" );
        return;
    }

    if ( file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg" ) {
        message.warning( "只能上传 png, jpg, jpeg 格式的图片" );
        return;
    }

    const tempUrl = createBlob( file );
    message.success( "上传成功" );
    // @ts-ignore
    src.value = tempUrl;
}

const blobList: string[] = [];
function createBlob( file: File ) {
    const url = URL.createObjectURL( file );
    blobList.push( url );
    return url;
}

onBeforeUnmount( () => {
    blobList.forEach( URL.revokeObjectURL );
} );
</script>

<template>
    <div class="avatar-upload">
        <n-image :src preview-disabled object-fit="cover" :img-props="{ draggable: false }" />
        <div class="edit-icon" @click="openUpload">
            <n-icon color="#fff" size="24">
                <Pencil />
            </n-icon>
        </div>
        <input ref="uploadEl" type="file" accept=".png, .jpg, .jpeg" hidden @change="handleUpload" />
    </div>
</template>

<style scoped lang="scss">
.avatar-upload {
    position: relative;
    line-height: 0;

    .n-image {
        width: 96px;
        height: 96px;
        border-radius: 50%;

        :deep(img) {
            width: 100%;
        }
    }

    .edit-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 24px;
        height: 24px;
        padding: 8px;
        background-color: rgba(0, 0, 0, 0.32);
        border-radius: 50%;
        transition: opacity 0.3s;
        cursor: pointer;
    }
}
</style>