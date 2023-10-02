import { Document, Model, Schema, Types, model, models } from "mongoose";

export interface QueueItem {
  queueNumber: number;
  serviceName: string;
}

export interface IQueueItem extends Document, QueueItem {}

export const queueItemSchema = new Schema<QueueItem>(
  {
    queueNumber: { type: Number, required: true },
    serviceName: { type: String, required: true },
  },
  { timestamps: true }
);

const QueueItemModel: Model<IQueueItem> =
  models.QueueItem || model<QueueItem>("QueueItem", queueItemSchema);

export default QueueItemModel;
