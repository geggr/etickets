<template>
    <div class="landing-banner h-[500px]">
        <container class="flex flex-col justify-center items-center gap-y-8 h-full">
            <h1 class="font-display text-5xl text-white text-center uppercase max-w-4xl">Não perca o <strong
                    class="text-brand-accent">evento</strong> dos seus sonhos</h1>
            <h2 class="font-sans text-white text-3xl max-w-2xl text-center">
                entre para a plataforma de troca de tickets instantâneo e viva os melhores momentos
            </h2>
            <router-link to="/dashboard"
                class="bg-[#A32FFF] text-white font-display text-3xl rounded-md py-4 w-1/6 text-center">Entrar</router-link>
        </container>
    </div>

    <container class="mt-16">
        <h3 class="text-4xl font-display">Próximos Eventos</h3>
        <ul class="flex flex-wrap gap-x-16 gap-y-16 mt-10">
            <event-card v-for="(_, index) in numberOfCards" :key="index" title="Coldplay: Music of Spheres"
                date="04/10/2023" />
        </ul>
        <router-link to="/dashboard"
            class="mt-6 block bg-brand-secondary text-white font-display text-3xl rounded-md py-4 w-1/2 text-center mx-auto">Conhecer
            a Plataforma</router-link>
    </container>

    <div class="mt-10 bg-brand-secondary mb-10">
        <container class="landing-cta h-60 flex items-center">
            <h4 class="text-5xl uppercase font-bold text-white inline-block text-center">Cadastrou <br /> Trocou <br />
                Aproveitou </h4>
        </container>
    </div>
</template>

<script setup>
import Container from '../components/Container.vue';
import EventCard from '../components/EventCard.vue';

const numberOfCards = new Array(6)
</script>

<style scoped>
.landing-banner {
    background-size: 300px 100%;
    background-image: url("../assets/landing-page/landing-banner.jpg");
    background-size: cover;
}

.landing-cta {
    background-size: 640px 100%;
    background-image: url("../assets/landing-page/landing-cta.png");
    background-position: top 0 right 0;
    background-repeat: no-repeat;
}
</style>