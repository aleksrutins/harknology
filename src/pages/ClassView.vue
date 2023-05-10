<script setup lang="ts">
    import { supabase } from '../util/supabase';

    const props = defineProps<{
        id: string
    }>()

    const data = (await supabase.from('classes')
                               .select()
                               .eq('id', props.id)).data;
</script>

<template>
    <div v-if="data" class="">

    </div>
    <div v-else class="flex h-full items-center justify-center">
        <h1 class="text-xl font-bold">Error: not authorized</h1>
    </div>
</template>