<script setup lang="ts">
import { NModal, NIcon, NButton, NSpin } from "naive-ui";
import { computed } from "vue";
import { Close } from "@vicons/ionicons5";

const props = withDefaults( defineProps<{
    title: string;
    width?: number | string;
    customClass?: string;
    loading?: boolean;
}>(), {
    title: "",
    width: "50%",
    loading: false
} );

const emits = defineEmits<{
    confirm: [ cancel: () => void ];
}>();

const show = defineModel( "show" );

const baseStyle = computed( () => {
    const width = props.width;
    return {
        width: typeof width === "number" ? `${ width }px` : width
    }
} );

async function confirm() {
    emits( "confirm" );
}

</script>

<template>
    <n-modal v-model:show="show">
        <n-spin :show="loading" class="edit-dialog" :class="[customClass]" :style="baseStyle">
            <header class="dialog-header">
                <h3 class="dialog-title overflow-ellipsis">{{ title }}</h3>
                <n-icon class="dialog-close" size="24" color="#adadad" @click="show = false">
                    <close />
                </n-icon>
            </header>
            <main class="dialog-content">
                <slot></slot>
            </main>
            <footer class="dialog-footer">
                <n-button type="info" round @click="confirm">确定</n-button>
                <n-button secondary round @click="show = false">取消</n-button>
            </footer>
        </n-spin>
    </n-modal>
</template>

<style scoped lang="scss">
.edit-dialog {
    border-radius: 24px;
    background-color: #fff;

    .dialog-header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
    }

    .dialog-content {
        min-height: 150px;
    }

    .dialog-footer {
        display: flex;
        justify-content: center;
        gap: 16px;
        padding: 24px 0;
    }
}

.dialog-header {
    .dialog-title {
        max-width: 80%;
        font-size: 16px;
        line-height: 24px;
        font-weight: bold;
        text-align: center;
        color: #1f1f1f;
    }

    .dialog-close {
        position: absolute;
        right: 12px;
        top: 12px;
        cursor: pointer;
    }
}

.dialog-footer {
    .n-button {
        max-width: 300px;
        width: 40%;
        font-weight: 700;
    }
}
</style>