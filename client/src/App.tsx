import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import SignUpPage from "./pages/SignUpPage";

import PaypalLogic from "./components/Fetures/paypal/paypalLogic";
import PlansPage from "./pages/PlansPage";
import MainMoviesPage from "./pages/MainMoviesPage";
import ChoosePaymentMethod from "./pages/ChoosePaymentMethod";

import PaypalLogic from "./components/Fetures/paypal/paypalTry";
import MainMoviesPage from "./pages/MainMoviesPage";
import SignupLayout from "./pages/SignupLayout";
import Planform from "./feature/signup/Planform";
import Register from "./feature/signup/Register";
import Payment from "./feature/signup/Payment";
import Registration from "./feature/signup/registration";
import ScrollToTop from "./components/shared/ScrollToTop";



function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* <Route path="/old" element={<OldLandingPage />} /> */}
        {/* <Route path="/main" element={<MainPage/>}/> */}
        <Route path="/payment" element={<PaypalLogic planName="basic" paymentMethod="paypal"/>}/>
        <Route path="/choosePlan" element={<PlansPage/>}/>
        <Route path="/mainMoviePage" element={<MainMoviesPage/>}/>
        <Route path="/choosePaymentMethod" element={<ChoosePaymentMethod/>}/>

        <Route path="/signup" element={<SignupLayout />}>
          <Route path="registration" element={<Registration />} />
          <Route path="regform" element={<Register />} />
          <Route path="planform" element={<Planform />} />
          <Route path="payment" element={<Payment />} />
        </Route>

        {/* <Route path="/main" element={<MainPage/>}/> */}
        <Route path="/payment" element={<PaypalLogic planId={import.meta.env.VITE_BASIC_PLAN!} planName="basic" paymentMethod="paypal" />} />
        <Route path="/mainMoviePage" element={<MainMoviesPage />} />


      </Routes>
    </Router>
  );
}

export default App;
