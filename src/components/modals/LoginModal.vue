<template>
    <vue-final-modal class="flex justify-center items-center"
        content-class="relative p-4 rounded-lg bg-white dark:bg-gray-900" content-transition="vfm-fade"
        overlay-transition="vfm-fade">

        <form class="w-[500px] flex flex-col gap-y-6 p-4" @submit="handleSubmit">

            <h1 class="text-brand-main text-center text-3xl uppercase font-display">Entrar na Plataforma</h1>

            <div>
                <label>
                    <span>Email</span>
                    <input class="block w-full border border-black rounded p-2" type="email" v-model="email"
                        placeholder="Digite o email">
                </label>
            </div>

            <div>
                <label>
                    <span>Senha</span>
                    <input class="block w-full border border-black rounded p-2" type="password" v-model="password"
                        placeholder="Digite sua senha...">
                </label>
            </div>

            <button type="submit" class="mt-8 w-full p-2 text-white text-xl font-bold bg-brand-main rounded">Login</button>
        </form>
    </vue-final-modal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';
import { useForm } from '@vorms/core';
import FakeHTTPClient from '../../http/FakeHTTPClient';
const emit = defineEmits(['submit'])

const { register, errors, handleSubmit, handleReset } = useForm({
    initialValues: {
        email: '',
        password: ''
    },
    async onSubmit(values) {
        FakeHTTPClient.login(values)
        handleReset()
        emit('submit', values)
    }
})


const { value: email } = register('email')
const { value: password } = register('password')

</script>
