import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";
import { commentService } from "../services/CommentService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId/comments', this.getEventComments)
      .get('/:eventId/tickets', this.getEventTickets)
      .get('/:eventId', this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }

  async getEventComments(request, response, next){
    try {
      const eventId = request.params.eventId
      const comments = await commentService.getEventComments(eventId)
      response.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(request, response, next) {
    try {
      const eventId = request.params.eventId
      const tickets = await ticketService.getEventTickets(eventId)
      response.send(tickets)
    } catch (error) {
      next(error)
    }
  }


  async cancelEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      console.log('Event Id: ', eventId)
      const userId = request.userInfo.id
      const event = await towerEventsService.cancelEvent(eventId, userId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(request, response, next) {
    try {
      const eventData = request.body
      const eventId = request.params.eventId
      const userId = request.userInfo.id
      const event = await towerEventsService.editEvent(eventData, eventId, userId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(request, response, next) {
    try {
      const user = request.userInfo
      const eventData = request.body
      eventData.creatorId = user.id
      const event = await towerEventsService.createEvent(eventData)
      response.send(event)
    }
    catch (error) {
      next(error);
    }
  }

  async getAllEvents(request, response, next) {
    try {
      const event = await towerEventsService.getAllEvents()
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const event = await towerEventsService.getEventById(eventId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }
}