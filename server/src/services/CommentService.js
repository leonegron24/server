import { dbContext } from "../db/DbContext.js"

class CommentService{

    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (comment?.creatorId.toString() !== userId){
            throw Error(`Can not delete comment, only user: ${userId} can delete`)
        }
        await comment?.deleteOne()
        return `Successfully deleted comment: ${commentId}`
    }

    async getEventComments(eventId) {
      const comments = await dbContext.Comments.find({eventId: eventId}).populate('creator')
      return comments
    }

    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator')
        return comment
    }

    



}
export const commentService = new CommentService()