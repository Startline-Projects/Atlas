# Login Endpoint Documentation

## Overview

تم بناء نظام تسجيل الدخول الكامل للمرشحين مع معالجة آمنة للأخطاء و JWT tokens.

## API Endpoint

### `POST /api/v1/candidates/login`

تسجيل الدخول للمرشح باستخدام email و password.

#### Request

```json
{
  "email": "candidate@example.com",
  "password": "SecurePassword123!"
}
```

#### Response (200 OK)

```json
{
  "data": {
    "candidate": {
      "id": "abc123",
      "email": "candidate@example.com",
      "fullName": "John Doe",
      "roleCategory": "ENGINEERING",
      "status": "ACTIVE",
      "emailVerifiedAt": "2026-08-01T10:00:00.000Z",
      "country": "Saudi Arabia",
      "countryCode": "SA",
      "headline": null,
      "lastActiveAt": null,
      "createdAt": "2026-08-01T10:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "requiresEmailVerification": false
  }
}
```

#### Error Responses

**400 - Validation Error**
```json
{
  "error": {
    "code": "VALIDATION",
    "message": "Please correct the highlighted fields.",
    "fields": {
      "email": "Enter a valid email address.",
      "password": "Enter your password."
    }
  }
}
```

**404 - Account Not Found**
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "No account found with that email address."
  }
}
```

**422 - Email Not Verified**
```json
{
  "error": {
    "code": "BUSINESS_RULE",
    "message": "Please verify your email before signing in.",
    "fields": {
      "email": "Email verification required."
    }
  }
}
```

**403 - Account Suspended/Deactivated**
```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "This account is not active. Please contact support."
  }
}
```

**400 - Invalid Credentials**
```json
{
  "error": {
    "code": "VALIDATION",
    "message": "Email or password is incorrect. Please try again.",
    "fields": {
      "password": "Incorrect email or password."
    }
  }
}
```

## Frontend Usage

> **Updated 2026-08-16.** The web app does NOT store the token itself: the
> login route sets HttpOnly cookies (`atlas_session` + `atlas_refresh`) and
> every later request carries them automatically. `accessToken` in the body
> exists only for the future mobile client. On success just hard-navigate
> (`window.location.assign(next)`) so the server-rendered surface reads the
> cookie — see `components/candidate/auth/signin-form.tsx`, which is the
> real implementation. The snippets below are kept for the mobile case.

### Basic Implementation (mobile-style — web uses the cookie)

```typescript
import { candidatesApi } from "@/lib/api-client/candidates";
import { loginSchema } from "@/lib/validators/candidate";

// في component أو form handler
async function handleLogin(email: string, password: string) {
  try {
    const result = await candidatesApi.login({ email, password });
    
    // Store the token (in localStorage, cookie, or state)
    localStorage.setItem("accessToken", result.accessToken);
    
    // Store user data
    localStorage.setItem("candidate", JSON.stringify(result.candidate));
    
    // Redirect to dashboard
    window.location.href = "/candidate/dashboard";
  } catch (error) {
    // Error handling is done by apiFetch
    console.error("Login failed:", error);
  }
}
```

### With React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators/candidate";
import { candidatesApi } from "@/lib/api-client/candidates";

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: typeof loginSchema._type) {
    try {
      const result = await candidatesApi.login(data);
      localStorage.setItem("accessToken", result.accessToken);
      // Redirect or update state
    } catch (error) {
      // Display error to user
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register("password")} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Sign In</button>
    </form>
  );
}
```

## Architecture Details

### Service Layer (`src/lib/services/candidate/candidate.service.ts`)

```typescript
async login(input: LoginInput): Promise<LoginResult> {
  // 1. Validates that the email is registered
  // 2. Checks account status (not suspended/deactivated)
  // 3. Requires email verification
  // 4. Authenticates with Supabase
  // 5. Returns candidate data + JWT token
}
```

### Validator (`src/lib/validators/candidate.ts`)

```typescript
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email(...)),
  password: z.string().min(1, "Enter your password."),
});
```

### API Route (`src/app/api/v1/candidates/login/route.ts`)

- Validates input with Zod schema
- Calls service layer
- Returns standardized response
- Handles all errors via `handleApiError()`

## Implementation Checklist

- ✅ Backend: Service layer complete
- ✅ Backend: Validator schema complete
- ✅ Backend: API route complete
- ✅ Backend: Error handling complete
- ✅ Frontend: API client complete
- ✅ Frontend: Login form UI component (`signin-form.tsx`, honours `?next=`)
- ✅ Frontend: Session storage — HttpOnly cookies, refresh rotation in `src/proxy.ts`
- ✅ Frontend: Authentication guard — `src/proxy.ts` + guarded layouts
- ✅ Rate limiting — per-IP (proxy) + per-account lockout 5/15m (service)
- ✅ Session invalidation on logout (`auth.admin.signOut`)
- 🔲 Testing: Unit tests for service
- 🔲 Testing: Integration tests for endpoint

## Next Steps

1. ~~Authentication middleware~~ — done (`src/proxy.ts`)
2. ~~GET /me endpoint~~ — done
3. ~~Login form UI~~ — done
4. ~~Session management~~ — done (cookies + refresh + revoke)
5. **Add Password Reset** — deferred with the email work (needs custom SMTP first)
6. **Login attempt logging** — with the audit log (ARCHITECTURE §7.7)

## Security Notes

- Passwords are never stored or logged
- Deliberate ambiguity in error messages (no "email not found" oracle)
- Email verification is required before login
- Invalid credentials return same error as non-existent email
- Account status is checked (no login if suspended/deactivated)
- JWT tokens are obtained from Supabase (trusted provider)

## TODO Items

- [x] Implement rate limiting on this endpoint (ARCHITECTURE §7.6)
- [x] Add refresh token handling
- [x] Implement session invalidation on logout
- [ ] Add login attempt logging for security (audit log, §7.7)
