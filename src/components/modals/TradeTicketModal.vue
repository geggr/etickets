<template>
    <vue-final-modal class="flex justify-center items-center"
                     content-class="relative p-4 rounded-lg bg-white dark:bg-gray-900"
                     content-transition="vfm-fade"
                     overlay-transition="vfm-fade">
        <div class="w-[800px] p-10"
             v-if="state.shouldShowForm()">

            <h1 class="text-3xl">
                Trocar o Ticket?
            </h1>

            <p> Qual ticket deseja usar na troca por? {{ selected.event }}</p>
            <VueMultiSelect v-model="current"
                            :options="options"
                            track-by="index"
                            label="name" />

            <div class="mt-10 flex gap-x-20 text-white">
                <button class="bg-red-800 py-4 px-8 flex-1"
                        @click="cancel"> Cancelar </button>
                <button class="bg-green-700 py-4 px-8 flex-1"
                        @click="trade"> Confirmar </button>
            </div>
        </div>
        <div v-else-if="state.isSearching()"
             class="w-[800px] min-h-[300px] p-10 flex flex-col gap-y-4">
            <h1 class="text-2xl text-brand-main font-display uppercase"> Procurando Ingresso 🎟️⏱️ </h1>
            <p class="text-lg font-thin">
                Aguarde um pouquinho enquanto procuramos em nosso sistema uma possível troca de ingresso.
            </p>
        </div>
        <div v-else-if="state.hasTraded()"
             class="w-[800px] p-10 flex flex-col gap-y-4">
            <h1 class="text-2xl text-brand-main font-display uppercase"> Troca Realizada 😁💜 </h1>
            <p class="text-2xl"> Parabéns! 🎟️</p>
            <p class="text-lg">
                Seu novo ingresso é para {{ state.data.newTicket.event }}
            </p>
            <p class="text-lg font-thin">
                Agora você está pronto para desfrutar plenamente do evento e criar memórias inesquecíveis.<br />
                proveite cada momento e que esta experiência seja repleta de diversão e alegria!
            </p>
            <button @click="close"
                    class="mt-4 w-full bg-brand-main py-4 text-white text-lg uppercase font-bold"> Fechar </button>
        </div>
        <div v-else-if="state.hasInteressed()"
             class="w-[800px] p-10 flex flex-col gap-y-4">
            <h1 class="text-2xl text-brand-main font-display"> Que pena 😓 </h1>
            <p class="text-2xl"> Interesse Criado!</p>
            <p class="text-lg font-thin">
                Infelizmente <b class=text-brand-main
                   font-bold>não encontramos nínguem para trocar seu ingresso.</b> <br />
                Mas fique tranquilo! Já cadastramos seu interesse nesta troca e assim
                que houver algum ingresso disponível iremos trocar automaticamente!
            </p>
            <button @click="close"
                    class="mt-4 w-full bg-brand-main py-4 text-white text-lg uppercase font-bold"> Fechar </button>
        </div>
    </vue-final-modal>
</template>

<script setup>
import VueMultiSelect from 'vue-multiselect'

import { ref, reactive } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { changeTickets } from '../../store/user'
import { wait } from '../../utils/ui-utils';


import TicketService from '../../services/TicketService'

const { tickets, selected } = defineProps(['tickets', 'selected'])
const emit = defineEmits(['confirm', 'close'])
const current = ref(null)
const service = new TicketService()

const state = reactive({
    searching: false,
    response: "",
    data: {},
    shouldShowForm() {
        return this.searching === false && this.response === ""
    },
    isSearching() {
        return this.searching === true
    },
    hasTraded() {
        return this.searching === false && this.response === "TRADED"
    },
    hasInteressed() {
        return this.searching === false && this.response === "INTERESS"
    }
})

function reset() {
    state.searching = false
    state.response = ''
    state.data = {}
    current.value = null
}

const formatter = new Intl.DateTimeFormat('pt-BR', { 'day': '2-digit', 'month': '2-digit', year: 'numeric' })

const options = tickets.map((ticket, index) => ({
    ...ticket,
    index,
    name: `${ticket.name}`
}))

function cancel() {
    emit('cancel')
}

function close() {
    reset()
    emit('cancel')
}

async function trade() {
    state.searching = true

    const response = await service.trade(current.value, selected)

    await wait(3_000)

    state.response = response.status
    state.searching = false
    state.data = response

    await wait(8_000)


    if (state.response === 'TRADED') {
        changeTickets(current.value, selected)
    }

    emit('confirm', {
        success: state.response == 'TRADED',
        oldTicket: current,
        newTicket: selected,
        data: state.data
    })

    reset()
}

</script>

<style>
@import "vue-multiselect/dist/vue-multiselect.css";
</style>
