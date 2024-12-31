<script setup lang="ts">
import { ref, watch } from "vue";

const props = withDefaults( defineProps<{
    imageList: string[];
    interval?: number;
}>(), {
    imageList: () => [],
    interval: 5000
} );

const curIndex = ref( 0 );
const timer = ref( 0 );

watch( () => [ props.imageList, props.interval ], () => {
    if ( props.imageList.length <= 1 ) {
        clearInterval( timer.value );
        return;
    }
    timer.value = setInterval( () => {
        const nextIndex = curIndex.value + 1;
        if ( nextIndex >= props.imageList.length ) {
            curIndex.value = 0;
        } else {
            curIndex.value = nextIndex;
        }
    }, props.interval );
}, { immediate: true } );
</script>

<template>
    <div class="bg-carousel">
        <div v-for="(image, index) of imageList" class="carousel-img" :class="{ active: curIndex === index }"
             :style="{backgroundColor: image}"></div>
    </div>
</template>

<style scoped lang="scss">
.bg-carousel {
    position: absolute;
    width: 100%;
    height: 100%;

    .carousel-img {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        object-fit: fill;
        transition: opacity .5s;

        &.active {
            opacity: 1;
        }
    }
}
</style>