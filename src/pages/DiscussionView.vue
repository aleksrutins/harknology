<script setup lang="ts">
    import { ref } from 'vue';
    import { supabase } from '../util/supabase';
    import ResponseDisplay from '../components/ResponseDisplay.vue';

    const props = defineProps<{
            id: string
        }>()
        
        , data = (await supabase.from('discussions').select().eq('id', props.id)).data?.[0] ?? null
                
        , responses = ref((await supabase.from('responses').select().eq('discussion_id', props.id)).data)

    // async function getResponses() {
    //     responses.value = (await supabase.from('responses').select().eq('discussion_id', props.id)).data
    // }

</script>
<template>
    <div class="flex h-full flex-col items-center">
        <div v-if="data" class="flex flex-col p-3 max-w-6xl items-center">
            <h1 class="font-bold text-2xl">{{ data.name }}</h1>
            <p class="mt-3">{{ data.description }}</p>

            <div class="mt-2">
                <ResponseDisplay v-for="response in responses" :response="response"/>
            </div>
        </div>
        <div v-else class="flex h-full items-center justify-center">
            <h1 class="text-xl font-bold">Error: not authorized</h1>
        </div>
    </div>
</template>