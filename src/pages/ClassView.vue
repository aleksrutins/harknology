<script setup lang="ts">
    import { supabase } from '../util/supabase';
    import UserDisplay from '../components/UserDisplay';

    const props = defineProps<{
        id: string
    }>()

    const data = (await supabase.from('classes')
                               .select()
                               .eq('id', props.id)).data?.[0];
</script>

<template>
    <div class="flex h-full flex-col items-center">
        <div v-if="data" class="flex flex-col p-3 max-w-6xl items-center">
            <h1 class="font-bold text-2xl">{{ data.name }}</h1>
            <UserDisplay :uid="data.teacher_id"/>
            <p class="mt-3">{{ data.description }}</p>
        </div>
        <div v-else class="flex h-full items-center justify-center">
            <h1 class="text-xl font-bold">Error: not authorized</h1>
        </div>
    </div>
</template>