import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Site } from '@/api/types/sites'
import type { User } from '@/api/types/users'

interface CompanySitesTableProps {
  sites: Site[]
  users?: User[]
  onViewSite: (site: Site) => void
}

export function CompanySitesTable({ sites, users, onViewSite }: CompanySitesTableProps) {
  // Create a map of user_id -> full name for quick lookup
  const userMap = new Map<number, string>()
  if (users) {
    users.forEach((user) => {
      const fullName = `${user.user_first_name || ''} ${user.user_last_name || ''}`.trim()
      userMap.set(user.user_id, fullName || 'Unknown User')
    })
  }

  const getManagerName = (managerId?: number | null) => {
    if (!managerId) return '-'
    return userMap.get(managerId) || `User #${managerId}`
  }

  const formatLocation = (site: Site) => {
    const parts = [site.site_city, site.site_region, site.site_country].filter(Boolean)
    return parts.length > 0 ? parts.join(', ') : '-'
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-[#1a1a1a]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">S.No</TableHead>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead className="w-[200px]">Site Name</TableHead>
            <TableHead className="w-[200px]">Location</TableHead>
            <TableHead className="w-[150px]">Contact</TableHead>
            <TableHead className="w-[150px]">Site Manager</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[80px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sites.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-gray-400">
                No sites found for this company.
              </TableCell>
            </TableRow>
          ) : (
            sites.map((site, index) => (
              <TableRow key={site.site_id}>
                {/* Serial Number */}
                <TableCell className="font-medium text-gray-400">
                  {index + 1}
                </TableCell>

                {/* Site ID */}
                <TableCell className="font-medium text-white">
                  {site.site_id}
                </TableCell>

                {/* Site Name */}
                <TableCell className="font-medium text-white">
                  {site.site_name}
                </TableCell>

                {/* Location */}
                <TableCell className="text-gray-300">
                  {formatLocation(site)}
                </TableCell>

                {/* Contact Name */}
                <TableCell className="text-gray-300">
                  {site.site_contact_name || '-'}
                </TableCell>

                {/* Site Manager */}
                <TableCell className="text-gray-300">
                  {getManagerName(site.site_manager_id)}
                </TableCell>

                {/* Status Badge */}
                <TableCell>
                  {site.site_enabled ? (
                    <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-500">
                      Inactive
                    </span>
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewSite(site)}
                      className="h-8 w-8 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                      title="View Site"
                    >
                      <Eye className="h-4 w-4" />
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