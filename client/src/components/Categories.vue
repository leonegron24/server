<script setup>
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, ref } from 'vue';

const selectedType = ref(null)

const typeImages = {
    concert: '🎸',
    convention: '🫂',
    digital: '🖥️',
    sport: '⚽',
    default: '❔'
}
const types = computed(() => AppState.types)

async function chooseType(type) {
    try {
        if (selectedType.value != null && selectedType.value == type) {
            Pop.toast(`${selectedType.value} filter removed`)
            selectedType.value = null
            await towerEventService.getEvents()
        }else{
            await towerEventService.chooseType(type)
            selectedType.value = type
        }
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <section class="container">
        <div class="row justify-content-between">
            <!-- Category Cards / Buttons -->
            <div @click="chooseType(type)"
                :class="['selectable', 'col-md-2', 'text-center', 'card', 'shadow', 'p-4', selectedType === type ? 'bg-success text-light' : 'backGround']"
                v-for="type in types">
                <div>
                    <div class="fs-1">{{ typeImages[type] || typeImages.default }} </div>
                </div>
                <div class="text-capitalize">{{ type }}</div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped></style>