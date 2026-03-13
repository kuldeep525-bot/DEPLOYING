import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import ThemeProvider from "./context/ThemeContext.jsx";
import NotesProvider from "./context/NotesContext.jsx";
import PaperProvider from "./context/PaperContext.jsx";
import ToastProvider from "./context/ToastProvider.jsx";

import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NotesProvider>
          <PaperProvider>
            <App />
            <ToastProvider />
          </PaperProvider>
        </NotesProvider>
      </ThemeProvider>
    </BrowserRouter>
  // </StrictMode>,
);
