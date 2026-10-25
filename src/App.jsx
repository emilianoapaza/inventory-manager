import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AppHome from "./pages/AppHome";
import Products from "./pages/Products";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout.jsx";

function App() {
  return (
    <AuthProvider>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AppHome />} />
            <Route path="productos" element={
              <Products />
            } />
          </Route>
        </Routes>
      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;