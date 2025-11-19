import { useState } from 'react'
import { Eye, Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { User } from '@/api/types/users'
import type { UserRole } from '@/api/types/userRoles'
import type { Company } from '@/api/types/companies'

interface UsersTableProps {
  users: User[]
  userRoles?: UserRole[]
  companies?: Company[]
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

type SortColumn = 'id' | 'name' | 'email' | 'role' | 'company' | null
type SortDirection = 'asc' | 'desc' | null

export function UsersTable({
  users,
  userRoles,
  companies,
  onView,
  onEdit,
  onDelete,
}: UsersTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  // Create lookup maps for O(1) access
  const roleMap = new Map(userRoles?.map(role => [role.user_role_id, role.user_role_name]))
  const companyMap = new Map(companies?.map(company => [company.company_id, company.company_name]))

  const getRoleName = (roleId?: number | null) => {
    if (!roleId) return '-'
    return roleMap.get(roleId) || `Role #${roleId}`
  }

  const getCompanyName = (companyId?: number | null) => {
    if (!companyId) return '-'
    return companyMap.get(companyId) || `Company #${companyId}`
  }

  const getUserFullName = (user: User) => {
    if (user.user_first_name && user.user_last_name) {
      return `${user.user_first_name} ${user.user_last_name}`
    }
    return user.user_first_name || user.user_last_name || '-'
  }

  // Handle column sorting
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortColumn(null)
        setSortDirection(null)
      }
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  // Sort users based on current sort state
  const sortedUsers = [...users].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0

    let aValue: any
    let bValue: any

    switch (sortColumn) {
      case 'id':
        aValue = a.user_id
        bValue = b.user_id
        break
      case 'name':
        aValue = getUserFullName(a).toLowerCase()
        bValue = getUserFullName(b).toLowerCase()
        break
      case 'email':
        aValue = (a.user_email || '').toLowerCase()
        bValue = (b.user_email || '').toLowerCase()
        break
      case 'role':
        aValue = getRoleName(a.user_role_id).toLowerCase()
        bValue = getRoleName(b.user_role_id).toLowerCase()
        break
      case 'company':
        aValue = getCompanyName(a.user_company_id).toLowerCase()
        bValue = getCompanyName(b.user_company_id).toLowerCase()
        break
      default:
        return 0
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  // Render sort icon
  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="ml-2 h-4 w-4 text-yellow-500" />
    }
    return <ArrowDown className="ml-2 h-4 w-4 text-yellow-500" />
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-[#1a1a1a]">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-gray-800/50">
            <TableHead className="font-bold text-gray-400">S.No</TableHead>
            <TableHead
              className="cursor-pointer font-bold text-gray-400 hover:text-white"
              onClick={() => handleSort('id')}
            >
              <div className="flex items-center">
                ID
                <SortIcon column="id" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer font-bold text-gray-400 hover:text-white"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Name
                <SortIcon column="name" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer font-bold text-gray-400 hover:text-white"
              onClick={() => handleSort('email')}
            >
              <div className="flex items-center">
                Email
                <SortIcon column="email" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer font-bold text-gray-400 hover:text-white"
              onClick={() => handleSort('role')}
            >
              <div className="flex items-center">
                Role
                <SortIcon column="role" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer font-bold text-gray-400 hover:text-white"
              onClick={() => handleSort('company')}
            >
              <div className="flex items-center">
                Company
                <SortIcon column="company" />
              </div>
            </TableHead>
            <TableHead className="text-center font-bold text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-gray-400"
              >
                No users found
              </TableCell>
            </TableRow>
          ) : (
            sortedUsers.map((user, index) => (
              <TableRow
                key={user.user_id}
                className="border-gray-800 hover:bg-gray-800/50"
              >
                {/* Serial Number */}
                <TableCell className="font-medium text-white">
                  {index + 1}
                </TableCell>

                {/* ID */}
                <TableCell className="text-gray-300">
                  {user.user_id}
                </TableCell>

                {/* Name */}
                <TableCell className="font-medium text-white">
                  {getUserFullName(user)}
                </TableCell>

                {/* Email */}
                <TableCell className="text-gray-300">
                  {user.user_email || '-'}
                </TableCell>

                {/* Role */}
                <TableCell className="text-gray-300">
                  {getRoleName(user.user_role_id)}
                </TableCell>

                {/* Company */}
                <TableCell className="text-gray-300">
                  {getCompanyName(user.user_company_id)}
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(user)}
                      className="h-8 w-8 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(user)}
                      className="h-8 w-8 text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(user)}
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