import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PaypalLogic from "./feature/paypal/paypalLogic";
import MainMoviesPage from "./pages/MainMoviesPage";
import Planform from "./feature/signup/Planform";
import Regform from "./feature/signup/Regform";
import Registration from "./feature/signup/Registration";
import ScrollToTop from "./components/shared/ScrollToTop";
import { Provider } from "react-redux";
import { store } from "./store/store";
import PaymentPickerPage from "./pages/PaymentPickerPage";
import PaypalOptionPage from "./pages/PaypalOptionPage";
import SignupLayout from "./pages/layouts/SignupLayout";
import BrowseLayout from "./pages/layouts/BrowseLayout";
import Browse from "./pages/browse/Browse";
import Password from "./feature/signup/Password";
import Logout from "./pages/Logout";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mainMoviePage" element={<MainMoviesPage/>}/>
          <Route path="/logout" element={<Logout />} />

          <Route path="/signup" element={<SignupLayout />}>
            <Route path="registration" element={<Registration />} />
            <Route path="choosePaymentMethod" element={<PaymentPickerPage/>}/>
            <Route path="regform" element={<Regform />} />
            <Route path="paymentPicker" element={<PaymentPickerPage/>}/>
            <Route path="paypalOption" element={<PaypalOptionPage/>}/>
            <Route path="regform" element={<Regform />} />
            <Route path="planform" element={<Planform />} />
            <Route path="password" element={<Password />} />
          </Route>

          <Route path="/browse" element={<BrowseLayout />}>
            <Route index element={<Browse />} />
            
          </Route>

          <Route path="/payment" element={<PaypalLogic isClicked={false} planName="basic" paymentMethod="paypal" />} />
          <Route path="/mainMoviePage" element={<MainMoviesPage />} />

        </Routes>
      </Router>

    </Provider>
  );
}

export default App;
