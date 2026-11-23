import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Lock,
  LogIn,
  LogOut,
  Sparkles,
  Unlock,
} from 'lucide-react';
import { LirvaLogoMark } from './components/BrandMark';
import { CategoryLandingView } from './components/CategoryLandingView';
import { LirvaLiteView } from './components/LirvaLiteView';
import { LoginView } from './components/LoginView';
import {
  MemberToolkitView,
  type MemberUserInfo,
  type ServerToolkitData,
} from './components/MemberToolkitView';
import { PurchaseSection } from './components/PurchaseSection';
import {
  COMPARISON_ROWS,
  FAQ_ITEMS,
  getPublicCategory,
  LIRVA_CONFIG,
  PUBLIC_CATEGORIES,
  SUITE_INSIDE_CARDS,
  type MemberCategorySlug,
} from './data/publicCatalog';
import {
  readStoredLang,
  readStoredPlatform,
  saveStoredLang,
  saveStoredPlatform,
  type AiPlatform,
  type ContentLang,
} from './utils/clipboard';

interface ParsedRoute {
  pathname: string;
  search: string;
}

function getLocationRoute(): ParsedRoute {
  return {
    pathname: window.location.pathname || '/',
    search: window.location.search || '',
  };
}

export default function App() {
  const [route, setRoute] = useState<ParsedRoute>(() => getLocationRoute());
  const [platform, setPlatform] = useState<AiPlatform>(() => readStoredPlatform());
  const [lang, setLang] = useState<ContentLang>(() => readStoredLang());

  // Session token kept strictly in React memory (never localStorage/sessionStorage)
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [memberUser, setMemberUser] = useState<MemberUserInfo | null>(null);

  // Server-fetched protected toolkit state
  const [toolkitCache, setToolkitCache] = useState<
    Partial<Record<MemberCategorySlug, ServerToolkitData>>
  >({});
  const [toolkitLoading, setToolkitLoading] = useState(false);
  const [accessDeniedReason, setAccessDeniedReason] = useState<string | null>(null);

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastMsg(null), 2700);
  }, []);

  const navigate = useCallback((to: string) => {
    const [rawPath, hashPart] = to.split('#');
    const targetUrl = rawPath || '/';
    const currentFull = window.location.pathname + window.location.search;

    if (currentFull !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
      setRoute(getLocationRoute());
    }

    if (hashPart) {
      window.setTimeout(() => {
        document.getElementById(hashPart)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setRoute(getLocationRoute());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handlePlatformChange = (p: AiPlatform) => {
    setPlatform(p);
    saveStoredPlatform(p);
  };

  const handleLangChange = (l: ContentLang) => {
    setLang(l);
    saveStoredLang(l);
  };

  // Resolve current route view
  const pathname = route.pathname.replace(/\/+$/, '') || '/';
  const isLiteRoute = pathname === '/lite';
  const isLoginRoute = pathname === '/login';
  const isAccessRoute = pathname === '/access';
  const isCategoryRoute = pathname.startsWith('/category/');
  const isDirectMemberRoute = pathname.startsWith('/member/');
  const activeSlug = isCategoryRoute
    ? pathname.slice('/category/'.length)
    : isDirectMemberRoute
      ? pathname.slice('/member/'.length)
      : '';
  const activeCategory = activeSlug ? getPublicCategory(activeSlug) : undefined;

  // Protect direct /member/:slug links immediately when not logged in
  useEffect(() => {
    if (isDirectMemberRoute && !authToken) {
      const target = activeCategory ? `/category/${activeCategory.slug}` : '/category/ai-affiliate';
      const loginPath = `/login?next=${encodeURIComponent(target)}`;
      window.history.replaceState({}, '', loginPath);
      setRoute(getLocationRoute());
    }
  }, [isDirectMemberRoute, authToken, activeCategory]);

  // Fetch protected member toolkit from the server whenever an authenticated member visits a category
  useEffect(() => {
    if (!activeCategory || !authToken || !memberUser) {
      setAccessDeniedReason(null);
      setToolkitLoading(false);
      return;
    }

    const slug = activeCategory.slug;
    if (!memberUser.allowedCategories.includes(slug)) {
      setAccessDeniedReason(
        `Hindi pa kasama ang ${activeCategory.title} sa kasalukuyang access ng account mo. Puwede kang kumuha ng full access o lumipat sa ibang unlocked category.`
      );
      setToolkitLoading(false);
      return;
    }

    if (toolkitCache[slug]) {
      setAccessDeniedReason(null);
      setToolkitLoading(false);
      return;
    }

    let cancelled = false;
    setToolkitLoading(true);
    setAccessDeniedReason(null);

    fetch(`/api/member/toolkit/${encodeURIComponent(slug)}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (cancelled) return;

        if (res.status === 401) {
          setAuthToken(null);
          setMemberUser(null);
          setToolkitCache({});
          showToast('Nag-expire ang iyong session. Pakilogin ulit.');
          return;
        }
        if (res.status === 403) {
          setAccessDeniedReason(
            data.error || 'Hindi pa kasama ang kategoryang ito sa access ng account mo.'
          );
          return;
        }
        if (res.ok && data.toolkit) {
          setToolkitCache((prev) => ({ ...prev, [slug]: data.toolkit }));
        }
      })
      .catch(() => {
        if (!cancelled) {
          showToast('Hindi ma-load ang toolkit. Subukan ulit.');
        }
      })
      .finally(() => {
        if (!cancelled) setToolkitLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeCategory, authToken, memberUser, toolkitCache, showToast]);

  const handleAuthSuccess = (token: string, user: MemberUserInfo, targetPath: string) => {
    setAuthToken(token);
    setMemberUser(user);
    setToolkitCache({});
    showToast(`Maligayang pagbabalik, ${user.name}!`);
    navigate(targetPath);
  };

  const handleLogout = async () => {
    if (authToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${authToken}` },
        });
      } catch {
        // Clear local session regardless
      }
    }
    setAuthToken(null);
    setMemberUser(null);
    setToolkitCache({});
    setAccessDeniedReason(null);
    showToast('Naka-logout ka na.');
    navigate('/');
  };

  // Determine returnTo query parameter on /login
  const loginReturnTo = (() => {
    const params = new URLSearchParams(route.search);
    const next = params.get('next') || '';
    if (next.startsWith('/category/') || next.startsWith('/member/')) return next;
    return '/';
  })();

  const activeUnlockedToolkit =
    activeCategory && authToken && memberUser
      ? toolkitCache[activeCategory.slug] ?? null
      : null;

  return (
    <div className="min-h-screen bg-[var(--night)] text-[var(--ink)]">
      {/* Launch offer banner (only on homepage so mobile sticky stays <= 15% everywhere) */}
      {pathname === '/' && (
        <div className="border-t-[3px] border-b border-t-[var(--violet-deep)] border-b-[var(--line)] bg-[var(--plum)] text-center text-xs sm:text-sm">
          <div className="mx-auto max-w-[1040px] px-4 py-2">
            <strong className="text-[var(--lavender)]">Launch offer:</strong> ₱
            {LIRVA_CONFIG.promoPrice} para sa unang {LIRVA_CONFIG.promoBuyersTarget} buyers.
            Pagkatapos ng launch offer, ₱{LIRVA_CONFIG.regularPrice} na.{' '}
            <button
              type="button"
              onClick={() => navigate('/#presyo')}
              className="cursor-pointer border-0 bg-transparent p-0 font-semibold text-[var(--ink)] underline decoration-[var(--lavender)] underline-offset-2 hover:text-[var(--lavender)]"
            >
              Kunin na
            </button>
          </div>
        </div>
      )}

      {/* Compact Sticky Top Bar (3-zone contract, <= 56px height) */}
      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[rgba(33,28,39,0.95)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1040px] items-center justify-between gap-4 px-4">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex shrink-0 cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 text-left"
            aria-label="Lirva Studio Home"
          >
            <LirvaLogoMark size={28} />
            <span className="font-display text-lg font-bold tracking-[0.12em] uppercase text-[var(--ink)] whitespace-nowrap">
              {LIRVA_CONFIG.brandName}
            </span>
          </button>

          {/* Zone 2: Concise single-line desktop nav links */}
          <nav
            aria-label="Pangunahing nabigasyon"
            className="hidden items-center gap-6 text-sm font-medium text-[var(--muted)] md:flex"
          >
            <button
              type="button"
              onClick={() => navigate('/#kategorya')}
              className="cursor-pointer border-0 bg-transparent p-0 text-[var(--muted)] transition-colors hover:text-[var(--ink)] whitespace-nowrap"
            >
              Mga Kategorya
            </button>
            <button
              type="button"
              onClick={() => navigate('/lite')}
              className={`cursor-pointer border-0 bg-transparent p-0 transition-colors whitespace-nowrap ${
                isLiteRoute
                  ? 'text-[var(--lavender)]'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              Lirva Lite
            </button>
            <button
              type="button"
              onClick={() => navigate('/access')}
              className={`cursor-pointer border-0 bg-transparent p-0 transition-colors whitespace-nowrap ${
                isAccessRoute
                  ? 'text-[var(--lavender)]'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              Kumuha ng Access
            </button>
            <button
              type="button"
              onClick={() => navigate('/#tanong')}
              className="cursor-pointer border-0 bg-transparent p-0 text-[var(--muted)] transition-colors hover:text-[var(--ink)] whitespace-nowrap"
            >
              Mga Tanong
            </button>
          </nav>

          {/* Zone 3: Single contextual right action */}
          <div className="flex shrink-0 items-center">
            {memberUser ? (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-full border border-[var(--line)] bg-transparent px-3.5 text-xs font-medium text-[var(--lavender)] transition-colors hover:border-[var(--lavender)] hover:text-[var(--ink)] whitespace-nowrap"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                type="button"
                id="header-login-btn"
                onClick={() =>
                  navigate(
                    activeCategory
                      ? `/login?next=${encodeURIComponent(`/category/${activeCategory.slug}`)}`
                      : '/login'
                  )
                }
                className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-full border border-[var(--line)] bg-transparent px-3.5 text-xs font-medium text-[var(--lavender)] transition-colors hover:border-[var(--lavender)] hover:text-[var(--ink)] whitespace-nowrap sm:text-sm"
              >
                <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Member Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Views */}
      <main>
        {isLiteRoute ? (
          <LirvaLiteView
            platform={platform}
            lang={lang}
            onPlatformChange={handlePlatformChange}
            onLangChange={handleLangChange}
            onNavigate={navigate}
            onToast={showToast}
          />
        ) : isLoginRoute ? (
          <LoginView
            returnTo={loginReturnTo}
            onAuthSuccess={handleAuthSuccess}
            onNavigate={navigate}
          />
        ) : isAccessRoute ? (
          <div>
            <div className="mx-auto max-w-[1040px] px-4 pt-5">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="lirva-ghost min-h-[42px] px-4 py-2 text-sm"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Bumalik sa Home
              </button>
            </div>
            <PurchaseSection
              sectionId="access-presyo"
              onOpenLogin={() => navigate('/login')}
            />
          </div>
        ) : (isCategoryRoute || isDirectMemberRoute) && activeCategory ? (
          toolkitLoading ? (
            <div className="mx-auto max-w-[920px] px-4 py-16 text-center">
              <p className="text-sm text-[var(--lavender)]">
                Binubuksan ang iyong {activeCategory.title} member toolkit...
              </p>
            </div>
          ) : activeUnlockedToolkit && memberUser ? (
            <MemberToolkitView
              toolkit={activeUnlockedToolkit}
              user={memberUser}
              platform={platform}
              lang={lang}
              onPlatformChange={handlePlatformChange}
              onLangChange={handleLangChange}
              onNavigate={navigate}
              onLogout={handleLogout}
              onToast={showToast}
            />
          ) : (
            <CategoryLandingView
              category={activeCategory}
              isLoggedIn={Boolean(memberUser)}
              memberEmail={memberUser?.email}
              accessDeniedReason={accessDeniedReason}
              onNavigate={navigate}
            />
          )
        ) : (
          /* HOMEPAGE (Single Public Entry Link) */
          <>
            <div className="hero-stage pb-8">
              <div className="mx-auto max-w-[1040px] px-4 pt-6 pb-4 md:pt-8 md:pb-6">
                <div>
                  <p className="m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--lavender)]">
                    Lirva Studio · Para sa Content Creators
                  </p>
                  <h1 className="mt-2.5 mb-3 text-[clamp(2.4rem,7vw,4.25rem)] font-semibold leading-[1.03] tracking-[-0.01em] text-[var(--ink)]">
                    May produkto, kuwento, o topic ka?{' '}
                    <em className="italic text-[var(--lavender)]">Gawan natin ng video plan.</em>
                  </h1>
                  <p className="m-0 max-w-[46ch] text-[1.02rem] leading-relaxed text-[var(--muted)]">
                    Ang Lirva Studio ay toolkit ng copyable prompts at step-by-step guides para sa
                    AI Affiliate, AI Drama, AI Podcast, at AI Facts—na gagamitin mo sa sarili mong
                    ChatGPT, Gemini, at video/editing tools.
                  </p>

                  <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      onClick={() => navigate('/lite')}
                      className="lirva-btn w-full sm:w-auto"
                    >
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      Subukan ang libreng Lirva Lite
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/#kategorya')}
                      className="lirva-ghost w-full sm:w-auto"
                    >
                      Tingnan ang 5 kategorya
                    </button>
                  </div>

                  <p className="mt-3.5 mb-0 text-xs leading-relaxed text-[var(--muted)]">
                    Prompts at guides ang kasama. Sarili mong AI accounts, video tools, at credits
                    ang gagamitin mo.
                  </p>
                </div>

              </div>
            </div>

            {/* FIVE CLEARLY LABELED CLICKABLE CATEGORY CARDS */}
            <section id="kategorya" className="py-8 md:py-12">
              <div className="mx-auto max-w-[1040px] px-4">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--lavender)]">
                      Pumili ng Kategorya
                    </p>
                    <h2 className="mt-1 mb-0 text-[clamp(1.85rem,4.5vw,2.6rem)] font-semibold leading-[1.1] text-[var(--ink)]">
                      Limang kategorya, <em className="italic text-[var(--lavender)]">isang website</em>
                    </h2>
                  </div>
                  <p className="m-0 max-w-[44ch] text-sm text-[var(--muted)]">
                    Buksan agad ang libreng Lirva Lite nang walang login, o pindutin ang kahit aling
                    member category para tingnan ang sample preview nito.
                  </p>
                </div>

                {/* Card 1: Lirva Lite — Free (Full-width featured mobile-first entry card) */}
                <button
                  type="button"
                  id="card-lirva-lite"
                  onClick={() => navigate('/lite')}
                  className="mb-4 flex w-full cursor-pointer flex-col gap-3 rounded-3xl border border-[var(--lavender)] bg-[var(--plum)] p-5 text-left transition-colors hover:bg-[#282230] sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[var(--ok)]">
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        Free
                      </span>
                      <span aria-hidden="true" className="text-[var(--line)]">
                        ·
                      </span>
                      <span className="text-[var(--lavender)]">Buksan agad nang walang login</span>
                    </div>
                    <h3 className="mt-1.5 mb-1 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                      Lirva Lite
                    </h3>
                    <p className="m-0 max-w-[58ch] text-sm leading-relaxed text-[var(--muted)]">
                      Subukan ang libreng 8-second affiliate sample script, voiceover, English video
                      prompt, at caption gamit ang sarili mong ChatGPT o Gemini app.
                    </p>
                  </div>
                  <span className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[var(--violet-deep)] px-5 text-sm font-semibold text-white sm:self-center">
                    Buksan nang libre
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>

                {/* Cards 2–5: Four Member Categories (all clickable, lock icon beside "Full toolkit for members.") */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {PUBLIC_CATEGORIES.map((cat) => {
                    const isUnlocked = Boolean(memberUser?.allowedCategories.includes(cat.slug));
                    return (
                      <button
                        key={cat.slug}
                        type="button"
                        id={`card-${cat.slug}`}
                        onClick={() => navigate(`/category/${cat.slug}`)}
                        className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--plum)] p-4 text-left transition-colors hover:border-[var(--lavender)]"
                      >
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--night)]">
                          <img
                            src={cat.image}
                            alt={cat.imageAlt}
                            width={1024}
                            height={572}
                            loading="lazy"
                            className="h-full w-full object-cover object-[center_22%] transition-transform duration-200 group-hover:scale-[1.02]"
                          />
                        </div>

                        <div className="mt-3.5 flex flex-1 flex-col justify-between gap-3">
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="m-0 text-2xl font-semibold text-[var(--ink)]">
                                {cat.title}
                              </h3>
                              <ChevronRight
                                className="h-5 w-5 shrink-0 text-[var(--lavender)] transition-transform group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="mt-1.5 mb-0 text-sm leading-relaxed text-[var(--muted)]">
                              {cat.cardSummary}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-2 border-t border-dashed border-[var(--line)] pt-3 text-xs font-medium">
                            {isUnlocked ? (
                              <span className="inline-flex items-center gap-1.5 text-[var(--ok)]">
                                <Unlock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                Unlocked · Buksan ang toolkit
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-[var(--lavender)]">
                                <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                Full toolkit for members.
                              </span>
                            )}
                            <span className="text-[var(--muted)] group-hover:text-[var(--ink)]">
                              {isUnlocked ? 'Buksan' : 'Tingnan ang sample'}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* LAMAN NG SUITE (Preserved 6 visual cards + comparison table) */}
            <section id="laman" className="py-12">
              <div className="mx-auto max-w-[1040px] px-4">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--lavender)]">
                      Laman ng Member Access
                    </p>
                    <h2 className="mt-1 mb-0 text-[clamp(1.85rem,4.5vw,2.6rem)] font-semibold leading-[1.1] text-[var(--ink)]">
                      Kapag nagustuhan mo ang sample,{' '}
                      <em className="italic text-[var(--lavender)]">ito ang buo</em>
                    </h2>
                  </div>
                  <p className="m-0 max-w-[44ch] text-sm text-[var(--muted)]">
                    Lahat ng copyable prompts, bots, templates, at step-by-step guides ay nasa iisang
                    Lirva Studio member login.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {SUITE_INSIDE_CARDS.map((card) => (
                    <article
                      key={card.title}
                      className="flex min-w-0 flex-col gap-2 rounded-[20px] border border-[var(--line)] bg-[var(--plum)] p-4"
                    >
                      <div className="mb-1 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--night)]">
                        <img
                          src={card.image}
                          alt={card.alt}
                          width={1376}
                          height={768}
                          loading="lazy"
                          className="block h-auto w-full aspect-[1024/572] object-contain"
                        />
                      </div>
                      <div className="font-display text-4xl font-medium leading-none text-[var(--lavender)] tabular-nums">
                        {card.big}
                      </div>
                      <h3 className="m-0 text-xl font-semibold italic text-[var(--ink)]">
                        {card.title}
                      </h3>
                      <p className="m-0 text-sm text-[var(--muted)]">{card.desc}</p>
                      {card.tags.length > 0 && (
                        <div className="mt-auto pt-2 text-xs leading-relaxed text-[var(--lavender)]">
                          {card.tags.join(' · ')}
                        </div>
                      )}
                    </article>
                  ))}
                </div>

                {/* Comparison table */}
                <div className="mt-6 overflow-x-auto rounded-[22px] border border-[var(--line)] bg-[var(--plum)] p-5">
                  <h3 className="mt-0 mb-3 text-xl font-semibold italic text-[var(--ink)]">
                    Lirva Lite at Member Access
                  </h3>
                  <table className="w-full min-w-[420px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[var(--line)] text-left text-[11px] font-medium tracking-[0.1em] uppercase text-[var(--lavender)]">
                        <th className="py-2.5 pr-3">Kasama</th>
                        <th className="py-2.5 px-3">Lirva Lite (libre)</th>
                        <th className="py-2.5 pl-3">
                          Member Access (₱{LIRVA_CONFIG.promoPrice})
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON_ROWS.map((row) => (
                        <tr key={row.feature} className="border-b border-[var(--line)]/70">
                          <td className="py-2.5 pr-3 text-[var(--muted)]">{row.feature}</td>
                          <td
                            className={`py-2.5 px-3 ${
                              row.liteNo ? 'text-[var(--bad)]' : 'text-[var(--ink)]'
                            }`}
                          >
                            {row.lite}
                          </td>
                          <td className="py-2.5 pl-3 text-[var(--ok)]">{row.suite}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* EXISTING 3-STEP PURCHASE SECTION */}
            <PurchaseSection
              sectionId="presyo"
              onOpenLogin={() => navigate('/login')}
            />

            {/* FAQ */}
            <section id="tanong" className="py-12">
              <div className="mx-auto max-w-[1040px] px-4">
                <div className="mb-6">
                  <p className="m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--lavender)]">
                    Mga Tanong
                  </p>
                  <h2 className="mt-1 mb-0 text-[clamp(1.85rem,4.5vw,2.6rem)] font-semibold leading-[1.1] text-[var(--ink)]">
                    Bago ka <em className="italic text-[var(--lavender)]">magbayad</em>
                  </h2>
                </div>

                <div className="flex flex-col gap-2.5">
                  {FAQ_ITEMS.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-[var(--line)] bg-[var(--plum)] px-4 py-3.5"
                    >
                      <summary className="flex min-h-[36px] cursor-pointer items-center justify-between gap-3 text-base font-medium text-[var(--ink)] transition-colors hover:text-[var(--lavender)]">
                        <span>{item.q}</span>
                        <span
                          aria-hidden="true"
                          className="font-code text-lg text-[var(--lavender)] group-open:hidden"
                        >
                          +
                        </span>
                        <span
                          aria-hidden="true"
                          className="hidden font-code text-lg text-[var(--lavender)] group-open:inline"
                        >
                          –
                        </span>
                      </summary>
                      <p className="mt-2.5 mb-0 text-sm leading-relaxed text-[var(--muted)]">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-[var(--line)] py-9 text-sm text-[var(--muted)]">
        {pathname === '/' && (
          <img
            src="/lirva-avatar.webp"
            alt="Lirva Studio AI avatar"
            className="mx-auto mb-4 block h-auto w-full max-w-[96px] md:max-w-[140px]"
            width={1536}
            height={1024}
            loading="lazy"
          />
        )}
        <div className="mx-auto flex max-w-[1040px] flex-wrap items-center justify-between gap-3 px-4">
          <span>© 2026 {LIRVA_CONFIG.brandName}</span>
          <span>
            Prompts at guides para sa sarili mong AI tools. Walang garantiya sa benta. Ikaw ang
            responsable sa ipo-post mo.
          </span>
        </div>
      </footer>

      {/* Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-5 left-1/2 z-50 max-w-[calc(100%-32px)] -translate-x-1/2 rounded-full border border-[var(--line)] bg-[var(--ink)] px-5 py-2.5 text-center text-sm font-medium text-[var(--night)] shadow-xl transition-all duration-200 ${
          toastMsg
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        {toastMsg || ''}
      </div>
    </div>
  );
}
