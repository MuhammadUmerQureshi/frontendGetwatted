/**
 * Centralized Query Keys Factory
 * Ensures consistent and type-safe query key management
 */
export const queryKeys = {
  // Authentication
  auth: {
    current: ['auth', 'current'] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    detail: (id: number) => ['users', id] as const,
  },

  // User Roles
  userRoles: {
    all: ['userRoles'] as const,
    detail: (id: number) => ['userRoles', id] as const,
  },

  // Companies
  companies: {
    all: ['companies'] as const,
    detail: (id: number) => ['companies', id] as const,
  },

  // Sites Groups
  sitesGroups: {
    all: ['sitesGroups'] as const,
    detail: (id: number) => ['sitesGroups', id] as const,
  },

  // Sites Group Managers
  sitesGroupManagers: {
    all: ['sitesGroupManagers'] as const,
    detail: (id: number) => ['sitesGroupManagers', id] as const,
  },

  // Sites
  sites: {
    all: ['sites'] as const,
    detail: (id: number) => ['sites', id] as const,
  },

  // Tariffs
  tariffs: {
    all: ['tariffs'] as const,
    detail: (id: number) => ['tariffs', id] as const,
  },

  // Drivers Groups
  driversGroups: {
    all: ['driversGroups'] as const,
    detail: (id: number) => ['driversGroups', id] as const,
  },

  // Drivers
  drivers: {
    all: ['drivers'] as const,
    detail: (id: number) => ['drivers', id] as const,
  },

  // ChargePoints
  chargepoints: {
    all: ['chargepoints'] as const,
    detail: (id: number) => ['chargepoints', id] as const,
  },

  // RFID Cards
  rfidCards: {
    all: ['rfidCards'] as const,
    detail: (id: number) => ['rfidCards', id] as const,
    byDriver: (driverId: number) => ['rfidCards', 'driver', driverId] as const,
  },

  // Connectors
  connectors: {
    byChargePoint: (cpId: number) => ['connectors', 'chargepoint', cpId] as const,
  },

  // Charge Sessions
  sessions: {
    all: ['sessions'] as const,
    detail: (id: number) => ['sessions', id] as const,
    byDriver: (driverId: number) => ['sessions', 'driver', driverId] as const,
    byChargePoint: (cpId: number) => ['sessions', 'chargepoint', cpId] as const,
  },

  // Remote Commands
  remoteCommands: {
    connections: ['remoteCommands', 'connections'] as const,
  },
} as const;