import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext.jsx";

import theme from "./theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_API_GOOGLE_CLIENT_ID}
        >
          <AuthProvider>
            <App />
          </AuthProvider>
        </GoogleOAuthProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
