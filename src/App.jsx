import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Solutions from "./pages/Solutions";
import Navbar from "./components/Navbar";
import "./App.css";
import Instructions from "./pages/Instructions";


function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {/* Show Navbar only when authenticated */}
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Public Route */}

        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/project_solutions" element={<Solutions />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
