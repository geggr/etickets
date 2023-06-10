<template>
    <header class="bg-brand-secondary text-white h-20 w-full">
        <container class="h-full">
            <nav class="h-full w-full flex items-center justify-end gap-x-20 text-lg">
                <router-link class="py-2 px-4 bg-brand-main rounded-md" to="/dashboard"> Dashboard
                </router-link>
                <router-link class="py-2 px-4 bg-brand-main rounded-md" to="/"> Sair </router-link>
            </nav>
        </container>
    </header>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import Container from './Container.vue';
</script>