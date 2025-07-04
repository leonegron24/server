import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"

class TowerEventService{

  async getEvents() {
    const towerEvents = await api.get('api/events')
    AppState.towerEvents = towerEvents.data.map(e => new TowerEvent(e))
    AppState.towerEvents.forEach(e => AppState.types.push(e.type))
    AppState.types = [...new Set(AppState.types)]
  }


}
export const towerEventService = new TowerEventService()