import type { ContentLang } from '../utils/clipboard';

export type MemberCategorySlug = 'ai-affiliate' | 'ai-drama' | 'ai-podcast' | 'ai-facts';

export const LIRVA_CONFIG = {
  brandName: 'Lirva Studio',
  fbPageLink: 'https://www.facebook.com/lirvastudio.ph',
  avrilFbLink: 'https://www.facebook.com/AvrilAIFinds',
  avrilTiktokLink: 'https://www.tiktok.com/@avrilaifinds.ph',
  regularPrice: 599,
  promoPrice: 299,
  promoBuyersTarget: 10,
  accountName: 'AV**L F.',
};

export interface SampleBlock {
  code: string;
  label: string;
  content: string;
}

export interface PublicCategoryMeta {
  slug: MemberCategorySlug;
  title: string;
  cardSummary: string;
  image: string;
  imageAlt: string;
  audienceTag: string;
  introHeading: string;
  introBody: string;
  whatYouCanMake: string[];
  sampleTitle: string;
  sampleDescription: string;
  sampleBlocks: SampleBlock[];
  memberHighlights: string[];
}

export const PUBLIC_CATEGORIES: PublicCategoryMeta[] = [
  {
    slug: 'ai-affiliate',
    title: 'AI Affiliate',
    cardSummary: 'Gabay sa product ideas, scripts, at faceless video prompts gamit ang sarili mong AI tools.',
    image: '/ai-affiliate.webp',
    imageAlt: 'Creator na gumagawa ng product video para sa AI Affiliate',
    audienceTag: 'Para sa TikTok, Shopee, at Facebook affiliate creators',
    introHeading: 'Gawing malinaw na faceless product video plan ang kahit anong listing.',
    introBody:
      'Para ito sa affiliate creators na gustong mag-post nang tuloy-tuloy nang hindi kailangang humarap sa camera. Gamit ang mga copyable prompts at step-by-step guides dito, makakabuo ka ng hook, natural na voiceover, scene-by-scene English video prompts, at compliant caption gamit ang sarili mong ChatGPT o Gemini at video/editing tools.',
    whatYouCanMake: [
      'Multi-scene faceless product videos mula sa 1 product photo at listing details',
      '37 klase ng video formats at 10 handang templates na swak sa phone',
      'Pre-post Video QC check at Performance review bago at pagkatapos mag-upload',
    ],
    sampleTitle: 'Sample Affiliate Video Plan (1.2L Insulated Tumbler)',
    sampleDescription:
      'Sample preview lang ito ng isang product plan. Nasa full member toolkit ang 3 Lirva bots, 37 video styles, 10 handang templates, at 15-puntong checklist.',
    sampleBlocks: [
      {
        code: 'H',
        label: 'Sample Hook',
        content: '"Isang litro pero kasya sa cup holder? Tingnan mo \'to."',
      },
      {
        code: 'V',
        label: 'Sample Voiceover',
        content:
          '"Isang litro pero kasya sa cup holder? Ayon sa listing, 1.2 liters \'tong tumbler at may takip na may straw. Check mo sa basket ang latest price."',
      },
      {
        code: 'P',
        label: 'Sample Video Prompt (English)',
        content:
          'Vertical 9:16, slow push-in on the exact tumbler from the reference photo on a clean desk, soft morning daylight, no people, no hands, no added subtitles or watermarks…',
      },
      {
        code: 'C',
        label: 'Sample Caption',
        content:
          'Pang-araw-araw na tubig, hindi na kailangang mag-refill lagi. Link sa yellow basket. #tumbler #deskessentials · AI-generated video · Affiliate link',
      },
    ],
    memberHighlights: [
      '3 Lirva Bots (AI Affiliate, Video QC, Performance)',
      '37 Video Styles at 10 Handang Templates',
      '15-Puntong Checklist at Phone/Free Guide',
    ],
  },
  {
    slug: 'ai-drama',
    title: 'AI Drama',
    cardSummary: 'Bumuo ng mga tauhan, kuwento, at magkakaugnay na mini-drama episodes.',
    image: '/ai-drama.webp',
    imageAlt: 'Dalawang tauhan sa eksena ng AI Drama',
    audienceTag: 'Para sa storytelling creators at mini-teleserye pages',
    introHeading: 'Gumawa ng tuloy-tuloy na mini-drama episodes nang hindi nag-iiba ang hitsura ng bida.',
    introBody:
      'Para ito sa creators na gustong mag-post ng relatable na Pinoy mini-drama, OFW stories, o family twists sa reels at TikTok. Tutulungan ka ng Lirva Kwento prompts at guides na mag-lock ng character appearance, bumuo ng dialogue, at gawing magkakaugnay ang bawat eksena gamit ang sarili mong AI tools.',
    whatYouCanMake: [
      'Reusable Character Bible at Setting Lock para consistent ang mukha at outfit ng bida',
      'Multi-scene episode scripts (Part 1, Part 2, finale) na may natural na Taglish o English dialogue',
      'Scene-by-scene English video prompts at CapCut subtitle lines na handa sa phone',
    ],
    sampleTitle: 'Sample Mini-Drama Episode Snippet ("Ang Balikbayan Box")',
    sampleDescription:
      'Sample preview lang ito ng isang eksena. Nasa full member toolkit ang buong Lirva Kwento Character Bible, Episode Builder, at Continuation Prompts.',
    sampleBlocks: [
      {
        code: 'C',
        label: 'Sample Character Lock (English)',
        content:
          'Filipina woman in her late 20s, shoulder-length dark hair tied half-up, wearing a plain muted olive blouse, warm living room evening light — keep identical across all clips.',
      },
      {
        code: 'H',
        label: 'Sample Opening Hook (0–2s)',
        content: '"Limang taon akong nagpadala buwan-buwan—pero ngayon ko lang nalaman kung saan napunta."',
      },
      {
        code: 'P',
        label: 'Sample Scene 1 Prompt (English)',
        content:
          'Vertical 9:16 medium close-up, soft warm lamp light in a quiet Filipino dining room, woman holds a folded receipt gently with a calm, surprised expression, slow camera push-in, no added subtitles…',
      },
      {
        code: 'E',
        label: 'Sample Cliffhanger Caption',
        content:
          'Abangan sa Part 2 kung anong nakita niya sa loob ng sobre. Ikaw, anong gagawin mo? #minidrama #kwento · AI-generated video',
      },
    ],
    memberHighlights: [
      'Lirva Kwento Character Bible & Setting Lock Builder',
      'Episode & Multi-Scene Prompt Builder',
      'Part 2+ Continuation Prompt at Tipid-Credits Guide',
    ],
  },
  {
    slug: 'ai-podcast',
    title: 'AI Podcast',
    cardSummary: 'Magplano ng topics, host dialogue, at podcast-style studio scenes.',
    image: '/ai-podcast.webp',
    imageAlt: 'Dalawang host na nag-uusap sa studio para sa AI Podcast',
    audienceTag: 'Para sa opinion, advice, adulting, at niche talk pages',
    introHeading: 'Bumuo ng natural na podcast-style clips kahit wala kang studio o mic setup.',
    introBody:
      'Para ito sa creators na maraming magandang topic — mula adulting, pera, relasyon, hanggang creator tips — pero mas gusto ng podcast format kaysa mag-film ng sarili. Gabay mo ang Lirva Usapan prompts para makabuo ng consistent hosts, natural na palitan ng linya, at studio scene prompts sa sarili mong AI tools.',
    whatYouCanMake: [
      'Consistent 1-host o 2-host studio visual setup na pareho ang lighting at framing',
      'Natural na conversational banter (walang tunog robot) na sakto sa 8-second turns',
      'Comment-ready podcast clips at CapCut title cards na mabilis gawin sa phone',
    ],
    sampleTitle: 'Sample Podcast Clip ("Bakit Laging Kulang ang Sahod?")',
    sampleDescription:
      'Sample preview lang ito ng isang podcast exchange. Nasa full member toolkit ang Lirva Usapan Host & Studio Lock, Banter Script Builder, at Podcast QC Checklist.',
    sampleBlocks: [
      {
        code: 'S',
        label: 'Sample Studio Lock (English)',
        content:
          'Two young Filipino hosts seated across a wooden podcast table with dark dynamic microphones, warm purple-amber background glow, shallow depth of field, vertical 9:16 framing.',
      },
      {
        code: 'A',
        label: 'Sample Turn 1 — Host A (Taglish)',
        content: '"Totoo ba na kapag tumaas ang sahod, mas lumalaki rin agad ang gastos?"',
      },
      {
        code: 'B',
        label: 'Sample Turn 2 — Host B (Taglish)',
        content: '"Oo, lalo na kung walang nakabukod agad sa unang araw ng payday. Doon nauubos sa maliliit na budol."',
      },
      {
        code: 'P',
        label: 'Sample Clip Prompt (English)',
        content:
          'Vertical 9:16 close-up on Host B speaking calmly into a podcast microphone, warm studio rim lighting, subtle natural hand gesture, no baked-in captions or watermarks…',
      },
    ],
    memberHighlights: [
      'Lirva Usapan Host & Studio Lock Builder',
      'Natural Banter Script & 3-Clip Scene Builder',
      'Podcast Realism Checklist at Series Workflow Guide',
    ],
  },
  {
    slug: 'ai-facts',
    title: 'AI Facts',
    cardSummary: 'Gabay sa pagbuo ng educational scripts, trivia, at visual prompts.',
    image: '/ai-facts.webp',
    imageAlt: 'Host na nagpapaliwanag gamit ang mga visual props para sa AI Facts',
    audienceTag: 'Para sa educational, trivia, at explainer creators',
    introHeading: 'Gawing mabilis intindihin at sulit i-save ang educational at trivia videos mo.',
    introBody:
      'Para ito sa creators na gustong magbahagi ng facts, science, history, o everyday tips na madaling sundan ng manonood sa phone. Gamit ang Lirva Alam Mo Ba prompts at guides, makakagawa ka ng malinaw na curiosity hook, maayos na explanation script, visual props prompts, at fact-check reminders gamit ang sarili mong AI tools.',
    whatYouCanMake: [
      'Educational "Alam mo ba?" explainers na malinaw ang beat-by-beat pacing',
      '"Akala mo vs Totoo" myth-vs-fact clips na madalas i-save at i-share',
      'Clean visual props prompts + fact-check checklist bago mag-post',
    ],
    sampleTitle: 'Sample Facts Video ("Bakit Malamig ang Pakiramdam ng Mint?")',
    sampleDescription:
      'Sample preview lang ito ng isang educational clip. Nasa full member toolkit ang Lirva Alam Mo Ba Script Builder, "Akala mo vs Totoo" Builder, at Source Checklist.',
    sampleBlocks: [
      {
        code: 'H',
        label: 'Sample Curiosity Hook',
        content: '"Hindi totoong malamig ang mint—niloloko lang niya ang dila mo."',
      },
      {
        code: 'V',
        label: 'Sample Voiceover Excerpt',
        content:
          '"May menthol ang mint na nagti-trigger sa cold sensors ng bibig mo, kaya akala ng utak mo malamig ang nakakain mo kahit room temperature lang ito."',
      },
      {
        code: 'P',
        label: 'Sample Visual Prompt (English)',
        content:
          'Vertical 9:16 crisp studio macro shot of fresh green mint leaves beside a clear glass of water on a clean neutral surface, gentle cool rim light, slow push-in, no added text or watermarks…',
      },
      {
        code: 'T',
        label: 'Sample CapCut On-Screen Text',
        content: 'Menthol = Cold Sensor Trigger · AI-generated video',
      },
    ],
    memberHighlights: [
      'Lirva Alam Mo Ba Educational Script & Visual Builder',
      '"Akala mo vs Totoo" Myth-Fact Prompt Builder',
      'Accuracy & Source Verification Checklist',
    ],
  },
];

