import { Document, Model, Schema, model, models } from "mongoose";

export interface IService {
  name: {
    [lang: string]: string;
  };
  children: IService[];
}

export interface Service extends Document, IService {}

const serviceSchema = new Schema<Service>({
  name: { type: Schema.Types.Mixed, required: true },
});

serviceSchema.add({
  children: { type: Schema.Types.Mixed, required: true },
});

const ServiceModel: Model<IService> =
  models.Service || model<Service>("Service", serviceSchema);

export default ServiceModel;
