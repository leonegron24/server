<script setup>
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


let commentBody = ref('')
const route = useRoute()

async function postComment(){
    try {
      const eventId = route.params.eventId
      await towerEventService.postComment(commentBody.value, eventId)
      commentBody.value = ''
    }
    catch (error){
      Pop.error(error);
    }
}

</script>


<template>
    <form @submit.prevent="postComment" class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <label for="comment" class="form-label text-success text-end d-block">Join the
                    conversation</label>
                <textarea v-model="commentBody" placeholder="Tell the people..." name="comment" id="comment"
                    class="form-control p-4"></textarea>
                <div class="text-end p-2">
                    <button class="btn btn-success">Post Comment</button>
                </div>
            </div>
        </div>
    </form>
</template>


<style lang="scss" scoped></style>