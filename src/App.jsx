import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/register";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/dashboard"; // ✅ Import de ton Dashboard réel

function App() {
  const { user, isLoading } = useAuth();
  
  // Afficher un spinner pendant le chargement
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Page de login - accessible uniquement si non connecté */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />
       
        {/* Page d'inscription - accessible uniquement si non connecté */}
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" replace /> : <Register />}
        />
        
        {/* Page de dashboard - accessible uniquement si connecté */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />} // ✅ ici on met Dashboard
        />
        
        {/* Route par défaut - redirige vers login */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
        
        {/* Toute autre route non définie redirige vers login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
