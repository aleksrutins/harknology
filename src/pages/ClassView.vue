<script setup lang="ts">
    import { supabase } from '../util/supabase';
    import UserDisplay from '../components/UserDisplay';
import { ref } from 'vue';
import { TrashIcon, UserPlusIcon } from '@heroicons/vue/24/outline';

    const props = defineProps<{
                id: string
            }>()

        , data = (await supabase.from('classes')
                               .select()
                               .eq('id', props.id)).data?.[0]

        , discussions = ref((await supabase.from('discussions')
                                       .select()
                                       .eq('class_id', props.id)).data)

        , addDiscussionName = ref("")
        , addDiscussionDesc = ref("")


    async function getDiscussions() {
        discussions.value = (await supabase.from('discussions')
                                       .select()
                                       .eq('class_id', props.id)).data
    }

    async function addDiscussion() {
        await supabase.from('discussions').insert({
            class_id: props.id,
            name: addDiscussionName.value,
            description: addDiscussionDesc.value
        });
        addDiscussionName.value = ""
        addDiscussionDesc.value = ""
        await getDiscussions()
    }
</script>

<template>
    <div class="flex h-full flex-col items-center">
        <div v-if="data" class="flex flex-col p-3 max-w-6xl items-center">
            <div class="absolute top-3 right-3 flex flex-col">
                <button class="bg-green-500 hover:shadow-sm shadow-green-300 text-white p-2 rounded">
                    <UserPlusIcon class="h-6 w-6"/>
                </button>
                <button class="bg-red-500 mt-2 hover:shadow-sm shadow-red-300 text-white p-2 rounded">
                    <TrashIcon class="h-6 w-6"/>
                </button>
            </div>

            <h1 class="font-bold text-2xl">{{ data.name }}</h1>
            <UserDisplay :uid="data.teacher_id"/>
            <p class="mt-3">{{ data.description }}</p>

            <div class="mt-3 flex-col w-full">
                <h2 class="block font-semibold text-xl">Discussions</h2>
                <div class="flex flex-col sm:flex-row sm:flex-wrap justify-start">
                    <x-card v-for="discussion in discussions" :key="discussion.id">
                        <h3 class="text-lg">{{ discussion.name }}</h3>
                        <p>{{ discussion.description }}</p>
                    </x-card>

                    <a class="border border-dashed hover:border-solid p-3 m-3 rounded flex flex-col justify-center items-stretch transition-all sm:w-80">
                        <input type="text" class="border shadow-sm rounded block mb-2 p-2 text-lg" placeholder="Discussion Name" v-model="addDiscussionName">
                        <textarea class="border shadow-sm rounded block mb-2 p-2" placeholder="Discussion description" v-model="addDiscussionDesc"></textarea>
                        <button class="cursor-pointer border rounded hover:bg-gray-100 py-1 px-2 transition-all self-center" @click="addDiscussion()">Add Discussion</button>
                    </a>
                </div>
            </div>
        </div>
        <div v-else class="flex h-full items-center justify-center">
            <h1 class="text-xl font-bold">Error: not authorized</h1>
        </div>
    </div>
</template>