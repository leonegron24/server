<script setup>
import { AppState } from '@/AppState.js';
import { Comment } from '@/models/Comment.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';



const account = computed(()=> AppState.account)
const props = defineProps({ comment: Comment })
const eventDetails = computed(()=> AppState.eventDetails)

async function deleteComment(commentId){
    try {
      await towerEventService.deleteComment(commentId)
    }
    catch (error){
      Pop.error(error);
    }
}

</script>


<template>
    <div v-if="comment?.creator" class="card shadow p-4">
        <div class="d-flex align-items-baseline">
            <div>
                <img class="profile rounded" :src="comment.creator.picture" alt="">
            </div>
            <div class="mx-2 w-100">
                <div class="d-flex justify-content-between">
                    <div class="fw-bold">
                        {{ comment.creator.name }}
                    </div>
                    <div v-if="account?.id === eventDetails.creatorId">
                        <button @click="deleteComment(comment.id)" class="btn btn-danger rounded-pill btn-sm">Delete</button>
                    </div>
                </div>
                <div>
                    {{ comment.body }}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.profile {
    max-height: 2em;
    aspect-ratio: 1/1;
}
</style>