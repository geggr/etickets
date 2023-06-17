<template>
    <vue-final-modal class="flex justify-center items-center"
        content-class="relative p-4 rounded-lg bg-white dark:bg-gray-900" content-transition="vfm-fade"
        overlay-transition="vfm-fade">
        <div class="w-[800px] p-10" v-if="state.shouldShowForm()">

            <h1 class="text-3xl">
                Trocar o Ticket?
            </h1>

            <p> Qual ticket deseja usar na troca por? {{ selected.ticket.sector }}</p>
            <VueMultiSelect v-model="current" :options="options" track-by="index" label="name" />

            <div class="mt-10 flex gap-x-20 text-white">
                <button class="bg-red-800 py-4 px-8 flex-1" @click="cancel"> Cancelar </button>
                <button class="bg-green-700 py-4 px-8 flex-1" @click="trade"> Confirmar </button>
            </div>
        </div>
        <div v-else-if="state.isSearching()" class="w-[800px] p-10">
            Procurando Ingresso...
        </div>
        <div v-else-if="state.hasTraded()" class="w-[800px] p-10">
            <h1 class="text-2xl text-brand-main font-display"> Parabens!!!! </h1>
            <p class="text-lg">
                Seu novo ingresso é para {{ state.data.newTicket.title }}
            </p>
        </div>
        <div v-else-if="state.hasInteressed()" class="w-[800px] p-10">
            <h1 class="text-2xl text-brand-main font-display"> Que pena !!!! </h1>
            <p class="text-lg">
                Não encontramos nínguem para trocar seu ingresso. <br />
                mas já cadastramos seu interesse e assim que aparecer
                algum ingresso iremos trocar automaticamente!
            </p>
        </div>
    </vue-final-modal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';
import { ref } from 'vue';
import VueMultiSelect from 'vue-multiselect'
import { reactive } from 'vue';
import FakeHTTPClient from '../../http/FakeHTTPClient';

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

const emit = defineEmits(['confirm', 'close'])

const formatter = new Intl.DateTimeFormat('pt-BR', { 'day': '2-digit', 'month': '2-digit', year: 'numeric' })

const current = ref(null)

const { tickets, selected } = defineProps(['tickets', 'selected'])

const options = tickets.map((ticket, index) => ({
    index,
    name: `${ticket.sector} - ${formatter.format(ticket.date)}`
}))

function cancel() {
    emit('cancel')
}

async function trade() {
    state.searching = true

    const response = await FakeHTTPClient.trade(current, "HAS_TRADE")

    setTimeout(() => {
        state.response = response.status
        state.searching = false
        state.data = response
    }, 1500)

    setTimeout(() => {
        emit('confirm', response)
    }, 5000)

}

</script>

<style>
@import "vue-multiselect/dist/vue-multiselect.css";
</style>