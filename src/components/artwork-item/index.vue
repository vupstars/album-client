<script setup lang="ts">
import { NImage } from "naive-ui";
import testImage from "@/assets/image/test-image.jpg";
import testAvatar from "@/assets/image/avatar.jpg";
</script>

<template>
    <section class="artwork-item">
        <router-link to="/artwork/114514" custom v-slot="{ navigate }">
            <n-image
                    class="artwork-image"
                    :src="testImage"
                    object-fit="cover"
                    :img-props="{ draggable: false }"
                    @click="navigate"
            ></n-image>
        </router-link>
        <router-link class="title overflow-ellipsis" to="/artwork/114514">汐之宫 璃贝</router-link>
        <aside class="author">
            <router-link to="/user/home" custom v-slot="{ navigate }">
                <n-image class="avatar" :src="testAvatar" preview-disabled :img-props="{ draggable: false }" @click="navigate"/>
            </router-link>
            <router-link class="name overflow-ellipsis" to="/user/home">username</router-link>
        </aside>
    </section>
</template>

<style scoped lang="scss">
.artwork-item {
    --item-width: 184px;
    display: grid;
    grid-template-columns: auto;
    row-gap: 8px;
    width: var(--item-width);

    .artwork-image {
        width: var(--item-width);
        height: var(--item-width);
        border-radius: 4px;
        background-color: #fafafa;

        :deep(img) {
            width: 100%;
        }
    }

    .title {
        display: block;
        line-height: 22px;
        font-size: 14px;
        font-weight: bold;
        color: #1F1F1F;
    }

    .author {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 4px;

        .avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
        }

        .name {
            min-width: 0;
            line-height: 22px;
            font-size: 14px;
            color: #474747;
        }
    }
}
</style>