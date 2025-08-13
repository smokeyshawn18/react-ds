import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./components/DataTable";
import { Home } from "./pages/Home";
import UserModal from "./components/Modal";
import { MainForm } from "./components/Forms/MainForm";
import { ShoppingCart } from "./components/Cart";
import NavBar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task1" element={<Index />} />
        <Route path="/task2" element={<UserModal />} />
        <Route path="/task3" element={<MainForm />} />
        <Route path="/task4" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
};

export default App;
