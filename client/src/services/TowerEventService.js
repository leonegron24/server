import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"

class TowerEventService{
  
  async createEvent(formData) {
    const towerEvent = await api.post('api/events', formData)
    console.log('Created Event Data: ',towerEvent.data)
    AppState.towerEvents.unshift(new TowerEvent(towerEvent.data))
  }
  
  async getEventDetailsById(eventId) {
      const towerEvent = await api.get(`api/events/${eventId}`)
      console.log('event details: ', towerEvent.data )
      AppState.eventDetails = new TowerEvent(towerEvent.data)
  }

  async getEvents() {
    const towerEvents = await api.get('api/events')
    AppState.towerEvents = towerEvents.data.map(e => new TowerEvent(e))
    AppState.towerEvents.forEach(e => AppState.types.push(e.type))
    AppState.types = [...new Set(AppState.types)]
    console.log('Events: ', towerEvents.data)
  }


}
export const towerEventService = new TowerEventService()