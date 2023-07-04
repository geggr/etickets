<template>
    <div class="rounded-lg shadow-lg grid hover:shadow-xl border border-gray-200 hover:border-brand-main"
         :class="position">
        <div class="event-header h-full max-w-full"
             :style="{ backgroundImage: imageSource }"></div>
        <div class="flex flex-row items-center justify-between gap-8 px-4">
            <div class="font-bold text-2xl">
                <span class="text-brand-main">{{ month }}</span>
                <p> {{ day }}</p>
            </div>
            <div>
                <span class="text-bold text-center text-3xl"> {{ title }} </span>
                <p> {{ location }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import FakeImageHttpClient from '../http/FakeImageHttpClient';

const {
    title,
    location = '',
    vertical = true,
    image = FakeImageHttpClient.randomImage,
    date = Date.now()
} = defineProps({
    'title': String,
    'location': String,
    'image': String,
    'vertical': Boolean,
    'date': Date
})


const parsed = new Date(date)

const imageSource = `url(/src/assets/tickets/${image.ticket})`

const position = reactive({
    'grid-cols-[350px] grid-rows-[200px,150px]': vertical,
    'grid-rows-[200px] grid-cols-[250px,350px]': !vertical
})

const [day, month] = new Intl
    .DateTimeFormat('pt-BR', { 'day': '2-digit', 'month': 'short' })
    .format(parsed)
    .split(" de ")

</script>

<style scoped>
.event-header {
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
