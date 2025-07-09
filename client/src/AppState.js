import { reactive } from 'vue'
import { TowerEvent } from './models/TowerEvent.js'


// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  accountLoaded: false,

  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,


  /** @type {TowerEvent []} */
  towerEvents: [],

  types: [],

  /** @type {TowerEvent} */
  eventDetails: null,

  attendees: ['leo', 'john', 'jake' ]


})

