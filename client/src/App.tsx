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
        <AppRoutes />
      </Router>

    </Provider>
  );
}

export default App;
