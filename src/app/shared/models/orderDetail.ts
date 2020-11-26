import { OrderItem } from "./orderItem";

export interface OrderDetail {
  orderID: number;
  total: number;
  subTotal: number;
  taxTotal: number;
  shippingTotal: number;
  discountTotal: number;
  weightTotal: number;
  businessVolumeTotal: number;
  commissionableVolumeTotal: number;
  other1Total: number;
  other2Total: number;
  other3Total: number;
  other4Total: number;
  other5Total: number;
  other6Total: number;
  other7Total: number;
  other8Total: number;
  other9Total: number;
  other10Total: number;
  shippingTax: number;
  orderTax: number;
  handlingFeeTotal: number;
  details: Array<OrderItem>;
  warnings: Array<string>;
  orderKey: string;
}
