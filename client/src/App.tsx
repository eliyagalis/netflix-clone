import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/shared/ScrollToTop";
import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./store/store";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/signup" element={<SignupLayout />}>
            <Route index element={<Signup />} />
            <Route path="registration" element={<Registration />} />
            <Route path="choosePaymentMethod" element={<PaymentPickerPage/>}/>
            <Route path="regform" element={<Regform />} />
           
              <Route path="paymentPicker" element={
                 <Suspense fallback={<span className='loading loading-spinner loading-md loading-primary'></span>}>
                  <PaymentPickerPage/>
                </Suspense>
              }/>
              <Route path="paypalOption" element={
                <Suspense fallback={<span className='loading loading-spinner loading-md loading-primary'></span>}>
                  <PaypalOptionPage/>
                </Suspense>
              }/>
           
          </Route>

          <Route path="/payment" element={<PaypalLogic isClicked={false} paymentMethod="paypal" />} />

        </Routes>
        <AppRoutes />
      </Router>

    </Provider>
  );
}

export default App;
