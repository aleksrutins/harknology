<script setup lang="ts">
    import { authRef, signOut } from '../util/supabase';
</script>

<template>
    <div class="flex flex-col items-center" v-if="authRef">
        <p>{{ authRef.user.email }}</p>
        <button class="border hover:shadow-sm rounded px-2 py-1" @click="signOut()">Sign Out</button>
    </div>
</template>