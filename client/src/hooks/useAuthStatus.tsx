import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import { getUserRequest } from "../api/authApi";

export function useAuthStatus() {
  const auth = useAppSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      try {
        if(auth.user?.status) {
            setIsAuthenticated(true);
            return;
        }
        const res = await getUserRequest();
        setIsAuthenticated(res.status? true:false);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    verifyAuth();
  }, []);

  const signedIn = auth.user || isAuthenticated;

  return { signedIn, loading };
}
