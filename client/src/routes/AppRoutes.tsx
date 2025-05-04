import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "../store/store";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import Logout from "../pages/Logout";
import MainMoviesPage from "../pages/MainMoviesPage";
import PaypalLogic from "../feature/paypal/paypalLogic";

import SignupLayout from "../pages/layouts/SignupLayout";
import BrowseLayout from "../pages/layouts/BrowseLayout";
import Browse from "../pages/browse/Browse";

import Signup from "../feature/signup/Signup";
import Registration from "../feature/signup/Registration";
import Regform from "../feature/signup/Regform";
import Planform from "../feature/signup/Planform";
import Password from "../feature/signup/Password";

import AuthGate from "../components/AuthGate";

const PaymentPickerPage = lazy(() => import("../pages/PaymentPickerPage"));
const PaypalOptionPage = lazy(() => import("../pages/PaypalOptionPage"));

const AppRoutes: React.FC = () => {
  const { currentProfile } = useAppSelector((state) => state.profiles);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGate requireAuth={false}>
            <LandingPage />
          </AuthGate>
        }
      />
      <Route
        path="/login"
        element={
          <AuthGate requireAuth={false}>
            <LoginPage />
          </AuthGate>
        }
      />
      <Route
        path="/logout"
        element={
          <AuthGate requireAuth={false}>
            <Logout />
          </AuthGate>
        }
      />

      <Route
        path="/signup"
        element={
          <AuthGate requireAuth={false}>
            <SignupLayout />
          </AuthGate>
        }
      >
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

      <Route
        path="/browse"
        element={
          // <AuthGate requireAuth={true}>
            <BrowseLayout />
          // </AuthGate>
        }
      >
        <Route index element={<Browse key={currentProfile?.id} />} />
      </Route>

      <Route
        path="/payment"
        element={
          <AuthGate requireAuth={true}>
            <PaypalLogic isClicked={false} paymentMethod="paypal" />
          </AuthGate>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
