import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  Lock,
  LogOut,
  Search,
  Sparkles,
  Unlock,
} from 'lucide-react';
import { PUBLIC_CATEGORIES, type MemberCategorySlug } from '../data/publicCatalog';
import {
  AI_TOOL_NAMES,
  AI_TOOL_URLS,
  copyToClipboard,
  type AiPlatform,
  type ContentLang,
} from '../utils/clipboard';
import { ToolLangControls } from './ToolLangControls';

export interface MemberUserInfo {
  email: string;
  name: string;
  allowedCategories: MemberCategorySlug[];
}

export interface ServerPromptCard {
  id: string;
  label: string;
  title: string;
  summary: string;
  whenToUse: string;
  prompt: {
    Taglish: string;
    English: string;
  };
}

export interface ServerStyleItem {
  num: string;
  name: string;
  group: string;
  difficulty: 'Madali' | 'Katamtaman' | 'Detalyado';
  note: string;
}

export interface ServerTemplateItem {
  id: string;
  name: string;
  bestFor: string;
  hookExample: string;
  prompt: {
    Taglish: string;
    English: string;
  };
}

export interface ServerToolkitData {
  slug: MemberCategorySlug;
  title: string;
  subtitle: string;
  botBadge: string;
  intro: string;
  bots: ServerPromptCard[];
  styles?: ServerStyleItem[];
  templates?: ServerTemplateItem[];
  checklist: { group: string; items: string[] }[];
  guides: { title: string; steps: string[] }[];
}

interface MemberToolkitViewProps {
  toolkit: ServerToolkitData;
  user: MemberUserInfo;
  platform: AiPlatform;
  lang: ContentLang;
  onPlatformChange: (p: AiPlatform) => void;
  onLangChange: (l: ContentLang) => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  onToast: (msg: string) => void;
}

