import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import { getUserRequest } from "../api/authApi";

export function useAuthStatus() {
  const user = useAppSelector((state) => state.auth.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      try {
        console.log("trying");
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

  const signedIn = user || isAuthenticated;

  return { signedIn, loading };
}
