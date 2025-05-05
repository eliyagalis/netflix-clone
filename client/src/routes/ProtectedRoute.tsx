import { Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { signedIn, loading } = useAuthStatus();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (signedIn === false) {
    return <Navigate to="/" replace />;
  }

  // If signedIn is true
  return <>{children}</>;
}
