/**
 * Main API Export
 * Centralizes all API exports for easy importing
 */

// Core
export { queryClient } from './queryClient';
export { queryKeys } from './queryKeys';
export { endpoints } from './endpoints';
export { ApiClient } from './client/apiClient';
export { ApiError, createRequest, extractData, isSuccessResponse } from './client/utils';

// Types
export type { ReqModel, ResModel, EmptyRequest } from './types/common';
export type { LoginRequest, LoginResponse, ChargerInfo, LoginQueryParams } from './types/auth';
export type {
  User,
  UserCreate,
  UserCreateRequest,
  UserUpdate,
  UserUpdateRequest,
  UserDeleteRequest,
} from './types/users';
export type {
  UserRole,
  UserRoleCreate,
  UserRoleCreateRequest,
  UserRoleUpdate,
  UserRoleUpdateRequest,
  UserRoleDeleteRequest,
} from './types/userRoles';
export type {
  Company,
  CompanyCreate,
  CompanyCreateRequest,
  CompanyUpdate,
  CompanyUpdateRequest,
  CompanyDeleteRequest,
} from './types/companies';
export type {
  SitesGroup,
  SitesGroupCreate,
  SitesGroupCreateRequest,
  SitesGroupUpdate,
  SitesGroupUpdateRequest,
  SitesGroupDeleteRequest,
} from './types/sitesGroups';
export type {
  SitesGroupManager,
  SitesGroupManagerCreate,
  SitesGroupManagerCreateRequest,
  SitesGroupManagerUpdate,
  SitesGroupManagerUpdateRequest,
  SitesGroupManagerDeleteRequest,
} from './types/sitesGroupManagers';
export type {
  Site,
  SiteCreate,
  SiteCreateRequest,
  SiteUpdate,
  SiteUpdateRequest,
  SiteDeleteRequest,
} from './types/sites';
export type {
  Tariff,
  TariffCreate,
  TariffCreateRequest,
  TariffUpdate,
  TariffUpdateRequest,
  TariffDeleteRequest,
} from './types/tariffs';
export type {
  DriversGroup,
  DriversGroupCreate,
  DriversGroupCreateRequest,
  DriversGroupUpdate,
  DriversGroupUpdateRequest,
  DriversGroupDeleteRequest,
} from './types/driversGroups';
export type {
  Driver,
  DriverCreate,
  DriverCreateRequest,
  DriverUpdate,
  DriverUpdateRequest,
  DriverDeleteRequest,
} from './types/drivers';
export type {
  ChargePoint,
  ChargePointCreate,
  ChargePointCreateRequest,
  ChargePointUpdate,
  ChargePointUpdateRequest,
  ChargePointDeleteRequest,
} from './types/chargepoints';
export type {
  RFIDCard,
  RFIDCardCreate,
  RFIDCardCreateRequest,
  RFIDCardUpdate,
  RFIDCardUpdateRequest,
  RFIDCardDeleteRequest,
} from './types/rfidCards';
export type {
  Connector,
  ConnectorCreate,
  ConnectorCreateRequest,
  ConnectorUpdate,
  ConnectorUpdateRequest,
  ConnectorDeleteRequest,
  ConnectorStatusType,
  ConnectorErrorCodeType,
} from './types/connectors';
export type {
  ChargeSession,
  ChargeSessionCreate,
  ChargeSessionCreateRequest,
  ChargeSessionUpdateEnergyRequest,
  ChargeSessionStopRequest,
  ChargeSessionUpdatePaymentStatusRequest,
  ChargeSessionDeleteRequest,
  StopReasonType,
  PaymentStatusType,
  SessionStatusType,
} from './types/chargeSessions';
export type {
  RemoteStartTransactionRequest,
  RemoteStartResponse,
  RemoteStopTransactionRequest,
  RemoteStopResponse,
  ResetChargerRequest,
  ChargerResetResponse,
  ActiveConnectionsResponse,
  CommandStatusType,
  ResetType,
} from './types/remoteCommands';

// Services
export { authService } from './services/authService';
export { usersService } from './services/usersService';
export { userRolesService } from './services/userRolesService';
export { companiesService } from './services/companiesService';
export { sitesGroupsService } from './services/sitesGroupsService';
export { sitesGroupManagersService } from './services/sitesGroupManagersService';
export { sitesService } from './services/sitesService';
export { tariffsService } from './services/tariffsService';
export { driversGroupsService } from './services/driversGroupsService';
export { driversService } from './services/driversService';
export { chargepointsService } from './services/chargepointsService';
export { rfidCardsService } from './services/rfidCardsService';
export { connectorsService } from './services/connectorsService';
export { chargeSessionsService } from './services/chargeSessionsService';
export { remoteCommandsService } from './services/remoteCommandsService';

// Hooks
export { useLogin, useLogout, useIsAuthenticated, useChargerInfo } from './hooks/useAuth';
export { useUsers, useUser, useCreateUser, useUpdateUser, useDeleteUser } from './hooks/useUsers';
export { useUserRoles, useUserRole, useCreateUserRole, useUpdateUserRole, useDeleteUserRole } from './hooks/useUserRoles';
export { useCompanies, useCompany, useCreateCompany, useUpdateCompany, useDeleteCompany } from './hooks/useCompanies';
export { useSitesGroups, useSitesGroup, useCreateSitesGroup, useUpdateSitesGroup, useDeleteSitesGroup } from './hooks/useSitesGroups';
export { useSitesGroupManagers, useSitesGroupManager, useCreateSitesGroupManager, useUpdateSitesGroupManager, useDeleteSitesGroupManager } from './hooks/useSitesGroupManagers';
export { useSites, useSite, useCreateSite, useUpdateSite, useDeleteSite } from './hooks/useSites';
export { useTariffs, useTariff, useCreateTariff, useUpdateTariff, useDeleteTariff } from './hooks/useTariffs';
export { useDriversGroups, useDriversGroup, useCreateDriversGroup, useUpdateDriversGroup, useDeleteDriversGroup } from './hooks/useDriversGroups';
export { useDrivers, useDriver, useCreateDriver, useUpdateDriver, useDeleteDriver } from './hooks/useDrivers';
export { useChargepoints, useChargepoint, useCreateChargepoint, useUpdateChargepoint, useDeleteChargepoint } from './hooks/useChargepoints';
export { useRFIDCards, useRFIDCard, useRFIDCardByDriver, useCreateRFIDCard, useUpdateRFIDCard, useDeleteRFIDCard } from './hooks/useRFIDCards';
export { useConnectorsByChargePoint, useCreateConnector, useUpdateConnector, useDeleteConnector } from './hooks/useConnectors';
export {
  useChargeSessions,
  useChargeSession,
  useChargeSessionsByDriver,
  useChargeSessionsByChargePoint,
  useCreateChargeSession,
  useUpdateChargeSessionEnergy,
  useStopChargeSession,
  useUpdateChargeSessionPaymentStatus,
  useDeleteChargeSession,
} from './hooks/useChargeSessions';
export { useActiveConnections, useRemoteStart, useRemoteStop, useResetCharger } from './hooks/useRemoteCommands';