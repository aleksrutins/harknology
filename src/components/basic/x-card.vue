<script setup lang="ts">
    import { VNode } from 'vue';

    const props = defineProps<{
        component?: VNode
    }>()
</script>
<template>
    <component :is="props.component ?? 'a'" class="cursor-pointer border hover:shadow p-3 m-3 rounded flex flex-col items-start transition-all sm:w-80">
        <slot></slot>
    </component>
</template>