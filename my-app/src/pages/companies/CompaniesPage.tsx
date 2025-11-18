import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Plus, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CompaniesTable } from '@/components/companies/CompaniesTable'
import { DeleteCompanyDialog } from '@/components/companies/DeleteCompanyDialog'
import { useCompanies } from '@/api/hooks/useCompanies'
import type { Company } from '@/api/types/companies'

export function CompaniesPage() {
  const navigate = useNavigate()
  const { data: companies, isLoading, isError, error, refetch } = useCompanies()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const handleView = (company: Company) => {
    navigate(`/companies/${company.company_id}`)
  }

  const handleEdit = (company: Company) => {
    navigate(`/companies/${company.company_id}/edit`)
  }

  const handleDelete = (company: Company) => {
    setSelectedCompany(company)
    setDeleteDialogOpen(true)
  }

  const handleCreate = () => {
    navigate('/companies/new')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-yellow-500/10 p-2">
            <Building2 className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Companies</h1>
            <p className="mt-1 text-sm text-gray-400">
              Manage all companies in the system
            </p>
          </div>
        </div>

        {/* Create Button */}
        <Button
          onClick={handleCreate}
          className="bg-yellow-500 text-black hover:bg-yellow-400"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex h-64 items-center justify-center rounded-lg border border-gray-800 bg-[#1a1a1a]">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            <p className="text-sm text-gray-400">Loading companies...</p>
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
                Failed to load companies
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

      {/* Companies Table */}
      {!isLoading && !isError && companies && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Total Companies:</span>
            <span className="font-semibold text-white">{companies.length}</span>
          </div>

          {/* Table */}
          <CompaniesTable
            companies={companies}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && companies && companies.length === 0 && (
        <div className="flex h-64 items-center justify-center rounded-lg border border-gray-800 bg-[#1a1a1a]">
          <div className="flex flex-col items-center gap-3 text-center">
            <Building2 className="h-12 w-12 text-gray-600" />
            <div>
              <h3 className="font-semibold text-white">No companies yet</h3>
              <p className="mt-1 text-sm text-gray-400">
                Get started by creating your first company
              </p>
            </div>
            <Button
              onClick={handleCreate}
              className="mt-2 bg-yellow-500 text-black hover:bg-yellow-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedCompany && (
        <DeleteCompanyDialog
          company={selectedCompany}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </div>
  )
}