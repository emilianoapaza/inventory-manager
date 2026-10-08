import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AppHome from "./pages/AppHome";
import Products from "./pages/Products";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppHome />} />
        <Route path="/app/productos" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;