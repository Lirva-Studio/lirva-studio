export type AiPlatform = 'chatgpt' | 'gemini';
export type ContentLang = 'Taglish' | 'English';

export const AI_TOOL_URLS: Record<AiPlatform, string> = {
  chatgpt: 'https://chatgpt.com/',
  gemini: 'https://gemini.google.com/app',
};

export const AI_TOOL_NAMES: Record<AiPlatform, string> = {
  chatgpt: 'ChatGPT',
  gemini: 'Gemini',
};

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }

  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function readStoredPlatform(): AiPlatform {
  try {
    const raw = localStorage.getItem('lirva:plat');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed === 'chatgpt' || parsed === 'gemini') return parsed;
    }
  } catch {
    // Ignore storage errors
  }
  return 'chatgpt';
}

export function saveStoredPlatform(plat: AiPlatform): void {
  try {
    localStorage.setItem('lirva:plat', JSON.stringify(plat));
  } catch {
    // Ignore storage errors
  }
}

export function readStoredLang(): ContentLang {
  try {
    const raw = localStorage.getItem('lirva:lang');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed === 'Taglish' || parsed === 'English') return parsed;
      // Migrate previously saved Tagalog selections to Taglish
      localStorage.setItem('lirva:lang', JSON.stringify('Taglish'));
    }
  } catch {
    // Ignore storage errors
  }
  return 'Taglish';
}

export function saveStoredLang(lang: ContentLang): void {
  try {
    localStorage.setItem('lirva:lang', JSON.stringify(lang));
  } catch {
    // Ignore storage errors
  }
}
