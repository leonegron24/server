<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { ticketService } from '@/services/TicketService.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { accountService } from '@/services/AccountService.js';
import EventCard from '@/components/EventCard.vue';
import { Ticket } from '@/models/Ticket.js';

const account = computed(() => AppState.account)
const numberOfTickets = computed(() => AppState.numberOfTickets)
const numberOfEvents = computed(() => AppState.myEvents.length)
const myEvents = computed(() => AppState.myEvents)
const createdEvents = computed(() => {
  return myEvents.value.filter(e => e.creatorId === account.value.id)
})

onMounted(() => {
  getMyTickets()
  getMyEvents()
})



async function getMyTickets() {
  try {
    await accountService.getMyTickets()
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getMyEvents() {
  try {
    await towerEventService.getMyEvents()
  }
  catch (error) {
    Pop.error(error);
  }
}

async function deleteTicket(eventId) {
  try {
    await ticketService.deleteTicket(eventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>

<template>
  <div class="container p-4">
    <div class="about p-4  text-start">
      <div v-if="account" class="d-flex align-items-center">
        <img class="rounded-circle profileImg" :src="account.picture" alt="" />
        <div cl>
          <h1 class="mx-4">{{ account.name }}</h1>
          <div class="d-flex">
            <div class="mx-4">{{ numberOfTickets }} Tickets</div>
            <div class="mx-4">{{ numberOfEvents }} Events</div>
          </div>
        </div>
      </div>
      <div v-else>
        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
      </div>
    </div>
  </div>
  <div>
    <!-- YOUR EVENTS -->
    <div class="container p-2">
      <h3>Your Events</h3>
      <div class="row mt-4 justify-content-between">
        <div class="position-relative col-md-2 mb-4 selectable shadow"
          v-for="towerEvent in createdEvents" :key="towerEvent.id">
          <EventCard class="mx-1" :towerEvent="towerEvent" />
        </div>
      </div>
    </div>
    <!-- UPCOMING EVENTS -->
    <div class="container p-4">
      <h3>Upcoming Events</h3>
      <div class="row mt-4 justify-content-between">
        <div class="col-md-2 selectable mb-4 shadow position-relative" v-for="towerEvent in myEvents" :key="towerEvent.id">
          <EventCard :towerEvent="towerEvent" />
          <div class="position-absolute top-0">
            <button @click="deleteTicket(towerEvent.id)" class="btn btn-sm btn-danger">delete ticket</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.profileImg {
  height: 10em;
  aspect-ratio: 1/1;
}
</style>
