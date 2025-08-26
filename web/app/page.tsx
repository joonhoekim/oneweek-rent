'use client';

import { trpc } from '../lib/trpc';

export default function Home() {
  // tRPC hooks 사용
  const { data: users, isLoading: usersLoading } = trpc.user.getAll.useQuery();
  const { data: rentals, isLoading: rentalsLoading } = trpc.rental.getAll.useQuery();
  
  const utils = trpc.useUtils();
  
  const createUserMutation = trpc.user.create.useMutation({
    onSuccess: () => {
      // 사용자 목록 새로고침
      utils.user.getAll.invalidate();
    },
  });

  const handleCreateUser = () => {
    createUserMutation.mutate({
      name: '새 사용자',
      email: `user${Date.now()}@example.com`,
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          OneWeek Rent - tRPC 데모
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 사용자 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">사용자 목록</h2>
              <button
                onClick={handleCreateUser}
                disabled={createUserMutation.isPending}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-md transition-colors"
              >
                {createUserMutation.isPending ? '생성 중...' : '사용자 추가'}
              </button>
            </div>
            
            {usersLoading ? (
              <p className="text-gray-500">로딩 중...</p>
            ) : (
              <div className="space-y-3">
                {users?.map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-md p-4">
                    <h3 className="font-medium text-gray-800">{user.name}</h3>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                    <p className="text-gray-500 text-xs">
                      생성일: {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 임대 아이템 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">임대 아이템 목록</h2>
            
            {rentalsLoading ? (
              <p className="text-gray-500">로딩 중...</p>
            ) : (
              <div className="space-y-3">
                {rentals?.map((rental) => (
                  <div key={rental.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800">{rental.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        rental.isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {rental.isAvailable ? '대여 가능' : '대여 중'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{rental.description}</p>
                    <p className="text-blue-600 font-medium">
                      ₩{rental.price.toLocaleString()}/주
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* tRPC 정보 섹션 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">tRPC 구성 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">📚 Shared API</h3>
              <p className="text-blue-700">
                공유 라이브러리에서 tRPC 라우터와 타입을 정의하여 
                백엔드와 프론트엔드에서 동일한 API 스키마 사용
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="font-medium text-green-800 mb-2">🖥️ Backend (NestJS)</h3>
              <p className="text-green-700">
                NestJS에서 tRPC 서버를 설정하여 
                /trpc 엔드포인트로 API 제공
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-md">
              <h3 className="font-medium text-purple-800 mb-2">🌐 Frontend (Next.js)</h3>
              <p className="text-purple-700">
                Next.js에서 tRPC 클라이언트를 설정하여 
                타입 안전한 API 호출과 React Query 통합
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
