<script setup lang="ts">
    import { ref } from 'vue';
    import { supabase } from '../util/supabase';

    const classes = ref((await supabase.from('classes').select()).data ?? [])

    const addClassName = ref("My Class")
    const addClassDesc = ref("This is a class about learning things.")

    async function getClasses() {
        classes.value = (await supabase.from('classes').select()).data ?? [];
    }

    async function addClass() {
        await supabase.rpc('create_class', {name: addClassName.value, description: addClassDesc.value});
        await getClasses();
    }
</script>
<template>
    <div class="flex flex-col items-center p-2">
        <div class="max-w-6xl flex-grow">
            <h1 class="text-2xl">Classes</h1>

            <div class="flex flex-row flex-wrap">
                <a class="cursor-pointer border hover:shadow p-3 m-3 rounded flex flex-col" v-for="classData in classes">
                    <h2 class="text-lg">{{ classData.name }}</h2>
                    <p>{{ classData.description }}</p>
                </a>
                <a class="border border-dashed hover:shadow p-3 m-3 rounded flex flex-col justify-center items-center">
                    <input type="text" class="border shadow-sm rounded block" placeholder="Class Name" v-model="addClassName">
                    <textarea class="border shadow-sm rounded block" placeholder="Class Description" v-model="addClassDesc"></textarea>
                    <button class="cursor-pointer border hover:border-gray-900 p-1" @click="addClass()">Add Class</button>
                </a>
            </div>
        </div>
    </div>
</template>