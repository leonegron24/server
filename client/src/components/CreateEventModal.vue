<script setup>
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';


const formData = ref({
    name: '',
    coverImg: '',
    location: '',
    type: '',
    startDate: null,
    capacity: null,
    description: ''
})


async function createEvent() {
    try {
        console.log('Event Creation Data: ', formData.value)
        await towerEventService.createEvent(formData.value)
        Pop.success('Event Created!')

        const modalEl = document.getElementById('createEventModal')
        const bsModal = Modal.getInstance(modalEl)
        if (bsModal) bsModal.hide()
        

        Object.assign(formData.value, {
            name: '',
            coverImg: '',
            location: '',
            type: '',
            startDate: null,
            capacity: null,
            description: ''
        })
    }
    catch (error) {
        Pop.error(error);
    }
}


</script>


<template>
    <div class="modal fade" id="createEventModal" tabindex="-1" aria-labelledby="createEventModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createEventModalLabel">Create New Event</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Your create event form goes here -->
                    <form @submit.prevent="createEvent">
                        <div class="d-flex">
                            <!-- Img Preview -->
                            <div class="w-75 text-center p-2  m-4">
                                <img v-if="formData.coverImg" :src="formData.coverImg" class="img-fluid rounded shadow"
                                    alt="Event Preview" style="max-height: 300px; object-fit: cover;" />
                                <div v-else class="text-muted">Image preview will appear here...</div>
                            </div>
                            <div class="w-25 m-4">
                                <!-- Name -->
                                <div class="mb-3">
                                    <label for="eventName" class="form-label">Event Name</label>
                                    <input required v-model="formData.name" type="text" class="form-control" name="name"
                                        id="eventName" />
                                </div>
                                <!-- Location -->
                                <div class="mb-3">
                                    <label for="eventLocation" class="form-label">Event Location</label>
                                    <input required v-model="formData.location" type="text" name="eventLocation"
                                        class="form-control" id="eventLocation" />
                                </div>
                                <!-- Type -->
                                <div class="mb-3">
                                    <label for="eventType" class="form-label">Event Type</label>
                                    <select required v-model="formData.type" name="type" class="form-control"
                                        id="eventType">
                                        <option value="" disabled>Select a type</option>
                                        <option value="concert">Concert</option>
                                        <option value="sport">Sport</option>
                                        <option value="convention">Convention</option>
                                        <option value="digital">Digital</option>
                                    </select>
                                </div>
                                <!-- StartDate -->
                                <div>
                                    <label for="startDate" class="form-label">Start Date</label>
                                    <input required v-model="formData.startDate" type="datetime-local" id="startDate"
                                        name="startDate" class="form-control" />
                                </div>
                                <!-- Capacity -->
                                <div>
                                    <label for="eventCapacity" class="form-label">Capacity</label>
                                    <input required v-model="formData.capacity" min="1" max="5000" type="number"
                                        id="eventCapacity" name="eventCapacity" class="form-control" />
                                </div>
                                <!-- CoverImg -->
                                <div>
                                    <label for="eventCoverImg" class="form-label">Event Image</label>
                                    <input required type="url" placeholder="URL..." name="eventCoverImg"
                                        class="form-control" id="eventCoverImg" v-model="formData.coverImg" />
                                </div>

                            </div>
                        </div>
                        <!-- Description -->
                        <div class="mb-3">
                            <label for="eventDescription" class="form-label">Event Description</label>
                            <textarea required v-model="formData.description" class="form-control p-5"
                                placeholder="desribe your event..." name="eventDescription" id=""></textarea>
                        </div>
                        <div>
                            <button class="btn btn-primary">Create Event</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>