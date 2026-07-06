export function ChronoLabAmbient() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-18rem] top-[-8rem] size-[38rem] rounded-full bg-[rgba(215,255,79,.32)] blur-[120px]" />
      <div className="absolute right-[-16rem] top-[6rem] size-[34rem] rounded-full bg-[rgba(0,166,180,.18)] blur-[110px]" />
      <div className="absolute bottom-[-20rem] left-[44%] size-[44rem] rounded-full bg-[rgba(108,59,209,.12)] blur-[130px]" />

      <svg className="absolute right-[-4rem] top-[17vh] h-[40rem] w-[40rem] opacity-[0.10]" viewBox="0 0 640 640">
        <circle cx="320" cy="320" r="220" fill="none" stroke="#101010" strokeWidth="1.4" />
        <circle cx="320" cy="320" r="138" fill="none" stroke="#101010" strokeWidth="1.1" />
        <path d="M82 348 C170 198 340 166 548 245" fill="none" stroke="#00a6b4" strokeWidth="2.2" strokeDasharray="10 14" />
        <path d="M120 420 C250 360 372 390 520 330" fill="none" stroke="#d7ff4f" strokeWidth="2.2" strokeDasharray="5 11" />
      </svg>

      <svg className="absolute left-[-5rem] bottom-[8vh] h-[30rem] w-[30rem] opacity-[0.07]" viewBox="0 0 420 420">
        <path d="M70 216 C112 100 246 62 342 148 C424 222 366 355 228 348 C112 342 30 326 70 216Z" fill="none" stroke="#101010" strokeWidth="1.5" />
        <circle cx="220" cy="205" r="7" fill="#101010" />
        <circle cx="310" cy="152" r="7" fill="#101010" />
        <circle cx="152" cy="306" r="7" fill="#101010" />
      </svg>
    </div>
  );
}
