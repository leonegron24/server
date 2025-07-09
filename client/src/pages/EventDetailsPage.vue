<script setup>
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const eventDetails = computed(() => AppState.eventDetails)
const attendees = computed(()=> AppState.attendees)

const typeColors = {
    concert: 'primary',
    convention: 'success',
    digital: 'warning',
    sport: 'danger',
    default: 'safety'
}

onMounted(() => {
    getEventDetails()
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
</script>


<template>
    <!-- Event Picture -->
    <div v-if="eventDetails?.coverImg" class="image-wrapper position-relative text-center pt-4">
        <div class="image-container">
            <img class="img-fluid rounded coverImg" :src="eventDetails.coverImg" alt="">

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
            <div class="d-flex align-items-baseline">
                <h2>{{ eventDetails.name }}</h2>
                <div>
                    <p :class="`p-0 mx-4 btn btn-${typeColors[eventDetails.type]}`">{{ eventDetails.type }}</p>
                </div>
            </div>

            <div>{{ eventDetails.description }}</div>

            <div class="pt-4">
                <h5 class="text-secondary">Date and Time</h5>
                <div><i class="text-primary mdi mdi-clock"></i> Starts {{ eventDetails.formatStartDateWithTime() }}
                </div>
            </div>

            <div class="pt-4">
                <h5 class="text-secondary">Location</h5>
                <div><i class="mdi mdi-map-marker"></i> {{ eventDetails.location }}</div>
            </div>

            <h5 class="pt-4">See what people are saying...</h5>
            <div class="bgBox py-4">
                <!-- Add Comment -->
                <form class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-10">
                            <label for="comment" class="form-label text-success text-end d-block">Join the
                                conversation</label>
                            <textarea placeholder="Tell the people..." name="comment" id="comment"
                                class="form-control p-4"></textarea>
                            <div class="text-end p-2">
                                <button class="btn btn-success">Post Comment</button>
                            </div>
                        </div>
                    </div>
                </form>
                <!-- Comment Section -->

            </div>

        </div>

        <!-- Column B -->
        <div class="p-4 w-25">
            <div class="p-4 bgBox text-center">
                <h5>Interested in going?</h5>
                <p>Grab a ticket!</p>
                <button class="btn btn-primary">Attend</button>
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