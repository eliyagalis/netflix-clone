import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getUserRequest } from "../api/authApi";
import { login } from "../store/slices/authSlice";
import { setProfiles } from "../store/slices/profilesSlice";

export function useAuthStatus() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      try {
        if(auth.user) {
            setIsAuthenticated(true);
            return;
        }

        const res = await getUserRequest();
        setIsAuthenticated(true);
        dispatch(login({user: res}));
        dispatch(setProfiles(res.profiles ?? []));
        
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
