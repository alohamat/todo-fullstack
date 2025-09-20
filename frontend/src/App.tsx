import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import Week from "./pages/Week";
import Today from "./pages/Today";
import AllTasks from "./pages/AllTasks";
import DashboardPage from "./pages/DashboardPage";
import { TasksProvider } from "./context/TaskContext";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/alltasks"
            element={
              <PrivateRoute>
                <AllTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/today"
            element={
              <PrivateRoute>
                <Today />
              </PrivateRoute>
            }
          />
          <Route
            path="/week"
            element={
              <PrivateRoute>
                <Week />
              </PrivateRoute>
            }
          />
        </Routes>
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
