import { z } from 'zod';

// 사용자 관련 스키마
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
});

// 임대 관련 스키마 (예시)
export const RentalItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number().positive(),
  ownerId: z.string(),
  isAvailable: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateRentalItemSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
});

export const UpdateRentalItemSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  isAvailable: z.boolean().optional(),
});

// 타입 내보내기
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type RentalItem = z.infer<typeof RentalItemSchema>;
export type CreateRentalItem = z.infer<typeof CreateRentalItemSchema>;
export type UpdateRentalItem = z.infer<typeof UpdateRentalItemSchema>;
