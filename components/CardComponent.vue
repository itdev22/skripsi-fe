<script setup lang="ts">
import type { ChartLine, CardData } from '@/types/props';

const props = defineProps<{ dataChart: ChartLine, dataCard: CardData }>();


</script>
<template>
    <div class="bg-gray-200 p-4 rounded-lg">
        <div class="flex justify-between py-2">
            <div>
                {{ props.dataCard.name }}
            </div>
            <div>
                {{ props.dataCard.total }}
            </div>
        </div>
        <div class="bg-white p-2 rounded-lg">
            for analytics
            <ChartComponent :data="props.dataChart" />

        </div>
    </div>
</template>