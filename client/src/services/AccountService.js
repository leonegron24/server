import { Ticket } from '@/models/Ticket.js'
import { AppState } from '../AppState.js'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class AccountService {

  async getMyTickets() {
    const response = await api.get('account/tickets')
    const myTickets = response.data.map(t => new Ticket(t))
    if (myTickets.length == 0) {
      throw new Error('there are no event tickets with that accountId')
    }
    AppState.myTickets = myTickets
    AppState.numberOfTickets = myTickets.length
    console.log('myTickets: ', myTickets)

    // Each of the tickets has an eventId that it ties too. I need to figure out to grab the event Id and pass it into a getMyEvents function that grabs the events from the api (should i be grabbing from the appstate? ). Going to towerService sounds good
  }

  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    }
    catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

}

export const accountService = new AccountService()
