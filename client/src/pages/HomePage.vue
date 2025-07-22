<script setup>
import { AppState } from '@/AppState.js';
import EventCard from '@/components/EventCard.vue';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { Modal } from 'bootstrap'
import CreateEventModal from '@/components/CreateEventModal.vue';
import Categories from '@/components/Categories.vue';


// OnMounted
onMounted(() => {
  getEvents()
})

// Computed
const filteredEvents = computed(() => AppState.filteredEvents)
const account = computed(() => AppState.account)


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

  <!-- Picture / Site Intro -->
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
      <!-- Search -->
      <div class="col-md-5 border backGround p-4">
        <h5><i class="btn mdi mdi-magnify p-2 fs-1"></i> Discover events you're interested in</h5>
        <p>Browse through community hosted events for all the things you know</p>
      </div>
      <!-- Create -->
      <div v-if="account?.id" class="col-md-5 border backGround p-4">
        <h5>
          <i data-bs-toggle="modal" data-bs-target="#event-form" class="btn mdi mdi-plus p-2 fs-1"></i>
          Start an event to invite your friends!
        </h5>
        <p>Create your own Tower event, and draw from a <br />community of millions </p>
        <button  data-bs-toggle="modal" data-bs-target="#event-form" class="text-success btn btn-clear p-0">Create an event</button>
      </div>
      
      <!-- CreateEventModal -->
      <CreateEventModal id="event-form" />

    </div>
  </section>

  <!-- Categories -->
  <h2 class="p-5">Explored top categories</h2>
    <Categories />

  <!-- Events -->
  <h2 class="p-5"> Upcoming Events</h2>
  <section class="container">
    <div class="row p-2">
      <div class="selectable col-md-4 pb-4" v-for="towerEvent in filteredEvents" :key="towerEvent.id">
        <EventCard :towerEvent="towerEvent" />
      </div>
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
