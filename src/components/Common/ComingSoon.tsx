import { SettingIcon } from "../Common/Icons";

export default function ComingSoon() {
  return (
    <div className="flex h-full min-h-[500px] w-full flex-col items-center justify-center rounded-3xl bg-white shadow-sm border border-neutral-200 p-8 space-y-6">
      <div className="flex h-[140px] w-[140px] items-center justify-center rounded-[40px] bg-[#FFF6ED]">
        <SettingIcon
          size={80}
          style={{ animationDuration: "4000ms" }}
          className="text-primary animate-spin "
        />
      </div>
      <div className="text-center">
        <h2 className="text-[1.5rem] font-bold! text-[#3B3B45]">Coming Soon</h2>
        <p className="mx-auto mt-2 max-w-[320px] text-base leading-[160%] text-[#818187]">
          We&apos;re currently working on something awesome here. Stay tuned and
          check back later for the update!
        </p>
      </div>
    </div>
  );
}
