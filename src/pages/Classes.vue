<script setup lang="ts">
    import { supabase } from '../util/supabase';

    const classes = await supabase.from('classes').select('*');
    classes;
</script>
<template>
    <div class="flex flex-col items-center p-2">
        <div class="max-w-6xl flex-grow">
            <h1 class="text-2xl">Classes</h1>


        </div>
    </div>
</template>