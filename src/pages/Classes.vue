<script setup lang="ts">
    import { ref } from 'vue';
    import { supabase } from '../util/supabase';
    import UserDisplay from '../components/UserDisplay';
import { ellipsize } from '../util/ellipsize';
import { RouterLink } from 'vue-router';

    const classes = ref((await supabase.from('classes').select()).data ?? [])

    const addClassName = ref("")
    const addClassDesc = ref("")

    async function getClasses() {
        classes.value = (await supabase.from('classes').select()).data ?? [];
    }

    async function addClass() {
        await supabase.rpc('create_class', {name: addClassName.value, description: addClassDesc.value});
        addClassName.value = ""
        addClassDesc.value = ""
        await getClasses();
    }
</script>
<template>
    <div class="flex flex-col items-center p-3">
        <div class="max-w-6xl flex flex-col items-center flex-grow">
            <h1 class="text-2xl font-bold">Classes</h1>

            <div class="flex flex-col sm:flex-row sm:flex-wrap justify-start">
                <x-card :component="RouterLink" :to="`/classes/${classData.id}`" :key="classData.id" v-for="classData in classes">
                    <h2 class="text-lg">{{ classData.name }}</h2>
                    <UserDisplay :uid="classData.teacher_id ?? ''"/>
                    <p>{{ ellipsize(classData.description ?? '', 200) }}</p>
                </x-card>
                <a class="border border-dashed hover:border-solid p-3 m-3 rounded flex flex-col justify-center items-stretch transition-all sm:w-80">
                    <input type="text" class="border shadow-sm rounded block mb-2 p-2 text-lg" placeholder="Class Name" v-model="addClassName">
                    <textarea class="border shadow-sm rounded block mb-2 p-2" placeholder="Class description" v-model="addClassDesc"></textarea>
                    <button class="cursor-pointer border rounded hover:bg-gray-100 py-1 px-2 transition-all self-center" @click="addClass()">Add Class</button>
                </a>
            </div>
        </div>
    </div>
</template>