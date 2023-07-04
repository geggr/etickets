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
                <event-card v-for="(ticket, index) in state.tickets"
                            :index="ticket.id"
                            :title="ticket.event"
                            :location="ticket.location"
                            :image="ticket.image"
                            :date="ticket.datetime"
                            :vertical="false" />
            </div>

            <div class="mt-10">

                <div class="flex justify-between">
                    <h2 class="text-3xl uppercase font-display text-brand-primary max-w-xs">Próximos Eventos</h2>
                    <input type="search"
                           class="w-full block text-white bg-brand-secondary rounded-md placeholder:text-white p-5"
                           placeholder="Procure aqui..."
                           v-model="search" />
                </div>

                <events-card-container>
                    <event-card vertical
                                v-for="ticket in state.ticketsForSearch"
                                v-show="ticket.visible"
                                :key="ticket.id"
                                :title="ticket.event"
                                :location="ticket.location"
                                :date="ticket.date"
                                :image="ticket.image"
                                @click="routeToEventPage(ticket)" />
                </events-card-container>

            </div>


            <div class="mt-10">

                <div class="my-10"
                     v-for="kind in state.ticketsForUser">
                    <h2 class="text-3xl uppercase font-display text-brand-primary">Porque você tem <strong
                                class="text-2xl text-brand-main"> " {{ kind.name }} " </strong></h2>
                    <events-card-container>
                        <event-card vertical
                                    v-for="ticket in kind.items"
                                    :key="ticket.id"
                                    :title="ticket.event"
                                    :location="ticket.location"
                                    :sector="ticket.sector"
                                    :date="ticket.date"
                                    :image="ticket.image" />
                    </events-card-container>
                </div>


            </div>
        </container>


    </section>
</template>

<script setup>
import { ref, watch, reactive, onMounted } from 'vue';
import { useModal } from 'vue-final-modal';
import { useRouter } from 'vue-router';

import { setTickets, getCurrentUser, getCurrentUserEmail } from '../store/user';

import Confetti from 'vue-confetti-explosion'
import LoggedHeader from '../components/Header.vue'
import Container from '../components/Container.vue';
import EventCard from '../components/EventCard.vue';
import EventsCardContainer from '../components/EventsCardContainer.vue';

import RegisterTicketModal from '../components/modals/RegisterTicketModal.vue'

import TicketService from '../services/TicketService'

const router = useRouter()
const service = new TicketService()

const visible = ref(false)
const search = ref("")

const state = reactive({
    tickets: [],
    ticketsForSearch: [],
    ticketsForUser: []
})

function routeToEventPage(ticket) {
    router.push({
        name: 'Event',
        params: {
            id: ticket.uid,
        },
        query: {
            name: ticket.event,
            kind: ticket.image.kind
        },
    })
}

onMounted(async () => {
    const response = await service.buildDashboardForUser(getCurrentUserEmail())

    state.tickets = response.tickets
    state.ticketsForSearch = response.latest.map((it, i) => ({ ...it, visible: i < 6 }))
    state.ticketsForUser = response.selecteds

    setTickets(response.tickets)
})

watch(search, (current, _) => {
    if (current === "") {
        state.ticketsForSearch.forEach((it, i) => it.visible = i < 6)
        return
    }

    state.ticketsForSearch.forEach(it => {
        const shouldShowEvent = it.event.toUpperCase().includes(current.toUpperCase())
        it.visible = shouldShowEvent
    })
})

const { open, close } = useModal({
    component: RegisterTicketModal,
    attrs: {
        async onSubmit(ticket) {
            state.tickets.push(ticket)
            await service.registerTicket(getCurrentUserEmail(), ticket)
            close()
        }
    }
})

</script>
