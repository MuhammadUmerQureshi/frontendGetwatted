import { Menu, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import logo from '@/assets/logo.png'

interface NavbarProps {
  onToggleSidebar: () => void
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('token_type')
    localStorage.removeItem('expires_in')
    localStorage.removeItem('charger_info')

    // Redirect to login page
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-[#1a1a1a]">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="text-gray-400 hover:bg-gray-800 hover:text-yellow-500"
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <img src={logo} alt="Getwatted Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-yellow-500">Getwatted</span>
            </div>
          </div>

          {/* Right side - Logout Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:bg-gray-800 hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}