import { reactive } from 'vue'
import { TowerEvent } from './models/TowerEvent.js'
import { Comment } from './models/Comment.js'
import { Ticket } from './models/Ticket.js'


// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  accountLoaded: false,

  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,


  /** @type {TowerEvent []} */
  towerEvents: [],

  filteredEvents: [],

  /** @type {TowerEvent []} */
  myEvents: [],

  types: [],

  /** @type {TowerEvent} */
  eventDetails: null,

  /** @type {Comment []} */
  comments: [],


  /** @type {Ticket []} */
  myTickets: [],

  numberOfTickets: null, 


    /** @type {Ticket []} */
  eventTickets: []
})

