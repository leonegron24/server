import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { ticketService } from "../services/TicketService.js";

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)
    }


    async createTicket(request, response, next) {
        try {
            const accountId = request.userInfo.id
            const ticketData = request.body
            ticketData.accountId = accountId
            const ticket = await ticketService.createTicket(ticketData)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(request, response, next) {
        try {
            const ticketId = request.params.ticketId
            const ticketAccountId = request.body.accountId
            const userId = request.userInfo.id
            const ticket = await ticketService.deleteTicket(ticketId, userId)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }

}