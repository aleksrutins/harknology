<script setup lang="ts">
import { HomeIcon, AcademicCapIcon } from '@heroicons/vue/20/solid'
import LoadingIndicator from './components/LoadingIndicator.vue';
const routes = [
  { path: '/', icon: HomeIcon, title: 'Home' },
  { path: '/classes', icon: AcademicCapIcon, title: 'Classes' }
];
</script>
<template>
  <router-view v-slot="{ Component }">
    <Transition mode="out-in">
      <div class="w-screen h-screen flex flex-row">
        <div class="flex-shrink h-screen bg-gray-100 flex flex-col justify-between p-4">
          <div class="flex flex-col">
            <router-link v-for="route in routes" v-bind:to="route.path"
              class="rounded-lg flex flex-row items-center py-3 px-4 m-2 hover:bg-gray-300 transition">
              <component v-bind:is="route.icon" style="width: 20px;" />
              <p class="pl-2">
                {{ route.title }}
              </p>
            </router-link>
          </div>
          <div></div>
        </div>
        <div class="flex-grow">
          <Suspense>
            <component v-bind:is="Component"/>
            <template #fallback>
              <LoadingIndicator border-color="black"/>
            </template>
          </Suspense>
        </div>
      </div>
    </Transition>
  </router-view>
</template>