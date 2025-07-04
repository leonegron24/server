import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: {type: Schema.ObjectId, ref:'Account', required:true},
    eventId: {type: Schema.ObjectId, ref:'TowerEvent', required: true},
    body: {type: String, required: true, minLength: 1, maxLength: 1000}
}, {timestamps: true, toJSON: {virtuals: true} })

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})