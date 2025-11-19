import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users as UsersIcon, Plus, Loader2, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UsersTable } from '@/components/users/UsersTable'
import { DeleteUserDialog } from '@/components/users/DeleteUserDialog'
import { useUsers } from '@/api/hooks/useUsers'
import { useUserRoles } from '@/api/hooks/useUserRoles'
import { useCompanies } from '@/api/hooks/useCompanies'
import type { User } from '@/api/types/users'

export function UsersPage() {
  const navigate = useNavigate()
  const { data: users, isLoading, isError, error, refetch } = useUsers()
  const { data: userRoles, isLoading: rolesLoading } = useUserRoles()
  const { data: companies, isLoading: companiesLoading } = useCompanies()

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('all')
  const [selectedRoleId, setSelectedRoleId] = useState<string>('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Filter users based on selected filters
  const filteredUsers = users?.filter((user) => {
    const companyMatch =
      selectedCompanyId === 'all' ||
      user.user_company_id === Number(selectedCompanyId)

    const roleMatch =
      selectedRoleId === 'all' ||
      user.user_role_id === Number(selectedRoleId)

    return companyMatch && roleMatch
  }) || []

  const hasActiveFilters = selectedCompanyId !== 'all' || selectedRoleId !== 'all'

  const handleView = (user: User) => {
    navigate(`/users/${user.user_id}`)
  }

  const handleEdit = (user: User) => {
    navigate(`/users/${user.user_id}/edit`)
  }

  const handleDelete = (user: User) => {
    setSelectedUser(user)
    setDeleteDialogOpen(true)
  }

  const handleCreate = () => {
    navigate('/users/new')
  }

  const handleClearFilters = () => {
    setSelectedCompanyId('all')
    setSelectedRoleId('all')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-yellow-500/10 p-2">
            <UsersIcon className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Users</h1>
          </div>
        </div>

        {/* Create Button */}
        <Button
          onClick={handleCreate}
          className="bg-yellow-500 text-black hover:bg-yellow-400"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Filters Section */}
      <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-400">Filters:</span>

          {/* Company Filter */}
          <Select
            value={selectedCompanyId}
            onValueChange={setSelectedCompanyId}
            disabled={companiesLoading}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies?.map((company) => (
                <SelectItem key={company.company_id} value={String(company.company_id)}>
                  {company.company_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Role Filter */}
          <Select
            value={selectedRoleId}
            onValueChange={setSelectedRoleId}
            disabled={rolesLoading}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {userRoles?.map((role) => (
                <SelectItem key={role.user_role_id} value={String(role.user_role_id)}>
                  {role.user_role_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-gray-400 hover:text-white"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex h-64 items-center justify-center rounded-lg border border-gray-800 bg-[#1a1a1a]">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            <p className="text-sm text-gray-400">Loading users...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="rounded-lg border border-red-800 bg-red-900/10 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-500">
                Failed to load users
              </h3>
              <p className="mt-1 text-sm text-red-400">
                {error instanceof Error ? error.message : 'An error occurred'}
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => refetch()}
              className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Users Table */}
      {!isLoading && !isError && users && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Total Users:</span>
            <span className="font-semibold text-white">{users.length}</span>
            {hasActiveFilters && (
              <>
                <span className="text-gray-600">•</span>
                <span>Showing:</span>
                <span className="font-semibold text-yellow-500">{filteredUsers.length}</span>
              </>
            )}
          </div>

          {/* Table */}
          <UsersTable
            users={filteredUsers}
            userRoles={userRoles || undefined}
            companies={companies || undefined}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && users && users.length === 0 && (
        <div className="flex h-64 items-center justify-center rounded-lg border border-gray-800 bg-[#1a1a1a]">
          <div className="flex flex-col items-center gap-3 text-center">
            <UsersIcon className="h-12 w-12 text-gray-600" />
            <div>
              <h3 className="font-semibold text-white">No users yet</h3>
              <p className="mt-1 text-sm text-gray-400">
                Get started by creating your first user
              </p>
            </div>
            <Button
              onClick={handleCreate}
              className="mt-2 bg-yellow-500 text-black hover:bg-yellow-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedUser && (
        <DeleteUserDialog
          user={selectedUser}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </div>
  )
}