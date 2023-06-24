import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Dashboard from '../pages/Dashboard.vue'
import Event from '../pages/Event.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/event/:id',
        name: 'Event',
        component: Event,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
