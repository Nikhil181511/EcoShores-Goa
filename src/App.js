import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OptionsPage from './pages/OptionsPage';
import CommunityChat from './pages/CommunityChat';
import ReportIssue from './pages/ReportIssue';
import TruckPath from './pages/TruckPath';
import Explore from './pages/Explore';
import EWaste from './pages/EWaste';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/OptionsPage" element={<OptionsPage />} />
        <Route path="/CommunityChat" element={<CommunityChat />} />
        <Route path="/ReportIssue" element={<ReportIssue />} />
        <Route path="/TruckPath" element={<TruckPath />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/E-Waste" element={<Explore />} />
      </Routes>
    </Router>
  );
}

export default App;
