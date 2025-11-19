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
import { useDeleteUser } from '@/api/hooks/useUsers'
import type { User } from '@/api/types/users'

interface DeleteUserDialogProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteUserDialog({
  user,
  open,
  onOpenChange,
}: DeleteUserDialogProps) {
  const navigate = useNavigate()
  const deleteUserMutation = useDeleteUser()
  const [confirmName, setConfirmName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const getUserFullName = () => {
    if (user.user_first_name && user.user_last_name) {
      return `${user.user_first_name} ${user.user_last_name}`
    }
    return user.user_first_name || user.user_last_name || user.user_email || `User #${user.user_id}`
  }

  const fullName = getUserFullName()
  const isConfirmValid = confirmName.trim() === fullName

  const handleDelete = async () => {
    if (!isConfirmValid) {
      setError('Name does not match')
      return
    }

    try {
      setError(null)
      await deleteUserMutation.mutateAsync(user.user_id)

      // Close dialog and navigate to users list
      onOpenChange(false)
      navigate('/users', {
        state: { message: `User "${fullName}" deleted successfully` }
      })
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete user')
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!deleteUserMutation.isPending) {
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
            <DialogTitle>Delete User</DialogTitle>
          </div>
          <DialogDescription className="text-left pt-2">
            This action cannot be undone. This will permanently delete the user from both the database and Keycloak.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Box */}
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4">
            <h4 className="text-sm font-semibold text-red-400 mb-2">
              This will delete:
            </h4>
            <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
              <li>User account from database</li>
              <li>User account from Keycloak</li>
              <li>All authentication credentials</li>
            </ul>
          </div>

          {/* User Info */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="text-sm text-gray-400">User to delete:</div>
            <div className="text-lg font-semibold text-white mt-1">
              {fullName}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              ID: {user.user_id}
            </div>
            {user.user_email && (
              <div className="text-sm text-gray-400 mt-1">
                Email: {user.user_email}
              </div>
            )}
          </div>

          {/* Confirmation Input */}
          <div className="space-y-2">
            <Label htmlFor="confirm-name" className="text-gray-300">
              To confirm, type <span className="font-semibold text-white">{fullName}</span> below:
            </Label>
            <Input
              id="confirm-name"
              type="text"
              value={confirmName}
              onChange={(e) => {
                setConfirmName(e.target.value)
                setError(null)
              }}
              placeholder="Enter user name"
              disabled={deleteUserMutation.isPending}
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
            disabled={deleteUserMutation.isPending}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={!isConfirmValid || deleteUserMutation.isPending}
            className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleteUserMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete User'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}