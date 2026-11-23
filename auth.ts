import crypto from 'node:crypto';

export type CategorySlug = 'ai-affiliate' | 'ai-drama' | 'ai-podcast' | 'ai-facts';

export const ALL_MEMBER_CATEGORIES: CategorySlug[] = [
  'ai-affiliate',
  'ai-drama',
  'ai-podcast',
  'ai-facts',
];

export interface MemberUser {
  email: string;
  name: string;
  allowedCategories: CategorySlug[];
  source: 'env-account' | 'env-passcode' | 'preview-claimed';
}

interface StoredAccount {
  email: string;
  name: string;
  salt: string;
  hashHex: string;
  allowedCategories: CategorySlug[];
}

interface SessionRecord {
  tokenHash: string;
  user: MemberUser;
  expiresAt: number;
}

const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours
const sessions = new Map<string, SessionRecord>();
let claimedAccount: StoredAccount | null = null;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function sanitizeCategories(input: unknown): CategorySlug[] {
  if (!Array.isArray(input)) return [...ALL_MEMBER_CATEGORIES];
  const valid = input.filter(
    (c): c is CategorySlug =>
      typeof c === 'string' && ALL_MEMBER_CATEGORIES.includes(c as CategorySlug)
  );
  return valid.length > 0 ? Array.from(new Set(valid)) : [];
}

function hashSecret(secret: string, salt: string): Buffer {
  return crypto.scryptSync(secret, salt, 64);
}

function safeEqualBuffer(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function safeEqualString(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  const maxLen = Math.max(bufA.length, bufB.length, 1);
  const padA = Buffer.alloc(maxLen);
  const padB = Buffer.alloc(maxLen);
  bufA.copy(padA);
  bufB.copy(padB);
  return crypto.timingSafeEqual(padA, padB) && bufA.length === bufB.length;
}

interface EnvAccount {
  email: string;
  name: string;
  passcode: string;
  allowedCategories: CategorySlug[];
}

function loadEnvAccounts(): EnvAccount[] {
  const raw = process.env.MEMBER_ACCOUNTS_JSON?.trim();
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is Record<string, unknown> =>
          Boolean(item) &&
          typeof item === 'object' &&
          typeof (item as Record<string, unknown>).email === 'string' &&
          typeof (item as Record<string, unknown>).passcode === 'string' &&
          ((item as Record<string, unknown>).passcode as string).length > 0
      )
      .map((item) => ({
        email: normalizeEmail(item.email as string),
        name:
          typeof item.name === 'string' && item.name.trim()
            ? item.name.trim()
            : normalizeEmail(item.email as string).split('@')[0],
        passcode: item.passcode as string,
        allowedCategories: sanitizeCategories(item.allowedCategories),
      }));
  } catch {
    return [];
  }
}

export function getAuthStatus() {
  const envPasscode = (process.env.MEMBER_PASSCODE || '').trim();
  const envAccounts = loadEnvAccounts();
  const hasEnvConfig = envPasscode.length > 0 || envAccounts.length > 0;
  const configured = hasEnvConfig || claimedAccount !== null;
  const mode = envAccounts.length > 0
    ? 'individual-env'
    : envPasscode.length > 0
      ? 'shared-passcode'
      : claimedAccount
        ? 'preview-account'
        : 'unconfigured';

  return {
    configured,
    setupRequired: !configured && process.env.ENABLE_PREVIEW_SETUP === "true" && process.env.NODE_ENV !== "production",
    mode,
  };
}

