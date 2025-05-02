import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getUserRequest } from "../api/authApi";
import { login, logout, stopUserLoading } from "../store/slices/authSlice";

interface AuthGateProps {
  children: React.ReactNode;
  requireAuth: boolean;
}

const AuthGate = ({ children, requireAuth }: AuthGateProps) => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getUserRequest();
        dispatch(login({ user }));
        dispatch(stopUserLoading());

        if (!requireAuth && location.pathname === "/") {
          navigate("/browse");
        }
      } catch (err) {
        dispatch(logout());
        dispatch(stopUserLoading());

        if (requireAuth) {
          navigate("/");
        }
      }
    };

    initAuth();
  }, [dispatch, navigate, location.pathname, requireAuth]);

  
  return <>{children}</>;
};

export default AuthGate;
