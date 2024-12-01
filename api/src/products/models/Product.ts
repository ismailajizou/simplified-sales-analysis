import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ _id: false })
export class Product {
  //   ProductID,ProductName,Category,Price

  @Prop({ unique: true })
  _id: number;

  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
