import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userRolesService } from '../services/userRolesService';
import { queryKeys } from '../queryKeys';
import { UserRoleCreateRequest, UserRoleUpdate } from '../types/userRoles';

/**
 * Query: Get all user roles
 */
export function useUserRoles() {
  return useQuery({
    queryKey: queryKeys.userRoles.all,
    queryFn: () => userRolesService.getAll(),
    select: (response) => response.res_data,
  });
}

/**
 * Query: Get user role by ID
 * @param roleId - User role ID to fetch
 */
export function useUserRole(roleId: number) {
  return useQuery({
    queryKey: queryKeys.userRoles.detail(roleId),
    queryFn: () => userRolesService.getById(roleId),
    select: (response) => response.res_data,
    enabled: !!roleId,
  });
}

/**
 * Mutation: Create user role
 */
export function useCreateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserRoleCreateRequest) => userRolesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userRoles.all });
    },
  });
}

/**
 * Mutation: Update user role
 */
export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roleId, data }: { roleId: number; data: UserRoleUpdate }) =>
      userRolesService.update(roleId, data),
    onSuccess: (_, { roleId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userRoles.detail(roleId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.userRoles.all });
    },
  });
}

/**
 * Mutation: Delete user role
 */
export function useDeleteUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleId: number) => userRolesService.delete(roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userRoles.all });
    },
  });
}