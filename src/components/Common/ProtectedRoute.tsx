import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

/**
 * Wraps routes that require authentication.
 * If the user is not authenticated, they are redirected to /login
 * and the current path is saved in location.state.from so that
 * after a successful login we can redirect them back.
 */
export default function ProtectedRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
}
