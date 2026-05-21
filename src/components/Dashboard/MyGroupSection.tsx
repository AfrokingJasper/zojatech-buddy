export default function MyGroupSection() {
  return (
    <div className="space-y-6">
      <div className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Group management
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-text-h">
          My group workspace
        </h1>
        <p className="mt-2 text-sm leading-7 text-text-main">
          Track collaboration, shared projects, and member activity across your
          core teams.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-text-main">
            Active members
          </div>
          <p className="mt-3 text-2xl font-semibold text-text-h">18 people</p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-text-main">
            Open collaborations
          </div>
          <p className="mt-3 text-2xl font-semibold text-primary">4 projects</p>
        </div>
      </div>
    </div>
  );
}
