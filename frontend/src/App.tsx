import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
// import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/home"
          element={
              <HomePage />
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
