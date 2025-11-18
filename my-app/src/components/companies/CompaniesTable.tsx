import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Company } from '@/api/types/companies'

interface CompaniesTableProps {
  companies: Company[]
  onView: (company: Company) => void
  onEdit: (company: Company) => void
  onDelete: (company: Company) => void
}

export function CompaniesTable({
  companies,
  onView,
  onEdit,
  onDelete,
}: CompaniesTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-[#1a1a1a]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">S.No</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[140px]">Brand Color</TableHead>
            <TableHead className="w-[150px]">Created</TableHead>
            <TableHead className="w-[180px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-gray-400">
                No companies found.
              </TableCell>
            </TableRow>
          ) : (
            companies.map((company, index) => (
              <TableRow key={company.company_id}>
                {/* Serial Number */}
                <TableCell className="font-medium text-gray-400">
                  {index + 1}
                </TableCell>

                {/* Company ID */}
                <TableCell className="font-medium text-white">
                  {company.company_id}
                </TableCell>

                {/* Company Name */}
                <TableCell className="font-medium text-white">
                  {company.company_name}
                </TableCell>

                {/* Status Badge */}
                <TableCell>
                  {company.company_enabled ? (
                    <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-500">
                      Inactive
                    </span>
                  )}
                </TableCell>

                {/* Brand Color Swatch */}
                <TableCell>
                  {company.company_brand_colour ? (
                    <div className="flex items-center gap-2">
                      <div
                        className="h-6 w-6 rounded border border-gray-700"
                        style={{ backgroundColor: company.company_brand_colour }}
                        title={company.company_brand_colour}
                      />
                      <span className="text-sm text-gray-400">
                        {company.company_brand_colour}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </TableCell>

                {/* Created Date */}
                <TableCell className="text-gray-400">
                  {formatDate(company.company_created)}
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(company)}
                      className="h-8 w-8 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(company)}
                      className="h-8 w-8 text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(company)}
                      className="h-8 w-8 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}