<template>
    <h1 class="text-blue-500 font-bold">Dashbaord</h1>

    <button @click="open">Abrir</button>
</template>

<script setup>
    import { useModal } from 'vue-final-modal';
    import RegisterTicketModal from '../components/modals/RegisterTicketModal.vue'

    const { open, close } = useModal({
        component: RegisterTicketModal
    })
</script>