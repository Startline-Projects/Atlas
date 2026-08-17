export {
  authUserIdFromToken,
  createAuthUser,
  deleteAuthUserQuietly,
  fixedOtpCode,
  resendSignupEmail,
  revokeSession,
  signInWithPassword,
  verifyEmailCode,
} from "./auth-user";
export type { AuthSurface, CreatedAuthUser, ProviderSession } from "./auth-user";
