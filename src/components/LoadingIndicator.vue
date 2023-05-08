<script setup lang="ts">
    const props = defineProps<{
        center?: boolean,
        pad?: boolean,
        borderColor: 'white' | 'black'
    }>()
</script>

<template>
    <span :class="['loading-indicator', props.center && 'center', props.pad && 'relative', props.pad && 'top-3']" :style="{ borderColor: props.borderColor }">
        <span class="loading-indicator-center" :style="{ borderColor: props.borderColor }"></span>
    </span>
</template>

<style>
.loading-indicator {
    display: flex;
    border: 2px solid white;
    border-radius: 30%;
    height: 32px;
    width: 32px;
    animation: loading 1s linear 0s infinite;
    animation-play-state: running;
    justify-self: center;
    align-self: center;
    justify-content: center;
    align-items: center;
}

.loading-indicator-center {
    display: block;
    border: 2px solid white;
    border-radius: 30%;
    height: 16px;
    width: 16px;
    animation: loading 1s reverse 0s infinite;
    animation-play-state: running;
    justify-self: center;
    align-self: center;
}

.center {
    margin: auto;
}

@keyframes loading {
    0% {
        transform: rotate(0deg)
    }
    /* 25% {
        transform: rotate(120deg)
    }
    50% {
        transform: rotate(180deg)
    }
    75% {
        transform: rotate(270deg);
    } */
    100% {
        transform: rotate(360deg);
    }
}
</style>