export function getPublicCategory(slug: string): PublicCategoryMeta | undefined {
  return PUBLIC_CATEGORIES.find((c) => c.slug === slug);
}

export const SUITE_INSIDE_CARDS = [
  {
    image: '/3-lirva-bots.webp',
    alt: '3 Lirva Bots: 1. Planuhin, 2. I-check, 3. Suriin ang resulta',
    big: '3',
    title: 'Lirva bots',
    desc: 'Gumagawa ng plan, nagche-check ng video bago i-post, at nagbabasa ng resulta para sa susunod.',
    tags: ['AI Affiliate', 'Video QC', 'Performance'],
  },
  {
    image: '/37-video-styles.webp',
    alt: '37 Video Styles: halimbawa gaya ng Product showcase, Lifestyle, AI presenter, Story, Animated, at Motion graphics',
    big: '37',
    title: 'Klase ng video',
    desc: 'Walang kailangang humarap sa camera. May babala at mas simpleng paraan para sa bawat isa.',
    tags: ['Hero showcase', 'Macro detail tour', 'Lifestyle B-roll', 'AI presenter', '+33 pa'],
  },
  {
    image: '/10-handang-templates.webp',
    alt: '10 Handang Templates: Smartphone Video Layout, Gift-Guide Carousel Template, Storyboard Template, at Product Showcase',
    big: '10',
    title: 'Handang templates',
    desc: 'Pumili, ilagay ang produkto, at buo na ang prompt na may scenes at caption.',
    tags: ['Living product photo', 'Spec-callout', 'FAQ rapid-fire', '+7 pa'],
  },
  {
    image: '/higit-pa-sa-affiliate.webp',
    alt: 'Higit pa sa Affiliate: AI Drama, AI Podcast, AI Facts, at iba pang video formats',
    big: '3',
    title: 'Higit pa sa affiliate',
    desc: 'Prompt builders para sa kwento, usapan at facts na may character o host na hindi nagbabago ang itsura.',
    tags: ['Lirva Kwento', 'Lirva Usapan', 'Lirva Alam Mo Ba'],
  },
  {
    image: '/15-puntong-checklist.webp',
    alt: '15 Puntong Checklist: Video, Audio, Product, Captions, at Pacing',
    big: '15',
    title: 'Puntong checklist',
    desc: 'I-tsek bago mag-post para iwas maling claim at kulang na label.',
    tags: [],
  },
  {
    image: '/gabay-phone-free.webp',
    alt: 'Gabay para sa Phone at Free: workflow mula Ideya at Script hanggang Video gamit ang phone',
    big: '1',
    title: 'Gabay para sa phone at Free',
    desc: 'Paano gamitin sa ChatGPT o Gemini, at ano ang gagawin kapag naubos ang limit.',
    tags: [],
  },
];

