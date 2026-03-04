export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  serverSynced: boolean;
  accountState: string; // 'A' = Activo, 'I' = Inactivo, 'C' = Cambio contraseña
}

export interface AuthError {
  error: string;
}

export interface ChangePasswordRequest {
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
  success: boolean;
}

// ─── Forgot / Reset password ───

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface GenericResponse {
  message?: string;
  error?: string;
  success: boolean;
}

