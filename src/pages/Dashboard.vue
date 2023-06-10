<template>
    <logged-header />
    <section class="mt-10">
        <container>
            <div class="flex gap-x-5 items-center">
                <h1 class="text-2xl text-brand-secondary font-bold">Meus Ingressos</h1>
                <confetti v-if="visible" />
                <button @click="open"
                    class="flex items-center justify-center text-white bg-brand-secondary rounded-full w-8 h-8 text-2xl">+</button>
            </div>


            <div class="flex gap-x-8 mt-8">
                <event-card v-for="(_, index) in numberOfTickets" :index="index" title="ColdPlay: Music of Spheres"
                    date="10/10/2022" :vertical="false" />
            </div>


            <div class="mt-10">

                <div class="flex justify-between">
                    <h2 class="text-3xl uppercase font-display text-brand-primary max-w-xs">Próximos Eventos</h2>
                    <input type="search"
                        class="w-full block text-white bg-brand-secondary rounded-md placeholder:text-white p-5"
                        placeholder="Procure aqui..." />
                </div>

                <events-card-container>
                    <event-card vertical v-for="(_, index) in numberOfSearch" :key="index"
                        title="ColdPlay: Music of Spheres" date="10/10/2022" />
                </events-card-container>

            </div>


            <div class="mt-10">
                <h2 class="text-3xl uppercase font-display text-brand-primary">Pensados em você</h2>
                <events-card-container>
                    <event-card vertical v-for="(_, index) in numberOfTicketsForYou" :key="index"
                        title="ColdPlay: Music of Spheres" date="10/10/2022" />
                </events-card-container>
            </div>
        </container>


    </section>
</template>

<script setup>
import Confetti from 'vue-confetti-explosion'
import { useModal } from 'vue-final-modal';
import RegisterTicketModal from '../components/modals/RegisterTicketModal.vue'
import Container from '../components/Container.vue';
import EventCard from '../components/EventCard.vue';
import LoggedHeader from '../components/Header.vue'
import EventsCardContainer from '../components/EventsCardContainer.vue';
import { ref } from 'vue';
import { nextTick } from 'vue';

const visible = ref(false)

const { open, close } = useModal({
    component: RegisterTicketModal,
    attrs: {
        async onSubmit(data) {
            visible.value = false
            await nextTick()
            visible.value = true
        }
    }
})

const numberOfTickets = Array(2)

const numberOfSearch = Array(6)

const numberOfTicketsForYou = Array(5)

</script>