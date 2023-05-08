<script setup lang="ts">
    import { VNode } from 'vue';
    import { supabase, signInWithGoogle } from '../util/supabase';
    import { IconBrandGoogle } from '@tabler/icons-vue';

    const props = defineProps<{
        is: VNode
    }>();
    
    const uid = (await supabase.from('auth.users').select('user_id')).data?.[0].user_id as string | null | undefined

    const signIn = () => {
        signInWithGoogle();
    }
</script>

<template>
    <component :is="props.is" v-if="uid"/>
    <div class="absolute top-0 left-0 w-screen h-screen bg-gray-100/50 backdrop-blur flex justify-center items-center" v-else>
        <div class="bg-white rounded-lg p-10 shadow flex flex-col items-center">
            <h1 class="text-2xl pb-2">Please Log In</h1>
            <button class="cursor-pointer rounded border flex flex-row p-2" @click="signIn()">
                <IconBrandGoogle class="pr-2"/>
                Sign In with Google
            </button>
        </div>
    </div>
</template>