export default function MessagesSection() {
  return (
    <div className="space-y-6">
      <div className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Messages inbox
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-text-h">
          Recent conversations
        </h1>
        <p className="mt-2 text-sm leading-7 text-text-main">
          Open messages, support threads, and team chat all in one place.
        </p>
      </div>

      <div className="space-y-4">
        <article className="rounded-3xl border border-neutral-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-text-h">Product team</p>
              <p className="text-xs text-text-main">
                New priorities for the sprint
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              2 unread
            </span>
          </div>
        </article>
        <article className="rounded-3xl border border-neutral-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-text-h">
                Finance update
              </p>
              <p className="text-xs text-text-main">
                Quarterly report is ready
              </p>
            </div>
            <span className="rounded-full bg-[#F9F2E6] px-3 py-1 text-xs font-semibold text-[#B16B16]">
              Read
            </span>
          </div>
        </article>
      </div>
    </div>
  );
}