export const COMPARISON_ROWS = [
  { feature: 'Hook', lite: 'Isa', suite: 'Ilang pagpipilian', liteNo: false },
  { feature: 'Haba', lite: '8 segundo, isang scene', suite: 'Buong video, ilang scenes', liteNo: false },
  { feature: 'Video prompts', lite: 'Isa', suite: 'Bawat scene', liteNo: false },
  { feature: 'Video styles at templates', lite: 'Wala', suite: '37 styles, 10 templates', liteNo: true },
  { feature: 'AI Drama, AI Podcast, AI Facts', lite: 'Wala', suite: 'Meron', liteNo: true },
  { feature: 'Video QC at Performance bots', lite: 'Wala', suite: 'Meron', liteNo: true },
];

export const FAQ_ITEMS = [
  {
    q: 'Pwede ba sa phone lang?',
    a: 'Oo. Ginawa ang Lirva Studio para sa phone. Kokopyahin mo lang ang prompt at ipe-paste sa ChatGPT o Gemini app.',
  },
  {
    q: 'Kailangan ko bang naka-Pro o Plus?',
    a: 'Hindi. Gumagana ang mga prompt sa libreng ChatGPT at Gemini. May limit lang ang libreng account sa dami ng messages at uploads, kaya may tips kami kung paano makatipid.',
  },
  {
    q: 'Gagawa na ba ito ng video?',
    a: 'Ang Lirva Studio ay toolkit ng copyable prompts at step-by-step guides: hook, script, voiceover, prompts at caption. Ang mismong video ay gagawin mo sa sarili mong video AI tool, o sa CapCut gamit ang litrato at text.',
  },
  {
    q: 'Kailangan ko bang humarap sa camera?',
    a: 'Hindi. Lahat ng 37 style ay kayang gawin nang walang mukha o kamay mo.',
  },
  {
    q: 'Sigurado bang bebenta ako?',
    a: 'Walang makakapangako niyan. Ang tulong ng Lirva Studio ay mas mabilis at mas maayos na content na sumusunod sa rules. Nasa produkto, audience at tiyaga mo pa rin ang resulta.',
  },
  {
    q: 'Paano ko makukuha pagkatapos magbayad?',
    a: 'Pagkatapos magbayad gamit ang Lirva GCash QR sa website, buksan ang Lirva Studio Facebook page at i-message ang screenshot ng resibo, kasama ang pangalan at email na gagamitin. Ipapadala ang access pagkatapos ma-verify ang bayad.',
  },
  {
    q: 'Ilang account ang pwede sa isang bayad?',
    a: 'Isa. Ang isang bayad ay para sa isang account/Gmail. Kung may kasama kang gagamit, kailangan niya ng sariling bayad.',
  },
];

