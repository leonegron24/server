import { dbContext } from "../db/DbContext.js"

class TicketService {
    async deleteTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (ticket?.accountId.toString() !== userId) {
            throw new Error('Unauthorized: Only the ticket owner can delete it')
        }

        await ticket?.deleteOne()
        return ticket
    }

    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find().populate('event profile')
        if (!tickets) throw new Error(`No tickets with this id: ${eventId}`)
        const matchTickets = tickets.filter(t => t.eventId._id.toString() === eventId)
        return matchTickets
    }

    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId: accountId }).populate('event').populate('profile')
        if (!tickets) throw new Error(`No tickets with this id: ${accountId}`)
        return tickets
    }

    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile')
        await ticket.populate('event')
        return ticket
    }

}
export const ticketService = new TicketService()