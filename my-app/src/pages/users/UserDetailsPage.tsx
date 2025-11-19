import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, User as UserIcon, Loader2, AlertCircle, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeleteUserDialog } from '@/components/users/DeleteUserDialog'
import { useUser } from '@/api/hooks/useUsers'
import { useUserRoles } from '@/api/hooks/useUserRoles'
import { useCompanies } from '@/api/hooks/useCompanies'

export function UserDetailsPage() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const id = Number(userId)

  const { data: user, isLoading, isError, error, refetch } = useUser(id)
  const { data: userRoles } = useUserRoles()
  const { data: companies } = useCompanies()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleBack = () => {
    navigate('/users')
  }

  const handleEdit = () => {
    navigate(`/users/${id}/edit`)
  }

  const handleDelete = () => {
    setDeleteDialogOpen(true)
  }

  // Helper functions
  const getUserFullName = () => {
    if (!user) return ''
    if (user.user_first_name && user.user_last_name) {
      return `${user.user_first_name} ${user.user_last_name}`
    }
    return user.user_first_name || user.user_last_name || user.user_email || `User #${user.user_id}`
  }

  const getRoleName = () => {
    if (!user?.user_role_id || !userRoles) return '-'
    const role = userRoles.find(r => r.user_role_id === user.user_role_id)
    return role ? role.user_role_name : `Role #${user.user_role_id}`
  }

  const getCompanyName = () => {
    if (!user?.user_company_id || !companies) return '-'
    const company = companies.find(c => c.company_id === user.user_company_id)
    return company ? company.company_name : `Company #${user.user_company_id}`
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
          <p className="text-sm text-gray-400">Loading user details...</p>
        </div>
      </div>
    )
  }

  // Error State
  if (isError || !user) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-900/10 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-500">Failed to load user</h3>
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
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-gray-400 hover:text-yellow-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="border-red-800 bg-red-900/10 text-red-400 hover:bg-red-900/20"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* User Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-700 bg-gray-800">
          <UserIcon className="h-10 w-10 text-yellow-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{getUserFullName()}</h1>
        </div>
      </div>

      {/* Details Table */}
      <div className="overflow-hidden rounded-lg border border-gray-800 bg-[#1a1a1a]">
        <table className="w-full">
          <tbody>
            {/* BASIC INFORMATION Section */}
            <tr>
              <td colSpan={2} className="border-b border-gray-800 bg-yellow-500/10 px-6 py-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
                  Basic Information
                </h2>
              </td>
            </tr>

            {/* User ID */}
            <tr className="border-b border-gray-800">
              <td className="w-48 px-6 py-4 text-sm font-medium text-gray-400">
                User ID
              </td>
              <td className="px-6 py-4 text-sm text-white">
                {user.user_id}
              </td>
            </tr>

            {/* First Name */}
            <tr className="border-b border-gray-800">
              <td className="w-48 px-6 py-4 text-sm font-medium text-gray-400">
                First Name
              </td>
              <td className="px-6 py-4 text-sm text-white">
                {user.user_first_name || '-'}
              </td>
            </tr>

            {/* Last Name */}
            <tr className="border-b border-gray-800">
              <td className="w-48 px-6 py-4 text-sm font-medium text-gray-400">
                Last Name
              </td>
              <td className="px-6 py-4 text-sm text-white">
                {user.user_last_name || '-'}
              </td>
            </tr>

            {/* Email */}
            <tr className="border-b border-gray-800">
              <td className="w-48 px-6 py-4 text-sm font-medium text-gray-400">
                Email
              </td>
              <td className="px-6 py-4 text-sm text-white">
                {user.user_email || '-'}
              </td>
            </tr>

            {/* Phone */}
            <tr className="border-b border-gray-800">
              <td className="w-48 px-6 py-4 text-sm font-medium text-gray-400">
                Phone
              </td>
              <td className="px-6 py-4 text-sm text-white">
                {user.user_phone || '-'}
              </td>
            </tr>

            {/* Keycloak ID */}
            <tr className="border-b border-gray-800">
              <td className="w-48 px-6 py-4 text-sm font-medium text-gray-400">
                Keycloak ID
              </td>
              <td className="px-6 py-4 text-sm font-mono text-gray-300">
                {user.user_keycloak_id}
              </td>
            </tr>

            {/* ASSOCIATIONS Section */}
            <tr>
              <td colSpan={2} className="border-b border-gray-800 bg-yellow-500/10 px-6 py-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
                  Associations
                </h2>
              </td>
            </tr>

            {/* Role */}
            <tr className="border-b border-gray-800">
              <td className="w-48 px-6 py-4 text-sm font-medium text-gray-400">
                Role
              </td>
              <td className="px-6 py-4 text-sm text-white">
                {getRoleName()}
              </td>
            </tr>

            {/* Company */}
            <tr className="border-b border-gray-800">
              <td className="w-48 px-6 py-4 text-sm font-medium text-gray-400">
                Company
              </td>
              <td className="px-6 py-4 text-sm text-white">
                {getCompanyName()}
              </td>
            </tr>

            {/* TIMESTAMPS Section */}
            <tr>
              <td colSpan={2} className="border-b border-gray-800 bg-yellow-500/10 px-6 py-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
                  Timestamps
                </h2>
              </td>
            </tr>

            {/* Created */}
            <tr className="border-b border-gray-800">
              <td className="w-48 px-6 py-4 text-sm font-medium text-gray-400">
                Created
              </td>
              <td className="px-6 py-4 text-sm text-white">
                {formatDateTime(user.user_created)}
              </td>
            </tr>

            {/* Last Updated */}
            <tr>
              <td className="w-48 px-6 py-4 text-sm font-medium text-gray-400">
                Last Updated
              </td>
              <td className="px-6 py-4 text-sm text-white">
                {formatDateTime(user.user_updated)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog
        user={user}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  )
}