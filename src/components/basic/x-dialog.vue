<script setup lang="ts">
import { ref } from 'vue';

    defineProps<{
        open: boolean,
        modal: boolean,
        title?: string
    }>()

    const dialog = ref<HTMLDialogElement>(null!)
</script>

<template>
    <div v-if="modal" class="absolute top-0 left-0 w-screen h-screen flex justify-center items-center pointer-events-none">
        <div v-if="open" class="absolute top-0 left-0 w-screen h-screen bg-gray-100/50 backdrop-blur-md"></div>
        <dialog class="rounded-lg bg-white shadow p-4 pointer-events-auto" ref="dialog" :open="open">
            <h1 class="text-lg font-semibold text-center" v-if="title">{{ title }}</h1>
            <slot></slot>
        </dialog>
    </div>
</template>