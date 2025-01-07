<script setup lang="ts">
import { useMessage } from "naive-ui";
import { computed, onBeforeUnmount, type Ref, ref } from "vue";

defineSlots<{
    trigger( props: {
        src: string,
        openUpload: () => void,
    } ): any;
}>();

const src = defineModel<string>( "src", { required: true } );

const props = withDefaults( defineProps<{
    // 单位 MB
    sizeLimit?: number;
    accept?: string | string[];
}>(), {
    sizeLimit: 2,
    accept: () => [ ".png", ".jpg", ".jpeg" ]
} );

const fileAccept = computed( () => {
    if ( Array.isArray( props.accept ) ) {
        return props.accept.join( ", " );
    }
    return props.accept;
} );

const message = useMessage();
const uploadEl = ref<HTMLInputElement | null>( null );


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
        message.warning( `只能上传 ${ fileAccept.value } 格式的图片` );
        return;
    }

    const tempUrl = createBlob( file );
    message.success( "上传成功" );
    src.value = <any>tempUrl;
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
    <slot name="trigger" :src="src" :openUpload="openUpload"></slot>
    <input ref="uploadEl" type="file" :accept="fileAccept" hidden @change="handleUpload" />
</template>

<style scoped lang="scss">
</style>