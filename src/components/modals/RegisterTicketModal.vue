<template>
    <vue-final-modal class="flex justify-center items-center"
                     content-class="relative p-4 rounded-lg bg-white dark:bg-gray-900"
                     content-transition="vfm-fade"
                     overlay-transition="vfm-fade">

        <form v-show="status.shouldShowForm()"
              @submit="handleSubmit"
              class="w-[500px] flex flex-col gap-y-6 p-4">

            <h1 class="text-brand-main text-center text-3xl uppercase font-display">Cadastre seu ticket</h1>

            <div>
                <label>
                    <span>Evento</span>
                    <input class="block w-full border border-black rounded p-2"
                           type="text"
                           v-model="name"
                           placeholder="Digite o nome do evento...">
                </label>
            </div>

            <div>
                <label>
                    <span>O código do seu ticket</span>
                    <input class="block w-full border border-black rounded p-2"
                           type="text"
                           v-model="code"
                           placeholder="#ABC123">
                </label>
            </div>

            <div>
                <label>
                    <span>Local</span>
                    <input class="block w-full border border-black rounded p-2"
                           type="text"
                           v-model="location"
                           placeholder="Selecione o local">
                </label>
            </div>

            <div>
                <label>
                    <span>Setor</span>
                    <input class="block w-full border border-black rounded p-2"
                           type="text"
                           v-model="sector"
                           placeholder="Selecione o setor do seu ticket">
                </label>
            </div>


            <div>
                <label>
                    <span>Data</span>
                    <input class="block w-full border border-black rounded p-2"
                           type="date"
                           v-model="date"
                           placeholder="Selecione a data do show">
                </label>
            </div>


            <button type="submit"
                    class="mt-8 w-full p-2 text-white text-xl font-bold bg-brand-main rounded">Cadastrar</button>
        </form>

        <div v-show="status.isValidating"
             class="h-96 w-96 font-display text-brand-main text-3xl flex items-center justify-center">
            Validando o Ingreso...
        </div>

        <div v-show="status.isApproved()"
             class="h-96 w-96 font-display text-brand-main text-3xl flex items-center justify-center">
            Ingresso Cadastrado
        </div>

    </vue-final-modal>
</template>

<script setup>
import { useForm } from '@vorms/core';
import { reactive } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import FakeHTTPClient from '../../http/FakeHTTPClient';
import FakeImageHttpClient from '../../http/FakeImageHttpClient';

const status = reactive({
    isValidating: false,
    isValidated: false,
    shouldShowForm() {
        return (!this.isValidating && !this.isValidated)
    },
    isApproved() {
        return this.isValidated === true
    },
    async approve() {
        this.isValidating = false
        this.isValidated = true
    },
    reject() {
        this.isValidated = false
        this.isValidating = false
    }
})

const emit = defineEmits(['submit'])

const { register, errors, handleSubmit } = useForm({
    initialValues: {
        name: '',
        code: '',
        location: '',
        sector: '',
        date: '',
    },
    async onSubmit(values) {
        const parsed = {
            ...values,
            event: values.name,
            name: `${values.name} - ${values.sector}`,
            datetime: new Date(values.date),
            type: 'football',
            image: FakeImageHttpClient.findByKind('football')
        }

        status.isValidating = true

        setTimeout(() => {
            status.approve()
            emit('submit', parsed)
        }, 1500)

    }
})
const { value: code } = register('code')
const { value: name } = register('name')
const { value: location } = register('location')
const { value: sector } = register('sector')
const { value: date } = register('date')
</script>
