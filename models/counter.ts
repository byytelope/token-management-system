import { Document, Schema, Types, model, models } from "mongoose";
import { QueueItem, queueItemSchema } from "./queueItem";

export interface Counter extends Document {
  name: string;
  isOpen: boolean;
  queueHistory: Types.DocumentArray<QueueItem>;
}

const counterSchema = new Schema<Counter>({
  name: { type: String, required: true },
  isOpen: { type: Boolean, required: true },
  queueHistory: { type: [queueItemSchema] },
});

export default models.Counter || model<Counter>("Counter", counterSchema);
