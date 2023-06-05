<template>
    <vue-final-modal class="flex justify-center items-center"
        content-class="relative p-4 rounded-lg bg-white dark:bg-gray-900"
        content-transition="vfm-fade"
        overlay-transition="vfm-fade">

        <form v-show="status.shouldShowForm()" @submit="handleSubmit" class="w-[500px] flex flex-col gap-y-6 p-4">
            
            <h1 class="text-brand-main text-center text-3xl uppercase font-display">Cadastre seu ticket</h1>

            <div>
                <label>
                    <span>Evento</span>
                    <input class="block w-full border border-black rounded p-2" type="text" v-model="name" placeholder="Digite o nome do evento...">
                </label>
            </div>

            <div>
                <label>
                    <span>O código do seu ticket</span>
                    <input class="block w-full border border-black rounded p-2" type="text" v-model="code" placeholder="#ABC123">
                </label>
            </div>
            
            <div>
                <label>
                    <span>Local</span>
                    <input class="block w-full border border-black rounded p-2" type="text" v-model="local" placeholder="Selecione o local">
                </label>
            </div>

            <div>
                <label>
                    <span>Setor</span>
                    <input class="block w-full border border-black rounded p-2" type="text" v-model="place" placeholder="Selecione o setor do seu ticket">
                </label>
            </div>

            
            <div>
                <label>
                    <span>Data</span>
                    <input class="block w-full border border-black rounded p-2" type="text" v-model="date" placeholder="Selecione a data do show">
                </label>
            </div>


            <button type="submit" class="mt-8 w-full p-2 text-white text-xl font-bold bg-brand-main rounded">Cadastrar</button>
        </form>
        
        <div v-show="status.isValidating" class="h-96 w-96 font-display text-brand-main text-3xl flex items-center justify-center">
            Validando o Ingreso...
        </div>

        <div v-show="status.isApproved()" class="h-96 w-96 font-display text-brand-main text-3xl flex items-center justify-center">
            Ingresso Cadastrado
        </div>

    </vue-final-modal>
</template>

<script setup>
import { useForm } from '@vorms/core';
import { onMounted, reactive, ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';

const status = reactive({
    isValidating: false,
    isValidated: false,
    shouldShowForm(){
        return (!this.isValidating && !this.isValidated)
    },
    isApproved(){
        return this.isValidated === true
    },
    approve(){
        this.isValidating = false
        this.isValidated = true
    },
    reject(){
        this.isValidated = false
        this.isValidating = false
    }
})

const {register, errors, handleSubmit} = useForm({
    initialValues: {
        name: '',
        code: '',
        local: '',
        place: '',
        date: '',
    },
    onSubmit(values){
        status.isValidating = true
        setTimeout(() => status.approve(), 3000)
    }
})

const { value: name } = register('name')
const { value: code } = register('code')
const { value: local } = register('local')
const { value: place } = register('place')
const { value: date } = register('date')



</script>