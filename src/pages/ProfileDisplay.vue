<script setup lang="ts">
    import { authRef, signOut } from '../util/supabase.js';
</script>

<template>
    <div class="flex flex-col items-center p-2" v-if="authRef">
        <h1 class="text-xl">{{ authRef.user.email }}</h1>
        <button class="border hover:shadow-sm rounded px-2 py-1" @click="signOut()">Sign Out</button>
    </div>
</template>