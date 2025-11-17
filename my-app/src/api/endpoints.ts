/**
 * API Endpoints Configuration
 * Centralized endpoint URLs for all API calls
 */

export const endpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
  },

  // Users
  users: {
    base: '/users',
    byId: (id: number) => `/users/${id}`,
  },

  // User Roles
  userRoles: {
    base: '/user_roles',
    byId: (id: number) => `/user_roles/${id}`,
  },

  // Companies
  companies: {
    base: '/companies',
    byId: (id: number) => `/companies/${id}`,
  },

  // Sites Groups
  sitesGroups: {
    base: '/sites-groups',
    byId: (id: number) => `/sites-groups/${id}`,
  },

  // Sites Group Managers
  sitesGroupManagers: {
    base: '/sites-group-managers',
    byId: (id: number) => `/sites-group-managers/${id}`,
  },

  // Sites
  sites: {
    base: '/sites',
    byId: (id: number) => `/sites/${id}`,
  },

  // Tariffs
  tariffs: {
    base: '/tariffs',
    byId: (id: number) => `/tariffs/${id}`,
  },

  // Drivers Groups
  driversGroups: {
    base: '/drivers-groups',
    byId: (id: number) => `/drivers-groups/${id}`,
  },

  // Drivers
  drivers: {
    base: '/drivers',
    byId: (id: number) => `/drivers/${id}`,
  },

  // ChargePoints
  chargepoints: {
    base: '/chargepoints',
    byId: (id: number) => `/chargepoints/${id}`,
  },

  // RFID Cards
  rfidCards: {
    base: '/rfidcards',
    byId: (id: number) => `/rfidcards/${id}`,
    byDriver: (driverId: number) => `/rfidcards/driver/${driverId}`,
  },

  // Connectors
  connectors: {
    base: '/connectors',
    byId: (id: number) => `/connectors/${id}`,
    byChargePoint: (cpId: number) => `/connectors/chargepoint/${cpId}`,
  },

  // Charge Sessions
  sessions: {
    base: '/chargesessions',
    byId: (id: number) => `/chargesessions/${id}`,
    byDriver: (driverId: number) => `/chargesessions/driver/${driverId}`,
    byChargePoint: (cpId: number) => `/chargesessions/chargepoint/${cpId}`,
    updateEnergy: (id: number) => `/chargesessions/${id}/energy`,
    stop: (id: number) => `/chargesessions/${id}/stop`,
    updatePaymentStatus: (id: number) => `/chargesessions/${id}/payment-status`,
  },

  // Remote Commands
  remoteCommands: {
    remoteStart: (cpId: number) => `/remote_commands/${cpId}/remote_start`,
    remoteStop: (cpId: number) => `/remote_commands/${cpId}/remote_stop`,
    reset: (cpId: number) => `/remote_commands/${cpId}/reset`,
    connections: '/remote_commands/connections',
  },
} as const;