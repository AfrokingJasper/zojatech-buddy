import buddyLogo from "../../assets/Images/buddy-logo.png";

export default function ErrorOverlay() {
  return (
    <div className="lg:hidden fixed inset-0 z-9999 flex flex-col items-center justify-center bg-slate-900/90 dark:bg-[#13141a]/95 backdrop-blur-md p-6 text-center select-none animate-fade-in">
      <div className="max-w-md w-full bg-white dark:bg-[#181920] border border-neutral-100 dark:border-[#2e303a]/60 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center gap-6">
        <img
          src={buddyLogo}
          alt="Zojatech Buddy Logo"
          className="h-9 w-[120px] object-contain"
        />

        <div className="h-16 w-16 bg-[#FFF6ED] dark:bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-text-thick dark:text-white font-sans">
            Screen Size Too Small
          </h2>
          <p className="text-sm text-text-main dark:text-gray-400 font-sans leading-relaxed">
            Please view this application on a larger screen (minimum width
            1024px).
          </p>
        </div>
      </div>
    </div>
  );
}
