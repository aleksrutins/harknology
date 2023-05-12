<script setup lang="ts">
    import UserDisplay from './UserDisplay';

    defineProps<{
        response: {
            content: string;
            discussion_id: string | null;
            id: string;
            user_id: string | null;
        }
    }>();
</script>

<template>
    <div>
        <UserDisplay :uid="response.user_id"/>

        <p>{{ response.content }}</p>
    </div>
</template>