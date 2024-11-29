import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/models/Product';

export type SaleDocument = HydratedDocument<Sale>;

@Schema({ _id: false })
export class Sale {
  //   SaleID,ProductID,Quantity,Date,TotalAmount

  @Prop({ unique: true })
  _id: number;

  @Prop()
  quantity: number;

  @Prop()
  date: Date;

  @Prop()
  totalAmount: number;

  @Prop({ type: Number, ref: Product.name })
  product: number;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
