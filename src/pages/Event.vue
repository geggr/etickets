<template>
    <logged-header />

    <container class="mt-4">
        <div class="event-banner block w-full h-60 rounded-3xl" :style="{ backgroundImage: banner }"></div>
        <h1 class="font-display text-3xl">{{ event.title }}</h1>
        <p class="mt-8 text-lg max-w-3xl">
            {{ event.description }}
        </p>
    </container>

    <container class="mt-10">
        <h2 class="font-display text-5xl">Ingressos</h2>
        <div>
        </div>
    </container>


    <container class="mt-10">
        <table class="table-auto w-full">
            <thead>
                <tr class="text-left">
                    <th>Lugar</th>
                    <th>Data</th>
                    <th>Setor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(ticket, index) in event.tickets" :key="index">
                    <td>{{ ticket.country }}</td>
                    <td>{{ formatter.format(ticket.date) }}</td>
                    <td>{{ ticket.sector }}</td>
                    <td>
                        <button @click="buildTradeModal(ticket)"
                            class="px-8 py-4 rounded-md bg-green-700 font-bold text-white">Trocar Ingresso</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </container>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useModal } from 'vue-final-modal';

import state from '../store/user';

import Container from '../components/Container.vue';
import LoggedHeader from '../components/Header.vue'
import TradeTicketModal from '../components/modals/TradeTicketModal.vue';
import FakeImageHttpClient from '../http/FakeImageHttpClient';

import TicketService from '../services/TicketService'

const { id } = defineProps(['id'])

const service = new TicketService()
const route = useRoute()
const kind = route.query.kind

const event = ref({})
const selected = ref({})

const userTickets = state.tickets

const banner = `url(/src/assets/banners/${FakeImageHttpClient.findByKind(kind).banner}`

const formatter = new Intl.DateTimeFormat('pt-BR', { 'day': '2-digit', 'month': 'long', year: 'numeric' })

onMounted(async () => {
    const response = await service.loadEvent()
    event.value = response
})

const { open, close } = useModal({
    component: TradeTicketModal,
    attrs: {
        tickets: userTickets,
        selected,
        onCancel() {
            close()
        },
        onConfirm(ticketSelectedForTrade) {
            setTimeout(() => close(), 5000)
        }
    }
})

function buildTradeModal(ticket) {
    selected.value = ticket
    open()
}

</script>

<style scoped>
.event-banner {
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
}
</style>
