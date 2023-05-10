<script setup lang="ts">
import { HomeIcon, AcademicCapIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { HomeIcon as HomeSolid, AcademicCapIcon as AcademicSolid, UserCircleIcon as UserCircleSolid } from '@heroicons/vue/24/solid'
import LoadingIndicator from './components/LoadingIndicator.vue';
import EnsureAuth from './components/EnsureAuth.vue';
const routes = [
  { path: '/', name: 'home', icon: [HomeIcon, HomeSolid], title: 'Home' },
  { path: '/classes', name: 'classes', icon: [AcademicCapIcon, AcademicSolid], title: 'Classes' }
];
</script>
<template>
  <router-view v-slot="{ Component }">
    <Transition mode="out-in">
      <div class="w-screen h-screen flex sm:flex-row flex-col-reverse justify-stretch">
        <div class="flex-shrink flex-grow-0 h-screen bg-gray-100 flex sm:flex-col flex-row justify-center sm:justify-between p-4" style="flex-basis: 0">
          <div class="flex flex-row sm:flex-col">
            <router-link v-for="route in routes" :key="route.name" v-bind:to="route.path"
              class="rounded-lg flex flex-col sm:flex-row items-center py-3 px-4 m-2 hover:bg-gray-300 transition">
              <component v-bind:is="$route.matched.some(({ name }) => name == route.name) ? route.icon[1] : route.icon[0]" style="width: 20px;" />
              <p class="sm:pl-2 text-sm sm:text-base">
                {{ route.title }}
              </p>
            </router-link>
          </div>
          <div class="flex flex-row sm:flex-col">
            <router-link to="/me"
              class="rounded-lg flex flex-col sm:flex-row items-center py-3 px-4 m-2 hover:bg-gray-300 transition">
              <UserCircleSolid v-if="$route.matched.some(({ name }) => name == 'me')" style="width: 20px;"/>
              <UserCircleIcon v-else style="width: 20px;"/>
              <p class="sm:pl-2 text-sm sm:text-base">
                Profile
              </p>
            </router-link>
          </div>
        </div>
        <div class="flex-grow overflow-scroll">
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