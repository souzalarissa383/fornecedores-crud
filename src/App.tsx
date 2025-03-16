import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { FornecedorProvider } from "./contexts/FornecedorContext";
import { ToastContainer } from "react-toastify"; // Importe o ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importe o CSS do react-toastify
import Login from "./presentation/pages/Login";
import CadastroFornecedor from "./presentation/pages/CadastroFornecedor";
import ListarFornecedoresPage from "./presentation/pages/ListarFornecedores";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <FornecedorProvider>
    
      <ToastContainer
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/cadastro-fornecedor"
          element={
            <PrivateRoute>
              <CadastroFornecedor />
            </PrivateRoute>
          }
        />
        <Route
          path="/listar-fornecedores"
          element={
            <PrivateRoute>
              <ListarFornecedoresPage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </FornecedorProvider>
  );
};

export default App;