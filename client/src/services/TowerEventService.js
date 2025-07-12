import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { Pop } from "@/utils/Pop.js"

class TowerEventService{
  
  async createEvent(formData) {
    const towerEvent = await api.post('api/events', formData)
    console.log('Created Event Data: ',towerEvent.data)
    const newEvent = new TowerEvent(towerEvent.data)
    AppState.towerEvents.unshift(newEvent)
    return newEvent
  }
  
  async getEventDetailsById(eventId) {
      const towerEvent = await api.get(`api/events/${eventId}`)
      console.log('event details: ', towerEvent.data )
      AppState.eventDetails = null
      AppState.eventDetails = new TowerEvent(towerEvent.data)
      console.log('event sold out? : ', AppState.eventDetails.soldOut )
  }

  async getEvents() {
    const towerEvents = await api.get('api/events')
    const eventArray = towerEvents.data.map(e => new TowerEvent(e))
    .reverse()
    AppState.towerEvents = eventArray
    AppState.filteredEvents = [...eventArray]

    const types= eventArray.map(e => e.type)
    AppState.types = [...new Set(types)]
    console.log('Events: ', towerEvents.data)
  }

  async chooseType(type){
    AppState.filteredEvents = AppState.towerEvents.filter(e => e.type === type)
    console.log('towerEvents: ', AppState.towerEvents)
    Pop.success(`Showing ${type} Events `)
  }


}
export const towerEventService = new TowerEventService()