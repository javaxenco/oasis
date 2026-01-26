export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface PaymentDto {
  id: string;
  amount: number;
  status: PaymentStatus;
  stripePaymentId?: string;
  bookingId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentDto {
  amount: number;
  bookingId: string;
}

export interface ProcessPaymentDto {
  paymentId: string;
  stripePaymentMethodId: string;
}
