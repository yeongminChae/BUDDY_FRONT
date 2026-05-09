export type AdminUserRole = "USER" | "STAFF" | "ADMIN";
export type AdminUserStatus = "ACTIVE" | "INACTIVE";

export type UpdateAdminUserRoleRequest = {
  role: AdminUserRole;
};

export type UpdateAdminUserRoleResponse = {
  userId: number;
  role: AdminUserRole;
};

export type UpdateAdminUserStatusRequest = {
  status: AdminUserStatus;
};

export type UpdateAdminUserStatusResponse = {
  userId: number;
  status: AdminUserStatus;
};
