import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../store/store';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import Logout from '../pages/Logout';
import MainMoviesPage from '../pages/MainMoviesPage';
import PaypalLogic from '../feature/paypal/paypalLogic';

import SignupLayout from '../pages/layouts/SignupLayout';
import BrowseLayout from '../pages/layouts/BrowseLayout';
import Browse from '../pages/browse/Browse';

import Signup from '../feature/signup/Signup';
import Registration from '../feature/signup/Registration';
import Regform from '../feature/signup/Regform';
import Planform from '../feature/signup/Planform';
import Password from '../feature/signup/Password';

import ProtectedRoute from './ProtectedRoute'; // ✅ Import it

const PaymentPickerPage = lazy(() => import('../pages/PaymentPickerPage'));
const PaypalOptionPage = lazy(() => import('../pages/PaypalOptionPage'));

const AppRoutes: React.FC = () => {
  const { currentProfile } = useAppSelector((state) => state.profiles);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/signup" element={<SignupLayout />}>
        <Route index element={<Signup />} />
        <Route path="registration" element={<Registration />} />
        <Route path="regform" element={<Regform />} />
        <Route path="planform" element={<Planform />} />
        <Route path="password" element={<Password />} />
        <Route
          path="choosePaymentMethod"
          element={
            <Suspense fallback={<span className="loading loading-spinner loading-md loading-primary" />}>
              <PaymentPickerPage />
            </Suspense>
          }
        />
        <Route
          path="paypalOption"
          element={
            <Suspense fallback={<span className="loading loading-spinner loading-md loading-primary" />}>
              <PaypalOptionPage />
            </Suspense>
          }
        />
      </Route>

      <Route path="/browse" element={
          <ProtectedRoute>
            <BrowseLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Browse key={currentProfile?.id} />} />
      </Route>

      <Route path="/payment" element={<PaypalLogic isClicked={false} paymentMethod="paypal" />} />
    </Routes>
  );
};

export default AppRoutes;
