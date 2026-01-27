import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import Membership from "./pages/Membership";
import Products from "./pages/Products";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/pages.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}