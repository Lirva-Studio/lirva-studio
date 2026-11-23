import React, { useState, useEffect } from 'react';
import { _S, _I, _D } from './data/payload.ts';
import { UPDATER_SCRIPT } from './data/rules.ts';

const KEY = "lirva:suite-pass";

const b = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function unlock(pw: string): Promise<string> {
  const base = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pw),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: b(_S), iterations: 250000, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const pt = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: b(_I) },
    key,
    b(_D)
  );
  return new TextDecoder().decode(pt);
}

function applyDarkThemeToCss(css: string): string {
  return css
    .replace(/color-scheme\s*:\s*(?:light|dark)/gi, "color-scheme: dark")
    .replace(/(--night\s*:\s*)#[0-9a-fA-F]{3,8}/gi, "$1#121015")
    .replace(/(--plum\s*:\s*)#[0-9a-fA-F]{3,8}/gi, "$1#211C27")
    .replace(/(--plum2\s*:\s*)#[0-9a-fA-F]{3,8}/gi, "$1#18141E")
    .replace(/(--line\s*:\s*)#[0-9a-fA-F]{3,8}/gi, "$1#514459")
    .replace(/(--violet\s*:\s*)#[0-9a-fA-F]{3,8}/gi, "$1#C9A7F6")
    .replace(/(--deep\s*:\s*)#[0-9a-fA-F]{3,8}/gi, "$1#800080")
    .replace(/(--gold\s*:\s*)#[0-9a-fA-F]{3,8}/gi, "$1#C9A7F6")
    .replace(/(--ink\s*:\s*)#[0-9a-fA-F]{3,8}/gi, "$1#FAF7FF")
    .replace(/(--muted\s*:\s*)#[0-9a-fA-F]{3,8}/gi, "$1#C4BDCC")
    .replace(/(--bad\s*:\s*)#[0-9a-fA-F]{3,8}/gi, "$1#FCA5A5")
    .replace(/linear-gradient\([^)]*(?:#8100D1|#A23BF0|#C77DFF|#7B3FDB|#4B1F8F|var\(--deep\)|var\(--violet\))[^)]*\)/gi, "#800080")
    .replace(/#(12091C|0F0719|140921|0D0615|0B0512|11081A|160B24|FFFFF0)\b/gi, "#121015")
    .replace(/#(1C0F2E|1E1032|211238|190D2B|1A0D2E|26143D|221136|2A1644|180B28|150D2A|F3EEFA)\b/gi, "#211C27")
    .replace(/#(3D2160|4B2975|4C2A75|522E80|6B4C9A|D8CCE8)\b/gi, "#514459")
    .replace(/#F3ECFF\b/gi, "#FAF7FF")
    .replace(/#(B7A6D6|595365)\b/gi, "#C4BDCC")
    .replace(/#2D2D2D\b/gi, "#FAF7FF")
    .replace(/#(C77DFF|7B3FDB|EFBF04)\b/gi, "#C9A7F6")
    .replace(/#(8100D1|A23BF0|4B1F8F|3B1675)\b/gi, "#800080")
    .replace(/#(FF8C9E|B91C1C)\b/gi, "#FCA5A5")
    .replace(/rgba\(\s*129\s*,\s*0\s*,\s*209\s*,\s*\.?([0-9]+)\s*\)/gi, (_, dec) => {
      const n = parseFloat("0." + dec);
      const scaled = Math.min(0.14, Math.max(0.05, n * 0.25)).toFixed(2);
      return `rgba(128, 0, 128, ${scaled})`;
    })
    .replace(/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*\.?([4-9][0-9]*|1)\s*\)/gi, "rgba(0, 0, 0, 0.45)");
}

function applyDarkThemeToHtml(html: string): string {
  return html.replace(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi, (_m, attrs, css) => {
    return `<style${attrs}>${applyDarkThemeToCss(css)}</style>`;
  });
}

function show(html: string, category: string): string {
  try {
    html = html.replace(/Avril\s*AIFinds/gi, "Lirva Studio").replace(/https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._-]+/gi, "https://www.facebook.com/lirvastudio.ph");
    html = html.replace(/Verbatim\s+Scene/gi, (match) => match === match.toUpperCase() ? "EXACT SPOKEN WORDS" : (match === match.toLowerCase() ? "exact spoken words" : "Exact Spoken Words"));
    html = html.replace(/(?:[-*]\s*)?One\s+clip\s+per\s+shot[,\s]+\b8\s*seconds?\s*(?:or\s+less|max(?:imum)?)\.?/gi, "- Scene duration: follow verified capabilities of the selected video generator and model (magkaiba ang generated clip length sa editing timestamps).");
    html = html.replace(/One\s+clip\s+per\s+shot[,\s]+\b8\s*seconds?\s*(?:or\s+less|max(?:imum)?)\.?/gi, "duration based on verified model capabilities");
    html = html.replace(/(?:One\s+clip\s+per\s+shot,?\s*)?\b8\s*(?:seconds?|s)\s*(?:max(?:imum)?|or\s+less)\.?/gi, "duration based on verified model capabilities");
    html = html.replace(/One\s+clip\s+per\s+shot[.,]?/gi, "");
    html = html.replace(/\b8\s*(?:seconds?|s)\s*(?:or\s+less|max(?:imum)?)/gi, "duration based on verified model capabilities");
    html = html.replace(/\b8\s*(?:seconds?|s)\s*max(?:imum)?/gi, "duration based on verified model capabilities");
    html = html.replace(/mandatory\s*four[- ]scene\s*structures?/gi, "flexible scene structure");
    html = html.replace(/(?:,\s*)?(?:cart\/link\s+para\s+sa\s+)?Lazada[^\n.,]*/gi, "");
    html = html.replace(/Lazada/gi, "");
    html = applyDarkThemeToHtml(html.replace(/Lirva Suite/gi, "Lirva Studio"));

    const entryScript = category ? `<script>
      window.addEventListener('load', () => {
        const observer = new MutationObserver(openCategory);
        function openCategory() {
          const thumbnail = document.querySelector('img[data-lirva-cat="${category}"]');
          if (!thumbnail) return;
          observer.disconnect();
          thumbnail.click();
        }
        observer.observe(document.body, {childList: true, subtree: true});
        setTimeout(() => observer.disconnect(), 5000);
        openCategory();
      });
    </script>` : '';
    if (html.includes("</body>")) {
      html = html.replace("</body>", UPDATER_SCRIPT + entryScript + "</body>");
    } else {
      html += UPDATER_SCRIPT + entryScript;
    }
  } catch (_) {}
  return html;
}

export default function MembersArea({ returnTo }: { returnTo: string }) {
  const category = returnTo.match(/^\/(?:category|member)\/ai-(affiliate|drama|podcast|facts)$/)?.[1] || "";
  const [password, setPassword] = useState("");
  const [keep, setKeep] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlockedHtml, setUnlockedHtml] = useState<string | null>(null);
  const [isCheckingSaved, setIsCheckingSaved] = useState(true);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch (_) {}

    if (saved) {
      setIsLoading(true);
      unlock(saved)
        .then((html) => {
          setUnlockedHtml(show(html, category));
        })
        .catch(() => {
          try {
            localStorage.removeItem(KEY);
          } catch (_) {}
        })
        .finally(() => {
          setIsLoading(false);
          setIsCheckingSaved(false);
        });
    } else {
      setIsCheckingSaved(false);
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pw = password.trim();
    if (!pw) return;

    setError("");
    setIsLoading(true);

    try {
      const html = await unlock(pw);
      if (keep) {
        try {
          localStorage.setItem(KEY, pw);
        } catch (_) {}
      }
      setUnlockedHtml(show(html, category));
    } catch (_err) {
      setError("Mali ang password. Tingnan ulit ang message mo sa Messenger.");
    } finally {
      setIsLoading(false);
    }
  };

  if (unlockedHtml) {
    return (
      <div className="w-full h-screen relative bg-[#121015]">
        <iframe
          srcDoc={unlockedHtml}
          title="Lirva Studio Members Area"
          allow="clipboard-write"
          className="w-full h-full border-0 block"
          style={{ width: '100vw', height: '100vh', border: 'none', backgroundColor: '#121015' }}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 relative"
      style={{
        backgroundColor: "#121015",
        color: "#FAF7FF",
        padding:
          "max(16px, env(safe-area-inset-top, 0px)) max(16px, env(safe-area-inset-right, 0px)) max(16px, env(safe-area-inset-bottom, 0px)) max(16px, env(safe-area-inset-left, 0px))",
      }}
    >
      <main
        className="card"
        style={{
          width: "min(420px, 100%)",
          background: "#211C27",
          border: "1px solid #514459",
          borderRadius: "24px",
          padding: "28px 24px",
          boxShadow: "0 20px 50px -24px rgba(0, 0, 0, 0.65)",
        }}
      >
        <div
          className="mark"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            font: '700 1.2rem "Cormorant Garamond", Georgia, serif',
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "#FAF7FF",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#C9A7F6"
              d="M12 1.5c.6 4.9 2.6 7.9 9.5 10.5-6.9 2.6-8.9 5.6-9.5 10.5-.6-4.9-2.6-7.9-9.5-10.5C9.4 9.4 11.4 6.4 12 1.5z"
            />
          </svg>
          Lirva Studio
        </div>

        <h1
          style={{
            font: '600 2rem/1.1 "Cormorant Garamond", Georgia, serif',
            margin: "18px 0 6px",
            color: "#FAF7FF",
          }}
        >
          Para sa <em style={{ color: "#C9A7F6", fontStyle: "italic" }}>members</em> lang
        </h1>

        <p style={{ margin: "0 0 18px", color: "#C4BDCC", fontSize: "1rem", lineHeight: "1.6" }}>
          Ilagay ang password na ipinadala sa'yo sa Messenger pagkatapos mong magbayad.
        </p>

        <form id="f" autoComplete="off" onSubmit={handleSubmit}>
          <label
            htmlFor="pw"
            style={{
              display: "block",
              fontSize: ".72rem",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#C9A7F6",
              fontWeight: 700,
              marginBottom: "6px",
            }}
          >
            Password
          </label>
          <input
            id="pw"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading || isCheckingSaved}
            placeholder=""
            style={{
              width: "100%",
              font: '500 1rem "Manrope", sans-serif',
              color: "#FAF7FF",
              background: "#18141E",
              border: "1px solid #514459",
              borderRadius: "14px",
              padding: "13px 14px",
            }}
          />

          <div
            className="row"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              margin: "10px 0 16px",
              fontSize: ".9rem",
              color: "#C4BDCC",
            }}
          >
            <input
              id="keep"
              type="checkbox"
              checked={keep}
              onChange={(e) => setKeep(e.target.checked)}
              disabled={isLoading || isCheckingSaved}
              style={{
                width: "18px",
                height: "18px",
                accentColor: "#800080",
                cursor: "pointer",
              }}
            />
            <label
              htmlFor="keep"
              style={{
                all: "unset",
                cursor: "pointer",
                color: "#C4BDCC",
                fontSize: ".9rem",
              }}
            >
              Tandaan sa device na ito
            </label>
          </div>

          <button
            id="go"
            type="submit"
            disabled={isLoading || isCheckingSaved}
            style={{
              width: "100%",
              font: '600 1rem "Manrope", sans-serif',
              color: "#FFFFFF",
              background: "#800080",
              border: 0,
              borderRadius: "999px",
              padding: "14px",
              cursor: isLoading ? "wait" : "pointer",
              opacity: isLoading ? 0.65 : 1,
              transition: "opacity 0.2s, background-color 0.2s",
            }}
          >
            {isLoading || isCheckingSaved ? "Binubuksan…" : "Pumasok"}
          </button>

          <p
            className="err"
            id="err"
            role="alert"
            style={{
              color: "#FCA5A5",
              fontSize: ".9rem",
              minHeight: "1.4em",
              margin: "10px 0 0",
            }}
          >
            {error}
          </p>
        </form>

        <div
          className="foot"
          style={{
            marginTop: "18px",
            fontSize: ".88rem",
            color: "#C4BDCC",
          }}
        >
          Wala ka pang password? Bumili sa{" "}
          <a
            href="/access"

            rel="noopener noreferrer"
            style={{ color: "#C9A7F6", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            Kumuha ng Access
          </a>
          .
        </div>
      </main>
    </div>
  );
}
