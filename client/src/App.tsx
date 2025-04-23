import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";


import PaypalLogic from "./feature/paypal/paypalLogic";
import MainMoviesPage from "./pages/MainMoviesPage";

import SignupLayout from "./pages/SignupLayout";
import Planform from "./feature/signup/Planform";
import Register from "./feature/signup/Register";
import Payment from "./feature/signup/Payment";
import Registration from "./feature/signup/Registration";
import ScrollToTop from "./components/shared/ScrollToTop";
import { Provider } from "react-redux";
import { store } from "./store/store";
import TrailerMovie from "./components/shared/TrailerMovie";
import PaymentPickerPage from "./pages/PaymentPickerPage";
import PaypalOptionPage from "./pages/PaypalOptionPage";



function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* <Route path="/old" element={<OldLandingPage />} /> */}
          {/* <Route path="/main" element={<MainPage/>}/> */}
          <Route path="/payment" element={<PaypalLogic planName="basic" paymentMethod="paypal"/>}/>
          <Route path="/mainMoviePage" element={<MainMoviesPage/>}/>

          <Route path="/signup" element={<SignupLayout />}>
            <Route path="registration" element={<Registration />} />
            <Route path="paymentPicker" element={<PaymentPickerPage/>}/>
            <Route path="paypalOption" element={<PaypalOptionPage/>}/>
            <Route path="regform" element={<Register />} />
            <Route path="planform" element={<Planform />} />
            <Route path="payment" element={<Payment />} />
          </Route>

          {/* <Route path="/main" element={<MainPage/>}/> */}
          <Route path="/payment" element={<PaypalLogic planName="basic" paymentMethod="paypal" />} />
          <Route path="/mainMoviePage" element={<MainMoviesPage />} />
          <Route path="/trailerMovie" element={<TrailerMovie/>}/>

        </Routes>
      </Router>

    </Provider>
  );
}

export default App;
