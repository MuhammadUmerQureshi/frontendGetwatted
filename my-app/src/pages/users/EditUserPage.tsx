import { useState, useEffect, FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUser, useUpdateUser } from '@/api/hooks/useUsers'
import { useUserRoles } from '@/api/hooks/useUserRoles'
import { useCompanies } from '@/api/hooks/useCompanies'
import type { UserUpdate } from '@/api/types/users'

export function EditUserPage() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const id = Number(userId)

  const { data: user, isLoading: userLoading, isError, error } = useUser(id)
  const updateUserMutation = useUpdateUser()
  const { data: userRoles, isLoading: rolesLoading } = useUserRoles()
  const { data: companies, isLoading: companiesLoading } = useCompanies()

  const [formData, setFormData] = useState({
    user_first_name: '',
    user_last_name: '',
    user_email: '',
    user_phone: '',
    user_role_id: '',
    user_company_id: '',
  })

  const [isDirty, setIsDirty] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        user_first_name: user.user_first_name || '',
        user_last_name: user.user_last_name || '',
        user_email: user.user_email || '',
        user_phone: user.user_phone || '',
        user_role_id: user.user_role_id ? String(user.user_role_id) : '',
        user_company_id: user.user_company_id ? String(user.user_company_id) : '',
      })
    }
  }, [user])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!user) return

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!formData.user_first_name.trim()) {
      newErrors.user_first_name = 'First name is required'
    } else if (formData.user_first_name.length > 100) {
      newErrors.user_first_name = 'First name must be less than 100 characters'
    }

    if (!formData.user_last_name.trim()) {
      newErrors.user_last_name = 'Last name is required'
    } else if (formData.user_last_name.length > 100) {
      newErrors.user_last_name = 'Last name must be less than 100 characters'
    }

    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = 'Invalid email format'
    }

    if (formData.user_phone && formData.user_phone.length > 50) {
      newErrors.user_phone = 'Phone must be less than 50 characters'
    }

    if (!formData.user_role_id) {
      newErrors.user_role_id = 'Role is required'
    }

    if (!formData.user_company_id) {
      newErrors.user_company_id = 'Company is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      // Build update data - only send changed fields
      const updateData: UserUpdate = {}

      if (formData.user_first_name.trim() !== (user.user_first_name || '')) {
        updateData.user_first_name = formData.user_first_name.trim()
      }
      if (formData.user_last_name.trim() !== (user.user_last_name || '')) {
        updateData.user_last_name = formData.user_last_name.trim()
      }
      if (formData.user_email.trim() !== (user.user_email || '')) {
        updateData.user_email = formData.user_email.trim()
      }
      if (formData.user_phone.trim() !== (user.user_phone || '')) {
        updateData.user_phone = formData.user_phone.trim()
      }
      if (Number(formData.user_role_id) !== user.user_role_id) {
        updateData.user_role_id = Number(formData.user_role_id)
      }
      if (Number(formData.user_company_id) !== user.user_company_id) {
        updateData.user_company_id = Number(formData.user_company_id)
      }

      // Only update if there are changes
      if (Object.keys(updateData).length > 0) {
        await updateUserMutation.mutateAsync({ userId: id, data: updateData })
      }

      // Navigate back to user details
      navigate(`/users/${id}`)
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to update user'
      setErrors({ submit: errorMessage })
    }
  }

  const handleCancel = () => {
    navigate(`/users/${id}`)
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: '' })
    setIsDirty(true)
  }

  // Loading State
  if (userLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
          <p className="text-sm text-gray-400">Loading user...</p>
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
            onClick={() => navigate('/users')}
            className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            Back to Users
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="text-gray-400 hover:text-yellow-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to User Details
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white">Edit User</h1>
        <p className="mt-1 text-sm text-gray-400">
          Update user information for {user.user_first_name} {user.user_last_name}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
          <div className="space-y-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="user_first_name" className="text-gray-300">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="user_first_name"
                type="text"
                value={formData.user_first_name}
                onChange={(e) => handleChange('user_first_name', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter first name"
                maxLength={100}
              />
              {errors.user_first_name && (
                <p className="text-sm text-red-400">{errors.user_first_name}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="user_last_name" className="text-gray-300">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="user_last_name"
                type="text"
                value={formData.user_last_name}
                onChange={(e) => handleChange('user_last_name', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter last name"
                maxLength={100}
              />
              {errors.user_last_name && (
                <p className="text-sm text-red-400">{errors.user_last_name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="user_email" className="text-gray-300">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="user_email"
                type="email"
                value={formData.user_email}
                onChange={(e) => handleChange('user_email', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter email address"
              />
              {errors.user_email && (
                <p className="text-sm text-red-400">{errors.user_email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="user_phone" className="text-gray-300">
                Phone
              </Label>
              <Input
                id="user_phone"
                type="tel"
                value={formData.user_phone}
                onChange={(e) => handleChange('user_phone', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter phone number"
                maxLength={50}
              />
              {errors.user_phone && (
                <p className="text-sm text-red-400">{errors.user_phone}</p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="user_role_id" className="text-gray-300">
                Role <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.user_role_id || undefined}
                onValueChange={(value) => handleChange('user_role_id', value)}
                disabled={rolesLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {userRoles?.map((role) => (
                    <SelectItem key={role.user_role_id} value={String(role.user_role_id)}>
                      {role.user_role_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.user_role_id && (
                <p className="text-sm text-red-400">{errors.user_role_id}</p>
              )}
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="user_company_id" className="text-gray-300">
                Company <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.user_company_id || undefined}
                onValueChange={(value) => handleChange('user_company_id', value)}
                disabled={companiesLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies?.map((company) => (
                    <SelectItem key={company.company_id} value={String(company.company_id)}>
                      {company.company_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.user_company_id && (
                <p className="text-sm text-red-400">{errors.user_company_id}</p>
              )}
            </div>

            {/* Keycloak ID - Read Only */}
            <div className="space-y-2">
              <Label htmlFor="user_keycloak_id" className="text-gray-300">
                Keycloak ID
              </Label>
              <Input
                id="user_keycloak_id"
                type="text"
                value={user.user_keycloak_id}
                disabled
                className="bg-gray-900 border-gray-700 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">This field cannot be edited</p>
            </div>
          </div>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="rounded-lg border border-red-800 bg-red-900/10 p-4">
            <p className="text-sm text-red-400">{errors.submit}</p>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={updateUserMutation.isPending}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={updateUserMutation.isPending || !isDirty}
            className="bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-50"
          >
            {updateUserMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}