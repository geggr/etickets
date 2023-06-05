<template>
    <div class="rounded-lg shadow-lg grid grid-cols-[350px] grid-rows-[200px,150px] hover:shadow-xl hover:border hover:border-brand-main">
        <div class="event-header h-48 w-full"></div>
        <div class="flex items-center justify-between gap-8 px-4">
            <div class="font-bold text-2xl">
                <span class="text-brand-main">{{ month }}</span>
                <p> {{ day }}</p>
            </div>
            <div>
                <span class="text-bold text-center text-3xl"> {{ title  }}</span>
                <p> Estádio do Morumbi</p>
            </div>
        </div>
    </div>
</template>

<script setup>

const { title, date = Date.now() } = defineProps([
    'title',
    'date'
])

console.log({ title, date })

const formatted = new Intl.DateTimeFormat('pt-BR', { 'day': '2-digit', 'month': 'short' }).format(new Date(date))

const [day, month] = formatted.split(" de ")

</script>

<style scoped>
.event-header {
    background-image: url('../assets/mocks/event-banner.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>