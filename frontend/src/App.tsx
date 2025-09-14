import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Dashboard";
// import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
              <HomePage />
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