export function claimPreviewAccount(
  email: string,
  password: string,
  name?: string,
  allowedCategories?: unknown
): { ok: true; token: string; user: MemberUser } | { ok: false; error: string; status: number } {
  const status = getAuthStatus();
  if (!status.setupRequired) {
    return {
      ok: false,
      error: 'May nakaset nang member login. Mag-login gamit ang iyong account.',
      status: 409,
    };
  }

  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail || !cleanEmail.includes('@') || cleanEmail.length > 160) {
    return { ok: false, error: 'Maglagay ng valid na email address.', status: 400 };
  }
  if (typeof password !== 'string' || password.length < 6 || password.length > 128) {
    return { ok: false, error: 'Ang password ay dapat may 6 hanggang 128 characters.', status: 400 };
  }

  const cats =
    allowedCategories === undefined
      ? [...ALL_MEMBER_CATEGORIES]
      : sanitizeCategories(allowedCategories);

  const salt = crypto.randomBytes(16).toString('hex');
  const hashHex = hashSecret(password, salt).toString('hex');
  const displayName =
    typeof name === 'string' && name.trim().length > 0
      ? name.trim().slice(0, 60)
      : cleanEmail.split('@')[0];

  claimedAccount = {
    email: cleanEmail,
    name: displayName,
    salt,
    hashHex,
    allowedCategories: cats,
  };

  const user: MemberUser = {
    email: claimedAccount.email,
    name: claimedAccount.name,
    allowedCategories: [...claimedAccount.allowedCategories],
    source: 'preview-claimed',
  };

  const token = issueSession(user);
  return { ok: true, token, user };
}

export function authenticateMember(
  emailInput: string,
  passwordInput: string
): { ok: true; token: string; user: MemberUser } | { ok: false; error: string; status: number } {
  const cleanEmail = normalizeEmail(emailInput || '');
  const password = typeof passwordInput === 'string' ? passwordInput : '';

  if (!cleanEmail || !password) {
    return { ok: false, error: 'Ilagay ang iyong email at password.', status: 400 };
  }

  // 1. Environment-configured individual member accounts take top precedence.
  const envAccounts = loadEnvAccounts();
  if (envAccounts.length > 0) {
    const match = envAccounts.find((a) => a.email === cleanEmail);
    if (match && safeEqualString(password, match.passcode)) {
      const user: MemberUser = {
        email: match.email,
        name: match.name,
        allowedCategories: [...match.allowedCategories],
        source: 'env-account',
      };
      return { ok: true, token: issueSession(user), user };
    }
    return { ok: false, error: 'Mali ang email o password. Pakisuri at subukan ulit.', status: 401 };
  }

  // 2. Environment-configured shared passcode overrides any claimed preview account.
  const envPasscode = (process.env.MEMBER_PASSCODE || '').trim();
  if (envPasscode.length > 0) {
    if (safeEqualString(password, envPasscode)) {
      const user: MemberUser = {
        email: cleanEmail,
        name: cleanEmail.split('@')[0] || 'Member',
        allowedCategories: [...ALL_MEMBER_CATEGORIES],
        source: 'env-passcode',
      };
      return { ok: true, token: issueSession(user), user };
    }
    return { ok: false, error: 'Mali ang email o password. Pakisuri at subukan ulit.', status: 401 };
  }

  // 3. Preview claimed account (scrypt hashed in memory).
  if (claimedAccount) {
    const emailMatches = safeEqualString(cleanEmail, claimedAccount.email);
    const derived = hashSecret(password, claimedAccount.salt);
    const stored = Buffer.from(claimedAccount.hashHex, 'hex');
    const passMatches = safeEqualBuffer(derived, stored);

    if (emailMatches && passMatches) {
      const user: MemberUser = {
        email: claimedAccount.email,
        name: claimedAccount.name,
        allowedCategories: [...claimedAccount.allowedCategories],
        source: 'preview-claimed',
      };
      return { ok: true, token: issueSession(user), user };
    }
    return { ok: false, error: 'Mali ang email o password. Pakisuri at subukan ulit.', status: 401 };
  }

  return {
    ok: false,
    error: 'Wala pang naka-set na member login sa preview na ito.',
    status: 503,
  };
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function issueSession(user: MemberUser): string {
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = hashToken(token);
  sessions.set(tokenHash, {
    tokenHash,
    user,
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
  return token;
}

export function verifyBearerToken(authHeader: string | undefined): MemberUser | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7).trim();
  if (!token) return null;
  const tokenHash = hashToken(token);
  const record = sessions.get(tokenHash);
  if (!record) return null;
  if (Date.now() > record.expiresAt) {
    sessions.delete(tokenHash);
    return null;
  }
  return record.user;
}

export function revokeBearerToken(authHeader: string | undefined): void {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return;
  const token = authHeader.slice(7).trim();
  if (!token) return;
  sessions.delete(hashToken(token));
}
