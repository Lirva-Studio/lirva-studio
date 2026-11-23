import { lazy, Suspense, useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, Lock, LogIn, ShieldCheck } from 'lucide-react';
import {
  getPublicCategory,
  PUBLIC_CATEGORIES,
  type MemberCategorySlug,
} from '../data/publicCatalog';
import type { MemberUserInfo } from './MemberToolkitView';

const MembersArea = lazy(() => import('../members/MembersArea'));

interface LoginViewProps {
  returnTo: string;
  onAuthSuccess: (token: string, user: MemberUserInfo, targetPath: string) => void;
  onNavigate: (path: string) => void;
}

interface AuthStatusResponse {
  configured: boolean;
  setupRequired: boolean;
  mode: string;
}

export function LoginView({ returnTo, onAuthSuccess, onNavigate }: LoginViewProps) {
  const [authStatus, setAuthStatus] = useState<AuthStatusResponse | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<MemberCategorySlug[]>([
    'ai-affiliate',
    'ai-drama',
    'ai-podcast',
    'ai-facts',
  ]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const targetSlug = returnTo.startsWith('/category/')
    ? returnTo.replace('/category/', '')
    : returnTo.startsWith('/member/')
      ? returnTo.replace('/member/', '')
      : '';
  const targetCategory = targetSlug ? getPublicCategory(targetSlug) : undefined;
  const normalizedTarget = targetCategory ? `/category/${targetCategory.slug}` : '/category/ai-affiliate';

  useEffect(() => {
    let active = true;
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then((data: AuthStatusResponse) => {
        if (active) setAuthStatus(data);
      })
      .catch(() => {
        if (active) setAuthStatus({ configured: false, setupRequired: false, mode: 'offline' });
      });
    return () => {
      active = false;
    };
  }, []);

  const toggleCategory = (slug: MemberCategorySlug) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const isSetup = Boolean(authStatus?.setupRequired);
    const endpoint = isSetup ? '/api/auth/setup' : '/api/auth/login';
    const payload = isSetup
      ? { email, password, name, allowedCategories: selectedCategories }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Hindi makapag-login. Pakisuri ang detalye at subukan ulit.');
        setSubmitting(false);
        return;
      }
      onAuthSuccess(data.token, data.user, normalizedTarget);
    } catch {
      setError('Nagkaroon ng problema sa koneksyon. Subukan ulit.');
      setSubmitting(false);
    }
  };

  if (!authStatus) return <p className="p-5">Binubuksan ang Members Area…</p>;
  if (!authStatus.configured || new URLSearchParams(location.search).get('access') === 'password') {
    return <Suspense fallback={<p className="p-5">Binubuksan ang Members Area…</p>}><MembersArea returnTo={returnTo} /></Suspense>;
  }

  return (
    <div className="mx-auto max-w-[540px] px-4 pt-6 pb-16">
      <button
        type="button"
        onClick={() => onNavigate(targetCategory ? `/category/${targetCategory.slug}` : '/')}
        className="lirva-ghost mb-5 min-h-[42px] px-4 py-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {targetCategory ? `Bumalik sa ${targetCategory.title}` : 'Bumalik sa Home'}
      </button>

      <div className="rounded-3xl border border-[var(--line)] bg-[var(--plum)] p-5 sm:p-7 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.7)]">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.14em] uppercase text-[var(--lavender)]">
          <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Lirva Studio Member Login
        </div>

        <h1 className="mt-2 mb-1.5 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
          {authStatus?.setupRequired
            ? 'I-set ang Preview Member Login'
            : 'Mag-login sa iyong Lirva Studio account'}
        </h1>

        <p className="m-0 text-sm leading-relaxed text-[var(--muted)]">
          {targetCategory
            ? `Isang member login lang para sa lahat ng kategorya. Pagkatapos mag-login, ibabalik ka agad sa ${targetCategory.title} kung kasama ito sa iyong access.`
            : 'Isang member login lang para sa AI Affiliate, AI Drama, AI Podcast, at AI Facts.'}
        </p>

        {authStatus?.setupRequired && (
          <div className="mt-4 rounded-2xl border border-[var(--lavender)]/40 bg-[var(--night)] p-3.5 text-xs leading-relaxed text-[var(--muted)]">
            <strong className="flex items-center gap-1.5 text-[var(--lavender)]">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              First-run Preview Setup
            </strong>
            <p className="mt-1 mb-0">
              Wala pang naka-configure na member credentials sa preview server na ito. Gumawa muna ng preview member email at password sa ibaba para masubukan ang login at protected toolkit flow.
            </p>
          </div>
        )}

        <a className="lirva-ghost mt-4" href={`/login?access=password&next=${encodeURIComponent(returnTo)}`}>Gamitin ang member password mula sa Messenger</a>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          {authStatus?.setupRequired && (
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-[var(--ink)]">Pangalan (opsyonal)</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Hal. Avril"
                className="min-h-[46px] rounded-[14px] border border-[var(--line)] bg-[var(--night)] px-3.5 py-2.5 text-[0.98rem] text-[var(--ink)] placeholder:text-[var(--muted)]/75"
              />
            </label>
          )}

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[var(--ink)]">Member Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pangalan@gmail.com"
              className="min-h-[46px] rounded-[14px] border border-[var(--line)] bg-[var(--night)] px-3.5 py-2.5 text-[0.98rem] text-[var(--ink)] placeholder:text-[var(--muted)]/75"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[var(--ink)]">Password</span>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              autoComplete={authStatus?.setupRequired ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={authStatus?.setupRequired ? 'Minimum 6 characters' : 'Ilagay ang password'}
              className="min-h-[46px] rounded-[14px] border border-[var(--line)] bg-[var(--night)] px-3.5 py-2.5 text-[0.98rem] text-[var(--ink)] placeholder:text-[var(--muted)]/75"
            />
          </label>

          {authStatus?.setupRequired && (
            <fieldset className="m-0 rounded-2xl border border-[var(--line)] bg-[var(--night)] p-3.5">
              <legend className="px-1 text-xs font-medium tracking-[0.08em] uppercase text-[var(--lavender)]">
                Kasamang Categories (Preview Access Rights)
              </legend>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {PUBLIC_CATEGORIES.map((cat) => (
                  <label
                    key={cat.slug}
                    className="flex min-h-[38px] cursor-pointer items-center gap-2 text-sm text-[var(--ink)]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.slug)}
                      onChange={() => toggleCategory(cat.slug)}
                      className="h-4 w-4 accent-[var(--lavender)]"
                    />
                    <span>{cat.title}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-[var(--bad)] bg-[rgba(255,140,158,0.1)] px-3.5 py-2.5 text-sm text-[var(--bad)]"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            id="login-submit-btn"
            disabled={submitting || authStatus === null}
            className="lirva-btn mt-1 w-full"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            {submitting
              ? 'Naglo-login...'
              : authStatus?.setupRequired
                ? 'I-save at Buksan ang Toolkit'
                : 'Mag-login'}
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-[var(--line)] pt-4 text-sm">
          <span className="text-[var(--muted)]">Wala ka pang Member Access?</span>
          <button
            type="button"
            onClick={() => onNavigate('/access')}
            className="cursor-pointer border-0 bg-transparent p-0 font-semibold text-[var(--lavender)] underline underline-offset-4 hover:text-[var(--ink)]"
          >
            Kumuha ng Access
          </button>
        </div>
      </div>
    </div>
  );
}
