
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Registration from './components/Form/Registration';
import SensitiveDataConsent from "./components/Form/SensitiveDataConsent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Registration" element={<Registration />} />
        <Route path="*" element={<Navigate to="/Registration" replace />} />
        <Route path="/DataProcessingForm/:pptId" element={<SensitiveDataConsent />} />
      </Routes>
    </Router>
  );
}

export default App;
