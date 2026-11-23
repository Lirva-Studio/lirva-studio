import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, Download, ExternalLink, Maximize2, X } from 'lucide-react';
import { LIRVA_CONFIG } from '../data/publicCatalog';

interface PurchaseSectionProps {
  sectionId?: string;
  onOpenLogin?: () => void;
}

const STEP_NOTES: Record<number, string> = {
  1: 'Hakbang 1 sa 3: Suriin ang Member Access offer.',
  2: 'Hakbang 2 sa 3: Magbayad gamit ang Lirva GCash QR.',
  3: 'Hakbang 3 sa 3: Ipadala ang resibo sa Lirva Studio Facebook page.',
};

export function PurchaseSection({ sectionId = 'presyo', onOpenLogin }: PurchaseSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [qrOpen, setQrOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!qrOpen) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQrOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [qrOpen]);

  const goToStep = (next: 1 | 2 | 3, scrollTop = false) => {
    setStep(next);
    if (scrollTop) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id={sectionId} ref={sectionRef} className="py-12 md:py-14">
      <div className="mx-auto max-w-[1040px] px-4">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--lavender)]">
              Presyo at Pag-avail
            </p>
            <h2 className="mt-1 mb-0 text-[clamp(1.85rem,4.5vw,2.6rem)] font-semibold leading-[1.1] text-[var(--ink)]">
              Isang bayad, <em className="italic text-[var(--lavender)]">buong member toolkit</em>
            </h2>
          </div>
          <p className="m-0 max-w-[46ch] text-[0.95rem] text-[var(--muted)]">
            Suriin ang Member Access, magbayad gamit ang Lirva GCash QR sa website, at ipadala ang screenshot ng resibo sa Lirva Studio Facebook page.
          </p>
        </div>

        {/* 3-step indicator */}
        <div
          role="navigation"
          aria-label="Mga hakbang sa pag-avail"
          className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3"
        >
          {(
            [
              { n: 1 as const, label: 'Suriin ang Member Access' },
              { n: 2 as const, label: 'Magbayad gamit ang QR' },
              { n: 3 as const, label: 'Ipadala ang resibo' },
            ]
          ).map((item) => {
            const active = step === item.n;
            const done = item.n < step;
            return (
              <button
                key={item.n}
                type="button"
                aria-current={active ? 'step' : undefined}
                onClick={() => goToStep(item.n, false)}
                className={`flex min-h-[48px] w-full items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                  active
                    ? 'border-[var(--lavender)] bg-[var(--plum)] text-white'
                    : 'border-[var(--line)] bg-[var(--plum)] text-[var(--muted)] hover:border-[var(--lavender)] hover:text-[var(--ink)]'
                }`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-semibold ${
                    active
                      ? 'border-[var(--violet-deep)] bg-[var(--violet-deep)] text-white'
                      : done
                        ? 'border-[var(--ok)] bg-[rgba(126,224,181,0.16)] text-[var(--ok)]'
                        : 'border-[var(--line)] bg-[var(--night)] text-[var(--lavender)]'
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : item.n}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)]">
          {/* Active Step Card */}
          <div className="order-2 md:order-1">
            {step === 1 && (
              <div
                id="co-step-1"
                className="rounded-3xl border border-[var(--violet-deep)] bg-[var(--plum)] p-5 sm:p-6 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.7)]"
              >
                <div className="text-xs font-medium tracking-[0.12em] uppercase text-[var(--lavender)]">
                  Member Access · Launch Offer (Unang {LIRVA_CONFIG.promoBuyersTarget} Buyers)
                </div>

                <div className="mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="font-display text-[3.2rem] font-medium leading-none text-[var(--ink)] tabular-nums">
                    ₱{LIRVA_CONFIG.promoPrice}
                  </span>
                  <span className="text-base text-[var(--muted)]">one-time access</span>
                  <span className="text-sm text-[var(--muted)]">
                    Regular price: <s className="tabular-nums">₱{LIRVA_CONFIG.regularPrice}</s>
                  </span>
                </div>

                <p className="mt-2 mb-0 text-sm text-[var(--lavender)]">
                  ₱{LIRVA_CONFIG.promoPrice} one-time access — launch offer para sa unang {LIRVA_CONFIG.promoBuyersTarget} buyers. Regular price: ₱{LIRVA_CONFIG.regularPrice}.
                </p>

                <ul className="mt-4 mb-0 flex list-none flex-col gap-2.5 p-0 text-[0.95rem] text-[var(--ink)]">
                  {[
                    'AI Affiliate, AI Drama, AI Podcast, at AI Facts',
                    'Copyable prompts at step-by-step guides para sa sarili mong ChatGPT o Gemini accounts at video/editing tools',
                    '3 Lirva bots, 37 video styles, at 10 handang templates',
                    '15-puntong checklist at gabay para sa phone at free accounts',
                    'Member access sa Lirva Studio para sa isang account',
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--ok)]" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 mb-0 rounded-[14px] border border-[var(--line)] bg-[var(--night)] px-3.5 py-3 text-sm leading-relaxed text-[var(--ink)]">
                  Prompts at guides ang kasama. Sarili mong AI accounts, video tools, at credits ang gagamitin mo. Walang kasamang AI subscription, built-in video generator, o AI credits.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    id="co-to-pay"
                    onClick={() => goToStep(2, true)}
                    className="lirva-btn w-full sm:w-auto"
                  >
                    Magpatuloy sa bayad
                  </button>
                  {onOpenLogin && (
                    <button
                      type="button"
                      onClick={onOpenLogin}
                      className="lirva-ghost w-full sm:w-auto"
                    >
                      May access na? Member Login
                    </button>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div
                id="co-step-2"
                className="rounded-3xl border border-[var(--violet-deep)] bg-[var(--plum)] p-5 sm:p-6 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.7)]"
              >
                <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => goToStep(1, true)}
                    className="lirva-ghost min-h-[40px] px-3.5 py-1.5 text-sm"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Bumalik sa offer
                  </button>
                  <span className="text-xs font-medium tracking-[0.12em] uppercase text-[var(--lavender)]">
                    Hakbang 2 sa 3
                  </span>
                </div>

                <h3 className="m-0 text-2xl font-semibold italic text-[var(--ink)]">
                  Magbayad gamit ang Lirva GCash QR
                </h3>
                <p className="mt-1.5 mb-4 text-sm text-[var(--muted)]">
                  I-scan o i-save ang QR sa ibaba para magbayad ng{' '}
                  <strong className="text-[var(--ink)]">₱{LIRVA_CONFIG.promoPrice}</strong>. I-check ang recipient at amount bago i-confirm sa GCash.
                </p>

                <div className="mb-4 grid grid-cols-1 gap-2.5 rounded-[14px] border border-[var(--line)] bg-[var(--night)] p-3.5 sm:grid-cols-3">
                  <div>
                    <span className="block text-[11px] tracking-[0.08em] uppercase text-[var(--lavender)]">
                      Paraan ng bayad
                    </span>
                    <strong className="mt-0.5 block text-[0.95rem] text-[var(--ink)]">
                      GCash (InstaPay QR)
                    </strong>
                  </div>
                  <div>
                    <span className="block text-[11px] tracking-[0.08em] uppercase text-[var(--lavender)]">
                      Account name
                    </span>
                    <strong className="mt-0.5 block text-[0.95rem] text-[var(--ink)]">
                      {LIRVA_CONFIG.accountName}
                    </strong>
                  </div>
                  <div>
                    <span className="block text-[11px] tracking-[0.08em] uppercase text-[var(--lavender)]">
                      Halaga
                    </span>
                    <strong className="mt-0.5 block text-[0.95rem] text-[var(--ink)] tabular-nums">
                      ₱{LIRVA_CONFIG.promoPrice}
                    </strong>
                  </div>
                </div>

                <div className="qr-surface my-3 flex flex-col items-center rounded-[18px] border border-[var(--line)] bg-white p-4 text-center">
                  <button
                    type="button"
                    onClick={() => setQrOpen(true)}
                    aria-label="Palakihin ang GCash QR code"
                    className="inline-block cursor-zoom-in rounded-xl border-0 bg-transparent p-0"
                  >
                    <img
                      src="/gcash-qr.png"
                      alt={`Aprubadong Lirva Studio GCash QR Code para sa ₱${LIRVA_CONFIG.promoPrice}`}
                      className="block h-auto w-full max-w-[230px] rounded-lg object-contain"
                    />
                  </button>
                  <div className="mt-3.5 flex flex-wrap justify-center gap-2.5">
                    <a
                      href="/gcash-qr.png"
                      download="gcash-qr.png"
                      className="lirva-btn min-h-[42px] px-4 py-2 text-sm shadow-none"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Save QR
                    </a>
                    <button
                      type="button"
                      id="enlarge-qr"
                      onClick={() => setQrOpen(true)}
                      className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-[#800080] bg-[#FAF7FF] px-4 py-2 text-sm font-medium text-[#211C27] transition-colors hover:bg-[#efe6fb] cursor-pointer"
                    >
                      <Maximize2 className="h-4 w-4" aria-hidden="true" />
                      Palakihin ang QR
                    </button>
                  </div>
                  <p className="mt-2.5 mb-0 text-xs leading-relaxed text-[#514459]">
                    Gamit ang parehong phone? Pindutin ang Save QR at piliin ito mula sa gallery sa GCash app.
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    id="co-to-receipt"
                    onClick={() => goToStep(3, true)}
                    className="lirva-btn w-full sm:w-auto"
                  >
                    Nabayaran na — susunod sa resibo
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(1, true)}
                    className="lirva-ghost w-full sm:w-auto"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Bumalik
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div
                id="co-step-3"
                className="rounded-3xl border border-[var(--violet-deep)] bg-[var(--plum)] p-5 sm:p-6 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.7)]"
              >
                <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => goToStep(2, true)}
                    className="lirva-ghost min-h-[40px] px-3.5 py-1.5 text-sm"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Bumalik sa QR
                  </button>
                  <span className="text-xs font-medium tracking-[0.12em] uppercase text-[var(--lavender)]">
                    Hakbang 3 sa 3
                  </span>
                </div>

                <h3 className="m-0 text-2xl font-semibold italic text-[var(--ink)]">
                  Ipadala ang resibo
                </h3>
                <p className="mt-2 mb-3.5 text-[0.96rem] leading-relaxed text-[var(--ink)]">
                  Pagkatapos magbayad, buksan ang Lirva Studio Facebook page at i-message ang screenshot ng resibo, kasama ang pangalan at email na gagamitin para sa access.
                </p>

                <ul className="mb-5 flex list-none flex-col gap-2 p-0 text-[0.95rem] text-[var(--ink)]">
                  {[
                    `Screenshot ng iyong GCash receipt (₱${LIRVA_CONFIG.promoPrice})`,
                    'Buong pangalan mo',
                    'Email (Gmail) na gagamitin para sa Lirva Studio access',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--ok)]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  <a
                    id="fb-receipt-link"
                    href={LIRVA_CONFIG.fbPageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lirva-btn w-full sm:w-auto"
                  >
                    Ipadala ang resibo sa Lirva Studio
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => goToStep(2, true)}
                    className="lirva-ghost w-full sm:w-auto"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Bumalik
                  </button>
                </div>

                <p className="mt-3.5 mb-0 text-sm leading-relaxed text-[var(--muted)]">
                  Kailangan mong i-attach at i-send ang screenshot sa Messenger. Ipapadala ang access pagkatapos ma-verify ang bayad.
                </p>
                <p className="mt-2 mb-0 text-sm text-[var(--muted)]">
                  Siguraduhing sa opisyal na Lirva Studio Facebook page ka nakikipag-usap. Hindi kami hihingi ng password o OTP mo kahit kailan.
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <aside
            aria-label="Order summary"
            className="order-1 rounded-3xl border border-[var(--line)] bg-[var(--plum)] p-5 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.7)] md:sticky md:top-20 md:order-2"
          >
            <p className="m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--lavender)]">
              Order summary
            </p>
            <h3 className="mt-1 mb-3 text-2xl font-semibold italic text-[var(--ink)]">
              Member Access
            </h3>
            <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-[var(--line)] py-2.5 text-sm">
              <span className="text-[var(--muted)]">Offer</span>
              <span className="text-right text-[var(--ink)]">
                Launch offer (unang {LIRVA_CONFIG.promoBuyersTarget} buyers)
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-[var(--line)] py-2.5 text-sm">
              <span className="text-[var(--muted)]">Kasama</span>
              <span className="text-right text-[var(--ink)]">
                AI Affiliate, Drama, Podcast, Facts
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-[var(--line)] py-2.5 text-sm">
              <span className="text-[var(--muted)]">Regular price</span>
              <span className="text-[var(--muted)] tabular-nums">
                <s>₱{LIRVA_CONFIG.regularPrice}</s>
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3 py-2.5 text-sm">
              <span className="text-[var(--muted)]">Babayaran</span>
              <span className="font-display text-3xl font-semibold text-[var(--ink)] tabular-nums">
                ₱{LIRVA_CONFIG.promoPrice}
              </span>
            </div>
            <p className="mt-2.5 mb-0 text-sm text-[var(--lavender)]">{STEP_NOTES[step]}</p>
            <p className="mt-3 mb-0 border-t border-dashed border-[var(--line)] pt-3 text-xs leading-relaxed text-[var(--muted)]">
              Prompts at guides ang kasama. Sarili mong AI accounts, video tools, at credits ang gagamitin mo.
            </p>
          </aside>
        </div>
      </div>

      {/* QR Enlarge Modal */}
      {qrOpen && (
        <div
          id="qr-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setQrOpen(false);
          }}
          className="fixed inset-0 z-50 grid place-items-center bg-[rgba(12,10,16,0.84)] p-4 backdrop-blur-sm"
        >
          <div className="qr-surface flex w-full max-w-[420px] flex-col items-center gap-3 rounded-[22px] bg-white p-4 text-[#121015] shadow-2xl">
            <div className="flex w-full items-center justify-between gap-2">
              <strong id="qr-modal-title" className="text-base">
                Lirva Studio GCash QR (₱{LIRVA_CONFIG.promoPrice})
              </strong>
              <button
                ref={closeBtnRef}
                type="button"
                id="qr-close"
                onClick={() => setQrOpen(false)}
                className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-[#800080] bg-[#FAF7FF] px-3.5 text-sm font-medium text-[#211C27] hover:bg-[#efe6fb] cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Isara
              </button>
            </div>
            <img
              src="/gcash-qr.png"
              alt={`Pinalaking Lirva Studio GCash QR Code para sa ₱${LIRVA_CONFIG.promoPrice}`}
              className="block h-auto max-h-[68vh] w-full rounded-xl object-contain"
            />
            <a
              href="/gcash-qr.png"
              download="gcash-qr.png"
              className="lirva-btn min-h-[42px] px-5 text-sm shadow-none"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Save QR
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
