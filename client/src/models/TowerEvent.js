export class TowerEvent {
    /**
 * @typedef TowerEventData\
 * @property {string} id
 * @property {string} creatorId
 * @property {string} name
 * @property {string} description
 * @property {string} coverImg
 * @property {string} location
 * @property {number} capacity
 * @property {Date} startDate
 * @property {boolean} isCanceled
 * @property {string} type 
 * @property {object} creator
 * @property {number} ticketCount
 *  
 * 
 * @param {TowerEventData} data
 */

    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = data.startDate || new Date()
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.creator = data.creator
        this.ticketCount = data.ticketCount
    }


    formatStartDate() {
        const date = new Date(this.startDate)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

}