export function AtlasAmbient() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-14rem] top-20 size-[34rem] rounded-full bg-[rgba(36,63,115,.13)] blur-[110px]" />
      <div className="absolute right-[-14rem] top-4 size-[34rem] rounded-full bg-[rgba(184,121,45,.18)] blur-[110px]" />
      <div className="absolute bottom-[-18rem] left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[rgba(19,129,132,.11)] blur-[130px]" />

      <svg className="absolute right-[-6rem] top-[18vh] h-[38rem] w-[38rem] opacity-[0.08]" viewBox="0 0 600 600">
        <path
          d="M87 306 C180 214 250 198 345 232 C440 266 481 185 538 237 C600 294 527 394 424 399 C320 404 288 482 194 435 C102 389 33 360 87 306Z"
          fill="none"
          stroke="#070b16"
          strokeWidth="2"
        />
        <path
          d="M121 341 C234 296 288 308 382 292 C452 280 492 311 531 352"
          fill="none"
          stroke="#b8792d"
          strokeWidth="2"
          strokeDasharray="10 12"
        />
      </svg>

      <svg className="absolute left-[-4rem] bottom-[8vh] h-[28rem] w-[28rem] opacity-[0.055]" viewBox="0 0 420 420">
        <circle cx="210" cy="210" r="142" fill="none" stroke="#070b16" />
        <circle cx="210" cy="210" r="84" fill="none" stroke="#070b16" />
        <path d="M72 228 C142 130 250 110 355 154" fill="none" stroke="#138184" strokeWidth="2" strokeDasharray="9 12" />
      </svg>
    </div>
  );
}
