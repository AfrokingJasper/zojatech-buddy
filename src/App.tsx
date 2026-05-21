import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import {
  MyPortfolioPage,
  MyGroupPage,
  MessagesPage,
  AnalyticsPage,
  PackPage,
  SettingsPage,
} from "./pages/DashboardPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Flow Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
        </Route>

        {/* Dashboard Authenticated Flow */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<MyPortfolioPage />} />
          <Route path="portfolio" element={<MyPortfolioPage />} />
          <Route path="group" element={<MyGroupPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="pack" element={<PackPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallbacks */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
