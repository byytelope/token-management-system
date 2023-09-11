import { Document, Schema, Types, model, models } from "mongoose";
import { QueueItem, queueItemSchema } from "./queueItem";

export interface Queue extends Document {
  currentQueueNumber: number;
  items: Types.DocumentArray<QueueItem>;
}

const queueSchema = new Schema<Queue>({
  currentQueueNumber: { type: Number, required: true },
  items: { type: [queueItemSchema] },
});

export default models.Queue || model<Queue>("Queue", queueSchema);