export function MemberToolkitView({
  toolkit,
  user,
  platform,
  lang,
  onPlatformChange,
  onLangChange,
  onNavigate,
  onLogout,
  onToast,
}: MemberToolkitViewProps) {
  const [styleSearch, setStyleSearch] = useState('');
  const [styleGroup, setStyleGroup] = useState('Lahat');
  const [activeTemplateId, setActiveTemplateId] = useState<string>(
    toolkit.templates?.[0]?.id ?? ''
  );
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const toolName = AI_TOOL_NAMES[platform];
  const toolUrl = AI_TOOL_URLS[platform];

  const handleCopyPrompt = async (text: string, label: string, openApp = false) => {
    const ok = await copyToClipboard(text);
    if (openApp) {
      onToast(
        ok
          ? `Nakopya na ang ${label}! I-paste sa ${toolName}.`
          : `Bubuksan ang ${toolName}. I-copy ang prompt mula sa card.`
      );
    } else {
      onToast(ok ? `Nakopya na ang ${label}!` : 'Piliin at i-copy ang prompt.');
    }
  };

  const styleGroups = useMemo(() => {
    if (!toolkit.styles) return [];
    const unique = Array.from(new Set(toolkit.styles.map((s) => s.group)));
    return ['Lahat', ...unique];
  }, [toolkit.styles]);

  const filteredStyles = useMemo(() => {
    if (!toolkit.styles) return [];
    const q = styleSearch.trim().toLowerCase();
    return toolkit.styles.filter((s) => {
      const matchGroup = styleGroup === 'Lahat' || s.group === styleGroup;
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.note.toLowerCase().includes(q) ||
        s.group.toLowerCase().includes(q);
      return matchGroup && matchQuery;
    });
  }, [toolkit.styles, styleGroup, styleSearch]);

  const activeTemplate = useMemo(
    () =>
      toolkit.templates?.find((t) => t.id === activeTemplateId) ??
      toolkit.templates?.[0] ??
      null,
    [toolkit.templates, activeTemplateId]
  );

  const totalChecklistItems = useMemo(
    () => toolkit.checklist.reduce((sum, g) => sum + g.items.length, 0),
    [toolkit.checklist]
  );

  const completedChecklistItems = useMemo(
    () => Object.values(checkedMap).filter(Boolean).length,
    [checkedMap]
  );

  const buildStyleQuickPrompt = (style: ServerStyleItem) => {
    if (lang === 'English') {
      return `Use Lirva Video Style #${style.num} (${style.name}) for my affiliate product.\nWrite HOOK, VOICEOVER, CAPCUT ON-SCREEN TEXT, and CAPTION in natural conversational English. Keep technical 9:16 video prompts in English, preserve the exact reference product photo (shape, color, original label, closed state, no unseen parts, no subtitles or watermarks), and end caption with "Link in the yellow basket" and "AI-generated video · Affiliate link". Ask me for the product photo and listing details first if missing.`;
    }
    return `Gamitin ang Lirva Video Style #${style.num} (${style.name}) para sa affiliate product ko.\nWrite HOOK, VOICEOVER, CAPCUT ON-SCREEN TEXT, and CAPTION in natural conversational Taglish. Keep technical 9:16 video prompts in English, preserve the exact reference product photo (shape, color, original label, closed state, no unseen parts, no subtitles or watermarks), and end caption with "Link sa yellow basket" and "AI-generated video · Affiliate link". Ask me for the product photo and listing details first if missing.`;
  };

  return (
    <div className="mx-auto max-w-[1040px] px-4 pt-5 pb-16">
      {/* Top navigation & member account bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="lirva-ghost min-h-[42px] px-4 py-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Home
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--ok)]">
            <Unlock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Member: <strong className="font-semibold text-[var(--ink)]">{user.email}</strong>
          </span>
          <button
            type="button"
            id="member-logout-btn"
            onClick={onLogout}
            className="lirva-ghost min-h-[40px] px-3.5 py-1.5 text-xs"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            Mag-logout
          </button>
        </div>
      </div>

      {/* Unified Category Switcher across all 4 member categories */}
      <div
        role="navigation"
        aria-label="Mga kategorya ng Lirva Studio"
        className="mb-6 flex gap-2 overflow-x-auto pb-1"
      >
        {PUBLIC_CATEGORIES.map((cat) => {
          const isCurrent = cat.slug === toolkit.slug;
          const hasAccess = user.allowedCategories.includes(cat.slug);
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onNavigate(`/category/${cat.slug}`)}
              className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                isCurrent
                  ? 'border-transparent bg-[var(--violet-deep)] text-white'
                  : 'border-[var(--line)] bg-[var(--plum)] text-[var(--muted)] hover:border-[var(--lavender)] hover:text-[var(--ink)]'
              }`}
            >
              {!hasAccess && <Lock className="h-3.5 w-3.5 text-[var(--lavender)]" aria-hidden="true" />}
              <span>{cat.title}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onNavigate('/lite')}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border border-[var(--line)] bg-transparent px-4 text-sm font-medium text-[var(--lavender)] hover:border-[var(--lavender)] whitespace-nowrap cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Lirva Lite (Free)
        </button>
      </div>

      {/* Category Toolkit Header */}
      <header className="mb-6 rounded-3xl border border-[var(--lavender)]/50 bg-[var(--plum)] p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase text-[var(--ok)]">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Full Member Toolkit Unlocked</span>
          <span aria-hidden="true" className="text-[var(--line)]">
            ·
          </span>
          <span className="text-[var(--lavender)]">{toolkit.botBadge}</span>
        </div>
        <h1 className="mt-2 mb-1.5 text-[clamp(2rem,5.5vw,3rem)] font-semibold leading-[1.06] text-[var(--ink)]">
          {toolkit.title}
        </h1>
        <p className="m-0 text-sm text-[var(--lavender)]">{toolkit.subtitle}</p>
        <p className="mt-3 mb-0 max-w-[65ch] text-[0.95rem] text-[var(--muted)]">
          {toolkit.intro}
        </p>
      </header>

      {/* Global Synced Platform & Language Selector */}
      <div className="mb-7">
        <ToolLangControls
          platform={platform}
          lang={lang}
          onPlatformChange={onPlatformChange}
          onLangChange={onLangChange}
        />
      </div>

      {/* Prompt Builders / Bots */}
      <section aria-labelledby="member-bots-heading" className="mb-10">
        <h2 id="member-bots-heading" className="mb-4 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
          Mga Copyable Prompts &amp; Bots
        </h2>
        <div className="flex flex-col gap-5">
          {toolkit.bots.map((bot) => {
            const promptText = bot.prompt[lang];
            return (
              <article
                key={bot.id}
                className="rounded-3xl border border-[var(--line)] bg-[var(--plum)] p-5 sm:p-6"
              >
                <div className="text-xs font-medium tracking-[0.12em] uppercase text-[var(--lavender)]">
                  {bot.label} · {lang}
                </div>
                <h3 className="mt-1 mb-1.5 text-2xl font-semibold italic text-[var(--ink)]">
                  {bot.title}
                </h3>
                <p className="m-0 text-[0.94rem] text-[var(--muted)]">{bot.summary}</p>
                <p className="mt-2 mb-4 text-xs text-[var(--lavender)]">
                  Kailan gagamitin: <span className="text-[var(--muted)]">{bot.whenToUse}</span>
                </p>

                <pre className="prompt-pre mb-4">{promptText}</pre>

                <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <a
                    href={toolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCopyPrompt(promptText, bot.title, true)}
                    className="lirva-btn w-full sm:w-auto"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    Kopyahin at buksan ang {toolName}
                    <ExternalLink className="h-4 w-4 opacity-85" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(promptText, bot.title, false)}
                    className="lirva-ghost w-full sm:w-auto"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    Kopyahin ang prompt
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 10 Handang Templates (AI Affiliate) */}
      {toolkit.templates && toolkit.templates.length > 0 && activeTemplate && (
        <section aria-labelledby="member-tpl-heading" className="mb-10">
          <div className="mb-4">
            <p className="m-0 text-xs font-medium tracking-[0.14em] uppercase text-[var(--lavender)]">
              10 Handang Templates
            </p>
            <h2 id="member-tpl-heading" className="mt-1 mb-0 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Pumili ng template at kopyahin ang buong prompt
            </h2>
          </div>

          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {toolkit.templates.map((tpl) => {
              const selected = tpl.id === activeTemplate.id;
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => setActiveTemplateId(tpl.id)}
                  className={`min-h-[42px] shrink-0 rounded-full border px-4 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    selected
                      ? 'border-transparent bg-[var(--violet-deep)] text-white'
                      : 'border-[var(--line)] bg-[var(--plum)] text-[var(--muted)] hover:border-[var(--lavender)] hover:text-[var(--ink)]'
                  }`}
                >
                  {tpl.name}
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl border border-[var(--line)] bg-[var(--plum)] p-5 sm:p-6">
            <h3 className="m-0 text-2xl font-semibold italic text-[var(--ink)]">
              {activeTemplate.name}
            </h3>
            <p className="mt-1.5 mb-2 text-sm text-[var(--muted)]">
              Swak para sa: <span className="text-[var(--ink)]">{activeTemplate.bestFor}</span>
            </p>
            <p className="mt-0 mb-4 font-display text-lg italic text-[var(--lavender)]">
              Sample hook: {activeTemplate.hookExample}
            </p>
            <pre className="prompt-pre mb-4">{activeTemplate.prompt[lang]}</pre>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <a
                href={toolUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleCopyPrompt(activeTemplate.prompt[lang], activeTemplate.name, true)
                }
                className="lirva-btn w-full sm:w-auto"
              >
                <Copy className="h-4 w-4" aria-hidden="true" />
                Kopyahin at buksan ang {toolName}
                <ExternalLink className="h-4 w-4 opacity-85" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() =>
                  handleCopyPrompt(activeTemplate.prompt[lang], activeTemplate.name, false)
                }
                className="lirva-ghost w-full sm:w-auto"
              >
                <Copy className="h-4 w-4" aria-hidden="true" />
                Kopyahin ang template prompt
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 37 Video Styles Library (AI Affiliate) */}
      {toolkit.styles && toolkit.styles.length > 0 && (
        <section aria-labelledby="member-styles-heading" className="mb-10">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="m-0 text-xs font-medium tracking-[0.14em] uppercase text-[var(--lavender)]">
                37 Klase ng Video
              </p>
              <h2 id="member-styles-heading" className="mt-1 mb-0 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                Faceless Video Style Library
              </h2>
            </div>
            <label className="relative flex w-full items-center sm:w-72">
              <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-[var(--muted)]" aria-hidden="true" />
              <input
                type="search"
                value={styleSearch}
                onChange={(e) => setStyleSearch(e.target.value)}
                placeholder="Maghanap ng style..."
                aria-label="Maghanap sa 37 video styles"
                className="min-h-[44px] w-full rounded-full border border-[var(--line)] bg-[var(--plum)] py-2 pr-4 pl-10 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]"
              />
            </label>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {styleGroups.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={styleGroup === g}
                onClick={() => setStyleGroup(g)}
                className={`min-h-[40px] rounded-full border px-3.5 text-sm font-medium transition-colors cursor-pointer ${
                  styleGroup === g
                    ? 'border-transparent bg-[var(--violet-deep)] text-white'
                    : 'border-[var(--line)] bg-[var(--plum)] text-[var(--muted)] hover:border-[var(--lavender)] hover:text-[var(--ink)]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStyles.map((st) => (
              <div
                key={st.num}
                className="flex flex-col justify-between gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--plum)] p-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[var(--muted)]">
                    <span className="font-code text-[var(--lavender)] tabular-nums">
                      {st.num} · {st.group}
                    </span>
                    <span
                      className={
                        st.difficulty === 'Madali'
                          ? 'text-[var(--ok)]'
                          : st.difficulty === 'Katamtaman'
                            ? 'text-[var(--warn)]'
                            : 'text-[var(--bad)]'
                      }
                    >
                      {st.difficulty}
                    </span>
                  </div>
                  <h3 className="mt-1.5 mb-1 font-sans text-base font-semibold text-[var(--ink)]">
                    {st.name}
                  </h3>
                  <p className="m-0 text-sm text-[var(--muted)]">{st.note}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyPrompt(buildStyleQuickPrompt(st), `Style #${st.num} (${st.name})`)
                  }
                  className="mt-1 inline-flex min-h-[40px] items-center gap-1.5 self-start rounded-full border border-[var(--line)] px-3.5 text-xs font-medium text-[var(--lavender)] hover:border-[var(--lavender)] hover:text-[var(--ink)] cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  Kopyahin ang style prompt
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Checklist + Phone & Free Guides */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section
          aria-labelledby="member-check-heading"
          className="rounded-3xl border border-[var(--line)] bg-[var(--plum)] p-5 sm:p-6"
        >
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h2 id="member-check-heading" className="m-0 text-2xl font-semibold text-[var(--ink)]">
              Pre-Post Checklist
            </h2>
            <span className="text-xs font-medium text-[var(--lavender)] tabular-nums">
              {completedChecklistItems} / {totalChecklistItems} tapos
            </span>
          </div>
          <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--night)]">
            <div
              className="h-full bg-[var(--violet-deep)] transition-all"
              style={{
                width:
                  totalChecklistItems > 0
                    ? `${Math.round((completedChecklistItems / totalChecklistItems) * 100)}%`
                    : '0%',
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            {toolkit.checklist.map((grp) => (
              <div key={grp.group}>
                <h3 className="mb-2 font-sans text-xs font-medium tracking-[0.12em] uppercase text-[var(--lavender)]">
                  {grp.group}
                </h3>
                <div className="flex flex-col gap-1.5">
                  {grp.items.map((item, idx) => {
                    const key = `${grp.group}-${idx}`;
                    const checked = Boolean(checkedMap[key]);
                    return (
                      <label
                        key={key}
                        className="flex min-h-[40px] cursor-pointer items-start gap-3 py-1 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setCheckedMap((prev) => ({ ...prev, [key]: !prev[key] }))
                          }
                          className="mt-1 h-4 w-4 shrink-0 accent-[var(--lavender)]"
                        />
                        <span
                          className={
                            checked
                              ? 'text-[var(--ink)] line-through decoration-[var(--lavender)]'
                              : 'text-[var(--muted)]'
                          }
                        >
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="member-guide-heading"
          className="rounded-3xl border border-[var(--line)] bg-[var(--plum)] p-5 sm:p-6"
        >
          <h2 id="member-guide-heading" className="mt-0 mb-4 text-2xl font-semibold text-[var(--ink)]">
            Gabay para sa Phone at Free Accounts
          </h2>
          <div className="flex flex-col gap-5">
            {toolkit.guides.map((guide) => (
              <div
                key={guide.title}
                className="rounded-2xl border border-[var(--line)] bg-[var(--night)] p-4"
              >
                <h3 className="m-0 font-display text-xl font-semibold italic text-[var(--lavender)]">
                  {guide.title}
                </h3>
                <ol className="mt-2.5 mb-0 flex flex-col gap-2 pl-5 text-sm text-[var(--muted)]">
                  {guide.steps.map((stepText) => (
                    <li key={stepText}>{stepText}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
