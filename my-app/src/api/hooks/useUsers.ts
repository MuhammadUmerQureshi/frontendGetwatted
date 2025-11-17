import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import { queryKeys } from '../queryKeys';
import { UserCreateRequest, UserUpdate } from '../types/users';

/**
 * Query: Get all users
 */
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: () => usersService.getAll(),
    select: (response) => response.res_data, // Extract just the data
  });
}

/**
 * Query: Get user by ID
 * @param userId - User ID to fetch
 */
export function useUser(userId: number) {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => usersService.getById(userId),
    select: (response) => response.res_data,
    enabled: !!userId, // Only run if userId exists
  });
}

/**
 * Mutation: Create user
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserCreateRequest) => usersService.create(data),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}

/**
 * Mutation: Update user
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: UserUpdate }) =>
      usersService.update(userId, data),
    onSuccess: (_, { userId }) => {
      // Invalidate specific user and users list
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}

/**
 * Mutation: Delete user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => usersService.delete(userId),
    onSuccess: () => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}