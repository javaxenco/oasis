import { UserDto } from './user.dto';
import { ServiceDto } from './service.dto';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface BookingDto {
  id: string;
  scheduledAt: Date;
  notes?: string;
  address: string;
  status: BookingStatus;
  customerId: string;
  customer?: UserDto;
  providerId?: string;
  provider?: UserDto;
  serviceId: string;
  service?: ServiceDto;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingDto {
  scheduledAt: Date;
  notes?: string;
  address: string;
  serviceId: string;
}

export interface UpdateBookingDto {
  scheduledAt?: Date;
  notes?: string;
  address?: string;
  status?: BookingStatus;
  providerId?: string;
}
