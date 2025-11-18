import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, AlertCircle, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreateCompany } from '@/api/hooks/useCompanies'
import type { CompanyCreate } from '@/api/types/companies'

export function CreateCompanyPage() {
  const navigate = useNavigate()
  const createCompanyMutation = useCreateCompany()

  // Form state - start with empty values
  const [formData, setFormData] = useState({
    company_name: '',
    company_enabled: false, // Default to Inactive
    company_home_photo: '',
    company_brand_colour: '',
    company_brand_logo: '',
    company_brand_favicon: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)

  const handleBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      )
      if (!confirmLeave) return
    }
    navigate('/companies')
  }

  const handleChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setIsDirty(true)
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Company name is required
    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required'
    } else if (formData.company_name.length > 255) {
      newErrors.company_name = 'Company name must be less than 255 characters'
    }

    // Validate URLs if provided
    const urlFields: Array<keyof typeof formData> = [
      'company_home_photo',
      'company_brand_logo',
      'company_brand_favicon',
    ]

    urlFields.forEach((field) => {
      const value = formData[field] as string
      if (value && value.trim()) {
        try {
          new URL(value)
          if (value.length > 255) {
            newErrors[field] = 'URL must be less than 255 characters'
          }
        } catch {
          newErrors[field] = 'Please enter a valid URL'
        }
      }
    })

    // Validate brand color if provided
    if (formData.company_brand_colour && formData.company_brand_colour.trim()) {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
      if (!hexRegex.test(formData.company_brand_colour)) {
        newErrors.company_brand_colour = 'Please enter a valid hex color (e.g., #0066CC)'
      } else if (formData.company_brand_colour.length > 50) {
        newErrors.company_brand_colour = 'Brand color must be less than 50 characters'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Prepare create data - only include optional fields if they have values
    const createData: CompanyCreate = {
      company_name: formData.company_name.trim(),
      company_enabled: formData.company_enabled,
    }

    // Add optional fields only if they have values
    if (formData.company_brand_colour && formData.company_brand_colour.trim()) {
      createData.company_brand_colour = formData.company_brand_colour.trim()
    }
    if (formData.company_brand_logo && formData.company_brand_logo.trim()) {
      createData.company_brand_logo = formData.company_brand_logo.trim()
    }
    if (formData.company_brand_favicon && formData.company_brand_favicon.trim()) {
      createData.company_brand_favicon = formData.company_brand_favicon.trim()
    }
    if (formData.company_home_photo && formData.company_home_photo.trim()) {
      createData.company_home_photo = formData.company_home_photo.trim()
    }

    try {
      const result = await createCompanyMutation.mutateAsync({
        company_data: createData,
      })
      setIsDirty(false)
      // Navigate to the newly created company's details page
      navigate(`/companies/${result.res_data.company_id}`)
    } catch (err) {
      console.error('Failed to create company:', err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-yellow-500">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Button>
      </div>

      {/* Page Title */}
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Create New Company</h1>
        <p className="mt-1 text-sm text-gray-400">
          Add a new company to the system
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Basic Information</h2>

          <div className="space-y-4">
            {/* Company Name */}
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-gray-300">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleChange('company_name', e.target.value)}
                className={`mt-1 block w-full rounded-md border ${
                  errors.company_name ? 'border-red-500' : 'border-gray-700'
                } bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                placeholder="Enter company name"
                autoFocus
              />
              {errors.company_name && (
                <p className="mt-1 text-sm text-red-500">{errors.company_name}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Company name must be globally unique
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="company_enabled"
                    checked={formData.company_enabled === true}
                    onChange={() => handleChange('company_enabled', true)}
                    className="h-4 w-4 border-gray-700 bg-gray-900 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-sm text-gray-300">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="company_enabled"
                    checked={formData.company_enabled === false}
                    onChange={() => handleChange('company_enabled', false)}
                    className="h-4 w-4 border-gray-700 bg-gray-900 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-sm text-gray-300">Inactive</span>
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                New companies are typically created as Inactive
              </p>
            </div>
          </div>
        </div>

        {/* Branding Section */}
        <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Branding (Optional)</h2>

          <div className="space-y-4">
            {/* Brand Color */}
            <div>
              <label htmlFor="company_brand_colour" className="block text-sm font-medium text-gray-300">
                Brand Color
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  id="company_brand_colour"
                  value={formData.company_brand_colour}
                  onChange={(e) => handleChange('company_brand_colour', e.target.value)}
                  className={`block w-full rounded-md border ${
                    errors.company_brand_colour ? 'border-red-500' : 'border-gray-700'
                  } bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                  placeholder="#0066CC"
                />
                {formData.company_brand_colour && (
                  <div
                    className="h-10 w-10 rounded border border-gray-700"
                    style={{ backgroundColor: formData.company_brand_colour }}
                    title={formData.company_brand_colour}
                  />
                )}
              </div>
              {errors.company_brand_colour && (
                <p className="mt-1 text-sm text-red-500">{errors.company_brand_colour}</p>
              )}
            </div>

            {/* Brand Logo URL */}
            <div>
              <label htmlFor="company_brand_logo" className="block text-sm font-medium text-gray-300">
                Brand Logo URL
              </label>
              <input
                type="text"
                id="company_brand_logo"
                value={formData.company_brand_logo}
                onChange={(e) => handleChange('company_brand_logo', e.target.value)}
                className={`mt-1 block w-full rounded-md border ${
                  errors.company_brand_logo ? 'border-red-500' : 'border-gray-700'
                } bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                placeholder="https://example.com/logo.png"
              />
              {errors.company_brand_logo && (
                <p className="mt-1 text-sm text-red-500">{errors.company_brand_logo}</p>
              )}
            </div>

            {/* Favicon URL */}
            <div>
              <label htmlFor="company_brand_favicon" className="block text-sm font-medium text-gray-300">
                Favicon URL
              </label>
              <input
                type="text"
                id="company_brand_favicon"
                value={formData.company_brand_favicon}
                onChange={(e) => handleChange('company_brand_favicon', e.target.value)}
                className={`mt-1 block w-full rounded-md border ${
                  errors.company_brand_favicon ? 'border-red-500' : 'border-gray-700'
                } bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                placeholder="https://example.com/favicon.ico"
              />
              {errors.company_brand_favicon && (
                <p className="mt-1 text-sm text-red-500">{errors.company_brand_favicon}</p>
              )}
            </div>

            {/* Home Photo URL */}
            <div>
              <label htmlFor="company_home_photo" className="block text-sm font-medium text-gray-300">
                Home Photo URL
              </label>
              <input
                type="text"
                id="company_home_photo"
                value={formData.company_home_photo}
                onChange={(e) => handleChange('company_home_photo', e.target.value)}
                className={`mt-1 block w-full rounded-md border ${
                  errors.company_home_photo ? 'border-red-500' : 'border-gray-700'
                } bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                placeholder="https://example.com/home.jpg"
              />
              {errors.company_home_photo && (
                <p className="mt-1 text-sm text-red-500">{errors.company_home_photo}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Error */}
        {createCompanyMutation.isError && (
          <div className="rounded-lg border border-red-800 bg-red-900/10 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-500">Failed to create company</h3>
                <p className="mt-1 text-sm text-red-400">
                  {createCompanyMutation.error instanceof Error
                    ? createCompanyMutation.error.message
                    : 'An error occurred while creating the company. The company name may already exist.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-800 pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={createCompanyMutation.isPending}
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createCompanyMutation.isPending || !formData.company_name.trim()}
            className="bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-50"
          >
            {createCompanyMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Company
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}