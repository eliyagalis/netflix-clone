import { Navigate, Outlet, useNavigate, } from 'react-router-dom'
import Footer from '../../components/shared/Footer'
import MainHeader from '../../components/shared/MainHeader'
import { useEffect } from 'react';
import { getUserRequest } from '../../api/authApi';
import { login, logout, stopUserLoading } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/store';

const BrowseLayout = () => {

    const auth = useAppSelector((state) => state.auth);
  const profiles = useAppSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  if(!auth.user && !auth.isLoading) {
    return <Navigate to={"/login"} replace />
  }
  
  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getUserRequest();
        dispatch(login({ user }));
      } catch (err) {
        dispatch(logout());
        dispatch(stopUserLoading());
        navigate("/login");
      }
    };
    initAuth();
  }, [])

  if(!auth.user && auth.isLoading) {
    return null;
  }
    
    return (
        <div className="flex flex-col min-h-screen bg-[#141414] text-white">
            <MainHeader />
            <br/><br/>
            <main className="w-full mx-auto flex-1">
                <Outlet />
            </main>

            <footer className="w-9/10 mx-auto">
                <Footer />
            </footer>
        </div>
    )
}

export default BrowseLayout
