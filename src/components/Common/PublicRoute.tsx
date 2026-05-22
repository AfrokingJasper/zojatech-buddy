import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

/**
 * Wraps routes that should ONLY be accessible to unauthenticated users.
 * If the user is authenticated, they will be redirected to /dashboard.
 */
export default function PublicRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const token = useAppSelector((state) => state.auth.token);

  if (isAuthenticated && token) {
    return (
      <Navigate
        to={token === "token-for-failed-auth" ? "/verify-otp" : "/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
}
