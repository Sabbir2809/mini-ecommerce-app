import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppNavBar from "./components/AppNavBar";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import PaymentFail from "./pages/PaymentFail";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <BrowserRouter>
      <AppNavBar></AppNavBar>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart-list" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="api/payment/success/:transId" element={<PaymentSuccess />} />
        <Route path="api/payment/fail/:transId" element={<PaymentFail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
