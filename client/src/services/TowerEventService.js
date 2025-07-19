import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { Pop } from "@/utils/Pop.js"
import { Comment } from "@/models/Comment.js"
import { Ticket } from "@/models/Ticket.js"

class TowerEventService {

  async getTickets(eventId) {
      const tickets = await api.get(`api/events/${eventId}/tickets`)
      AppState.eventTickets =  tickets.data.map(t=> new Ticket(t))
      console.log("tickets for this event: ", AppState.eventTickets)
  }

  async deleteComment(commentId) {
    const confirm = await Pop.confirm("Are you sure you want to delete this comment?")
    if(confirm){
      const comment = await api.delete(`api/comments/${commentId}`)
      const commentToRemove = AppState.comments.findIndex(c => c.id == commentId)
      AppState.comments.splice(commentToRemove,1)
      Pop.success('Comment Deleted!')
    }
  }

  async postComment(commentBody, eventId) {
    const comment = await api.post('api/comments', { body: commentBody, eventId: eventId })
    console.log(comment.data)
    const newComment = new Comment(comment.data)
    AppState.comments.unshift(newComment)
  }

  async getComments(eventId) {
    AppState.comments = []
    const comments = await api.get(`api/events/${eventId}/comments`)
    console.log('Comments: ', comments.data)
    const commentArray = comments.data.map(c => new Comment(c)).reverse()
    AppState.comments = commentArray
    console.log('App State Comments: ', AppState.comments)
  }

  async cancelEvent(eventId) {
    const confirm = await Pop.confirm('Are you sure you want to cancel this event?')
    if (confirm) {
      const request = await api.put(`api/events/${eventId}`, { isCancelled: true })
      console.log('Cancelled Event', request.data)
      const index = AppState.towerEvents.findIndex(e => e.id == eventId)
      if (index !== -1) {
        AppState.towerEvents[index] = new TowerEvent(request.data)
      }
      AppState.eventDetails = new TowerEvent(request.data)
    }
  }

  async createEvent(formData) {
    const towerEvent = await api.post('api/events', formData)
    console.log('Created Event Data: ', towerEvent.data)
    const newEvent = new TowerEvent(towerEvent.data)
    AppState.towerEvents.unshift(newEvent)
    return newEvent
  }

  async getEventDetailsById(eventId) {
    const towerEvent = await api.get(`api/events/${eventId}`)
    console.log('event details: ', towerEvent.data)
    AppState.eventDetails = null
    AppState.eventDetails = new TowerEvent(towerEvent.data)
    console.log('event sold out? : ', AppState.eventDetails.soldOut)
  }

  async getEvents() {
    const towerEvents = await api.get('api/events')
    const eventArray = towerEvents.data.map(e => new TowerEvent(e))
      .reverse()
    AppState.towerEvents = eventArray
    AppState.filteredEvents = [...eventArray]

    const types = eventArray.map(e => e.type)
    AppState.types = [...new Set(types)]
    console.log('Events: ', towerEvents.data)
  }

  async chooseType(type) {
    AppState.filteredEvents = AppState.towerEvents.filter(e => e.type === type)
    console.log('towerEvents: ', AppState.towerEvents)
    Pop.success(`Showing ${type} Events `)
  }


}
export const towerEventService = new TowerEventService()