import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController {
    constructor(){
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)
    }

    async createComment(request, response, next){
        try {
            const userId = request.userInfo.id
            const commentData = request.body
            commentData.creatorId = userId
            const comment = await commentService.createComment(commentData)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(request, response, next){
        try {
            const userId = request.userInfo.id
            const commentId = request.params.commentId
            const comment = await commentService.deleteComment(commentId, userId)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }
}