<script setup>
import { AppState } from '@/AppState.js';
import EventCard from '@/components/EventCard.vue';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

// OnMounted
onMounted(() => {
  getEvents()
})

// Computed
const towerEvents = computed(() => AppState.towerEvents)
const types = computed(() => AppState.types)
const typeImages = {
  concert: '🎸',
  convention: '🫂',
  digital: '🖥️',
  sport: '⚽',
  default: '❔'
}

// Functions

async function getEvents() {
  try {
    await towerEventService.getEvents()
  }
  catch (error) {
    Pop.error(error);
  }
}



</script>

<template>
  <section class="position-relative">
    <img class="img-fluid pic"
      src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50fGVufDB8fDB8fHww"
      alt="">
    <div class="prettyText position-absolute bottom-0 top-50 px-5 w-100 text-light">
      <h3 class="prettyText">Event management for people, <br /> by people</h3>
      <p class="prettyText">
        Whatever your interest — from hiking and reading to networking and skill sharing —<br />
        there are thousands of people who share it on Tower.<br />
        Events are happening every day — log in to join the fun!
      </p>
    </div>
  </section>

  <!-- Search and Create and Event Button -->
  <h2 class="p-5">How Tower Works</h2>
  <section class="container">
    <div class="row justify-content-around">
      <div class="col-md-5 border backGround p-4">
        <h5><i class="btn mdi mdi-magnify p-2 fs-1"></i> Discover events you're interested in</h5>
        <p>Browse through community hosted events for all the things you know</p>
      </div>
      <div class="col-md-5 border  backGround p-4">
        <h5><i class="btn mdi mdi-plus p-2 fs-1"></i> Start an event to invite your friends!</h5>
        <p>Create your own Tower event, and draw from a <br />community of millions </p>
        <button class="text-success btn btn-clear p-0"> Create an event</button>
      </div>
    </div>
  </section>

  <!-- Categories -->
  <h2 class="p-5">Explored top categories</h2>
  <section class="container">
    <div class="row justify-content-between">
      <!-- Category Cards / Buttons -->
      <div class="selectable backGround col-md-2 text-center card shadow p-4" v-for="type in types">
        <div>
          <div class="fs-1">{{ typeImages[type] || typeImages.default }} </div>
        </div>
        <div class="text-capitalize">{{ type }}</div>
      </div>
    </div>
  </section>

  <!-- Events -->
  <h2 class="p-5"> Upcoming Events</h2>
  <section class="container">
    <div class="row p-4">
      <EventCard class="selectable" v-for="towerEvent in towerEvents" :key="towerEvent.id" :towerEvent="towerEvent" />
    </div>
  </section>

</template>

<style scoped lang="scss">
.pic {
  max-height: 40em;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.prettyText {
  text-shadow: 1px 3px 2px rgba(0, 0, 0, 0.7)
}

.backGround {
  background-color: rgb(246, 244, 244);
}
</style>