/**
 * Approved Lirva Lite 8-second prompt (verbatim rules preserved across Taglish and English).
 */
export function buildLirvaLitePrompt(lang: ContentLang): string {
  const langRule =
    lang === 'English'
      ? 'Write every newly generated HOOK, VOICEOVER, ON-SCREEN TEXT, and CAPTION in natural, conversational English.'
      : 'Write every newly generated HOOK, VOICEOVER, ON-SCREEN TEXT, and CAPTION in natural, conversational Taglish (Tagalog-English code-switching), the way Filipino creators talk on TikTok and Facebook.';

  const captionCta =
    lang === 'English' ? 'Link in the yellow basket' : 'Link sa yellow basket';

  const closingRule =
    lang === 'English'
      ? `After the sample, end with this exact closing block:
Want a complete content package? Explore Member Access through Lirva Studio, and see video samples on Avril AI Finds:
Lirva Studio Facebook: https://www.facebook.com/lirvastudio.ph
Avril AI Finds Facebook: https://www.facebook.com/AvrilAIFinds
Avril AI Finds TikTok: https://www.tiktok.com/@avrilaifinds.ph`
      : `After the sample, end with this exact closing block:
Gusto mo ng kumpletong content package? Tingnan ang Member Access sa Lirva Studio, at panoorin ang video samples sa Avril AI Finds:
Lirva Studio Facebook: https://www.facebook.com/lirvastudio.ph
Avril AI Finds Facebook: https://www.facebook.com/AvrilAIFinds
Avril AI Finds TikTok: https://www.tiktok.com/@avrilaifinds.ph`;

  return `You are "Lirva Lite", a free sample assistant for affiliate creators.
Your only job: create ONE 8-second faceless product video sample from the product photo and listing details I give you.

Content language:
- ${langRule}
- Keep all technical video prompt instructions and camera/visual directions in English.
- The VIDEO PROMPT must include the complete approved VOICEOVER verbatim in ${lang} as off-camera narration.

Duration and pacing:
- Create ONE 8-second clip only.
- The HOOK must be the exact opening sentence of the VOICEOVER.
- The VOICEOVER block contains the FULL spoken script, including the hook. Target 16–20 words for the complete VOICEOVER (not an additional hook plus another 16–20 words). Displaying the hook separately does not mean it is spoken twice.
- Count the COMPLETE VOICEOVER, including the hook, before delivery. Keep it within 16–20 words and prioritize natural pacing.
- Prioritize complete sentences.
- Aim to finish speech by approximately 7.3 seconds, followed by a short silent product hold.
- Visual timing: 0–2s opening, 2–6s product detail, 6–8s closing.

Conversation and tone:
- Converse naturally in Taglish by default; switch to English when the user requests or writes in English.
- Use short, clear, everyday sentences. Sound like a helpful person talking to another creator.
- Avoid robotic phrasing, stiff translations, technical jargon, corporate language, exaggerated sales language, and unnecessary filler.
- Avoid words such as "unlock," "elevate," "seamless," "game-changer," "revolutionary," "transform your experience," "perfect for everyone," and "level up."
- Do not invent personal-use statements such as "Ito ang gamit ko" or "I tried this" without confirmed evidence from the user.
- Keep necessary official app or model names, and explain any unfamiliar terms simply.
- Never mention or explain these writing rules in the generated sample.

Steps:
1. If I have not attached a product photo or pasted listing details, ask for both in one short message and wait.
2. Read the photo and listing. List the product name and up to 3 features exactly as written in the listing.
3. Deliver, each in its own copy-ready block:
   - HOOK: the exact opening sentence of the VOICEOVER (in ${lang}); displaying the hook separately does not mean it is spoken twice
   - VOICEOVER: the FULL spoken script in ${lang}, starting with the exact HOOK sentence and kept within 16–20 words in complete, naturally paced sentences so speech finishes by approximately 7.3 seconds, followed by a short silent product hold to 8 seconds
   - ON-SCREEN TEXT: max 6 words (in ${lang}), separate text added later in an editing app
   - VIDEO PROMPT (English): ONE 8-second vertical 9:16 clip (0–2s opening, 2–6s product detail, 6–8s closing), no people, no hands, product matches the reference photo exactly. Preserve the product's reference state throughout the clip (for a closed cosmetic bottle reference, keep it closed in all three beats and use camera movement only). Do not introduce a detached applicator, extra cap, opening/closing action, or unseen product parts, and do not visually simulate waterproofing or wear results. Include the complete approved VOICEOVER verbatim in ${lang} as off-camera narration, and include: "Voiceover only. No visible speaker or lip-sync. Speak the approved voiceover exactly once, without repeating, restarting, paraphrasing, or adding words. Finish naturally, followed by a short silent product hold." The generated video must contain no added subtitles, captions, text overlays, or watermarks. Preserve original product label text.
   - CAPTION: short (in ${lang}), 3 to 5 hashtags, "${captionCta}", and the disclosure "AI-generated video · Affiliate link"

Rules:
- Use only photo-visible details or supplied listing facts.
- Never invent features, specs, reviews, personal experience, test results, endorsements, package contents, stand design, props, branch density, or descriptive quality claims such as "sturdy." If it is not visible in the photo or written in the listing, leave it out.
- Do not infer packaging material, shade, or label text that is not clearly visible or supplied.
- Preserve the product's reference state throughout the clip. For a closed cosmetic bottle reference, keep it closed in all three beats and use camera movement only. Do not introduce a detached applicator, extra cap, opening/closing action, or unseen product parts.
- Distinguish listing claims from independently demonstrated performance. Never show before/after results, the product producing a result, or visually simulated waterproofing or wear results.
- Listing size ranges describe available variants. Preserve the reference product's or reference tree's proportions; do not resize or morph it during the clip.
- Never include citation tokens such as [cite: 1] inside copyable output blocks.
- Never claim "FDA approved", medical results, or "pinakamura".
- End the video prompt with: "Treat the reference image as ground truth. Keep the product's shape, color, logo and label text identical. Do not add parts, glow or effects."

${closingRule}`;
}
