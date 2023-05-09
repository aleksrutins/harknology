import { createApp } from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'home', component: () => import('./pages/Home.vue') },
    { path: '/classes', name: 'classes', component: () => import('./pages/Classes.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app')
