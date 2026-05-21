export default function PackSection() {
  return (
    <div className="space-y-6">
      <div className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Pack benefits
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-text-h">
          Your subscription pack
        </h1>
        <p className="mt-2 text-sm leading-7 text-text-main">
          Review plan details, add-ons, and available upgrades for your account.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-text-main">
            Current pack
          </div>
          <p className="mt-3 text-2xl font-semibold text-text-h">Growth</p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-text-main">
            Next renewal
          </div>
          <p className="mt-3 text-2xl font-semibold text-primary">
            May 12, 2027
          </p>
        </div>
      </div>
    </div>
  );
}
