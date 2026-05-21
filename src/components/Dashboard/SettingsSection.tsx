export default function SettingsSection() {
  return (
    <div className="space-y-6">
      <div className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Account settings
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-text-h">
          Your preferences
        </h1>
        <p className="mt-2 text-sm leading-7 text-text-main">
          Manage your profile, security, and notification settings from one
          place.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-5">
          <div className="text-xs uppercase tracking-[0.24em] text-text-main">
            Profile
          </div>
          <p className="mt-3 text-sm text-text-main">
            Update name, email, and contact details.
          </p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-5">
          <div className="text-xs uppercase tracking-[0.24em] text-text-main">
            Security
          </div>
          <p className="mt-3 text-sm text-text-main">
            Manage passwords, 2FA, and sign-in devices.
          </p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-5">
          <div className="text-xs uppercase tracking-[0.24em] text-text-main">
            Notifications
          </div>
          <p className="mt-3 text-sm text-text-main">
            Adjust alerts and updates for your workflow.
          </p>
        </div>
      </div>
    </div>
  );
}
