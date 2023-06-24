<template>
    <div class="landing-banner h-[500px]">
        <container class="flex flex-col justify-center items-center gap-y-8 h-full">
            <h1 class="font-display text-5xl text-white text-center uppercase max-w-4xl">Não perca o <strong
                    class="text-brand-accent">evento</strong> dos seus sonhos</h1>
            <h2 class="font-sans text-white text-3xl max-w-2xl text-center">
                entre para a plataforma de troca de tickets instantâneo e viva os melhores momentos
            </h2>
            <button @click="open"
                class="bg-[#A32FFF] text-white font-display text-3xl rounded-md py-4 w-1/6 text-center">Entrar</button>
        </container>
    </div>

    <container class="mt-16">
        <h3 class="text-4xl font-display">Próximos Eventos</h3>
        <ul class="flex flex-wrap gap-x-16 gap-y-16 mt-10">
            <event-card v-for="(_, index) in numberOfCards" :key="index" title="Evento " :date="new Date('04-04-2023')" />
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
import { useModal } from 'vue-final-modal';

import Container from '../components/Container.vue';
import EventCard from '../components/EventCard.vue';
import LoginModal from '../components/modals/LoginModal.vue';
import { useRouter } from 'vue-router';
import { setCurrentUser } from '../store/user';

const numberOfCards = new Array(6)

const router = useRouter();

const { open, close } = useModal({
    component: LoginModal,
    attrs: {
        async onSubmit({ email }) {
            setCurrentUser({
                email,
                photo: 'https://randomuser.me/api/portraits/men/68.jpg'
            })

            router.push({ name: 'Dashboard' })
            close()
        }
    }
})
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
