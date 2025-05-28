import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import EquipmentsPage from './pages/EquipmentsPage';
import SoftwarePage from './pages/SoftwarePage';
import UsersPage from './pages/UsersPage';
import IncidentsPage from './pages/IncidentsPage';
import MaintenancePage from './pages/MaintenancePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/equipments/*" element={<DashboardLayout><EquipmentsPage /></DashboardLayout>} />
        <Route path="/software/*" element={<DashboardLayout><SoftwarePage /></DashboardLayout>} />
        <Route path="/users/*" element={<DashboardLayout><UsersPage /></DashboardLayout>} />
        <Route path="/incidents/*" element={<DashboardLayout><IncidentsPage /></DashboardLayout>} />
        <Route path="/maintenance/*" element={<DashboardLayout><MaintenancePage /></DashboardLayout>} />
        <Route path="/reports/*" element={<DashboardLayout><ReportsPage /></DashboardLayout>} />
        <Route path="/settings/*" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
        {/* Ajoutez d'autres routes si nécessaire (ex: /equipments/details/:id) */}
      </Routes>
    </Router>
  );
}

export default App;