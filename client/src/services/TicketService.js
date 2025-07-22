import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Ticket } from "@/models/Ticket.js"
import { towerEventService } from "./TowerEventService.js"
import { Pop } from "@/utils/Pop.js"

class TicketService {
    async deleteTicket(eventId) {
        const myTickets = AppState.myTickets
        const ticketToDelete = myTickets.find(t => t.eventId === eventId)
        const ticketId = ticketToDelete.id
        const confirm = await Pop.confirm('Are you sure you want to delete this ticket?')
        if (!confirm) {
            return
        }
        await api.delete(`api/tickets/${ticketId}`)
        Pop.success( `Successfully deleted Ticket for event ${eventId}`)
        const indexOfTicket = AppState.myTickets.findIndex(t => t.id === ticketId)
        AppState.myTickets.splice(indexOfTicket, 1)
        const indexOfEvent = AppState.myEvents.findIndex(e => e.id === eventId)
        if (indexOfEvent !== -1) {
            AppState.myEvents.splice(indexOfEvent, 1)
        }

    }

    async createTicket(eventId, accountId) {
        const ticket = await api.post('api/tickets', { eventId: eventId, accountId: accountId })
        console.log('ticket: ', ticket.data)
        const newTicket = new Ticket(ticket.data)
        AppState.eventTickets.unshift(newTicket)
    }
}
export const ticketService = new TicketService