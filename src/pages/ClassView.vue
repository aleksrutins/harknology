<script setup lang="ts">
    import { supabase } from '../util/supabase';

    const props = defineProps<{
        id: string
    }>()

    const data = (await supabase.from('classes')
                               .select()
                               .eq('id', props.id)).data?.[0];
</script>

<template>
    <div v-if="data" class="flex flex-col p-3 items-center">
        <h1 class="font-bold text-2xl">{{ data.name }}</h1>
        <p>{{ data.description }}</p>
    </div>
    <div v-else class="flex h-full items-center justify-center">
        <h1 class="text-xl font-bold">Error: not authorized</h1>
    </div>
</template>