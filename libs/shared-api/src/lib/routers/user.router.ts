import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { CreateUserSchema, UpdateUserSchema } from '../schemas';

// 임시 사용자 데이터 (실제로는 데이터베이스에서 가져옴)
const mockUsers = [
  {
    id: '1',
    email: 'user1@example.com',
    name: '사용자 1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'user2@example.com',
    name: '사용자 2',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
];

export const userRouter = router({
  // 모든 사용자 조회
  getAll: publicProcedure.query(() => {
    return mockUsers;
  }),

  // 특정 사용자 조회
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const user = mockUsers.find((u) => u.id === input.id);
      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }
      return user;
    }),

  // 사용자 생성
  create: publicProcedure
    .input(CreateUserSchema)
    .mutation(({ input }) => {
      const newUser = {
        id: (mockUsers.length + 1).toString(),
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockUsers.push(newUser);
      return newUser;
    }),

  // 사용자 수정
  update: publicProcedure
    .input(z.object({ id: z.string() }).merge(UpdateUserSchema))
    .mutation(({ input }) => {
      const userIndex = mockUsers.findIndex((u) => u.id === input.id);
      if (userIndex === -1) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }
      
      const updatedUser = {
        ...mockUsers[userIndex],
        ...input,
        updatedAt: new Date(),
      };
      mockUsers[userIndex] = updatedUser;
      return updatedUser;
    }),

  // 사용자 삭제
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const userIndex = mockUsers.findIndex((u) => u.id === input.id);
      if (userIndex === -1) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }
      
      const deletedUser = mockUsers[userIndex];
      mockUsers.splice(userIndex, 1);
      return deletedUser;
    }),
});
