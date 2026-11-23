import { ArrowLeft, ArrowRight, Check, Lock, LogIn, Sparkles } from 'lucide-react';
import { LIRVA_CONFIG, type PublicCategoryMeta } from '../data/publicCatalog';

interface CategoryLandingViewProps {
  category: PublicCategoryMeta;
  isLoggedIn: boolean;
  memberEmail?: string;
  accessDeniedReason?: string | null;
  onNavigate: (path: string) => void;
}

export function CategoryLandingView({
  category,
  isLoggedIn,
  memberEmail,
  accessDeniedReason,
  onNavigate,
}: CategoryLandingViewProps) {
  return (
    <div className="mx-auto max-w-[920px] px-4 pt-5 pb-14">
      <button
        type="button"
        onClick={() => onNavigate('/')}
        className="lirva-ghost mb-5 min-h-[42px] px-4 py-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Bumalik sa Home
      </button>

      {/* If member is signed in but their account does not include this category */}
      {isLoggedIn && accessDeniedReason && (
        <div
          role="alert"
          className="mb-5 rounded-2xl border border-[var(--warn)] bg-[rgba(255,194,122,0.08)] p-4 text-sm text-[var(--ink)]"
        >
          <strong className="block font-semibold text-[var(--warn)]">
            Naka-login ka bilang {memberEmail}
          </strong>
          <p className="mt-1 mb-0 text-[var(--muted)]">{accessDeniedReason}</p>
        </div>
      )}

      {/* SECTION 1: Short introduction in natural Taglish */}
      <section aria-labelledby="cat-intro-heading" className="mb-8">
        <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--plum)]">
          <div className="aspect-[16/9] w-full overflow-hidden border-b border-[var(--line)] bg-[var(--night)]">
            <img
              src={category.image}
              alt={category.imageAlt}
              className="h-full w-full object-cover object-[center_22%]"
            />
          </div>
          <div className="p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[var(--lavender)]">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Full toolkit for members.
              </span>
              <span aria-hidden="true" className="text-[var(--line)]">
                ·
              </span>
              <span className="text-[var(--muted)]">{category.audienceTag}</span>
            </div>

            <h1
              id="cat-intro-heading"
              className="mt-2 mb-2 text-[clamp(2rem,6vw,3.1rem)] font-semibold leading-[1.06] text-[var(--ink)]"
            >
              {category.title}
            </h1>
            <p className="m-0 font-display text-xl italic text-[var(--lavender)] sm:text-2xl">
              {category.introHeading}
            </p>
            <p className="mt-3 mb-4 text-[0.98rem] leading-relaxed text-[var(--muted)]">
              {category.introBody}
            </p>

            <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[0.94rem] text-[var(--ink)]">
              {category.whatYouCanMake.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--ok)]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: Category-specific preview clearly labeled as a sample */}
      <section aria-labelledby="cat-sample-heading" className="mb-8">
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--plum)] p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[var(--lavender)]">
              Sample Preview · {category.title}
            </span>
            <span className="text-xs text-[var(--muted)]">Sample lang · Hindi pa full toolkit</span>
          </div>

          <h2
            id="cat-sample-heading"
            className="m-0 text-2xl font-semibold text-[var(--ink)] sm:text-[1.75rem]"
          >
            {category.sampleTitle}
          </h2>
          <p className="mt-1.5 mb-4 text-sm text-[var(--muted)]">
            {category.sampleDescription}
          </p>

          <ol className="m-0 flex list-none flex-col divide-y divide-dashed divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--night)] px-4 py-1">
            {category.sampleBlocks.map((block) => (
              <li
                key={block.label}
                className="grid grid-cols-[32px_1fr] items-start gap-3 py-3.5"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--violet-deep)] text-xs font-semibold text-white">
                  {block.code}
                </span>
                <div>
                  <strong className="block text-sm font-semibold text-[var(--ink)]">
                    {block.label}
                  </strong>
                  <p className="mt-1 mb-0 text-sm leading-relaxed text-[var(--muted)]">
                    {block.content}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted)]">
            <span className="font-medium text-[var(--lavender)]">Kasama sa full member toolkit:</span>
            {category.memberHighlights.map((h, i) => (
              <span key={h}>
                {i > 0 && (
                  <span aria-hidden="true" className="mr-3 text-[var(--line)]">
                    ·
                  </span>
                )}
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Primary "Kumuha ng Access" + Secondary "Member Login" */}
      <section aria-labelledby="cat-cta-heading" className="mb-8">
        <div className="rounded-3xl border border-[var(--violet-deep)] bg-[var(--plum)] p-5 sm:p-6">
          <div className="text-xs font-medium tracking-[0.14em] uppercase text-[var(--lavender)]">
            Member Access · Launch Offer ₱{LIRVA_CONFIG.promoPrice} (Regular ₱{LIRVA_CONFIG.regularPrice})
          </div>
          <h2 id="cat-cta-heading" className="mt-1.5 mb-2 text-2xl font-semibold text-[var(--ink)]">
            Buksan ang full {category.title} toolkit at iba pang categories
          </h2>
          <p className="m-0 text-sm leading-relaxed text-[var(--muted)]">
            Isang one-time access ang Member Access — kasama na ang copyable prompts at step-by-step guides para sa AI Affiliate, AI Drama, AI Podcast, at AI Facts. Sarili mong AI accounts, video tools, at credits ang gagamitin mo.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              id="cat-get-access-btn"
              onClick={() => onNavigate('/access')}
              className="lirva-btn w-full sm:w-auto"
            >
              Kumuha ng Access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              id="cat-member-login-btn"
              onClick={() => onNavigate(`/login?next=${encodeURIComponent(`/category/${category.slug}`)}`)}
              className="lirva-ghost w-full sm:w-auto"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Member Login
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: Visible "Subukan muna ang Lirva Lite" section on the page itself */}
      <section aria-labelledby="cat-lite-heading">
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--plum)] p-5 sm:p-6">
          <p className="m-0 text-xs font-medium tracking-[0.14em] uppercase text-[var(--ok)]">
            Libre · Walang login
          </p>
          <h2 id="cat-lite-heading" className="mt-1.5 mb-2 text-2xl font-semibold text-[var(--ink)]">
            Subukan muna ang Lirva Lite
          </h2>
          <p className="m-0 text-[0.95rem] leading-relaxed text-[var(--muted)]">
            Gusto mo munang makita kung paano gumagana ang prompts ng Lirva Studio bago mag-avail? Pwede kang sumubok ng libreng 8-second sample script at video plan sa Lirva Lite gamit ang sarili mong ChatGPT o Gemini app—hindi kailangan mag-login.
          </p>
          <div className="mt-4">
            <button
              type="button"
              id="cat-open-lite-btn"
              onClick={() => onNavigate('/lite')}
              className="lirva-btn w-full sm:w-auto"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Buksan ang Lirva Lite
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
