import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
// components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AuthForm from "./Components/AuthForm/AuthForm";
import ScrollToTopButton from "./Components/ScrollToTopButton/ScrollToTopButton";
// pages
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import Profile from "./pages/Profile/Profile";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminUsers from "./pages/Admin/AdminUsers";
// css 
import "./App.css";
 
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Главная страница */}
            <Route path="/catalog" element={<Catalog />} /> {/* Каталог товаров */}
            <Route path="/product/:id" element={<Product />} /> {/* Карточка товара */}
            <Route path="/cart" element={<Cart />} /> {/* Корзина */}
            <Route path="/profile" element={<Profile />} /> {/* Личный кабинет */}
            <Route path="/auth" element={<AuthForm />} />{/*Авторизация и регистрация*/}
            <Route path="/admin" element={<Admin />} /> {/* Админ панель */}
            <Route path="/admin/products" element={<AdminProducts />} /> {/* Управление товарами */}
            <Route path="/admin/orders" element={<AdminOrders />} /> {/* Управление заказами */}
            <Route path="/admin/users" element={<AdminUsers />} /> {/* Просмотр пользователей */}
          </Routes>
        </div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
