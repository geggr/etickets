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

            <div class="flex flex-wrap gap-x-8 gap-y-10 mt-8">
                <event-card v-for="(ticket, index) in state.numberOfTickets" :index="ticket.id" :title="ticket.title"
                    :date="ticket.date" :vertical="false" />
            </div>


            <div class="mt-10">

                <div class="flex justify-between">
                    <h2 class="text-3xl uppercase font-display text-brand-primary max-w-xs">Próximos Eventos</h2>
                    <input type="search"
                        class="w-full block text-white bg-brand-secondary rounded-md placeholder:text-white p-5"
                        placeholder="Procure aqui..." v-model="search" />
                </div>

                <events-card-container>
                    <event-card vertical v-for="(ticket, index) in state.numberOfSearch" :key="ticket.id"
                        :title="ticket.title" :date="ticket.date" v-show="ticket.visible" />
                </events-card-container>

            </div>


            <div class="mt-10">
                <h2 class="text-3xl uppercase font-display text-brand-primary">Pensados em você</h2>
                <events-card-container>
                    <event-card vertical v-for="(ticket, index) in state.numberOfTicketsForYou" :key="ticket.id"
                        :title="ticket.title" :date="ticket.date" />
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
import { reactive } from 'vue';
import { onMounted } from 'vue';
import FakeHTTPClient from '../http/FakeHTTPClient';
import { watch } from 'vue';

const visible = ref(false)
const search = ref("")



const state = reactive({
    numberOfTickets: [],
    numberOfSearch: [],
    numberOfTicketsForYou: []
})

onMounted(async () => {
    const response = await FakeHTTPClient.dashboard()

    state.numberOfTickets = response.tickets
    state.numberOfSearch = response.latest.map(it => ({ ...it, visible: true }))
    state.numberOfTicketsForYou = response.selecteds
})

watch(search, (current, _) => {
    if (current === "") {
        state.numberOfSearch.forEach(it => it.visible = true)
        return
    }

    state.numberOfSearch.forEach(it => {
        const shouldShowEvent = it.title.toUpperCase().includes(current.toUpperCase())
        it.visible = shouldShowEvent
    })
})

const { open, close } = useModal({
    component: RegisterTicketModal,
    attrs: {
        async onSubmit(ticket) {
            state.numberOfTickets.push(ticket)
            close()
        }
    }
})

</script>