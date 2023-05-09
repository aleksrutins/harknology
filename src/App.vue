<script setup lang="ts">
import { HomeIcon, AcademicCapIcon } from '@heroicons/vue/24/outline'
import { HomeIcon as HomeSolid, AcademicCapIcon as AcademicSolid } from '@heroicons/vue/24/solid'
import LoadingIndicator from './components/LoadingIndicator.vue';
import EnsureAuth from './components/EnsureAuth.vue';
import ProfileDisplay from './components/ProfileDisplay.vue';
const routes = [
  { path: '/', name: 'home', icon: [HomeIcon, HomeSolid], title: 'Home' },
  { path: '/classes', name: 'classes', icon: [AcademicCapIcon, AcademicSolid], title: 'Classes' }
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
              <component v-bind:is="$route.matched.some(({ name }) => name == route.name) ? route.icon[1] : route.icon[0]" style="width: 20px;" />
              <p class="pl-2">
                {{ route.title }}
              </p>
            </router-link>
          </div>
          <div class="flex flex-col">
            <Suspense>
              <ProfileDisplay/>
            </Suspense>
          </div>
        </div>
        <div class="flex-grow">
          <Suspense>
            <EnsureAuth :is="Component"/>
            <template #fallback>
              <LoadingIndicator border-color="black" center/>
            </template>
          </Suspense>
        </div>
      </div>
    </Transition>
  </router-view>
</template>