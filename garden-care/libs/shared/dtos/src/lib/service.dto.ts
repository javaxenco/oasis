export interface ServiceDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: number; // Duration in minutes
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateServiceDto {
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface UpdateServiceDto {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  duration?: number;
  imageUrl?: string;
  isActive?: boolean;
}
