import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalStages: 0,
    stagesActifs: 0,
    approuves: 0,
    entreprises: 0,
  });

  useEffect(() => {
    // Exemple d'appel API - à remplacer par l'endpoint backend
    axios.get("http://localhost:8000/api/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="text-center">STAGE LINK</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-2"><a href="#" className="nav-link text-white">📊 Tableau de bord</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link text-white">🔔 Notifications</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link text-white">📈 Statistiques</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link text-white">🎯 Campagnes</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link text-white">👨‍🎓 Métiers</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link text-white">🏢 Entreprises</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link text-white">✅ Évaluations</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        {/* Navbar */}
        <div className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm">
          <input type="text" className="form-control w-50" placeholder="Rechercher..." />
          <div className="d-flex align-items-center">
            <span className="me-3">👤 M. Ndiaye</span>
            <img
              src="/assets/images/logo.png"
              alt="profile"
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4">
          {/* Bienvenue */}
          <div className="p-4 bg-primary text-white rounded mb-4">
            <h5>Bienvenue, Moustapha Ndiaye</h5>
            <p>Tableau de bord – Chef de Département EIT</p>
          </div>

          {/* Statistiques globales */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h6>👨‍🎓 Total des stages</h6>
                <h4>{stats.totalStages}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h6>📌 Stages Actifs</h6>
                <h4>{stats.stagesActifs}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h6>✅ Approuvés</h6>
                <h4>{stats.approuves}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h6>🏢 Entreprises</h6>
                <h4>{stats.entreprises}</h4>
              </div>
            </div>
          </div>

          {/* Répartition par métier */}
          <div className="card p-4 shadow mb-4">
            <h6>Répartition des stages par métier</h6>
            <div className="d-flex justify-content-around mt-3">
              <img src="/assets/images/logo.png" alt="DWM" style={{ height: "40px" }} />
              <img src="/assets/images/logo.png" alt="ASRI" style={{ height: "40px" }} />
              <img src="/assets/images/logo.png" alt="RT" style={{ height: "40px" }} />
            </div>
          </div>

          {/* Statistiques + Échéance */}
          <div className="row">
            <div className="col-md-6">
              <div className="card p-4 shadow">
                <h6>📊 Statistiques DWM2</h6>
                <p className="text-success">✔ En cours: 28</p>
                <p className="text-warning">⚠ En attente: 28</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-4 shadow">
                <h6>⏳ Échéances</h6>
                <p>Fin de stage : 20 Octobre 2025</p>
                <p>Restitution : 5 Novembre 2025</p>
                <p>Rapport à déposer : 10 Novembre 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
