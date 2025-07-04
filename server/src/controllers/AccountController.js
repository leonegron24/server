import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService.js'
import BaseController from '../utils/BaseController.js'
import { ticketService } from '../services/TicketService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      .get('/tickets', this.getMyTickets)
  }

  async getMyTickets(request, response, next){
    try {
      console.log('getMyTickets')
      const accountId = request.userInfo.id
      const tickets = await ticketService.getMyTickets(accountId)
      response.send(tickets)
    } catch (error) {
      next(error)
    }
  } 

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

   async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  
}
