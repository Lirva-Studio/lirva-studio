export function LirvaLogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="lm-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C77DFF" />
          <stop offset=".55" stopColor="#8100D1" />
          <stop offset="1" stopColor="#EFBF04" />
        </linearGradient>
        <radialGradient id="lm-bg" cx=".3" cy=".25" r=".9">
          <stop offset="0" stopColor="#2B0F4A" />
          <stop offset="1" stopColor="#12091C" />
        </radialGradient>
        <linearGradient id="lm-ink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFD6D1" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="480" height="480" rx="116" fill="url(#lm-bg)" />
      <rect
        x="16"
        y="16"
        width="480"
        height="480"
        rx="116"
        fill="none"
        stroke="url(#lm-ring)"
        strokeWidth="10"
      />
      <path
        fill="url(#lm-ink)"
        d="M150 112 H262 V128 C246 129 238 136 238 154 V350 H304 C334 350 350 334 362 302 L378 305 L364 386 H150 V370 C166 369 176 362 176 346 V154 C176 136 166 129 150 128 Z"
      />
      <path
        fill="#EFBF04"
        d="M370 104 C373 134 384 146 414 150 C384 154 373 166 370 196 C367 166 356 154 326 150 C356 146 367 134 370 104 Z"
      />
      <path
        fill="#C77DFF"
        d="M418 206 C419 218 424 223 436 224 C424 225 419 230 418 242 C417 230 412 225 400 224 C412 223 417 218 418 206 Z"
      />
    </svg>
  );
}
