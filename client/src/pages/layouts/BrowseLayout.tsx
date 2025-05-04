import { Navigate, Outlet, useNavigate, } from 'react-router-dom'
import Footer from '../../components/shared/Footer'
import MainHeader from '../../components/shared/MainHeader'
import { useEffect } from 'react';
import { getUserRequest } from '../../api/authApi';
import { login, logout, stopUserLoading } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/store';
import { ProtectedRoute } from '../../routes/ProtectedRoute';

const BrowseLayout = () => {
    return (
        <ProtectedRoute>

            <div className="flex flex-col min-h-screen bg-[#141414] text-white">
                <MainHeader />
                <br /><br />
                <main className="w-full mx-auto flex-1">
                    <Outlet />
                </main>

                <footer className="w-9/10 mx-auto">
                    <Footer />
                </footer>
            </div>
        </ProtectedRoute>
    )
}

export default BrowseLayout
