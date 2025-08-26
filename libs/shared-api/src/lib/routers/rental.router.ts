import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { CreateRentalItemSchema, UpdateRentalItemSchema } from '../schemas';

// 임시 임대 아이템 데이터
const mockRentalItems = [
  {
    id: '1',
    title: '캠핑 텐트',
    description: '4인용 캠핑 텐트입니다. 방수 기능이 있습니다.',
    price: 50000,
    ownerId: '1',
    isAvailable: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: '전자드릴',
    description: '무선 전자드릴입니다. 배터리 포함.',
    price: 30000,
    ownerId: '2',
    isAvailable: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
];

export const rentalRouter = router({
  // 모든 임대 아이템 조회
  getAll: publicProcedure.query(() => {
    return mockRentalItems;
  }),

  // 특정 임대 아이템 조회
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const item = mockRentalItems.find((item) => item.id === input.id);
      if (!item) {
        throw new Error('임대 아이템을 찾을 수 없습니다.');
      }
      return item;
    }),

  // 사용자별 임대 아이템 조회
  getByOwnerId: publicProcedure
    .input(z.object({ ownerId: z.string() }))
    .query(({ input }) => {
      return mockRentalItems.filter((item) => item.ownerId === input.ownerId);
    }),

  // 사용 가능한 임대 아이템 조회
  getAvailable: publicProcedure.query(() => {
    return mockRentalItems.filter((item) => item.isAvailable);
  }),

  // 임대 아이템 생성
  create: publicProcedure
    .input(CreateRentalItemSchema.extend({ ownerId: z.string() }))
    .mutation(({ input }) => {
      const newItem = {
        id: (mockRentalItems.length + 1).toString(),
        ...input,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRentalItems.push(newItem);
      return newItem;
    }),

  // 임대 아이템 수정
  update: publicProcedure
    .input(z.object({ id: z.string() }).merge(UpdateRentalItemSchema))
    .mutation(({ input }) => {
      const itemIndex = mockRentalItems.findIndex((item) => item.id === input.id);
      if (itemIndex === -1) {
        throw new Error('임대 아이템을 찾을 수 없습니다.');
      }
      
      const updatedItem = {
        ...mockRentalItems[itemIndex],
        ...input,
        updatedAt: new Date(),
      };
      mockRentalItems[itemIndex] = updatedItem;
      return updatedItem;
    }),

  // 임대 아이템 삭제
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const itemIndex = mockRentalItems.findIndex((item) => item.id === input.id);
      if (itemIndex === -1) {
        throw new Error('임대 아이템을 찾을 수 없습니다.');
      }
      
      const deletedItem = mockRentalItems[itemIndex];
      mockRentalItems.splice(itemIndex, 1);
      return deletedItem;
    }),
});
