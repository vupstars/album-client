<script setup lang="ts">
import { NScrollbar, NImage } from "naive-ui";
import testImage from "@/assets/image/test-image.jpg";
import testAvatar from "@/assets/image/avatar.jpg";

const tabList = Array.from( { length: 15 }, ( _, index ) => ( {
    name: `标签${ index }`,
    value: index
} ) );

defineOptions( {
    name: "WorkDetail"
} );
</script>

<template>
<div class="work-detail">
    <n-scrollbar content-class="abc">
        <div class="details-content">
            <section class="image-box">
                <n-image :src="testImage" object-fit="contain" :img-props="{ draggable: false }"></n-image>
                <section class="img-info">
                    <p class="title">汐之宫 璃贝</p>
                    <p class="desc">测试</p>
                    <p class="tab">
                        <router-link v-for="tab of tabList" :to="'/tag/' + tab.value">#{{ tab.name }}</router-link>
                    </p>
                    <p class="time">2025年1月2日 上午5点26分</p>
                </section>
            </section>
            <aside class="author-box">
                <section class="author-info">
                    <router-link to="/user/home" custom v-slot="{ navigate }">
                        <n-image
                                class="avatar"
                                :src="testAvatar"
                                preview-disabled
                                :img-props="{ draggable: false }"
                                @click="navigate"
                        />
                    </router-link>
                    <router-link class="name" to="/user/home">username</router-link>
                </section>
            </aside>
        </div>
    </n-scrollbar>
</div>
</template>

<style scoped lang="scss">
.work-detail {
    height: 100%;
    background-color: #f5f5f5;

    .details-content {
        padding: 0 72px;
        margin: 24px auto;
        display: grid;
        grid-template-columns: 1fr 288px;
        column-gap: 24px;
        width: 1224px;
    }
}

.image-box {
    background-color: #fff;
    border-radius: 8px;

    .n-image {
        width: 100%;
        min-height: 300px;
        max-height: 800px;
        border-radius: 8px 8px 0 0;
        background-color: #fafafa;

        :deep(img) {
            width: 100%;
        }
    }

    .img-info {
        margin: 32px auto 48px;
        padding: 0 160px;
        display: grid;
        grid-template-columns: auto;
        row-gap: 16px;
        font-size: 14px;

        .title {
            color: #1f1f1f;
            font-size: 20px;
            line-height: 24px;
            font-weight: bold;
        }

        .desc {
            color: #474747;
            line-height: 1.33;
        }

        .tab {
            display: flex;
            flex-wrap: wrap;
            column-gap: 12px;
            color: #3D7699;

            > a {
                flex: none;
                white-space: nowrap;
            }
        }

        .time {
            color: #858585;
            font-size: 12px;
        }
    }
}

.author-box {
    padding: 16px 0;
    border-radius: 8px;

    .author-info {
        display: flex;
        align-items: center;
        column-gap: 8px;

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
        }

        .name {
            font-size: 16px;
            font-weight: 700;
            color: #1F1F1F;
        }
    }
}
</style>