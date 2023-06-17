<template>
    <logged-header />

    <container class="mt-4">
        <div class="event-banner block w-full h-60 rounded-3xl"></div>
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
import { reactive, ref } from 'vue';
import Container from '../components/Container.vue';
import LoggedHeader from '../components/Header.vue'
import TradeTicketModal from '../components/modals/TradeTicketModal.vue';
import { useModal } from 'vue-final-modal';

const { id } = defineProps([
    'id'
])
const selected = reactive({
    ticket: {}
})

const userTickets = [
    { country: 'Brazil', date: new Date('11-11-2021'), sector: 'Pista Premium' },
    { country: 'Brazil', date: new Date('11-12-2021'), sector: 'Pista' },
    { country: 'Brazil', date: new Date('11-13-2021'), sector: 'Cadeira' },
]

const event = {
    title: 'Coldplay: Music of Spheres',
    description: `
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    `,
    tickets: [
        { id: 1, country: 'Brazil', date: new Date('11-11-2021'), sector: 'Pista Premium' },
        { id: 2, country: 'Brazil', date: new Date('11-11-2021'), sector: 'Cadeira Inferior' },
        { id: 3, country: 'Brazil', date: new Date('11-11-2021'), sector: 'Cadeira Superior' },
        { id: 4, country: 'Brazil', date: new Date('11-11-2021'), sector: 'Pista' },
        { id: 5, country: 'Brazil', date: new Date('11-19-2021'), sector: 'Pista Premium' },
        { id: 6, country: 'Brazil', date: new Date('11-19-2021'), sector: 'Cadeira Inferior' },
    ]
}

const formatter = new Intl.DateTimeFormat('pt-BR', { 'day': '2-digit', 'month': 'long', year: 'numeric' })

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
    selected.ticket = ticket
    open()
}

</script>

<style scoped>
.event-banner {
    background: url('../assets/mocks/event-cover.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
}
</style>