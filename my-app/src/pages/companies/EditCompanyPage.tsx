import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, AlertCircle, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCompany, useUpdateCompany } from '@/api/hooks/useCompanies'
import type { CompanyUpdate } from '@/api/types/companies'

export function EditCompanyPage() {
  const { companyId } = useParams<{ companyId: string }>()
  const navigate = useNavigate()
  const id = Number(companyId)

  const { data: company, isLoading, isError, error } = useCompany(id)
  const updateCompanyMutation = useUpdateCompany()

  // Form state
  const [formData, setFormData] = useState({
    company_name: '',
    company_enabled: true,
    company_home_photo: '',
    company_brand_colour: '',
    company_brand_logo: '',
    company_brand_favicon: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)

  // Initialize form with company data
  useEffect(() => {
    if (company) {
      setFormData({
        company_name: company.company_name,
        company_enabled: company.company_enabled,
        company_home_photo: company.company_home_photo || '',
        company_brand_colour: company.company_brand_colour || '',
        company_brand_logo: company.company_brand_logo || '',
        company_brand_favicon: company.company_brand_favicon || '',
      })
    }
  }, [company])

  const handleBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      )
      if (!confirmLeave) return
    }
    navigate(`/companies/${id}`)
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

    // Prepare update data - only send changed fields
    const updateData: CompanyUpdate = {}

    if (company) {
      if (formData.company_name !== company.company_name) {
        updateData.company_name = formData.company_name
      }
      if (formData.company_enabled !== company.company_enabled) {
        updateData.company_enabled = formData.company_enabled
      }
      if (formData.company_home_photo !== (company.company_home_photo || '')) {
        updateData.company_home_photo = formData.company_home_photo || undefined
      }
      if (formData.company_brand_colour !== (company.company_brand_colour || '')) {
        updateData.company_brand_colour = formData.company_brand_colour || undefined
      }
      if (formData.company_brand_logo !== (company.company_brand_logo || '')) {
        updateData.company_brand_logo = formData.company_brand_logo || undefined
      }
      if (formData.company_brand_favicon !== (company.company_brand_favicon || '')) {
        updateData.company_brand_favicon = formData.company_brand_favicon || undefined
      }
    }

    try {
      await updateCompanyMutation.mutateAsync({
        companyId: id,
        data: updateData,
      })
      setIsDirty(false)
      navigate(`/companies/${id}`)
    } catch (err) {
      console.error('Failed to update company:', err)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate(`/companies/${id}`)} className="text-gray-400 hover:text-yellow-500">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Company Details
        </Button>

        <div className="flex h-96 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            <p className="text-sm text-gray-400">Loading company...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (isError || !company) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate(`/companies/${id}`)} className="text-gray-400 hover:text-yellow-500">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Company Details
        </Button>

        <div className="rounded-lg border border-red-800 bg-red-900/10 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div>
              <h3 className="font-semibold text-red-500">Failed to load company</h3>
              <p className="mt-1 text-sm text-red-400">
                {error instanceof Error ? error.message : 'Company not found'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-yellow-500">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Company Details
        </Button>
      </div>

      {/* Page Title */}
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Edit Company</h1>
        <p className="mt-1 text-sm text-gray-400">
          Update information for {company.company_name}
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
              />
              {errors.company_name && (
                <p className="mt-1 text-sm text-red-500">{errors.company_name}</p>
              )}
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
            </div>
          </div>
        </div>

        {/* Branding Section */}
        <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Branding</h2>

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
        {updateCompanyMutation.isError && (
          <div className="rounded-lg border border-red-800 bg-red-900/10 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-500">Failed to update company</h3>
                <p className="mt-1 text-sm text-red-400">
                  {updateCompanyMutation.error instanceof Error
                    ? updateCompanyMutation.error.message
                    : 'An error occurred while updating the company'}
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
            disabled={updateCompanyMutation.isPending}
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={updateCompanyMutation.isPending || !isDirty}
            className="bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-50"
          >
            {updateCompanyMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}