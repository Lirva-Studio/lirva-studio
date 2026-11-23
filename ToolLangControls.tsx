import type { AiPlatform, ContentLang } from '../utils/clipboard';

interface ToolLangControlsProps {
  platform: AiPlatform;
  lang: ContentLang;
  onPlatformChange: (p: AiPlatform) => void;
  onLangChange: (l: ContentLang) => void;
}

export function ToolLangControls({
  platform,
  lang,
  onPlatformChange,
  onLangChange,
}: ToolLangControlsProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-x-7 gap-y-3 rounded-[20px] border border-[var(--line)] bg-[var(--plum)] px-4 py-3.5"
      aria-label="Mga setting ng AI tool at wika"
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <span
          id="lbl-platform"
          className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--lavender)]"
        >
          Saan
        </span>
        <div
          role="group"
          aria-labelledby="lbl-platform"
          className="inline-flex rounded-full border border-[var(--line)] bg-[var(--night)] p-[3px]"
        >
          {(['chatgpt', 'gemini'] as AiPlatform[]).map((p) => {
            const active = platform === p;
            return (
              <button
                key={p}
                type="button"
                data-platform={p}
                aria-pressed={active}
                onClick={() => onPlatformChange(p)}
                className={`min-h-[40px] rounded-full px-4 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[var(--violet-deep)] text-white'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {p === 'chatgpt' ? 'ChatGPT' : 'Gemini'}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <span
          id="lbl-lang"
          className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--lavender)]"
        >
          Wika ng content
        </span>
        <div
          role="group"
          aria-labelledby="lbl-lang"
          className="inline-flex rounded-full border border-[var(--line)] bg-[var(--night)] p-[3px]"
        >
          {(['Taglish', 'English'] as ContentLang[]).map((l) => {
            const active = lang === l;
            return (
              <button
                key={l}
                type="button"
                data-lang={l}
                aria-pressed={active}
                onClick={() => onLangChange(l)}
                className={`min-h-[40px] rounded-full px-4 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[var(--violet-deep)] text-white'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
