import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react'
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
import { useCreateUser } from '@/api/hooks/useUsers'
import { useUserRoles } from '@/api/hooks/useUserRoles'
import { useCompanies } from '@/api/hooks/useCompanies'

export function CreateUserPage() {
  const navigate = useNavigate()
  const createUserMutation = useCreateUser()
  const { data: userRoles, isLoading: rolesLoading } = useUserRoles()
  const { data: companies, isLoading: companiesLoading } = useCompanies()

  const [formData, setFormData] = useState({
    user_first_name: '',
    user_last_name: '',
    user_email: '',
    password: '',
    user_phone: '',
    user_role_id: '',
    user_company_id: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

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

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
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
      // Build create request
      const createRequest: any = {
        user_data: {
          user_first_name: formData.user_first_name.trim(),
          user_last_name: formData.user_last_name.trim(),
          user_email: formData.user_email.trim(),
        },
        password: formData.password,
      }

      // Add optional fields only if they have values
      if (formData.user_phone.trim()) {
        createRequest.user_data.user_phone = formData.user_phone.trim()
      }
      if (formData.user_role_id) {
        createRequest.user_data.user_role_id = Number(formData.user_role_id)
      }
      if (formData.user_company_id) {
        createRequest.user_data.user_company_id = Number(formData.user_company_id)
      }

      const response = await createUserMutation.mutateAsync(createRequest)

      // Navigate to user details page on success
      if (response.res_data) {
        const userId = response.res_data.user_id
        navigate(`/users/${userId}`)
      } else {
        navigate('/users')
      }
    } catch (error: any) {
      // Handle API errors
      const errorMessage = error?.response?.data?.message || 'Failed to create user'
      setErrors({ submit: errorMessage })
    }
  }

  const handleCancel = () => {
    navigate('/users')
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
          Back to Users
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white">Create User</h1>
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
                onChange={(e) => {
                  setFormData({ ...formData, user_first_name: e.target.value })
                  setErrors({ ...errors, user_first_name: '' })
                }}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter first name"
                maxLength={100}
                autoFocus
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
                onChange={(e) => {
                  setFormData({ ...formData, user_last_name: e.target.value })
                  setErrors({ ...errors, user_last_name: '' })
                }}
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
                onChange={(e) => {
                  setFormData({ ...formData, user_email: e.target.value })
                  setErrors({ ...errors, user_email: '' })
                }}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter email address"
              />
              {errors.user_email && (
                <p className="text-sm text-red-400">{errors.user_email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                    setErrors({ ...errors, password: '' })
                  }}
                  className="bg-gray-800 border-gray-700 text-white pr-10"
                  placeholder="Enter password (min 8 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password}</p>
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
                onChange={(e) => {
                  setFormData({ ...formData, user_phone: e.target.value })
                  setErrors({ ...errors, user_phone: '' })
                }}
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
                onValueChange={(value) => {
                  setFormData({ ...formData, user_role_id: value })
                  setErrors({ ...errors, user_role_id: '' })
                }}
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
                onValueChange={(value) => {
                  setFormData({ ...formData, user_company_id: value })
                  setErrors({ ...errors, user_company_id: '' })
                }}
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
            disabled={createUserMutation.isPending}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createUserMutation.isPending}
            className="bg-yellow-500 text-black hover:bg-yellow-400"
          >
            {createUserMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create User'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}