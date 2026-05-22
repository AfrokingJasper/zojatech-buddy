import { Outlet, useLocation } from "react-router-dom";
import buddyLogo from "../assets/Images/buddy-logo.png";
import { CheckboxIcon, ChatIcon } from "../components/Common/Icons";
import ErrorOverlay from "../components/Common/ErrorOverlay";

export default function AuthLayout() {
  const location = useLocation();

  const isOtp = location.pathname === "/verify-otp";

  return (
    <div className="flex h-screen max-h-screen min-h-screen overflow-hidden  dark:bg-[#13141a] transition-colors duration-300">
      <ErrorOverlay />
      <div className="hidden lg:flex lg:w-[calc(690/1400*100%)] relative bg-white dark:bg-[#181920] p-6 sm:p-12 lg:pt-[100.779388427734375px] lg:pl-[100.779388427734375px] lg:pr-[100.779388427734375px] lg:pb-12 flex-col justify-between h-full overflow-hidden border-r border-neutral-100 dark:border-[#2e303a]/40 text-left">
        <div className="flex items-center gap-3 z-10">
          <img
            src={buddyLogo}
            alt="Zojatech Buddy Logo"
            className="h-9 w-30 object-contain"
          />
        </div>

        <div className="my-auto z-10">
          <ul className="space-y-9.25 text-base text-text-main dark:text-gray-300 font-sans">
            <li className="flex items-center gap-4">
              <CheckboxIcon className="shrink-0 w-6 h-6 " />
              <span className="leading-6">
                Track real-time overview of company’s financial performance.
              </span>
            </li>
            <li className="flex items-center gap-4">
              <CheckboxIcon className="shrink-0 w-6 h-6 " />
              <span className="leading-6">
                Track created projects budget against actual revenue and
                expenses.
              </span>
            </li>
            <li className="flex items-center gap-4">
              <CheckboxIcon className="shrink-0  w-6 h-6" />
              <span className="leading-6">
                Highlighted reports on budget deficit and surplus, accounting
                dimensions, balance sheets and real-time sales margin
                estimation.
              </span>
            </li>
          </ul>

          <div className="mt-24 text-sm text-text-main/60 dark:text-gray-500 font-sans font-medium">
            &copy; 2022 Revvex. All rights reserved
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[calc(710/1400*100%)] h-full bg-[#F8FAFC] dark:bg-[#13141a] relative flex flex-col text-left">
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 lg:pr-34 lg:pl-34 lg:pb-12 flex flex-col justify-between h-full relative">
          <div className="flex items-center justify-between lg:hidden w-full mb-8">
            <img
              src={buddyLogo}
              alt="Zojatech Buddy Logo"
              className="h-8 w-auto object-contain"
            />
          </div>

          <div className="my-auto max-w-[420px] lg:max-w-none w-full mx-auto py-8">
            <Outlet />
          </div>
        </div>

        {!isOtp && (
          <button
            type="button"
            className="absolute bottom-6 text-[0.875rem] right-6 lg:bottom-12 lg:right-12 z-20 flex items-center justify-center gap-2 w-[7.402rem] h-[3.188rem] rounded-full bg-primary hover:bg-[#e07500] text-white font-semibold shadow-[4.45px_35.6px_22.25px_rgba(0,0,0,0.059)] dark:shadow-[4.45px_35.6px_22.25px_rgba(0,0,0,0.25)] transition-all duration-200 cursor-pointer animate-fade-in"
          >
            <span>Get help</span>
            <ChatIcon className=" text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
