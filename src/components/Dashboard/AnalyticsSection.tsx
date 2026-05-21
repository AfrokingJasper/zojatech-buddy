export default function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Analytics dashboard
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-text-h">
          Performance insights
        </h1>
        <p className="mt-2 text-sm leading-7 text-text-main">
          View trends and KPI snapshots for your current business metrics.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-5">
          <div className="text-xs uppercase tracking-[0.24em] text-text-main">
            Conversion rate
          </div>
          <p className="mt-3 text-2xl font-semibold text-text-h">12.4%</p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-5">
          <div className="text-xs uppercase tracking-[0.24em] text-text-main">
            Engagement
          </div>
          <p className="mt-3 text-2xl font-semibold text-primary">+16%</p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-5">
          <div className="text-xs uppercase tracking-[0.24em] text-text-main">
            Retention
          </div>
          <p className="mt-3 text-2xl font-semibold text-text-h">82%</p>
        </div>
      </div>
    </div>
  );
}
