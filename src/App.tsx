import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./components/DataTable";
import { Home } from "./pages/Home";
import UserModal from "./components/Modal";
import { MainForm } from "./components/Forms/MainForm";

import NavBar from "./components/Navbar";
import { ShoppingCart } from "./components/Cart";
import Task3 from "./components/Task3/Task3";
// import {Task3} from "./components/Task3/Task3"

const App: React.FC = () => {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task1.1" element={<Index />} />
        <Route path="/task1.2" element={<UserModal />} />
        <Route path="/task1.3" element={<MainForm />} />
        <Route path="/task2" element={<ShoppingCart />} />
        <Route path="/task3" element={<Task3 />} />
      </Routes>
    </div>
  );
};

export default App;
