import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  Loader2,
  AlertCircle,
  Pencil,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCompany } from '@/api/hooks/useCompanies'
import { useSites } from '@/api/hooks/useSites'
import { useUsers } from '@/api/hooks/useUsers'
import { CompanySitesTable } from '@/components/companies/CompanySitesTable'
import { DeleteCompanyDialog } from '@/components/companies/DeleteCompanyDialog'
import type { Site } from '@/api/types/sites'

export function CompanyDetailsPage() {
  const { companyId } = useParams<{ companyId: string }>()
  const navigate = useNavigate()
  const id = Number(companyId)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const { data: company, isLoading, isError, error, refetch } = useCompany(id)
  const { data: allSites, isLoading: sitesLoading } = useSites()
  const { data: users, isLoading: usersLoading } = useUsers()

  // Filter sites by company_id
  const companySites = allSites?.filter(site => site.site_company_id === id) || []

  const handleBack = () => {
    navigate('/companies')
  }

  const handleEdit = () => {
    navigate(`/companies/${id}/edit`)
  }

  const handleDelete = () => {
    setDeleteDialogOpen(true)
  }

  const handleViewSite = (site: Site) => {
    console.log('View site:', site)
    // TODO: Navigate to site details page
    // navigate(`/sites/${site.site_id}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-gray-400 hover:text-yellow-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Button>

        <div className="flex h-96 items-center justify-center rounded-lg border border-gray-800 bg-[#1a1a1a]">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            <p className="text-sm text-gray-400">Loading company details...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error State
  if (isError || !company) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-gray-400 hover:text-yellow-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Button>

        <div className="rounded-lg border border-red-800 bg-red-900/10 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-500">
                Failed to load company details
              </h3>
              <p className="mt-1 text-sm text-red-400">
                {error instanceof Error
                  ? error.message
                  : 'Company not found or an error occurred'}
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
      </div>
    )
  }

  // Success State - GitHub-Style Layout
  return (
    <div className="space-y-6">
      {/* Header with Back Button and Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-gray-400 hover:text-yellow-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Button>

        <div className="flex gap-2">
          <Button
            onClick={handleEdit}
            className="bg-yellow-500 text-black hover:bg-yellow-400"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="ghost"
            className="border border-red-800 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Page Title with Logo/Icon */}
      <div className="flex items-center gap-4 border-b border-gray-800 pb-4">
        {company.company_brand_logo ? (
          <img
            src={company.company_brand_logo}
            alt={`${company.company_name} logo`}
            className="h-16 w-16 rounded-lg border border-gray-700 bg-gray-800 object-contain p-2"
            onError={(e) => {
              // If image fails to load, show the Building icon instead
              const iconDiv = document.createElement('div')
              iconDiv.className = 'flex h-16 w-16 items-center justify-center rounded-lg border border-gray-700 bg-gray-800'
              iconDiv.innerHTML = '<svg class="h-10 w-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>'
              e.currentTarget.parentElement?.replaceChild(iconDiv, e.currentTarget)
            }}
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-700 bg-gray-800">
            <Building2 className="h-10 w-10 text-yellow-500" />
          </div>
        )}
        <h1 className="text-4xl font-bold text-white">{company.company_name}</h1>
      </div>

      {/* GitHub-Style Description List */}
      <div className="rounded-lg border border-gray-800 bg-[#1a1a1a]">
        <dl className="divide-y divide-gray-800">
          {/* Company ID */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-400">Company ID</dt>
              <dd className="text-sm text-white">{company.company_id}</dd>
            </div>
          </div>

          {/* Company Name */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-400">Company Name</dt>
              <dd className="text-sm font-semibold text-white">{company.company_name}</dd>
            </div>
          </div>

          {/* Status */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-400">Status</dt>
              <dd>
                {company.company_enabled ? (
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500">
                    ● Active
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-500">
                    ● Inactive
                  </span>
                )}
              </dd>
            </div>
          </div>

          {/* Created */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-400">Created</dt>
              <dd className="text-sm text-white">{formatDate(company.company_created)}</dd>
            </div>
          </div>

          {/* Last Updated */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-400">Last Updated</dt>
              <dd className="text-sm text-white">{formatDate(company.company_updated)}</dd>
            </div>
          </div>

          {/* Divider */}
          <div className="bg-yellow-500/10 px-6 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-yellow-500">
              Branding
            </h3>
          </div>

          {/* Brand Color */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-400">Brand Color</dt>
              <dd>
                {company.company_brand_colour ? (
                  <div className="flex items-center gap-2">
                    <div
                      className="h-6 w-6 rounded border border-gray-700"
                      style={{ backgroundColor: company.company_brand_colour }}
                      title={company.company_brand_colour}
                    />
                    <span className="text-sm text-white">{company.company_brand_colour}</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">-</span>
                )}
              </dd>
            </div>
          </div>

          {/* Brand Logo */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-400">Brand Logo</dt>
              <dd>
                {company.company_brand_logo ? (
                  <a
                    href={company.company_brand_logo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    View Logo
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">-</span>
                )}
              </dd>
            </div>
          </div>

          {/* Favicon */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-400">Favicon</dt>
              <dd>
                {company.company_brand_favicon ? (
                  <a
                    href={company.company_brand_favicon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    View Favicon
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">-</span>
                )}
              </dd>
            </div>
          </div>

          {/* Home Photo */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-400">Home Photo</dt>
              <dd>
                {company.company_home_photo ? (
                  <a
                    href={company.company_home_photo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    View Photo
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">-</span>
                )}
              </dd>
            </div>
          </div>
        </dl>
      </div>

      {/* Sites Section Heading */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <h2 className="text-2xl font-bold text-white">
          Sites {!sitesLoading && `(${companySites.length})`}
        </h2>
      </div>

      {/* Sites Table */}
      <div className="space-y-4">
        {sitesLoading || usersLoading ? (
          <div className="flex h-32 items-center justify-center rounded-lg border border-gray-800 bg-[#1a1a1a]">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-yellow-500" />
              <p className="text-sm text-gray-400">Loading sites...</p>
            </div>
          </div>
        ) : companySites.length > 0 ? (
          <CompanySitesTable
            sites={companySites}
            users={users || undefined}
            onViewSite={handleViewSite}
          />
        ) : (
          <div className="flex h-32 items-center justify-center rounded-lg border border-gray-800 bg-[#1a1a1a]">
            <p className="text-sm text-gray-400">No sites found for this company</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteCompanyDialog
        company={company}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  )
}