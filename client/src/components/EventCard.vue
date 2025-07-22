<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';

const props = defineProps({ towerEvent: TowerEvent })


</script>


<template>
    <div class="g-3">
        <div class="position-relative">
            <RouterLink :to="{ name: 'EventDetails', params: { eventId: towerEvent.id } }">
                <img class="coverImg img-fluid rounded" :src="towerEvent.coverImg" alt="">
            </RouterLink>
            <div v-if="towerEvent.isCanceled">
                <div class="position-absolute top-0 border rounded bg-danger">Cancelled</div>
            </div>
            <div v-if="towerEvent.soldOut && !towerEvent.isCanceled">
                <div class="position-absolute top-0 border rounded bg-warning">SoldOut</div>
            </div>
        </div>
        <div>
            <h5 class="mt-2">{{ towerEvent.name }}</h5>
            <p>Hosted By {{ towerEvent.creator.name }}</p>
            <p>{{ towerEvent.formatStartDate() }} - {{ towerEvent.location }}</p>
            <p>{{ towerEvent.ticketCount }} attending</p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.coverImg {
    max-height: 15em;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 1.5/1;
}

p {
    padding: 0;
    margin: 0;
}
</style>