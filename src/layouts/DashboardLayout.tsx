import { NavLink, Outlet, useLocation } from "react-router-dom";
import buddyLogo from "../assets/images/buddy-logo.png";
import {
  ChatIcon,
  MailIcon,
  InfoIcon,
  GoogleIcon,
  PadlockIcon,
  GreenCheckIcon,
} from "../components/Common/Icons";

const dashboardNav = [
  { label: "My Portfolio", path: "portfolio", Icon: InfoIcon },
  { label: "My Group", path: "group", Icon: GoogleIcon },
  { label: "Messages", path: "messages", Icon: MailIcon },
  { label: "Analytics", path: "analytics", Icon: ChatIcon },
  { label: "Pack", path: "pack", Icon: GreenCheckIcon },
  { label: "Settings", path: "settings", Icon: PadlockIcon },
];

const pageTitles: Record<string, string> = {
  "": "My Portfolio",
  portfolio: "My Portfolio",
  group: "My Group",
  messages: "Messages",
  analytics: "Analytics",
  pack: "Pack",
  settings: "Settings",
};

export default function DashboardLayout() {
  const location = useLocation();
  const currentPath = location.pathname
    .replace("/dashboard/", "")
    .replace("/dashboard", "");
  const pageTitle = pageTitles[currentPath] ?? "Dashboard";

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-text-main">
      <aside className="w-[250px] min-w-[250px] border-r border-neutral-200 bg-white flex flex-col">
        <div className="flex items-center gap-3 px-5 py-6 border-b border-neutral-200">
          <img
            src={buddyLogo}
            alt="Zojatech Logo"
            className="h-9 w-auto object-contain"
          />
        </div>

        <nav className="flex-1 px-2 py-6 space-y-2">
          {dashboardNav.map(({ label, path, Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => {
                const isPortfolio = path === "portfolio";
                const active =
                  isActive ||
                  (isPortfolio && location.pathname === "/dashboard");
                return `group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-[#FFF3E0] text-[#CC5500] shadow-sm"
                    : "text-text-main hover:bg-[#FFF6ED] hover:text-text-h"
                }`;
              }}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-5 pb-6 pt-4">
          <div className="relative overflow-hidden rounded-[32px] border border-neutral-200 bg-[#FFFAF4] pt-10 pb-6 text-center">
            <div className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-gradient-to-br from-[#FFB56B] to-[#FF8600] shadow-lg"></div>
            <div className="mt-10 px-4">
              <p className="text-sm font-semibold text-text-h">Avery Johnson</p>
              <p className="mt-1 text-xs text-text-main">Growth Lead</p>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-full bg-[#FF8600] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e17100]"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-h-screen overflow-y-auto p-6 sm:p-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#FF8600] font-semibold">
              {pageTitle}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-text-h">
              {pageTitle}
            </h1>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="h-[48px] w-[422px] rounded-2xl border border-neutral-200 bg-white px-5 text-sm text-text-main outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="button"
              className="grid h-12 w-12 place-items-center rounded-full bg-white border border-neutral-200 text-text-main shadow-sm transition hover:border-primary hover:text-primary"
            >
              <span className="text-2xl leading-none">+</span>
            </button>
            <button
              type="button"
              className="grid h-12 w-12 place-items-center rounded-full bg-white border border-neutral-200 text-text-main shadow-sm transition hover:border-primary hover:text-primary"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </button>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
