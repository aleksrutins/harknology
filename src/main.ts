import { createApp } from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './pages/Home.vue'
import Classes from './pages/Classes.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'home', component: Home },
    { path: '/classes', name: 'classes', component: Classes }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app')
