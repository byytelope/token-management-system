import { Document, Model, Schema, Types, model, models } from "mongoose";
import { QueueItem, queueItemSchema } from "./queueItem";

export interface ICounter {
  number: number;
  isOpen: boolean;
  queueHistory: Types.DocumentArray<QueueItem>;
}

export interface Counter extends Document, ICounter {}

const counterSchema = new Schema<Counter>({
  number: { type: Number, required: true },
  isOpen: { type: Boolean, required: true },
  queueHistory: { type: [queueItemSchema], required: true },
});

const CounterModel: Model<ICounter> =
  models.Counter || model<Counter>("Counter", counterSchema);

export default CounterModel;
