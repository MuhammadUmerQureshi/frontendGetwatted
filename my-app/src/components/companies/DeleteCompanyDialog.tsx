import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDeleteCompany } from '@/api/hooks/useCompanies'
import type { Company } from '@/api/types/companies'

interface DeleteCompanyDialogProps {
  company: Company
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteCompanyDialog({
  company,
  open,
  onOpenChange,
}: DeleteCompanyDialogProps) {
  const navigate = useNavigate()
  const deleteCompanyMutation = useDeleteCompany()
  const [confirmName, setConfirmName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const isConfirmValid = confirmName.trim() === company.company_name

  const handleDelete = async () => {
    if (!isConfirmValid) {
      setError('Company name does not match')
      return
    }

    try {
      setError(null)
      await deleteCompanyMutation.mutateAsync(company.company_id)

      // Close dialog and navigate to companies list
      onOpenChange(false)
      navigate('/companies', {
        state: { message: `Company "${company.company_name}" deleted successfully` }
      })
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete company')
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!deleteCompanyMutation.isPending) {
      onOpenChange(newOpen)
      // Reset state when closing
      if (!newOpen) {
        setConfirmName('')
        setError(null)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <DialogTitle>Delete Company</DialogTitle>
          </div>
          <DialogDescription className="text-left pt-2">
            This action cannot be undone. This will permanently delete the company and all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Box */}
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4">
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              This will cascade delete:
            </h4>
            <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
              <li>All sites belonging to this company</li>
              <li>All charge points at those sites</li>
              <li>All charging sessions at those charge points</li>
              <li>All users associated with this company</li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="text-sm text-gray-400">Company to delete:</div>
            <div className="text-lg font-semibold text-white mt-1">
              {company.company_name}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              ID: {company.company_id}
            </div>
          </div>

          {/* Confirmation Input */}
          <div className="space-y-2">
            <Label htmlFor="confirm-name" className="text-gray-300">
              To confirm, type <span className="font-semibold text-white">{company.company_name}</span> below:
            </Label>
            <Input
              id="confirm-name"
              type="text"
              value={confirmName}
              onChange={(e) => {
                setConfirmName(e.target.value)
                setError(null)
              }}
              placeholder="Enter company name"
              disabled={deleteCompanyMutation.isPending}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              autoComplete="off"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={deleteCompanyMutation.isPending}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={!isConfirmValid || deleteCompanyMutation.isPending}
            className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleteCompanyMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete Company'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}