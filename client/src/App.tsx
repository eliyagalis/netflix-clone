import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PaypalLogic from "./feature/paypal/paypalLogic";
import MainMoviesPage from "./pages/MainMoviesPage";

import SignupLayout from "./pages/SignupLayout";
import Planform from "./feature/signup/Planform";
import Regform from "./feature/signup/Regform";
import Registration from "./feature/signup/Registration";

import ScrollToTop from "./components/shared/ScrollToTop";

import { Provider } from "react-redux";
import { store } from "./store/store";
import BrowseLayout from "./pages/BrowseLayout";
import Browse from "./pages/browse/Browse";
import PaymentPickerPage from "./pages/PaymentPickerPage";
import PaypalOptionPage from "./pages/PaypalOptionPage";
import CustomPayPalButton from "./feature/paypal/costum";
import PaypalOptionForm from "./feature/paypal/costumOptions";



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
          <Route path="/mainMoviePage" element={<MainMoviesPage/>}/>
          

          <Route path="/signup" element={<SignupLayout />}>
            <Route path="registration" element={<Registration />} />
            <Route path="choosePaymentMethod" element={<PaymentPickerPage/>}/>
            <Route path="regform" element={<Regform />} />
            <Route path="paymentPicker" element={<PaymentPickerPage/>}/>
            <Route path="paypalOption" element={<PaypalOptionPage/>}/>
            <Route path="regform" element={<Regform />} />
            <Route path="planform" element={<Planform />} />
          </Route>

          <Route path="/browse" element={<BrowseLayout />}>
            <Route index element={<Browse />} />
            
          </Route>

          {/* <Route path="/main" element={<MainPage/>}/> */}
          <Route path="/payment" element={<PaypalLogic isClicked={false} planName="basic" paymentMethod="paypal" />} />
          <Route path="/mainMoviePage" element={<MainMoviesPage />} />

        </Routes>
      </Router>

    </Provider>
  );
}

export default App;
