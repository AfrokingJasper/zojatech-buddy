import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import buddyLogo from "../assets/images/buddy-logo.png";
import {
  MyPortfolioIcon,
  MyGroupIcon,
  MessagesIcon,
  AnalyticsIcon,
  PackIcon,
  SettingIcon,
} from "../components/Common/Icons";
import userImage from "../assets/Images/user-image.png";

const dashboardNav = [
  { label: "My Portfolio", path: "portfolio", Icon: MyPortfolioIcon },
  { label: "My Group", path: "group", Icon: MyGroupIcon },
  { label: "Messages", path: "messages", Icon: MessagesIcon },
  { label: "Analytics", path: "analytics", Icon: AnalyticsIcon },
  { label: "Pack", path: "pack", Icon: PackIcon },
  { label: "Settings", path: "settings", Icon: SettingIcon },
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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden flex bg-[#F6F6F6] text-text-main">
      <aside className="w-[250px] min-w-[250px] border-r border-neutral-200 bg-white flex flex-col h-full">
        <div className="flex items-center gap-3 px-5 py-6 pt-7">
          <img
            src={buddyLogo}
            alt="Zojatech Logo"
            className="h-9 w-[120px] mx-auto object-contain"
          />
        </div>

        <nav className="flex-1 py-6 space-y-2">
          {dashboardNav.map(({ label, path, Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => {
                const isPortfolio = path === "portfolio";
                const active =
                  isActive ||
                  (isPortfolio && location.pathname === "/dashboard");
                return `group relative flex items-center gap-3 px-4 h-[51px] w-[200px] mx-auto text-sm font-medium transition-all duration-300 rounded-[12px] ${
                  active
                    ? "bg-white text-primary shadow-[0px_4px_58px_0px_rgba(0,0,0,0.08)]"
                    : "text-text-main hover:bg-[#FFF6ED] hover:text-text-h"
                }`;
              }}
            >
              {({ isActive }) => {
                const isPortfolio = path === "portfolio";
                const active =
                  isActive ||
                  (isPortfolio && location.pathname === "/dashboard");
                return (
                  <>
                    <div
                      className={`absolute left-[-25px] top-1/2 -translate-y-1/2 h-[32px] w-[6px] bg-primary rounded-r-[4px] transition-all duration-500 ease-in-out ${
                        active
                          ? "translate-x-0 opacity-100"
                          : "translate-x-[200px] opacity-0"
                      }`}
                    />
                    <Icon className="h-5 w-5 shrink-0 relative z-10" />
                    <span className="relative z-10">{label}</span>
                  </>
                );
              }}
            </NavLink>
          ))}
        </nav>

        <div className="relative flex flex-col justify-between gap-3 rounded-[32px] p-4 mx-auto w-[202px] h-[148px] bg-white pt-9 shadow-[0px_11px_56px_0px_rgba(0,0,0,0.08)] text-center mb-6">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full z-10">
            <img
              src={userImage}
              className="w-[60px] h-[60px] rounded-full"
              alt="user profile picture"
            />
          </div>
          <div className="flex flex-col items-center gap-1 pt-6 px-4">
            <p className="text-base text-[#3B3B45] font-medium leading-[137%] text-text-h">
              Fortune Oliseyenum
            </p>
            <p className="text-xs text-[#818187]">Software Developer</p>
          </div>
          <button
            type="button"
            className=" w-[170px] rounded-xl text-primary bg-[#FF860029] px-4 py-3 font-medium text-[0.875rem] transition hover:bg-primary hover:text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col gap-6 h-full overflow-y-auto p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between shrink-0">
          <p
            key={pageTitle}
            className="text-[1.5625rem]! font-bold text-text-h animate-fade-in"
          >
            {pageTitle}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="h-[48px] w-[422px] rounded-2xl bg-white px-5 text-sm text-text-main outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
              onClick={() => setIsNotificationOpen(true)}
              className="relative grid h-12 w-12 place-items-center rounded-full bg-white border border-neutral-200 text-text-main shadow-sm transition hover:border-primary hover:text-primary"
            >
              <div className="absolute top-[7px] right-[10px] h-[9px] w-[9px] rounded-full bg-[#FF3B30] border-2 border-white"></div>
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

        <div key={location.pathname} className="animate-slide-in-right flex-1">
          <Outlet />
        </div>
      </main>

      {/* Notification Overlay */}
      {isNotificationOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={() => setIsNotificationOpen(false)}
        />
      )}

      {/* Notification Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-white shadow-2xl z-50 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${
          isNotificationOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <h2 className="text-[1.25rem] font-bold text-text-h">
            Notifications
          </h2>
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full bg-slate-50 text-text-main hover:bg-[#FFF6ED] hover:text-primary transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="h-20 w-20 bg-[#FFF6ED] text-primary rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <p className="text-xl font-semibold text-text-h">
            You're all caught up!
          </p>
          <p className="text-text-main text-sm mt-2 leading-relaxed max-w-[250px]">
            Check back later for new alerts, updates, and messages.
          </p>
        </div>
      </div>
    </div>
  );
}
