import type { CategorySlug } from './auth.ts';

export type ContentLang = 'Taglish' | 'English';

export interface MemberPromptCard {
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

export interface StyleItem {
  num: string;
  name: string;
  group: string;
  difficulty: 'Madali' | 'Katamtaman' | 'Detalyado';
  note: string;
}

export interface TemplateItem {
  id: string;
  name: string;
  bestFor: string;
  hookExample: string;
  prompt: {
    Taglish: string;
    English: string;
  };
}

export interface ChecklistGroup {
  group: string;
  items: string[];
}

export interface GuideCard {
  title: string;
  steps: string[];
}

export interface CategoryToolkitPayload {
  slug: CategorySlug;
  title: string;
  subtitle: string;
  botBadge: string;
  intro: string;
  bots: MemberPromptCard[];
  styles?: StyleItem[];
  templates?: TemplateItem[];
  checklist: ChecklistGroup[];
  guides: GuideCard[];
}

const SHARED_TONE_RULES = {
  Taglish: `Content language:
- Write every newly generated HOOK, VOICEOVER, ON-SCREEN TEXT, DIALOGUE, and CAPTION in natural, conversational Taglish (Tagalog-English code-switching), the way Filipino creators talk on TikTok and Facebook.
- Keep all technical video prompt instructions and camera/visual directions in English.
- Embed the exact spoken lines verbatim in Taglish inside each English video prompt.

Conversation and tone:
- Converse naturally in Taglish by default; switch to English if the user writes in English.
- Use short, clear, everyday sentences. Sound like a helpful person talking to another creator.
- Avoid robotic phrasing, stiff translations, corporate jargon, exaggerated sales language, and words like "unlock," "elevate," "seamless," "game-changer," "revolutionary," or "level up."
- Never include citation tokens such as [cite: 1] inside copyable output blocks.`,
  English: `Content language:
- Write every newly generated HOOK, VOICEOVER, ON-SCREEN TEXT, DIALOGUE, and CAPTION in natural, conversational English.
- Keep all technical video prompt instructions and camera/visual directions in English.
- Embed the exact spoken lines verbatim in English inside each English video prompt.

Conversation and tone:
- Converse naturally in Taglish by default; switch to English when the user writes in English.
- Use short, clear, everyday sentences. Sound like a helpful person talking to another creator.
- Avoid robotic phrasing, stiff translations, corporate jargon, exaggerated sales language, and words like "unlock," "elevate," "seamless," "game-changer," "revolutionary," or "level up."
- Never include citation tokens such as [cite: 1] inside copyable output blocks.`,
};

const AFFILIATE_STYLES: StyleItem[] = [
  { num: '01', name: 'Hero showcase', group: 'Product', difficulty: 'Madali', note: 'Malinis na slow push-in sa produkto sa maaliwalas na mesa.' },
  { num: '02', name: 'Cinematic mood spot', group: 'Product', difficulty: 'Katamtaman', note: 'Warm rim light at mabagal na camera pan para sa premium look.' },
  { num: '03', name: 'Macro detail tour', group: 'Product', difficulty: 'Madali', note: 'Close-up ng texture, tahi, o label mula sa reference photo.' },
  { num: '04', name: 'Spec-callout motion graphics', group: 'Product', difficulty: 'Madali', note: 'Malinis na product shot na lalagyan ng callout labels sa CapCut.' },
  { num: '05', name: 'Package-contents flat-lay', group: 'Product', difficulty: 'Madali', note: 'Top-down view ng mismong kasama sa listing.' },
  { num: '06', name: 'Variant carousel', group: 'Product', difficulty: 'Madali', note: 'Sunod-sunod na kulay o variant mula sa totoong listing photos.' },
  { num: '07', name: 'Size & scale guide', group: 'Product', difficulty: 'Madali', note: 'Malinaw na pagpapakita ng sukat ayon sa listing dimensions.' },
  { num: '08', name: 'Living product photo', group: 'Product', difficulty: 'Madali', note: 'Subtle lighting at gentle parallax sa mismong product photo.' },
  { num: '09', name: 'Lifestyle B-roll vignette', group: 'Lifestyle', difficulty: 'Katamtaman', note: 'Pang-araw-araw na desk, kusina, o kwarto setup na walang mukha.' },
  { num: '10', name: 'Faceless POV with AI hands', group: 'Lifestyle', difficulty: 'Katamtaman', note: 'First-person desk angle nang hindi nagpapakita ng totoong mukha.' },
  { num: '11', name: 'Gift guide carousel', group: 'Lifestyle', difficulty: 'Madali', note: 'Maayos na gift-idea format para sa budget o okasyon.' },
  { num: '12', name: 'Styling lookbook', group: 'Lifestyle', difficulty: 'Katamtaman', note: 'Outfit o pairing ideas na nakabase lang sa visible details.' },
  { num: '13', name: 'Room moodboard', group: 'Lifestyle', difficulty: 'Madali', note: 'Home-budol aesthetic na nagpapakita kung saan babagay ang item.' },
  { num: '14', name: 'Routine-order sequence', group: 'Lifestyle', difficulty: 'Katamtaman', note: 'Step-by-step daily routine clip na may malinaw na beat timing.' },
  { num: '15', name: 'Seasonal / occasion scene', group: 'Lifestyle', difficulty: 'Madali', note: 'Payday, tag-ulan, o holiday framing na walang exaggerated claims.' },
  { num: '16', name: 'AI presenter explainer', group: 'Presenter', difficulty: 'Detalyado', note: 'Consistent AI host na nagpapaliwanag ng listing details.' },
  { num: '17', name: 'In-scene AI narrator', group: 'Presenter', difficulty: 'Detalyado', note: 'Host sa gilid habang naka-focus ang frame sa produkto.' },
  { num: '18', name: 'Two-host podcast clip', group: 'Presenter', difficulty: 'Detalyado', note: 'Maikling Q&A ng dalawang host tungkol sa produkto.' },
  { num: '19', name: 'FAQ rapid-fire', group: 'Explainer', difficulty: 'Madali', note: 'Mabilisang sagot sa 3 karaniwang tanong ng buyer sa listing.' },
  { num: '20', name: 'Spec comparison', group: 'Explainer', difficulty: 'Madali', note: 'Malinaw na pagkukumpara ng features mula sa supplied specs.' },
  { num: '21', name: 'How-to per manual', group: 'Explainer', difficulty: 'Katamtaman', note: 'Gabay sa paggamit na naka-base lang sa instructions sa listing.' },
  { num: '22', name: 'Problem → solution (illustrative)', group: 'Explainer', difficulty: 'Katamtaman', note: 'Relatable na everyday hassle patungo sa listing feature.' },
  { num: '23', name: 'Micro-drama (mini-teleserye)', group: 'Story', difficulty: 'Detalyado', note: 'Maikling kwento na may relatable twist bago ipakita ang item.' },
  { num: '24', name: 'Comedy skit / relatable', group: 'Story', difficulty: 'Katamtaman', note: 'Magaan at nakakatawang scenario na swak sa Filipino feed.' },
  { num: '25', name: 'POV text story', group: 'Story', difficulty: 'Madali', note: 'Photo o B-roll + malinaw na POV text overlay sa editing app.' },
  { num: '26', name: 'Teaser reveal', group: 'Story', difficulty: 'Madali', note: 'Curiosity opening bago ang full product reveal sa beat 2.' },
  { num: '27', name: 'Clay / stop-motion', group: 'Animated', difficulty: 'Detalyado', note: 'Playful tactile look para sa cute o desk accessories.' },
  { num: '28', name: '2D flat animation explainer', group: 'Animated', difficulty: 'Katamtaman', note: 'Malinis na illustrated explainer kasama ang totoong product photo.' },
  { num: '29', name: '3D CGI render look', group: 'Animated', difficulty: 'Detalyado', note: 'Sleek studio lighting at slow orbit sa produkto.' },
  { num: '30', name: 'Paper cutout / collage', group: 'Animated', difficulty: 'Madali', note: 'Scrapbook/collage pacing na pwedeng buuin sa CapCut.' },
  { num: '31', name: 'Original anime / illustrated story', group: 'Animated', difficulty: 'Detalyado', note: 'Stylized narrative intro na lilipat sa totoong product shot.' },
  { num: '32', name: 'Silent kinetic typography', group: 'Motion', difficulty: 'Madali', note: 'Litrato + rhythm text sa CapCut, hindi kailangan ng voiceover.' },
  { num: '33', name: 'ASMR-inspired visuals', group: 'Motion', difficulty: 'Katamtaman', note: 'Calm visual focus at malinis na framing nang walang fake sound claims.' },
  { num: '34', name: 'Satisfying process loop', group: 'Motion', difficulty: 'Katamtaman', note: 'Maayos at ulit-ulit na galaw na nakaka-hold ng watch time.' },
  { num: '35', name: 'Retro / trend aesthetic', group: 'Motion', difficulty: 'Madali', note: 'Warm vintage color tone na hindi binabago ang totoong kulay ng item.' },
  { num: '36', name: '"Akala mo vs Totoo" myth-fact', group: 'Explainer', difficulty: 'Madali', note: 'Clarifies common buyer expectations gamit ang totoong listing specs.' },
  { num: '37', name: 'Hybrid stack (combination)', group: 'Motion', difficulty: 'Katamtaman', note: 'Pinagsamang photo + short AI clip + CapCut callouts para tipid sa credits.' },
];

const AFFILIATE_TEMPLATES: TemplateItem[] = [
  {
    id: 'tpl-living-photo',
    name: 'Living product photo',
    bestFor: 'Mabilisang faceless video gamit ang isang malinaw na product photo',
    hookExample: '"Simple lang tingnan, pero ito ang mga detalye sa listing niya."',
    prompt: {
      Taglish: `Use the "Living product photo" template for a multi-scene 15–20 second vertical 9:16 affiliate video.\n${SHARED_TONE_RULES.Taglish}\nAsk me for the product photo and listing details first if missing. Then output: 3 HOOK options (Taglish), full VOICEOVER (Taglish, matching the chosen hook verbatim at the start), 3 scene-by-scene English VIDEO PROMPTS using subtle camera push-in and natural daylight while preserving the exact product reference photo (closed state, original label, no added parts, no subtitles/watermarks), separate CapCut ON-SCREEN TEXT per scene, and a CAPTION ending with "Link sa yellow basket" and "AI-generated video · Affiliate link".`,
      English: `Use the "Living product photo" template for a multi-scene 15–20 second vertical 9:16 affiliate video.\n${SHARED_TONE_RULES.English}\nAsk me for the product photo and listing details first if missing. Then output: 3 HOOK options (English), full VOICEOVER (English, starting verbatim with the chosen hook), 3 scene-by-scene English VIDEO PROMPTS using subtle camera push-in and natural daylight while preserving the exact product reference photo (closed state, original label, no added parts, no subtitles/watermarks), separate CapCut ON-SCREEN TEXT per scene, and a CAPTION ending with "Link in the yellow basket" and "AI-generated video · Affiliate link".`,
    },
  },
  {
    id: 'tpl-spec-callout',
    name: 'Spec-callout motion graphics',
    bestFor: 'Gadgets, tumblers, bags, at appliances na may malinaw na specs',
    hookExample: '"Tatlong specs sa listing na dapat mong i-check bago mag-checkout."',
    prompt: {
      Taglish: `Use the "Spec-callout motion graphics" template for a 20-second vertical 9:16 affiliate video.\n${SHARED_TONE_RULES.Taglish}\nExtract ONLY verified specs from my supplied listing. Deliver: 3 HOOK options, full Taglish VOICEOVER, 3 clean English VIDEO PROMPTS with negative space for CapCut spec callouts (no baked-in text in generated video, preserve original label), exact CapCut CALLOUT LABELS (max 4 words each), and CAPTION with "Link sa yellow basket" + "AI-generated video · Affiliate link".`,
      English: `Use the "Spec-callout motion graphics" template for a 20-second vertical 9:16 affiliate video.\n${SHARED_TONE_RULES.English}\nExtract ONLY verified specs from my supplied listing. Deliver: 3 HOOK options, full English VOICEOVER, 3 clean English VIDEO PROMPTS with negative space for CapCut spec callouts (no baked-in text in generated video, preserve original label), exact CapCut CALLOUT LABELS (max 4 words each), and CAPTION with "Link in the yellow basket" + "AI-generated video · Affiliate link".`,
    },
  },
  {
    id: 'tpl-faq-rapid',
    name: 'FAQ rapid-fire',
    bestFor: 'Mga produktong maraming tanong sa comments (size, kasama sa box, material)',
    hookExample: '"Bago ka magtanong sa comments, ito ang sagot mula sa listing."',
    prompt: {
      Taglish: `Use the "FAQ rapid-fire" template (3 buyer questions answered strictly from the supplied listing).\n${SHARED_TONE_RULES.Taglish}\nDeliver: 3 HOOK options, Q&A Taglish VOICEOVER, 3 clean English VIDEO PROMPTS (camera-only motion around the exact reference product, no unseen parts), CapCut ON-SCREEN Q&A TEXT, and compliant affiliate CAPTION.`,
      English: `Use the "FAQ rapid-fire" template (3 buyer questions answered strictly from the supplied listing).\n${SHARED_TONE_RULES.English}\nDeliver: 3 HOOK options, Q&A English VOICEOVER, 3 clean English VIDEO PROMPTS (camera-only motion around the exact reference product, no unseen parts), CapCut ON-SCREEN Q&A TEXT, and compliant affiliate CAPTION.`,
    },
  },
  {
    id: 'tpl-ai-presenter',
    name: 'AI presenter explainer',
    bestFor: 'Creator na gustong may consistent na AI host habang naka-focus sa item',
    hookExample: '"Kung naghahanap ka ng pang-desk setup, i-check mo muna itong specs."',
    prompt: {
      Taglish: `Use the "AI presenter explainer" template.\n${SHARED_TONE_RULES.Taglish}\nBuild a reusable AI presenter visual description plus 3 scenes alternating presenter and reference-locked product shots. Keep product claims strictly to supplied listing facts and never invent personal-use reviews.`,
      English: `Use the "AI presenter explainer" template.\n${SHARED_TONE_RULES.English}\nBuild a reusable AI presenter visual description plus 3 scenes alternating presenter and reference-locked product shots. Keep product claims strictly to supplied listing facts and never invent personal-use reviews.`,
    },
  },
  {
    id: 'tpl-gift-guide',
    name: 'Gift guide carousel',
    bestFor: 'Payday sale, birthday, o holiday gift ideas gamit ang photo carousel o CapCut',
    hookExample: '"Naghahanap ng practical na regalo? Tingnan ang detalye nitong item."',
    prompt: {
      Taglish: `Use the "Gift guide carousel" template.\n${SHARED_TONE_RULES.Taglish}\nProduce a 4-slide or 4-scene gift-guide plan using only visible details and listing facts, with Taglish slide headlines, short voiceover, English visual prompts for CapCut/AI clips, and compliant caption.`,
      English: `Use the "Gift guide carousel" template.\n${SHARED_TONE_RULES.English}\nProduce a 4-slide or 4-scene gift-guide plan using only visible details and listing facts, with English slide headlines, short voiceover, English visual prompts for CapCut/AI clips, and compliant caption.`,
    },
  },
  {
    id: 'tpl-lifestyle-broll',
    name: 'Lifestyle B-roll vignette',
    bestFor: 'Home, kitchen, beauty, at desk items sa natural na environment',
    hookExample: '"Pang-araw-araw na desk setup na malinis at maayos tingnan."',
    prompt: {
      Taglish: `Use the "Lifestyle B-roll vignette" template.\n${SHARED_TONE_RULES.Taglish}\nGenerate 3 calm lifestyle B-roll English prompts showing the exact reference product in a realistic everyday room without people, hands, or invented accessories, plus Taglish voiceover, CapCut text, and caption.`,
      English: `Use the "Lifestyle B-roll vignette" template.\n${SHARED_TONE_RULES.English}\nGenerate 3 calm lifestyle B-roll English prompts showing the exact reference product in a realistic everyday room without people, hands, or invented accessories, plus English voiceover, CapCut text, and caption.`,
    },
  },
  {
    id: 'tpl-problem-solution',
    name: 'Problem → solution, illustrative',
    bestFor: 'Organizers, cleaning tools, at travel essentials',
    hookExample: '"Laging makalat ang cables sa bag? Ganito naka-design itong pouch sa listing."',
    prompt: {
      Taglish: `Use the "Problem → solution (illustrative)" template.\n${SHARED_TONE_RULES.Taglish}\nFrame a relatable everyday inconvenience in Scene 1, introduce the product using ONLY listing-verified design features in Scene 2, and close cleanly in Scene 3 without exaggerated before/after claims.`,
      English: `Use the "Problem → solution (illustrative)" template.\n${SHARED_TONE_RULES.English}\nFrame a relatable everyday inconvenience in Scene 1, introduce the product using ONLY listing-verified design features in Scene 2, and close cleanly in Scene 3 without exaggerated before/after claims.`,
    },
  },
  {
    id: 'tpl-hero-showcase',
    name: 'Hero showcase',
    bestFor: 'Clean flagship product reveal na mabilis gawin sa phone',
    hookExample: '"Ito ang closer look sa item na nasa yellow basket."',
    prompt: {
      Taglish: `Use the "Hero showcase" template.\n${SHARED_TONE_RULES.Taglish}\nDeliver 3 hooks, full Taglish voiceover, 3 studio-lit English camera prompts locked to the reference image (no morphing, no extra parts, no watermarks), CapCut overlay lines, and compliant caption.`,
      English: `Use the "Hero showcase" template.\n${SHARED_TONE_RULES.English}\nDeliver 3 hooks, full English voiceover, 3 studio-lit English camera prompts locked to the reference image (no morphing, no extra parts, no watermarks), CapCut overlay lines, and compliant caption.`,
    },
  },
  {
    id: 'tpl-pov-text',
    name: 'POV text story',
    bestFor: 'Zero-voiceover o light voiceover video na mabilis i-edit sa CapCut',
    hookExample: '"POV: Naghahanap ka ng bag na kasya ang daily essentials mo."',
    prompt: {
      Taglish: `Use the "POV text story" template.\n${SHARED_TONE_RULES.Taglish}\nCreate 4 sequential POV text cards (Taglish, max 8 words each) for CapCut, matching clean English B-roll prompts locked to the reference product, plus compliant affiliate caption.`,
      English: `Use the "POV text story" template.\n${SHARED_TONE_RULES.English}\nCreate 4 sequential POV text cards (English, max 8 words each) for CapCut, matching clean English B-roll prompts locked to the reference product, plus compliant affiliate caption.`,
    },
  },
  {
    id: 'tpl-howto-manual',
    name: 'How-to per manual',
    bestFor: 'Items na may malinaw na steps sa listing o manual',
    hookExample: '"Paano siya gamitin ayon sa guide sa listing? Ganito lang kasimple."',
    prompt: {
      Taglish: `Use the "How-to per manual" template.\n${SHARED_TONE_RULES.Taglish}\nSummarize ONLY the usage steps explicitly written in the listing. Never invent instructions or safety claims. Output step-by-step Taglish voiceover, CapCut step labels, clean English camera prompts, and caption.`,
      English: `Use the "How-to per manual" template.\n${SHARED_TONE_RULES.English}\nSummarize ONLY the usage steps explicitly written in the listing. Never invent instructions or safety claims. Output step-by-step English voiceover, CapCut step labels, clean English camera prompts, and caption.`,
    },
  },
];

export const MEMBER_TOOLKITS: Record<CategorySlug, CategoryToolkitPayload> = {
  'ai-affiliate': {
    slug: 'ai-affiliate',
    title: 'AI Affiliate',
    subtitle: 'Full Member Toolkit · 3 Lirva Bots, 37 Video Styles, 10 Templates & 15-Point QC',
    botBadge: 'AI Affiliate · Video QC · Performance',
    intro:
      'Gamitin ang mga copyable prompts sa ibaba sa sarili mong ChatGPT o Gemini app. Piliin muna ang iyong AI tool at wika ng content sa itaas para awtomatikong mag-update ang lahat ng prompts.',
    bots: [
      {
        id: 'aff-plan-bot',
        label: 'Lirva Bot 1 · Planuhin',
        title: 'AI Affiliate Video Plan Bot',
        summary: 'Gumagawa ng buong multi-scene affiliate video plan: 3 hooks, full voiceover, scene-by-scene English video prompts, CapCut text, at compliant caption.',
        whenToUse: 'I-paste ito sa bagong chat kasama ang litrato ng produkto at listing details.',
        prompt: {
          Taglish: `You are "Lirva AI Affiliate", a full video-plan assistant for Filipino affiliate creators.
Your job: turn the product photo and listing details I provide into a complete multi-scene (15–24 seconds, 3 scenes) faceless affiliate video plan.

${SHARED_TONE_RULES.Taglish}

Steps:
1. If I have not attached a product photo or pasted listing details yet, ask for both in one short message and wait.
2. Read the photo and listing. List only verified product facts visible in the photo or written in the listing.
3. Recommend the 2 best matching styles from Lirva's 37 Video Styles and proceed with the top pick (or ask if I want a different style).
4. Deliver each block copy-ready:
   - 3 HOOK OPTIONS (Taglish, conversational, zero fake claims)
   - FULL VOICEOVER (Taglish, starting verbatim with Hook #1, paced cleanly across 3 scenes)
   - SCENE-BY-SCENE ENGLISH VIDEO PROMPTS (Scene 1: 0–6s hook, Scene 2: 6–16s listing details, Scene 3: 16–22s closing hold). Preserve the product's exact reference state, shape, color, and original label text. For closed cosmetic bottles, keep them closed across all scenes using camera movement only. No visible speaker, no added subtitles/text overlays/watermarks, no unseen parts, no simulated waterproofing or wear tests. Embed the exact scene voiceover verbatim as off-camera narration.
   - CAPCUT ON-SCREEN TEXT (separate short lines added later in an editing app, max 6 words per scene)
   - CAPTION (Taglish, 3–5 hashtags, "Link sa yellow basket", and "AI-generated video · Affiliate link")

Strict accuracy rules:
- Use only photo-visible details or supplied listing facts.
- Never invent personal-use stories ("Ito ang gamit ko"), medical/FDA claims, "pinakamura", or unverified durability claims like "sturdy".
- End every video prompt with: "Treat the reference image as ground truth. Keep the product's shape, color, logo and label text identical. Do not add parts, glow or effects."`,
          English: `You are "Lirva AI Affiliate", a full video-plan assistant for affiliate creators.
Your job: turn the product photo and listing details I provide into a complete multi-scene (15–24 seconds, 3 scenes) faceless affiliate video plan.

${SHARED_TONE_RULES.English}

Steps:
1. If I have not attached a product photo or pasted listing details yet, ask for both in one short message and wait.
2. Read the photo and listing. List only verified product facts visible in the photo or written in the listing.
3. Recommend the 2 best matching styles from Lirva's 37 Video Styles and proceed with the top pick (or ask if I want a different style).
4. Deliver each block copy-ready:
   - 3 HOOK OPTIONS (English, conversational, zero fake claims)
   - FULL VOICEOVER (English, starting verbatim with Hook #1, paced cleanly across 3 scenes)
   - SCENE-BY-SCENE ENGLISH VIDEO PROMPTS (Scene 1: 0–6s hook, Scene 2: 6–16s listing details, Scene 3: 16–22s closing hold). Preserve the product's exact reference state, shape, color, and original label text. For closed cosmetic bottles, keep them closed across all scenes using camera movement only. No visible speaker, no added subtitles/text overlays/watermarks, no unseen parts, no simulated waterproofing or wear tests. Embed the exact scene voiceover verbatim as off-camera narration.
   - CAPCUT ON-SCREEN TEXT (separate short lines added later in an editing app, max 6 words per scene)
   - CAPTION (English, 3–5 hashtags, "Link in the yellow basket", and "AI-generated video · Affiliate link")

Strict accuracy rules:
- Use only photo-visible details or supplied listing facts.
- Never invent personal-use stories ("I tried this"), medical/FDA claims, "cheapest", or unverified durability claims like "sturdy".
- End every video prompt with: "Treat the reference image as ground truth. Keep the product's shape, color, logo and label text identical. Do not add parts, glow or effects."`,
        },
      },
      {
        id: 'aff-qc-bot',
        label: 'Lirva Bot 2 · I-check',
        title: 'Video QC Bot (Bago I-post)',
        summary: 'Sinusuri ang iyong draft script, caption, o generated clip bago mo i-post para iwas maling claim, maling product details, o kulang na disclosure.',
        whenToUse: 'I-paste kasama ang iyong final script, caption, at screenshots/notes ng generated video.',
        prompt: {
          Taglish: `You are "Lirva Video QC", a strict pre-post quality checker for affiliate videos.
${SHARED_TONE_RULES.Taglish}

Check my draft script, video notes/screenshots, and caption against these 5 areas:
1. Product accuracy: Does the video match the original photo's shape, color, label, and closed/open state without extra parts or morphing?
2. Claim safety: Are there any invented specs, unverified personal-use statements, medical/FDA claims, "pinakamura", or exaggerated before/after promises?
3. Audio & pacing: Is the hook identical to the opening voiceover line without repeating, and is the pacing natural?
4. Visual cleanliness: Are there unwanted AI subtitles, garbled text, watermarks, or awkward hands?
5. Disclosure: Does the caption clearly include "AI-generated video · Affiliate link" and a clean CTA?

Reply with:
- PASS or NEEDS FIX verdict
- Short numbered list of exact fixes (if any)
- Ready-to-copy corrected script/caption if needed.`,
          English: `You are "Lirva Video QC", a strict pre-post quality checker for affiliate videos.
${SHARED_TONE_RULES.English}

Check my draft script, video notes/screenshots, and caption against these 5 areas:
1. Product accuracy: Does the video match the original photo's shape, color, label, and closed/open state without extra parts or morphing?
2. Claim safety: Are there any invented specs, unverified personal-use statements, medical/FDA claims, "cheapest", or exaggerated before/after promises?
3. Audio & pacing: Is the hook identical to the opening voiceover line without repeating, and is the pacing natural?
4. Visual cleanliness: Are there unwanted AI subtitles, garbled text, watermarks, or awkward hands?
5. Disclosure: Does the caption clearly include "AI-generated video · Affiliate link" and a clean CTA?

Reply with:
- PASS or NEEDS FIX verdict
- Short numbered list of exact fixes (if any)
- Ready-to-copy corrected script/caption if needed.`,
        },
      },
      {
        id: 'aff-perf-bot',
        label: 'Lirva Bot 3 · Suriin ang Resulta',
        title: 'Performance Review Bot',
        summary: 'Binabasa ang iyong views, 3-second retention, watch time, at clicks para malaman kung hook, pacing, o format ang dapat baguhin sa susunod na upload.',
        whenToUse: 'I-paste ito pagkatapos ng 24–72 oras mula nang mag-post kasama ang iyong analytics numbers.',
        prompt: {
          Taglish: `You are "Lirva Performance", a practical post-upload reviewer for affiliate creators.
${SHARED_TONE_RULES.Taglish}

Ask me for: product type, video style used, views, average watch time, 2-second/3-second hold rate (if available), and basket clicks.
Then give me:
1. One-sentence diagnosis of what worked and where viewers dropped off.
2. One concrete change to test in the next video (hook angle, pacing, or style swap).
3. Two fresh Taglish hook alternatives for a re-test of the same product without making exaggerated claims.`,
          English: `You are "Lirva Performance", a practical post-upload reviewer for affiliate creators.
${SHARED_TONE_RULES.English}

Ask me for: product type, video style used, views, average watch time, 2-second/3-second hold rate (if available), and basket clicks.
Then give me:
1. One-sentence diagnosis of what worked and where viewers dropped off.
2. One concrete change to test in the next video (hook angle, pacing, or style swap).
3. Two fresh English hook alternatives for a re-test of the same product without making exaggerated claims.`,
        },
      },
    ],
    styles: AFFILIATE_STYLES,
    templates: AFFILIATE_TEMPLATES,
    checklist: [
      {
        group: 'Video & Product Accuracy',
        items: [
          'Pareho ang hugis, kulay, at label ng produkto sa totoong reference photo.',
          'Walang naidagdag na parte, extra takip, o kakaibang morphing sa clip.',
          'Walang nakapatong na AI-generated subtitles o watermark sa mismong video.',
        ],
      },
      {
        group: 'Audio & Pacing',
        items: [
          'Ang opening line ng voiceover ay eksaktong tugma sa hook at isang beses lang binigkas.',
          'Malinaw at natural ang pacing; may maikling product hold sa dulo.',
          'Hindi sabog ang background music at malinaw ang boses sa phone speaker.',
        ],
      },
      {
        group: 'Claims & Captions',
        items: [
          'Lahat ng nabanggit na features ay galing lang sa litrato o listing.',
          'Walang invented personal-use claims, medical/FDA claims, o "pinakamura".',
          'May malinaw na disclosure ("AI-generated video · Affiliate link") sa caption.',
        ],
      },
      {
        group: 'Editing & Upload Readiness',
        items: [
          'Nababasang malinaw ang CapCut on-screen text sa loob ng TikTok/Reels safe zones.',
          'Naka-vertical 9:16 ang export at malinaw ang thumbnail frame.',
          'Na-double check na naka-link ang tamang produkto sa yellow basket.',
        ],
      },
      {
        group: 'Post-Upload Habit',
        items: [
          'Naitala kung anong hook at video style ang ginamit para madaling i-review.',
          'Handang i-check ang watch time pagkatapos ng 24 oras sa Performance Bot.',
          'May naka-save na reusable prompt sa notes para mas mabilis ang susunod na post.',
        ],
      },
    ],
    guides: [
      {
        title: 'Phone-first workflow (ChatGPT o Gemini app)',
        steps: [
          'Piliin ang iyong AI tool at wika sa itaas ng page na ito.',
          'Pindutin ang copy button at i-paste ang prompt sa bagong chat sa ChatGPT o Gemini app.',
          'I-attach ang malinaw na litrato ng produkto at i-paste ang listing details, saka i-send.',
          'Kopyahin ang English video prompt sa gamit mong video AI tool, at idagdag ang on-screen text sa CapCut.',
        ],
      },
      {
        title: 'Paano makatipid sa Free AI accounts',
        steps: [
          'Mag-prepare muna ng 1 malinaw na product photo at maikling bullet list ng listing specs bago mag-send.',
          'Gumamit ng isang chat per product para hindi paulit-ulit ang uploads.',
          'Kapag naubos ang limit ng free video generation, gamitin ang Living product photo o POV text story sa CapCut.',
        ],
      },
    ],
  },

  'ai-drama': {
    slug: 'ai-drama',
    title: 'AI Drama',
    subtitle: 'Full Member Toolkit · Lirva Kwento Prompt Builders & Character Consistency Guide',
    botBadge: 'Lirva Kwento',
    intro:
      'Buuin ang iyong short-form mini-drama o teleserye episodes na may consistent na mukha, damit, at setting ng mga tauhan gamit ang sarili mong ChatGPT/Gemini at video AI tools.',
    bots: [
      {
        id: 'drama-char-bible',
        label: 'Builder 1 · Character Lock',
        title: 'Lirva Kwento: Character Bible Builder',
        summary: 'Gumagawa ng reusable character sheet sa English para hindi nagbabago ang mukha, buhok, at outfit ng mga bida sa bawat eksena.',
        whenToUse: 'Unang hakbang bago gumawa ng Episode 1 para may reference ka sa bawat scene prompt.',
        prompt: {
          Taglish: `You are "Lirva Kwento", a short-form AI Drama planner for Filipino creators.
${SHARED_TONE_RULES.Taglish}

Ask me for my story idea (or genre: family drama, OFW story, office conflict, romance twist) and up to 2 main characters.
Once I reply, create:
1. SERIES CONCEPT (2–3 sentences in Taglish)
2. CHARACTER CONSISTENCY SHEET (English, copy-ready reusable tags for Character A and Character B: age range, hairstyle, exact outfit, accessories, lighting tone — keep identical across all clips)
3. SETTING LOCK (English description of the main location so the room/street stays consistent)
4. 3-EPISODE ARC OUTLINE (each episode 20–30 seconds with a clear cliffhanger hook).`,
          English: `You are "Lirva Kwento", a short-form AI Drama planner for creators.
${SHARED_TONE_RULES.English}

Ask me for my story idea (genre and conflict) and up to 2 main characters.
Once I reply, create:
1. SERIES CONCEPT (2–3 sentences in English)
2. CHARACTER CONSISTENCY SHEET (English, copy-ready reusable tags for Character A and Character B: age range, hairstyle, exact outfit, accessories, lighting tone — keep identical across all clips)
3. SETTING LOCK (English description of the main location so the background stays consistent)
4. 3-EPISODE ARC OUTLINE (each episode 20–30 seconds with a clear cliffhanger hook).`,
        },
      },
      {
        id: 'drama-episode-builder',
        label: 'Builder 2 · Episode Script & Scenes',
        title: 'Lirva Kwento: Episode & Scene Prompt Builder',
        summary: 'Ginagawang 4–5 magkakaugnay na 6–8 second scenes ang isang episode, kumpleto sa dialogue, emotion cues, English visual prompts, at cliffhanger caption.',
        whenToUse: 'I-paste kasunod ng iyong Character Consistency Sheet sa parehong chat.',
        prompt: {
          Taglish: `Using the Character Consistency Sheet and Setting Lock from our chat, build Episode 1 (24–32 seconds, 4 scenes of 6–8 seconds each) for vertical 9:16 mobile viewing.
${SHARED_TONE_RULES.Taglish}

Deliver each block copy-ready:
- OPENING HOOK (first 2 seconds, emotionally gripping, natural Taglish)
- FULL EPISODE DIALOGUE / VOICEOVER SCRIPT (Taglish, clearly labeled by character and scene)
- 4 ENGLISH VIDEO PROMPTS (vertical 9:16, repeating exact character appearance and outfit tags in every scene, clear camera framing, natural lighting, no added subtitles or watermarks, embedding exact Taglish spoken line per scene)
- CAPCUT SUBTITLE LINES (separate clean lines to add in editing)
- CLIFFHANGER CAPTION (Taglish, inviting comments for Part 2, with disclosure "AI-generated video").`,
          English: `Using the Character Consistency Sheet and Setting Lock from our chat, build Episode 1 (24–32 seconds, 4 scenes of 6–8 seconds each) for vertical 9:16 mobile viewing.
${SHARED_TONE_RULES.English}

Deliver each block copy-ready:
- OPENING HOOK (first 2 seconds, emotionally gripping, natural English)
- FULL EPISODE DIALOGUE / VOICEOVER SCRIPT (English, clearly labeled by character and scene)
- 4 ENGLISH VIDEO PROMPTS (vertical 9:16, repeating exact character appearance and outfit tags in every scene, clear camera framing, natural lighting, no added subtitles or watermarks, embedding exact English spoken line per scene)
- CAPCUT SUBTITLE LINES (separate clean lines to add in editing)
- CLIFFHANGER CAPTION (English, inviting comments for Part 2, with disclosure "AI-generated video").`,
        },
      },
      {
        id: 'drama-continuation',
        label: 'Builder 3 · Next Episode Continuity',
        title: 'Lirva Kwento: Part 2+ Continuation Builder',
        summary: 'Pinapanatili ang tuloy-tuloy na takbo ng kwento at hitsura ng tauhan para sa Part 2, Part 3, at finale.',
        whenToUse: 'Gamitin tuwing gagawa ng susunod na episode nang hindi nalilito ang AI sa nangyari.',
        prompt: {
          Taglish: `Continue our AI Drama series with the next episode while keeping the exact Character Consistency Sheet and Setting Lock unchanged.
${SHARED_TONE_RULES.Taglish}

First summarize the previous cliffhanger in 1 line, then generate the new 4-scene vertical 9:16 script (Taglish dialogue + English scene prompts with repeated character tags + CapCut captions + disclosure "AI-generated video").`,
          English: `Continue our AI Drama series with the next episode while keeping the exact Character Consistency Sheet and Setting Lock unchanged.
${SHARED_TONE_RULES.English}

First summarize the previous cliffhanger in 1 line, then generate the new 4-scene vertical 9:16 script (English dialogue + English scene prompts with repeated character tags + CapCut captions + disclosure "AI-generated video").`,
        },
      },
    ],
    checklist: [
      {
        group: 'Character & Scene Continuity',
        items: [
          'Pareho ang outfit, buhok, at lighting cues sa bawat scene prompt.',
          'Malinaw ang emosyon sa unang 2 segundo ng Episode 1.',
          'May malinaw na cliffhanger o tanong sa dulo para abangan ang susunod na part.',
        ],
      },
      {
        group: 'Audio, Subtitles & Disclosure',
        items: [
          'Walang sabay-sabay na nagsasalita sa isang 8-second clip para malinaw ang audio.',
          'Sa CapCut idinagdag ang malinis na Taglish/English subtitles (hindi baked-in sa AI clip).',
          'May "AI-generated video" disclosure sa caption at fictional disclaimer kung kailangan.',
        ],
      },
    ],
    guides: [
      {
        title: 'Paano panatilihing consistent ang tauhan sa phone',
        steps: [
          'I-save ang Character Consistency Sheet sa Notes app mo para copy-paste lang sa bawat episode.',
          'Mag-generate muna ng 1 clear reference portrait ng bawat tauhan bago gumawa ng video clips.',
          'Gamitin ang image-to-video kapag available sa iyong AI tool para mas lock ang mukha at damit.',
        ],
      },
      {
        title: 'Tipid-credits tip para sa mini-drama',
        steps: [
          'Limitahan sa 2 tauhan at 1 main location ang isang 3-part mini-series.',
          'Gumamit ng reaction shots at still frames na may gentle zoom sa CapCut para pahabain ang eksena nang hindi gumagastos ng dagdag na video credits.',
        ],
      },
    ],
  },

  'ai-podcast': {
    slug: 'ai-podcast',
    title: 'AI Podcast',
    subtitle: 'Full Member Toolkit · Lirva Usapan Host Lock, Topic & Studio Scene Builders',
    botBadge: 'Lirva Usapan',
    intro:
      'Magplano ng natural na usapan ng dalawang host (o solo host), podcast-style studio angles, at bite-sized vertical clips gamit ang sarili mong ChatGPT/Gemini at video tools.',
    bots: [
      {
        id: 'pod-host-setup',
        label: 'Builder 1 · Host & Studio Lock',
        title: 'Lirva Usapan: Two-Host & Studio Setup Builder',
        summary: 'Gumagawa ng consistent na deskripsyon ng 1–2 hosts, mics, camera angles, at warm studio backdrop.',
        whenToUse: 'I-paste bago ang unang podcast episode para pare-pareho ang look ng show mo.',
        prompt: {
          Taglish: `You are "Lirva Usapan", an AI Podcast planner for Filipino creators.
${SHARED_TONE_RULES.Taglish}

Ask me for my podcast niche (example: adulting, money habits, relationship talks, business tips, creator advice) and whether I want 1 host or 2 hosts.
Then deliver:
1. SHOW ANGLE & TONE (short, relatable, conversational Taglish)
2. HOST & STUDIO LOCK (English reusable visual description: seating position, podcast microphones, desk, warm soft lighting, vertical 9:16 framing)
3. 5 HIGH-RETENTION EPISODE TOPICS tailored for 20–30 second clips.`,
          English: `You are "Lirva Usapan", an AI Podcast planner for creators.
${SHARED_TONE_RULES.English}

Ask me for my podcast niche and whether I want 1 host or 2 hosts.
Then deliver:
1. SHOW ANGLE & TONE (short, relatable, conversational English)
2. HOST & STUDIO LOCK (English reusable visual description: seating position, podcast microphones, desk, warm soft lighting, vertical 9:16 framing)
3. 5 HIGH-RETENTION EPISODE TOPICS tailored for 20–30 second clips.`,
        },
      },
      {
        id: 'pod-clip-builder',
        label: 'Builder 2 · Script & Studio Clips',
        title: 'Lirva Usapan: Banter Script & Scene Prompt Builder',
        summary: 'Gumagawa ng natural na palitan ng linya (walang tunog robot) + English video prompts per speaker turn + CapCut captions.',
        whenToUse: 'I-paste kasama ang napiling topic mula sa Builder 1.',
        prompt: {
          Taglish: `Create a 24-second (3 clips of 8 seconds each) vertical 9:16 AI Podcast clip using our Host & Studio Lock.
${SHARED_TONE_RULES.Taglish}

Rules for natural banter:
- One speaker per 8-second clip so audio stays clean and unclipped.
- Keep each 8-second turn around 16–20 spoken words in natural Taglish.

Deliver copy-ready blocks:
- OPENING HOOK LINE (Taglish)
- FULL 3-TURN SCRIPT (Host A → Host B → Host A takeaway)
- 3 ENGLISH STUDIO VIDEO PROMPTS (repeating the exact Host & Studio Lock, subtle hand gestures, podcast mic visible, no added subtitles/watermarks, embedding each clip's exact Taglish dialogue)
- CAPCUT CAPTIONS & TITLE CARD (max 6 words)
- POST CAPTION with a comment prompt and "AI-generated video" disclosure.`,
          English: `Create a 24-second (3 clips of 8 seconds each) vertical 9:16 AI Podcast clip using our Host & Studio Lock.
${SHARED_TONE_RULES.English}

Rules for natural banter:
- One speaker per 8-second clip so audio stays clean and unclipped.
- Keep each 8-second turn around 16–20 spoken words in natural English.

Deliver copy-ready blocks:
- OPENING HOOK LINE (English)
- FULL 3-TURN SCRIPT (Host A → Host B → Host A takeaway)
- 3 ENGLISH STUDIO VIDEO PROMPTS (repeating the exact Host & Studio Lock, subtle hand gestures, podcast mic visible, no added subtitles/watermarks, embedding each clip's exact English dialogue)
- CAPCUT CAPTIONS & TITLE CARD (max 6 words)
- POST CAPTION with a comment prompt and "AI-generated video" disclosure.`,
        },
      },
    ],
    checklist: [
      {
        group: 'Podcast Realism & Pacing',
        items: [
          'Isang host lang ang nagsasalita sa bawat 8-second clip para malinaw ang lip-sync o narration.',
          'Natural ang haba ng linya (16–20 words per 8s clip) at walang robotic phrasing.',
          'Pareho ang microphone, studio lighting, at outfit ng hosts sa buong clip.',
        ],
      },
      {
        group: 'Captions & Transparency',
        items: [
          'Malinis at readable ang speaker captions na idinagdag sa CapCut.',
          'May malinaw na tanong sa dulo para sa comments at engagement.',
          'May "AI-generated video" disclosure at walang misleading medical/financial advice claims.',
        ],
      },
    ],
    guides: [
      {
        title: 'Madaling podcast format sa phone',
        steps: [
          'Gumamit ng alternating close-up shots (Clip 1: Host A, Clip 2: Host B, Clip 3: Host A) para mas mukhang totoong podcast edit.',
          'I-edit ang cuts nang dikit sa CapCut para mabilis ang pacing at walang dead air.',
        ],
      },
      {
        title: 'Paano gawing series ang isang topic',
        steps: [
          'Hatiin ang isang malaking topic sa 3 maiikling tanong at gawan ng magkakahiwalay na 24-second clips.',
          'I-save ang Host & Studio Lock prompt para consistent ang brand look ng channel mo.',
        ],
      },
    ],
  },

  'ai-facts': {
    slug: 'ai-facts',
    title: 'AI Facts',
    subtitle: 'Full Member Toolkit · Lirva Alam Mo Ba Script & Visual Prop Builders',
    botBadge: 'Lirva Alam Mo Ba',
    intro:
      'Gumawa ng malinaw, mabilis maunawaan, at visually engaging na educational at trivia videos ("Alam mo ba?" o "Akala mo vs Totoo") gamit ang sarili mong ChatGPT/Gemini at video/editing tools.',
    bots: [
      {
        id: 'facts-script-builder',
        label: 'Builder 1 · Fact Script & Verification',
        title: 'Lirva Alam Mo Ba: Educational Video Plan Builder',
        summary: 'Gumagawa ng curiosity hook, malinaw na explanation script, visual props prompts, at fact-check reminder bago i-post.',
        whenToUse: 'I-paste kasama ang topic, trivia, o verified source notes na gusto mong ipaliwanag.',
        prompt: {
          Taglish: `You are "Lirva Alam Mo Ba", an educational short-video planner for Filipino creators.
${SHARED_TONE_RULES.Taglish}

Ask me for my topic (or paste the verified fact/source I want to explain) and whether I prefer faceless visual props or an AI explainer host.
Then deliver copy-ready blocks:
- 3 CURIOSITY HOOKS (Taglish, clear and engaging without clickbait lies)
- FULL 20–24 SECOND VOICEOVER (Taglish, broken into 3 beats: Hook → Clear Explanation → Memorable Takeaway)
- 3 ENGLISH VISUAL PROMPTS (vertical 9:16, clean visual props / illustrative scenes matching each beat, off-camera narration verbatim in Taglish, no baked-in subtitles or watermarks)
- CAPCUT ON-SCREEN TEXT (max 6 words per beat for clarity)
- FACT-CHECK NOTE (list the key claims I should double-check against a reliable source before posting)
- CAPTION (Taglish, 3–5 hashtags, and "AI-generated video" disclosure).`,
          English: `You are "Lirva Alam Mo Ba", an educational short-video planner for creators.
${SHARED_TONE_RULES.English}

Ask me for my topic (or paste the verified fact/source I want to explain) and whether I prefer faceless visual props or an AI explainer host.
Then deliver copy-ready blocks:
- 3 CURIOSITY HOOKS (English, clear and engaging without clickbait lies)
- FULL 20–24 SECOND VOICEOVER (English, broken into 3 beats: Hook → Clear Explanation → Memorable Takeaway)
- 3 ENGLISH VISUAL PROMPTS (vertical 9:16, clean visual props / illustrative scenes matching each beat, off-camera narration verbatim in English, no baked-in subtitles or watermarks)
- CAPCUT ON-SCREEN TEXT (max 6 words per beat for clarity)
- FACT-CHECK NOTE (list the key claims I should double-check against a reliable source before posting)
- CAPTION (English, 3–5 hashtags, and "AI-generated video" disclosure).`,
        },
      },
      {
        id: 'facts-myth-builder',
        label: 'Builder 2 · Akala Mo vs Totoo',
        title: 'Lirva Alam Mo Ba: "Akala mo vs Totoo" Builder',
        summary: 'Format na mabilis makakuha ng saves at shares sa pamamagitan ng pagtutuwid ng karaniwang maling akala.',
        whenToUse: 'Gamitin para sa science, history, everyday habits, tech, o consumer tips.',
        prompt: {
          Taglish: `Build a 20-second "Akala mo vs Totoo" vertical 9:16 video plan on the topic I give you.
${SHARED_TONE_RULES.Taglish}

Structure:
- Beat 1 (0–4s): Common belief ("Akala ng marami…")
- Beat 2 (4–14s): Clear verified truth ("Ang totoo…")
- Beat 3 (14–20s): Practical takeaway.
Include 3 English visual prompts (clean props/illustrations, no garbled text/watermarks), separate CapCut on-screen text, fact-check checklist, and caption with "AI-generated video".`,
          English: `Build a 20-second "Myth vs Fact" vertical 9:16 video plan on the topic I give you.
${SHARED_TONE_RULES.English}

Structure:
- Beat 1 (0–4s): Common myth ("Many people think…")
- Beat 2 (4–14s): Clear verified fact ("In reality…")
- Beat 3 (14–20s): Practical takeaway.
Include 3 English visual prompts (clean props/illustrations, no garbled text/watermarks), separate CapCut on-screen text, fact-check checklist, and caption with "AI-generated video".`,
        },
      },
    ],
    checklist: [
      {
        group: 'Accuracy & Sources',
        items: [
          'Na-verify sa mapagkakatiwalaang source ang bawat petsa, numero, at scientific/historical fact.',
          'Hindi nagbibigay ng unverified medical, legal, o financial promises.',
          'Simple at madaling maintindihan ang paliwanag kahit walang jargon.',
        ],
      },
      {
        group: 'Visuals & Mobile Readability',
        items: [
          'Malinaw ang visual props o illustrations at tugma sa sinasabi sa voiceover.',
          'Walang baluktot o sabog na AI-generated text sa loob ng video.',
          'May "AI-generated video" disclosure sa caption.',
        ],
      },
    ],
    guides: [
      {
        title: 'Mabilis na Facts workflow sa phone',
        steps: [
          'Mag-paste ng maikling verified article o notes sa prompt para sigurado ang impormasyon.',
          'Gumamit ng clean visual props o 2D/3D illustrative shots at idagdag ang keywords sa CapCut.',
        ],
      },
      {
        title: 'Paano palakasin ang watch time',
        steps: [
          'Ibigay ang sagot nang malinaw sa gitna ng video — huwag pahabain ang intro.',
          'Magtapos sa isang practical takeaway na gugustuhing i-save o i-share ng nanonood.',
        ],
      },
    ],
  },
};
