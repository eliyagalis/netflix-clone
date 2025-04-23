import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PaypalLogic from "./components/Fetures/paypal/paypalTry";
import MainMoviesPage from "./pages/MainMoviesPage";
import SignupLayout from "./pages/SignupLayout";
import Planform from "./feature/signup/Planform";
import Register from "./feature/signup/Register";
import Payment from "./feature/signup/Payment";
import Registration from "./feature/signup/Registration";
import ScrollToTop from "./components/shared/ScrollToTop";


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

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
