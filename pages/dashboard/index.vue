<script setup lang="ts">
definePageMeta({
    layout: false,
})




const data = ref<{ y: number[]; x: string[]; label: string; }[]>([])
let cards = ref<{ name: string; total: number }[]>([
])
for (let index = 0; index < 1; index++) {
    const data = {
        name: "Customer",
        total: 0
    }
    cards.value.push(data)
}
for (const card of cards.value) {

    card.total = Math.floor(Math.random() * (99 - 1) + 1)

    const ob: { y: number[]; x: string[]; label: string; } =
    {
        x: [],
        y: [],
        label: "name"
    }
    for (let index = 0; index < 10; index++) {
        ob.y.push(Math.floor(Math.random() * (99 - 1) + 1))
        ob.x.push(String(index))
    }
    data.value.push(ob)

}

</script>

<template>
    <NuxtLayout name="navbar">

        <template #header>
                <h1 class="text-bold">Dashboard</h1>
        </template>
        <template #header-child>
            <p>Analytic company</p>
        </template>

        <div class="grid gap-2 md:grid-cols-4 sm:grid-cols-2">
            <!-- <div v-for="i in 8" :key="i" class="bg-gray-200 p-4 rounded-lg">
                <div class="flex justify-between py-2">
                    <div>
                        Customer
                    </div>
                    <div>
                        900
                    </div>
                </div>
                <div class="bg-white p-2 rounded-lg">
                    for analytics
                    <ChartComponent :data="data"/>
                </div>
            </div> -->


            <div v-for="(card, index) in cards" :key="index">
                <CardComponent :dataChart="data[index]" :dataCard="card" />
            </div>

        </div>
    </NuxtLayout>

</template>