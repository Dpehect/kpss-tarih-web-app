export function FoxBrandMark({ className = "size-11" }: { className?: string }) {
  return (
    <span className={`relative grid place-items-center rounded-[1.1rem] border border-[#e0d2c2] bg-white/90 shadow-[0_14px_42px_rgba(16,24,40,.10)] ${className}`}>
      <svg width="30" height="28" viewBox="0 0 64 60" fill="none" aria-hidden="true">
        <path
          d="M13 8L25.4 16.6C29.3 14.9 34.7 14.9 38.6 16.6L51 8L47.6 28.5C49.5 37.8 42.1 50 32 50C21.9 50 14.5 37.8 16.4 28.5L13 8Z"
          fill="#F97316"
        />
        <path d="M13 8L25.4 16.6L19.6 29.7L13 8Z" fill="#FB923C" />
        <path d="M51 8L38.6 16.6L44.4 29.7L51 8Z" fill="#FB923C" />
        <path
          d="M18.8 29.2C23.4 24.8 27.7 23.2 32 23.2C36.3 23.2 40.6 24.8 45.2 29.2C43.6 40.5 38.4 48 32 48C25.6 48 20.4 40.5 18.8 29.2Z"
          fill="#FFF7ED"
        />
        <circle cx="25.2" cy="33.7" r="3" fill="#101828" />
        <circle cx="38.8" cy="33.7" r="3" fill="#101828" />
        <path d="M28.6 41.2L32 44.5L35.4 41.2H28.6Z" fill="#101828" />
        <path
          d="M21.5 20.2C25.3 17.7 28.7 16.7 32 16.7C35.3 16.7 38.7 17.7 42.5 20.2"
          stroke="#101828"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute -right-1 -top-1 size-3 rounded-full bg-[#b4232a] ring-4 ring-[#f6efe4]" />
    </span>
  );
}
