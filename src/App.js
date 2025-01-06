import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import Clients from './pages/Clients';
import Payments from './pages/Payments';
import Calendar from './pages/Calendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;