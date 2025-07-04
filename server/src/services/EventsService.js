import { dbContext } from "../db/DbContext.js"

class TowerEventsService {


  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getEventById(eventId)
    if (eventToCancel.creatorId != userId) throw new Error('Could not edit, improper access to event')
    eventToCancel.isCanceled = true
    await eventToCancel.save()
    return `${eventToCancel} was canceled...`

  }

  async editEvent(eventData, eventId, userId) {
    console.log('Event Data: ', eventData)
    const eventToEdit = await this.getEventById(eventId)
    if (eventToEdit.isCanceled){
      throw Error( `Event: ${eventId}, was cancelled`)
    }
    if (eventToEdit.creatorId != userId) throw new Error('Could not edit, improper access to event')

    eventToEdit.name = eventData.name ?? eventToEdit.name
    eventToEdit.description = eventData.description ?? eventToEdit.description
    eventToEdit.coverImg = eventData.coverImg ?? eventToEdit.coverImg
    eventToEdit.location = eventData.location ?? eventToEdit.location
    eventToEdit.capacity = eventData.capacity ?? eventToEdit.capacity
    eventToEdit.isCanceled = eventData.isCancelled ?? eventToEdit.isCanceled

    await eventToEdit.save()
    return eventToEdit

  }

  async getEventById(eventId) {
    const event = await dbContext.EventTowers.findById(eventId).populate('creator', 'name picture').populate('ticketCount')
    console.log('Event fetched by Id: ', event)
    if (!event) throw new Error(`No event with this id: ${eventId}`)
    return event
  }

  async getAllEvents() {
    const event = await dbContext.EventTowers.find().populate('creator', 'name picture').populate('ticketCount')
    return event
  }

  async createEvent(eventData) {
    const event = await dbContext.EventTowers.create(eventData)
    await event.populate('creator')
    await event.populate('ticketCount')
    return event
  }

}
export const towerEventsService = new TowerEventsService()