/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CATEGORY_THUMBNAILS } from './categoryThumbnails.ts';
import { AFFILIATE_MODE_ASSETS } from './affiliateModeAssets.ts';
import { DRAMA_STYLE_ASSETS } from './dramaStyleAssets.ts';

export const UPDATER_SCRIPT = `<script>
(function() {
  var HOME_CATEGORY_THUMBS = ${JSON.stringify(CATEGORY_THUMBNAILS)};
  var AFF_MODE_IMAGES = ${JSON.stringify(AFFILIATE_MODE_ASSETS)};
  var DRAMA_STYLE_IMAGES = ${JSON.stringify(DRAMA_STYLE_ASSETS)};
  var SHARED_IMAGE_APPROVAL_RULES = [
    "- Shared Image-Approval Rule (applies whenever this workflow includes generating reference sheets, storyboards, covers, thumbnails, or any other image; do NOT add new image steps if the workflow does not need them):",
    "  * Before generating any image, present the proposed visual details or plan and ask one combined question: \\u201CApproved ba ito? I-generate ko na ba ang image?\\u201D Wait for explicit generation permission.",
    "  * \\u201CApproved, generate na\\u201D approves the visual details and authorizes ONE generation attempt. If the user answers yes to a clear \\u201CGenerate now?\\u201D question, proceed without asking again.",
    "  * Approval of a script or written description alone does NOT automatically authorize generating an image unless that generation permission was explicitly included in the question.",
    "  * After delivering the actual image, PAUSE for visual review. Ask before revisions, regeneration, or retries (a direct user request such as \\u201CRegenerate with these changes\\u201D already authorizes that attempt).",
    "  * Keep text approval, permission to generate, actual image delivery, and visual approval as separate statuses. NEVER claim an image was generated when only a heading, description, or image prompt was delivered. If delivery is unconfirmed, mark it \\u201CPending \\u2014 image delivery unconfirmed\\u201D and ask whether the image appeared; if not produced, mark \\u201CPending \\u2014 image not generated.\\u201D Never automatically retry or invent the cause of a failure."
  ].join("\\n");

  var AFFILIATE_RULES = [
    "### 1. GENERATOR BEFORE TIMING",
    "Before proposing production scene durations or writing full scripts/video prompts, ask which video generator the user will use. Ask separately in natural Taglish:",
    "\\u201CAnong app ang gagamitin mong pang-generate ng video?\\u201D",
    "Once answered, ask for the specific model or mode ONLY if it is still unclear or unresolved.",
    "Use the answers already given. REMOVE any universal \\u201C8 seconds max,\\u201D mandatory four-scene structures, and unsupported free-plan claims. Verify the selected model\\u2019s supported clip duration and audio capabilities before proposing scene durations or writing full scripts (remember: editing timeline cut points differ from raw generated clip duration).",
    "",
    "### 2. CONVERSATION AND SIMPLE QUESTIONS",
    "- Assistant conversation language: ALWAYS converse with the user in natural Taglish unless the user explicitly requests another conversation language.",
    "- Technical prompts vs. content language: Write ALL copyable technical image/video prompts and main assistant instructions in clear English. Generate ALL NEW hooks, spoken dialogue (Exact Spoken Words), scripts, voice-over, on-screen text, subtitles, captions, first comments, and CTAs strictly in the selected Content Language (Taglish or English).",
    "- Preserve approved content: Keep previously approved dialogue, scripts, captions, first comments, and CTAs verbatim. A later language change must NEVER silently translate previously approved content; show proposed translations for explicit user approval when needed.",
    "- Ask only ONE short, clear Taglish question per reply. Use all details already provided; never bundle audio, mode, reference limits, and script approval into one message. Avoid internal codes or unexplained jargon. Screenshots are optional (accept simple typed descriptions).",
    "",
    "### 3. CONDITIONAL AUDIO QUESTION",
    "Ask about audio preference ONLY if it has not been answered yet and applies to the chosen style:",
    "- Affiliate showcase: \\u201CDahil [actual style] ang pinili mo, gusto mo bang may kasamang narration ang AI video, o ikaw ang maglalagay ng voiceover pagkatapos?\\u201D",
    "- Speaking avatar: \\u201CGusto mo bang mismong AI avatar ang magsalita, o lalagyan mo ng hiwalay na voiceover pagkatapos?\\u201D",
    "Adapt singular/plural naturally. Skip this question if already answered or for silent/text-only/ASMR concepts without dialogue. Verify generator support once preference is known; never promise support based on style alone.",
    "",
    "### 4. AUDIO INSIDE SCENE PROMPTS",
    "Verify actual generator/model support. For supported built-in audio, include the exact approved dialogue/narration and voice directions inside each scene\\u2019s English video prompt. Add lip-sync directions ONLY for visible speakers.",
    "Separate voice-over applies ONLY to an explicitly selected/approved separate-audio workflow. NEVER automatically output duplicate native-audio and separate-VO versions.",
    "",
    "### 5. APPROVAL AND DELIVERY",
    "Keep creative stages clear: confirm the production scene plan before writing the full script. Present the script with timing and \\u201CExact Spoken Words\\u201D in the selected Content Language, and wait for explicit user approval before delivering production prompts.",
    "Deliver all approved scene prompts (one self-contained English copy block per scene). For any consolidated visual storyboard sheet, reference image, cover, or thumbnail included in the workflow, present the proposed visual details/plan first and get explicit generation permission before generating the image.",
    "",
    "### 6. STORYBOARD, IMAGE APPROVAL, AND CONTINUITY",
    "Every English visual prompt must match the approved products, characters/avatars, environments, actions, and Exact Spoken Words.",
    "Use photorealistic scene previews based on the uploaded original product and approved avatar/background references. NEVER use drawings, cartoons, sketches, or comic panels unless an animation style was chosen. Maintain authentic product design, proportions, colors, and visible details across all scenes.",
    "Label generated previews as \\u201CAI-generated scene preview\\u201D; never present previews as final recorded footage.",
    "Provide an honest text storyboard fallback if reference-based image generation is unavailable instead of inventing a different product. Preserve product identity and continuity.",
    SHARED_IMAGE_APPROVAL_RULES,
    "",
    "### 7. CALL TO ACTION",
    "Match the CTA to the content goal, confirmed posting platform, and selected Content Language. Never automatically add basket colors or Facebook cross-visit instructions. Completely remove any mention of Lazada. Never default to \\u201CYellow Basket\\u201D or \\u201COrange Basket\\u201D; use a neutral product-link CTA unless the creator explicitly confirms the exact destination wording."
  ].join("\\n");

  var PODCAST_RULES = [
    "### 1. GENERATOR BEFORE TIMING",
    "Before proposing production scene durations or writing full scripts/video prompts, ask which video generator the user will use. Ask separately in natural Taglish:",
    "\\u201CAnong app ang gagamitin mong pang-generate ng video?\\u201D",
    "Ask for the model or mode separately ONLY if essential and still unresolved.",
    "Use the answers already given. REMOVE universal 8s limits, mandatory four-scene structures, and unsupported claims. Verify supported clip duration and audio before proposing scene durations or full scripts (editing cut points differ from generation duration).",
    "",
    "### 2. CONVERSATION AND SIMPLE QUESTIONS",
    "- Assistant conversation language: ALWAYS converse with the user in natural Taglish unless the user explicitly requests another conversation language.",
    "- Technical prompts vs. content language: Write ALL copyable technical image/video prompts and main assistant instructions in clear English. Generate ALL NEW hooks, spoken dialogue (Exact Spoken Words), scripts, voice-over, on-screen text, subtitles, captions, first comments, and CTAs strictly in the selected Content Language (Taglish or English).",
    "- Preserve approved content: Keep previously approved dialogue, scripts, captions, first comments, and CTAs verbatim. A later language change must NEVER silently translate previously approved content; show proposed translations for explicit user approval when needed.",
    "- Ask only ONE short, clear Taglish question per reply. Use existing answers; never bundle audio, mode, reference limits, and approval into one message. Screenshots are optional; accept typed descriptions.",
    "",
    "### 3. CONDITIONAL AUDIO QUESTION",
    "Ask ONLY if unanswered and relevant to the setup:",
    "- Podcast: \\u201CKasama na bang i-generate ang boses ng hosts, o may sarili kang audio na gagamitin?\\u201D",
    "Adapt singular/plural naturally. Skip if the creator has their own audio or already answered. Verify tool support afterward.",
    "",
    "### 4. AUDIO INSIDE SCENE PROMPTS",
    "For supported built-in audio tools, place exact approved speech and voice directions inside each speaking host\\u2019s English prompt. Include lip-sync directions ONLY for visible speakers.",
    "Separate voice-over applies ONLY to an explicitly selected separate-audio workflow. Never automatically provide duplicate native-audio and separate-VO versions.",
    "",
    "### 5. APPROVAL AND DELIVERY",
    "Keep the creative stages: Podcast topic & host persona -> Discussion outline -> Scene breakdown with script, timing, and \\u201CExact Spoken Words\\u201D in the selected Content Language.",
    "Wait for explicit script approval before delivering production prompts.",
    "Deliver one copyable English block per scene. For any consolidated visual storyboard sheet, reference image, cover, or thumbnail included in the workflow, present the proposed visual details/plan first and get explicit generation permission before generating the image.",
    "",
    "### 6. STORYBOARD, IMAGE APPROVAL, AND CONTINUITY",
    "Maintain continuity of hosts, studio setup, microphones, background, and lighting across all scenes.",
    "Generate photorealistic scene previews for realistic podcasts (no drawings, cartoons, or sketches unless an animation style was chosen). Label: \\u201CAI-generated scene preview.\\u201D Use an honest text storyboard fallback if needed.",
    SHARED_IMAGE_APPROVAL_RULES,
    "",
    "### 7. CALL TO ACTION",
    "Provide an appropriate podcast CTA in the selected Content Language (e.g., subscribe, comment thoughts). Never add basket colors or Facebook cross-visit instructions. Completely remove any mention of Lazada."
  ].join("\\n");

  var FACTS_RULES = [
    "### 1. GENERATOR BEFORE TIMING",
    "Before proposing production scene durations or writing full scripts/video prompts, ask which video generator the user will use. Ask separately in natural Taglish:",
    "\\u201CAnong app ang gagamitin mong pang-generate ng video?\\u201D",
    "Ask for the model or mode separately ONLY if essential and still unresolved.",
    "Use the answers already given. No universal 8-second limit or forced four-scene structure. Calibrate timing to verified capabilities of the chosen tool (editing cut points differ from generation duration).",
    "",
    "### 2. CONVERSATION AND SIMPLE QUESTIONS",
    "- Assistant conversation language: ALWAYS converse with the user in natural Taglish unless the user explicitly requests another conversation language.",
    "- Technical prompts vs. content language: Write ALL copyable technical image/video prompts and main assistant instructions in clear English. Generate ALL NEW hooks, spoken dialogue (Exact Spoken Words), scripts, voice-over, on-screen text, subtitles, captions, first comments, and CTAs strictly in the selected Content Language (Taglish or English).",
    "- Preserve approved content: Keep previously approved dialogue, scripts, captions, first comments, and CTAs verbatim. A later language change must NEVER silently translate previously approved content; show proposed translations for explicit user approval when needed.",
    "- Ask only ONE short, clear Taglish question per reply. Never bundle multiple unrelated questions. Screenshots are optional; accept typed descriptions.",
    "",
    "### 3. CONDITIONAL AUDIO QUESTION",
    "Ask ONLY if unanswered and relevant to the format:",
    "- Facts: \\u201CMay kasamang AI narration ba, o text at background music lang?\\u201D",
    "Skip if a silent/text-only video was chosen. Verify tool support afterward.",
    "",
    "### 4. AUDIO INSIDE SCENE PROMPTS",
    "For built-in audio, include the exact approved speech/narration and voice directions inside each scene\\u2019s English prompt. Include lip-sync directions ONLY for visible speakers.",
    "Separate voice-over applies ONLY to an explicitly selected separate-audio workflow. Never automatically provide duplicate native-audio and separate-VO versions.",
    "",
    "### 5. APPROVAL AND DELIVERY",
    "Fact topic/hook outline -> Scene breakdown -> Script with timing and \\u201CExact Spoken Words\\u201D in the selected Content Language -> Wait for explicit approval before delivering production prompts.",
    "Deliver one copyable English block per scene. For any consolidated visual storyboard sheet, reference image, cover, or thumbnail included in the workflow, present the proposed visual details/plan first and get explicit generation permission before generating the image.",
    "",
    "### 6. STORYBOARD, IMAGE APPROVAL, AND CONTINUITY",
    "Keep English visual prompts aligned with the topic and verified fact evidence. Use photorealistic previews (unless an animated style was chosen), labeled \\u201CAI-generated scene preview.\\u201D Use an honest text storyboard fallback if needed.",
    SHARED_IMAGE_APPROVAL_RULES,
    "",
    "### 7. CALL TO ACTION",
    "Use an engaging facts CTA in the selected Content Language (e.g., share thoughts, follow for more daily facts). Never automatically add basket colors or Facebook cross-visit instructions. Completely remove any mention of Lazada."
  ].join("\\n");

  function buildWorkspaceHeader(chosenApp, chosenLang) {
    var app = (chosenApp === "Gemini") ? "Gemini" : "ChatGPT";
    var isEnglish = /^english$/i.test(String(chosenLang || "").trim());
    var shortLang = isEnglish ? "English" : "Taglish";
    var langLabel = isEnglish
      ? "English (clear, natural English)"
      : "Taglish (natural conversational Tagalog-English)";
    return [
      "### SELECTED WORKSPACE SETTINGS",
      "- Target AI Chat App: " + app,
      "- Content Language (Wika ng content): " + langLabel,
      "- Content Language Scope: Generate ALL NEW hooks, spoken dialogue (Exact Spoken Words), scripts, voice-over, on-screen text, subtitles, captions, first comments, and CTAs strictly in " + shortLang + ".",
      "- Technical Prompt & Main Instruction Language: Write ALL copyable technical image/video prompts and main assistant instructions in clear English.",
      "- Assistant Conversation Language: Converse with the user in natural Taglish unless the user explicitly requests another conversation language.",
      "- Approved Content Preservation: Preserve already-approved dialogue, scripts, captions, first comments, and CTAs verbatim. A later content-language change must NEVER silently translate previously approved content; show proposed translations for explicit user approval when needed."
    ].join("\\n");
  }

  // State initialization for global & Drama controls (including migrating legacy Tagalog -> Taglish)
  if (typeof window !== "undefined") {
    try {
      var savedGlobalApp = localStorage.getItem("lirva:global_app");
      var savedGlobalLang = localStorage.getItem("lirva:global_lang");
      if (!window.__lirvaSelectedApp && (savedGlobalApp === "ChatGPT" || savedGlobalApp === "Gemini")) {
        window.__lirvaSelectedApp = savedGlobalApp;
      }
      var resolvedSavedLang = "";
      if (savedGlobalLang) {
        var trimmedLang = String(savedGlobalLang).trim();
        if (/^english$/i.test(trimmedLang)) {
          resolvedSavedLang = "English";
        } else if (/tagalog|taglish/i.test(trimmedLang)) {
          resolvedSavedLang = "Taglish";
          if (savedGlobalLang !== "Taglish") {
            try { localStorage.setItem("lirva:global_lang", "Taglish"); } catch (_) {}
          }
        }
      }
      if (!window.__lirvaSelectedContentLang && resolvedSavedLang) {
        window.__lirvaSelectedContentLang = resolvedSavedLang;
        window.__lirvaSelectedDialogueLang = resolvedSavedLang;
      } else if (window.__lirvaSelectedDialogueLang && !window.__lirvaSelectedContentLang) {
        var normExisting = /^english$/i.test(String(window.__lirvaSelectedDialogueLang).trim()) ? "English" : "Taglish";
        window.__lirvaSelectedContentLang = normExisting;
        window.__lirvaSelectedDialogueLang = normExisting;
      }
      var savedBot1Device = localStorage.getItem("lirva:bot1_device_mode");
      if (!window.__lirvaBot1DeviceMode) {
        window.__lirvaBot1DeviceMode = (savedBot1Device === "computer") ? "computer" : "phone";
      }
      window.__dramaSelectedStyle = window.__dramaSelectedStyle || (localStorage.getItem("lirva:drama_style") || "Realistic / Live-action");
      window.__dramaStoryMode = window.__dramaStoryMode || (localStorage.getItem("lirva:drama_mode") || "new");
      window.__dramaHandoffText = window.__dramaHandoffText !== undefined ? window.__dramaHandoffText : (localStorage.getItem("lirva:drama_handoff") || "");
      window.__dramaSelectedTheme = window.__dramaSelectedTheme || "";
    } catch (_) {
      window.__lirvaBot1DeviceMode = window.__lirvaBot1DeviceMode || "phone";
      window.__dramaSelectedStyle = window.__dramaSelectedStyle || "Realistic / Live-action";
      window.__dramaStoryMode = window.__dramaStoryMode || "new";
      window.__dramaHandoffText = window.__dramaHandoffText || "";
      window.__dramaSelectedTheme = window.__dramaSelectedTheme || "";
    }
  }

  function getDramaFieldMeta(el) {
    if (!el) return "";
    var parts = [];
    if (el.id) parts.push(el.id);
    if (el.name) parts.push(el.name);
    if (el.placeholder) parts.push(el.placeholder);
    if (el.getAttribute) {
      parts.push(el.getAttribute("aria-label") || "");
      parts.push(el.getAttribute("data-field") || "");
      parts.push(el.getAttribute("data-label") || "");
    }
    if (el.id && typeof document !== "undefined" && document.getElementsByTagName) {
      try {
        var allLabels = document.getElementsByTagName("label");
        for (var li = 0; li < allLabels.length; li++) {
          if (allLabels[li].htmlFor === el.id && allLabels[li].textContent) {
            parts.push(allLabels[li].textContent);
            break;
          }
        }
      } catch (_) {}
    }
    var wrap = el.closest ? el.closest(".field, .form-group, .row, label, div") : el.parentElement;
    if (wrap) {
      var wrapLbl = wrap.querySelector ? wrap.querySelector("label, .label, .field-label, legend") : null;
      if (wrapLbl && wrapLbl.textContent) parts.push(wrapLbl.textContent);
    }
    if (el.previousElementSibling && el.previousElementSibling.textContent) {
      parts.push(el.previousElementSibling.textContent);
    }
    return parts.join(" ").toLowerCase();
  }

  function getDramaControlValue(el) {
    if (!el) return "";
    if (el.tagName === "SELECT") {
      var opt = el.options && el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null;
      var val = (opt && opt.textContent ? opt.textContent : el.value || "").trim();
      return val;
    }
    return (el.value || "").trim();
  }

  function extractFieldFromText(text, regexList) {
    if (!text) return "";
    for (var i = 0; i < regexList.length; i++) {
      var m = text.match(regexList[i]);
      if (m && m[1]) {
        var v = m[1].trim().replace(/^[:\\u2014\\u2013-]+\\s*/, "").trim();
        if (v && v.length < 180) return v;
      }
    }
    return "";
  }

  function isVisibleElement(node) {
    var cur = node;
    var depth = 0;
    while (cur && cur !== document.body && cur.tagName !== "HTML" && depth < 12) {
      if (cur.hidden || (cur.style && cur.style.display === "none") || (cur.getAttribute && cur.getAttribute("aria-hidden") === "true")) {
        return false;
      }
      if (typeof getComputedStyle === "function") {
        try {
          var cs = getComputedStyle(cur);
          if (cs && (cs.display === "none" || cs.visibility === "hidden")) return false;
        } catch (_) {}
      }
      cur = cur.parentElement;
      depth++;
    }
    return true;
  }

  function isElementInVisibleDramaPanel(el) {
    if (!el || !isVisibleElement(el)) return false;
    var p = el;
    var steps = 0;
    while (p && p !== document.body && p.tagName !== "MAIN" && steps < 8) {
      var idCls = ((p.id || "") + " " + (p.className || "")).toLowerCase();
      if (idCls.includes("drama")) return true;
      if (p.querySelector) {
        var found = p.querySelector("#lirva-drama-style-section") || p.querySelector("#lirva-drama-story-mode-section");
        if (found && isVisibleElement(found)) return true;
      }
      p = p.parentElement;
      steps++;
    }
    var styleSec = typeof document !== "undefined" ? document.getElementById("lirva-drama-style-section") : null;
    if (styleSec && isVisibleElement(styleSec)) {
      var elRoot = el.closest ? el.closest("section, .panel, .tab-panel, [data-category]") : null;
      var styleRoot = styleSec.closest ? styleSec.closest("section, .panel, .tab-panel, [data-category]") : null;
      if (!elRoot || !styleRoot || elRoot === styleRoot) return true;
    }
    return false;
  }

  function formatContentLanguageLabel(rawLang) {
    var s = String(rawLang || "").trim();
    if (!s || /\\b(?:taglish|tagalog)\\b/i.test(s)) {
      return "Taglish (natural conversational Tagalog-English)";
    }
    if (/^english$/i.test(s)) {
      return "English (clear, natural English)";
    }
    return s;
  }

  function extractDramaFormSelections(baseText, targetEl) {
    var style = (typeof window !== "undefined" && window.__dramaSelectedStyle) || "Realistic / Live-action";
    var mode = (typeof window !== "undefined" && window.__dramaStoryMode) || "new";
    var handoff = (typeof window !== "undefined" && window.__dramaHandoffText) || "";
    var theme = (typeof window !== "undefined" && window.__dramaSelectedTheme) ? String(window.__dramaSelectedTheme).trim() : "";
    var app = (typeof window !== "undefined" && window.__lirvaSelectedApp) || "ChatGPT";
    var globalLang = (typeof window !== "undefined" && (window.__lirvaSelectedContentLang || window.__lirvaSelectedDialogueLang)) ? String(window.__lirvaSelectedContentLang || window.__lirvaSelectedDialogueLang).trim() : "";
    var language = "";
    var episodeCount = "";
    var episodeLength = "";

    var scopeRoot = null;
    if (targetEl && targetEl.closest) {
      scopeRoot = targetEl.closest("[data-category], section, .panel, .tab-panel, main") || document;
    } else if (typeof document !== "undefined") {
      scopeRoot = document;
    }

    var dramaScope = null;
    if (typeof document !== "undefined") {
      var handoffEl = document.getElementById("lirva-drama-handoff-input");
      if (handoffEl && !handoff && handoffEl.value) {
        handoff = handoffEl.value;
      }
      var storySec = document.getElementById("lirva-drama-story-mode-section");
      if (storySec && storySec.parentElement) {
        dramaScope = storySec.parentElement;
      } else if (handoffEl) {
        dramaScope = handoffEl.closest("form, .form, .panel, .tab-panel, section") || handoffEl.parentElement;
      }
      if (!dramaScope && scopeRoot && scopeRoot.querySelectorAll) {
        dramaScope = scopeRoot;
      }
    }

    if (dramaScope && dramaScope.querySelectorAll) {
      var controls = dramaScope.querySelectorAll("input, select, textarea");
      for (var i = 0; i < controls.length; i++) {
        var ctrl = controls[i];
        if (ctrl.id === "lirva-drama-handoff-input") continue;
        if (ctrl.type === "hidden" || ctrl.type === "submit" || ctrl.type === "button") continue;
        if ((ctrl.type === "radio" || ctrl.type === "checkbox") && !ctrl.checked) continue;
        var meta = getDramaFieldMeta(ctrl);
        var val = getDramaControlValue(ctrl);
        if ((ctrl.type === "radio" || ctrl.type === "checkbox") && (!val || val === "on")) {
          var rWrap = ctrl.closest ? ctrl.closest("label") : null;
          if (rWrap && rWrap.textContent) val = rWrap.textContent.trim();
        }
        if (!val) continue;
        if (!theme && (meta.includes("tema") || meta.includes("theme") || meta.includes("trope") || meta.includes("konsepto") || meta.includes("genre") || meta.includes("paksa"))) {
          theme = val;
        } else if (!language && (meta.includes("language") || meta.includes("wika") || meta.includes("dialogue") || meta.includes("salita") || meta.includes("lengguwahe"))) {
          language = val;
        } else if (!episodeCount && (meta.includes("episode count") || meta.includes("bilang ng episode") || meta.includes("episodes") || meta.includes("ilang episode") || (meta.includes("episode") && !meta.includes("length") && !meta.includes("haba") && !meta.includes("duration")))) {
          episodeCount = val;
        } else if (!episodeLength && (meta.includes("length") || meta.includes("haba") || meta.includes("duration") || meta.includes("tagal") || meta.includes("runtime"))) {
          episodeLength = val;
        }
      }

      // Check active chip/pill buttons inside dramaScope if any fields are still empty
      var activeChips = dramaScope.querySelectorAll('[aria-pressed="true"], [aria-checked="true"], button.active, button.selected, button.on, .chip.active, .chip.selected, .chip.on, .pill.active, .pill.selected, .pill.on');
      for (var j = 0; j < activeChips.length; j++) {
        var chip = activeChips[j];
        if (chip.closest && (chip.closest("#lirva-drama-style-section") || chip.closest("#lirva-drama-story-mode-section") || chip.closest("[data-lirva-global-option='true']"))) continue;
        var cText = (chip.textContent || "").trim();
        if (!cText) continue;
        var grp = chip.closest ? chip.closest(".field, .form-group, .row, fieldset, section, div") : chip.parentElement;
        var grpMeta = "";
        if (grp) {
          var gLbl = grp.querySelector ? grp.querySelector("label, .label, .field-label, legend, h4, h5") : null;
          grpMeta = ((gLbl && gLbl.textContent ? gLbl.textContent : "") + " " + (grp.id || "") + " " + (grp.className || "")).toLowerCase();
        }
        if (!theme && (grpMeta.includes("tema") || grpMeta.includes("theme") || grpMeta.includes("trope") || grpMeta.includes("genre"))) {
          theme = cText;
        } else if (!language && (grpMeta.includes("language") || grpMeta.includes("wika") || grpMeta.includes("dialogue"))) {
          language = cText;
        } else if (!episodeCount && (grpMeta.includes("episode") && !grpMeta.includes("length") && !grpMeta.includes("haba") && !grpMeta.includes("duration"))) {
          episodeCount = cText;
        } else if (!episodeLength && (grpMeta.includes("length") || grpMeta.includes("haba") || grpMeta.includes("duration") || grpMeta.includes("tagal"))) {
          episodeLength = cText;
        }
      }
    }

    // Authoritative global content language overrides local Taglish/Tagalog/English defaults
    if (globalLang && (!language || /\\b(?:taglish|tagalog|english)\\b/i.test(language))) {
      language = globalLang;
    }

    // Fallback to topbar/global language selector if language is still empty
    if (!language && typeof document !== "undefined" && document.querySelectorAll) {
      var globalSelects = document.querySelectorAll("select");
      for (var gs = 0; gs < globalSelects.length; gs++) {
        var gSel = globalSelects[gs];
        var gMeta = getDramaFieldMeta(gSel);
        var gVal = getDramaControlValue(gSel);
        if (gVal && (gMeta.includes("language") || gMeta.includes("wika") || /^(?:taglish|tagalog|english|cebuano|bisaya)$/i.test(gVal))) {
          language = gVal;
          break;
        }
      }
    }

    // Fallback extraction from baseText (after old STATUS block has been stripped)
    if (!theme) {
      theme = extractFieldFromText(baseText, [
        /(?:Tema\\s+ng\\s+[Kk]uwento|Story\\s+Theme|Theme|Tema|Trope)\\s*(?:\\([^)]*\\))?\\s*[:\\u2014\\u2013-]\\s*([^\\n]+)/i
      ]);
    }
    if (!language) {
      language = extractFieldFromText(baseText, [
        /(?:Content\\s+Language|Dialogue\\s*(?:\\/\\s*Content\\s*)?Language|Wika\\s+ng\\s+(?:Content|Dialogue)|Wika|Language)\\s*(?:\\([^)]*\\))?\\s*[:\\u2014\\u2013-]\\s*([^\\n]+)/i
      ]);
    }
    if (!episodeCount) {
      episodeCount = extractFieldFromText(baseText, [
        /(?:Bilang\\s+ng\\s+Episodes?|Episode\\s+Count|Number\\s+of\\s+Episodes|Episodes)\\s*(?:\\([^)]*\\))?\\s*[:\\u2014\\u2013-]\\s*([^\\n]+)/i
      ]);
    }
    if (!episodeLength) {
      episodeLength = extractFieldFromText(baseText, [
        /(?:Target\\s+Episode\\s+Length|Target\\s+Length|Episode\\s+Length|Duration|Haba\\s+ng\\s+Episode|Haba)\\s*(?:\\([^)]*\\))?\\s*[:\\u2014\\u2013-]\\s*([^\\n]+)/i
      ]);
    }

    return {
      app: app,
      style: style,
      mode: mode,
      handoff: (handoff || "").trim(),
      theme: theme || "Not specified yet (use context above or ask briefly in Taglish)",
      language: formatContentLanguageLabel(language || globalLang || "Taglish"),
      episodeCount: episodeCount || "Not specified yet (use episode count given above or ask briefly in Taglish)",
      episodeLength: episodeLength || "Not specified yet (use target length given above or ask briefly in Taglish)"
    };
  }

  function getDramaRules(styleOrSel, storyMode, handoff) {
    var defApp = (typeof window !== "undefined" && window.__lirvaSelectedApp) || "ChatGPT";
    var defLang = formatContentLanguageLabel((typeof window !== "undefined" && (window.__lirvaSelectedContentLang || window.__lirvaSelectedDialogueLang)) || "Taglish");
    var sel = (styleOrSel && typeof styleOrSel === "object")
      ? styleOrSel
      : {
          app: defApp,
          style: styleOrSel || (typeof window !== "undefined" && window.__dramaSelectedStyle) || "Realistic / Live-action",
          mode: storyMode || (typeof window !== "undefined" && window.__dramaStoryMode) || "new",
          handoff: (handoff !== undefined ? handoff : ((typeof window !== "undefined" && window.__dramaHandoffText) || "")).trim(),
          theme: "Not specified yet (use context above or ask briefly in Taglish)",
          language: defLang,
          episodeCount: "Not specified yet (use episode count given above or ask briefly in Taglish)",
          episodeLength: "Not specified yet (use target length given above or ask briefly in Taglish)"
        };

    var chosenApp = sel.app || defApp;
    var chosenStyle = sel.style || "Realistic / Live-action";
    var mode = sel.mode || "new";
    var handoffText = (sel.handoff || "").trim();
    var chosenTheme = sel.theme || "Not specified yet (use context above or ask briefly in Taglish)";
    var chosenLang = sel.language || defLang;
    var chosenEpCount = sel.episodeCount || "Not specified yet (use episode count given above or ask briefly in Taglish)";
    var chosenEpLength = sel.episodeLength || "Not specified yet (use target length given above or ask briefly in Taglish)";

    var styleDesc = {
      "Realistic / Live-action": "Photorealistic live-action cinema featuring real-looking actors and real environments (no drawings, cartoons, sketches, or comic panels).",
      "3D Animation": "3D animated characters and environments with volumetric depth, sculpted textures, and stylized 3D lighting (DO NOT inject live-action or photorealistic camera constraints).",
      "2D Cartoon": "2D cartoon illustration featuring clean bold outlines, flat/cel colors, and illustrated backgrounds (DO NOT inject live-action or photorealistic camera constraints).",
      "Anime": "Anime visual style featuring expressive anime facial design, stylized hair/eyes, and anime-painted backgrounds (DO NOT inject live-action or photorealistic camera constraints)."
    }[chosenStyle] || (chosenStyle + " visual style (maintain consistently across every visual deliverable; never switch styles)");

    var styleConsistencyRule = chosenStyle === "Realistic / Live-action"
      ? "- Realistic / Live-action: Use photorealistic live-action photography and cinematography instructions; strictly prohibit drawings, cartoons, sketches, or comic panels."
      : "- " + chosenStyle + ": Strictly enforce the " + chosenStyle + " visual aesthetic across the Character Reference Sheet, Place Reference Sheet, scene prompts, Visual Storyboard, and vertical 9:16 Episode Cover. NEVER include photorealistic, real-human skin, or live-action camera constraints that would conflict with " + chosenStyle + ".";

    var rules = [
      "### PROJECT STATUS AND SELECTED OPTIONS",
      "- Target AI Chat App: " + chosenApp,
      "- Visual Style: " + chosenStyle + " \\u2014 " + styleDesc,
      "- Story Mode: " + (mode === "continue" ? "Continue existing story (Ituloy ang dati)" : "New story (Bagong kuwento)"),
      "- Story Theme: " + chosenTheme,
      "- Content Language (Wika ng content): " + chosenLang,
      "- Episode Count: " + chosenEpCount,
      "- Target Episode Length: " + chosenEpLength,
      (mode === "continue" && handoffText ? "- Previous Episode Handoff / Summary:\\n\\\"\\\"\\\"\\n" + handoffText + "\\n\\\"\\\"\\\"" : ""),
      "Apply ALL selected options above consistently from start to finish. Do not re-ask selections already provided unless something is missing or needs clarification.",
      "Note: These instructions guide the external AI assistant where the user pastes this prompt; the prompt-builder website itself does not generate images or videos.",
      "",
      "### 1. CONVERSATION, LANGUAGE, AND VIDEO GENERATOR SETUP",
      "- Conversation language and tone: Converse with the user in natural, conversational Taglish by default, or clear natural English if the user requests English conversation. Use everyday wording, short explanations, and ask only ONE short question at a time. Avoid robotic phrasing and unnecessary jargon.",
      "- Technical prompts vs. content language: Write ALL copyable assistant instructions and technical image/video prompts (reference sheet prompts, storyboard prompts, cover prompts, and A\\u2013L scene prompts) in clear English.",
      "- Generated dialogue and content: Write ALL NEW hooks, spoken dialogue (Exact Spoken Words), scripts, voice-over, on-screen text, subtitles, captions, first comments, and CTAs strictly in the selected Content Language (" + chosenLang + "). NEVER translate approved dialogue merely because technical prompts are in English.",
      "- Preserve approved content verbatim: Keep previously approved dialogue, scripts, captions, first comments, and CTAs unchanged. A later content-language change must NEVER silently translate previously approved content; present proposed translations for explicit approval when needed.",
      "- Confirm essential video generator settings (never hardcode a tool, model, or duration): Always use the user-confirmed video app/model, aspect ratio, supported generation mode, and clip duration. NEVER hardcode Omni, Google Flow, or an arbitrary clip length such as eight seconds for all users. If essential generator settings are unknown, ask ONE simple question in Taglish:",
      "  \\u201CAnong video generator app, model, at clip duration ang gagamitin mo para sa project na ito?\\u201D",
      "- Never assume supported clip durations, native audio support, reference-image slot limits, subscription tiers, or available credits.",
      "",
      "### 2. SHARED IMAGE-APPROVAL AND TRUTH-IN-DELIVERY RULE",
      "Apply these strict rules to EVERY generated image in this workflow (Character Reference Sheet, Place Reference Sheet, Visual Storyboard, Episode Cover, thumbnails, or any other generated image):",
      "- Present proposed visual details or plan BEFORE generating any image, and ask ONE combined question: \\u201CApproved ba ito? I-generate ko na ba ang image?\\u201D",
      "- Wait for explicit generation permission before calling the image-generation capability.",
      "- \\u201CApproved, generate na\\u201D approves the visual details and authorizes ONE generation attempt. If the user answers yes to a clear \\u201CGenerate now?\\u201D question, proceed without asking again.",
      "- Approval of a script or written description alone does NOT automatically authorize generating an image unless that generation permission was explicitly included in the question.",
      "- When an approved step has explicit generation permission, invoke the available image-generation capability to produce the actual image.",
      "- After delivering the actual image, PAUSE for visual review.",
      "- Ask before revisions, regeneration, or retries. A direct user request such as \\u201CRegenerate with these changes\\u201D already authorizes that attempt.",
      "- Keep text approval, permission to generate, actual image delivery, and visual approval as strictly separate statuses.",
      "- A heading, text description, English image prompt, or phrase like \\u201CHere is the image\\u201D NEVER counts as image delivery. Text-only descriptions NEVER count as a completed visual sheet or delivered image.",
      "- Mark \\u201CImage generated \\u2014 awaiting visual approval\\u201D ONLY after an actual generated image has been returned to the conversation.",
      "- If image delivery cannot be confirmed, mark the status \\u201CPending \\u2014 image delivery unconfirmed\\u201D and ask in Taglish whether the image appeared BEFORE requesting visual approval.",
      "- If no image was produced or image generation is unavailable, mark the status \\u201CPending \\u2014 image not generated\\u201D and explain the limitation briefly.",
      "- NEVER invent or fabricate a successful tool call, image attachment, or delivery result.",
      "",
      "### 3. REQUIRED WORKFLOW AND APPROVAL TRIGGERS",
      (mode === "continue" ?
        "Selected Story Mode: Continue existing story (Ituloy ang dati).\\n" +
        "- Carry forward all previously approved continuity details: character identities and written descriptions, place descriptions, visual style (" + chosenStyle + "), voice profiles, wardrobe, accessory changes, prop ownership/states, final scene situation, unresolved conflicts, and approved next-episode direction.\\n" +
        "- Ask ONLY for missing details needed to continue cleanly. Do NOT restart story concepts from scratch or regenerate existing approved reference sheets unless the user requests changes or introduces new characters/locations.\\n" +
        "- Never pretend to remember an un-pasted prior chat session. Explain clearly in Taglish that copying prompt text does NOT transfer images, so approved reference sheets must be re-attached in this chat.\\n" +
        (handoffText ? "- Use the Previous Episode Handoff provided above and confirm reference sheet attachments before moving through Episode Outline & Cliffhanger Choice -> Script & Scene Plan -> Visual Storyboard Plan & Generation Permission -> Actual Visual Storyboard (approve before scene prompts) -> Final Scene Prompts (A\\u2013L) -> Ask Permission Before Episode Cover -> Actual Episode Cover -> Editing Guide -> Captions -> First Comment -> Posting Checklist & Continuity Handoff." : "- If handoff details are missing, ask in Taglish: \\u201CI-paste mo muna ang episode handoff o buod ng huling episode (at i-attach ang reference images kung mayroon) para maituloy natin.\\u201D")
        :
        "Selected Story Mode: New story (Bagong kuwento).\\n" +
        "Follow this exact approval sequence without skipping steps or chaining visuals:\\n" +
        "1) Concept: Propose story concepts matching Story Theme (" + chosenTheme + "), Episode Count (" + chosenEpCount + "), and Target Episode Length (" + chosenEpLength + "), then ask in Taglish: \\u201CMay nagustuhan ka ba sa mga concept, o gusto mo pang makakita ng ibang ideas?\\u201D (Say \\u201CTema ng kuwento\\u201D instead of \\u201CTrope\\u201D in Taglish.) Wait for selection and approval.\\n" +
        "2) Character Descriptions & Character Reference Sheet Plan: Present proposed character descriptions (appearance, wardrobe, voice profile) and the Character Reference Sheet visual plan in " + chosenStyle + " style. Ask: \\u201CApproved ba ito? I-generate ko na ba ang image?\\u201D\\n" +
        "   - If the user approves only the written text without generation permission, mark text approved and ask generation permission before generating. If the user replies \\u201CApproved, generate na\\u201D (or yes to a clear \\u201CGenerate now?\\u201D question), make ONE attempt to generate the actual Character Reference Sheet image (with labeled panels and complete written details below it), then PAUSE for visual review.\\n" +
        "3) Location Descriptions & Place Reference Sheet Plan: Present proposed main location descriptions and the Place Reference Sheet visual plan in " + chosenStyle + " style. Ask: \\u201CApproved ba ito? I-generate ko na ba ang image?\\u201D Wait for explicit generation permission, make ONE attempt to generate the actual Place Reference Sheet image (with labeled panels and written location details below it), then PAUSE for visual review.\\n" +
        "4) Episode Outline & 3 Cliffhanger Choices: Provide the episode outline and 3 distinct cliffhanger options consistent with established facts. Ask in Taglish: \\u201CAling ending ang gusto mo\\u20141, 2, o 3?\\u201D and WAIT for choice and approval.\\n" +
        "5) Script & Scene Plan: Present the complete episode script and scene plan with editing timeline timestamps, speakers, hooks, voice-over, on-screen text/subtitles, and Exact Spoken Words in " + chosenLang + " (preserving approved lines verbatim). Wait for script approval (script approval alone does NOT authorize generating the Visual Storyboard image unless permission was included in the question).\\n" +
        "6) Visual Storyboard Plan & Generation Permission: Present the proposed Visual Storyboard layout/scene plan and ask: \\u201CApproved ba ito? I-generate ko na ba ang image?\\u201D Wait for explicit permission (or \\u201CApproved, generate na\\u201D), make ONE attempt to generate the actual Visual Storyboard image, then PAUSE for visual review and approval BEFORE delivering final scene prompts.\\n" +
        "7) Final Scene Prompts (A\\u2013L): Deliver ALL approved scene-by-scene English video prompts together ONLY after the Visual Storyboard is approved (and update any affected scenes if the storyboard changed).\\n" +
        "8) Ask Before Cover & Actual Episode Cover: Ask the cover permission question below, present proposed cover visual details/plan and ask \\u201CApproved ba ito? I-generate ko na ba ang image?\\u201D (or proceed directly with ONE vertical 9:16 attempt if the user already answered yes to a clear \\u201CGenerate now?\\u201D cover proposal), deliver the actual image, and PAUSE for visual review.\\n" +
        "9) Continue one step at a time: Editing Guide -> Captions (3 Options) -> First Comments (3 Options) -> Posting Checklist & Continuity Handoff."
      ),
      "- Per-visual rule: Generate ONE visual deliverable per reply, then pause for review. If the user explicitly chooses to proceed without generating a pending visual, keep its status pending (\\u201CPending \\u2014 image not generated\\u201D or \\u201CPending \\u2014 image delivery unconfirmed\\u201D) and continue strictly within that explicit choice.",
      "- Strict Cover Gate (apply in all story modes): Approval of the script or Visual Storyboard NEVER authorizes generating the Episode Cover. Immediately after delivering all scene-by-scene prompts, STOP and ask (adapting the bracketed tool name to the user-confirmed app and model, or using natural English if requested):\\n  \\u201CTapos na ang scene-by-scene prompts mo, ready nang i-paste sa [confirmed app and model]. Isunod na ba natin ang episode cover mo?\\u201D\\n  Wait for an explicit yes before generating, and ensure visual details + generation permission are confirmed before attempting ONE vertical 9:16 Episode Cover matching approved characters, outfits, location, " + chosenStyle + ", readable title/hook text, and safe margins (no future spoilers), then pause for review.",
      "- Use clean headings \\u201CCharacter Reference Sheet\\u201D and \\u201CPlace Reference Sheet\\u201D (never append the video generator app name).",
      "",
      "### 4. IMAGE FAILURE, INTERRUPTION, AND USAGE CONTROL",
      "- No automatic retries on failed or interrupted image generation.",
      "- No repeated headings, titles, tool-call attempts, or written descriptions in place of an actual image.",
      "- No automatic chain combining storyboard generation with episode cover generation.",
      "- Ask before revisions, regeneration, or retries (a direct user request such as \\u201CRegenerate with these changes\\u201D already authorizes that attempt). Never regenerate an existing visual without request.",
      "- On failure or interruption, state the accurate pending/failed status, do NOT guess or assume why it failed or how much usage/credits it consumed, and offer ONE simple choice: retry later or receive a copyable English image prompt + attachment list to use in another tool. Wait for the user\\u2019s decision.",
      "- If a usage limit is explicitly reported, provide a compact Resume Handoff listing completed outputs, approved references, pending items, and the exact next step without restarting approved story work.",
      "",
      "### 5. VISUAL STORYBOARD BEFORE FINAL SCENE PROMPTS",
      "Selected Visual Style: " + chosenStyle + ".",
      styleConsistencyRule,
      "After script approval AND explicit Visual Storyboard generation permission:",
      "- Attempt to generate the actual Visual Storyboard image FIRST \\u2014 NOT a text-only prompt or heading.",
      "- Base every panel strictly on the approved script, Character Reference Sheet, and Place Reference Sheet.",
      "- Layout: show ONE numbered panel per approved scene arranged cleanly in 2 columns (add extra numbered sheets only when needed so every panel stays readable).",
      "- Include editing timeline timestamps (e.g., Scene 1 | [start]\\u2013[end]) and an \\u201CAI-generated scene preview\\u201D label.",
      "- Include a separate readable Text Legend below the image listing each scene number, editing timestamp, speaker, and exact approved dialogue verbatim in " + chosenLang + ".",
      "- Continuity updates: NEVER invent actions, props, plot events, or dialogue. Preserve approved faces, outfits, accessories, locations, and prop states. If the user explicitly approves a visual change that differs from an earlier written description, update the written continuity record to match.",
      "- Review gate: PAUSE and obtain explicit Visual Storyboard approval BEFORE delivering final scene prompts. Never use sample storyboard images as story, character, or style sources (layout reference only).",
      "",
      "### 6. SELF-CONTAINED A\\u2013L SCENE VIDEO PROMPTS (AFTER STORYBOARD APPROVAL)",
      "Deliver ALL approved scene prompts together in one reply after storyboard approval \\u2014 one separate, self-contained, copy-ready English block per scene. Repeat all relevant approved character, wardrobe, accessory, place, voice, and prop details inside every block; NEVER use \\u201Csame as above,\\u201D \\u201Csame as Scene 1,\\u201D or un-attached chat memory.",
      "Above EVERY copy-ready scene block, always include an explicit attachment line:",
      "- I-attach: [exact approved Character Reference Sheet, Place Reference Sheet, and approved previous end frame when supported and helpful; stay within the confirmed generator\\u2019s reference-image slot limits].",
      "Inside EVERY English scene prompt block, include Sections A through L explicitly:",
      "- A. GENERATION SETUP (user-confirmed app/model, aspect ratio, supported generation mode, confirmed clip duration, and brief natural reaction end hold \\u2014 ask if any essential setting is unknown)",
      "- B. VISUAL STYLE LOCK (" + chosenStyle + " rules only; realistic human skin tones, pores, and live-action camera language must NEVER leak into 3D Animation, 2D Cartoon, or Anime styles)",
      "- C. CHARACTER IDENTITY LOCK (full approved face, age, skin/surface detail matching " + chosenStyle + ", hair, build, and distinctive features)",
      "- D. WARDROBE AND ACCESSORY LOCK (exact approved outfit, colors, footwear, jewelry, and explicitly approved accessory changes)",
      "- E. PLACE LOCK (setting layout, furniture/object arrangement, camera side, lighting, atmosphere)",
      "- F. PROP LOCK (each important prop\\u2019s owner, hand, position, and exact start/end state; preserve continuity of identity/owner/hand/state while allowing natural movement as the owner moves; carry state changes forward such as wet clothes remaining wet, opened items staying open, and transferred props staying with the new owner; do not hardcode any sample character, story, location, or accessory)",
      "- G. VOICE AND SPEAKER LOCK (for 2+ characters in frame, map each name to distinguishing appearance, screen position, and consistent voice; specify exact speaker order, practical speaking windows, and brief pauses; ONLY the assigned speaker articulates each line while others listen/react silently without speech-like mouth movement; for a single-speaker scene, name the sole speaker and list all silent characters; keep background voices silent during diagnostic speaker tests; NEVER silently split a requested multi-speaker test into separate single-speaker clips without explaining timing concerns and asking first; state honestly that locks guide generation and do not guarantee every future generation or perfect voice/lip-sync accuracy)",
      "- H. CONTINUITY LOCK (carry-over pose, gaze direction, screen position, clothing/prop state, and natural ending handoff state without mirrored geography or reset props)",
      "- I. SHOT AND ACTION (manageable actions and one simple camera move suited to confirmed duration; avoid packing a complicated entrance, multiple gestures, focus shifts, camera moves, and several speaking turns unless duration supports them; favor framing where relevant faces and mouths stay clearly visible during speaker tests; allow ordinary stillness and end with a brief natural reaction such as breathing, blinking, or a small expression change \\u2014 not a frozen frame)",
      "- J. EXACT SPOKEN WORDS (verbatim approved lines in " + chosenLang + " plus any approved VO/on-screen text; fit complete sentences naturally inside the confirmed clip duration with pauses and a brief moving reaction; distinguish generated clip duration from editing timeline timestamps; NEVER force speech into an arbitrary rushed window or silently rewrite approved lines \\u2014 propose a shorter line or revised clip plan for approval when needed; native speech only when supported and never duplicated with separate VO)",
      "- K. SOUND DESIGN (support dialogue cleanly with restrained ambience and fitting effects, no competing intelligible background speech unless requested, and NEVER claim music tracks are licensed or publish-safe without verification)",
      "- L. RELEVANT EXCLUSIONS (no baked-in subtitles/watermarks, no swapped/duplicate/overlapping dialogue or extra words, no unintended lip-sync or narration, no mirrored geography, no leaked live-action terms in animated styles, no unauthorized prop/wardrobe resets)",
      "",
      "### 7. POST-COVER DELIVERABLES (ONE STEP AT A TIME)",
      "After the Episode Cover is approved, deliver these sequentially (waiting on each choice):",
      "1) Editing Guide: step-by-step clip order & editing timeline timestamps, trimming & natural reaction holds, transitions, native audio vs. VO placement, restrained music mood/SFX (without unverified licensing claims), safe-zone subtitles (" + chosenLang + " or approved text), continuity checks, and 9:16 export specs.",
      "2) Captions (3 Options): 3 new options in " + chosenLang + " (hook, 1 clear CTA, relevant hashtags, \\u201CAI-generated story\\u201D disclosure, no invented dates; preserve approved lines verbatim) -> ask \\u201CAling caption ang gusto mo\\u20141, 2, o 3?\\u201D and WAIT.",
      "3) First Comments (3 Options): 3 new options in " + chosenLang + " aligned with the episode -> ask \\u201CAling first comment ang gusto mo\\u20141, 2, o 3?\\u201D and WAIT.",
      "4) Posting Checklist & Continuity Handoff: final posting checklist plus compact copyable Continuity Handoff block (series title, visual style, episode summary, character/outfit/accessory/prop states, character knowledge, unresolved conflicts, approved next-episode direction, and reminder to re-attach reference images in a new chat).",
      "5) Next Episode Offer (only after checklist & handoff): ask whether to proceed to Episode [next number] and flag any still-pending visuals clearly.",
      "",
      "### 8. ACCURATE PRODUCTION TRACKER AND SUSUNOD FOOTER (END OF EVERY REPLY)",
      "End EVERY reply with a compact tracker that strictly separates text approval, permission to generate, actual image delivery, visual approval, video prompts delivered, actual video generation/testing, actual editing, and publishing:",
      "",
      "Episode [number] \\u2014 Production Tracker",
      "- Story Concepts: [Not started | Text delivered \\u2014 awaiting approval | Text approved]",
      "- Character Descriptions: [Not started | Text delivered \\u2014 awaiting approval | Text approved]",
      "- Character Reference Sheet: [Not started | Visual plan delivered \\u2014 awaiting permission to generate | Permission to generate granted | Image generated \\u2014 awaiting visual approval | Visual approved | Pending \\u2014 image delivery unconfirmed | Pending \\u2014 image not generated | Interrupted/failed \\u2014 pending user decision]",
      "- Location Descriptions: [Not started | Text delivered \\u2014 awaiting approval | Text approved]",
      "- Place Reference Sheet: [Not started | Visual plan delivered \\u2014 awaiting permission to generate | Permission to generate granted | Image generated \\u2014 awaiting visual approval | Visual approved | Pending \\u2014 image delivery unconfirmed | Pending \\u2014 image not generated | Interrupted/failed \\u2014 pending user decision]",
      "- Episode Outline & Cliffhanger Choice: [Not started | Text delivered \\u2014 awaiting approval | Text approved]",
      "- Script & Scene Plan: [Not started | Text delivered \\u2014 awaiting approval | Text approved]",
      "- Visual Storyboard: [Not started | Visual plan delivered \\u2014 awaiting permission to generate | Permission to generate granted | Image generated \\u2014 awaiting visual approval | Visual approved | Pending \\u2014 image delivery unconfirmed | Pending \\u2014 image not generated | Interrupted/failed \\u2014 pending user decision]",
      "- Scene-by-Scene Video Prompts (A\\u2013L): [Not started | Video prompts delivered]",
      "- Episode Cover (9:16): [Not started | Visual plan delivered \\u2014 awaiting permission to generate | Permission to generate granted | Image generated \\u2014 awaiting visual approval | Visual approved | Pending \\u2014 image delivery unconfirmed | Pending \\u2014 image not generated | Interrupted/failed \\u2014 pending user decision]",
      "- Editing Guide: [Not started | Text delivered]",
      "- Captions (3 Options): [Not started | Text delivered \\u2014 awaiting approval | Text approved]",
      "- First Comments (3 Options): [Not started | Text delivered \\u2014 awaiting approval | Text approved]",
      "- Posting Checklist & Continuity Handoff: [Not started | Text delivered]",
      "- Video Generation & Speaker Testing: [Not yet tested | User confirmed tested]",
      "- Actual Video Editing: [Not yet done | User confirmed done]",
      "- Publishing / Posting: [Not yet posted | User confirmed posted]",
      "",
      "STRICT TRACKER RULES:",
      "- Keep text approval, permission to generate, actual image delivery, and visual approval strictly separate; script or description approval alone does NOT grant permission to generate unless included in the question.",
      "- NEVER mark \\u201CImage generated \\u2014 awaiting visual approval\\u201D unless an actual generated image was returned to the chat.",
      "- NEVER mark a step as awaiting approval before actually delivering that text or image, and NEVER mark any deliverable approved without explicit user confirmation.",
      "- Track Story Concepts separately from Episode Outline & Cliffhanger Choice, and track Visual Storyboard separately from Episode Cover.",
      "- NEVER mark external video generation or speaker testing as passed merely because scene prompts were delivered.",
      "- After delivering Scene-by-Scene Video Prompts, always keep the remaining work visible so the user knows the package is not finished yet: Episode Cover -> Editing Guide -> Captions -> First Comment -> Posting Checklist & Continuity Handoff.",
      "Always finish every reply with ONE clearly visible action line:",
      "SUSUNOD: [specific single next action or short question for the user]"
    ];

    return rules.filter(function(l) { return l !== undefined && l !== ""; }).join("\\n");
  }

  function detectCategory(text, el) {
    if (isElementInVisibleDramaPanel(el)) return "drama";
    var check = (text + " " + (el ? (el.id + " " + el.className + " " + (el.dataset ? JSON.stringify(el.dataset) : "")) : "")).toLowerCase();
    if (check.includes("drama") || check.includes("kuwento") || check.includes("tauhan") || check.includes("tema ng kuwento") || check.includes("bahagi 1") || check.includes("project status and selected options") || check.includes("character reference sheet") || check.includes("place reference sheet") || check.includes("story theme")) return "drama";
    if (check.includes("podcast") || check.includes("host")) return "podcast";
    if (check.includes("fact") || check.includes("trivia") || check.includes("kaalaman")) return "facts";
    return "affiliate";
  }

  function getRules(cat, chosenApp, chosenLang) {
    if (cat === "drama") return getDramaRules();
    var app = chosenApp || (typeof window !== "undefined" && window.__lirvaSelectedApp) || "ChatGPT";
    var lang = chosenLang || (typeof window !== "undefined" && (window.__lirvaSelectedContentLang || window.__lirvaSelectedDialogueLang)) || "Taglish";
    var header = buildWorkspaceHeader(app, lang);
    if (cat === "podcast") return header + "\\n\\n" + PODCAST_RULES;
    if (cat === "facts") return header + "\\n\\n" + FACTS_RULES;
    return header + "\\n\\n" + AFFILIATE_RULES;
  }

  function syncBaseAppAndLanguage(baseText, chosenApp, chosenLang) {
    if (!baseText) return baseText;
    var app = chosenApp === "Gemini" ? "Gemini" : "ChatGPT";
    var lang = /^english$/i.test(String(chosenLang || "").trim()) ? "English" : "Taglish";

    // Protect user-entered handoff blocks and quoted approved spoken lines from accidental rewriting
    var protectedSpans = [];
    function protectSpan(match) {
      var token = "__LIRVA_PROTECTED_" + protectedSpans.length + "__";
      protectedSpans.push(match);
      return token;
    }
    var out = baseText.replace(/"""[\\s\\S]*?"""/g, protectSpan);
    out = out.replace(/\\u201C[^\\u201D\\n]{1,320}\\u201D/g, protectSpan);
    out = out.replace(/"[^"\\n]{1,320}"/g, protectSpan);

    // Update explicit field lines for app/platform
    out = out.replace(/^([-*\\u2022]?\\s*(?:Target\\s+(?:AI\\s+)?(?:Chat\\s+)?App|AI\\s+App|Saan\\s+(?:ka\\s+)?gagawa|AI\\s+(?:Chat\\s+)?Tool|Gamitin\\s+sa|Destination\\s+App|App)\\s*[:\\u2014\\u2013-]\\s*)(?:ChatGPT|Gemini)\\b[^\\n]*/gim, function(_, prefix) {
      return prefix + app;
    });
    // Update single-app preposition phrases without touching paired "ChatGPT o Gemini" / "ChatGPT / Gemini"
    out = out.replace(/(^|[^a-zA-Z0-9])(sa|in|for|using|via|gamit\\s+ang)\\s+(ChatGPT|Gemini)(?!\\s*(?:\\/|\\bo\\b|\\bor\\b|\\band\\b|\\bat\\b)\\s*(?:ChatGPT|Gemini))\\b/gi, function(_, lead, prep) {
      return lead + prep + " " + app;
    });

    // Normalize "Wika ng dialogue" -> "Wika ng content" and "Dialogue Language" -> "Content Language" in explicit header fields
    out = out.replace(/^([-*\\u2022]?\\s*)Wika\\s+ng\\s+dialogue(\\s*[:\\u2014\\u2013-])/gim, "$1Wika ng content$2");
    out = out.replace(/^([-*\\u2022]?\\s*)Dialogue\\s+Language(\\s*[:\\u2014\\u2013-])/gim, "$1Content Language$2");

    // Update explicit field lines for content/dialogue language
    out = out.replace(/^([-*\\u2022]?\\s*(?:Content\\s+Language|Dialogue\\s*(?:\\/\\s*Content\\s*)?Language|Wika\\s+ng\\s+(?:content|dialogue|usapan|script|kuwento)|Language|Wika)\\s*[:\\u2014\\u2013-]\\s*)(?:Pure\\s+)?(?:Taglish|Tagalog|English)\\b[^\\n]*/gim, function(_, prefix) {
      return prefix + lang;
    });

    // Update generated-content language mentions without altering "converse in Taglish" or "technical prompts in English"
    var CONTENT_NOUNS = "(?:hooks?|spoken\\\\s+dialogue|dialogue|spoken\\\\s+words?|usapan|lines?|scripts?|voice[- ]?overs?|narration|on[- ]?screen\\\\s+text|subtitles?|captions?|first\\\\s+comments?|CTAs?)";
    out = out.replace(new RegExp("\\\\b" + CONTENT_NOUNS + "\\\\s+(in|sa|na)\\\\s+(?:Pure\\\\s+)?(?:Taglish|Tagalog|English)\\\\b", "gi"), function(full) {
      return full.replace(/\\s+(?:Pure\\s+)?(?:Taglish|Tagalog|English)$/i, " " + lang);
    });
    out = out.replace(new RegExp("\\\\b(?:Pure\\\\s+)?(?:Taglish|Tagalog|English)\\\\s+" + CONTENT_NOUNS + "\\\\b", "gi"), function(full) {
      return full.replace(/^(?:Pure\\s+)?(?:Taglish|Tagalog|English)\\s+/i, lang + " ");
    });
    out = out.replace(/\\b(gamit\\s+ang\\s+wikang|sa\\s+wikang)\\s+(?:Pure\\s+)?(?:Taglish|Tagalog|English)\\b/gi, function(_, prep) {
      return prep + " " + lang;
    });

    // Remove or replace conflicting legacy pure-Tagalog-only directives cleanly without touching story prose
    out = out.replace(/\\(pure,?\\s*natural\\s+conversational\\s+Tagalog[^)]*\\)/gi, lang === "English" ? "(clear, natural English)" : "(natural conversational Tagalog-English)");
    out = out.replace(/\\b(?:avoid|no|do\\s+not\\s+use|huwag\\s+gumamit\\s+ng)\\s+(?:unnecessary\\s+)?English(?:\\s+code[- ]switching|\\s+words?)?\\b[.;,]?/gi, "");
    out = out.replace(/\\b(?:strictly\\s+use|use\\s+only|speak\\s+only)\\s+(?:pure\\s+)?Tagalog(?:\\s+only)?\\b/gi, "use " + lang);
    out = out.replace(/\\bPure\\s+Tagalog\\b/gi, lang);
    out = out.replace(/\\bTaglish\\s*(\\/|o|or)\\s*(?:Pure\\s+)?Tagalog\\b/gi, "Taglish $1 English");

    for (var pi = 0; pi < protectedSpans.length; pi++) {
      out = out.replace("__LIRVA_PROTECTED_" + pi + "__", protectedSpans[pi]);
    }
    return out;
  }

  function applyRulesToText(text, catHint, el) {
    if (typeof text !== "string" || text.length < 50) return text;
    text = text.replace(/Verbatim\\s+Scene/gi, function(m) {
      return m === m.toUpperCase() ? "EXACT SPOKEN WORDS" : (m === m.toLowerCase() ? "exact spoken words" : "Exact Spoken Words");
    });
    text = text.replace(/(?:[-*]\\s*)?One\\s+clip\\s+per\\s+shot[,\\s]+\\b8\\s*seconds?\\s*(?:or\\s+less|max(?:imum)?)\\.?/gi, "- Scene duration: follow verified capabilities of the selected video generator and model (magkaiba ang generated clip length sa editing timestamps).");
    text = text.replace(/One\\s+clip\\s+per\\s+shot[,\\s]+\\b8\\s*seconds?\\s*(?:or\\s+less|max(?:imum)?)\\.?/gi, "duration based on verified model capabilities");
    text = text.replace(/(?:One\\s+clip\\s+per\\s+shot,?\\s*)?\\b8\\s*(?:seconds?|s)\\s*(?:max(?:imum)?|or\\s+less)\\.?/gi, "duration based on verified model capabilities");
    text = text.replace(/One\\s+clip\\s+per\\s+shot[.,]?/gi, "");
    text = text.replace(/\\b8\\s*(?:seconds?|s)\\s*(?:or\\s+less|max(?:imum)?)/gi, "duration based on verified model capabilities");
    text = text.replace(/\\b8\\s*(?:seconds?|s)\\s*max(?:imum)?/gi, "duration based on verified model capabilities");
    text = text.replace(/mandatory\\s*four[- ]scene\\s*structures?/gi, "flexible scene structure");
    text = text.replace(/(?:,\\s*)?(?:cart\\/link\\s+para\\s+sa\\s+)?Lazada[^\\n.,]*/gi, "");
    text = text.replace(/Lazada/gi, "");

    text = text.replace(/Character\\s+Reference\\s+Sheet\\s*(?:[\\u2014\\u2013-]|for|\\()\\s*[^\\u2014\\u2013\\n)]+\\)?/gi, "Character Reference Sheet");
    text = text.replace(/Place\\s+Reference\\s+Sheet\\s*(?:[\\u2014\\u2013-]|for|\\()\\s*[^\\u2014\\u2013\\n)]+\\)?/gi, "Place Reference Sheet");

    var cat = catHint || detectCategory(text, el);
    var activeApp = (typeof window !== "undefined" && window.__lirvaSelectedApp) || "ChatGPT";
    var activeLang = (typeof window !== "undefined" && (window.__lirvaSelectedContentLang || window.__lirvaSelectedDialogueLang)) || "Taglish";

    if (cat === "drama") {
      // Strip any previously appended drama rules / status block BEFORE extracting live or base selections
      var cleanBase = text;
      var stripMarkers = [
        "### PROJECT STATUS AND SELECTED OPTIONS",
        "### STATUS NG PROYEKTO AT PINILING OPTIONS",
        "### SELECTED WORKSPACE SETTINGS",
        "### 1. CONVERSATION, LANGUAGE, AND VIDEO GENERATOR SETUP",
        "### 1. CONVERSATION AND VIDEO GENERATOR SETUP",
        "### 1. CONVERSATION AT VIDEO GENERATOR SETUP",
        "### 1. SIMPLE QUESTIONS WITH SAMPLE ANSWERS",
        "### 1. CLEAR GENERATOR QUESTION",
        "### 1. GENERATOR BEFORE TIMING",
        "GENERATOR BEFORE TIMING"
      ];
      for (var sm = 0; sm < stripMarkers.length; sm++) {
        var idx = cleanBase.indexOf(stripMarkers[sm]);
        if (idx !== -1) {
          cleanBase = cleanBase.slice(0, idx).trim();
        }
      }
      if (/^##+\\s*(?:VISUAL\\s+)?STORYBOARD/im.test(cleanBase)) {
        cleanBase = cleanBase.replace(/^##+\\s*(?:VISUAL\\s+)?STORYBOARD[\\s\\S]*?(?=^##+|$)/im, "").trim();
      }

      var sel = extractDramaFormSelections(cleanBase, el);

      // Keep copied Drama prompt base free of legacy Stage/Trope, A-K, Attach:, & conflicting prompt-only labels
      cleanBase = cleanBase.replace(/sa\\s+halip\\s+na\\s+[\\u201C\"']Trope\\.?[\\u201D\"']/gi, "instead of \\u201CTrope\\u201D");
      cleanBase = cleanBase.replace(/\\bTrope\\b/g, "Story Theme").replace(/\\btrope\\b/g, "story theme");
      cleanBase = cleanBase.replace(/Stage\\s*1\\b(?:\\s*[:\\u2014-]\\s*[^\\n,.;]*)?/gi, "Part 1 \\u2014 Story Concept");
      cleanBase = cleanBase.replace(/Stage\\s*2\\b(?:\\s*[:\\u2014-]\\s*[^\\n,.;]*)?/gi, "Part 2 \\u2014 Characters and Locations");
      cleanBase = cleanBase.replace(/Stage\\s*3\\b(?:\\s*[:\\u2014-]\\s*[^\\n,.;]*)?/gi, "Part 3 \\u2014 Episode Breakdown");
      cleanBase = cleanBase.replace(/Stage\\s*4\\b(?:\\s*[:\\u2014-]\\s*[^\\n,.;]*)?/gi, "Part 4 \\u2014 Script and Scenes");
      cleanBase = cleanBase.replace(/Bahagi\\s*1\\s*[\\u2014\\u2013-]\\s*Ideya\\s+ng\\s+kuwento/gi, "Part 1 \\u2014 Story Concept");
      cleanBase = cleanBase.replace(/Bahagi\\s*2\\s*[\\u2014\\u2013-]\\s*Mga\\s+tauhan/gi, "Part 2 \\u2014 Characters and Locations");
      cleanBase = cleanBase.replace(/Bahagi\\s*3\\s*[\\u2014\\u2013-]\\s*Takbo\\s+ng\\s+bawat\\s+episode/gi, "Part 3 \\u2014 Episode Breakdown");
      cleanBase = cleanBase.replace(/Bahagi\\s*4\\s*[\\u2014\\u2013-]\\s*Script\\s+at\\s+mga\\s+eksena/gi, "Part 4 \\u2014 Script and Scenes");
      cleanBase = cleanBase.replace(/Completed\\s*\\(\\s*Image\\s+prompt\\s+ready[^)]*\\)/gi, "Pending \\u2014 image not generated");
      cleanBase = cleanBase.replace(/Image\\s+prompt\\s+ready\\s*[\\u2014\\u2013-]\\s*image\\s+not\\s+generated/gi, "Pending \\u2014 image not generated");
      cleanBase = cleanBase.replace(/\\bbubuuin\\s+ko\\s+ang\\s+Visual\\s+Storyboard\\s+at\\s+Episode\\s+Cover\\b/gi, "bubuuin ko muna ang Visual Storyboard para ma-review mo bago ang scene-by-scene video prompts");
      cleanBase = cleanBase.replace(/\\bSections?\\s+A\\s*(?:through|to|[\\u2013-])\\s*K\\b/gi, "Sections A\\u2013L");
      cleanBase = cleanBase.replace(/\\bA\\s*[\\u2013-]\\s*K\\b/g, "A\\u2013L");
      cleanBase = cleanBase.replace(/^(\\s*[-*]?\\s*)Attach:/gim, "$1I-attach:");

      // Strip additional legacy conflicting Drama workflow directives before appending revised rules
      cleanBase = cleanBase.replace(/^[^\\n]*(?:deliver\\s+(?:all\\s+)?(?:ready-to-paste\\s+)?(?:scene|video)\\s+prompts\\s+(?:first|before)\\s+(?:the\\s+)?(?:visual\\s+)?storyboard|generate\\s+(?:the\\s+)?(?:visual\\s+)?storyboard\\s+and\\s+episode\\s+cover\\s+together|text[- ]only\\s+descriptions?\\s+(?:count|serve)\\s+as\\s+(?:a\\s+)?(?:completed\\s+)?(?:visual|reference)\\s+sheet)[^\\n]*$/gim, "");

      // Sync any standalone header field line in cleanBase with the authoritative selected theme, app, and dialogue language
      if (typeof window !== "undefined" && window.__dramaSelectedTheme) {
        cleanBase = cleanBase.replace(/^([-*]?\\s*(?:Tema\\s+ng\\s+[Kk]uwento|Story\\s+Theme|Tema|Theme)\\s*[:\\u2014\\u2013-]\\s*)([^\\n]+)$/gim, function(_, prefix) {
          return prefix + window.__dramaSelectedTheme;
        });
      }
      var selShortLang = /^english/i.test(String(sel.language || "")) ? "English"
        : (/^taglish/i.test(String(sel.language || "")) ? "Taglish" : activeLang);
      cleanBase = syncBaseAppAndLanguage(cleanBase, sel.app || activeApp, selShortLang);

      // Remove stale prompt-only overrides in cleanBase when real image generation should be triggered upon approval
      cleanBase = cleanBase.replace(/^[^\\n]*(?:image\\s+prompts?\\s+only|text\\s+prompts?\\s+only\\s+for\\s+reference|do\\s+not\\s+generate\\s+(?:actual\\s+)?images?|huwag\\s+(?:mag-generate|gumawa)\\s+ng\\s+image)[^\\n]*$/gim, "");

      // Remove conflicting photorealism directives from base text when a non-realistic style is chosen
      if (sel.style !== "Realistic / Live-action") {
        cleanBase = cleanBase.replace(/bawal\\s+ang\\s+drawings,\\s*cartoons,\\s*sketches,\\s*o\\s*comic\\s*panels/gi, "strictly follow the " + sel.style + " visual style");
        cleanBase = cleanBase.replace(/\\bphotorealistic\\b/gi, sel.style);
        cleanBase = cleanBase.replace(/\\blive[- ]action\\b/gi, sel.style);
        cleanBase = cleanBase.replace(/Parang\\s+totoong\\s+tao\\s+at\\s+lugar\\s+sa\\s+isang\\s+pelikula\\.?/gi, "Strictly follow the " + sel.style + " visual style.");
      }

      cleanBase = cleanBase.replace(/\\n{3,}/g, "\\n\\n").trim();
      var freshRules = getDramaRules(sel);
      return cleanBase + "\\n\\n" + freshRules;
    }

    // Non-drama categories (Affiliate, Podcast, Facts): keep rules intact while syncing App & Dialogue Language dynamically
    text = text.replace(/sa\\s+halip\\s+na\\s+[\\u201C\"']Trope\\.?[\\u201D\"']/gi, "___SA_HALIP_NA_TROPE___");
    text = text.replace(/\\bTrope\\b/g, "Tema ng kuwento");
    text = text.replace(/\\btrope\\b/g, "tema ng kuwento");
    text = text.replace("___SA_HALIP_NA_TROPE___", "sa halip na \\u201CTrope.\\u201D");
    text = text.replace(/Stage\\s*1\\b(?:\\s*[:\\u2014-]\\s*[^\\n,.;]*)?/gi, "Bahagi 1 \\u2014 Ideya ng kuwento");
    text = text.replace(/Stage\\s*2\\b(?:\\s*[:\\u2014-]\\s*[^\\n,.;]*)?/gi, "Bahagi 2 \\u2014 Mga tauhan");
    text = text.replace(/Stage\\s*3\\b(?:\\s*[:\\u2014-]\\s*[^\\n,.;]*)?/gi, "Bahagi 3 \\u2014 Takbo ng bawat episode");
    text = text.replace(/Stage\\s*4\\b(?:\\s*[:\\u2014-]\\s*[^\\n,.;]*)?/gi, "Bahagi 4 \\u2014 Script at mga eksena");

    var nonDramaStripMarkers = [
      "### SELECTED WORKSPACE SETTINGS",
      "### 1. GENERATOR BEFORE TIMING",
      "GENERATOR BEFORE TIMING"
    ];
    for (var nm = 0; nm < nonDramaStripMarkers.length; nm++) {
      var nIdx = text.indexOf(nonDramaStripMarkers[nm]);
      if (nIdx !== -1) {
        text = text.slice(0, nIdx).trim();
      }
    }
    if (/##\\s*(?:VISUAL\\s+)?STORYBOARD/i.test(text)) {
      text = text.replace(/##\\s*(?:VISUAL\\s+)?STORYBOARD[\\s\\S]*?(?=(?:##|$))/i, "").trim();
    }

    text = syncBaseAppAndLanguage(text, activeApp, activeLang);
    var rules = getRules(cat, activeApp, activeLang);
    return text.trim() + "\\n\\n" + rules;
  }
  try { if (typeof window !== "undefined") window.__applyRulesToText = applyRulesToText; } catch (_) {}

  function updateDramaLabels() {
    var nodes = document.querySelectorAll("label, span, button, h1, h2, h3, h4, h5, h6, p, div, option, legend");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.children.length === 0 && n.textContent) {
        var tc = n.textContent;
        var modified = false;
        if (tc.includes("Trope") || tc.includes("trope")) {
          tc = tc.replace(/\\bTrope\\b/g, "Tema ng kuwento").replace(/\\btrope\\b/g, "tema ng kuwento");
          modified = true;
        }
        if (/Stage\\s*[1-4]/i.test(tc)) {
          tc = tc.replace(/Stage\\s*1\\b/gi, "Bahagi 1 \\u2014 Ideya ng kuwento")
                 .replace(/Stage\\s*2\\b/gi, "Bahagi 2 \\u2014 Mga tauhan")
                 .replace(/Stage\\s*3\\b/gi, "Bahagi 3 \\u2014 Takbo ng bawat episode")
                 .replace(/Stage\\s*4\\b/gi, "Bahagi 4 \\u2014 Script at mga eksena");
          modified = true;
        }
        if (modified) {
          n.textContent = tc;
        }
      }
    }
  }

  function normalizeThemeKey(str) {
    return String(str || "").replace(/\\s+/g, " ").trim().toLowerCase();
  }

  function getThemeChipLabel(chip) {
    if (!chip) return "";
    var stored = chip.getAttribute ? chip.getAttribute("data-lirva-theme-label") : "";
    if (stored) return stored;
    var raw = (chip.getAttribute ? (chip.getAttribute("data-theme-value") || chip.getAttribute("data-value")) : "") || (chip.textContent || "");
    return raw.replace(/\\s+/g, " ").trim();
  }

  function findDramaThemeGroup() {
    if (typeof document === "undefined" || !document.querySelectorAll) return null;

    var SKIP_SELECTOR = "nav, .nav, .navbar, .topbar, header, footer, #lirva-drama-style-section, #lirva-drama-story-mode-section, .lirva-aff-mode-grid, #out, .out, .prompt-box, pre, code, textarea";
    var KNOWN_THEME_RE = /^(?:paghihiganti|lihim\\s+na\\s+yaman|glow[- ]?up|pangalawang\\s+pagkakataon|pinagpalit|kabit|pagtataksil|bawal\\s+na\\s+pag[- ]?ibig|sekreto\\s+ng\\s+pamilya)$/i;

    function collectChipsIn(container) {
      if (!container || !container.querySelectorAll) return [];
      var raw = container.querySelectorAll("button, [role='button'], [role='radio'], .chip, .pill, .tag, input[type='radio'], label");
      var list = [];
      for (var i = 0; i < raw.length; i++) {
        var el = raw[i];
        if (!el || (el.closest && el.closest(SKIP_SELECTOR))) continue;
        if (el.tagName === "LABEL") {
          var hasRadio = el.querySelector && el.querySelector("input[type='radio']");
          var isChipCls = /\\b(?:chip|pill|tag|option)\\b/i.test(String(el.className || "")) || el.getAttribute("role") === "button" || el.getAttribute("role") === "radio";
          if (!hasRadio && !isChipCls) continue;
        }
        if (el.tagName === "INPUT" && el.type === "radio") {
          var wrapLbl = el.closest ? el.closest("label") : null;
          if (wrapLbl && container.contains(wrapLbl)) continue;
        }
        var txt = (el.textContent || "").replace(/\\s+/g, " ").trim();
        if (!txt && el.tagName === "INPUT") {
          txt = (el.value || el.getAttribute("aria-label") || "").trim();
        }
        if (!txt || txt.length > 60) continue;
        if (/^(?:tema\\s+ng\\s+kuwento|story\\s+theme|theme|trope)\\s*:?$/i.test(txt)) continue;
        if (/kopyahin|copy|buksan|pumasok|generate|reset|clear|bagong\\s+kuwento|ituloy\\s+ang\\s+dati/i.test(txt)) continue;
        list.push(el);
      }
      // Keep only leaf candidates so a parent wrapper isn't paired with its child button
      var leaves = [];
      for (var j = 0; j < list.length; j++) {
        var isAncestor = false;
        for (var k = 0; k < list.length; k++) {
          if (j !== k && list[j].contains && list[j].contains(list[k])) {
            isAncestor = true;
            break;
          }
        }
        if (!isAncestor) leaves.push(list[j]);
      }
      return leaves;
    }

    function isolatePrimaryChipRow(chips, fallbackContainer) {
      if (!chips || chips.length < 2) return { container: fallbackContainer, chips: chips };
      var firstParent = chips[0].parentElement || fallbackContainer;
      var sameParent = [];
      for (var i = 0; i < chips.length; i++) {
        if ((chips[i].parentElement || fallbackContainer) === firstParent) {
          sameParent.push(chips[i]);
        }
      }
      if (sameParent.length >= 2) {
        return { container: firstParent, chips: sameParent };
      }
      return { container: fallbackContainer, chips: chips };
    }

    // Fast path if previously marked group is still valid, visible, and connected
    var existingGroup = document.querySelector("[data-lirva-theme-group='true']");
    if (existingGroup && existingGroup.isConnected !== false && isVisibleElement(existingGroup)) {
      var existingChips = collectChipsIn(existingGroup);
      if (existingChips.length >= 2) {
        var existingField = existingGroup.closest ? (existingGroup.closest(".field, .form-group, .row, fieldset") || existingGroup.parentElement || existingGroup) : existingGroup;
        var existingInput = existingField && existingField.querySelector ? existingField.querySelector("input:not([type='radio']):not([type='checkbox']):not([type='button']):not([type='submit'])") : null;
        return { container: existingGroup, fieldContainer: existingField, chips: existingChips, textInput: existingInput };
      }
    }

    // Strategy 1: Anchor on "Tema ng kuwento" / "Story theme" / "Theme" / "Trope" label inside Drama scope
    var labelNodes = document.querySelectorAll("label, .label, .field-label, legend, h3, h4, h5, p, span, strong, b, div");
    for (var li = 0; li < labelNodes.length; li++) {
      var ln = labelNodes[li];
      if (!ln || !isVisibleElement(ln) || (ln.closest && ln.closest(SKIP_SELECTOR))) continue;
      if (ln.tagName === "BUTTON" || (ln.className && /\\b(?:chip|pill|tag)\\b/i.test(String(ln.className)))) continue;
      var lTxt = (ln.textContent || "").replace(/\\s+/g, " ").trim();
      if (!lTxt || lTxt.length > 70) continue;
      if (!/(?:tema\\s+ng\\s+kuwento|story\\s+theme|\\btheme\\b|\\btrope\\b)/i.test(lTxt)) continue;

      // Check immediate sibling container first (prevents pulling in adjacent label groups)
      var sib = ln.nextElementSibling;
      for (var sc = 0; sc < 2 && sib; sc++) {
        if (isVisibleElement(sib) && !(sib.closest && sib.closest(SKIP_SELECTOR))) {
          var sibRow = collectChipsIn(sib);
          if (sibRow.length >= 2) {
            var isoSib = isolatePrimaryChipRow(sibRow, sib);
            var fldSib = ln.parentElement || sib;
            var txtSib = fldSib && fldSib.querySelector ? fldSib.querySelector("input:not([type='radio']):not([type='checkbox']):not([type='button']):not([type='submit'])") : null;
            return { container: isoSib.container, fieldContainer: fldSib, chips: isoSib.chips, textInput: txtSib };
          }
        }
        sib = sib.nextElementSibling;
      }

      var anc = ln.parentElement;
      for (var step = 0; step < 4 && anc && anc !== document.body && anc.tagName !== "MAIN"; step++) {
        if (anc.querySelector && (anc.querySelector("#lirva-drama-style-section") || anc.querySelector("#lirva-drama-story-mode-section") || anc.querySelector("#out, .prompt-box"))) break;
        if (anc.querySelectorAll && anc.querySelectorAll("select, textarea").length > 2) break;
        var foundChips = collectChipsIn(anc);
        if (foundChips.length >= 2) {
          var iso = isolatePrimaryChipRow(foundChips, anc);
          var textInput = anc.querySelector ? anc.querySelector("input:not([type='radio']):not([type='checkbox']):not([type='button']):not([type='submit'])") : null;
          return { container: iso.container, fieldContainer: anc, chips: iso.chips, textInput: textInput };
        }
        anc = anc.parentElement;
      }
    }

    // Strategy 2: Fallback by matching known theme chip text
    var allBtns = document.querySelectorAll("button, [role='button'], [role='radio'], .chip, .pill, .tag, label");
    for (var bi = 0; bi < allBtns.length; bi++) {
      var b = allBtns[bi];
      if (!b || !isVisibleElement(b) || (b.closest && b.closest(SKIP_SELECTOR))) continue;
      var bt = (b.textContent || "").replace(/\\s+/g, " ").trim();
      if (KNOWN_THEME_RE.test(bt)) {
        var par = b.parentElement;
        if (par) {
          var sibChips = collectChipsIn(par);
          if (sibChips.length >= 2) {
            var fld = par.closest ? (par.closest(".field, .form-group, .row, fieldset") || par.parentElement || par) : par;
            var txtInp = fld && fld.querySelector ? fld.querySelector("input:not([type='radio']):not([type='checkbox']):not([type='button']):not([type='submit'])") : null;
            return { container: par, fieldContainer: fld, chips: sibChips, textInput: txtInp };
          }
        }
      }
    }

    return null;
  }

  function applyThemeSelection(label, groupOverride) {
    var clean = String(label || "").replace(/\\s+/g, " ").trim();
    if (!clean) return;
    window.__dramaSelectedTheme = clean;
    var grp = groupOverride || findDramaThemeGroup();
    if (grp && grp.textInput) {
      try {
        if (grp.textInput.value !== clean) {
          grp.textInput.value = clean;
          grp.textInput.dispatchEvent(new Event("input", { bubbles: true }));
          grp.textInput.dispatchEvent(new Event("change", { bubbles: true }));
        }
      } catch (_) {}
    }
    syncDramaThemeChips(grp);
  }

  function syncDramaThemeChips(groupOverride) {
    var grp = groupOverride || findDramaThemeGroup();
    if (!grp || !grp.chips || grp.chips.length === 0) return;

    var container = grp.container;
    var chips = grp.chips;

    if (container && container.setAttribute) {
      container.setAttribute("data-lirva-theme-group", "true");
      if (!container.getAttribute("role")) {
        container.setAttribute("role", "group");
      }
      if (!container.getAttribute("aria-label")) {
        container.setAttribute("aria-label", "Tema ng kuwento");
      }
    }

    // Initialize authoritative theme ONCE from DOM attributes/classes (NEVER from computed colors)
    if (!window.__dramaSelectedTheme) {
      for (var i = 0; i < chips.length; i++) {
        var c = chips[i];
        var lbl = getThemeChipLabel(c);
        if (!c.getAttribute("data-lirva-theme-label") && lbl) {
          c.setAttribute("data-lirva-theme-label", lbl);
        }
        var radio = (c.tagName === "INPUT" && c.type === "radio") ? c : (c.querySelector ? c.querySelector("input[type='radio']") : null);
        var hasAttrSel = (radio && radio.checked) ||
          (c.getAttribute && (c.getAttribute("aria-pressed") === "true" || c.getAttribute("aria-checked") === "true"));
        var clsStr = String(c.className || "");
        var clsMatch = clsStr.match(/\\b(active|selected|is-active|on)\\b/);
        if (hasAttrSel || clsMatch) {
          if (clsMatch && !window.__dramaThemeNativeClass) {
            window.__dramaThemeNativeClass = clsMatch[1];
          }
          window.__dramaSelectedTheme = lbl;
          break;
        }
      }
      if (!window.__dramaSelectedTheme && grp.textInput && grp.textInput.value) {
        window.__dramaSelectedTheme = String(grp.textInput.value).trim();
      }
    }

    var activeKey = normalizeThemeKey(window.__dramaSelectedTheme);
    var nativeClass = window.__dramaThemeNativeClass || "active";

    for (var j = 0; j < chips.length; j++) {
      var chip = chips[j];
      var chipLabel = getThemeChipLabel(chip);
      if (chip.setAttribute && !chip.getAttribute("data-lirva-theme-label") && chipLabel) {
        chip.setAttribute("data-lirva-theme-label", chipLabel);
      }
      chip.setAttribute("data-lirva-theme-chip", "true");

      if (chip.tagName !== "BUTTON" && chip.tagName !== "INPUT" && chip.tagName !== "A" && !chip.hasAttribute("tabindex")) {
        chip.setAttribute("tabindex", "0");
      }
      if (chip.tagName !== "BUTTON" && chip.tagName !== "INPUT" && chip.tagName !== "LABEL" && !chip.getAttribute("role")) {
        chip.setAttribute("role", "button");
      }

      var isThis = Boolean(activeKey) && normalizeThemeKey(chipLabel) === activeKey;
      var chipRadio = (chip.tagName === "INPUT" && chip.type === "radio") ? chip : (chip.querySelector ? chip.querySelector("input[type='radio']") : null);

      if (isThis) {
        chip.setAttribute("data-lirva-theme-selected", "true");
      } else {
        chip.removeAttribute("data-lirva-theme-selected");
      }

      if (chipRadio) {
        chipRadio.checked = isThis;
        if (chip !== chipRadio && chip.getAttribute("role") === "radio") {
          chip.setAttribute("aria-checked", isThis ? "true" : "false");
        }
      } else if (chip.getAttribute("role") === "radio") {
        chip.setAttribute("aria-checked", isThis ? "true" : "false");
      } else {
        chip.setAttribute("aria-pressed", isThis ? "true" : "false");
      }

      if (chip.classList) {
        chip.classList.remove("active", "selected", "is-active", "on");
        if (isThis && nativeClass) {
          chip.classList.add(nativeClass);
        }
      }

      // Clear sticky inline overrides (e.g. from earlier scripts or normalizeUnlockedTheme)
      if (chip.style) {
        chip.style.removeProperty("background");
        chip.style.removeProperty("background-color");
        chip.style.removeProperty("background-image");
        chip.style.removeProperty("border");
        chip.style.removeProperty("border-color");
        chip.style.removeProperty("color");
        chip.style.removeProperty("box-shadow");
      }
      if (chip.querySelectorAll) {
        var chipKids = chip.querySelectorAll("*");
        for (var ck = 0; ck < chipKids.length; ck++) {
          if (chipKids[ck].style) {
            chipKids[ck].style.removeProperty("color");
            chipKids[ck].style.removeProperty("background-color");
          }
        }
      }

      // Bind handlers once per chip
      if (!chip.__lirvaThemeBound) {
        chip.__lirvaThemeBound = true;
        (function(boundChip, boundRadio) {
          boundChip.addEventListener("click", function() {
            var lbl = getThemeChipLabel(boundChip);
            applyThemeSelection(lbl);
            updateDomElements();
            setTimeout(function() {
              syncDramaThemeChips();
              updateDomElements();
            }, 0);
          });
          if (boundRadio) {
            boundRadio.addEventListener("change", function() {
              if (boundRadio.checked) {
                var lbl = getThemeChipLabel(boundChip);
                applyThemeSelection(lbl);
                updateDomElements();
              }
            });
          }
          boundChip.addEventListener("keydown", function(ev) {
            var k = ev && ev.key ? ev.key : "";
            if ((k === "Enter" || k === " " || k === "Spacebar") && boundChip.tagName !== "BUTTON" && boundChip.tagName !== "INPUT") {
              ev.preventDefault();
              boundChip.click();
            }
          });
        })(chip, chipRadio);
      }
    }

    if (grp.textInput && !grp.textInput.__lirvaThemeInputBound) {
      grp.textInput.__lirvaThemeInputBound = true;
      grp.textInput.addEventListener("input", function() {
        window.__dramaSelectedTheme = String(grp.textInput.value || "").trim();
        syncDramaThemeChips(grp);
      });
    }
  }

  // Global single-selection controls ("Saan ka gagawa": ChatGPT|Gemini, "Wika ng content": Taglish|English)
  function replaceLeafTextNodes(root, pattern, replacement) {
    if (!root || !root.childNodes) return;
    for (var i = 0; i < root.childNodes.length; i++) {
      var ch = root.childNodes[i];
      if (ch.nodeType === 3) {
        var val = ch.nodeValue !== undefined ? ch.nodeValue : (ch.textContent || "");
        if (val && pattern.test(val)) {
          pattern.lastIndex = 0;
          var nextVal = val.replace(pattern, replacement);
          if (ch.nodeValue !== undefined) ch.nodeValue = nextVal;
          else ch.textContent = nextVal;
        }
      } else if (ch.nodeType === 1 && ch.tagName !== "SCRIPT" && ch.tagName !== "STYLE" && ch.tagName !== "SVG" && ch.tagName !== "TEXTAREA") {
        replaceLeafTextNodes(ch, pattern, replacement);
      }
    }
  }

  function rewriteTagalogControlToEnglish(el) {
    if (!el) return;
    if (!el.childNodes || el.childNodes.length === 0) {
      var tc = el.textContent || "";
      if (/\\b(?:Pure\\s+)?Tagalog\\b/i.test(tc)) {
        el.textContent = tc.replace(/\\b(?:Pure\\s+)?Tagalog\\b/gi, "English");
      }
    } else {
      replaceLeafTextNodes(el, /\\b(?:Pure\\s+)?Tagalog\\b/gi, "English");
    }
    if (el.getAttribute) {
      var attrNames = ["data-lang", "data-value", "aria-label", "title"];
      for (var ai = 0; ai < attrNames.length; ai++) {
        var av = el.getAttribute(attrNames[ai]);
        if (av && /\\btagalog\\b/i.test(av) && !/taglish/i.test(av)) {
          el.setAttribute(attrNames[ai], av.replace(/\\b(?:Pure\\s+)?Tagalog\\b/gi, "English"));
        }
      }
      if (el.getAttribute("data-lirva-migrated-from-tagalog") !== "true") {
        el.setAttribute("data-lirva-migrated-from-tagalog", "true");
      }
    }
    var paired = findPairedRadio(el);
    if (paired) {
      if (/\\btagalog\\b/i.test(String(paired.value || "")) && !/taglish/i.test(String(paired.value || ""))) {
        paired.value = "English";
      }
      if (paired.setAttribute) {
        paired.setAttribute("data-lirva-migrated-from-tagalog", "true");
      }
    }
  }

  function normalizeGlobalContentLangTextAndControls() {
    if (typeof document === "undefined" || !document.querySelectorAll) return;

    var labelCandidates = document.querySelectorAll("label, .label, .field-label, legend, h1, h2, h3, h4, h5, h6, p, span, strong, b, div, small");
    for (var i = 0; i < labelCandidates.length; i++) {
      var node = labelCandidates[i];
      if (!node || (node.closest && node.closest("#out, .out, .prompt-box, pre, code, textarea, script, style, #lirva-drama-handoff-input"))) continue;
      var txt = getOptionSpacedText(node);
      if (txt && txt.length <= 140) {
        if (/wika\\s+ng\\s+dialogue/i.test(txt)) {
          replaceLeafTextNodes(node, /Wika\\s+ng\\s+dialogue/gi, "Wika ng content");
        }
        if (/\\bdialogue\\s+language\\b/i.test(txt)) {
          replaceLeafTextNodes(node, /Dialogue\\s+Language/gi, "Content Language");
        }
        if (txt.length <= 80 && /Taglish\\s*(\\/|o|or)\\s*(?:Pure\\s+)?Tagalog/i.test(txt)) {
          replaceLeafTextNodes(node, /Taglish\\s*(\\/|o|or)\\s*(?:Pure\\s+)?Tagalog/gi, "Taglish $1 English");
        }
      }
      if (node.getAttribute && node.setAttribute) {
        var ariaL = node.getAttribute("aria-label");
        if (ariaL && /wika\\s+ng\\s+dialogue/i.test(ariaL)) {
          node.setAttribute("aria-label", ariaL.replace(/wika\\s+ng\\s+dialogue/gi, "Wika ng content"));
        }
      }
    }

    var selects = document.querySelectorAll("select");
    for (var si = 0; si < selects.length; si++) {
      var sel = selects[si];
      if (sel.closest && sel.closest("#out, .out, .prompt-box")) continue;
      if (sel.getAttribute && sel.getAttribute("aria-label") && /wika\\s+ng\\s+dialogue/i.test(sel.getAttribute("aria-label"))) {
        sel.setAttribute("aria-label", sel.getAttribute("aria-label").replace(/wika\\s+ng\\s+dialogue/gi, "Wika ng content"));
      }
      var opts = sel.options || [];
      var hasTaglishOpt = false;
      var hasSecondLangOpt = false;
      for (var oi = 0; oi < opts.length; oi++) {
        var oText = (opts[oi].textContent || opts[oi].value || "").trim();
        if (/\\btaglish\\b/i.test(oText)) hasTaglishOpt = true;
        if ((/\\btagalog\\b/i.test(oText) || /\\benglish\\b/i.test(oText)) && !/taglish/i.test(oText)) hasSecondLangOpt = true;
      }
      if (hasTaglishOpt && hasSecondLangOpt) {
        for (var oj = 0; oj < opts.length; oj++) {
          var opt = opts[oj];
          var ot = (opt.textContent || "").trim();
          var ov = (opt.value || "").trim();
          if ((/\\btagalog\\b/i.test(ot) && !/taglish/i.test(ot)) || (/\\btagalog\\b/i.test(ov) && !/taglish/i.test(ov))) {
            opt.textContent = "English";
            opt.value = "English";
            if (opt.setAttribute) opt.setAttribute("data-lirva-migrated-from-tagalog", "true");
          }
        }
      }
    }
  }

  function getOptionSpacedText(el) {
    if (!el) return "";
    if (!el.childNodes || el.childNodes.length === 0) {
      return String(el.textContent || "").replace(/\\s+/g, " ").trim();
    }
    var parts = [];
    function walk(node) {
      if (!node) return;
      if (node.nodeType === 3) {
        var s = String(node.nodeValue !== undefined ? node.nodeValue : (node.textContent || "")).trim();
        if (s) parts.push(s);
        return;
      }
      if (node.nodeType !== 1) return;
      var tag = node.tagName;
      if (tag === "SVG" || tag === "STYLE" || tag === "SCRIPT" || tag === "NOSCRIPT") return;
      if (!node.childNodes || node.childNodes.length === 0) {
        var leaf = String(node.textContent || "").trim();
        if (leaf) parts.push(leaf);
        return;
      }
      for (var i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
    walk(el);
    return parts.join(" ").replace(/\\s+/g, " ").trim();
  }

  function findPairedRadio(el) {
    if (!el) return null;
    if (el.tagName === "INPUT" && el.type === "radio") return el;
    var inside = el.querySelector ? el.querySelector("input[type='radio']") : null;
    if (inside) return inside;
    if (el.tagName === "LABEL" && el.getAttribute && typeof document !== "undefined" && document.getElementById) {
      var forId = el.getAttribute("for");
      if (forId) {
        var target = document.getElementById(forId);
        if (target && target.tagName === "INPUT" && target.type === "radio") return target;
      }
    }
    return null;
  }

  function getGlobalOptionScore(el) {
    if (!el || !el.tagName) return 0;
    var t = el.tagName;
    if (t === "BUTTON" || t === "A" || (t === "INPUT" && el.type === "radio")) return 100;
    if (t === "LABEL") return 90;
    var role = el.getAttribute ? (el.getAttribute("role") || "") : "";
    if (role === "button" || role === "radio" || role === "tab" || (el.hasAttribute && el.hasAttribute("onclick"))) return 80;
    var cls = String(el.className || "");
    if (/\\b(?:pill|chip|tag|opt|option|seg-btn|seg-item|choice|toggle|switch-btn)\\b/i.test(cls) ||
        (el.hasAttribute && (el.hasAttribute("data-app") || el.hasAttribute("data-lang") || el.hasAttribute("data-value")))) {
      return 50;
    }
    return 10;
  }

  function classifyGlobalOption(el, allowPlainContainer) {
    if (!el || !el.tagName) return null;
    if (el.closest && el.closest("#lirva-drama-style-section, #lirva-drama-story-mode-section, [data-lirva-theme-group], .lirva-aff-mode-grid, .lirva-aff-mode-card, .lirva-cat-thumb-frame, .lirva-cat-hero-frame, #out, .out, .prompt-box, pre, code, textarea, footer, .faq, .faq-item, details")) {
      return null;
    }
    if (el.querySelector && el.querySelector("form, select, textarea, #out, .prompt-box, table")) {
      return null;
    }
    if (el.tagName === "A") {
      var href = el.getAttribute ? (el.getAttribute("href") || "") : "";
      if (/^https?:\\/\\//i.test(href)) return null;
    }
    var score = getGlobalOptionScore(el);
    if (!allowPlainContainer && score < 50) {
      return null;
    }

    var rawTxt = getOptionSpacedText(el);
    if (!rawTxt && el.tagName === "INPUT") {
      rawTxt = (el.value || (el.getAttribute && el.getAttribute("aria-label")) || "").trim();
    }
    if (!rawTxt && el.getAttribute) {
      var dataAttrVal = el.getAttribute("data-app") || el.getAttribute("data-lang") || el.getAttribute("data-value") || el.getAttribute("aria-label") || "";
      if (dataAttrVal) rawTxt = String(dataAttrVal).trim();
    }
    rawTxt = rawTxt.replace(/[\\u2713\\u2714\\u2022\\u25cf\\u25cb\\u25c9\\u25b8\\u25ba✓✔•●○◉▸►]+/g, " ").replace(/\\s+/g, " ").trim();
    if (!rawTxt || rawTxt.length > 48) return null;
    if (/kopyahin|copy|buksan|open|pumasok|generate|submit|plugin|bot|prompts?|affiliate|drama|podcast|facts|home|members|tema|bagong|ituloy|episode|saan|wika|content|dialogue|launch|visit/i.test(rawTxt)) {
      return null;
    }

    var hasGpt = /\\bchatgpt\\b/i.test(rawTxt);
    var hasGem = /\\bgemini\\b/i.test(rawTxt);
    if (hasGpt && !hasGem) return { groupKey: "app", value: "ChatGPT", score: score };
    if (hasGem && !hasGpt) return { groupKey: "app", value: "Gemini", score: score };

    var hasTaglish = /\\btaglish\\b/i.test(rawTxt);
    var hasEnglish = /\\benglish\\b/i.test(rawTxt);
    var hasTagalog = /\\btagalog\\b/i.test(rawTxt);
    if (hasTaglish && !hasEnglish && !hasTagalog) return { groupKey: "lang", value: "Taglish", score: score };
    if (hasEnglish && !hasTaglish && !hasTagalog) return { groupKey: "lang", value: "English", score: score };
    if (hasTagalog && !hasTaglish && !hasEnglish) return { groupKey: "lang", value: "Tagalog", score: score };

    return null;
  }

  function findGlobalSingleSelectGroups() {
    var result = { app: [], lang: [], appSelects: [], langSelects: [] };
    if (typeof document === "undefined" || !document.querySelectorAll) return result;

    var candEls = [];
    var seenSet = [];
    function addCandidateEl(node, allowPlain) {
      if (!node || seenSet.indexOf(node) !== -1) return;
      if (node.tagName === "INPUT" && node.type === "radio") {
        var wrapL = node.closest ? node.closest("label") : null;
        if (wrapL && classifyGlobalOption(wrapL, true)) return;
        if (node.id && document.querySelector) {
          var pairedL = document.querySelector("label[for='" + String(node.id).replace(/'/g, "\\\\'") + "']");
          if (pairedL && classifyGlobalOption(pairedL, true)) return;
        }
      }
      var info = classifyGlobalOption(node, allowPlain);
      if (info) {
        seenSet.push(node);
        candEls.push({ el: node, groupKey: info.groupKey, value: info.value, score: info.score });
      }
    }

    // Strategy 1: Query interactive controls and option selectors across the document
    var rawNodes = document.querySelectorAll("button, [role='button'], [role='radio'], [role='tab'], input[type='radio'], label, [onclick], [data-app], [data-lang], [data-value], .pill, .chip, .tag, .opt, .option, .seg-btn, .seg-item, .choice, .toggle, .switch-btn, [class*='seg' i], [class*='opt' i], [class*='choice' i], [class*='toggle' i], a");
    for (var i = 0; i < rawNodes.length; i++) {
      addCandidateEl(rawNodes[i], false);
    }

    // Strategy 2: Anchor on "Saan ka gagawa" / "Wika ng content" (or legacy "Wika ng dialogue") headings so even plain <div>/<span> controls are caught
    var headingNodes = document.querySelectorAll("label, .label, .field-label, legend, h3, h4, h5, p, span, strong, b, div");
    for (var hi = 0; hi < headingNodes.length; hi++) {
      var hn = headingNodes[hi];
      if (!hn || (hn.closest && hn.closest("#out, .out, .prompt-box, pre, code, textarea, footer, .faq, details"))) continue;
      var hTxt = getOptionSpacedText(hn);
      if (!hTxt || hTxt.length > 60) continue;
      if (!/(?:saan\\s+(?:ka\\s+)?gagawa|wika\\s+ng\\s+(?:content|dialogue|usapan|script)|(?:content|dialogue)\\s+language)/i.test(hTxt)) continue;
      var anc = hn.parentElement;
      for (var step = 0; step < 3 && anc && anc !== document.body && anc !== document.documentElement; step++) {
        if (anc.querySelector && anc.querySelectorAll("button, [role='button'], [role='radio'], [role='tab'], label, div, span, li, a").length <= 24) {
          var subEls = anc.querySelectorAll("button, [role='button'], [role='radio'], [role='tab'], input[type='radio'], label, div, span, li, a");
          for (var si2 = 0; si2 < subEls.length; si2++) {
            addCandidateEl(subEls[si2], true);
          }
        }
        anc = anc.parentElement;
      }
    }

    // Deduplicate ancestor/descendant pairs cleanly: prefer the true interactive control over inner spans or outer plain wrappers
    var filtered = [];
    for (var a = 0; a < candEls.length; a++) {
      var dropped = false;
      for (var b = 0; b < candEls.length; b++) {
        if (a === b) continue;
        var candA = candEls[a];
        var candB = candEls[b];
        if (candA.el.contains && candA.el.contains(candB.el)) {
          if (candB.score >= candA.score) {
            dropped = true;
            break;
          }
        } else if (candB.el.contains && candB.el.contains(candA.el)) {
          if (candB.score > candA.score) {
            dropped = true;
            break;
          }
        }
      }
      if (!dropped) filtered.push(candEls[a]);
    }

    function hasSiblingValue(targetCand, targetList, wantedValue) {
      var p = targetCand.el.parentElement;
      for (var step = 0; step < 5 && p && p !== document.body && p !== document.documentElement; step++) {
        for (var j = 0; j < targetList.length; j++) {
          if (targetList[j].el !== targetCand.el && targetList[j].value === wantedValue && p.contains && p.contains(targetList[j].el)) {
            return { found: true, container: p };
          }
        }
        p = p.parentElement;
      }
      return { found: false, container: null };
    }

    var appCands = [];
    var langCands = [];
    for (var k = 0; k < filtered.length; k++) {
      if (filtered[k].groupKey === "app") appCands.push(filtered[k]);
      else langCands.push(filtered[k]);
    }

    for (var ai = 0; ai < appCands.length; ai++) {
      var ac = appCands[ai];
      var needApp = ac.value === "ChatGPT" ? "Gemini" : "ChatGPT";
      var appPair = hasSiblingValue(ac, appCands, needApp);
      if (appPair.found) {
        if (appPair.container && appPair.container.setAttribute) {
          appPair.container.setAttribute("data-lirva-global-group", "app");
        }
        result.app.push(ac);
      }
    }

    for (var li = 0; li < langCands.length; li++) {
      var lc = langCands[li];
      var isTaglishCand = lc.value === "Taglish";
      var langPair = isTaglishCand
        ? (hasSiblingValue(lc, langCands, "English").found ? hasSiblingValue(lc, langCands, "English") : hasSiblingValue(lc, langCands, "Tagalog"))
        : hasSiblingValue(lc, langCands, "Taglish");
      if (langPair.found) {
        if (langPair.container && langPair.container.setAttribute) {
          langPair.container.setAttribute("data-lirva-global-group", "lang");
        }
        if (lc.value === "Tagalog") {
          rewriteTagalogControlToEnglish(lc.el);
          lc.value = "English";
        }
        result.lang.push(lc);
      }
    }

    // Also inspect <select> elements matching Saan ka gagawa / Wika ng content
    var selects = document.querySelectorAll("select");
    for (var si = 0; si < selects.length; si++) {
      var sel = selects[si];
      if (sel.closest && sel.closest("#lirva-drama-style-section, #lirva-drama-story-mode-section")) continue;
      var hasGptOpt = false, hasGemOpt = false, hasTaglishOpt = false, hasEnglishOpt = false, hasTagalogOpt = false;
      var opts = sel.options || [];
      for (var oi = 0; oi < opts.length; oi++) {
        var ot = (opts[oi].textContent || opts[oi].value || "").trim();
        if (/\\bchatgpt\\b/i.test(ot)) hasGptOpt = true;
        if (/\\bgemini\\b/i.test(ot)) hasGemOpt = true;
        if (/\\btaglish\\b/i.test(ot)) hasTaglishOpt = true;
        if (/\\benglish\\b/i.test(ot) && !/taglish/i.test(ot)) hasEnglishOpt = true;
        if (/\\btagalog\\b/i.test(ot) && !/taglish/i.test(ot)) hasTagalogOpt = true;
      }
      if (hasGptOpt && hasGemOpt) result.appSelects.push(sel);
      if (hasTaglishOpt && (hasEnglishOpt || hasTagalogOpt)) result.langSelects.push(sel);
    }

    return result;
  }

  function hasNativeActiveSignal(el) {
    if (!el) return false;
    var radio = findPairedRadio(el);
    if (radio && radio.checked) return true;
    if (el.getAttribute) {
      if (el.getAttribute("aria-pressed") === "true" || el.getAttribute("aria-checked") === "true" || el.getAttribute("aria-selected") === "true") {
        return true;
      }
    }
    var cls = String(el.className || "");
    return /\\b(active|selected|is-active|is-selected|on|current|checked|chosen|is-on|seg-active)\\b/.test(cls);
  }

  function detectNativeClassFromItems(items) {
    var order = ["active", "selected", "is-active", "is-selected", "on", "current", "chosen", "is-on", "seg-active"];
    for (var i = 0; i < items.length; i++) {
      var cls = String(items[i].el.className || "");
      for (var oi = 0; oi < order.length; oi++) {
        if (new RegExp("\\\\b" + order[oi] + "\\\\b").test(cls)) {
          return order[oi];
        }
      }
    }
    return "active";
  }

  function clearStickyInlineControlStyles(el) {
    if (!el) return;
    if (el.style && el.style.removeProperty) {
      el.style.removeProperty("background");
      el.style.removeProperty("background-color");
      el.style.removeProperty("background-image");
      el.style.removeProperty("border");
      el.style.removeProperty("border-color");
      el.style.removeProperty("color");
      el.style.removeProperty("box-shadow");
    }
    if (el.querySelectorAll) {
      var kids = el.querySelectorAll("*");
      for (var k = 0; k < kids.length; k++) {
        if (kids[k].style && kids[k].style.removeProperty) {
          kids[k].style.removeProperty("background");
          kids[k].style.removeProperty("background-color");
          kids[k].style.removeProperty("background-image");
          kids[k].style.removeProperty("border-color");
          kids[k].style.removeProperty("color");
          kids[k].style.removeProperty("box-shadow");
        }
      }
    }
  }

  function applyGlobalSelection(groupKey, value) {
    if (typeof window === "undefined") return;
    if (groupKey === "app") {
      var cleanApp = /^gemini$/i.test(String(value || "").trim()) ? "Gemini" : "ChatGPT";
      window.__lirvaSelectedApp = cleanApp;
      try { localStorage.setItem("lirva:global_app", cleanApp); } catch (_) {}
    } else if (groupKey === "lang") {
      var cleanLang = /^english$/i.test(String(value || "").trim()) ? "English" : "Taglish";
      window.__lirvaSelectedContentLang = cleanLang;
      window.__lirvaSelectedDialogueLang = cleanLang;
      try { localStorage.setItem("lirva:global_lang", cleanLang); } catch (_) {}
    }
    syncGlobalControls();
    if (typeof enhanceBot1CopyControls === "function") {
      try { enhanceBot1CopyControls(); } catch (_) {}
    }
  }

  function syncGlobalControls() {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    normalizeGlobalContentLangTextAndControls();
    var groups = findGlobalSingleSelectGroups();

    function syncGroup(groupKey, items, selects, defaultValue, stateProp, classProp) {
      if ((!items || items.length === 0) && (!selects || selects.length === 0)) return;

      if (items && items.length > 0 && !window[classProp]) {
        window[classProp] = detectNativeClassFromItems(items);
      }
      var nativeClass = window[classProp] || "active";

      // Initialize authoritative selection ONCE from native attributes/classes or selects (NEVER from colors)
      if (!window[stateProp]) {
        var signaled = [];
        for (var i = 0; i < (items || []).length; i++) {
          if (items[i].el && items[i].el.getAttribute && items[i].el.getAttribute("data-lirva-migrated-from-tagalog") === "true") {
            continue;
          }
          if (hasNativeActiveSignal(items[i].el)) {
            if (signaled.indexOf(items[i].value) === -1) signaled.push(items[i].value);
          }
        }
        if (signaled.length === 1) {
          window[stateProp] = signaled[0];
        } else if (selects && selects.length > 0) {
          var selOpt = selects[0].options && selects[0].selectedIndex >= 0 ? selects[0].options[selects[0].selectedIndex] : null;
          var selVal = selOpt ? (selOpt.textContent || selOpt.value || "").trim() : "";
          var wasMigratedOpt = Boolean(selOpt && selOpt.getAttribute && selOpt.getAttribute("data-lirva-migrated-from-tagalog") === "true");
          if (/gemini/i.test(selVal) && groupKey === "app") window[stateProp] = "Gemini";
          else if (/chatgpt/i.test(selVal) && groupKey === "app") window[stateProp] = "ChatGPT";
          else if (/english/i.test(selVal) && !wasMigratedOpt && groupKey === "lang") window[stateProp] = "English";
          else if (/taglish/i.test(selVal) && groupKey === "lang") window[stateProp] = "Taglish";
          else window[stateProp] = defaultValue;
        } else {
          window[stateProp] = defaultValue;
        }
      }

      if (groupKey === "lang") {
        window.__lirvaSelectedDialogueLang = window[stateProp];
      }

      var activeVal = window[stateProp];

      for (var j = 0; j < (items || []).length; j++) {
        var item = items[j];
        var el = item.el;
        var isThis = item.value === activeVal;

        el.setAttribute("data-lirva-global-option", "true");
        el.setAttribute("data-lirva-global-group-key", groupKey);
        el.setAttribute("data-lirva-global-value", item.value);

        if (isThis) {
          el.setAttribute("data-lirva-global-selected", "true");
        } else {
          el.removeAttribute("data-lirva-global-selected");
        }

        if (el.tagName !== "BUTTON" && el.tagName !== "INPUT" && el.tagName !== "A" && !el.hasAttribute("tabindex")) {
          el.setAttribute("tabindex", "0");
        }
        if (el.tagName !== "BUTTON" && el.tagName !== "INPUT" && el.tagName !== "LABEL" && !el.getAttribute("role")) {
          el.setAttribute("role", "button");
        }

        var radio = findPairedRadio(el);
        if (radio) {
          radio.checked = isThis;
          if (isThis) radio.setAttribute("checked", "");
          else radio.removeAttribute("checked");
          if (el !== radio) {
            if (el.getAttribute("role") === "radio") el.setAttribute("aria-checked", isThis ? "true" : "false");
            else if (el.getAttribute("role") === "tab") el.setAttribute("aria-selected", isThis ? "true" : "false");
            else el.setAttribute("aria-pressed", isThis ? "true" : "false");
          }
        } else if (el.getAttribute("role") === "radio") {
          el.setAttribute("aria-checked", isThis ? "true" : "false");
        } else if (el.getAttribute("role") === "tab") {
          el.setAttribute("aria-selected", isThis ? "true" : "false");
        } else {
          el.setAttribute("aria-pressed", isThis ? "true" : "false");
        }

        if (el.getAttribute) {
          if (el.hasAttribute("data-active")) el.setAttribute("data-active", isThis ? "true" : "false");
          if (el.hasAttribute("data-selected")) el.setAttribute("data-selected", isThis ? "true" : "false");
          if (el.hasAttribute("data-on")) el.setAttribute("data-on", isThis ? "true" : "false");
        }

        if (el.classList) {
          el.classList.remove("active", "selected", "is-active", "is-selected", "on", "current", "checked", "chosen", "is-on", "seg-active", "primary", "btn-primary");
          if (isThis && nativeClass) {
            el.classList.add(nativeClass);
          }
        }

        clearStickyInlineControlStyles(el);

        if (!el.__lirvaGlobalBound) {
          el.__lirvaGlobalBound = true;
          (function(boundEl, boundGroup, boundVal, boundRadio) {
            boundEl.addEventListener("click", function() {
              if (window.__lirvaGlobalDispatchGuard) return;
              applyGlobalSelection(boundGroup, boundVal);
              updateGlobalData();
              updateDomElements();
              setTimeout(function() {
                syncGlobalControls();
                updateDomElements();
              }, 0);
            });
            if (boundRadio && !boundRadio.__lirvaGlobalRadioBound) {
              boundRadio.__lirvaGlobalRadioBound = true;
              boundRadio.addEventListener("change", function() {
                if (window.__lirvaGlobalDispatchGuard) return;
                if (boundRadio.checked) {
                  applyGlobalSelection(boundGroup, boundVal);
                  updateGlobalData();
                  updateDomElements();
                }
              });
            }
            boundEl.addEventListener("keydown", function(ev) {
              var k = ev && ev.key ? ev.key : "";
              if ((k === "Enter" || k === " " || k === "Spacebar") && boundEl.tagName !== "BUTTON" && boundEl.tagName !== "INPUT") {
                ev.preventDefault();
                boundEl.click();
              }
            });
          })(el, groupKey, item.value, radio);
        }
      }

      for (var si = 0; si < (selects || []).length; si++) {
        var selEl = selects[si];
        selEl.setAttribute("data-lirva-global-select", groupKey);
        var opts = selEl.options || [];
        for (var oi = 0; oi < opts.length; oi++) {
          var oTxt = (opts[oi].textContent || opts[oi].value || "").trim();
          var matchesOpt = (groupKey === "app" && ((activeVal === "Gemini" && /gemini/i.test(oTxt)) || (activeVal === "ChatGPT" && /chatgpt/i.test(oTxt)))) ||
                           (groupKey === "lang" && ((activeVal === "English" && /english/i.test(oTxt) && !/taglish/i.test(oTxt)) || (activeVal === "Taglish" && /taglish/i.test(oTxt))));
          if (matchesOpt) {
            if (selEl.selectedIndex !== oi) {
              selEl.selectedIndex = oi;
            }
            break;
          }
        }
        if (!selEl.__lirvaGlobalSelectBound) {
          selEl.__lirvaGlobalSelectBound = true;
          (function(boundSel, boundGroup) {
            boundSel.addEventListener("change", function() {
              var sOpt = boundSel.options && boundSel.selectedIndex >= 0 ? boundSel.options[boundSel.selectedIndex] : null;
              var sTxt = sOpt ? (sOpt.textContent || sOpt.value || "").trim() : "";
              if (boundGroup === "app" && /gemini/i.test(sTxt)) {
                applyGlobalSelection("app", "Gemini");
                updateGlobalData();
                updateDomElements();
              } else if (boundGroup === "app" && /chatgpt/i.test(sTxt)) {
                applyGlobalSelection("app", "ChatGPT");
                updateGlobalData();
                updateDomElements();
              } else if (boundGroup === "lang" && /english/i.test(sTxt) && !/taglish/i.test(sTxt)) {
                applyGlobalSelection("lang", "English");
                updateGlobalData();
                updateDomElements();
              } else if (boundGroup === "lang" && /taglish/i.test(sTxt)) {
                applyGlobalSelection("lang", "Taglish");
                updateGlobalData();
                updateDomElements();
              }
            });
          })(selEl, groupKey);
        }
      }
    }

    syncGroup("app", groups.app, groups.appSelects, "ChatGPT", "__lirvaSelectedApp", "__lirvaAppNativeClass");
    syncGroup("lang", groups.lang, groups.langSelects, "Taglish", "__lirvaSelectedContentLang", "__lirvaLangNativeClass");
  }

  function isDOMNode(v) {
    return !!(v && typeof v === "object" && (v.nodeType !== undefined || (typeof Element !== "undefined" && v instanceof Element)));
  }

  function isWindowObj(v) {
    return !!(v && typeof v === "object" && (v === window || v.window === v || (typeof Window !== "undefined" && v instanceof Window)));
  }

  function isBotKeyOrString(key, val) {
    if (key && /bot|gpt|plugin/i.test(String(key))) return true;
    if (typeof val === "string" && val.length > 0 && /(?:\\bbot\\s*#?1\\b|\\blirva\\s*bot\\b|\\blirva\\s+ai\\s+affiliate\\b|\\bcustom\\s*gpt\\b|\\bplugin\\s*[123]\\b|1\\.\\s*planuhin|affiliate\\s+product\\s+partner|lirva\\s+affiliate\\s+planner|any\\s+generated\\s+discr)/i.test(val)) return true;
    return false;
  }

  function updateGlobalData() {
    try {
      function walkAndUpdate(obj, depth) {
        if (!obj || depth > 6) return;
        if (typeof obj === "string") return;
        if (Array.isArray(obj)) {
          for (var i = 0; i < obj.length; i++) {
            if (typeof obj[i] === "string" && obj[i].length > 50) {
              if (!isBotKeyOrString("", obj[i]) && (obj[i].includes("Hook") || obj[i].includes("Scene") || obj[i].includes("Prompt") || obj[i].includes("Taglish") || obj[i].includes("English") || obj[i].includes("Tagalog") || obj[i].includes("Content Language") || obj[i].includes("Exact Spoken Words") || obj[i].includes("Verbatim") || obj[i].includes("Trope") || obj[i].includes("Stage") || obj[i].includes("Drama") || obj[i].includes("kuwento") || obj[i].includes("tauhan"))) {
                obj[i] = applyRulesToText(obj[i]);
              }
            } else if (typeof obj[i] === "object" && !isDOMNode(obj[i]) && !isWindowObj(obj[i])) {
              walkAndUpdate(obj[i], depth + 1);
            }
          }
        } else if (typeof obj === "object" && !isDOMNode(obj) && !isWindowObj(obj)) {
          for (var k in obj) {
            if (!obj.hasOwnProperty(k)) continue;
            if (isBotKeyOrString(k, "")) continue;
            var v = obj[k];
            if (typeof v === "string" && v.length > 50) {
              if (!isBotKeyOrString(k, v) && (v.includes("Hook") || v.includes("Scene") || v.includes("Prompt") || v.includes("Taglish") || v.includes("English") || v.includes("Tagalog") || v.includes("Content Language") || v.includes("Exact Spoken Words") || v.includes("Verbatim") || v.includes("Trope") || v.includes("Stage") || v.includes("Drama") || v.includes("kuwento") || v.includes("tauhan"))) {
                obj[k] = applyRulesToText(v);
              }
            } else if (typeof v === "object" && !isDOMNode(v) && !isWindowObj(v)) {
              walkAndUpdate(v, depth + 1);
            }
          }
        }
      }

      for (var k in window) {
        if (!window.hasOwnProperty(k)) continue;
        if (isBotKeyOrString(k, "")) continue;
        try {
          var val = window[k];
          if (typeof val === "string" && val.length > 50) {
            if (!isBotKeyOrString(k, val) && (val.includes("Hook") || val.includes("Scene") || val.includes("Prompt") || val.includes("Taglish") || val.includes("English") || val.includes("Tagalog") || val.includes("Content Language") || val.includes("Exact Spoken Words") || val.includes("Verbatim") || val.includes("Trope") || val.includes("Stage") || val.includes("Drama") || val.includes("tauhan"))) {
              window[k] = applyRulesToText(val);
            }
          } else if (typeof val === "object" && val !== null && !isDOMNode(val) && !isWindowObj(val)) {
            walkAndUpdate(val, 1);
          }
        } catch (_) {}
      }
    } catch (_) {}
  }

  function wrapBuilderFunctions() {
    try {
      for (var k in window) {
        if (!window.hasOwnProperty(k)) continue;
        if (isBotKeyOrString(k, "")) continue;
        if (typeof window[k] === "function" && /drama|prompt|build|generate/i.test(k)) {
          (function(fnName, origFn) {
            try {
              window[fnName] = function() {
                var res = origFn.apply(this, arguments);
                if (typeof res === "string" && res.length > 50 && !isBotKeyOrString(fnName, res)) {
                  return applyRulesToText(res);
                }
                return res;
              };
            } catch (_) {}
          })(k, window[k]);
        }
      }
    } catch (_) {}
  }

  // Visual Style Cards & Story Mode UI Controls Injection
  var STYLE_CARDS_DATA = [
    {
      id: "realistic",
      name: "Realistic / Live-action",
      desc: "Parang totoong tao at lugar sa isang pelikula.",
      img: DRAMA_STYLE_IMAGES.realistic,
      alt: "Realistic Live-action drama scene showing two characters facing each other in a moody purple-lit living room"
    },
    {
      id: "3d",
      name: "3D Animation",
      desc: "Animated characters at lugar na may depth at volume.",
      img: DRAMA_STYLE_IMAGES["3d"],
      alt: "3D Animation drama scene showing stylized volumetric 3D characters facing each other with a sealed envelope"
    },
    {
      id: "2d",
      name: "2D Cartoon",
      desc: "Illustrated characters na may outlines at flat colors.",
      img: DRAMA_STYLE_IMAGES["2d"],
      alt: "2D Cartoon drama scene showing bold-outlined illustrated characters interacting in a purple-lit living room"
    },
    {
      id: "anime",
      name: "Anime",
      desc: "Anime-style characters, expressive faces, at backgrounds.",
      img: DRAMA_STYLE_IMAGES.anime,
      alt: "Anime drama scene showing cel-shaded anime characters facing each other in a dramatic living room"
    }
  ];

  function renderDramaControls() {
    // Remove legacy single-container if present
    var legacyContainer = document.getElementById("lirva-drama-controls-container");
    if (legacyContainer) legacyContainer.remove();

    // Inject responsive styles for 2-column x 2-row visual style grid and 16:9 image cards (Lirva Dark theme)
    if (!document.getElementById("lirva-drama-style-overrides")) {
      var styleTag = document.createElement("style");
      styleTag.id = "lirva-drama-style-overrides";
      styleTag.textContent = [
        "#lirva-drama-style-section {",
        "  grid-column: 1 / -1 !important;",
        "  flex: 0 0 100% !important;",
        "  width: 100% !important;",
        "  max-width: 100% !important;",
        "  box-sizing: border-box !important;",
        "  margin: 0 0 24px 0 !important;",
        "  padding: 20px 20px !important;",
        "  background: #211C27 !important;",
        "  border: 1px solid #514459 !important;",
        "  border-radius: 20px !important;",
        "  box-shadow: 0 12px 28px -14px rgba(0, 0, 0, 0.55) !important;",
        "  color: #FAF7FF !important;",
        "  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;",
        "}",
        ".lirva-style-grid {",
        "  display: grid !important;",
        "  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;",
        "  gap: 16px !important;",
        "  width: 100% !important;",
        "  box-sizing: border-box !important;",
        "  align-items: stretch !important;",
        "}",
        "@media (max-width: 640px) {",
        "  #lirva-drama-style-section {",
        "    padding: 16px 14px !important;",
        "    margin: 0 0 18px 0 !important;",
        "    border-radius: 16px !important;",
        "  }",
        "  .lirva-style-grid {",
        "    grid-template-columns: 1fr !important;",
        "    gap: 12px !important;",
        "  }",
        "  .lirva-style-card {",
        "    min-height: 0 !important;",
        "  }",
        "}",
        ".lirva-style-card {",
        "  display: flex !important;",
        "  flex-direction: column !important;",
        "  justify-content: space-between !important;",
        "  box-sizing: border-box !important;",
        "  min-width: 0 !important;",
        "  padding: 14px 16px !important;",
        "  border-radius: 16px !important;",
        "  cursor: pointer !important;",
        "  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease !important;",
        "  height: 100% !important;",
        "  min-height: 0 !important;",
        "  position: relative !important;",
        "  overflow: hidden !important;",
        "}",
        ".lirva-style-card:hover {",
        "  transform: translateY(-2px) !important;",
        "}",
        ".lirva-style-card:focus-visible, #drama-mode-new-btn:focus-visible, #drama-mode-continue-btn:focus-visible, #lirva-drama-handoff-input:focus-visible {",
        "  outline: 2px solid #C9A7F6 !important;",
        "  outline-offset: 2px !important;",
        "}",
        ".lirva-style-preview {",
        "  position: relative !important;",
        "  display: block !important;",
        "  width: 100% !important;",
        "  max-width: 100% !important;",
        "  aspect-ratio: 16 / 9 !important;",
        "  height: auto !important;",
        "  min-height: 0 !important;",
        "  max-height: none !important;",
        "  flex-shrink: 0 !important;",
        "  border-radius: 10px !important;",
        "  overflow: hidden !important;",
        "  margin: 0 0 12px 0 !important;",
        "  padding: 0 !important;",
        "  background: #18141E !important;",
        "  border: 1px solid #514459 !important;",
        "  box-sizing: border-box !important;",
        "}",
        ".lirva-style-preview img, .lirva-style-img {",
        "  display: block !important;",
        "  width: 100% !important;",
        "  height: 100% !important;",
        "  max-width: 100% !important;",
        "  max-height: 100% !important;",
        "  min-width: 0 !important;",
        "  min-height: 0 !important;",
        "  object-fit: cover !important;",
        "  object-position: 50% 25% !important;",
        "  margin: 0 !important;",
        "  padding: 0 !important;",
        "  border: 0 !important;",
        "  border-radius: 0 !important;",
        "  filter: none !important;",
        "  opacity: 1 !important;",
        "}",
        ".lirva-style-title {",
        "  font-size: 0.98rem !important;",
        "  font-weight: 700 !important;",
        "  color: #FAF7FF !important;",
        "  margin-bottom: 4px !important;",
        "  letter-spacing: 0.01em !important;",
        "  line-height: 1.3 !important;",
        "}",
        ".lirva-style-desc {",
        "  font-size: 0.82rem !important;",
        "  color: #C4BDCC !important;",
        "  line-height: 1.45 !important;",
        "  margin-bottom: 10px !important;",
        "}",
        ".lirva-style-action {",
        "  font-size: 0.82rem !important;",
        "  font-weight: 600 !important;",
        "  padding-top: 8px !important;",
        "  border-top: 1px solid rgba(81, 68, 89, 0.7) !important;",
        "  display: flex !important;",
        "  align-items: center !important;",
        "  justify-content: space-between !important;",
        "}",
        "#lirva-drama-story-mode-section {",
        "  width: 100% !important;",
        "  box-sizing: border-box !important;",
        "  margin: 0 0 20px 0 !important;",
        "  padding: 16px !important;",
        "  background: #211C27 !important;",
        "  border: 1px solid #514459 !important;",
        "  border-radius: 16px !important;",
        "  color: #FAF7FF !important;",
        "  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;",
        "}"
      ].join("\\n");
      var parentForStyle = document.head || document.documentElement || document.body;
      if (parentForStyle && parentForStyle.appendChild) parentForStyle.appendChild(styleTag);
    }

    function updateDramaCardsVisual(sectionEl, currentName) {
      if (!sectionEl) return;
      var cards = sectionEl.querySelectorAll(".lirva-style-card");
      cards.forEach(function(c) {
        var isThis = c.getAttribute("data-style-name") === currentName;
        c.setAttribute("aria-pressed", isThis ? "true" : "false");
        c.style.setProperty("border", isThis ? "2px solid #C9A7F6" : "1px solid #514459", "important");
        c.style.setProperty("background", isThis ? "rgba(128, 0, 128, 0.28)" : "#18141E", "important");
        c.style.setProperty("box-shadow", isThis ? "0 6px 18px rgba(0, 0, 0, 0.45)" : "none", "important");
        var actionSpan = c.querySelector(".lirva-style-action");
        if (actionSpan) {
          actionSpan.innerHTML = isThis ? '<span style="display: inline-block; background: #800080; color: #FFFFFF; font-weight: 700; padding: 3px 10px; border-radius: 999px;">Napili na \\u2713</span>' : '<span style="color: #C9A7F6; font-weight: 600;">Piliin ito \\u2192</span>';
        }
      });
    }

    // 1. Locate the drama input and form
    var dramaInp = null;
    var allInps = document.querySelectorAll("input, select, textarea");
    for (var n = 0; n < allInps.length; n++) {
      var item = allInps[n];
      if (item.id === "lirva-drama-handoff-input") continue;
      var nameOrId = ((item.name || "") + " " + (item.id || "") + " " + (item.placeholder || "")).toLowerCase();
      if (nameOrId.includes("char") || nameOrId.includes("tauhan") || nameOrId.includes("drama") || nameOrId.includes("kuwento") || nameOrId.includes("tema") || nameOrId.includes("trope")) {
        dramaInp = item;
        break;
      }
    }
    if (!dramaInp) return;

    var dramaForm = dramaInp.closest("form, [data-form], .form, .form-container, .builder-form");
    if (!dramaForm) {
      var pElem = dramaInp.parentElement;
      while (pElem && pElem !== document.body && pElem.tagName !== "MAIN") {
        if (pElem.tagName === "FORM" || (pElem.className && /form|card/i.test(pElem.className))) {
          dramaForm = pElem;
          break;
        }
        if (pElem.querySelectorAll("input, select, textarea").length >= 2) {
          dramaForm = pElem;
        }
        pElem = pElem.parentElement;
      }
    }
    if (!dramaForm) dramaForm = dramaInp.parentElement;

    // 2. Locate the two-column container and tab panel containing drama
    var twoColContainer = null;
    var formCol = dramaForm;
    var dramaPanel = null;

    var curr = dramaForm.parentElement;
    while (curr && curr !== document.body && curr.tagName !== "HTML") {
      var tas = curr.querySelectorAll("textarea, pre, code, .prompt-box, #out, .out, .output");
      var hasOutput = false;
      for (var t = 0; t < tas.length; t++) {
        var ta = tas[t];
        if (ta.id !== "lirva-drama-handoff-input" && !dramaForm.contains(ta)) {
          hasOutput = true;
          break;
        }
      }

      if (hasOutput) {
        twoColContainer = curr;
        for (var c = 0; c < curr.children.length; c++) {
          if (curr.children[c].contains(dramaForm)) {
            formCol = curr.children[c];
            break;
          }
        }
        dramaPanel = curr.parentElement;
        break;
      }
      curr = curr.parentElement;
    }

    var selectedStyle = window.__dramaSelectedStyle || "Realistic / Live-action";
    var storyMode = window.__dramaStoryMode || "new";
    var handoffText = window.__dramaHandoffText || "";

    // 3. Create or retrieve visual style section
    var styleSection = document.getElementById("lirva-drama-style-section");
    if (!styleSection) {
      styleSection = document.createElement("div");
      styleSection.id = "lirva-drama-style-section";

      var styleCardsHTML = [
        '<div style="margin-bottom: 14px;">',
        '  <h3 style="margin: 0 0 6px; font: 600 1.3rem Cormorant Garamond, Georgia, serif; color: #FAF7FF; letter-spacing: 0.02em;">Piliin ang visual style ng kuwento</h3>',
        '  <p style="margin: 0; font-size: 0.85rem; color: #C4BDCC; line-height: 1.5;">Ilalapat ang visual style na ito sa Character Reference Sheet, Place Reference Sheet, scene prompts, visual storyboard, at episode cover.</p>',
        '</div>',
        '<div class="lirva-style-grid">'
      ];

      STYLE_CARDS_DATA.forEach(function(card) {
        var isSelected = selectedStyle === card.name;
        styleCardsHTML.push([
          '  <div class="lirva-style-card" data-style-name="' + card.name + '" role="button" tabindex="0" aria-pressed="' + (isSelected ? 'true' : 'false') + '" style="box-sizing: border-box; padding: 14px 16px; border-radius: 16px; cursor: pointer; transition: all 0.2s; ' + (isSelected ? 'border: 2px solid #C9A7F6; background: rgba(128, 0, 128, 0.28); box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);' : 'border: 1px solid #514459; background: #18141E;') + '">',
          '    <div>',
          '      <div class="lirva-style-preview"><img class="lirva-style-img" data-lirva-style-img="' + card.id + '" src="' + card.img + '" alt="' + card.alt + '" loading="eager" decoding="async" /></div>',
          '      <div class="lirva-style-title">' + card.name + '</div>',
          '      <div class="lirva-style-desc">' + card.desc + '</div>',
          '    </div>',
          '    <div class="lirva-style-action">' +
          '      ' + (isSelected ? '<span style="display: inline-block; background: #800080; color: #FFFFFF; font-weight: 700; padding: 3px 10px; border-radius: 999px;">Napili na \\u2713</span>' : '<span style="color: #C9A7F6; font-weight: 600;">Piliin ito \\u2192</span>') +
          '    </div>',
          '  </div>'
        ].join("\\n"));
      });

      styleCardsHTML.push('</div>');
      styleSection.innerHTML = styleCardsHTML.join("\\n");

      // Bind card selection clicks and keyboard activation (Enter / Space)
      var styleCardEls = styleSection.querySelectorAll(".lirva-style-card");
      styleCardEls.forEach(function(cardEl) {
        function activateStyleCard() {
          var styleName = cardEl.getAttribute("data-style-name");
          window.__dramaSelectedStyle = styleName;
          try { localStorage.setItem("lirva:drama_style", styleName); } catch (_) {}
          updateDramaCardsVisual(styleSection, styleName);
          updateGlobalData();
          updateDomElements();
        }
        cardEl.addEventListener("click", activateStyleCard);
        cardEl.addEventListener("keydown", function(e) {
          var k = e && e.key ? e.key : "";
          if (k === "Enter" || k === " " || k === "Spacebar") {
            e.preventDefault();
            activateStyleCard();
          }
        });
      });
    }

    // Always update card highlights to match current window.__dramaSelectedStyle
    updateDramaCardsVisual(styleSection, selectedStyle);

    // Place or move styleSection ABOVE the two-column area
    var targetParent = null;
    var targetBefore = null;

    if (twoColContainer && twoColContainer.parentNode && twoColContainer.parentNode !== document.body && twoColContainer.parentNode.tagName !== "HTML") {
      targetParent = twoColContainer.parentNode;
      targetBefore = twoColContainer;
    } else if (twoColContainer) {
      targetParent = twoColContainer;
      targetBefore = formCol;
      try {
        if (window.getComputedStyle && window.getComputedStyle(twoColContainer).display === "flex") {
          twoColContainer.style.flexWrap = "wrap";
        }
      } catch (_) {}
    } else if (formCol && formCol.parentNode) {
      targetParent = formCol.parentNode;
      targetBefore = formCol;
    }

    if (targetParent && targetBefore) {
      if (styleSection.parentElement !== targetParent || styleSection.nextElementSibling !== targetBefore) {
        targetParent.insertBefore(styleSection, targetBefore);
      }
    }

    // Safeguard: Ensure styleSection is NEVER inside dramaForm or formCol
    if ((dramaForm && dramaForm.contains(styleSection)) || (formCol && formCol.contains(styleSection))) {
      if (twoColContainer && twoColContainer.parentNode) {
        twoColContainer.parentNode.insertBefore(styleSection, twoColContainer);
      }
    }

    // 4. Render and insert story mode controls inside the form column below visual style
    var storySection = document.getElementById("lirva-drama-story-mode-section");
    if (!storySection) {
      storySection = document.createElement("div");
      storySection.id = "lirva-drama-story-mode-section";

      var storyModeHTML = [
        '<label style="display: block; font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: #C9A7F6; font-weight: 700; margin-bottom: 10px;">URI NG KUWENTO</label>',
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">',
        '  <div id="drama-mode-new-btn" role="button" tabindex="0" style="padding: 12px 14px; border-radius: 12px; cursor: pointer; transition: all 0.2s; ' + (storyMode === "new" ? 'border: 2px solid #C9A7F6; background: #800080; color: #FFFFFF; box-shadow: 0 4px 12px rgba(0,0,0,0.4);' : 'border: 1px solid #514459; background: #18141E; color: #FAF7FF;') + '">',
        '    <div class="lirva-mode-title" style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: ' + (storyMode === "new" ? '#FFFFFF' : '#FAF7FF') + '; font-size: 0.9rem; margin-bottom: 3px;">',
        '      <span class="lirva-mode-radio" style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; border: 2px solid ' + (storyMode === "new" ? '#FFFFFF' : '#514459') + '; background: ' + (storyMode === "new" ? '#FFFFFF' : 'transparent') + ';"></span>',
        '      Bagong kuwento',
        '    </div>',
        '    <div class="lirva-mode-sub" style="font-size: 0.76rem; color: ' + (storyMode === "new" ? '#F3ECFF' : '#C4BDCC') + '; margin-left: 20px; line-height: 1.3;">Magsimula sa ideya at mga tauhan.</div>',
        '  </div>',
        '  <div id="drama-mode-continue-btn" role="button" tabindex="0" style="padding: 12px 14px; border-radius: 12px; cursor: pointer; transition: all 0.2s; ' + (storyMode === "continue" ? 'border: 2px solid #C9A7F6; background: #800080; color: #FFFFFF; box-shadow: 0 4px 12px rgba(0,0,0,0.4);' : 'border: 1px solid #514459; background: #18141E; color: #FAF7FF;') + '">',
        '    <div class="lirva-mode-title" style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: ' + (storyMode === "continue" ? '#FFFFFF' : '#FAF7FF') + '; font-size: 0.9rem; margin-bottom: 3px;">',
        '      <span class="lirva-mode-radio" style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; border: 2px solid ' + (storyMode === "continue" ? '#FFFFFF' : '#514459') + '; background: ' + (storyMode === "continue" ? '#FFFFFF' : 'transparent') + ';"></span>',
        '      Ituloy ang dati',
        '    </div>',
        '    <div class="lirva-mode-sub" style="font-size: 0.76rem; color: ' + (storyMode === "continue" ? '#F3ECFF' : '#C4BDCC') + '; margin-left: 20px; line-height: 1.3;">Gamitin ang approved concept at tauhan.</div>',
        '  </div>',
        '</div>',
        '<div id="drama-handoff-container" style="display: ' + (storyMode === "continue" ? 'block' : 'none') + '; margin-top: 10px; padding: 12px; border-radius: 12px; background: #18141E; border: 1px solid #514459;">',
        '  <label for="lirva-drama-handoff-input" style="display: block; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: #C9A7F6; font-weight: 700; margin-bottom: 5px;">Nakaraang Episode Handoff o Buod (Optional)</label>',
        '  <textarea id="lirva-drama-handoff-input" placeholder="I-paste dito ang Episode Handoff, buod ng huling episode, o script mula sa nakaraang chat..." rows="3" style="width: 100%; box-sizing: border-box; background: #121015; border: 1px solid #514459; border-radius: 10px; color: #FAF7FF; font-family: inherit; font-size: 0.85rem; padding: 8px 10px; resize: vertical; outline: none;">' + (handoffText || "") + '</textarea>',
        '  <div style="font-size: 0.76rem; color: #C4BDCC; margin-top: 5px; line-height: 1.35;">ℹ️ <strong style="color: #C9A7F6;">Paalala:</strong> I-attach ang reference images nang hiwalay sa destination chat (hindi naisasama ang images sa kinopyang prompt text).</div>',
        '</div>'
      ].join("\\n");

      storySection.innerHTML = storyModeHTML;

      var newBtn = storySection.querySelector("#drama-mode-new-btn");
      var continueBtn = storySection.querySelector("#drama-mode-continue-btn");
      var handoffContainer = storySection.querySelector("#drama-handoff-container");
      var handoffInput = storySection.querySelector("#lirva-drama-handoff-input");

      function setStoryMode(mode) {
        window.__dramaStoryMode = mode;
        try { localStorage.setItem("lirva:drama_mode", mode); } catch (_) {}
        var newRadio = newBtn ? newBtn.querySelector(".lirva-mode-radio") : null;
        var contRadio = continueBtn ? continueBtn.querySelector(".lirva-mode-radio") : null;
        var newTitle = newBtn ? newBtn.querySelector(".lirva-mode-title") : null;
        var newSub = newBtn ? newBtn.querySelector(".lirva-mode-sub") : null;
        var contTitle = continueBtn ? continueBtn.querySelector(".lirva-mode-title") : null;
        var contSub = continueBtn ? continueBtn.querySelector(".lirva-mode-sub") : null;
        if (mode === "continue") {
          handoffContainer.style.display = "block";
          continueBtn.style.border = "2px solid #C9A7F6";
          continueBtn.style.background = "#800080";
          continueBtn.style.color = "#FFFFFF";
          continueBtn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
          if (contTitle) contTitle.style.color = "#FFFFFF";
          if (contSub) contSub.style.color = "#F3ECFF";
          if (contRadio) { contRadio.style.borderColor = "#FFFFFF"; contRadio.style.background = "#FFFFFF"; }
          newBtn.style.border = "1px solid #514459";
          newBtn.style.background = "#18141E";
          newBtn.style.color = "#FAF7FF";
          newBtn.style.boxShadow = "none";
          if (newTitle) newTitle.style.color = "#FAF7FF";
          if (newSub) newSub.style.color = "#C4BDCC";
          if (newRadio) { newRadio.style.borderColor = "#514459"; newRadio.style.background = "transparent"; }
        } else {
          handoffContainer.style.display = "none";
          newBtn.style.border = "2px solid #C9A7F6";
          newBtn.style.background = "#800080";
          newBtn.style.color = "#FFFFFF";
          newBtn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
          if (newTitle) newTitle.style.color = "#FFFFFF";
          if (newSub) newSub.style.color = "#F3ECFF";
          if (newRadio) { newRadio.style.borderColor = "#FFFFFF"; newRadio.style.background = "#FFFFFF"; }
          continueBtn.style.border = "1px solid #514459";
          continueBtn.style.background = "#18141E";
          continueBtn.style.color = "#FAF7FF";
          continueBtn.style.boxShadow = "none";
          if (contTitle) contTitle.style.color = "#FAF7FF";
          if (contSub) contSub.style.color = "#C4BDCC";
          if (contRadio) { contRadio.style.borderColor = "#514459"; contRadio.style.background = "transparent"; }
        }
        updateGlobalData();
        updateDomElements();
      }

      if (newBtn) {
        newBtn.addEventListener("click", function() { setStoryMode("new"); });
        newBtn.addEventListener("keydown", function(e) {
          var k = e && e.key ? e.key : "";
          if (k === "Enter" || k === " " || k === "Spacebar") {
            e.preventDefault();
            setStoryMode("new");
          }
        });
      }
      if (continueBtn) {
        continueBtn.addEventListener("click", function() { setStoryMode("continue"); });
        continueBtn.addEventListener("keydown", function(e) {
          var k = e && e.key ? e.key : "";
          if (k === "Enter" || k === " " || k === "Spacebar") {
            e.preventDefault();
            setStoryMode("continue");
          }
        });
      }
      if (handoffInput) {
        handoffInput.addEventListener("input", function() {
          window.__dramaHandoffText = handoffInput.value;
          try { localStorage.setItem("lirva:drama_handoff", handoffInput.value); } catch (_) {}
          updateGlobalData();
          updateDomElements();
        });
      }
    }

    // Ensure storySection is inside dramaForm at top of inputs
    if (storySection.parentElement !== dramaForm) {
      var firstField = dramaForm.querySelector(".form-group, .row, .field, input, select, textarea");
      if (firstField) {
        var fieldWrapper = firstField.closest(".form-group, .row, .field, div") || firstField;
        if (fieldWrapper && fieldWrapper.parentElement === dramaForm) {
          dramaForm.insertBefore(storySection, fieldWrapper);
        } else {
          dramaForm.prepend(storySection);
        }
      } else {
        dramaForm.prepend(storySection);
      }
    }
  }

  var LIRVA_CATEGORIES = [
    {
      key: "affiliate",
      label: "AI Affiliate",
      exactRe: /^\\s*AI\\s+Affiliate(?:\\s+Generator)?\\s*$/i,
      wordRe: /\\bAI\\s*Affiliate\\b/i,
      shortRe: /\\bAffiliate\\b/i,
      alt: "Creator presenting a stainless steel tumbler on a desk with smartphone tripod and ring light for AI Affiliate videos",
      objectPosition: "52% 28%",
      src: HOME_CATEGORY_THUMBS.affiliate
    },
    {
      key: "drama",
      label: "AI Drama",
      exactRe: /^\\s*AI\\s+Drama(?:\\s+(?:Generator|Series))?\\s*$/i,
      wordRe: /\\bAI\\s*Drama\\b/i,
      shortRe: /\\bDrama\\b/i,
      alt: "Two women in an emotional face-to-face interaction in a dramatic purple-lit living room for AI Drama",
      objectPosition: "50% 24%",
      src: HOME_CATEGORY_THUMBS.drama
    },
    {
      key: "podcast",
      label: "AI Podcast",
      exactRe: /^\\s*AI\\s+Podcast(?:\\s+Generator)?\\s*$/i,
      wordRe: /\\bAI\\s*Podcast\\b/i,
      shortRe: /\\bPodcast\\b/i,
      alt: "Two podcast hosts wearing headphones speaking into studio boom microphones across a table for AI Podcast",
      objectPosition: "50% 26%",
      src: HOME_CATEGORY_THUMBS.podcast
    },
    {
      key: "facts",
      label: "AI Facts & Explainers",
      exactRe: /^\\s*AI\\s+Facts(?:\\s*(?:&|and|at)\\s*Explainers?)?(?:\\s+Generator)?\\s*$/i,
      wordRe: /\\bAI\\s*Facts\\b/i,
      shortRe: /\\bFacts\\b/i,
      alt: "Presenter gesturing beside an Earth globe, green leaf, and atomic model in a dark studio for AI Facts & Explainers",
      objectPosition: "50% 20%",
      src: HOME_CATEGORY_THUMBS.facts
    }
  ];

  function replaceHomeCategoryThumbnails() {
    if (typeof document === "undefined") return;

    // Inject scoped CSS for consistent 16:9 frames and distortion-free object-fit: cover
    if (!document.getElementById("lirva-home-thumb-styles")) {
      var thumbStyle = document.createElement("style");
      thumbStyle.id = "lirva-home-thumb-styles";
      thumbStyle.textContent = [
        ".lirva-cat-thumb-frame {",
        "  position: relative !important;",
        "  display: block !important;",
        "  width: 100% !important;",
        "  max-width: 100% !important;",
        "  aspect-ratio: 16 / 9 !important;",
        "  height: auto !important;",
        "  min-height: 0 !important;",
        "  max-height: none !important;",
        "  flex-shrink: 0 !important;",
        "  padding: 0 !important;",
        "  overflow: hidden !important;",
        "  box-sizing: border-box !important;",
        "  background: #18141E !important;",
        "  border: 1px solid #514459;",
        "  border-radius: 14px;",
        "}",
        ".lirva-cat-thumb-frame.lirva-cat-thumb-row {",
        "  width: 220px !important;",
        "  max-width: 42% !important;",
        "  flex-shrink: 0 !important;",
        "}",
        ".lirva-cat-thumb-img {",
        "  display: block !important;",
        "  width: 100% !important;",
        "  height: 100% !important;",
        "  max-width: 100% !important;",
        "  max-height: 100% !important;",
        "  min-width: 0 !important;",
        "  min-height: 0 !important;",
        "  object-fit: cover !important;",
        "  margin: 0 !important;",
        "  padding: 0 !important;",
        "  border: 0 !important;",
        "  border-radius: 0 !important;",
        "}"
      ].join("\\n");
      var styleParent = document.head || document.documentElement || document.body;
      if (styleParent && styleParent.appendChild) styleParent.appendChild(thumbStyle);
    }

    var CATEGORIES = LIRVA_CATEGORIES;

    // Fast path: if all 4 category thumbnails are already mounted and connected, skip
    var mounted = document.querySelectorAll("img.lirva-cat-thumb-img[data-lirva-cat]");
    if (mounted.length >= 4) {
      var mountedKeys = {};
      var allOk = true;
      for (var m = 0; m < mounted.length; m++) {
        if (mounted[m].isConnected === false) { allOk = false; break; }
        mountedKeys[mounted[m].getAttribute("data-lirva-cat")] = true;
      }
      if (allOk && mountedKeys.affiliate && mountedKeys.drama && mountedKeys.podcast && mountedKeys.facts) {
        return;
      }
    }

    function getSpacedText(el) {
      if (!el) return "";
      var parts = [];
      function collect(n) {
        if (!n) return;
        if (n.nodeType === 3) {
          var v = (n.nodeValue || "").trim();
          if (v) parts.push(v);
          return;
        }
        if (n.nodeType !== 1) return;
        var tag = n.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "SVG") return;
        var kids = n.childNodes || [];
        for (var c = 0; c < kids.length; c++) {
          collect(kids[c]);
        }
      }
      if (el.childNodes && el.childNodes.length > 0) {
        collect(el);
        return parts.join(" ").replace(/\\s+/g, " ").trim();
      }
      return (el.textContent || "").replace(/\\s+/g, " ").trim();
    }

    function getMatchedCategoryKeys(txt, useShort) {
      var keys = [];
      if (!txt) return keys;
      for (var i = 0; i < CATEGORIES.length; i++) {
        var re = useShort ? CATEGORIES[i].shortRe : CATEGORIES[i].wordRe;
        if (re.test(txt)) keys.push(CATEGORIES[i].key);
      }
      return keys;
    }

    function countMatchedCategories(txt, useShort) {
      return getMatchedCategoryKeys(txt, useShort).length;
    }

    function hasOtherCategoryHeading(el, ownKey) {
      if (!el || !el.querySelectorAll) return false;
      var heads = el.querySelectorAll("h1, h2, h3, h4, h5, h6, .title, .card-title, [class*='title' i], [class*='name' i]");
      for (var h = 0; h < heads.length; h++) {
        var ht = getSpacedText(heads[h]);
        if (!ht || ht.length > 60) continue;
        for (var c = 0; c < CATEGORIES.length; c++) {
          if (CATEGORIES[c].key === ownKey) continue;
          if (CATEGORIES[c].wordRe.test(ht) || CATEGORIES[c].shortRe.test(ht)) {
            return true;
          }
        }
      }
      return false;
    }

    function getElementDimensions(el) {
      var w = 0;
      var h = 0;
      try {
        if (el.getBoundingClientRect) {
          var rect = el.getBoundingClientRect();
          if (rect && (rect.width > 0 || rect.height > 0)) {
            w = rect.width;
            h = rect.height;
          }
        }
      } catch (_) {}
      if (w === 0 && h === 0) {
        var attrW = parseFloat(el.getAttribute ? el.getAttribute("width") : "");
        var attrH = parseFloat(el.getAttribute ? el.getAttribute("height") : "");
        if (!isNaN(attrW)) w = attrW;
        if (!isNaN(attrH)) h = attrH;
      }
      if (w === 0 && h === 0 && el.getAttribute) {
        var vb = el.getAttribute("viewBox");
        if (vb) {
          var parts = vb.trim().split(/[\\s,]+/);
          if (parts.length === 4) {
            var vbW = parseFloat(parts[2]);
            var vbH = parseFloat(parts[3]);
            if (!isNaN(vbW)) w = vbW;
            if (!isNaN(vbH)) h = vbH;
          }
        }
      }
      return { w: w, h: h };
    }

    function isMediaWrapper(el) {
      if (!el) return false;
      if (el.tagName === "FIGURE") return true;
      var cls = (typeof el.className === "string" ? el.className : "") + " " + (el.id || "");
      return /(?:^|[-_\\s])(thumb|thumbnail|illus|illustration|art|artwork|cover|media|visual|preview|pic|picture|img|image|hero|banner|graphic|icon|emoji|avatar)(?:[-_\\s]|$)/i.test(cls);
    }

    function isSmallControlIcon(el, cardEl) {
      if (!el || !el.closest) return false;
      var ctrl = el.closest("button, a, .btn, .cta, .badge, .pill, .tag, h1, h2, h3, h4, h5, h6");
      if (!ctrl || ctrl === cardEl) return false;
      if (/^H[1-6]$/.test(ctrl.tagName)) return true;
      var ctrlHasHeading = !!(ctrl.querySelector && ctrl.querySelector("h1, h2, h3, h4, h5, h6, p"));
      var ctrlTxtLen = getSpacedText(ctrl).length;
      // Full-card links/buttons wrap a heading or lengthy card copy — do NOT treat them as tiny icons
      if (ctrlHasHeading || ctrlTxtLen > 40) return false;
      return ctrlTxtLen > 0;
    }

    function findCategoryIllustration(cardEl) {
      if (!cardEl || !cardEl.querySelectorAll) return null;

      // Priority 1 & 2 combined: largest visual SVG, IMG, or CANVAS (excluding tiny CTA/badge/heading icons)
      var visuals = cardEl.querySelectorAll("svg, img, canvas");
      var bestVisual = null;
      var bestScore = -1;
      for (var v = 0; v < visuals.length; v++) {
        var vis = visuals[v];
        if (vis.classList && vis.classList.contains("lirva-cat-thumb-img")) return vis;
        if (vis.closest && vis.closest("svg") && vis.closest("svg") !== vis) continue;
        if (isSmallControlIcon(vis, cardEl)) continue;

        var dims = getElementDimensions(vis);
        var inMedia = isMediaWrapper(vis) || isMediaWrapper(vis.parentElement);
        var isTinyArrow = (dims.w > 0 && dims.w <= 22 && dims.h > 0 && dims.h <= 22) && !inMedia;
        if (isTinyArrow) continue;

        var area = (dims.w > 0 && dims.h > 0) ? Math.min(dims.w * dims.h, 250000) : (inMedia ? 20000 : 4000);
        var visScore = area + (inMedia ? 15000 : 0) + (vis.tagName === "IMG" ? 500 : 0);
        if (visScore > bestScore) {
          bestScore = visScore;
          bestVisual = vis;
        }
      }
      if (bestVisual) return bestVisual;

      // Priority 3: Named media/illustration wrapper (CSS art, background-image, or short emoji glyph)
      var allEls = cardEl.querySelectorAll("figure, div, span");
      for (var md = 0; md < allEls.length; md++) {
        var med = allEls[md];
        if (!isMediaWrapper(med)) continue;
        if (med.querySelector && med.querySelector("h1, h2, h3, h4, h5, h6, p, button, input, select, textarea")) continue;
        var txtLen = getSpacedText(med).length;
        if (txtLen <= 6) {
          return med;
        }
      }

      // Priority 4: Decorative empty or emoji-only container at top of card
      var kids = cardEl.children || [];
      for (var k = 0; k < kids.length; k++) {
        var child = kids[k];
        if ((child.tagName === "DIV" || child.tagName === "SPAN") && getSpacedText(child).length <= 6) {
          if (child.querySelector && child.querySelector("h1, h2, h3, h4, h5, h6, p, button, input")) continue;
          var cDims = getElementDimensions(child);
          if (cDims.h >= 28 || (child.children && child.children.length > 0) || getSpacedText(child).length > 0) {
            return child;
          }
        }
      }

      return null;
    }

    function walkUpToSingleCard(node, catKey) {
      var cardEl = null;
      var cur = node.parentElement;
      while (cur && cur !== document.body && cur !== document.documentElement && cur.tagName !== "MAIN" && cur.tagName !== "NAV" && cur.tagName !== "HEADER" && cur.tagName !== "FOOTER" && cur.tagName !== "FORM") {
        if (cur.querySelector && cur.querySelector("form, textarea, input, select")) {
          break;
        }
        var curTxt = getSpacedText(cur);
        if (countMatchedCategories(curTxt, false) > 1) {
          break;
        }
        if (hasOtherCategoryHeading(cur, catKey)) {
          break;
        }
        cardEl = cur;
        cur = cur.parentElement;
      }
      return cardEl;
    }

    var SKIP_CLOSEST = "nav, header, footer, aside, [role='tablist'], [role='tab'], [role='navigation'], .nav, .navbar, .topbar, .tabs, .tab-bar, .tabbar, .sidebar, .menu, #lirva-drama-style-section, #lirva-drama-story-mode-section, .lirva-aff-mode-grid, .lirva-aff-mode-card, form, textarea, pre, code, select, option";

    // Pass 1: Collect candidate title elements for the 4 Home categories
    var titleCandidates = document.querySelectorAll("h1, h2, h3, h4, h5, h6, strong, b, .title, .name, .card-title, [class*='title' i], [class*='name' i], span, div, p, a, button");
    var bestCardByCat = {};
    var bestScoreByCat = {};

    for (var i = 0; i < titleCandidates.length; i++) {
      var node = titleCandidates[i];
      if (!node) continue;
      if (node.closest && node.closest(SKIP_CLOSEST)) continue;

      var rawTxt = getSpacedText(node);
      if (!rawTxt || rawTxt.length > 60) continue;

      // Must match ONLY ONE category
      var matchedKeys = getMatchedCategoryKeys(rawTxt, false);
      if (matchedKeys.length !== 1) continue;

      var matchedCat = null;
      for (var cIdx = 0; cIdx < CATEGORIES.length; cIdx++) {
        if (CATEGORIES[cIdx].key === matchedKeys[0]) {
          matchedCat = CATEGORIES[cIdx];
          break;
        }
      }
      if (!matchedCat) continue;

      var cardEl = walkUpToSingleCard(node, matchedCat.key);
      if (!cardEl) continue;
      if (cardEl.getAttribute && cardEl.getAttribute("role") === "tab") continue;

      // Strict card purity check
      var cardSpaced = getSpacedText(cardEl);
      var cardMatched = getMatchedCategoryKeys(cardSpaced, false);
      if (cardMatched.length !== 1 || cardMatched[0] !== matchedCat.key) continue;
      if (hasOtherCategoryHeading(cardEl, matchedCat.key)) continue;

      var illCandidate = findCategoryIllustration(cardEl);
      var isBareControl = (cardEl.tagName === "BUTTON" || cardEl.tagName === "A") && cardSpaced.length <= 45 && !illCandidate;
      if (isBareControl) continue;

      // Score candidate card to distinguish Home category cards from stray headings/buttons
      var score = 0;
      if (matchedCat.exactRe.test(rawTxt)) score += 25;
      if (/^H[1-6]$/.test(node.tagName) || /title|name|head/i.test(String(node.className || ""))) score += 20;
      if (node.children && node.children.length === 0) score += 5;

      var gridMatchCount = 0;
      var gp = cardEl.parentElement;
      for (var gStep = 0; gStep < 3 && gp && gp !== document.body && gp !== document.documentElement; gStep++) {
        if (gp.closest && gp.closest(SKIP_CLOSEST)) break;
        if (gp.querySelector && gp.querySelector("form, textarea, select, #out, .prompt-box")) break;
        var gpCount = countMatchedCategories(getSpacedText(gp), false);
        if (gpCount > gridMatchCount) gridMatchCount = gpCount;
        gp = gp.parentElement;
      }
      if (gridMatchCount >= 3) score += 35;
      else if (gridMatchCount >= 2) score += 20;

      if (illCandidate) {
        score += 30;
      }
      if (cardSpaced.length > matchedCat.label.length + 12) {
        score += 15;
      } else if (!illCandidate) {
        score -= 20;
      }

      if (gridMatchCount >= 2 && score >= 30 && (!bestScoreByCat[matchedCat.key] || score > bestScoreByCat[matchedCat.key])) {
        bestScoreByCat[matchedCat.key] = score;
        bestCardByCat[matchedCat.key] = cardEl;
      }
    }

    // Pass 2: Grid-sibling fallback if fewer than 4 categories matched in Pass 1
    var foundKeys = Object.keys(bestCardByCat);
    if (foundKeys.length < 4) {
      var gridCandidates = [];
      if (foundKeys.length > 0) {
        var anchorCard = bestCardByCat[foundKeys[0]];
        if (anchorCard && anchorCard.parentElement) {
          gridCandidates.push(anchorCard.parentElement);
          if (anchorCard.parentElement.parentElement) gridCandidates.push(anchorCard.parentElement.parentElement);
        }
      } else {
        var containers = document.querySelectorAll("div, section, ul, ol");
        for (var ci = 0; ci < containers.length; ci++) {
          var cont = containers[ci];
          if (!cont || (cont.closest && cont.closest(SKIP_CLOSEST))) continue;
          if (cont.children && cont.children.length >= 4 && cont.children.length <= 12) {
            var contTxt = getSpacedText(cont);
            if (countMatchedCategories(contTxt, true) === 4) {
              gridCandidates.push(cont);
            }
          }
        }
      }
      for (var g = 0; g < gridCandidates.length; g++) {
        var gridEl = gridCandidates[g];
        if (!gridEl || gridEl === document.body || gridEl === document.documentElement) continue;
        var gridKids = gridEl.children || [];
        if (gridKids.length < 4 || gridKids.length > 12) continue;

        for (var gk = 0; gk < gridKids.length; gk++) {
          var sib = gridKids[gk];
          if (!sib || (sib.closest && sib.closest(SKIP_CLOSEST))) continue;
          if (sib.querySelector && sib.querySelector("form, textarea, input, select")) continue;
          var sibTxt = getSpacedText(sib);
          if (!sibTxt) continue;

          // Match sibling uniquely by wordRe first, then shortRe
          var sibHits = getMatchedCategoryKeys(sibTxt, false);
          if (sibHits.length === 0) sibHits = getMatchedCategoryKeys(sibTxt, true);
          if (sibHits.length !== 1) continue;

          var missingKey = sibHits[0];
          if (bestCardByCat[missingKey]) continue;
          if (hasOtherCategoryHeading(sib, missingKey)) continue;
          if (findCategoryIllustration(sib)) {
            bestCardByCat[missingKey] = sib;
          }
        }
      }
    }

    // Strict 1-to-1 bijection and non-nesting check across all matched cards
    var verifiedByCat = {};
    var catKeys = ["affiliate", "drama", "podcast", "facts"];
    for (var vi = 0; vi < catKeys.length; vi++) {
      var ck = catKeys[vi];
      var cCard = bestCardByCat[ck];
      if (!cCard) continue;
      var overlaps = false;
      for (var vj = 0; vj < catKeys.length; vj++) {
        if (vi === vj) continue;
        var oCard = bestCardByCat[catKeys[vj]];
        if (!oCard) continue;
        if (cCard === oCard || cCard.contains(oCard) || oCard.contains(cCard)) {
          overlaps = true;
          break;
        }
      }
      if (!overlaps && !hasOtherCategoryHeading(cCard, ck)) {
        verifiedByCat[ck] = cCard;
      }
    }

    for (var kIdx = 0; kIdx < CATEGORIES.length; kIdx++) {
      var cat = CATEGORIES[kIdx];
      var targetCard = verifiedByCat[cat.key];
      if (!targetCard) continue;

      var existingImg = targetCard.querySelector("img.lirva-cat-thumb-img[data-lirva-cat='" + cat.key + "']");
      if (existingImg) continue;

      var illEl = findCategoryIllustration(targetCard);
      if (!illEl) continue;

      var isRowFlex = false;
      var cardHasGap = false;
      try {
        if (typeof window !== "undefined" && window.getComputedStyle) {
          var cardStyle = window.getComputedStyle(targetCard);
          if (cardStyle) {
            if (cardStyle.display === "flex" && cardStyle.flexDirection === "row") {
              isRowFlex = true;
            }
            var rg = parseFloat(cardStyle.rowGap || cardStyle.gap || "0");
            if (!isNaN(rg) && rg > 0) cardHasGap = true;
          }
        }
      } catch (_) {}

      var frame = null;
      var illParent = illEl.parentElement;
      var canReuseParent = (
        illEl.tagName !== "DIV" &&
        illEl.tagName !== "FIGURE" &&
        illParent &&
        illParent !== targetCard &&
        illParent.tagName !== "A" &&
        illParent.tagName !== "BUTTON" &&
        getSpacedText(illParent) === "" &&
        illParent.children && illParent.children.length === 1
      );

      if (canReuseParent) {
        frame = illParent;
        frame.innerHTML = "";
        frame.style.width = "";
        frame.style.height = "";
        frame.classList.add("lirva-cat-thumb-frame");
      } else if (illEl.tagName === "DIV" || illEl.tagName === "FIGURE") {
        frame = illEl;
        frame.innerHTML = "";
        frame.style.width = "";
        frame.style.height = "";
        frame.classList.add("lirva-cat-thumb-frame");
      } else {
        frame = document.createElement("div");
        frame.className = "lirva-cat-thumb-frame";
        if (!cardHasGap) {
          try {
            if (typeof window !== "undefined" && window.getComputedStyle) {
              var illCs = window.getComputedStyle(illEl);
              if (illCs && illCs.marginBottom && illCs.marginBottom !== "0px") {
                frame.style.marginBottom = illCs.marginBottom;
              } else {
                frame.style.marginBottom = "12px";
              }
            }
          } catch (_) {
            frame.style.marginBottom = "12px";
          }
        }
        if (illEl.parentNode) {
          illEl.parentNode.replaceChild(frame, illEl);
        }
      }

      if (isRowFlex) {
        frame.classList.add("lirva-cat-thumb-row");
      }
      frame.setAttribute("data-lirva-thumb-frame", cat.key);

      var thumbImg = document.createElement("img");
      thumbImg.className = "lirva-cat-thumb-img";
      thumbImg.setAttribute("data-lirva-cat", cat.key);
      thumbImg.src = cat.src;
      thumbImg.alt = cat.alt;
      thumbImg.loading = "eager";
      thumbImg.decoding = "async";
      thumbImg.style.objectPosition = cat.objectPosition;

      frame.appendChild(thumbImg);
      targetCard.setAttribute("data-lirva-thumb-done", cat.key);
    }
  }

  function replaceCategoryHeroIllustrations() {
    if (typeof document === "undefined") return;

    if (!document.getElementById("lirva-cat-hero-styles")) {
      var heroStyle = document.createElement("style");
      heroStyle.id = "lirva-cat-hero-styles";
      heroStyle.textContent = [
        ".lirva-cat-hero-frame {",
        "  position: relative !important;",
        "  display: block !important;",
        "  width: 100% !important;",
        "  max-width: 100% !important;",
        "  aspect-ratio: 16 / 9 !important;",
        "  height: auto !important;",
        "  min-height: 0 !important;",
        "  max-height: none !important;",
        "  flex-shrink: 0 !important;",
        "  margin: 0 !important;",
        "  padding: 0 !important;",
        "  overflow: hidden !important;",
        "  box-sizing: border-box !important;",
        "  background: #18141E !important;",
        "  border: 1px solid #514459 !important;",
        "  border-radius: 18px !important;",
        "  box-shadow: 0 12px 30px -18px rgba(0, 0, 0, 0.6) !important;",
        "}",
        ".lirva-cat-hero-beside {",
        "  width: clamp(250px, 39%, 440px) !important;",
        "  max-width: 46% !important;",
        "  flex: 0 0 auto !important;",
        "}",
        ".lirva-cat-hero-host {",
        "  display: block !important;",
        "  width: 100% !important;",
        "  max-width: 100% !important;",
        "  height: auto !important;",
        "  min-height: 0 !important;",
        "  max-height: none !important;",
        "  aspect-ratio: auto !important;",
        "  padding: 0 !important;",
        "  background: transparent !important;",
        "  background-image: none !important;",
        "  border: 0 !important;",
        "  box-shadow: none !important;",
        "  overflow: visible !important;",
        "}",
        ".lirva-cat-hero-host.lirva-cat-hero-beside {",
        "  width: clamp(250px, 39%, 440px) !important;",
        "  max-width: 46% !important;",
        "  flex: 0 0 auto !important;",
        "}",
        ".lirva-cat-hero-img {",
        "  display: block !important;",
        "  width: 100% !important;",
        "  height: 100% !important;",
        "  max-width: 100% !important;",
        "  max-height: 100% !important;",
        "  min-width: 0 !important;",
        "  min-height: 0 !important;",
        "  object-fit: cover !important;",
        "  margin: 0 !important;",
        "  padding: 0 !important;",
        "  border: 0 !important;",
        "  border-radius: 0 !important;",
        "  filter: none !important;",
        "}",
        "@media (max-width: 760px) {",
        "  .lirva-cat-hero-row {",
        "    flex-direction: column !important;",
        "    align-items: stretch !important;",
        "  }",
        "  .lirva-cat-hero-grid {",
        "    grid-template-columns: 1fr !important;",
        "  }",
        "  .lirva-cat-hero-beside,",
        "  .lirva-cat-hero-host.lirva-cat-hero-beside {",
        "    width: 100% !important;",
        "    max-width: 100% !important;",
        "    flex: 1 1 auto !important;",
        "  }",
        "}"
      ].join("\\n");
      var hsParent = document.head || document.documentElement || document.body;
      if (hsParent && hsParent.appendChild) hsParent.appendChild(heroStyle);
    }

    var CATEGORIES = LIRVA_CATEGORIES;

    function getCatByKey(key) {
      for (var i = 0; i < CATEGORIES.length; i++) {
        if (CATEGORIES[i].key === key) return CATEGORIES[i];
      }
      return null;
    }

    function getHeroSpacedText(el) {
      if (!el) return "";
      var parts = [];
      function collect(n) {
        if (!n) return;
        if (n.nodeType === 3) {
          var v = (n.nodeValue || "").trim();
          if (v) parts.push(v);
          return;
        }
        if (n.nodeType !== 1) return;
        var tag = n.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "SVG" || tag === "NAV") return;
        var role = n.getAttribute ? n.getAttribute("role") : "";
        if (role === "tablist" || role === "navigation") return;
        var kids = n.childNodes || [];
        for (var c = 0; c < kids.length; c++) collect(kids[c]);
      }
      if (el.childNodes && el.childNodes.length > 0) {
        collect(el);
        return parts.join(" ").replace(/\\s+/g, " ").trim();
      }
      return (el.textContent || "").replace(/\\s+/g, " ").trim();
    }

    function matchCategoryKeys(txt, allowShort) {
      var keys = [];
      if (!txt) return keys;
      for (var i = 0; i < CATEGORIES.length; i++) {
        var re = allowShort ? CATEGORIES[i].shortRe : CATEGORIES[i].wordRe;
        if (re.test(txt)) keys.push(CATEGORIES[i].key);
      }
      return keys;
    }

    function matchCategoryAttr(el) {
      if (!el || !el.getAttribute) return null;
      var attrs = [
        el.id || "",
        typeof el.className === "string" ? el.className : "",
        el.getAttribute("data-page") || "",
        el.getAttribute("data-view") || "",
        el.getAttribute("data-tab") || "",
        el.getAttribute("data-cat") || "",
        el.getAttribute("data-category") || "",
        el.getAttribute("data-section") || "",
        el.getAttribute("aria-label") || ""
      ].join(" ");
      if (!attrs.trim()) return null;
      var hits = [];
      if (/(?:^|[^a-z])(?:ai[-_\\s]*)?affiliate(?:[^a-z]|$)/i.test(attrs)) hits.push("affiliate");
      if (/(?:^|[^a-z])(?:ai[-_\\s]*)?drama(?:[^a-z]|$)/i.test(attrs)) hits.push("drama");
      if (/(?:^|[^a-z])(?:ai[-_\\s]*)?podcast(?:[^a-z]|$)/i.test(attrs)) hits.push("podcast");
      if (/(?:^|[^a-z])(?:ai[-_\\s]*)?facts(?:[-_\\s]*(?:&|and|at)?[-_\\s]*explainers?)?(?:[^a-z]|$)/i.test(attrs)) hits.push("facts");
      return hits.length === 1 ? hits[0] : null;
    }

    function isElementVisible(el) {
      if (!el) return false;
      var cur = el;
      while (cur && cur !== document.documentElement) {
        if (cur.hasAttribute && cur.hasAttribute("hidden")) return false;
        if (cur.getAttribute && cur.getAttribute("aria-hidden") === "true") return false;
        if (cur.style && (cur.style.display === "none" || cur.style.visibility === "hidden")) return false;
        try {
          if (typeof window !== "undefined" && window.getComputedStyle) {
            var cs = window.getComputedStyle(cur);
            if (cs && (cs.display === "none" || cs.visibility === "hidden")) return false;
          }
        } catch (_) {}
        cur = cur.parentElement;
      }
      return true;
    }

    function getActiveNavCategory() {
      var navBtns = document.querySelectorAll(
        "[role='tab'][aria-selected='true'], [aria-current='page'], [aria-current='true'], " +
        "nav .active, nav .is-active, .nav .active, .nav .is-active, .navbar .active, .topbar .active, " +
        ".tabs .active, .tab-bar .active, .tabbar .active, .tab.active, .tab.is-active, .tab-btn.active, " +
        ".nav-btn.active, .nav-item.active, button.active, a.active"
      );
      var navKeys = {};
      for (var i = 0; i < navBtns.length; i++) {
        var btn = navBtns[i];
        if (!btn) continue;
        if (btn.closest && btn.closest("#lirva-drama-style-section, #lirva-drama-story-mode-section, [data-lirva-thumb-done], form")) continue;
        if (!isElementVisible(btn)) continue;
        var bTxt = getHeroSpacedText(btn);
        if (/^\\s*home\\s*$/i.test(bTxt)) return null;
        var hits = matchCategoryKeys(bTxt, true);
        if (hits.length === 1) navKeys[hits[0]] = true;
        else {
          var attrKey = matchCategoryAttr(btn);
          if (attrKey) navKeys[attrKey] = true;
        }
      }
      var found = Object.keys(navKeys);
      if (found.length === 1) return found[0];
      try {
        if (typeof window !== "undefined" && window.location && window.location.hash) {
          var h = window.location.hash;
          var hHits = [];
          if (/affiliate/i.test(h)) hHits.push("affiliate");
          if (/drama/i.test(h)) hHits.push("drama");
          if (/podcast/i.test(h)) hHits.push("podcast");
          if (/facts/i.test(h)) hHits.push("facts");
          if (hHits.length === 1 && !/home/i.test(h)) return hHits[0];
        }
      } catch (_) {}
      return null;
    }

    function isHomeGridVisible() {
      var frames = document.querySelectorAll("[data-lirva-thumb-frame], [data-lirva-thumb-done]");
      var visCount = 0;
      for (var i = 0; i < frames.length; i++) {
        if (isElementVisible(frames[i])) visCount++;
      }
      return visCount >= 2;
    }

    function getHeroDims(el) {
      var w = 0;
      var h = 0;
      try {
        if (el.getBoundingClientRect) {
          var rect = el.getBoundingClientRect();
          if (rect && (rect.width > 0 || rect.height > 0)) {
            w = rect.width;
            h = rect.height;
          }
        }
      } catch (_) {}
      if ((w === 0 || h === 0) && el.getAttribute) {
        var vb = el.getAttribute("viewBox");
        if (vb) {
          var p = vb.trim().split(/[\\s,]+/);
          if (p.length === 4) {
            var vbW = parseFloat(p[2]);
            var vbH = parseFloat(p[3]);
            if (!isNaN(vbW) && vbW > 0) w = vbW;
            if (!isNaN(vbH) && vbH > 0) h = vbH;
          }
        }
      }
      if (w === 0 && h === 0) {
        var attrW = parseFloat(el.getAttribute ? el.getAttribute("width") : "");
        var attrH = parseFloat(el.getAttribute ? el.getAttribute("height") : "");
        if (!isNaN(attrW)) w = attrW;
        if (!isNaN(attrH)) h = attrH;
      }
      if (w === 0 && h === 0 && el.tagName === "IMG") {
        if (el.naturalWidth > 0) w = el.naturalWidth;
        if (el.naturalHeight > 0) h = el.naturalHeight;
      }
      return { w: w, h: h };
    }

    function isHeroCopyClass(el) {
      if (!el) return false;
      var cls = (typeof el.className === "string" ? el.className : "") + " " + (el.id || "");
      return /(?:^|[-_\\s])(hero[-_]?(?:copy|text|info|left|body|head|header|title|sub|desc|actions|cta|btns)|copy|text[-_]?col|page[-_]?copy)(?:[-_\\s]|$)/i.test(cls);
    }

    function isHeroWrapper(el) {
      if (!el) return false;
      if (isHeroCopyClass(el)) return false;
      if (el.tagName === "FIGURE") return true;
      var cls = (typeof el.className === "string" ? el.className : "") + " " + (el.id || "");
      return /(?:^|[-_\\s])(hero[-_]?(?:art|artwork|illus|illustration|visual|media|img|image|pic|graphic|right|card|box|stage|preview)|art|artwork|illus|illo|illustration|visual|cover|media|preview|thumb|thumbnail|pic|picture|img|image|graphic|mockup|phone[-_]?(?:box|art|frame|mockup)?|device|stage|scene|showcase|artboard)(?:[-_\\s]|$)/i.test(cls);
    }

    function isNonVisualAside(el) {
      if (!el || el.tagName !== "ASIDE") return false;
      var cls = (typeof el.className === "string" ? el.className : "") + " " + (el.id || "") + " " + (el.getAttribute ? (el.getAttribute("role") || "") : "");
      if (/(sidebar|nav|menu|drawer|toc)/i.test(cls)) return true;
      if (el.querySelector && el.querySelector("nav, form, [role='tablist'], [role='navigation']")) return true;
      return false;
    }

    function isHomeMultiGridContainer(el) {
      if (!el || !el.querySelectorAll) return false;
      if (el.querySelector("form, textarea, select, #out, .prompt-box")) return false;
      if (el.querySelector("[data-lirva-thumb-done], .lirva-cat-thumb-frame")) return true;
      var kids = el.children || [];
      if (kids.length >= 3) {
        var matchedKids = {};
        for (var k = 0; k < kids.length; k++) {
          var kt = getHeroSpacedText(kids[k]);
          var kh = matchCategoryKeys(kt, false);
          if (kh.length === 1) matchedKids[kh[0]] = true;
        }
        if (Object.keys(matchedKids).length >= 3) return true;
      }
      return false;
    }

    function hasBackgroundUrl(el) {
      if (!el || typeof window === "undefined" || !window.getComputedStyle) return false;
      try {
        var cs = window.getComputedStyle(el);
        if (cs && cs.backgroundImage && cs.backgroundImage !== "none" && /url\\(/i.test(cs.backgroundImage)) {
          return true;
        }
      } catch (_) {}
      if (el.style && el.style.backgroundImage && /url\\(/i.test(el.style.backgroundImage)) {
        return true;
      }
      return false;
    }

    function isEligibleIllustrationHost(el, containerEl, headlineEl) {
      if (!el || el === containerEl || el === headlineEl) return false;
      if (el.contains && headlineEl && el.contains(headlineEl)) return false;
      if (headlineEl && headlineEl.contains && headlineEl.contains(el)) return false;
      if (isHeroCopyClass(el)) return false;
      if (el.tagName === "NAV" || el.tagName === "FOOTER" || el.tagName === "FORM" || /^H[1-6]$/.test(el.tagName)) return false;
      if (isNonVisualAside(el)) return false;
      if (el.closest && el.closest("nav, footer, [role='tablist'], [role='tab'], [role='navigation'], .nav, .navbar, .topbar, .tabs, .tab-bar, .tabbar, .sidebar, .menu, form, textarea, pre, code, select, #lirva-drama-style-section, #lirva-drama-story-mode-section, .lirva-aff-mode-grid, .lirva-aff-mode-card, [data-lirva-thumb-done], .lirva-cat-thumb-frame")) return false;
      if (el.querySelector && el.querySelector("h1, h2, h3, h4, form, textarea, input, select, #out, .prompt-box, .lirva-cat-thumb-frame")) return false;
      var lists = el.querySelectorAll ? el.querySelectorAll("ul, ol") : [];
      for (var li = 0; li < lists.length; li++) {
        if (lists[li].querySelectorAll("li").length >= 2) return false;
      }
      var pEls = el.querySelectorAll ? el.querySelectorAll("p") : [];
      for (var pi = 0; pi < pEls.length; pi++) {
        if (getHeroSpacedText(pEls[pi]).length > 50) return false;
      }
      var linksOrBtns = el.querySelectorAll ? el.querySelectorAll("a[href], button") : [];
      if (linksOrBtns.length >= 2) return false;
      if (getHeroSpacedText(el).length > 90) return false;
      return true;
    }

    function findHeadColumnIn(containerEl, headlineEl) {
      if (!containerEl || !headlineEl) return null;
      var cur = headlineEl;
      while (cur && cur.parentElement && cur.parentElement !== containerEl) {
        cur = cur.parentElement;
      }
      return (cur && cur.parentElement === containerEl) ? cur : null;
    }

    function findHeroIllustrationIn(containerEl, headlineEl) {
      if (!containerEl || !containerEl.querySelectorAll) return null;
      var headCol = findHeadColumnIn(containerEl, headlineEl);

      // Fast check if an upgraded hero image is already inside this container
      var existingHeroImg = containerEl.querySelector("img.lirva-cat-hero-img");
      if (existingHeroImg) {
        if (!existingHeroImg.closest("[data-lirva-thumb-done], .lirva-cat-thumb-frame")) {
          return existingHeroImg;
        }
      }

      // Tier 1: Visual elements (SVG, IMG, CANVAS) inside hero container
      var visuals = containerEl.querySelectorAll("svg, img, canvas");
      var best = null;
      var bestScore = -1;

      for (var v = 0; v < visuals.length; v++) {
        var vis = visuals[v];
        if (!vis) continue;
        if (vis.classList && vis.classList.contains("lirva-cat-thumb-img")) continue;
        if (headlineEl && (headlineEl === vis || (headlineEl.contains && headlineEl.contains(vis)))) continue;
        if (vis.closest && vis.closest("nav, footer, [role='tablist'], [role='tab'], [role='navigation'], .nav, .navbar, .topbar, .tabs, .tab-bar, .tabbar, .sidebar, .menu, form, textarea, pre, code, select, #lirva-drama-style-section, #lirva-drama-story-mode-section, .lirva-aff-mode-grid, .lirva-aff-mode-card, [data-lirva-thumb-done], .lirva-cat-thumb-frame, #out, .prompt-box")) continue;
        var visAside = vis.closest ? vis.closest("aside") : null;
        if (visAside && isNonVisualAside(visAside)) continue;
        if (vis.closest && vis.closest("svg") && vis.closest("svg") !== vis) continue;

        // Skip small button/badge/pill icons unless it's the only content inside a visual wrapper
        var ctrl = vis.closest ? vis.closest("button, a, .btn, .cta, .badge, .pill, .tag") : null;
        if (ctrl && ctrl !== containerEl && getHeroSpacedText(ctrl).length > 0 && !ctrl.querySelector("h1, h2, h3, p")) {
          continue;
        }

        var dims = getHeroDims(vis);
        var inMedia = isHeroWrapper(vis) || isHeroWrapper(vis.parentElement);
        if (dims.w > 0 && dims.h > 0 && Math.max(dims.w, dims.h) < 40 && !inMedia) continue;

        // If this visual sits inside a pure decorative HTML mockup sibling of headCol, upgrade target to that whole mockup block
        var targetVis = vis;
        if (headCol && vis.parentElement) {
          var sib = vis;
          while (sib && sib.parentElement && sib.parentElement !== containerEl) {
            sib = sib.parentElement;
          }
          if (sib && sib !== headCol && sib.parentElement === containerEl && isEligibleIllustrationHost(sib, containerEl, headlineEl)) {
            targetVis = sib;
          }
        }

        var area = (dims.w > 0 && dims.h > 0) ? Math.min(dims.w * dims.h, 320000) : (inMedia ? 24000 : 6000);
        var score = area + (inMedia ? 20000 : 0) + (targetVis !== vis ? 8000 : 0) + (vis.tagName === "IMG" ? 500 : 0);
        if (score > bestScore) {
          bestScore = score;
          best = targetVis;
        }
      }
      if (best) return best;

      // Tier 2: CSS background-image: url(...) hero illustration blocks
      var bgNodes = containerEl.querySelectorAll("figure, aside, div, span, section");
      for (var b = 0; b < bgNodes.length; b++) {
        var bn = bgNodes[b];
        if (!isEligibleIllustrationHost(bn, containerEl, headlineEl)) continue;
        if (!hasBackgroundUrl(bn)) continue;
        var bDims = getHeroDims(bn);
        if ((bDims.w >= 48 || bDims.h >= 48) || isHeroWrapper(bn)) {
          return bn;
        }
      }

      // Tier 3: Named illustration / mockup wrappers (including HTML phone-and-box wrappers)
      var mediaNodes = containerEl.querySelectorAll("figure, aside, div, span");
      for (var m = 0; m < mediaNodes.length; m++) {
        var mn = mediaNodes[m];
        if (!isHeroWrapper(mn)) continue;
        if (!isEligibleIllustrationHost(mn, containerEl, headlineEl)) continue;
        return mn;
      }

      // Tier 4: Structural sibling beside headline column in a hero row/grid (handles embedded HTML/CSS phone-and-box illustrations with arbitrary class names)
      if (headCol && containerEl.children && containerEl.children.length >= 2 && containerEl.children.length <= 5) {
        var isRowLike = false;
        try {
          if (typeof window !== "undefined" && window.getComputedStyle) {
            var ccs = window.getComputedStyle(containerEl);
            if (ccs && (ccs.display === "grid" || ccs.display === "inline-grid" || ((ccs.display === "flex" || ccs.display === "inline-flex") && /^row/i.test(ccs.flexDirection || "row")))) {
              isRowLike = true;
            }
          }
        } catch (_) {}

        var kids = containerEl.children;
        for (var k = 0; k < kids.length; k++) {
          var sib = kids[k];
          if (sib === headCol) continue;
          if (!isEligibleIllustrationHost(sib, containerEl, headlineEl)) continue;
          var hasMockupChildren = sib.querySelectorAll && sib.querySelectorAll("div, span, svg, img, canvas").length >= 2;
          var sDims = getHeroDims(sib);
          var hasVisualHeight = sDims.h >= 70 || (sib.style && parseFloat(sib.style.minHeight || sib.style.height || "0") >= 70);
          if ((isRowLike && (hasMockupChildren || hasVisualHeight)) || (hasMockupChildren && hasVisualHeight)) {
            return sib;
          }
        }
      }

      return null;
    }

    var SKIP_HEAD_CLOSEST = "nav, footer, [role='tablist'], [role='tab'], [role='navigation'], .nav, .navbar, .topbar, .tabs, .tab-bar, .tabbar, .sidebar, .menu, #lirva-drama-style-section, #lirva-drama-story-mode-section, .lirva-aff-mode-grid, .lirva-aff-mode-card, [data-lirva-thumb-done], .lirva-cat-thumb-frame, form, textarea, pre, code, select, option, button, a";
    var heads = document.querySelectorAll("h1, h2, h3, .hero-title, .page-title, [class*='hero' i] h1, [class*='hero' i] h2, [class*='title' i]");
    var activeNavCatKey = getActiveNavCategory();
    var homeGridVisible = isHomeGridVisible();

    function resolveHeadlineCategory(hEl) {
      var hTxt = getHeroSpacedText(hEl);
      if (!hTxt || hTxt.length > 140) return null;

      // 1. Direct match on headline text
      if (hTxt.length <= 90) {
        var matched = matchCategoryKeys(hTxt, false);
        if (matched.length === 0 && /^H[1-3]$/.test(hEl.tagName)) {
          matched = matchCategoryKeys(hTxt, true);
        }
        if (matched.length === 1) return matched[0];
      }

      // 2. Eyebrow / kicker / badge / category label inside the same hero header block (e.g. Taglish <h1> under "AI Affiliate" pill)
      var scope = hEl.parentElement;
      for (var s = 0; s < 2 && scope && scope !== document.body && scope !== document.documentElement; s++) {
        if (scope.querySelector && scope.querySelector("form, textarea, #out")) break;
        var labels = scope.querySelectorAll("span, div, p, small, strong, b, em");
        var labelCats = {};
        for (var li = 0; li < labels.length; li++) {
          var lb = labels[li];
          if (!lb || lb === hEl || (hEl.contains && hEl.contains(lb)) || (lb.contains && lb.contains(hEl))) continue;
          if (lb.closest && lb.closest(SKIP_HEAD_CLOSEST)) continue;
          var lt = getHeroSpacedText(lb);
          if (!lt || lt.length > 48) continue;
          var lHits = matchCategoryKeys(lt, false);
          if (lHits.length === 1) labelCats[lHits[0]] = true;
        }
        var lKeys = Object.keys(labelCats);
        if (lKeys.length === 1) return lKeys[0];
        if (lKeys.length > 1) return null;
        scope = scope.parentElement;
      }

      // 3. Ancestor panel ID / class / data-* attribute
      var anc = hEl.parentElement;
      for (var a = 0; a < 4 && anc && anc !== document.body && anc !== document.documentElement; a++) {
        if (isHomeMultiGridContainer(anc)) return null;
        var aKey = matchCategoryAttr(anc);
        if (aKey) return aKey;
        anc = anc.parentElement;
      }

      // 4. Active navigation tab fallback for currently visible Taglish page <h1>
      if (activeNavCatKey && !homeGridVisible && isElementVisible(hEl)) {
        var isPrimaryHeroHead = (hEl.tagName === "H1") || (hEl.tagName === "H2" && /hero|head|title|intro|banner|page/i.test(String(hEl.className || "") + " " + String((hEl.parentElement && hEl.parentElement.className) || "")));
        if (isPrimaryHeroHead) {
          return activeNavCatKey;
        }
      }

      return null;
    }

    for (var i = 0; i < heads.length; i++) {
      var hEl = heads[i];
      if (!hEl) continue;
      if (hEl.closest && hEl.closest(SKIP_HEAD_CLOSEST)) continue;
      if (isNonVisualAside(hEl.closest ? hEl.closest("aside") : null)) continue;

      // Skip if this headline belongs to a Home category card grid
      var inHomeGrid = false;
      var chk = hEl.parentElement;
      for (var hs = 0; hs < 4 && chk && chk !== document.body && chk !== document.documentElement; hs++) {
        if (isHomeMultiGridContainer(chk)) { inHomeGrid = true; break; }
        chk = chk.parentElement;
      }
      if (inHomeGrid) continue;

      var catKey = resolveHeadlineCategory(hEl);
      if (!catKey) continue;
      var cat = getCatByKey(catKey);
      if (!cat) continue;

      // Walk up ancestors to locate the category hero container & visual beside the headline
      var heroContainer = null;
      var illEl = null;
      var cur = hEl.parentElement;
      for (var step = 0; step < 5 && cur && cur !== document.body && cur !== document.documentElement; step++) {
        if (isHomeMultiGridContainer(cur)) break;

        var candidateIll = findHeroIllustrationIn(cur, hEl);
        if (candidateIll) {
          heroContainer = cur;
          illEl = candidateIll;
          break;
        }

        // Only stop walking up if this ancestor holds distinct category views
        var subHeads = cur.querySelectorAll ? cur.querySelectorAll("h1, h2") : [];
        var headCats = {};
        for (var sh = 0; sh < subHeads.length; sh++) {
          if (subHeads[sh].closest && subHeads[sh].closest(SKIP_HEAD_CLOSEST)) continue;
          var shKeys = matchCategoryKeys(getHeroSpacedText(subHeads[sh]), false);
          if (shKeys.length === 1) headCats[shKeys[0]] = true;
        }
        if (Object.keys(headCats).length > 1) break;

        cur = cur.parentElement;
      }

      if (!heroContainer || !illEl) continue;

      // If already mounted for this exact category, ensure styles/props match and continue
      if (illEl.classList && illEl.classList.contains("lirva-cat-hero-img")) {
        if (illEl.getAttribute("data-lirva-hero-cat") !== cat.key) {
          illEl.setAttribute("data-lirva-hero-cat", cat.key);
          illEl.src = cat.src;
          illEl.alt = cat.alt;
          illEl.style.objectPosition = cat.objectPosition;
          if (illEl.parentElement) illEl.parentElement.setAttribute("data-lirva-hero-frame", cat.key);
        }
        continue;
      }

      var existingImgInHero = heroContainer.querySelector && heroContainer.querySelector("img.lirva-cat-hero-img");
      if (existingImgInHero) {
        if (existingImgInHero.getAttribute("data-lirva-hero-cat") !== cat.key) {
          existingImgInHero.setAttribute("data-lirva-hero-cat", cat.key);
          existingImgInHero.src = cat.src;
          existingImgInHero.alt = cat.alt;
          existingImgInHero.style.objectPosition = cat.objectPosition;
          if (existingImgInHero.parentElement) existingImgInHero.parentElement.setAttribute("data-lirva-hero-frame", cat.key);
        }
        continue;
      }

      var illParent = illEl.parentElement;
      var isDedicatedMediaBox = (
        illEl.tagName !== "DIV" &&
        illEl.tagName !== "FIGURE" &&
        illEl.tagName !== "ASIDE" &&
        illParent &&
        illParent !== heroContainer &&
        illParent.tagName !== "A" &&
        illParent.tagName !== "BUTTON" &&
        isEligibleIllustrationHost(illParent, heroContainer, hEl) &&
        getHeroSpacedText(illParent) === "" &&
        illParent.children && illParent.children.length === 1
      );

      var frame = document.createElement("div");
      frame.className = "lirva-cat-hero-frame";
      frame.setAttribute("data-lirva-hero-frame", cat.key);

      var heroImg = document.createElement("img");
      heroImg.className = "lirva-cat-hero-img";
      heroImg.setAttribute("data-lirva-hero-cat", cat.key);
      heroImg.src = cat.src;
      heroImg.alt = cat.alt;
      heroImg.loading = "eager";
      heroImg.decoding = "async";
      heroImg.style.objectPosition = cat.objectPosition;
      frame.appendChild(heroImg);

      var hostEl = isDedicatedMediaBox ? illParent : ((illEl.tagName === "DIV" || illEl.tagName === "FIGURE" || illEl.tagName === "ASIDE") ? illEl : null);
      var rowParent = hostEl ? hostEl.parentElement : illEl.parentElement;
      var isFlexRow = false;
      var isGridRow = false;
      try {
        if (rowParent && typeof window !== "undefined" && window.getComputedStyle) {
          var rcs = window.getComputedStyle(rowParent);
          if (rcs) {
            if ((rcs.display === "flex" || rcs.display === "inline-flex") && /^row/i.test(rcs.flexDirection || "row")) {
              isFlexRow = true;
            } else if (rcs.display === "grid" || rcs.display === "inline-grid") {
              isGridRow = true;
            }
          }
        }
      } catch (_) {}

      if (hostEl) {
        hostEl.innerHTML = "";
        hostEl.classList.add("lirva-cat-hero-host");
        hostEl.setAttribute("data-lirva-hero-host", cat.key);
        if (isFlexRow && rowParent) {
          rowParent.classList.add("lirva-cat-hero-row");
          hostEl.classList.add("lirva-cat-hero-beside");
        } else if (isGridRow && rowParent) {
          rowParent.classList.add("lirva-cat-hero-grid");
        }
        hostEl.appendChild(frame);
      } else if (illEl.parentNode) {
        if (isFlexRow && rowParent) {
          rowParent.classList.add("lirva-cat-hero-row");
          frame.classList.add("lirva-cat-hero-beside");
        } else if (isGridRow && rowParent) {
          rowParent.classList.add("lirva-cat-hero-grid");
        }
        illEl.parentNode.replaceChild(frame, illEl);
      }
      heroContainer.setAttribute("data-lirva-hero-done", cat.key);
    }
  }

  function ensureDarkThemeStyles() {
    if (typeof document === "undefined") return;
    var oldIvory = document.getElementById("lirva-ivory-theme-overrides");
    if (oldIvory && oldIvory.parentNode) oldIvory.parentNode.removeChild(oldIvory);
    var parent = document.head || document.documentElement || document.body;
    var existingDark = document.getElementById("lirva-dark-theme-overrides");
    if (existingDark) {
      if (parent && parent.lastChild !== existingDark && parent.appendChild) {
        parent.appendChild(existingDark);
      }
      return;
    }
    var style = document.createElement("style");
    style.id = "lirva-dark-theme-overrides";
    style.textContent = [
      ":root {",
      "  color-scheme: dark !important;",
      "  --night: #121015 !important;",
      "  --plum: #211C27 !important;",
      "  --plum2: #18141E !important;",
      "  --line: #514459 !important;",
      "  --violet: #C9A7F6 !important;",
      "  --deep: #800080 !important;",
      "  --gold: #C9A7F6 !important;",
      "  --ink: #FAF7FF !important;",
      "  --muted: #C4BDCC !important;",
      "  --bad: #FCA5A5 !important;",
      "}",
      "html, body {",
      "  background-color: #121015 !important;",
      "  background-image: none !important;",
      "  color: #FAF7FF !important;",
      "  color-scheme: dark !important;",
      "}",
      "nav, header, footer, .nav, .navbar, .topbar, .tabs, .tab-bar, .tabbar, .footer, [role='tablist']:not([data-lirva-global-group]) {",
      "  background-color: #211C27 !important;",
      "  border-color: #514459 !important;",
      "  color: #FAF7FF !important;",
      "}",
      "main, section, article {",
      "  color: #FAF7FF;",
      "}",
      ".card, .panel, .section-card, .form-card, .output-card, .prompt-card, .box, .cat-card, .category-card, .bot-card, .faq, .faq-item, details, .modal, .dialog, .drawer {",
      "  background-color: #211C27 !important;",
      "  border-color: #514459 !important;",
      "  color: #FAF7FF !important;",
      "}",
      "details summary, summary {",
      "  color: #FAF7FF !important;",
      "}",
      ".badge:not([data-lirva-global-option]), .pill:not([data-lirva-global-option]), .chip:not([data-lirva-global-option]), .tag:not([data-lirva-global-option]) {",
      "  background-color: #18141E !important;",
      "  color: #C9A7F6 !important;",
      "  border-color: #514459 !important;",
      "}",
      "input:not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']), select, textarea {",
      "  background-color: #18141E !important;",
      "  color: #FAF7FF !important;",
      "  border-color: #514459 !important;",
      "}",
      "input::placeholder, textarea::placeholder {",
      "  color: #C4BDCC !important;",
      "  opacity: 0.78 !important;",
      "}",
      "input:disabled, select:disabled, textarea:disabled, button:disabled {",
      "  opacity: 0.55 !important;",
      "  cursor: not-allowed !important;",
      "}",
      "select option {",
      "  background-color: #211C27 !important;",
      "  color: #FAF7FF !important;",
      "}",
      "input[type='checkbox'], input[type='radio'] {",
      "  accent-color: #800080 !important;",
      "}",
      "pre, code, .prompt-box, #out, .out, .output, [data-prompt] {",
      "  background-color: #18141E !important;",
      "  color: #FAF7FF !important;",
      "  border-color: #514459 !important;",
      "}",
      "label:not([data-lirva-global-option]):not([data-lirva-theme-chip]), .label, .field-label {",
      "  color: #C9A7F6 !important;",
      "}",
      "input[type='checkbox'] + label, input[type='radio'] + label:not([data-lirva-global-option]):not([data-lirva-theme-chip]) {",
      "  color: #FAF7FF !important;",
      "}",
      ".muted, .hint, .help, .helper, .sub, .subtitle, .desc, small {",
      "  color: #C4BDCC !important;",
      "}",
      "a:not(.btn-primary):not(.primary):not(.cta):not(.active):not(.selected):not([data-lirva-global-option]) {",
      "  color: #C9A7F6;",
      "}",
      "[role='tab']:not([aria-selected='true']):not(.active):not(.selected):not(.lirva-aff-mode-card):not([data-lirva-global-option]), .tab:not(.active):not(.selected):not(.lirva-aff-mode-card):not([data-lirva-global-option]), .tab-btn:not(.active):not(.selected):not(.lirva-aff-mode-card):not([data-lirva-global-option]), .nav-btn:not(.active):not(.selected):not(.lirva-aff-mode-card):not([data-lirva-global-option]), .nav-item:not(.active):not(.selected):not(.lirva-aff-mode-card):not([data-lirva-global-option]) {",
      "  color: #FAF7FF !important;",
      "  border-color: #514459 !important;",
      "}",
      "[role='tab']:not([aria-selected='true']):not(.lirva-aff-mode-card):not([data-lirva-global-option]):hover, .tab:not(.active):not(.lirva-aff-mode-card):not([data-lirva-global-option]):hover, .tab-btn:not(.active):not(.lirva-aff-mode-card):not([data-lirva-global-option]):hover, .nav-btn:not(.active):not(.lirva-aff-mode-card):not([data-lirva-global-option]):hover {",
      "  background-color: rgba(128, 0, 128, 0.22) !important;",
      "  color: #FFFFFF !important;",
      "}",
      "[role='tab'][aria-selected='true']:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), [aria-pressed='true']:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), [aria-current='page']:not([data-lirva-global-option]), [aria-current='true']:not([data-lirva-global-option]), .tab.active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), .tab.is-active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), .tab-btn.active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), .nav-btn.active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), .nav-btn.is-active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), .nav-item.active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), button.active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), button.selected:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), a.active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), a.selected:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]), .pill.active:not([data-lirva-theme-chip]):not([data-lirva-global-option]), .pill.selected:not([data-lirva-theme-chip]):not([data-lirva-global-option]) {",
      "  background: #800080 !important;",
      "  background-image: none !important;",
      "  color: #FFFFFF !important;",
      "  border-color: #800080 !important;",
      "}",
      "[role='tab'][aria-selected='true']:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]) *, [aria-pressed='true']:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]) *, .tab.active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]) *, .tab-btn.active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]) *, .nav-btn.active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]) *, button.active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]) *, button.selected:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]) *, a.active:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]) *, a.selected:not(.lirva-aff-mode-card):not(.lirva-style-card):not([data-lirva-theme-chip]):not([data-lirva-global-option]) * {",
      "  color: #FFFFFF !important;",
      "}",
      "html body [data-lirva-global-option='true'][data-lirva-global-group-key]:not(#__lirva_never__):not([data-lirva-global-selected='true']) {",
      "  background: #18141E !important;",
      "  background-color: #18141E !important;",
      "  background-image: none !important;",
      "  color: #C9A7F6 !important;",
      "  border: 1px solid #514459 !important;",
      "  box-shadow: none !important;",
      "}",
      "html body [data-lirva-global-option='true'][data-lirva-global-group-key]:not(#__lirva_never__):not([data-lirva-global-selected='true']) :not(input):not(svg):not(path):not(circle) {",
      "  background: transparent !important;",
      "  background-color: transparent !important;",
      "  background-image: none !important;",
      "  color: #C9A7F6 !important;",
      "}",
      "html body [data-lirva-global-option='true'][data-lirva-global-group-key]:not(#__lirva_never__):not([data-lirva-global-selected='true']):focus {",
      "  background: #18141E !important;",
      "  background-color: #18141E !important;",
      "  background-image: none !important;",
      "  color: #C9A7F6 !important;",
      "  border-color: #514459 !important;",
      "}",
      "html body [data-lirva-global-option='true'][data-lirva-global-group-key]:not(#__lirva_never__):not([data-lirva-global-selected='true']):hover:not(:disabled) {",
      "  background: rgba(128, 0, 128, 0.14) !important;",
      "  background-color: rgba(128, 0, 128, 0.14) !important;",
      "  background-image: none !important;",
      "  border-color: #C9A7F6 !important;",
      "  color: #FAF7FF !important;",
      "}",
      "html body [data-lirva-global-option='true'][data-lirva-global-group-key]:not(#__lirva_never__):not([data-lirva-global-selected='true']):hover:not(:disabled) :not(input):not(svg):not(path):not(circle) {",
      "  color: #FAF7FF !important;",
      "}",
      "html body [data-lirva-global-option='true'][data-lirva-global-group-key][data-lirva-global-selected='true']:not(#__lirva_never__) {",
      "  background: #800080 !important;",
      "  background-color: #800080 !important;",
      "  background-image: none !important;",
      "  color: #FFFFFF !important;",
      "  border: 1px solid #800080 !important;",
      "  box-shadow: none !important;",
      "}",
      "html body [data-lirva-global-option='true'][data-lirva-global-group-key][data-lirva-global-selected='true']:not(#__lirva_never__) :not(input):not(svg):not(path):not(circle) {",
      "  background: transparent !important;",
      "  background-color: transparent !important;",
      "  background-image: none !important;",
      "  color: #FFFFFF !important;",
      "}",
      "html body [data-lirva-global-option='true'][data-lirva-global-group-key][data-lirva-global-selected='true']:not(#__lirva_never__):hover:not(:disabled) {",
      "  background: #990F99 !important;",
      "  background-color: #990F99 !important;",
      "  border-color: #990F99 !important;",
      "  color: #FFFFFF !important;",
      "}",
      "html body [data-lirva-global-option='true']:not(#__lirva_never__):focus-visible {",
      "  outline: 2px solid #C9A7F6 !important;",
      "  outline-offset: 2px !important;",
      "}",
      "[data-lirva-theme-chip='true']:not([data-lirva-theme-selected='true']) {",
      "  background: #18141E !important;",
      "  background-color: #18141E !important;",
      "  background-image: none !important;",
      "  color: #C9A7F6 !important;",
      "  border: 1px solid #514459 !important;",
      "  box-shadow: none !important;",
      "}",
      "[data-lirva-theme-chip='true']:not([data-lirva-theme-selected='true']) * {",
      "  color: #C9A7F6 !important;",
      "}",
      "[data-lirva-theme-chip='true']:not([data-lirva-theme-selected='true']):hover:not(:disabled) {",
      "  background: rgba(128, 0, 128, 0.14) !important;",
      "  background-color: rgba(128, 0, 128, 0.14) !important;",
      "  border-color: #C9A7F6 !important;",
      "  color: #FAF7FF !important;",
      "}",
      "[data-lirva-theme-chip='true']:not([data-lirva-theme-selected='true']):focus {",
      "  background: #18141E !important;",
      "  background-color: #18141E !important;",
      "  background-image: none !important;",
      "  color: #C9A7F6 !important;",
      "  border-color: #514459 !important;",
      "}",
      "[data-lirva-theme-chip='true'][data-lirva-theme-selected='true'] {",
      "  background: #800080 !important;",
      "  background-color: #800080 !important;",
      "  background-image: none !important;",
      "  color: #FFFFFF !important;",
      "  border: 1px solid #800080 !important;",
      "}",
      "[data-lirva-theme-chip='true'][data-lirva-theme-selected='true'] * {",
      "  color: #FFFFFF !important;",
      "}",
      "[data-lirva-theme-chip='true']:focus-visible {",
      "  outline: 2px solid #C9A7F6 !important;",
      "  outline-offset: 2px !important;",
      "}",
      ".btn-primary:not(.lirva-aff-mode-card):not([data-lirva-global-option]), .primary:not(.lirva-aff-mode-card):not([data-lirva-global-option]), button[type='submit']:not(.lirva-aff-mode-card):not([data-lirva-global-option]), #copy, #copyBtn, .copy-btn, .btn-copy, .copy, [data-copy], .cta:not(.lirva-aff-mode-card):not([data-lirva-global-option]), .open-btn, .btn-open, [class*='copy' i], [id*='copy' i] {",
      "  background: #800080 !important;",
      "  background-image: none !important;",
      "  color: #FFFFFF !important;",
      "  border-color: #800080 !important;",
      "}",
      ".btn-primary:not(.lirva-aff-mode-card):not([data-lirva-global-option]) *, .primary:not(.lirva-aff-mode-card):not([data-lirva-global-option]) *, button[type='submit']:not(.lirva-aff-mode-card):not([data-lirva-global-option]) *, #copy *, #copyBtn *, .copy-btn *, .btn-copy *, .copy *, [data-copy] *, .cta:not(.lirva-aff-mode-card):not([data-lirva-global-option]) *, .open-btn *, .btn-open *, [class*='copy' i] *, [id*='copy' i] * {",
      "  color: #FFFFFF !important;",
      "}",
      ".btn-primary:not(.lirva-aff-mode-card):not([data-lirva-global-option]):hover:not(:disabled), .primary:not(.lirva-aff-mode-card):not([data-lirva-global-option]):hover:not(:disabled), button[type='submit']:not(.lirva-aff-mode-card):not([data-lirva-global-option]):hover:not(:disabled), #copy:hover:not(:disabled), #copyBtn:hover:not(:disabled), .copy-btn:hover:not(:disabled), .btn-copy:hover:not(:disabled), .copy:hover:not(:disabled), [data-copy]:hover:not(:disabled), .cta:not(.lirva-aff-mode-card):not([data-lirva-global-option]):hover:not(:disabled), .open-btn:hover:not(:disabled), .btn-open:hover:not(:disabled), [class*='copy' i]:hover:not(:disabled), [id*='copy' i]:hover:not(:disabled) {",
      "  background: #990F99 !important;",
      "  background-image: none !important;",
      "  color: #FFFFFF !important;",
      "}",
      "a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, [role='button']:focus-visible, [role='tab']:focus-visible, [tabindex]:focus-visible {",
      "  outline: 2px solid #C9A7F6 !important;",
      "  outline-offset: 2px !important;",
      "}",
      "img, svg, picture, canvas, video, .lirva-cat-thumb-img, .lirva-cat-thumb-frame img, .lirva-cat-hero-img, .lirva-cat-hero-frame img, .lirva-aff-mode-img, .lirva-aff-mode-img-wrap img, .lirva-style-preview img, .lirva-style-img {",
      "  filter: none !important;",
      "}"
    ].join("\\n");
    var parent = document.head || document.documentElement || document.body;
    if (parent && parent.appendChild) parent.appendChild(style);
  }

  function parseCssColor(str) {
    if (!str || typeof str !== "string") return null;
    var m = str.match(/rgba?\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)(?:\\s*,\\s*([0-9.]+))?\\s*\\)/i);
    if (!m) return null;
    return {
      r: parseInt(m[1], 10),
      g: parseInt(m[2], 10),
      b: parseInt(m[3], 10),
      a: m[4] !== undefined ? parseFloat(m[4]) : 1
    };
  }

  function colorLuminance(c) {
    return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255;
  }

  function isPurpleBrandBg(c) {
    if (!c || c.a <= 0.25) return false;
    return c.b >= 100 && (c.b - c.g) >= 55 && c.r < 195 && colorLuminance(c) < 0.55;
  }

  function hasPurpleGradientBg(cs) {
    if (!cs || !cs.backgroundImage || cs.backgroundImage === "none") return false;
    return /(?:rgb\\(\\s*(?:12[0-9]|13[0-9]|7[0-9]|8[0-9]|16[0-9])\\s*,\\s*[0-6][0-9]?\\s*,\\s*(?:12[0-9]|14[0-9]|20[0-9]|24[0-9])|#800080|#8100d1|#a23bf0|#4b1f8f|#7b3fdb)/i.test(cs.backgroundImage);
  }

  function isYellowAccentColor(c) {
    if (!c) return false;
    return c.r > 165 && c.g > 120 && c.b < 115;
  }

  function setButtonWhiteText(el) {
    if (!el || !el.style) return;
    el.style.setProperty("color", "#FFFFFF", "important");
    if (el.querySelectorAll) {
      var kids = el.querySelectorAll("*");
      for (var k = 0; k < kids.length; k++) {
        if (kids[k].tagName !== "SVG" && (!kids[k].closest || !kids[k].closest("svg"))) {
          kids[k].style.setProperty("color", "#FFFFFF", "important");
        }
      }
    }
  }

  function normalizeUnlockedTheme() {
    if (typeof document === "undefined" || !document.body) return;
    ensureDarkThemeStyles();
    if (typeof window === "undefined" || typeof window.getComputedStyle !== "function") return;

    var SKIP_TAGS = {
      SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, IMG: 1, SVG: 1, PATH: 1, CIRCLE: 1,
      RECT: 1, POLYGON: 1, LINE: 1, ELLIPSE: 1, G: 1, DEFS: 1,
      LINEARGRADIENT: 1, STOP: 1, PICTURE: 1, SOURCE: 1, VIDEO: 1, CANVAS: 1, BR: 1, HR: 1
    };

    var allEls = document.body.querySelectorAll("*");
    for (var i = 0; i < allEls.length; i++) {
      var el = allEls[i];
      if (!el || SKIP_TAGS[el.tagName]) continue;
      if (el.closest && el.closest("svg, .lirva-cat-thumb-frame, .lirva-cat-hero-frame, .lirva-aff-mode-grid, .lirva-aff-mode-card, .lirva-style-preview, .lirva-bot1-mode-box, .lirva-bot1-mode-btn, .lirva-bot1-feedback-area, .lirva-bot1-manual-wrap, .lirva-bot1-select-btn, [data-lirva-bot1-action], #lirva-drama-style-section, #lirva-drama-story-mode-section, [data-lirva-theme-group], [data-lirva-theme-chip], [data-lirva-global-group], [data-lirva-global-option]")) continue;
      if (el.querySelector && el.querySelector("[data-lirva-global-option]")) continue;

      var cs = null;
      try { cs = window.getComputedStyle(el); } catch (_) { cs = null; }
      if (!cs) continue;

      var bg = parseCssColor(cs.backgroundColor);
      var fg = parseCssColor(cs.color);
      var bc = parseCssColor(cs.borderColor);

      var btnTxt = (el.textContent || "").trim();
      var clsId = String(el.className || "") + " " + String(el.id || "");
      var isLinkBtn = el.tagName === "A" && (
        /(btn|cta|copy|open|primary|active|selected)/i.test(clsId) ||
        isPurpleBrandBg(bg) ||
        hasPurpleGradientBg(cs) ||
        (btnTxt.length > 0 && btnTxt.length <= 48 && /^(?:kopyahin|copy|buksan|pumasok)\\b/i.test(btnTxt))
      );
      var role = el.getAttribute ? (el.getAttribute("role") || "") : "";
      var isStatefulToggle = role === "tab" || role === "radio" || (el.hasAttribute && (el.hasAttribute("aria-pressed") || el.hasAttribute("aria-checked") || el.hasAttribute("aria-selected"))) || /\\b(pill|chip|tag|tab|tab-btn|nav-btn|nav-item|seg|toggle|opt|option)\\b/i.test(String(el.className || ""));
      var isControl = el.tagName === "BUTTON" || isLinkBtn || role === "button" || role === "tab" || (el.getAttribute && el.getAttribute("aria-selected") === "true");
      var isCtaBtn = isControl && !isStatefulToggle && (
        /kopyahin|copy|buksan|pumasok/i.test(btnTxt) ||
        /\\b(primary|copy|submit|cta|btn-primary|open-btn|btn-open|copy-btn|btn-copy)\\b/i.test(clsId) ||
        el.id === "copy" || el.id === "copyBtn"
      );

      // Never determine selection or stamp sticky inline #800080 onto stateful toggles/tabs/pills/chips;
      // only style genuine non-toggling CTA action buttons inline when needed.
      var isPurple = isCtaBtn && (!el.closest("nav, .nav, .navbar, .topbar, [role='tablist']"));

      if (isPurple) {
        el.style.setProperty("background-color", "#800080", "important");
        el.style.setProperty("background-image", "none", "important");
        el.style.setProperty("border-color", "#800080", "important");
        setButtonWhiteText(el);
        continue;
      }

      // Remove any leftover light / ivory backgrounds on dark surfaces
      if (bg && bg.a > 0.2 && !isPurple && colorLuminance(bg) > 0.52) {
        var tag = el.tagName;
        var targetBg = tag === "MAIN" ? "#121015" : ((tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "PRE" || tag === "CODE" || tag === "BUTTON") ? "#18141E" : "#211C27");
        el.style.setProperty("background-color", targetBg, "important");
        bg = parseCssColor(targetBg === "#121015" ? "rgb(18,16,21)" : (targetBg === "#18141E" ? "rgb(24,20,30)" : "rgb(33,28,39)"));
      }

      // Remove leftover dark purple borders or overly light borders
      if (bc && bc.a > 0.1 && !isPurpleBrandBg(bc)) {
        var bcLum = colorLuminance(bc);
        if (bcLum > 0.58 || bcLum < 0.15) {
          el.style.setProperty("border-color", "#514459", "important");
        }
      }

      var effBg = (bg && bg.a > 0.25) ? bg : null;
      if (!effBg) {
        var anc = el.parentElement;
        while (anc && anc !== document.documentElement) {
          try {
            var acs = window.getComputedStyle(anc);
            var abg = acs ? parseCssColor(acs.backgroundColor) : null;
            if (abg && abg.a > 0.25) {
              effBg = abg;
              break;
            }
          } catch (_) {}
          anc = anc.parentElement;
        }
      }

      var onPurple = effBg ? isPurpleBrandBg(effBg) : isPurple;
      var effLum = effBg ? colorLuminance(effBg) : 0.08;

      if (onPurple && !isStatefulToggle) {
        setButtonWhiteText(el);
      } else if (effLum < 0.45 && fg && !isStatefulToggle) {
        if (isYellowAccentColor(fg)) {
          el.style.setProperty("color", "#C9A7F6", "important");
        } else if (colorLuminance(fg) < 0.45) {
          var isMutedLike = el.tagName === "SMALL" || el.tagName === "P" || /muted|hint|help|sub|desc/i.test(String(el.className || ""));
          el.style.setProperty("color", isMutedLike ? "#C4BDCC" : "#FAF7FF", "important");
        }
      }
    }
  }

  function ensureAffiliateModeStyles() {
    if (typeof document === "undefined") return;
    var existing = document.getElementById("lirva-aff-mode-styles");
    var parent = document.head || document.documentElement || document.body;
    if (existing) {
      if (parent && parent.lastChild !== existing && parent.appendChild) {
        parent.appendChild(existing);
      }
      return;
    }
    var style = document.createElement("style");
    style.id = "lirva-aff-mode-styles";
    style.textContent = [
      ".lirva-aff-mode-grid {",
      "  display: grid !important;",
      "  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;",
      "  gap: 16px !important;",
      "  width: 100% !important;",
      "  align-items: stretch !important;",
      "  margin-top: 10px !important;",
      "}",
      ".lirva-aff-mode-slot {",
      "  display: flex !important;",
      "  min-width: 0 !important;",
      "}",
      ".lirva-aff-mode-grid .lirva-aff-mode-card[data-lirva-aff-mode] {",
      "  position: relative !important;",
      "  display: flex !important;",
      "  flex-direction: column !important;",
      "  align-items: stretch !important;",
      "  justify-content: flex-start !important;",
      "  width: 100% !important;",
      "  max-width: none !important;",
      "  height: auto !important;",
      "  max-height: none !important;",
      "  min-width: 0 !important;",
      "  min-height: 0 !important;",
      "  padding: 14px !important;",
      "  margin: 0 !important;",
      "  border-radius: 14px !important;",
      "  border: 1.5px solid #514459 !important;",
      "  background: #211C27 !important;",
      "  background-color: #211C27 !important;",
      "  background-image: none !important;",
      "  color: #FAF7FF !important;",
      "  text-align: left !important;",
      "  text-transform: none !important;",
      "  letter-spacing: normal !important;",
      "  font: inherit !important;",
      "  white-space: normal !important;",
      "  overflow: visible !important;",
      "  cursor: pointer !important;",
      "  box-shadow: none !important;",
      "  box-sizing: border-box !important;",
      "  transition: border-color 0.18s ease, background-color 0.18s ease, transform 0.15s ease, box-shadow 0.18s ease !important;",
      "}",
      ".lirva-aff-mode-grid .lirva-aff-mode-card[data-lirva-aff-mode]:not(.lirva-aff-selected):hover {",
      "  border-color: #C9A7F6 !important;",
      "  background: #282130 !important;",
      "  background-color: #282130 !important;",
      "  transform: translateY(-2px);",
      "}",
      ".lirva-aff-mode-grid .lirva-aff-mode-card[data-lirva-aff-mode]:focus-visible {",
      "  outline: 2px solid #C9A7F6 !important;",
      "  outline-offset: 2px !important;",
      "}",
      ".lirva-aff-mode-grid .lirva-aff-mode-card.lirva-aff-selected[data-lirva-aff-mode] {",
      "  border: 2px solid #C9A7F6 !important;",
      "  background: rgba(128, 0, 128, 0.22) !important;",
      "  background-color: rgba(128, 0, 128, 0.22) !important;",
      "  color: #FAF7FF !important;",
      "  box-shadow: 0 0 0 1px rgba(201, 167, 246, 0.35), 0 10px 24px -14px rgba(128, 0, 128, 0.65) !important;",
      "}",
      ".lirva-aff-mode-img-wrap {",
      "  display: block !important;",
      "  width: 100% !important;",
      "  aspect-ratio: 1024 / 572 !important;",
      "  height: auto !important;",
      "  margin: 0 0 12px 0 !important;",
      "  padding: 0 !important;",
      "  border-radius: 10px !important;",
      "  border: 1px solid #514459 !important;",
      "  background: #18141E !important;",
      "  overflow: hidden !important;",
      "  flex-shrink: 0 !important;",
      "  box-sizing: border-box !important;",
      "}",
      ".lirva-aff-mode-img {",
      "  display: block !important;",
      "  width: 100% !important;",
      "  height: 100% !important;",
      "  max-width: 100% !important;",
      "  max-height: 100% !important;",
      "  object-fit: contain !important;",
      "  object-position: center center !important;",
      "  margin: 0 !important;",
      "  padding: 0 !important;",
      "  border: 0 !important;",
      "  filter: none !important;",
      "}",
      ".lirva-aff-mode-body {",
      "  display: flex !important;",
      "  flex-direction: column !important;",
      "  flex: 1 1 auto !important;",
      "  gap: 6px !important;",
      "  width: 100% !important;",
      "}",
      ".lirva-aff-mode-head {",
      "  display: flex !important;",
      "  align-items: center !important;",
      "  justify-content: space-between !important;",
      "  gap: 10px !important;",
      "  flex-wrap: wrap !important;",
      "}",
      ".lirva-aff-mode-title {",
      "  font-size: 16px !important;",
      "  font-weight: 700 !important;",
      "  line-height: 1.3 !important;",
      "  color: #FAF7FF !important;",
      "}",
      ".lirva-aff-mode-badge {",
      "  display: none !important;",
      "  align-items: center !important;",
      "  padding: 3px 9px !important;",
      "  border-radius: 999px !important;",
      "  background: #800080 !important;",
      "  color: #FFFFFF !important;",
      "  font-size: 11px !important;",
      "  font-weight: 700 !important;",
      "  line-height: 1.2 !important;",
      "  white-space: nowrap !important;",
      "}",
      ".lirva-aff-mode-card.lirva-aff-selected .lirva-aff-mode-badge {",
      "  display: inline-flex !important;",
      "}",
      ".lirva-aff-mode-desc {",
      "  font-size: 13px !important;",
      "  line-height: 1.48 !important;",
      "  color: #C4BDCC !important;",
      "  flex: 1 1 auto !important;",
      "}",
      ".lirva-aff-mode-cta {",
      "  margin-top: 4px !important;",
      "  font-size: 12px !important;",
      "  font-weight: 700 !important;",
      "  color: #C9A7F6 !important;",
      "}",
      ".lirva-aff-mode-card.lirva-aff-selected .lirva-aff-mode-cta {",
      "  display: none !important;",
      "}",
      ".lirva-aff-sr-only {",
      "  position: absolute !important;",
      "  width: 1px !important;",
      "  height: 1px !important;",
      "  padding: 0 !important;",
      "  margin: -1px !important;",
      "  overflow: hidden !important;",
      "  clip: rect(0, 0, 0, 0) !important;",
      "  white-space: nowrap !important;",
      "  border: 0 !important;",
      "  pointer-events: none !important;",
      "}",
      "@media (max-width: 640px) {",
      "  .lirva-aff-mode-grid {",
      "    grid-template-columns: 1fr !important;",
      "  }",
      "}"
    ].join("\\n");
    if (parent && parent.appendChild) parent.appendChild(style);
  }

  function getAffSpacedText(el) {
    if (!el) return "";
    var parts = [];
    function collect(n) {
      if (!n) return;
      if (n.nodeType === 3) {
        var tv = (n.nodeValue || "").trim();
        if (tv) parts.push(tv);
        return;
      }
      if (n.nodeType !== 1) return;
      if (n.tagName === "SCRIPT" || n.tagName === "STYLE" || n.tagName === "NOSCRIPT" || n.tagName === "SVG") return;
      if (n.childNodes && n.childNodes.length > 0) {
        for (var c = 0; c < n.childNodes.length; c++) collect(n.childNodes[c]);
      } else if (n.textContent) {
        var fallbackTxt = String(n.textContent).trim();
        if (fallbackTxt) parts.push(fallbackTxt);
      }
    }
    collect(el);
    return parts.join(" ").replace(/\\s+/g, " ").trim();
  }

  function stripLeadingDecor(str) {
    return String(str || "").replace(/^[^a-zA-Z0-9]+/, "").replace(/^[0-9]+[.)\\-:\\s]+/, "").trim();
  }

  function isAffTopNavLike(el) {
    if (!el) return true;
    if (el.closest && el.closest("nav, header, footer, aside, [role='navigation'], .navbar, .topbar, .footer, .sidebar, .menu, #lirva-drama-style-section, #lirva-drama-story-mode-section, [data-lirva-thumb-done], .lirva-cat-hero-frame, #out, .prompt-box, pre, code")) {
      return true;
    }
    var txt = getAffSpacedText(el);
    if (txt.length < 400 && /AI\\s*Drama/i.test(txt) && /AI\\s*Podcast/i.test(txt)) return true;
    return false;
  }

  function detectControlSelectedSignal(ctrl) {
    if (!ctrl) return false;
    var ariaSel = ctrl.getAttribute ? ctrl.getAttribute("aria-selected") : null;
    if (ariaSel === "true") return true;
    var cls = typeof ctrl.className === "string" ? ctrl.className : "";
    if (/\\b(active|is-active|selected|is-selected|current|checked)\\b/i.test(cls)) return true;
    var inp = ctrl.querySelector ? ctrl.querySelector("input[type='radio'], input[type='checkbox']") : null;
    if (inp && inp.checked) return true;
    return false;
  }

  function isAffPanelVisible(el) {
    if (!el) return false;
    var cur = el;
    while (cur && cur !== document.documentElement) {
      if (cur.hasAttribute && cur.hasAttribute("hidden")) return false;
      if (cur.getAttribute && cur.getAttribute("aria-hidden") === "true") return false;
      if (cur.style && (cur.style.display === "none" || cur.style.visibility === "hidden")) return false;
      try {
        if (typeof window !== "undefined" && window.getComputedStyle) {
          var cs = window.getComputedStyle(cur);
          if (cs && (cs.display === "none" || cs.visibility === "hidden")) return false;
        }
      } catch (_) {}
      cur = cur.parentElement;
    }
    return true;
  }

  function detectVisibleAffSectionMode(rootScope) {
    var scope = rootScope || document;
    var botsVisible = false;
    var promptsVisible = false;
    var headings = scope.querySelectorAll ? scope.querySelectorAll("h1, h2, h3, h4, h5, strong, .bot-title, .title, label, legend") : [];
    for (var i = 0; i < headings.length; i++) {
      var h = headings[i];
      if (!h || (h.closest && h.closest(".lirva-aff-mode-grid, nav, header, footer, .topbar, .navbar"))) continue;
      var t = getAffSpacedText(h);
      if (!t || t.length > 180) continue;
      if ((/\\bBot\\s*[123]\\b|Lirva\\s+AI\\s+Affiliate/i.test(t)) && isAffPanelVisible(h)) {
        botsVisible = true;
      }
      if ((/\\b(?:Video\\s*Style|Pumili\\s+ng\\s+(?:video\\s+)?style|Style\\s+ng\\s+Video|Product\\s+Name|Pangalan\\s+ng\\s+Produkto|37\\s+styles?)\\b/i.test(t) || h.id === "out") && isAffPanelVisible(h)) {
        promptsVisible = true;
      }
    }
    var promptEls = scope.querySelectorAll ? scope.querySelectorAll("#out, .prompt-box, textarea") : [];
    for (var pe = 0; pe < promptEls.length; pe++) {
      var pel = promptEls[pe];
      if (!pel || (pel.closest && pel.closest(".lirva-aff-mode-grid, nav, header, footer, .topbar, .navbar, .lirva-bot1-feedback-area, .lirva-bot1-mode-box, [data-lirva-bot1-card='true'], [data-lirva-bot-card='true'], #lirva-drama-style-section, #lirva-drama-story-mode-section"))) continue;
      if (isAffPanelVisible(pel)) {
        promptsVisible = true;
        break;
      }
    }
    if (botsVisible && !promptsVisible) return "bots";
    if (promptsVisible && !botsVisible) return "prompts";
    return null;
  }

  function syncAffiliateModeCards() {
    if (typeof document === "undefined") return;
    var grids = document.querySelectorAll(".lirva-aff-mode-grid");
    for (var g = 0; g < grids.length; g++) {
      var grid = grids[g];
      var promptsCard = grid.querySelector("[data-lirva-aff-mode='prompts']");
      var botsCard = grid.querySelector("[data-lirva-aff-mode='bots']");
      if (!promptsCard || !botsCard) continue;

      var activeMode = null;
      var rootScope = grid.closest("section, main, .panel, .tab-pane, .view, .page") || document;
      activeMode = detectVisibleAffSectionMode(rootScope);

      if (!activeMode) {
        var pSig = detectControlSelectedSignal(promptsCard);
        var bSig = detectControlSelectedSignal(botsCard);
        if (bSig && !pSig) activeMode = "bots";
        else if (pSig && !bSig) activeMode = "prompts";
      }
      if (!activeMode && typeof window !== "undefined" && window.__lirvaAffiliateActiveMode) {
        activeMode = window.__lirvaAffiliateActiveMode;
      }
      if (!activeMode) activeMode = "prompts";

      var pairs = [
        { card: promptsCard, key: "prompts" },
        { card: botsCard, key: "bots" }
      ];
      for (var pi = 0; pi < pairs.length; pi++) {
        var isSel = activeMode === pairs[pi].key;
        var card = pairs[pi].card;
        if (isSel) {
          card.classList.add("lirva-aff-selected");
        } else {
          card.classList.remove("lirva-aff-selected");
        }
        card.setAttribute("aria-pressed", isSel ? "true" : "false");
        if (card.getAttribute("role") === "tab") {
          card.setAttribute("aria-selected", isSel ? "true" : "false");
        }
      }
    }
  }

  function extractExistingTitleAndDesc(ctrl, fallbackTitle, fallbackDesc) {
    if (!ctrl || ctrl.querySelector(".lirva-aff-mode-img")) {
      return { title: fallbackTitle, desc: fallbackDesc };
    }
    var foundTitle = "";
    var foundDesc = "";
    var titleEl = ctrl.querySelector ? ctrl.querySelector("h1, h2, h3, h4, h5, h6, strong, b, [class*='title' i], [class*='head' i], [class*='name' i]") : null;
    if (titleEl) {
      foundTitle = stripLeadingDecor(getAffSpacedText(titleEl));
    }
    var descEl = ctrl.querySelector ? ctrl.querySelector("p, small, [class*='desc' i], [class*='sub' i], [class*='copy' i]") : null;
    if (descEl) {
      foundDesc = getAffSpacedText(descEl);
    }
    if (!foundDesc && ctrl.children && ctrl.children.length >= 2) {
      var texts = [];
      for (var i = 0; i < ctrl.children.length; i++) {
        var ct = getAffSpacedText(ctrl.children[i]);
        if (ct) texts.push(ct);
      }
      if (!foundTitle && texts.length >= 1) foundTitle = stripLeadingDecor(texts[0]);
      if (texts.length >= 2) {
        var rest = texts.slice(1).join(" ").trim();
        if (rest && rest !== foundTitle && rest.length >= 12) foundDesc = rest;
      }
    }
    return {
      title: (foundTitle && foundTitle.length <= 36 && /(?:Prompts?|Lirva\\s*Bots?)/i.test(foundTitle)) ? foundTitle : fallbackTitle,
      desc: (foundDesc && foundDesc.length >= 12) ? foundDesc : fallbackDesc
    };
  }

  function upgradeSingleAffiliateCard(ctrl, cfg) {
    if (!ctrl) return;
    if (ctrl.getAttribute("data-lirva-aff-mode") === cfg.key && ctrl.querySelector(".lirva-aff-mode-img")) {
      return;
    }

    var resolved = extractExistingTitleAndDesc(ctrl, cfg.title, cfg.desc);

    var preservedInputs = [];
    if (ctrl.querySelectorAll) {
      var inputs = ctrl.querySelectorAll("input");
      for (var ii = 0; ii < inputs.length; ii++) {
        inputs[ii].classList.add("lirva-aff-sr-only");
        preservedInputs.push(inputs[ii]);
      }
    }

    while (ctrl.firstChild) {
      ctrl.removeChild(ctrl.firstChild);
    }
    for (var pi = 0; pi < preservedInputs.length; pi++) {
      ctrl.appendChild(preservedInputs[pi]);
    }

    if (ctrl.style && ctrl.style.removeProperty) {
      ctrl.style.removeProperty("background");
      ctrl.style.removeProperty("background-color");
      ctrl.style.removeProperty("background-image");
      ctrl.style.removeProperty("border-color");
      ctrl.style.removeProperty("color");
      ctrl.style.removeProperty("width");
      ctrl.style.removeProperty("height");
      ctrl.style.removeProperty("min-width");
      ctrl.style.removeProperty("max-width");
    }

    ctrl.classList.add("lirva-aff-mode-card");
    ctrl.setAttribute("data-lirva-aff-mode", cfg.key);
    if (ctrl.tagName !== "BUTTON" && !ctrl.getAttribute("role")) {
      ctrl.setAttribute("role", "button");
    }
    if (ctrl.tagName !== "BUTTON" && ctrl.tagName !== "A" && !ctrl.hasAttribute("tabindex")) {
      ctrl.setAttribute("tabindex", "0");
    }
    ctrl.setAttribute("aria-label", resolved.title + " — " + resolved.desc);

    var imgWrap = document.createElement("span");
    imgWrap.className = "lirva-aff-mode-img-wrap";

    var img = document.createElement("img");
    img.className = "lirva-aff-mode-img";
    img.src = cfg.imgSrc;
    img.alt = cfg.imgAlt;
    img.loading = "eager";
    img.decoding = "async";
    imgWrap.appendChild(img);

    var body = document.createElement("span");
    body.className = "lirva-aff-mode-body";

    var head = document.createElement("span");
    head.className = "lirva-aff-mode-head";

    var titleEl = document.createElement("span");
    titleEl.className = "lirva-aff-mode-title";
    titleEl.textContent = resolved.title;

    var badgeEl = document.createElement("span");
    badgeEl.className = "lirva-aff-mode-badge";
    badgeEl.textContent = "Napili na \\u2713";

    head.appendChild(titleEl);
    head.appendChild(badgeEl);

    var descEl = document.createElement("span");
    descEl.className = "lirva-aff-mode-desc";
    descEl.textContent = resolved.desc;

    var ctaEl = document.createElement("span");
    ctaEl.className = "lirva-aff-mode-cta";
    ctaEl.textContent = "Piliin ito \\u2192";

    body.appendChild(head);
    body.appendChild(descEl);
    body.appendChild(ctaEl);

    ctrl.appendChild(imgWrap);
    ctrl.appendChild(body);

    if (!ctrl.getAttribute("data-lirva-aff-bound")) {
      ctrl.setAttribute("data-lirva-aff-bound", "1");
      ctrl.addEventListener("click", function(ev) {
        if (typeof window !== "undefined") {
          window.__lirvaAffiliateActiveMode = cfg.key;
        }
        var radio = ctrl.querySelector("input[type='radio']");
        if (radio && ev && ev.target !== radio && ctrl.tagName !== "LABEL" && !radio.checked) {
          radio.checked = true;
          try { radio.dispatchEvent(new Event("change", { bubbles: true })); } catch (_) {}
        }
        syncAffiliateModeCards();
        setTimeout(syncAffiliateModeCards, 20);
        setTimeout(syncAffiliateModeCards, 80);
      });
      ctrl.addEventListener("keydown", function(e) {
        var k = e.key || "";
        if (k === "Enter" || k === " " || k === "Spacebar") {
          if (ctrl.tagName === "BUTTON") return;
          if (ctrl.tagName === "A" && k === "Enter") return;
          e.preventDefault();
          ctrl.click();
        }
      });
    }
  }

  function classifyAffModeControl(el) {
    if (!el || isAffTopNavLike(el)) return null;
    if (el.closest && el.closest(".lirva-aff-mode-card, [data-lirva-bot1-card='true'], [data-lirva-bot-card='true'], [data-lirva-bot-role], .lirva-bot1-mode-box, .lirva-bot1-feedback-area, .lirva-bots-grid") && el.closest(".lirva-aff-mode-card") !== el) return null;
    if (el.getAttribute && (el.getAttribute("data-lirva-bot1-card") === "true" || el.getAttribute("data-lirva-bot-card") === "true" || el.getAttribute("data-lirva-bot-role") || el.getAttribute("data-lirva-bot1-action"))) return null;
    var elCls = typeof el.className === "string" ? el.className : "";
    var elMeta = ((el.id || "") + " " + elCls).trim();
    if (/\\b(?:bot[-_ ]?card|gpt[-_ ]?card|bots[-_ ]?grid|bot[-_ ]?[123]|gpt[-_ ]?[123]|lirva[-_ ]?bot1)\\b/i.test(elMeta)) return null;
    if (el.querySelector && !el.getAttribute("data-lirva-aff-mode")) {
      if (el.querySelector("form, select, textarea, pre, code, #out, .prompt-box, .lirva-cat-thumb-frame, .lirva-cat-hero-frame, [data-lirva-bot1-card='true'], [data-lirva-bot1-action], [data-lirva-bot-role], .lirva-bot1-mode-box, .lirva-bot1-feedback-area, a[href*='chatgpt.com/g/']")) return null;
    }

    var attrMode = el.getAttribute ? el.getAttribute("data-lirva-aff-mode") : "";
    if (attrMode === "prompts" || attrMode === "bots") {
      return { key: attrMode, score: 200 };
    }

    var spaced = getAffSpacedText(el);
    if (!spaced || spaced.length > 260) return null;
    if (/(?:Lirva\\s+AI\\s+Affiliate|\\b(?:Lirva\\s*)?(?:Bot|GPT)\\s*#?[123]\\b|\\b(?:1\\.\\s*Planuhin|2\\.\\s*I-check|3\\.\\s*Suriin)\\b|any\\s+generated\\s+discr|Kopyahin\\s+ang\\s+instructions|Copy\\s+instructions|Buksan\\s+sa\\s+(?:ChatGPT|Gemini)|Open\\s+(?:ChatGPT|Gemini))/i.test(spaced)) {
      return null;
    }

    var isInteractive = el.tagName === "BUTTON" || el.tagName === "A" || el.tagName === "LABEL" ||
      (el.hasAttribute && el.hasAttribute("onclick")) ||
      (el.getAttribute && (el.getAttribute("role") === "button" || el.getAttribute("role") === "tab")) ||
      /\\b(mode[-_]?(?:btn|card|opt|choice)|tab|btn|pill|card|choice|option)\\b/i.test(elCls);

    var leadEl = el.querySelector ? el.querySelector("h1, h2, h3, h4, h5, h6, strong, b, [class*='title' i], [class*='head' i], [class*='name' i]") : null;
    var leadRaw = leadEl ? getAffSpacedText(leadEl) : "";
    if (!leadRaw && el.children && el.children.length > 0) {
      for (var ci = 0; ci < el.children.length; ci++) {
        var ct = getAffSpacedText(el.children[ci]);
        if (ct) { leadRaw = ct; break; }
      }
    }
    var lead = stripLeadingDecor(leadRaw || spaced.slice(0, 64));
    var spacedClean = stripLeadingDecor(spaced);

    var matchesPrompts = /^(?:AI\\s*)?Prompts?\\b/i.test(lead) || (isInteractive && /^(?:AI\\s*)?Prompts?\\b/i.test(spacedClean));
    var matchesBots = /^(?:3\\s*)?Lirva\\s*Bots\\b/i.test(lead) || (isInteractive && /^(?:3\\s*)?Lirva\\s*Bots\\b/i.test(spacedClean));

    if (!matchesPrompts && !matchesBots && isInteractive && spaced.length <= 220) {
      var hasBotsKw = /\\bLirva\\s*Bots\\b/i.test(spaced);
      var hasPromptsKw = /^\\s*(?:AI\\s*)?Prompts?\\b|\\bPrompts?\\s+(?:mode|style|37)\\b/i.test(spaced);
      if (hasBotsKw && !/^Prompts?\\b/i.test(lead)) matchesBots = true;
      else if (hasPromptsKw && !hasBotsKw) matchesPrompts = true;
    }

    if (matchesPrompts && matchesBots) return null;
    if (matchesPrompts && /Lirva\\s*Bots/i.test(lead)) return null;
    if (matchesBots && /^Prompts?\\b/i.test(lead)) return null;

    if (!isInteractive && spaced.length > 36) return null;

    if (matchesPrompts) {
      var ps = (isInteractive ? 100 : 10) + (el.tagName === "BUTTON" ? 20 : 0) + (/^Prompts?$/i.test(lead) ? 20 : 0);
      return { key: "prompts", score: ps };
    }
    if (matchesBots) {
      var bs = (isInteractive ? 100 : 10) + (el.tagName === "BUTTON" ? 20 : 0) + (/^Lirva\\s*Bots$/i.test(lead) ? 20 : 0);
      return { key: "bots", score: bs };
    }
    return null;
  }

  function findAffModeControlsIn(scope) {
    if (!scope || !scope.querySelectorAll) return null;
    var cands = scope.querySelectorAll("[data-lirva-aff-mode], button, [role='button'], [role='tab'], a, label, [onclick], [class*='mode' i], [class*='card' i], [class*='tab' i], [class*='btn' i], [class*='opt' i], [class*='choice' i], [class*='pill' i], div, span");
    var promptsCtrl = null;
    var botsCtrl = null;
    var promptsScore = -1;
    var botsScore = -1;

    for (var i = 0; i < cands.length; i++) {
      var el = cands[i];
      var info = classifyAffModeControl(el);
      if (!info) continue;
      if (info.key === "prompts" && info.score > promptsScore) {
        promptsScore = info.score;
        promptsCtrl = el;
      } else if (info.key === "bots" && info.score > botsScore) {
        botsScore = info.score;
        botsCtrl = el;
      }
    }

    if (!promptsCtrl || !botsCtrl || promptsCtrl === botsCtrl) return null;
    if (promptsCtrl.contains(botsCtrl) || botsCtrl.contains(promptsCtrl)) return null;
    return { promptsCtrl: promptsCtrl, botsCtrl: botsCtrl };
  }

  function upgradeAffiliateModeSelectors() {
    if (typeof document === "undefined" || !document.body) return;
    ensureAffiliateModeStyles();

    var pair = null;
    var headingCandidates = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, label, legend, strong, b, span, div");
    var headingMatches = [];

    for (var hi = 0; hi < headingCandidates.length; hi++) {
      var hc = headingCandidates[hi];
      if (!hc || isAffTopNavLike(hc)) continue;
      if (hc.closest && hc.closest(".lirva-aff-mode-grid, [data-lirva-bot1-card='true'], .lirva-bots-grid")) continue;
      var ht = getAffSpacedText(hc);
      if (ht.length <= 120 && /Paano\\s+mo\\s+gustong/i.test(ht)) {
        headingMatches.push({ el: hc, len: ht.length, exact: /Paano\\s+mo\\s+gustong\\s+gawin/i.test(ht) ? 1 : 0 });
      }
    }
    headingMatches.sort(function(a, b) {
      if (b.exact !== a.exact) return b.exact - a.exact;
      return a.len - b.len;
    });

    for (var hm = 0; hm < headingMatches.length && !pair; hm++) {
      var curScope = headingMatches[hm].el.parentElement;
      for (var step = 0; step < 7 && curScope && curScope !== document.body && curScope !== document.documentElement; step++) {
        if (curScope.tagName === "NAV" || curScope.tagName === "HEADER" || curScope.tagName === "FOOTER") break;
        pair = findAffModeControlsIn(curScope);
        if (pair) break;
        curScope = curScope.parentElement;
      }
    }

    if (!pair) {
      var affScopes = document.querySelectorAll("section, main, article, [data-cat='affiliate'], [data-category='affiliate'], [data-view], [data-tab], [data-section], [id*='aff' i], [class*='aff' i], .panel, .card, .tab-pane, .view, .page");
      var bestPair = null;
      var bestScopeTextLen = 999999;
      for (var si = 0; si < affScopes.length; si++) {
        if (isAffTopNavLike(affScopes[si])) continue;
        if (affScopes[si].className && typeof affScopes[si].className === "string" && /lirva-bots-grid|bot-card/i.test(affScopes[si].className)) continue;
        var candPair = findAffModeControlsIn(affScopes[si]);
        if (candPair) {
          var sLen = getAffSpacedText(affScopes[si]).length;
          if (sLen < bestScopeTextLen) {
            bestScopeTextLen = sLen;
            bestPair = candPair;
          }
        }
      }
      pair = bestPair;
    }

    if (!pair) return;

    var promptsCtrl = pair.promptsCtrl;
    var botsCtrl = pair.botsCtrl;

    // Locate common ancestor container holding both controls
    var switchContainer = promptsCtrl.parentElement;
    while (switchContainer && switchContainer !== document.body && !switchContainer.contains(botsCtrl)) {
      switchContainer = switchContainer.parentElement;
    }
    if (!switchContainer || switchContainer === document.body) return;

    var promptsSlot = promptsCtrl;
    while (promptsSlot && promptsSlot.parentElement !== switchContainer) {
      promptsSlot = promptsSlot.parentElement;
    }
    var botsSlot = botsCtrl;
    while (botsSlot && botsSlot.parentElement !== switchContainer) {
      botsSlot = botsSlot.parentElement;
    }
    if (!promptsSlot || !botsSlot || promptsSlot === botsSlot) return;

    // If a slot wraps a button plus an adjacent description element (e.g., <div class="col"><button>Prompts</button><p>...</p></div>),
    // pull the adjacent description text into the card fallback and hide the redundant sibling inside the slot.
    function absorbSlotSiblingDesc(slot, ctrl, defaultDesc) {
      if (!slot || slot === ctrl || ctrl.querySelector(".lirva-aff-mode-img")) return defaultDesc;
      var kids = slot.children || [];
      var sibTexts = [];
      for (var ki = 0; ki < kids.length; ki++) {
        if (kids[ki] !== ctrl && !kids[ki].contains(ctrl)) {
          var st = getAffSpacedText(kids[ki]);
          if (st) sibTexts.push(st);
          if (kids[ki].style) kids[ki].style.setProperty("display", "none", "important");
        }
      }
      var joined = sibTexts.join(" ").trim();
      return (joined && joined.length >= 12) ? joined : defaultDesc;
    }

    var promptsFallbackDesc = absorbSlotSiblingDesc(promptsSlot, promptsCtrl, "Pumili ng style at buuin ang prompt na ipi-paste sa ChatGPT o Gemini.");
    var botsFallbackDesc = absorbSlotSiblingDesc(botsSlot, botsCtrl, "Magpagabay sa pagplano, pag-check ng video, at pagsusuri ng resulta gamit ang ChatGPT plugins.");

    if (!switchContainer.classList.contains("lirva-aff-mode-grid")) {
      var onlyTwoKids = switchContainer.children && switchContainer.children.length === 2;
      if (onlyTwoKids) {
        switchContainer.classList.add("lirva-aff-mode-grid");
      } else {
        var existingGrid = switchContainer.querySelector(".lirva-aff-mode-grid");
        if (!existingGrid) {
          existingGrid = document.createElement("div");
          existingGrid.className = "lirva-aff-mode-grid";
          switchContainer.insertBefore(existingGrid, promptsSlot);
          existingGrid.appendChild(promptsSlot);
          existingGrid.appendChild(botsSlot);
        }
      }
    }

    if (promptsSlot !== promptsCtrl) promptsSlot.classList.add("lirva-aff-mode-slot");
    if (botsSlot !== botsCtrl) botsSlot.classList.add("lirva-aff-mode-slot");

    upgradeSingleAffiliateCard(promptsCtrl, {
      key: "prompts",
      title: "Prompts",
      desc: promptsFallbackDesc,
      imgSrc: AFF_MODE_IMAGES.prompts,
      imgAlt: "37 VIDEO STYLES \\u2014 mga sample styles tulad ng Product showcase, Lifestyle, AI presenter, Story, Animated, at Motion graphics"
    });

    upgradeSingleAffiliateCard(botsCtrl, {
      key: "bots",
      title: "Lirva Bots",
      desc: botsFallbackDesc,
      imgSrc: AFF_MODE_IMAGES.bots,
      imgAlt: "3 LIRVA BOTS \\u2014 1. Planuhin, 2. I-check, 3. Suriin ang resulta"
    });

    syncAffiliateModeCards();
  }

  // Bot 1 Instruction Mode (Phone / Computer) & Mobile-Safe Copy Controller
  function ensureBot1CopyStyles() {
    if (typeof document === "undefined" || !document.head) return;
    var existing = document.getElementById("lirva-bot1-copy-style");
    var cssText =
      ".lirva-bot1-mode-box{margin:12px 0 10px;padding:12px;background:#18141E;border:1px solid #514459;border-radius:14px;display:flex;flex-direction:column;gap:8px;}" +
      ".lirva-bot1-mode-title{font-size:0.78rem;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:#C9A7F6;margin:0;}" +
      ".lirva-bot1-mode-group{display:grid;grid-template-columns:1fr 1fr;gap:8px;}" +
      ".lirva-bot1-mode-btn{appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 12px;border-radius:10px;border:1px solid #514459;background:#121015;color:#FAF7FF;font:700 0.88rem/1.2 'Manrope',system-ui,sans-serif;cursor:pointer;transition:background-color 0.15s ease,border-color 0.15s ease,color 0.15s ease;}" +
      ".lirva-bot1-mode-btn:hover{border-color:#C9A7F6;background:#211C27;}" +
      ".lirva-bot1-mode-btn:focus-visible{outline:2px solid #FAF7FF;outline-offset:2px;}" +
      ".lirva-bot1-mode-btn[aria-checked='true']{background:#800080;border:1.5px solid #C9A7F6;color:#FFFFFF;box-shadow:0 4px 12px rgba(0,0,0,0.35);}" +
      ".lirva-bot1-mode-btn[aria-checked='true']:hover{background:#800080;border-color:#FAF7FF;}" +
      ".lirva-bot1-mode-help{margin:0;display:flex;flex-direction:column;gap:3px;font-size:0.79rem;line-height:1.4;color:#C4BDCC;}" +
      ".lirva-bot1-mode-help-line{margin:0;}" +
      ".lirva-bot1-mode-help-line strong{color:#FAF7FF;font-weight:700;}" +
      ".lirva-bot1-feedback-area{margin-top:10px;display:flex;flex-direction:column;gap:8px;}" +
      ".lirva-bot1-status{font-size:0.86rem;line-height:1.45;font-weight:600;border-radius:10px;padding:8px 12px;display:none;}" +
      ".lirva-bot1-status[data-state='copied']{display:block;background:rgba(16,185,129,0.14);border:1px solid rgba(52,211,153,0.45);color:#A7F3D0;}" +
      ".lirva-bot1-status[data-state='failed']{display:block;background:rgba(248,113,113,0.14);border:1px solid rgba(252,165,165,0.45);color:#FECACA;}" +
      ".lirva-bot1-manual-wrap{display:none;background:#18141E;border:1px solid #514459;border-radius:14px;padding:12px;gap:8px;flex-direction:column;}" +
      ".lirva-bot1-manual-wrap[data-open='true']{display:flex;}" +
      ".lirva-bot1-manual-guide{margin:0;font-size:0.84rem;line-height:1.45;color:#FAF7FF;}" +
      ".lirva-bot1-manual-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center;}" +
      ".lirva-bot1-select-btn{appearance:none;background:#800080;color:#FFFFFF;border:1px solid #C9A7F6;border-radius:999px;padding:7px 14px;font:600 0.84rem/1.2 'Manrope',system-ui,sans-serif;cursor:pointer;}" +
      ".lirva-bot1-open-link{display:inline-flex;align-items:center;gap:6px;margin-top:6px;background:#800080;color:#FFFFFF;border:1px solid #C9A7F6;border-radius:999px;padding:7px 14px;font:600 0.84rem/1.2 'Manrope',system-ui,sans-serif;text-decoration:none;}" +
      ".lirva-bot1-manual-textarea{width:100%;min-height:140px;max-height:260px;background:#121015;color:#FAF7FF;border:1px solid #514459;border-radius:10px;padding:10px 12px;font:400 16px/1.5 'Manrope',ui-monospace,monospace;resize:vertical;-webkit-user-select:text;user-select:text;}";
    if (existing) {
      if (existing.textContent !== cssText) existing.textContent = cssText;
      return;
    }
    var st = document.createElement("style");
    st.id = "lirva-bot1-copy-style";
    st.textContent = cssText;
    document.head.appendChild(st);
  }

  function extractTextPreservingNewlines(node) {
    if (!node) return "";
    if (node.tagName === "TEXTAREA" || node.tagName === "INPUT") {
      return String(node.value || "").replace(/\\r\\n?/g, "\\n");
    }
    var parts = [];
    function walk(n) {
      if (!n) return;
      if (n.nodeType === 3) {
        parts.push(String(n.nodeValue || ""));
        return;
      }
      var tag = n.tagName ? String(n.tagName).toUpperCase() : "";
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "BUTTON") return;
      if (n.className && typeof n.className === "string" && (n.className.indexOf("lirva-bot1-feedback-area") !== -1 || n.className.indexOf("lirva-bot1-mode-box") !== -1)) return;
      if (tag === "BR") {
        parts.push("\\n");
        return;
      }
      var isBlock = /^(P|DIV|LI|TR|H[1-6]|SECTION|ARTICLE|PRE|BLOCKQUOTE)$/.test(tag);
      if (isBlock && parts.length > 0 && !/\\n$/.test(parts[parts.length - 1])) {
        parts.push("\\n");
      }
      var kids = n.childNodes || n.children || [];
      for (var i = 0; i < kids.length; i++) {
        walk(kids[i]);
      }
      if (isBlock && parts.length > 0 && !/\\n$/.test(parts[parts.length - 1])) {
        parts.push("\\n");
      }
    }
    if (node.childNodes && node.childNodes.length > 0) {
      walk(node);
      var walked = parts.join("").replace(/\\r\\n?/g, "\\n").replace(/\\n{3,}/g, "\\n\\n").replace(/^\\n+|\\n+$/g, "");
      if (walked) return walked;
    }
    return String(node.textContent || "").replace(/\\r\\n?/g, "\\n").replace(/^\\n+|\\n+$/g, "");
  }

  function isUrlOrButtonLabelOnly(txt, btn) {
    var t = String(txt || "").trim();
    if (!t || t.length < 35) return true;
    if (/^https?:\\/\\/\\S+$/i.test(t)) return true;
    if (/^(?:copy(?:\\s+(?:instructions?|prompt|text|all|&?\\s*open(?:\\s+(?:chatgpt|gemini))?))?|kopyahin(?:\\s+(?:ang\\s+instructions?|at\\s+buksan(?:\\s+sa\\s+(?:chatgpt|gemini))?))?|open\\s+(?:in\\s+)?(?:chatgpt|gemini)|buksan\\s+sa\\s+(?:chatgpt|gemini)|nakopya\\s+na(?:\\s*\\u2713)?!?|copied!?|select\\s+all|phone|computer)$/i.test(t)) return true;
    if (btn) {
      var bCur = btn.textContent ? String(btn.textContent).trim() : "";
      var bOrig = btn.getAttribute ? String(btn.getAttribute("data-lirva-orig-label") || "").trim() : "";
      if ((bCur && t === bCur) || (bOrig && t === bOrig)) return true;
    }
    return false;
  }

  function findBotCardContainer(el) {
    var cur = el;
    for (var d = 0; cur && d < 10; d++) {
      if (cur.getAttribute && (cur.getAttribute("data-lirva-bot1-card") === "true" || cur.getAttribute("data-lirva-bot-card") === "true" || cur.getAttribute("data-lirva-bot-role") === "bot1" || cur.getAttribute("data-lirva-manual-copy") === "true" || cur.getAttribute("data-lirva-bot1-mode-ui") === "true")) {
        return cur;
      }
      var idCls = ((cur.id || "") + " " + (typeof cur.className === "string" ? cur.className : "")).toLowerCase();
      if (/\\b(?:bot[-_ ]?[123]|gpt[-_ ]?[123]|lirva[-_ ]?bots?)\\b/.test(idCls)) {
        return cur;
      }
      cur = cur.parentElement;
    }
    return null;
  }

  function isProtectedBotContext(text, el) {
    if (typeof window !== "undefined" && (window.__lirvaBot1CopyActive || window.__lirvaBot1DirectWrite)) return true;
    if (el && el.getAttribute && el.getAttribute("data-lirva-bot1-action")) return true;
    if (el && findBotCardContainer(el)) return true;
    if (el && el.closest && el.closest(".lirva-bot1-feedback-area, .lirva-bot1-manual-wrap, .lirva-bot1-manual-textarea, .lirva-bot1-mode-box, [data-lirva-bot1-card='true'], [data-lirva-bot1-action]")) return true;
    if (typeof text === "string" && text.length > 0 && /(?:\\bbot\\s*#?1\\b|\\blirva\\s*bot\\s*1\\b|\\blirva\\s+ai\\s+affiliate\\b|\\bcustom\\s*gpt\\b|1\\.\\s*planuhin|lirva\\s+affiliate\\s+planner|affiliate\\s+product\\s+partner|any\\s+generated\\s+discr)/i.test(text)) {
      if (!/### PROJECT STATUS AND SELECTED OPTIONS|### SELECTED WORKSPACE SETTINGS/.test(text)) {
        return true;
      }
    }
    return false;
  }

  function isBot1PositiveHeading(hTxt) {
    return /Lirva\\s+AI\\s+Affiliate|Lirva\\s+Affiliate(?:\\s+Planner|\\s+Bot)?|\\b(?:Lirva\\s*)?Bot\\s*#?1\\b|\\bGPT\\s*#?1\\b|\\b1\\.\\s*Planuhin\\b/i.test(String(hTxt || ""));
  }

  function isOtherBotHeading(hTxt) {
    return /\\b(?:(?:Lirva\\s*)?Bot\\s*#?[23]|GPT\\s*#?[23]|2\\.\\s*I-check|3\\.\\s*Suriin(?:\\s+ang\\s+resulta)?)\\b/i.test(String(hTxt || ""));
  }

  function findBot1Cards() {
    if (typeof document === "undefined" || !document.querySelectorAll) return [];
    var explicitCards = document.querySelectorAll("[data-lirva-bot1-card='true'], [data-lirva-bot-role='bot1'], [data-lirva-bot-num='1']");
    var validExplicit = [];
    for (var ei = 0; ei < explicitCards.length; ei++) {
      var ec = explicitCards[ei];
      if (ec && ec.tagName !== "HTML" && ec.tagName !== "BODY" && ec.tagName !== "MAIN" && !(ec.querySelector && ec.querySelector("#out, #drama-out, form, .lirva-aff-mode-grid"))) {
        validExplicit.push(ec);
      }
    }
    var candidates = document.querySelectorAll("[data-lirva-bot1-card='true'], [data-lirva-bot-card='true'], section, article, div, li, .card, .bot-card, .gpt-card, [class*='bot'], [class*='Bot'], [class*='card'], [data-bot]");
    var matched = [];
    for (var i = 0; i < candidates.length; i++) {
      var card = candidates[i];
      if (!card || card.tagName === "HTML" || card.tagName === "BODY" || card.tagName === "MAIN" || card.tagName === "NAV" || card.tagName === "HEADER" || card.tagName === "FOOTER") continue;
      if (card.closest && card.closest(".lirva-aff-mode-grid, .lirva-bot1-mode-box, .lirva-bot1-feedback-area, nav, header, footer")) continue;
      if (card.querySelector && card.querySelector("#out, #drama-out, form, .lirva-aff-mode-grid, .lirva-cat-thumb-frame")) continue;
      if (card.className && typeof card.className === "string" && /lirva-bot1-(?:mode-box|feedback-area|manual-wrap)/.test(card.className)) continue;

      var txt = String(card.textContent || "").replace(/\\s+/g, " ").trim();
      if (!txt || txt.length < 18) continue;

      var isExplicit = card.getAttribute && (card.getAttribute("data-lirva-bot1-card") === "true" || card.getAttribute("data-lirva-bot-role") === "bot1" || card.getAttribute("data-lirva-bot-num") === "1");
      var cardMeta = ((card.id || "") + " " + (typeof card.className === "string" ? card.className : "") + " " + (card.getAttribute ? (card.getAttribute("data-bot") || "") : "")).trim();
      var hasBot1Meta = /\\b(?:bot[-_ ]?1|gpt[-_ ]?1|affiliate[-_ ]?bot|lirva[-_ ]?ai[-_ ]?affiliate)\\b/i.test(cardMeta);

      var heads = card.querySelectorAll ? card.querySelectorAll("h1, h2, h3, h4, h5, h6, strong, b, span, div, .title, .card-title, .bot-title, .gpt-title, [class*='title'], [class*='Title'], [class*='head'], [class*='Head'], [class*='name'], [class*='Name'], [class*='badge']") : [];
      var hasBot1Head = false;
      var hasOtherBotHead = false;
      for (var h = 0; h < heads.length; h++) {
        var hEl = heads[h];
        if (hEl.closest && hEl.closest(".lirva-bot1-mode-box, .lirva-bot1-feedback-area")) continue;
        // Inspect heading-like elements with concise text so prose doesn't trigger false Bot 2/3 exclusions
        var isHeadingTag = /^H[1-6]$/.test(hEl.tagName) || (hEl.tagName === "STRONG") || (hEl.tagName === "B") || /title|head|name|badge/i.test(String(hEl.className || ""));
        var hTxt = String(hEl.textContent || "").replace(/\\s+/g, " ").trim();
        if (!hTxt || hTxt.length > 100) continue;
        if (isHeadingTag || hEl.children.length === 0) {
          if (isOtherBotHeading(hTxt)) {
            hasOtherBotHead = true;
            break;
          }
          if (isBot1PositiveHeading(hTxt)) {
            hasBot1Head = true;
          }
        }
      }
      if (hasOtherBotHead) continue;

      if (!isExplicit && !hasBot1Meta && !hasBot1Head) {
        if (!/^(?:Lirva\\s+AI\\s+Affiliate|(?:Lirva\\s*)?Bot\\s*#?1|1\\.\\s*Planuhin)\\b/i.test(txt)) continue;
      }

      // Skip outer grid/container wrappers that contain multiple direct child cards with independent actions
      var childCardsWithActions = 0;
      var kids = card.children || [];
      for (var ki = 0; ki < kids.length; ki++) {
        var kc = kids[ki];
        if (kc && kc.querySelector && kc.querySelector("button:not(.lirva-bot1-mode-btn):not(.lirva-bot1-select-btn), a[href*='chatgpt'], a[href*='gemini'], [data-copy], [data-copy-text], [data-lirva-bot1-action]")) {
          if (kc.querySelectorAll("button:not(.lirva-bot1-mode-btn):not(.lirva-bot1-select-btn), a[href], [role='button']").length > 0 && kids.length >= 2) {
            var sibTxt = String(kc.textContent || "");
            if (isBot1PositiveHeading(sibTxt) || isOtherBotHeading(sibTxt) || /Lirva/i.test(sibTxt)) {
              childCardsWithActions++;
            }
          }
        }
      }
      if (childCardsWithActions >= 2) continue;

      var hasTriggerOrText = false;
      if (card.querySelector && card.querySelector("pre, code, textarea:not(.lirva-bot1-manual-textarea), [data-prompt], [data-instructions], [data-copy-text], [data-clipboard-text], [data-copy], [data-lirva-bot1-action], button:not(.lirva-bot1-mode-btn):not(.lirva-bot1-select-btn), a[href]")) {
        hasTriggerOrText = true;
      }
      if (!hasTriggerOrText) continue;
      matched.push(card);
    }

    var pool = matched.length > 0 ? matched : validExplicit;
    // Keep innermost unique cards (remove ancestors of a tighter matched card)
    var tight = [];
    for (var a = 0; a < pool.length; a++) {
      var isParent = false;
      for (var b = 0; b < pool.length; b++) {
        if (a !== b && pool[a].contains && pool[a].contains(pool[b])) {
          isParent = true;
          break;
        }
      }
      if (!isParent && tight.indexOf(pool[a]) === -1) {
        if (!pool[a].id) {
          pool[a].id = tight.length === 0 ? "lirva-bot1-card" : ("lirva-bot1-card-" + (tight.length + 1));
        }
        pool[a].setAttribute("data-lirva-bot1-card", "true");
        pool[a].setAttribute("data-lirva-bot-card", "true");
        pool[a].setAttribute("data-lirva-bot-role", "bot1");
        pool[a].setAttribute("data-lirva-bot-num", "1");
        tight.push(pool[a]);
      }
    }
    return tight;
  }

  function getActiveContentLanguage() {
    if (typeof window !== "undefined") {
      var raw = window.__lirvaSelectedContentLang || window.__lirvaSelectedDialogueLang || "Taglish";
      return /^english$/i.test(String(raw).trim()) ? "English" : "Taglish";
    }
    return "Taglish";
  }

  function getActiveChatApp() {
    if (typeof window !== "undefined") {
      return /^gemini$/i.test(String(window.__lirvaSelectedApp || "").trim()) ? "Gemini" : "ChatGPT";
    }
    return "ChatGPT";
  }

  function getActiveBot1DeviceMode() {
    if (typeof window !== "undefined") {
      return window.__lirvaBot1DeviceMode === "computer" ? "computer" : "phone";
    }
    return "phone";
  }

  function buildBot1PhoneInstructions(chosenLang) {
    var isEnglish = /^english$/i.test(String(chosenLang || "").trim());
    var shortLang = isEnglish ? "English" : "Taglish";
    return [
      "You are Lirva Bot 1 (AI Affiliate Planner & Prompt Builder). Work 100% self-contained inside this new chat from what the user shares here (no hidden files, plugins, or prior chat history).",
      "",
      "### CONVERSATION & LANGUAGE",
      "- Talk to the user in natural Taglish (unless they request another language). Ask ONE short, clear question per reply.",
      "- Write instructions and copyable image/video prompts in clear English.",
      "- Content Language (" + shortLang + "): Write ALL NEW hooks, Exact Spoken Words, scripts, VO, on-screen text, subtitles, captions, first comments, and CTAs in " + shortLang + ".",
      "- Preserve approved text verbatim. Never silently translate approved content on a language switch; propose translations for approval first.",
      "",
      "### PRODUCT TRUTH & FORMAT",
      "- Ask for original product photo(s) and listing details (screenshots optional; typed details accepted). NEVER invent specs, claims, results, pricing, or fake personal-use statements.",
      "- Let the user pick a Product-only showcase OR an Authorized AI-avatar format (never copy an unauthorized real person).",
      "",
      "### VIDEO GENERATOR, AUDIO & TIMING",
      "- Before proposing clip durations or writing full scripts/prompts, ask separately in Taglish: \\u201CAnong app ang gagamitin mong pang-generate ng video?\\u201D Confirm the specific model/mode separately only if unclear.",
      "- No universal 8s limit or forced 4-scene structure. Match verified model durations (editing cuts differ from raw clip length) and fit complete dialogue naturally inside each clip.",
      "- Ask about audio ONLY if unanswered and needed: showcase narration vs. creator VO, or speaking AI avatar vs. separate VO (skip for silent/ASMR).",
      "- Include Exact Spoken Words + voice directions inside English prompts when built-in audio is supported (lip-sync ONLY for visible speakers); output separate VO only when chosen (never duplicate both).",
      "",
      "### WORKFLOW & IMAGE APPROVAL",
      "- Order: Plan -> Scene plan -> Full script & Exact Spoken Words (wait for script approval) -> Visual/storyboard plan & image permission -> Actual preview & review -> English scene video prompts (1 block/scene) -> Editing guide -> 3 Captions -> 3 First comments -> Neutral CTA -> Continuity Handoff.",
      "- Shared Image-Approval Rule (for any image/storyboard/preview/cover): present visual details first and ask: \\u201CApproved ba ito? I-generate ko na ba ang image?\\u201D Wait for permission (\\u201CApproved, generate na\\u201D or yes to \\u201CGenerate now?\\u201D = 1 attempt; script/text approval alone never authorizes generation).",
      "- Pause after an actual image is returned (label previews \\u201CAI-generated scene preview\\u201D; honest text storyboard if unavailable). Ask before revisions/retries (\\u201CRegenerate with these changes\\u201D authorizes 1 attempt). Keep text approval, generation permission, image delivery, and visual approval separate: mark \\u201CImage generated \\u2014 awaiting visual approval\\u201D ONLY if an actual image appeared; otherwise \\u201CPending \\u2014 image delivery unconfirmed\\u201D (ask if it appeared) or \\u201CPending \\u2014 image not generated\\u201D (no auto-retries).",
      "",
      "### CONTINUITY, CTA & HANDOFF",
      "- Keep product details, avatar, wardrobe, setting, and prop states consistent across scenes.",
      "- Neutral CTA matched to platform and " + shortLang + " (no Lazada, forced Yellow/Orange basket, or auto Facebook cross-visit).",
      "- End with a compact Continuity Handoff block (approved product facts, style, avatar/setting locks, CTA, and reminder to re-attach reference images in new chats)."
    ].join("\\n");
  }

  function buildBot1ComputerFallback(chosenLang) {
    var isEnglish = /^english$/i.test(String(chosenLang || "").trim());
    var shortLang = isEnglish ? "English" : "Taglish";
    var langLabel = isEnglish
      ? "English (clear, natural English)"
      : "Taglish (natural conversational Tagalog-English)";
    return [
      "You are Lirva Bot 1 \\u2014 Affiliate Video Planner, Scriptwriter & Prompt Builder.",
      "Operating Scope: Work 100% self-contained inside this chat from the user\\u2019s inputs and attachments. Do NOT rely on hidden files, external plugin calls, or memory from previous chat threads.",
      "",
      "### 1. CONVERSATION TONE & SIMPLE QUESTIONS",
      "- Assistant conversation language: ALWAYS converse with the user in natural, friendly Taglish unless the user explicitly asks for another conversation language.",
      "- Ask ONLY ONE short, clear question per reply. Keep explanations concise and everyday (avoid robotic phrasing or unexplained technical jargon).",
      "- Use every detail the user already provided. Never bundle video app, audio mode, reference photo rules, and script approval into a single message.",
      "",
      "### 2. LANGUAGE SEPARATION & APPROVED CONTENT LOCK",
      "- Technical instructions and ALL copyable image/video scene prompts: write strictly in clear English.",
      "- Selected Content Language (" + langLabel + "): Generate ALL NEW hooks, spoken dialogue (Exact Spoken Words), scripts, voice-over lines, on-screen text, subtitles, captions, first comments, and CTAs strictly in " + shortLang + ".",
      "- Preserve approved content verbatim: Once dialogue, scripts, captions, first comments, or CTAs are approved, keep their exact wording unchanged. A later Content Language change must NEVER silently translate previously approved lines; present proposed translations for explicit user approval when requested.",
      "",
      "### 3. PRODUCT VERIFICATION & NO INVENTED CLAIMS",
      "- Require original product photo(s) and accurate product listing details before finalizing visual/product descriptions. Screenshots are optional if the user types clear product details.",
      "- Strict honesty rule: NEVER invent product specs, ingredients, performance claims, clinical/before-after results, prices, discounts, shipping promises, or fake personal-use statements (e.g., \\u201Cnasubukan ko na,\\u201D \\u201Ceffective talaga sa akin\\u201D) unless explicitly provided and verified by the user.",
      "",
      "### 4. FORMAT CHOICE (PRODUCT-ONLY OR AUTHORIZED AI-AVATAR)",
      "- Offer two clear creator paths and follow the user\\u2019s choice:",
      "  1) Product-only showcase (hands-free product shots, close-ups, usage demos, lifestyle staging without a recurring host).",
      "  2) Authorized AI-avatar presentation (consistent approved AI host presenting the product).",
      "- Never copy or clone an unauthorized real human celebrity, influencer, or private individual.",
      "",
      "### 5. CONFIRMED VIDEO GENERATOR, AUDIO & DURATION",
      "- Before proposing scene durations or writing full scripts/video prompts, ask separately in natural Taglish:",
      "  \\u201CAnong app ang gagamitin mong pang-generate ng video?\\u201D",
      "- Ask for the specific model or generation mode in a follow-up question ONLY if still unclear or unresolved.",
      "- REMOVE all universal \\u201C8 seconds max\\u201D limits, mandatory four-scene templates, and unsupported free-plan assumptions.",
      "- Verify and honor the confirmed model\\u2019s supported clip duration, reference-image limits, and native audio support (note clearly that raw generated clip length differs from editing timeline cut points).",
      "- Complete spoken dialogue: Ensure every sentence in Exact Spoken Words fits naturally inside its confirmed clip duration with calm pacing and brief breathing/reaction room.",
      "- Conditional audio question (ask ONLY if unanswered and relevant to the format):",
      "  * Product-only affiliate showcase: \\u201CDahil [chosen style] ang pinili mo, gusto mo bang may kasamang narration ang AI video, o ikaw ang maglalagay ng voiceover pagkatapos?\\u201D",
      "  * Speaking AI avatar: \\u201CGusto mo bang mismong AI avatar ang magsalita, o lalagyan mo ng hiwalay na voiceover pagkatapos?\\u201D",
      "  (Skip for silent/text-only/ASMR concepts.)",
      "- Inside English video prompts: include exact approved spoken words and voice tone directions when built-in audio is supported; include lip-sync directions ONLY for visible speakers. Output separate voice-over scripts ONLY when separate audio was explicitly chosen (never duplicate native-audio and separate-VO versions).",
      "",
      "### 6. STEP-BY-STEP PLANNING, APPROVAL & DELIVERY WORKFLOW",
      "Follow this clear stage-by-stage sequence without skipping approvals:",
      "1) Gather product details, original photo(s), format choice (product-only vs. authorized AI-avatar), target audience/angle, and confirmed video generator app/model.",
      "2) Propose creative hook/angle options and confirm the production scene plan BEFORE writing the full script.",
      "3) Deliver the complete script & scene plan with scene timings and \\u201CExact Spoken Words\\u201D in " + shortLang + ". Wait for explicit script approval before proceeding to production prompts.",
      "4) Visual planning & Shared Image-Approval Rule (whenever generating a storyboard sheet, reference image, preview, cover, or thumbnail included in this workflow):",
      "   - Present the proposed visual details/plan first (photorealistic previews grounded in the uploaded original product and approved avatar/setting references \\u2014 no cartoons/sketches unless requested) and ask ONE combined question:",
      "     \\u201CApproved ba ito? I-generate ko na ba ang image?\\u201D",
      "   - Wait for explicit generation permission. \\u201CApproved, generate na\\u201D approves the visual details and authorizes ONE generation attempt (or proceed if the user answered yes to a clear \\u201CGenerate now?\\u201D question). Script or written-description approval alone NEVER authorizes generating an image.",
      "   - Label generated previews \\u201CAI-generated scene preview.\\u201D If reference-based image generation is unavailable, provide an honest text storyboard fallback instead of substituting a fake product.",
      "   - After delivering an actual image, PAUSE for visual review. Ask before revisions, regeneration, or retries (a direct user request such as \\u201CRegenerate with these changes\\u201D authorizes that attempt).",
      "   - Keep statuses strictly honest and separate: text approval, permission to generate, actual image delivery, and visual approval. Mark \\u201CImage generated \\u2014 awaiting visual approval\\u201D ONLY after an actual generated image has been returned. A heading, description, or prompt NEVER counts as an image. If delivery is unconfirmed, mark \\u201CPending \\u2014 image delivery unconfirmed\\u201D and ask if it appeared; if unproduced, mark \\u201CPending \\u2014 image not generated.\\u201D Zero automatic retries or guessed failure reasons.",
      "5) Deliver ALL approved scene-by-scene video prompts (one self-contained copyable English block per scene preserving exact product design, colors, labels, avatar appearance, wardrobe, setting, prop states, and lighting continuity across scenes).",
      "6) Deliver sequential post-production support one step at a time: Editing Guide (clip order, timeline cut points, pacing, captions/SFX) -> Captions (3 options in " + shortLang + ") -> First Comments (3 options in " + shortLang + ") -> Neutral CTA -> Posting Checklist & Continuity Handoff.",
      "",
      "### 7. NEUTRAL CTA & CONTINUITY HANDOFF",
      "- Neutral CTA rule: Tailor the call to action to the confirmed posting platform, content goal, and " + shortLang + ". Completely remove any mention of Lazada. NEVER automatically add basket colors (\\u201CYellow Basket\\u201D / \\u201COrange Basket\\u201D) or Facebook cross-visit instructions; use a neutral product-link CTA unless the user explicitly specifies otherwise.",
      "- Continuity Handoff: End completed projects with a compact copyable Continuity Handoff summarizing verified product details, visual style, approved avatar/location locks, exact CTA choice, and a clear reminder to re-attach product/reference images if continuing in a fresh chat."
    ].join("\\n");
  }

  function syncBot1ComputerLanguage(rawText, chosenLang) {
    var base = String(rawText || "").replace(/\\r\\n?/g, "\\n").trim();
    if (!base) return buildBot1ComputerFallback(chosenLang);
    var isEnglish = /^english$/i.test(String(chosenLang || "").trim());
    var shortLang = isEnglish ? "English" : "Taglish";
    var langLabel = isEnglish
      ? "English (clear, natural English)"
      : "Taglish (natural conversational Tagalog-English)";
    var marker = "### BOT 1 WORKSPACE, LANGUAGE & IMAGE-APPROVAL LOCK";
    var idx = base.indexOf(marker);
    if (idx !== -1) {
      base = base.slice(0, idx).trim();
    }
    base = base
      .replace(/(?:,\\s*)?(?:cart\\/link\\s+para\\s+sa\\s+)?Lazada[^\\n.,]*/gi, "")
      .replace(/Lazada/gi, "");
    base = base.replace(/^([-*]?\\s*(?:Content\\s+Language|Wika\\s+ng\\s+(?:content|dialogue)|Dialogue\\s+Language)\\s*[:\\u2014\\u2013-]\\s*)(?:Taglish|Tagalog|English)[^\\n]*$/gim, "$1" + langLabel);
    var addendum = [
      marker,
      "- Selected Content Language (Wika ng content): " + langLabel + " \\u2014 generate ALL NEW hooks, Exact Spoken Words dialogue, scripts, voice-over, on-screen text, subtitles, captions, first comments, and CTAs strictly in " + shortLang + ".",
      "- Technical Prompt & Assistant Language: Write main instructions and copyable technical image/video prompts in clear English; converse with the user in natural Taglish (one short question at a time) unless requested otherwise.",
      "- Approved Content Lock: Never silently translate already-approved dialogue, scripts, captions, first comments, or CTAs on a later language switch; present proposed translations for approval first.",
      "- Product & Format Honesty: Require original product photo(s) and listing details (screenshots optional; typed details accepted). Never invent specs, claims, results, or fake personal-use statements. Follow user\\u2019s Product-only showcase OR Authorized AI-avatar choice.",
      "- Generator & Timing: Confirm the user\\u2019s video generator app/model and clip duration before timing/scripts (no universal 8s limit or forced 4-scene mandate; complete dialogue inside duration; consistent continuity; neutral CTA without Lazada or forced basket colors).",
      SHARED_IMAGE_APPROVAL_RULES
    ].join("\\n");
    return base + "\\n\\n" + addendum;
  }

  function isGeneratedBot1Template(txt) {
    var t = String(txt || "");
    return t.indexOf("You are Lirva Bot 1 (AI Affiliate Planner & Prompt Builder).") === 0 ||
      t.indexOf("You are the Lirva Bot 1 \\u2014 AI Affiliate Planner & Prompt Builder.") === 0 ||
      t.indexOf("You are Lirva Bot 1 \\u2014 Affiliate Video Planner, Scriptwriter & Prompt Builder.") === 0;
  }

  function isInvalidOrTruncatedBot1Source(txt) {
    var t = String(txt || "").trim();
    if (!t || t.length < 250) return true;
    if (/any\\s+generated\\s+discr/i.test(t)) return true;
    return isGeneratedBot1Template(t);
  }

  function captureRawBot1ComputerSource(card, btn) {
    if (card && typeof card.__lirvaBot1ComputerOrig === "string" && !isUrlOrButtonLabelOnly(card.__lirvaBot1ComputerOrig, btn) && !isInvalidOrTruncatedBot1Source(card.__lirvaBot1ComputerOrig)) {
      return card.__lirvaBot1ComputerOrig;
    }
    if (card && card.getAttribute) {
      var origAttr = card.getAttribute("data-lirva-bot1-computer-orig");
      if (origAttr && !isUrlOrButtonLabelOnly(origAttr, btn) && !isInvalidOrTruncatedBot1Source(origAttr)) {
        card.__lirvaBot1ComputerOrig = origAttr;
        return origAttr;
      }
    }
    var attrNames = ["data-lirva-orig-text", "data-copy-text", "data-clipboard-text", "data-instructions", "data-prompt", "data-copy", "data-text"];
    var sources = [btn, card];
    for (var s = 0; s < sources.length; s++) {
      var src = sources[s];
      if (!src || !src.getAttribute) continue;
      for (var ai = 0; ai < attrNames.length; ai++) {
        var av = src.getAttribute(attrNames[ai]);
        if (av && !isUrlOrButtonLabelOnly(av, btn) && !isInvalidOrTruncatedBot1Source(av)) {
          var cleanAttr = String(av).replace(/\\r\\n?/g, "\\n").replace(/^\\n+|\\n+$/g, "");
          if (card) {
            card.__lirvaBot1ComputerOrig = cleanAttr;
            try { card.setAttribute("data-lirva-bot1-computer-orig", cleanAttr); } catch (_) {}
          }
          return cleanAttr;
        }
      }
    }
    if (card && card.querySelectorAll) {
      var best = "";
      var primaryEls = card.querySelectorAll("textarea:not(.lirva-bot1-manual-textarea), pre, code, [data-prompt], [data-instructions], [data-copy-text], .prompt-box, .instructions, .bot-instructions, .copy-text");
      for (var pi = 0; pi < primaryEls.length; pi++) {
        var pel = primaryEls[pi];
        if (pel.closest && (pel.closest(".lirva-bot1-feedback-area") || pel.closest(".lirva-bot1-mode-box"))) continue;
        var pt = extractTextPreservingNewlines(pel);
        if (!isUrlOrButtonLabelOnly(pt, btn) && !isInvalidOrTruncatedBot1Source(pt) && pt.length > best.length) {
          best = pt;
        }
      }
      if (!best) {
        var fallbackEls = card.querySelectorAll("div, p, blockquote");
        for (var fi = 0; fi < fallbackEls.length; fi++) {
          var fel = fallbackEls[fi];
          if (fel.closest && (fel.closest(".lirva-bot1-feedback-area") || fel.closest(".lirva-bot1-mode-box"))) continue;
          if (fel.querySelector && fel.querySelector("button, a, h1, h2, h3, h4, .lirva-bot1-feedback-area, .lirva-bot1-mode-box")) continue;
          var ft = extractTextPreservingNewlines(fel);
          var looksLongOrInstruct = ft.length >= 250 || (/(?:instructions|role:|you are|act as|system|step\\s*1|ikaw ay|kapag)/i.test(ft) && ft.length >= 250);
          if (looksLongOrInstruct && !isUrlOrButtonLabelOnly(ft, btn) && !isInvalidOrTruncatedBot1Source(ft) && ft.length > best.length) {
            best = ft;
          }
        }
      }
      if (best) {
        card.__lirvaBot1ComputerOrig = best;
        try { card.setAttribute("data-lirva-bot1-computer-orig", best); } catch (_) {}
        return best;
      }
    }
    return "";
  }

  function findBot1PreviewElement(card) {
    if (!card || !card.querySelectorAll) return null;
    var els = card.querySelectorAll("textarea:not(.lirva-bot1-manual-textarea), pre, code, [data-prompt], [data-instructions], [data-copy-text], .prompt-box, .instructions, .bot-instructions, .copy-text");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.closest && (el.closest(".lirva-bot1-feedback-area") || el.closest(".lirva-bot1-mode-box"))) continue;
      if (el.tagName === "TEXTAREA" || el.tagName === "PRE" || el.tagName === "CODE" || (extractTextPreservingNewlines(el).length >= 60)) {
        return el;
      }
    }
    return null;
  }

  function getBot1InstructionsForMode(card, mode, chosenLang, btn) {
    var activeMode = mode === "computer" ? "computer" : "phone";
    var lang = /^english$/i.test(String(chosenLang || "").trim()) ? "English" : "Taglish";
    if (activeMode === "phone") {
      return buildBot1PhoneInstructions(lang);
    }
    var origComp = captureRawBot1ComputerSource(card, btn);
    if (origComp) {
      return syncBot1ComputerLanguage(origComp, lang);
    }
    return buildBot1ComputerFallback(lang);
  }

  function resolveBot1Instructions(card, btn) {
    captureRawBot1ComputerSource(card, btn);
    var activeTxt = getBot1InstructionsForMode(card, getActiveBot1DeviceMode(), getActiveContentLanguage(), btn);
    if (card) {
      card.__lirvaBot1FullText = activeTxt;
      try { card.setAttribute("data-lirva-bot1-full", activeTxt); } catch (_) {}
    }
    return activeTxt;
  }

  function syncBot1CardPreview(card) {
    if (!card) return;
    captureRawBot1ComputerSource(card, null);
    var activeTxt = resolveBot1Instructions(card, null);
    var previewEl = findBot1PreviewElement(card);
    if (previewEl) {
      if (previewEl.tagName === "TEXTAREA" || previewEl.tagName === "INPUT") {
        if (previewEl.value !== activeTxt) previewEl.value = activeTxt;
      } else {
        if (previewEl.textContent !== activeTxt) {
          previewEl.textContent = activeTxt;
          if (previewEl.style && previewEl.tagName !== "PRE" && previewEl.tagName !== "CODE") {
            previewEl.style.whiteSpace = "pre-wrap";
          }
        }
      }
    }
  }

  function getTriggerChatGptUrl(card, btn) {
    if (btn && btn.getAttribute) {
      var saved = btn.getAttribute("data-lirva-orig-chatgpt-url");
      if (saved && /^https?:\\/\\//i.test(saved)) return saved;
      if (btn.tagName === "A") {
        var hrefAttr = btn.getAttribute("href") || "";
        if (/^https?:\\/\\//i.test(hrefAttr) && !/gemini\\.google\\.com/i.test(hrefAttr)) return hrefAttr;
      }
      var dUrl = btn.getAttribute("data-open-url") || btn.getAttribute("data-url") || btn.getAttribute("data-href");
      if (dUrl && /^https?:\\/\\//i.test(dUrl) && !/gemini\\.google\\.com/i.test(dUrl)) return dUrl;
      var ocAttr = String(btn.getAttribute("onclick") || "");
      var m = ocAttr.match(/https?:\\/\\/[^\\s'")]+/i);
      if (m && !/gemini\\.google\\.com/i.test(m[0])) return m[0];
    }
    if (card && card.querySelectorAll) {
      var links = card.querySelectorAll("a[href]");
      for (var li = 0; li < links.length; li++) {
        var href = links[li].getAttribute("href") || "";
        if (/chatgpt\\.com|chat\\.openai\\.com/i.test(href)) return href;
      }
    }
    return "https://chatgpt.com/";
  }

  function classifyBot1TriggerAction(btn) {
    if (!btn) return "";
    var explicit = btn.getAttribute ? btn.getAttribute("data-lirva-bot1-action") : "";
    if (explicit === "copy-open" || explicit === "copy-only") return explicit;
    var label = String((btn.getAttribute && btn.getAttribute("data-lirva-orig-label")) || btn.textContent || (btn.getAttribute && btn.getAttribute("aria-label")) || "").trim();
    var oc = btn.getAttribute ? String(btn.getAttribute("onclick") || "") : "";
    var href = btn.tagName === "A" && btn.getAttribute ? String(btn.getAttribute("href") || "") : "";
    var openAttr = btn.getAttribute ? String(btn.getAttribute("data-open-url") || btn.getAttribute("data-url") || btn.getAttribute("data-href") || "") : "";
    var hasPlatformUrl = /chatgpt\\.com|chat\\.openai\\.com|gemini\\.google\\.com/i.test(href + " " + openAttr + " " + oc);
    var looksCopyOpenText = /copy\\s*(?:&|and|\\+|at)\\s*(?:open|buksan)|kopyahin\\s*(?:&|and|\\+|at)\\s*(?:open|buksan)|(?:copy|kopyahin).*?(?:chatgpt|gemini)|(?:open|buksan)\\s*(?:in\\s+|sa\\s+)?(?:chatgpt|gemini)/i.test(label);
    if (looksCopyOpenText || hasPlatformUrl) return "copy-open";
    var clsId = ((btn.id || "") + " " + (typeof btn.className === "string" ? btn.className : "")).trim();
    var hasCopyAttr = Boolean(btn.getAttribute && (btn.getAttribute("data-copy-text") || btn.getAttribute("data-clipboard-text") || btn.getAttribute("data-copy") || btn.getAttribute("data-instructions") || btn.getAttribute("data-prompt")));
    var hasCopyOnclick = /copy|writeText|execCommand/i.test(oc);
    if (/copy|kopyahin/i.test(label) || hasCopyAttr || hasCopyOnclick || /copy/i.test(clsId)) return "copy-only";
    return "";
  }

  function resolveCombinedOpenUrl(card, btn) {
    if (!btn) return "";
    var action = classifyBot1TriggerAction(btn);
    if (action !== "copy-open") return "";
    var activeApp = getActiveChatApp();
    if (activeApp === "Gemini") {
      return "https://gemini.google.com/";
    }
    return getTriggerChatGptUrl(card, btn);
  }

  function syncCombinedOpenButtonPlatformLabel(card, btn) {
    if (!btn) return;
    var action = classifyBot1TriggerAction(btn);
    if (action !== "copy-open") return;
    var orig = btn.getAttribute ? (btn.getAttribute("data-lirva-orig-label") || String(btn.textContent || "").trim()) : "";
    if (!orig) orig = "Kopyahin at buksan sa ChatGPT";
    if (btn.setAttribute && !btn.getAttribute("data-lirva-orig-label")) {
      btn.setAttribute("data-lirva-orig-label", orig);
    }
    var activeApp = getActiveChatApp();
    var targetLabel = orig;
    if (/copy|kopyahin/i.test(orig)) {
      if (/chatgpt|gemini/i.test(orig)) {
        targetLabel = orig.replace(/ChatGPT|Gemini/gi, activeApp);
      } else {
        targetLabel = /kopyahin/i.test(orig)
          ? ("Kopyahin at buksan sa " + activeApp)
          : ("Copy & Open " + activeApp);
      }
    } else {
      targetLabel = /buksan/i.test(orig)
        ? ("Kopyahin at buksan sa " + activeApp)
        : ("Copy & Open " + activeApp);
    }
    var prevDisplay = btn.getAttribute ? btn.getAttribute("data-lirva-display-label") : "";
    if (btn.getAttribute) btn.setAttribute("data-lirva-display-label", targetLabel);
    if (btn.tagName === "A" && btn.setAttribute) {
      btn.setAttribute("href", resolveCombinedOpenUrl(card, btn));
    }
    if (prevDisplay !== targetLabel) {
      btn.__lirvaShowingCopied = false;
      if (btn.__lirvaLabelTimer) { clearTimeout(btn.__lirvaLabelTimer); btn.__lirvaLabelTimer = null; }
    }
    if (!btn.__lirvaShowingCopied && btn.textContent !== targetLabel) {
      btn.textContent = targetLabel;
    }
  }

  function ensureBot1ModeSelector(card) {
    if (!card || typeof document === "undefined" || !document.createElement) return null;
    ensureBot1CopyStyles();
    var box = card.querySelector ? card.querySelector(".lirva-bot1-mode-box") : null;
    if (!box) {
      box = document.createElement("div");
      box.className = "lirva-bot1-mode-box";
      box.setAttribute("data-lirva-bot1-mode-ui", "true");

      var title = document.createElement("p");
      title.className = "lirva-bot1-mode-title";
      title.textContent = "Haba ng instructions";

      var group = document.createElement("div");
      group.className = "lirva-bot1-mode-group";
      group.setAttribute("role", "radiogroup");
      group.setAttribute("aria-label", "Bot 1 instruction length");

      var phoneBtn = document.createElement("button");
      phoneBtn.type = "button";
      phoneBtn.className = "lirva-bot1-mode-btn";
      phoneBtn.setAttribute("role", "radio");
      phoneBtn.setAttribute("data-lirva-bot1-mode", "phone");
      phoneBtn.textContent = "\\uD83D\\uDCF1 Phone";

      var compBtn = document.createElement("button");
      compBtn.type = "button";
      compBtn.className = "lirva-bot1-mode-btn";
      compBtn.setAttribute("role", "radio");
      compBtn.setAttribute("data-lirva-bot1-mode", "computer");
      compBtn.textContent = "\\uD83D\\uDCBB Computer";

      var help = document.createElement("div");
      help.className = "lirva-bot1-mode-help";

      var helpPhone = document.createElement("p");
      helpPhone.className = "lirva-bot1-mode-help-line";
      helpPhone.innerHTML = "<strong>Phone:</strong> \\u201CMas maikling instructions, kumpleto ang essential rules.\\u201D";

      var helpComp = document.createElement("p");
      helpComp.className = "lirva-bot1-mode-help-line";
      helpComp.innerHTML = "<strong>Computer:</strong> \\u201CFull detailed instructions.\\u201D";

      group.appendChild(phoneBtn);
      group.appendChild(compBtn);
      help.appendChild(helpPhone);
      help.appendChild(helpComp);
      box.appendChild(title);
      box.appendChild(group);
      box.appendChild(help);

      function handleModePick(nextMode, ev) {
        if (ev) {
          ev.preventDefault();
          ev.stopPropagation();
        }
        var cleanMode = nextMode === "computer" ? "computer" : "phone";
        if (typeof window !== "undefined") {
          window.__lirvaBot1DeviceMode = cleanMode;
        }
        try { localStorage.setItem("lirva:bot1_device_mode", cleanMode); } catch (_) {}
        syncBot1ModeSelectorState(card);
        syncBot1CardPreview(card);
        var ui = card.querySelector ? card.querySelector(".lirva-bot1-feedback-area") : null;
        if (ui) {
          var stEl = ui.querySelector(".lirva-bot1-status");
          var wrapEl = ui.querySelector(".lirva-bot1-manual-wrap");
          if (stEl) { stEl.removeAttribute("data-state"); stEl.textContent = ""; }
          if (wrapEl) { wrapEl.setAttribute("data-open", "false"); }
        }
      }

      phoneBtn.addEventListener("click", function(ev) { handleModePick("phone", ev); });
      compBtn.addEventListener("click", function(ev) { handleModePick("computer", ev); });

      var anchorTarget = card.querySelector ? card.querySelector("button:not(.lirva-bot1-mode-btn):not(.lirva-bot1-select-btn), a[href], .lirva-bot1-feedback-area") : null;
      if (anchorTarget) {
        var actionContainer = anchorTarget.closest ? anchorTarget.closest("div, p, section") : null;
        if (actionContainer && actionContainer !== card && actionContainer.parentNode === card) {
          card.insertBefore(box, actionContainer);
        } else if (anchorTarget.parentNode === card) {
          card.insertBefore(box, anchorTarget);
        } else {
          card.appendChild(box);
        }
      } else {
        card.appendChild(box);
      }
    }
    syncBot1ModeSelectorState(card);
    return box;
  }

  function syncBot1ModeSelectorState(card) {
    if (!card || !card.querySelectorAll) return;
    var activeMode = getActiveBot1DeviceMode();
    var btns = card.querySelectorAll(".lirva-bot1-mode-btn[data-lirva-bot1-mode]");
    for (var i = 0; i < btns.length; i++) {
      var m = btns[i].getAttribute("data-lirva-bot1-mode");
      var isSel = m === activeMode;
      btns[i].setAttribute("aria-checked", isSel ? "true" : "false");
      btns[i].setAttribute("aria-pressed", isSel ? "true" : "false");
    }
  }

  function legacyExecCommandCopy(text) {
    if (typeof document === "undefined" || !document.createElement || !document.body) return false;
    var cleanText = String(text || "").replace(/\\r\\n?/g, "\\n");
    var ta = null;
    var prevActive = document.activeElement;
    try {
      ta = document.createElement("textarea");
      ta.value = cleanText;
      ta.setAttribute("aria-hidden", "true");
      ta.readOnly = true;
      ta.style.position = "fixed";
      ta.style.top = "0";
      ta.style.left = "0";
      ta.style.width = "16px";
      ta.style.height = "16px";
      ta.style.padding = "0";
      ta.style.margin = "0";
      ta.style.border = "0";
      ta.style.opacity = "0.01";
      ta.style.fontSize = "16px";
      ta.style.background = "transparent";
      document.body.appendChild(ta);
      try {
        ta.focus({ preventScroll: true });
      } catch (_) {
        try { ta.focus(); } catch (__) {}
      }
      if (typeof ta.select === "function") ta.select();
      if (typeof ta.setSelectionRange === "function") ta.setSelectionRange(0, ta.value.length);
      var ok = typeof document.execCommand === "function" ? !!document.execCommand("copy") : false;
      return ok;
    } catch (_) {
      return false;
    } finally {
      if (ta && ta.parentNode) {
        try { ta.parentNode.removeChild(ta); } catch (_) {}
      }
      if (prevActive && typeof prevActive.focus === "function" && prevActive !== ta) {
        try { prevActive.focus({ preventScroll: true }); } catch (_) {}
      }
    }
  }

  function getOrCreateBot1FeedbackArea(card) {
    if (!card || !document || !document.createElement) return null;
    var existing = card.querySelector ? card.querySelector(".lirva-bot1-feedback-area") : null;
    if (existing) {
      return {
        area: existing,
        statusEl: existing.querySelector(".lirva-bot1-status"),
        manualWrap: existing.querySelector(".lirva-bot1-manual-wrap"),
        manualTa: existing.querySelector(".lirva-bot1-manual-textarea"),
        selectBtn: existing.querySelector(".lirva-bot1-select-btn")
      };
    }
    var area = document.createElement("div");
    area.className = "lirva-bot1-feedback-area";
    area.setAttribute("data-lirva-manual-copy", "true");

    var statusEl = document.createElement("div");
    statusEl.className = "lirva-bot1-status";
    statusEl.setAttribute("role", "status");
    statusEl.setAttribute("aria-live", "polite");

    var manualWrap = document.createElement("div");
    manualWrap.className = "lirva-bot1-manual-wrap";
    manualWrap.setAttribute("data-open", "false");

    var guide = document.createElement("p");
    guide.className = "lirva-bot1-manual-guide";
    guide.textContent = "Hindi nakopya nang kusa. I-tap ang 'Select All' o pindutin nang matagal ang text sa loob ng box at piliin ang Copy.";

    var actions = document.createElement("div");
    actions.className = "lirva-bot1-manual-actions";

    var selectBtn = document.createElement("button");
    selectBtn.type = "button";
    selectBtn.className = "lirva-bot1-select-btn";
    selectBtn.textContent = "Select All";

    var manualTa = document.createElement("textarea");
    manualTa.className = "lirva-bot1-manual-textarea";
    manualTa.readOnly = true;
    manualTa.setAttribute("aria-label", "Kumpletong Bot 1 instructions para sa manual copy");

    selectBtn.addEventListener("click", function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      try { manualTa.focus({ preventScroll: true }); } catch (_) { try { manualTa.focus(); } catch (__) {} }
      if (typeof manualTa.select === "function") manualTa.select();
      if (typeof manualTa.setSelectionRange === "function") manualTa.setSelectionRange(0, manualTa.value.length);
      var manualOk = false;
      try {
        manualOk = typeof document.execCommand === "function" ? !!document.execCommand("copy") : false;
      } catch (_) {}
      if (manualOk) {
        statusEl.setAttribute("data-state", "copied");
        statusEl.textContent = "Nakopya na ang kumpletong Bot 1 instructions!";
      } else {
        statusEl.setAttribute("data-state", "failed");
        statusEl.textContent = "Naka-highlight na ang buong text. Pindutin ang Copy sa screen mo.";
      }
    });

    actions.appendChild(selectBtn);
    manualWrap.appendChild(guide);
    manualWrap.appendChild(actions);
    manualWrap.appendChild(manualTa);

    area.appendChild(statusEl);
    area.appendChild(manualWrap);
    card.appendChild(area);

    return { area: area, statusEl: statusEl, manualWrap: manualWrap, manualTa: manualTa, selectBtn: selectBtn };
  }

  function performBot1Copy(fullText, btn, card, combinedUrl) {
    ensureBot1CopyStyles();
    var normalizedText = String(fullText || "").replace(/\\r\\n?/g, "\\n");
    var ui = getOrCreateBot1FeedbackArea(card);
    if (isUrlOrButtonLabelOnly(normalizedText, btn)) {
      if (ui && ui.statusEl) {
        ui.statusEl.setAttribute("data-state", "failed");
        ui.statusEl.textContent = "Hindi nakopya ang instructions. Subukan ulit i-tap ang button.";
      }
      return;
    }

    var displayLabel = btn && btn.getAttribute ? (btn.getAttribute("data-lirva-display-label") || btn.getAttribute("data-lirva-orig-label") || String(btn.textContent || "Copy instructions")) : "Copy instructions";
    if (btn && btn.setAttribute && !btn.getAttribute("data-lirva-orig-label")) {
      btn.setAttribute("data-lirva-orig-label", String(btn.textContent || displayLabel));
    }

    function restoreBtnLabel() {
      if (!btn) return;
      btn.__lirvaShowingCopied = false;
      var targetLbl = (btn.getAttribute && (btn.getAttribute("data-lirva-display-label") || btn.getAttribute("data-lirva-orig-label"))) || displayLabel;
      if (btn.tagName === "BUTTON" || btn.tagName === "A") {
        btn.textContent = targetLbl;
      }
    }

    function onCopied() {
      if (typeof window !== "undefined") {
        window.__lirvaBot1CopyActive = false;
        window.__lirvaBot1DirectWrite = false;
      }
      if (ui && ui.statusEl) {
        ui.statusEl.setAttribute("data-state", "copied");
        ui.statusEl.textContent = "Nakopya na ang kumpletong Bot 1 instructions!";
      }
      if (ui && ui.manualWrap) ui.manualWrap.setAttribute("data-open", "false");
      if (btn && (btn.tagName === "BUTTON" || btn.tagName === "A")) {
        btn.__lirvaShowingCopied = true;
        btn.textContent = "Nakopya na \\u2713";
        if (btn.__lirvaLabelTimer) clearTimeout(btn.__lirvaLabelTimer);
        btn.__lirvaLabelTimer = setTimeout(restoreBtnLabel, 2500);
      }
      if (combinedUrl) {
        var opened = false;
        var activeApp = getActiveChatApp();
        try {
          if (typeof window !== "undefined" && typeof window.open === "function") {
            opened = !!window.open(combinedUrl, "_blank", "noopener,noreferrer");
          }
        } catch (_) {
          opened = false;
        }
        if (!opened && ui && ui.statusEl && typeof document !== "undefined" && document.createElement) {
          var existingOpenLink = ui.statusEl.querySelector(".lirva-bot1-open-link");
          if (!existingOpenLink) {
            var br = document.createElement("br");
            var openLink = document.createElement("a");
            openLink.className = "lirva-bot1-open-link";
            openLink.href = combinedUrl;
            openLink.target = "_blank";
            openLink.rel = "noopener noreferrer";
            openLink.textContent = "Buksan sa " + activeApp + " \\u2192";
            ui.statusEl.appendChild(br);
            ui.statusEl.appendChild(openLink);
          }
        }
      }
    }

    function onManualFallback() {
      if (typeof window !== "undefined") {
        window.__lirvaBot1CopyActive = false;
        window.__lirvaBot1DirectWrite = false;
      }
      restoreBtnLabel();
      if (ui) {
        if (ui.manualTa) ui.manualTa.value = normalizedText;
        if (ui.manualWrap) ui.manualWrap.setAttribute("data-open", "true");
        if (ui.statusEl) {
          ui.statusEl.setAttribute("data-state", "failed");
          ui.statusEl.textContent = "Hindi nakopya ang instructions. Subukan ulit i-tap ang button, o gamitin ang Select All sa ibaba.";
        }
        if (ui.manualTa) {
          try { ui.manualTa.focus({ preventScroll: true }); } catch (_) {}
          try {
            if (typeof ui.manualTa.select === "function") ui.manualTa.select();
            if (typeof ui.manualTa.setSelectionRange === "function") ui.manualTa.setSelectionRange(0, ui.manualTa.value.length);
          } catch (_) {}
        }
      }
    }

    if (typeof window !== "undefined") {
      window.__lirvaBot1CopyActive = true;
      window.__lirvaBot1DirectWrite = true;
    }
    var canClipboard = typeof window !== "undefined" && window.isSecureContext !== false &&
      typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function";

    if (canClipboard) {
      try {
        var res = navigator.clipboard.writeText(normalizedText);
        if (typeof window !== "undefined") window.__lirvaBot1DirectWrite = false;
        if (res && typeof res.then === "function") {
          res.then(onCopied, function() {
            if (legacyExecCommandCopy(normalizedText)) {
              onCopied();
            } else {
              onManualFallback();
            }
          });
          return;
        }
        onCopied();
        return;
      } catch (_) {
        if (typeof window !== "undefined") window.__lirvaBot1DirectWrite = false;
        if (legacyExecCommandCopy(normalizedText)) {
          onCopied();
        } else {
          onManualFallback();
        }
        return;
      }
    }

    if (typeof window !== "undefined") window.__lirvaBot1DirectWrite = false;
    if (legacyExecCommandCopy(normalizedText)) {
      onCopied();
    } else {
      onManualFallback();
    }
  }

  function findTriggerCard(triggerEl) {
    if (!triggerEl) return null;
    if (triggerEl.closest) {
      var byAttr = triggerEl.closest("[data-lirva-bot1-card='true'], [data-lirva-bot-card='true']");
      if (byAttr) return byAttr;
    }
    var cardId = triggerEl.getAttribute ? triggerEl.getAttribute("data-lirva-bot1-card-id") : "";
    if (cardId && typeof document !== "undefined" && document.getElementById) {
      var byId = document.getElementById(cardId);
      if (byId) return byId;
    }
    return findBotCardContainer(triggerEl);
  }

  function handleBot1TriggerEvent(ev, explicitBtn, explicitCard) {
    if (!ev || ev.__lirvaBot1Handled) return false;
    var target = explicitBtn || (ev.target && ev.target.closest ? ev.target.closest("[data-lirva-bot1-action]") : null);
    if (!target || !target.getAttribute) return false;
    var action = target.getAttribute("data-lirva-bot1-action");
    if (action !== "copy-only" && action !== "copy-open") return false;
    ev.__lirvaBot1Handled = true;
    if (typeof ev.preventDefault === "function") ev.preventDefault();
    if (typeof ev.stopPropagation === "function") ev.stopPropagation();
    if (typeof ev.stopImmediatePropagation === "function") ev.stopImmediatePropagation();
    var card = explicitCard || findTriggerCard(target);
    var fullText = resolveBot1Instructions(card, target);
    var combinedUrl = action === "copy-open" ? resolveCombinedOpenUrl(card, target) : "";
    performBot1Copy(fullText, target, card, combinedUrl);
    return true;
  }

  if (typeof window !== "undefined" && typeof window.addEventListener === "function" && !window.__lirvaBot1GlobalCaptureInstalled) {
    window.__lirvaBot1GlobalCaptureInstalled = true;
    window.addEventListener("click", function(ev) {
      handleBot1TriggerEvent(ev, null, null);
    }, true);
  }

  function enhanceBot1CopyControls() {
    if (typeof document === "undefined") return;
    var cards = findBot1Cards();
    for (var ci = 0; ci < cards.length; ci++) {
      var card = cards[ci];
      if (!card.id) card.id = ci === 0 ? "lirva-bot1-card" : ("lirva-bot1-card-" + (ci + 1));
      captureRawBot1ComputerSource(card, null);
      ensureBot1ModeSelector(card);
      syncBot1CardPreview(card);

      var triggers = card.querySelectorAll ? card.querySelectorAll("button, a, [role='button']") : [];
      var hasCopyOnly = false;
      var hasCopyOpen = false;
      var refActionBtn = null;
      var refActionParent = null;

      for (var ti = 0; ti < triggers.length; ti++) {
        var trig = triggers[ti];
        if (!trig) continue;
        if (trig.className && typeof trig.className === "string" && (trig.className.indexOf("lirva-bot1-select-btn") !== -1 || trig.className.indexOf("lirva-bot1-mode-btn") !== -1 || trig.className.indexOf("lirva-bot1-open-link") !== -1)) continue;
        var action = classifyBot1TriggerAction(trig);
        if (!action) continue;

        if (action === "copy-only") hasCopyOnly = true;
        if (action === "copy-open") hasCopyOpen = true;
        if (!refActionBtn) {
          refActionBtn = trig;
          refActionParent = trig.parentElement || card;
        }

        // Cache original ChatGPT URL & label BEFORE modifying attributes or clearing inline onclick
        if (action === "copy-open" && !trig.getAttribute("data-lirva-orig-chatgpt-url")) {
          var origChatUrl = getTriggerChatGptUrl(card, trig);
          if (origChatUrl) trig.setAttribute("data-lirva-orig-chatgpt-url", origChatUrl);
        }
        var label = String((trig.getAttribute && trig.getAttribute("data-lirva-orig-label")) || trig.textContent || (trig.getAttribute && trig.getAttribute("aria-label")) || "").trim();
        if (trig.setAttribute && !trig.getAttribute("data-lirva-orig-label") && label) {
          trig.setAttribute("data-lirva-orig-label", label);
        }
        trig.setAttribute("data-lirva-bot1-action", action);
        trig.setAttribute("data-lirva-bot1-card-id", card.id);
        // Remove legacy inline onclick handlers so old long-prompt / premature open handlers cannot fire
        try {
          if (trig.getAttribute && trig.getAttribute("onclick")) trig.removeAttribute("onclick");
          trig.onclick = null;
        } catch (_) {}

        if (action === "copy-open") {
          syncCombinedOpenButtonPlatformLabel(card, trig);
        }

        if (trig.getAttribute("data-lirva-bot1-bound") !== "1") {
          trig.setAttribute("data-lirva-bot1-bound", "1");
          (function(cRef, bRef) {
            bRef.addEventListener("click", function(ev) {
              handleBot1TriggerEvent(ev, bRef, cRef);
            }, true);
          })(card, trig);
        }
      }

      // Ensure BOTH "Copy only" and "Copy and open Gemini/ChatGPT" actions exist on Bot 1 card
      var actionContainer = refActionParent || card;
      if (!hasCopyOnly && document.createElement) {
        var addedCopyOnly = document.createElement("button");
        addedCopyOnly.type = "button";
        addedCopyOnly.className = refActionBtn && refActionBtn.tagName === "BUTTON" && refActionBtn.className ? refActionBtn.className : "copy-btn btn-primary";
        addedCopyOnly.textContent = "Kopyahin ang instructions";
        addedCopyOnly.setAttribute("data-lirva-orig-label", "Kopyahin ang instructions");
        addedCopyOnly.setAttribute("data-lirva-bot1-action", "copy-only");
        addedCopyOnly.setAttribute("data-lirva-bot1-card-id", card.id);
        addedCopyOnly.setAttribute("data-lirva-bot1-generated", "1");
        addedCopyOnly.setAttribute("data-lirva-bot1-bound", "1");
        addedCopyOnly.addEventListener("click", function(ev) {
          handleBot1TriggerEvent(ev, addedCopyOnly, card);
        }, true);
        if (refActionBtn && refActionBtn.parentNode === actionContainer) {
          actionContainer.insertBefore(addedCopyOnly, refActionBtn);
        } else {
          actionContainer.appendChild(addedCopyOnly);
        }
      }
      if (!hasCopyOpen && document.createElement) {
        var addedCopyOpen = document.createElement("button");
        addedCopyOpen.type = "button";
        addedCopyOpen.className = refActionBtn && refActionBtn.tagName === "BUTTON" && refActionBtn.className ? refActionBtn.className : "copy-btn btn-open";
        addedCopyOpen.textContent = "Kopyahin at buksan sa " + getActiveChatApp();
        addedCopyOpen.setAttribute("data-lirva-orig-label", "Kopyahin at buksan sa ChatGPT");
        addedCopyOpen.setAttribute("data-lirva-orig-chatgpt-url", "https://chatgpt.com/");
        addedCopyOpen.setAttribute("data-lirva-bot1-action", "copy-open");
        addedCopyOpen.setAttribute("data-lirva-bot1-card-id", card.id);
        addedCopyOpen.setAttribute("data-lirva-bot1-generated", "1");
        addedCopyOpen.setAttribute("data-lirva-bot1-bound", "1");
        addedCopyOpen.addEventListener("click", function(ev) {
          handleBot1TriggerEvent(ev, addedCopyOpen, card);
        }, true);
        actionContainer.appendChild(addedCopyOpen);
        syncCombinedOpenButtonPlatformLabel(card, addedCopyOpen);
      }
    }
  }

  function safeRunDomStep(fn) {
    try { fn(); } catch (_) {}
  }

  function updateDomElements() {
    safeRunDomStep(ensureDarkThemeStyles);
    safeRunDomStep(replaceHomeCategoryThumbnails);
    safeRunDomStep(replaceCategoryHeroIllustrations);
    safeRunDomStep(upgradeAffiliateModeSelectors);
    safeRunDomStep(updateDramaLabels);
    safeRunDomStep(normalizeGlobalContentLangTextAndControls);
    safeRunDomStep(renderDramaControls);
    safeRunDomStep(syncGlobalControls);
    safeRunDomStep(syncDramaThemeChips);
    safeRunDomStep(normalizeUnlockedTheme);
    safeRunDomStep(enhanceBot1CopyControls);
    var selectors = "textarea, pre, code, [data-prompt], .prompt-box, #out, .out";
    var elements = document.querySelectorAll(selectors);
    elements.forEach(function(el) {
      if (el.id === "lirva-drama-handoff-input") return; // skip custom input
      if (el.className && typeof el.className === "string" && el.className.indexOf("lirva-bot1-manual-textarea") !== -1) return;
      var isInput = el.tagName === "TEXTAREA" || el.tagName === "INPUT";
      var content = isInput ? el.value : el.textContent;
      if (isProtectedBotContext(content, el)) return; // never overwrite Bot instructions
      var inDramaPanel = isElementInVisibleDramaPanel(el);
      if (content && content.length > 50 && (inDramaPanel || content.includes("Hook") || content.includes("Prompt") || content.includes("Scene") || content.includes("Taglish") || content.includes("English") || content.includes("Tagalog") || content.includes("Content Language") || content.includes("Wika ng content") || content.includes("ChatGPT") || content.includes("Gemini") || content.includes("Exact Spoken Words") || content.includes("Verbatim") || content.includes("Bahagi") || content.includes("Tema") || content.includes("Drama") || content.includes("kuwento") || content.includes("tauhan") || content.includes("Episode") || content.includes("Visual Style") || content.includes("Story Theme") || content.includes("Character Reference Sheet") || content.includes("PROJECT STATUS AND SELECTED OPTIONS") || content.includes("SELECTED WORKSPACE SETTINGS") || content.includes("GENERATOR BEFORE TIMING"))) {
        var updated = applyRulesToText(content, inDramaPanel ? "drama" : null, el);
        if (updated !== content) {
          if (isInput) {
            el.value = updated;
            el.dispatchEvent(new Event("input", { bubbles: true }));
          } else {
            el.textContent = updated;
          }
        }
      }
    });
  }

  function installClipboardInterceptor() {
    if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function" && !navigator.clipboard.__lirvaWrapped) {
      var origWriteText = navigator.clipboard.writeText;
      var wrappedWriteText = function(text) {
        var finalTxt = text;
        try {
          if (typeof window !== "undefined" && window.__lirvaBot1DirectWrite) {
            window.__lirvaBot1DirectWrite = false;
            return origWriteText.call(this, String(finalTxt).replace(/\\r\\n?/g, "\\n"));
          }
          if (isProtectedBotContext(text, null)) {
            var wasBotTapActive = typeof window !== "undefined" && !!window.__lirvaBot1CopyActive;
            if (typeof window !== "undefined") {
              window.__lirvaBot1CopyActive = false;
              if (window.__lirvaBot1Timer) clearTimeout(window.__lirvaBot1Timer);
            }
            if (wasBotTapActive && isUrlOrButtonLabelOnly(finalTxt, (typeof window !== "undefined" && window.__lirvaBot1LastTapBtn) || null)) {
              if (typeof window !== "undefined" && window.__lirvaBot1LastTapCard) {
                ensureBot1CopyStyles();
                var badUi = getOrCreateBot1FeedbackArea(window.__lirvaBot1LastTapCard);
                if (badUi && badUi.statusEl) {
                  badUi.statusEl.setAttribute("data-state", "failed");
                  badUi.statusEl.textContent = "Hindi nakopya ang instructions. Subukan ulit i-tap ang button.";
                }
              }
              return Promise.reject(new Error("Blocked non-instruction Bot 1 copy payload"));
            }
            var bot1Cards = findBot1Cards();
            var targetCard = (typeof window !== "undefined" && window.__lirvaBot1LastTapCard) || (bot1Cards && bot1Cards[0]) || null;
            if (targetCard && typeof finalTxt === "string" && !isUrlOrButtonLabelOnly(finalTxt, null)) {
              if (!isInvalidOrTruncatedBot1Source(finalTxt) && !targetCard.__lirvaBot1ComputerOrig) {
                targetCard.__lirvaBot1ComputerOrig = finalTxt.replace(/\\r\\n?/g, "\\n");
                try { targetCard.setAttribute("data-lirva-bot1-computer-orig", targetCard.__lirvaBot1ComputerOrig); } catch (_) {}
              }
              finalTxt = resolveBot1Instructions(targetCard, (typeof window !== "undefined" && window.__lirvaBot1LastTapBtn) || null);
            } else if (!targetCard && typeof finalTxt === "string" && /any\\s+generated\\s+discr/i.test(finalTxt)) {
              finalTxt = getActiveBot1DeviceMode() === "computer" ? buildBot1ComputerFallback(getActiveContentLanguage()) : buildBot1PhoneInstructions(getActiveContentLanguage());
            } else if (targetCard) {
              finalTxt = resolveBot1Instructions(targetCard, (typeof window !== "undefined" && window.__lirvaBot1LastTapBtn) || null);
            }
            return origWriteText.call(this, String(finalTxt).replace(/\\r\\n?/g, "\\n"));
          }
          if (typeof text === "string" && text.length > 50 && (text.includes("Hook") || text.includes("Prompt") || text.includes("Scene") || text.includes("Taglish") || text.includes("English") || text.includes("Tagalog") || text.includes("Content Language") || text.includes("Wika ng content") || text.includes("ChatGPT") || text.includes("Gemini") || text.includes("Exact Spoken Words") || text.includes("Verbatim") || text.includes("Bahagi") || text.includes("Tema") || text.includes("Drama") || text.includes("kuwento") || text.includes("tauhan") || text.includes("Episode") || text.includes("Visual Style") || text.includes("Story Theme") || text.includes("Character Reference Sheet") || text.includes("PROJECT STATUS AND SELECTED OPTIONS") || text.includes("SELECTED WORKSPACE SETTINGS") || text.includes("GENERATOR BEFORE TIMING"))) {
            var activeOut = null;
            if (typeof document !== "undefined" && document.querySelectorAll) {
              var cands = document.querySelectorAll("#out, .prompt-box, .out");
              for (var ci = 0; ci < cands.length; ci++) {
                if (isVisibleElement(cands[ci]) && !isProtectedBotContext("", cands[ci])) {
                  activeOut = cands[ci];
                  break;
                }
              }
              if (!activeOut) {
                for (var cj = 0; cj < cands.length; cj++) {
                  if (!isProtectedBotContext("", cands[cj])) { activeOut = cands[cj]; break; }
                }
              }
            }
            var catHint = isElementInVisibleDramaPanel(activeOut) ? "drama" : null;
            finalTxt = applyRulesToText(text, catHint, activeOut);
          }
        } catch (_) {}
        return origWriteText.call(this, finalTxt);
      };
      try {
        navigator.clipboard.writeText = wrappedWriteText;
        navigator.clipboard.__lirvaWrapped = true;
      } catch (_) {}
    }
  }
  installClipboardInterceptor();

  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("copy", function(e) {
      try {
        var tgt = e && e.target ? e.target : null;
        if (tgt && tgt.id === "lirva-drama-handoff-input") return;
        var selObj = typeof window !== "undefined" && window.getSelection ? window.getSelection() : null;
        var selectedText = selObj ? String(selObj.toString() || "") : "";
        var anchorEl = selObj && selObj.anchorNode ? (selObj.anchorNode.nodeType === 1 ? selObj.anchorNode : selObj.anchorNode.parentElement) : null;
        if (isProtectedBotContext(selectedText, tgt) || (anchorEl && isProtectedBotContext("", anchorEl))) {
          return;
        }
        var promptEl = tgt && tgt.closest ? tgt.closest("#out, .prompt-box, .out, [data-prompt], pre, code") : null;
        if (!promptEl && anchorEl && anchorEl.closest) {
          promptEl = anchorEl.closest("#out, .prompt-box, .out, [data-prompt], pre, code");
        }
        if ((!selectedText || selectedText.length <= 50) && tgt && tgt.tagName === "TEXTAREA" && typeof tgt.value === "string" && tgt.value.length > 50) {
          selectedText = tgt.value;
        }
        if (!promptEl && selectedText && selectedText.length > 50 && document.querySelectorAll) {
          var cands = document.querySelectorAll("#out, .prompt-box, .out");
          for (var ci = 0; ci < cands.length; ci++) {
            if (isVisibleElement(cands[ci]) && !isProtectedBotContext("", cands[ci])) { promptEl = cands[ci]; break; }
          }
          if (!promptEl) {
            for (var cj = 0; cj < cands.length; cj++) {
              if (!isProtectedBotContext("", cands[cj])) { promptEl = cands[cj]; break; }
            }
          }
        }
        if (selectedText && selectedText.length > 50 && e.clipboardData && typeof e.clipboardData.setData === "function") {
          var isKnownPrompt = Boolean(promptEl) || selectedText.includes("Hook") || selectedText.includes("Prompt") || selectedText.includes("Taglish") || selectedText.includes("English") || selectedText.includes("Content Language") || selectedText.includes("Wika ng content") || selectedText.includes("Drama") || selectedText.includes("Character Reference Sheet") || selectedText.includes("PROJECT STATUS AND SELECTED OPTIONS") || selectedText.includes("SELECTED WORKSPACE SETTINGS") || selectedText.includes("GENERATOR BEFORE TIMING");
          if (isKnownPrompt) {
            var transformed = applyRulesToText(selectedText, isElementInVisibleDramaPanel(promptEl) ? "drama" : null, promptEl);
            if (transformed && transformed !== selectedText) {
              e.clipboardData.setData("text/plain", transformed);
              e.preventDefault();
            }
          }
        }
      } catch (_) {}
    }, true);
  }

  // Event-driven updates on user actions (input, change, click, keyboard activation, navigation)
  document.addEventListener("click", function(e) {
    installClipboardInterceptor();
    try {
      var globalTgt = e && e.target && e.target.closest ? e.target.closest("[data-lirva-global-option='true']") : null;
      if (globalTgt) {
        var gKey = globalTgt.getAttribute("data-lirva-global-group-key");
        var gVal = globalTgt.getAttribute("data-lirva-global-value");
        if (gKey && gVal) applyGlobalSelection(gKey, gVal);
      }
      var chipTgt = e && e.target && e.target.closest ? e.target.closest("[data-lirva-theme-chip='true']") : null;
      if (chipTgt) {
        applyThemeSelection(getThemeChipLabel(chipTgt));
      }
    } catch (_) {}
    updateDomElements();
    setTimeout(updateDomElements, 0);
    setTimeout(updateDomElements, 30);
    setTimeout(updateDomElements, 120);
  }, false);

  document.addEventListener("keyup", function(e) {
    var k = e && e.key ? e.key : "";
    if (k === "Enter" || k === " " || k === "Spacebar") {
      setTimeout(updateDomElements, 20);
      setTimeout(updateDomElements, 100);
    }
  }, true);

  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("hashchange", updateDomElements, true);
    window.addEventListener("popstate", updateDomElements, true);
  }

  document.addEventListener("input", function(e) {
    var target = e.target;
    if (target && target.id === "lirva-drama-handoff-input") return; // Handled directly
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) {
      setTimeout(function() {
        updateDomElements();
      }, 100);
    }
  }, true);

  document.addEventListener("change", function(e) {
    var target = e.target;
    if (target && target.tagName === "INPUT" && target.type === "radio" && target.checked) {
      var radioOpt = target.closest ? target.closest("[data-lirva-global-option='true']") : null;
      if (!radioOpt && target.id && document.querySelector) {
        radioOpt = document.querySelector("label[for='" + String(target.id).replace(/'/g, "\\\\'") + "'][data-lirva-global-option='true']");
      }
      if (radioOpt) {
        var rKey = radioOpt.getAttribute("data-lirva-global-group-key");
        var rVal = radioOpt.getAttribute("data-lirva-global-value");
        if (rKey && rVal) applyGlobalSelection(rKey, rVal);
      }
    }
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) {
      setTimeout(function() {
        updateDomElements();
      }, 50);
    }
  }, true);

  // Lightweight debounced MutationObserver for async view transitions and hidden-panel reveals
  var domObsTimer = null;
  if (typeof MutationObserver !== "undefined" && document.documentElement) {
    try {
      var obs = new MutationObserver(function(mutations) {
        var relevant = false;
        for (var mi = 0; mi < mutations.length; mi++) {
          var tgt = mutations[mi].target;
          if (!tgt || !tgt.closest) { relevant = true; break; }
          if (tgt.closest(".lirva-cat-thumb-frame, .lirva-cat-hero-frame, .lirva-aff-mode-grid, .lirva-aff-mode-card, .lirva-bot1-feedback-area, .lirva-bot1-mode-box, #lirva-drama-style-section, #lirva-drama-story-mode-section")) continue;
          if (mutations[mi].type === "attributes") {
            var attrName = mutations[mi].attributeName || "";
            if (/^data-lirva-/.test(attrName)) continue;
            if (attrName === "class" || attrName === "style" || attrName === "hidden" || attrName === "aria-hidden") {
              relevant = true;
              break;
            }
          } else if (mutations[mi].addedNodes && mutations[mi].addedNodes.length > 0) {
            relevant = true;
            break;
          }
        }
        if (!relevant) return;
        if (domObsTimer) clearTimeout(domObsTimer);
        domObsTimer = setTimeout(updateDomElements, 40);
      });
      obs.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style", "hidden", "aria-hidden"] });
    } catch (_) {}
  }

  updateGlobalData();
  wrapBuilderFunctions();
  updateDomElements();
  setTimeout(updateDomElements, 100);
  setTimeout(updateDomElements, 300);
  setTimeout(updateDomElements, 600);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      updateGlobalData();
      wrapBuilderFunctions();
      updateDomElements();
      setTimeout(updateDomElements, 100);
      setTimeout(updateDomElements, 300);
      setTimeout(updateDomElements, 600);
    });
  }
})();
<\/script>`;
