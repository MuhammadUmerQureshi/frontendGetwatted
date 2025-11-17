export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-gray-400">
          Welcome to Getwatted CSMS - Manage your charging stations
        </p>
      </div>

      {/* Dashboard Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards - will be replaced with actual data */}
        <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
          <h3 className="text-sm font-medium text-gray-400">Total Stations</h3>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
          <h3 className="text-sm font-medium text-gray-400">Active Sessions</h3>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
          <h3 className="text-sm font-medium text-gray-400">Total Energy (kWh)</h3>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
          <h3 className="text-sm font-medium text-gray-400">Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-white">$0</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        <div className="mt-4 text-center text-gray-400">
          <p>No recent activity to display</p>
        </div>
      </div>
    </div>
  )
}