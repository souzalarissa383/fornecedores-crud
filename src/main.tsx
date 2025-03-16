import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GlobalStyle } from "./styles/globalStyles";
import { FornecedorProvider } from "./contexts/FornecedorContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FornecedorProvider>
        <GlobalStyle />
        <App />
      </FornecedorProvider>
    </BrowserRouter>
  </React.StrictMode>
);