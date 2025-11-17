import { useState } from 'react'
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Users,
  Car,
  Zap,
  Activity,
  CreditCard,
  DollarSign,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  isCollapsed: boolean
}

interface MenuItem {
  label: string
  icon: any
  path?: string
  subItems?: { label: string; path: string }[]
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      label: 'Companies',
      icon: Building2,
      path: '/companies',
    },
    {
      label: 'Sites',
      icon: MapPin,
      subItems: [
        { label: 'Groups', path: '/sites/groups' },
        { label: 'Sites', path: '/sites/list' },
      ],
    },
    {
      label: 'Drivers',
      icon: Car,
      subItems: [
        { label: 'Groups', path: '/drivers/groups' },
        { label: 'Drivers', path: '/drivers/list' },
      ],
    },
    {
      label: 'Chargers',
      icon: Zap,
      path: '/chargers',
    },
    {
      label: 'Sessions',
      icon: Activity,
      path: '/sessions',
    },
    {
      label: 'Tariffs',
      icon: DollarSign,
      path: '/tariffs',
    },
    {
      label: 'Payment Activities',
      icon: CreditCard,
      path: '/payment-activities',
    },
    {
      label: 'Users',
      icon: Users,
      path: '/users',
    },
    {
      label: 'Logs',
      icon: FileText,
      path: '/logs',
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ]

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const renderMenuItem = (item: MenuItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isExpanded = expandedMenus.includes(item.label)

    if (hasSubItems) {
      return (
        <div key={item.label}>
          {/* Parent Menu Item */}
          <button
            onClick={() => toggleMenu(item.label)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              'text-gray-400 hover:bg-gray-800 hover:text-yellow-500'
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </>
            )}
          </button>

          {/* Sub Menu Items */}
          {!isCollapsed && isExpanded && (
            <div className="ml-8 mt-1 space-y-1">
              {item.subItems?.map((subItem) => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-yellow-500'
                    )
                  }
                >
                  {subItem.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      )
    }

    // Regular menu item without sub-items
    return (
      <NavLink
        key={item.path}
        to={item.path!}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            isActive
              ? 'bg-yellow-500/10 text-yellow-500'
              : 'text-gray-400 hover:bg-gray-800 hover:text-yellow-500'
          )
        }
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        {!isCollapsed && <span>{item.label}</span>}
      </NavLink>
    )
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-[57px] z-40 h-[calc(100vh-57px)] border-r border-gray-800 bg-[#1a1a1a] transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col gap-1 overflow-y-auto p-4">
        {menuItems.map((item) => renderMenuItem(item))}
      </div>
    </aside>
  )
}