import { ArrowLeft, Copy, ExternalLink, Lock, Sparkles } from 'lucide-react';
import { buildLirvaLitePrompt, PUBLIC_CATEGORIES } from '../data/publicCatalog';
import {
  AI_TOOL_NAMES,
  AI_TOOL_URLS,
  copyToClipboard,
  type AiPlatform,
  type ContentLang,
} from '../utils/clipboard';
import { ToolLangControls } from './ToolLangControls';

interface LirvaLiteViewProps {
  platform: AiPlatform;
  lang: ContentLang;
  onPlatformChange: (p: AiPlatform) => void;
  onLangChange: (l: ContentLang) => void;
  onNavigate: (path: string) => void;
  onToast: (msg: string) => void;
}

export function LirvaLiteView({
  platform,
  lang,
  onPlatformChange,
  onLangChange,
  onNavigate,
  onToast,
}: LirvaLiteViewProps) {
  const promptText = buildLirvaLitePrompt(lang);
  const toolName = AI_TOOL_NAMES[platform];
  const toolUrl = AI_TOOL_URLS[platform];

  const handleCopyOnly = async () => {
    const ok = await copyToClipboard(promptText);
    onToast(ok ? 'Nakopya na ang Lirva Lite prompt!' : 'Piliin at i-copy ang prompt sa box.');
  };

  const handleCopyAndOpen = async () => {
    const ok = await copyToClipboard(promptText);
    onToast(
      ok
        ? `Nakopya na! I-paste sa ${toolName} at i-attach ang litrato ng produkto.`
        : `Bubuksan ang ${toolName}. I-copy ang prompt mula sa box.`
    );
  };

  return (
    <div className="mx-auto max-w-[1040px] px-4 pt-5 pb-14">
      <button
        type="button"
        onClick={() => onNavigate('/')}
        className="lirva-ghost mb-5 min-h-[42px] px-4 py-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Bumalik sa Home
      </button>

      <div className="mb-6">
        <p className="m-0 text-xs font-medium tracking-[0.16em] uppercase text-[var(--ok)]">
          Lirva Lite · Libre · Walang kailangan na login
        </p>
        <h1 className="mt-1.5 mb-2 text-[clamp(2rem,6vw,3.2rem)] font-semibold leading-[1.06] text-[var(--ink)]">
          Subukan muna, <em className="italic text-[var(--lavender)]">wala kang babayaran</em>
        </h1>
        <p className="m-0 max-w-[54ch] text-[0.98rem] text-[var(--muted)]">
          Isang produkto, isang 8-second faceless affiliate video sample. Gumagana sa libreng ChatGPT o Gemini sa phone mo gamit ang sarili mong AI account.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* Left instructions & controls */}
        <div className="rounded-[22px] border border-[var(--line)] bg-[var(--plum)] p-5">
          <ol className="m-0 mb-5 flex list-none flex-col gap-3.5 p-0">
            {[
              {
                n: '1',
                strong: 'Piliin kung saan ka gagawa',
                rest: ' at ang wika ng content (Taglish o English).',
              },
              {
                n: '2',
                strong: 'Pindutin ang copy button.',
                rest: ' Makokopya ang prompt at mabubuksan ang napiling AI app.',
              },
              {
                n: '3',
                strong: 'I-paste, i-attach ang litrato',
                rest: ' ng produkto at listing details, tapos i-send.',
              },
            ].map((s) => (
              <li key={s.n} className="grid grid-cols-[30px_1fr] items-start gap-3">
                <b className="grid h-7 w-7 place-items-center rounded-full bg-[var(--violet-deep)] text-xs font-semibold text-white">
                  {s.n}
                </b>
                <span className="text-[0.94rem] text-[var(--muted)]">
                  <strong className="font-semibold text-[var(--ink)]">{s.strong}</strong>
                  {s.rest}
                </span>
              </li>
            ))}
          </ol>

          <div className="mb-5">
            <ToolLangControls
              platform={platform}
              lang={lang}
              onPlatformChange={onPlatformChange}
              onLangChange={onLangChange}
            />
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <a
              id="lite-copy-open"
              href={toolUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCopyAndOpen}
              className="lirva-btn w-full sm:w-auto"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Kopyahin at buksan ang {toolName}</span>
              <ExternalLink className="h-4 w-4 opacity-85" aria-hidden="true" />
            </a>
            <button
              type="button"
              id="lite-copy-only"
              onClick={handleCopyOnly}
              className="lirva-ghost w-full sm:w-auto"
            >
              <Copy className="h-4 w-4" aria-hidden="true" />
              Kopyahin lang
            </button>
          </div>

          <p className="mt-4 mb-0 text-xs leading-relaxed text-[var(--muted)]">
            Prompts at guides ang kasama sa Lirva Studio. Sarili mong AI accounts, video tools, at credits ang gagamitin mo.
          </p>
        </div>

        {/* Right prompt output */}
        <div className="rounded-[22px] border border-[var(--line)] bg-[var(--plum)] p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-medium tracking-[0.12em] uppercase text-[var(--lavender)]">
              Ang libreng Lirva Lite prompt ({lang})
            </span>
            <button
              type="button"
              onClick={handleCopyOnly}
              className="lirva-ghost min-h-[38px] px-3.5 py-1.5 text-xs"
            >
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Kopyahin
            </button>
          </div>
          <pre id="lite-prompt-out" className="prompt-pre">
            {promptText}
          </pre>
        </div>
      </div>

      {/* Explore the 4 member categories */}
      <div className="mt-10 rounded-3xl border border-[var(--line)] bg-[var(--plum)] p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="m-0 text-xs font-medium tracking-[0.14em] uppercase text-[var(--lavender)]">
              Gusto mo ng buong toolkit?
            </p>
            <h2 className="mt-1 mb-0 text-2xl font-semibold text-[var(--ink)]">
              Tingnan ang 4 na member categories sa Lirva Studio
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/access')}
            className="lirva-btn min-h-[42px] px-5 text-sm"
          >
            Kumuha ng Access
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PUBLIC_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onNavigate(`/category/${cat.slug}`)}
              className="flex min-h-[48px] flex-col items-start gap-1.5 rounded-2xl border border-[var(--line)] bg-[var(--night)] p-4 text-left transition-colors hover:border-[var(--lavender)] cursor-pointer"
            >
              <span className="font-display text-xl font-semibold text-[var(--ink)]">
                {cat.title}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--lavender)]">
                <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Full toolkit for members.
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
