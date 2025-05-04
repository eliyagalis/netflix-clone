import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { signedIn, loading } = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!signedIn) {
      navigate("/", { replace: true });
    }
  }, [signedIn, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}
