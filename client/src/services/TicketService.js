import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Ticket } from "@/models/Ticket.js"

class TicketService {

    async createTicket(eventId, accountId) {
        const ticket = await api.post('api/tickets', { eventId: eventId, accountId: accountId })
        console.log('ticket: ', ticket.data)
        const newTicket = new Ticket(ticket.data)
        AppState.eventTickets.unshift(newTicket)
    }
}
export const ticketService = new TicketService