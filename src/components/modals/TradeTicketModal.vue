<template>
    <vue-final-modal class="flex justify-center items-center"
        content-class="relative p-4 rounded-lg bg-white dark:bg-gray-900" content-transition="vfm-fade"
        overlay-transition="vfm-fade">
        <div class="w-[800px] p-10">

            <h1 class="text-3xl">
                Trocar o Ticket?
            </h1>

            <p> Qual ticket deseja usar na troca por? {{ selected.ticket.sector }}</p>
            <VueMultiSelect v-model="current" :options="options" track-by="index" label="name" />

            <div class="mt-10 flex gap-x-20 text-white">
                <button class="bg-red-800 py-4 px-8 flex-1" @click="cancel"> Cancelar </button>
                <button class="bg-green-700 py-4 px-8 flex-1" @click="log"> Confirmar </button>
            </div>

        </div>
    </vue-final-modal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';
import { ref } from 'vue';
import VueMultiSelect from 'vue-multiselect'

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

function log() {
    emit('confirm', current.value)
}

</script>

<style>
@import "vue-multiselect/dist/vue-multiselect.css";
</style>