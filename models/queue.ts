import { Document, Model, Schema, Types, model, models } from "mongoose";
import { QueueItem, queueItemSchema } from "./queueItem";

export interface Queue {
  currentQueueNumber: number;
  items: Types.DocumentArray<QueueItem>;
}

export interface IQueue extends Document, Queue {}

const queueSchema = new Schema<Queue>({
  currentQueueNumber: { type: Number, required: true },
  items: { type: [queueItemSchema] },
});

const QueueModel: Model<IQueue> =
  models.Queue || model<Queue>("Queue", queueSchema);

export default QueueModel;
