<script setup>
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CommentCard from '@/components/CommentCard.vue';
import CommentForm from '@/components/CommentForm.vue';
import { ticketService } from '@/services/TicketService.js';

const route = useRoute()
const account = computed(() => AppState.account)
const eventDetails = computed(() => AppState.eventDetails)
const attendees = computed(() => AppState.eventTickets.map(t => t.profile?.name))
const comments = computed(() => AppState.comments)
const ticket = computed(() => AppState.eventTickets.find(t=> t?.accountId === account.value?.id))

const typeColors = {
    concert: 'primary',
    convention: 'success',
    digital: 'warning',
    sport: 'danger',
    default: 'safety'
}

onMounted(() => {
    getEventDetails()
    getComments()
    getTickets()
})

async function getEventDetails() {
    try {
        const eventId = route.params.eventId
        await towerEventService.getEventDetailsById(eventId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function cancelEvent() {
    try {
        const eventId = route.params.eventId
        await towerEventService.cancelEvent(eventId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function getComments() {
    try {
        const eventId = route.params.eventId
        await towerEventService.getComments(eventId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function createTicket() {
    const eventId = route.params.eventId
    const accountId = account.value.id
    await ticketService.createTicket(eventId, accountId)
}

async function getTickets(){
    try {
        const eventId = route.params.eventId
        await towerEventService.getTickets(eventId)
    }
    catch (error){
      Pop.error(error);
    }
}


</script>


<template>
    <!-- Event Picture -->
    <div v-if="eventDetails?.coverImg" class="image-wrapper position-relative text-center pt-4">
        <div class="image-container">
            <img v-if="eventDetails.isCanceled" class="img-fluid rounded coverImg"
                src="https://media.istockphoto.com/id/1852299352/photo/cancelled-stamp-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=4e9XIcgyk2CD3kjw4afrR4WFe7wnHSeWrR81x_NQ7YA="
                alt="">
            <img v-else-if="eventDetails.soldOut" class="img-fluid rounded coverImg"
                src="https://media.istockphoto.com/id/810509198/photo/red-stamp-on-a-white-background-sold-out.webp?a=1&b=1&s=612x612&w=0&k=20&c=mbbCT1w_YEvlI-UPz4Zkk2MuqN96IHdjECI0Y05zj_I="
                alt="">

            <img v-else class="img-fluid rounded coverImg" :src="eventDetails.coverImg" alt="">
            <!-- Left blur -->
            <div class="blur-overlay blur-left"></div>

            <!-- Right blur -->
            <div class="blur-overlay blur-right"></div>
        </div>
    </div>
    <!--  
     Column A: Event Title, description, add comment, comments
     Column B: Attend button, and attendees list-->

    <section v-if="eventDetails" class="container d-flex pt-4">
        <!-- Column A -->
        <div class="w-75">
            <div class="d-flex flex-wrap gap-2 align-items-center">
                <h2>{{ eventDetails.name }}</h2>
                <p style="cursor: default;" :class="`m-0 px-1 btn btn-sm btn-${typeColors[eventDetails.type]}`">{{
                    eventDetails.type }}</p>
                <p class="m-0">Event Organizer: {{ eventDetails.creator.name }}</p>
                <div class="mx-2" v-if="eventDetails.creator?.id === account?.id && !eventDetails.isCanceled">
                    <button @click="cancelEvent" class="p-0 btn btn-warning btn-sm">Cancel Event</button>
                </div>
            </div>

            <div>{{ eventDetails.description }}</div>

            <div class="pt-4">
                <h5 class="text-secondary">Date and Time</h5>
                <div v-if="eventDetails.isCanceled"><i class="text-primary mdi mdi-clock"></i> Event has been
                    cancelled...
                </div>
                <div v-else-if="eventDetails.soldOut"><i class="text-primary mdi mdi-clock"></i> {{
                    eventDetails.formatStartDateWithTime() }}
                    <span class="text-danger">Sorry! This event sold out, tough luck</span>
                </div>
                <div v-else><i class="text-primary mdi mdi-clock"></i> Starts {{
                    eventDetails.formatStartDateWithTime() }}
                </div>
            </div>

            <div class="pt-4">
                <h5 class="text-secondary">Location</h5>
                <div><i class="mdi mdi-map-marker"></i> {{ eventDetails.location }}</div>
            </div>

            <h5 class="pt-4">See what people are saying...</h5>
            <div class="bgBox py-4">
                <!-- Add Comment -->
                <CommentForm />
                <!-- Comment Section -->
                <div v-if="comments">
                    <div class="p-2 mx-4" v-for="comment in comments" :key="comment.id">
                        <CommentCard :comment="comment" />
                    </div>
                </div>
            </div>

        </div>

        <!-- Column B -->
        <div class="p-4 w-25">
            <div v-if="eventDetails.isCanceled" class="p-4 bgBox text-center">
                <h5>Interested in going?</h5>
                <p>Too friggin bad, the event was cancelled</p>
                <RouterLink :to="{ name: 'Home' }">
                    <button class="btn btn-primary">Go Home</button>
                </RouterLink>
            </div>
            <div v-else-if="eventDetails.soldOut" class="p-4 bgBox text-center">
                <h5>Sold Out!!!</h5>
                <RouterLink :to="{ name: 'Home' }">
                    <button class="btn btn-primary">Go Home</button>
                </RouterLink>
            </div>
            <div v-else-if="ticket" class="p-4 bgBox text-center">
                <h5>Ticket Purchased!</h5>
                <RouterLink :to="{ name: 'Home' }">
                    <button class="btn btn-primary">Go Home</button>
                </RouterLink>
            </div>
            <div v-else class="p-4 bgBox text-center">
                <h5>Interested in going?</h5>
                <p>Grab a ticket!</p>
                <button @click="createTicket" class="btn btn-primary">Attend</button>
            </div>

            <div class="text-end"><span class="text-success">{{ eventDetails.capacity }}</span> spots left</div>

            <div>
                <h5>Attendees</h5>
                <div class="bgBox p-4">
                    <div v-for="attendee in attendees">
                        {{ attendee }}
                    </div>
                </div>
            </div>

        </div>

    </section>
</template>


<style lang="scss" scoped>
.bgBox {
    background-color: rgb(235, 235, 235);
}

.image-wrapper {
    position: relative;
}

.image-container {
    position: relative;
    width: 85%;
    height: 30em; // Set desired height
    margin: auto;
    overflow: hidden;
    border-radius: 0.5rem;
}

.coverImg {
    width: 100%;
    height: 100%;
    object-fit: cover; // Ensures the image fills container
    object-position: center; // Center horizontally and vertically
    display: block;
}

.blur-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 15%;
    z-index: 2;
    pointer-events: none;
    backdrop-filter: blur(10px);
}

.blur-left {
    left: 0;
}

.blur-right {
    right: 0;
}
</style>