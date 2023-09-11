import { Document, Schema, Types, model, models } from "mongoose";

export interface QueueItem extends Document {
  queueNumber: number;
  service: Types.ObjectId;
}

export const queueItemSchema = new Schema<QueueItem>({
  queueNumber: { type: Number, required: true },
  service: { type: Schema.Types.ObjectId, required: true },
});

export default models.QueueItem ||
  model<QueueItem>("QueueItem", queueItemSchema);
