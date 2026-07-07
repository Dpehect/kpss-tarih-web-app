export function SBBrandMark({ className = "size-11" }: { className?: string }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-[1.15rem] border border-[#e0d2c2] bg-white/90 shadow-[0_16px_50px_rgba(16,24,40,.10)] ${className}`}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(180,35,42,.22),transparent_38%),radial-gradient(circle_at_80%_90%,rgba(245,158,11,.18),transparent_42%)]" />
      <svg width="38" height="38" viewBox="0 0 64 64" fill="none" className="relative z-10">
        <path
          d="M13 39.5C18.6 28.8 27.3 23.5 39 23.5H51"
          stroke="#101828"
          strokeWidth="5.2"
          strokeLinecap="round"
        />
        <path
          d="M13 44.5C19.8 34.8 28.7 30 39.8 30H51"
          stroke="#B4232A"
          strokeWidth="5.2"
          strokeLinecap="round"
        />
        <path
          d="M22.5 20.5H36C40.6 20.5 43.5 22.8 43.5 26.3C43.5 30.1 40.4 32 35.2 32H24"
          stroke="#101828"
          strokeWidth="5.2"
          strokeLinecap="round"
        />
        <path
          d="M23 32H38C43.4 32 46.8 34.4 46.8 38.4C46.8 42.9 43.2 45.5 37.1 45.5H23"
          stroke="#101828"
          strokeWidth="5.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute -right-1 -top-1 size-3 rounded-full bg-[#b4232a] ring-4 ring-[#f6efe4]" />
    </span>
  );
}
