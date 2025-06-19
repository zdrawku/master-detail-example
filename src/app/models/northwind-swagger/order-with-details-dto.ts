import { AddressDto } from './address-dto';
import { OrderDetailDto } from './order-detail-dto';

export interface OrderWithDetailsDto {
  orderId: number;
  customerId: string;
  employeeId: number;
  shipperId: number;
  orderDate: Date;
  requiredDate: Date;
  shipVia: string;
  freight: number;
  shipName: string;
  completed: boolean;
  shipAddress: AddressDto;
  orderDetails: OrderDetailDto[];
}
