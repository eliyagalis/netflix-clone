import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import PaypalLogic from "./components/Fetures/paypal/paypalLogic";
import PlansPage from "./pages/PlansPage";
import MainMoviesPage from "./pages/MainMoviesPage";
import ChoosePaymentMethod from "./pages/ChoosePaymentMethod";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* <Route path="/old" element={<OldLandingPage />} /> */}
        {/* <Route path="/main" element={<MainPage/>}/> */}
        <Route path="/payment" element={<PaypalLogic planName="basic" paymentMethod="paypal"/>}/>
        <Route path="/choosePlan" element={<PlansPage/>}/>
        <Route path="/mainMoviePage" element={<MainMoviesPage/>}/>
        <Route path="/choosePaymentMethod" element={<ChoosePaymentMethod/>}/>

      </Routes>
    </Router>
  );
}

export default App;
