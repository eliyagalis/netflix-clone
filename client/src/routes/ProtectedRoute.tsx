import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { UserStatus } from "../types/IUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) return null;
  // Add useEffect fetching

  if (user?.status === UserStatus.ACTIVE) {
    return <>{children}</>;
  }
  
  return <Navigate to="/" replace state={{ from: location }} />;
};

export default ProtectedRoute;
