import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage/MainPage";
import LoginPage from "./pages/mainPage/Registers/LoginPage";
import RegisterPage from "./pages/mainPage/Registers/RegisterPage";
import FindIdPage from "./pages/mainPage/Registers/FindIdPage";
import FindPwPage from "./pages/mainPage/Registers/FindPwPage";
import NewPwPage from "./pages/mainPage/Registers/NewPwPage";
import AdminPageMain from "./pages/adminPage/AdminPageMain";
// admin
import MainDashBoard from "./pages/adminPage/MainDashBoard";
import Products from "./pages/adminPage/Products";
import ProductsAdd from "./pages/adminPage/ProductsAdd";
import Orders from "./pages/adminPage/Orders";
import Users from "./pages/adminPage/Users";
import NotFound from "./shared/NotFound404";
import ProductDetailsPage from "./pages/mainPage/ProductDetailsPage";
import CartPage from "./pages/mainPage/CartPage";
// chatbot
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../bot/config.js";
import MessageParser from "../bot/MessageParser.js";
import ActionProvider from "../bot/ActionProvider.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/findId" element={<FindIdPage />} />
        <Route path="/findPw" element={<FindPwPage />} />
        <Route path="/findPw/newPw" element={<NewPwPage />} />
        <Route path="/products" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* ChatBot */}
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
        {/* admin */}
        <Route path="/admin/*" element={<AdminPageMain />}>
          <Route path="dashboard" element={<MainDashBoard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<ProductsAdd />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
