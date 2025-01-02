<script setup lang="ts">
const curState = defineModel<number>();

const searchBtnList = [
    {
        name: "按最新排序",
        value: 0
    },
    {
        name: "按旧排序",
        value: 1
    }
];
</script>

<template>
    <section class="top-search">
        <p
                v-for="btn of searchBtnList"
                class="search-btn"
                :class="{ active: curState === btn.value }"
                @click="curState = btn.value"
        >{{ btn.name }}</p>
    </section>
</template>

<style scoped lang="scss">
.top-search {
    display: flex;
    align-items: center;
    column-gap: 5px;

    .search-btn {
        padding: 0 24px;
        font-size: 14px;
        line-height: 40px;
        font-weight: bold;
        border-radius: 20px;
        cursor: pointer;
        user-select: none;
        color: #858585;
        transition: all 0.2s;

        &:hover {
            color: #474747;
        }

        &.active {
            color: #474747;
            background-color: rgba(0, 0, 0, 0.04);
        }
    }
}
</style>