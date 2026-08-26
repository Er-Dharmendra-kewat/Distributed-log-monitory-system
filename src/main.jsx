import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { LogsProvider } from "./context/LogsContext.jsx";
import { OrdersProvider } from "./context/OrdersContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LogsProvider>
        <OrdersProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </OrdersProvider>
      </LogsProvider>
    </BrowserRouter>
  </StrictMode>,
);
