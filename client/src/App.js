import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import MainPage from "./pages/mainPage/MainPage";
import LoginPage from "./pages/mainPage/Registers/LoginPage";
import RegisterPage from "./pages/mainPage/Registers/RegisterPage";
import FindIdPage from "./pages/mainPage/Registers/FindIdPage";
import FindPwPage from "./pages/mainPage/Registers/FindPwPage";
import NewPwPage from "./pages/mainPage/Registers/NewPwPage";
import MyPage from "./pages/mainPage/mypage/MyPage";
import CartPage from "./pages/mainPage/CartPage";
// admin
import AdminPageMain from "./pages/adminPage/AdminPageMain";
import MainDashBoard from "./pages/adminPage/MainDashBoard";
import Products from "./pages/adminPage/Products";
import ProductsAdd from "./pages/adminPage/ProductsAdd";
import Orders from "./pages/adminPage/Orders";
import Users from "./pages/adminPage/Users";
import NotFound from "./shared/NotFound404";
import ProductsDetail from "./pages/adminPage/ProductsDetail";
import ProductDetailsPage from "./pages/mainPage/products/ProductDetailsPage";
import CategoryPage from "./pages/mainPage/products/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/findId" element={<FindIdPage />} />
        <Route path="/findPw" element={<FindPwPage />} />
        <Route path="/mypage" element={<MyPage />} />
        {/* <Route path="/mypage/info" element={<MyPageInfo />} /> */}
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/cart/checkout" element={<CheckoutPage />} /> */}
        {/* admin */}
        <Route path="/admin/*" element={<AdminPageMain />}>
          <Route path="dashboard" element={<MainDashBoard />} />
          <Route path="products/*" element={<Products />} />
          <Route path="products/add" element={<ProductsAdd />} />
          <Route path="products/:productId" element={<ProductsDetail />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
